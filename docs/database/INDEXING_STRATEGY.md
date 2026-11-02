# Indexing Strategy

Index for queries that exist. Foreign keys are not indexed automatically in PostgreSQL, so index those used for joins or cascades. Check real plans with `EXPLAIN ANALYZE` before adding speculative indexes.

## Implemented

| Index                                       | Query                        |
| ------------------------------------------- | ---------------------------- |
| `users.appwrite_user_id` unique             | Auth lookup on every request |
| `provider_profiles.user_id` unique          | Role lookup                  |
| `provider_profiles(approval_status)`        | Approval queue               |
| `service_categories.slug` unique            |                              |
| `service_categories(is_active, sort_order)` | Category list                |

## Planned

| Index                                                                   | Query                            |
| ----------------------------------------------------------------------- | -------------------------------- |
| `requirements(status, category_id, created_at DESC)`                    | Lead feed                        |
| `requirements(status, city, created_at DESC)`                           | Lead feed by location            |
| `requirements(customer_user_id, created_at DESC)`                       | My requirements                  |
| `provider_interests(requirement_id, provider_id)` unique                | Duplicate guard, interested list |
| `provider_interests(provider_id, created_at DESC)`                      | Provider's connections           |
| `provider_categories(category_id, provider_id)`                         | Matching                         |
| `service_areas(city, provider_id)`                                      | Matching                         |
| `messages(conversation_id, created_at DESC, id DESC)`                   | Chat history with cursor         |
| `conversation_members(user_id)`                                         | Inbox                            |
| `conversations(last_message_at DESC)`                                   | Inbox sort                       |
| `content_posts(status, category_id, published_at DESC)`                 | Discovery                        |
| `content_posts USING GIN (tags)`                                        | Tag filter                       |
| `subscriptions(provider_id) WHERE status IN (live states)` unique       | One live subscription            |
| `subscriptions(current_period_end) WHERE status IN (live states)`       | Expiry job                       |
| `outbox_events(next_attempt_at) WHERE status = 'pending'`               | Job batch                        |
| `notifications(user_id, created_at DESC)`, partial on `read_at IS NULL` | List, badge                      |
| `admin_audit_logs(target_type, target_id, created_at DESC)`             | Investigation                    |
| `media_assets(status, created_at) WHERE status = 'pending'`             | Orphan cleanup                   |

## Pagination

Use keyset cursors `(created_at, id)`, never `OFFSET`, on growing tables. Keep the index and sort direction aligned.

## Avoid N+1

Fetch list relations with joins or `inArray` batches. Provider cards in a list must not query per row. Keep rating averages denormalized on `provider_profiles`, updated in the review transaction.

## Review

Check `pg_stat_user_indexes` and `pg_stat_statements` quarterly (extension availability to confirm), and drop unused indexes.
