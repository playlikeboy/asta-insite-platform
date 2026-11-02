# Chat Endpoints

Status: Planned for M8. Bearer auth; members only (non-members get 404). There is deliberately no endpoint to create a conversation. [Realtime architecture](../architecture/REALTIME_ARCHITECTURE.md).

| Method | Path                                 | Purpose                                          |
| ------ | ------------------------------------ | ------------------------------------------------ |
| GET    | `/api/v1/conversations`              | Inbox, newest activity first, with unread counts |
| GET    | `/api/v1/conversations/:id`          | Conversation and other party's summary           |
| GET    | `/api/v1/conversations/:id/messages` | `before` or `after` cursor, limit                |
| POST   | `/api/v1/conversations/:id/messages` | Send                                             |
| POST   | `/api/v1/conversations/:id/read`     | Update `last_read_at`                            |

## Send body

```json
{ "clientKey": "uuid-from-device", "body": "Hello", "attachmentIds": ["uuid"] }
```

`body` is 1 to 4000 characters, unless attachments exist. Repeating the same `clientKey` returns the original message with 200.

## Realtime

Not an API endpoint. The app subscribes to its own row in `user_signals`, then uses the endpoints above. Signals carry no message content.

## Errors

| Status | When                                                 |
| ------ | ---------------------------------------------------- |
| 403    | Sender suspended or conversation closed              |
| 404    | Not a member                                         |
| 422    | Empty or too long; attachment not owned or not ready |
| 429    | Too many messages                                    |
