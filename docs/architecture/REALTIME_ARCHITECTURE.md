# Realtime Architecture

**Status:** Planned for M8; depends on spike S-03. Decision: [ADR-004](ARCHITECTURE_DECISIONS.md#adr-004-messages-live-in-postgresql-with-tablesdb-as-a-realtime-signal). Diagram: [CHAT_FLOW](diagrams/CHAT_FLOW.mmd).

## Answer to "where does chat live?"

**PostgreSQL.** All of it. TablesDB holds no message data.

## Signal table

Database `realtime`, table `user_signals`, Row Security on.

| Column           | Type             | Note                                    |
| ---------------- | ---------------- | --------------------------------------- |
| Row ID           | string           | The user's `users.id`                   |
| `kind`           | string           | `message`, `connection`, `notification` |
| `conversationId` | string, nullable | No content                              |
| `changedAt`      | datetime         | Set by the server                       |

Row permission: read for `Role.user(<appwriteUserId>)`. Only the server's API key writes. One row per user means no growth and no cleanup. Rapid updates may collapse, which is fine because the app refetches everything newer than its cursor.

## Send path

1. `POST /api/v1/conversations/:id/messages` with a client-generated idempotency key.
2. Service checks membership, connection state and account status.
3. Transaction: insert message; update conversation `last_message_at`; insert outbox row.
4. Respond with the saved message.
5. Immediately upsert signals for other members, without waiting for the outbox. If that fails, the outbox retries and the push still goes out.

## Receive path

- **Foreground:** subscribe to `tablesdb.realtime.tables.user_signals.rows.<userId>`. On a signal, invalidate the query and fetch messages after the cursor.
- **App returns to foreground or reconnects:** always refetch. Signals are hints.
- **While a chat is open:** poll every 30 seconds as a safety net.
- **Background:** push notification through the outbox.

Client SDKs use one WebSocket per Realtime client. Keep a single subscription for the session.

## Limitations to accept

- No delivery guarantee from signals; the API is the guarantee.
- Row write billed per message per recipient.
- No typing indicators or online status in scope. Appwrite presences could add them later.
- PostgreSQL writes do not emit Realtime events, so the server must always write the signal explicitly.
