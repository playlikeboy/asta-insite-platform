# Schema Reference

Source of truth for implemented tables is `packages/database/src/schema/index.ts`. This document describes both those and the plan. All tables have `id uuid` primary key (unless noted), `created_at`, `updated_at` as `timestamptz`.

## Identity (Implemented)

| Table                | Columns                                                                                                                                                    | Notes                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `users`              | `appwrite_user_id` unique, `status` (`active`, `suspended`, `deleted`), `deleted_at`                                                                       | No phone or email; Appwrite owns them                                                                            |
| `customer_profiles`  | `user_id` PK FK cascade, `full_name`, `city`, `onboarded_at`                                                                                               |                                                                                                                  |
| `provider_profiles`  | `user_id` unique FK cascade, `business_name`, `description`, `years_of_experience` check 0 to 100, `approval_status`, `available_for_leads`, `approved_at` | Planned additions: `rating_average`, `rating_count`, `rejection_reason`, `tagline`, `website`, `avatar_media_id` |
| `admin_users`        | `user_id` PK FK restrict, `role` (`super_admin`, `operations`, `finance`, `moderator`)                                                                     | Restrict: remove the admin role before deleting the user                                                         |
| `service_categories` | `slug` unique, `name`, `is_active`, `sort_order`                                                                                                           | Planned addition: `icon`, `image_media_id`                                                                       |

## Services (Planned)

| Table                  | Columns                                                                                      | Notes                           |
| ---------------------- | -------------------------------------------------------------------------------------------- | ------------------------------- |
| `provider_categories`  | `provider_id`, `category_id` composite PK                                                    |                                 |
| `customer_categories`  | `user_id`, `category_id` composite PK                                                        | Onboarding interests            |
| `service_areas`        | `provider_id`, `state`, `city`, `locality` nullable                                          |                                 |
| `provider_credentials` | `provider_id`, `kind` (`certification`, `license`, `award`), `name`, `media_id`, `issued_at` | Documents in the private bucket |

## Requirements (Planned)

| Table                 | Columns                                                                                                                                                                                                                                   | Notes                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `category_questions`  | `category_id`, `version`, `position`, `label`, `kind`, `options` jsonb, `is_required`, `is_active`                                                                                                                                        | Unique `(category_id, version, position)` |
| `requirements`        | `customer_user_id`, `category_id`, `title`, `description`, `state`, `city`, `locality`, `exact_address` nullable, `budget_min_paise`, `budget_max_paise`, `timeline`, `deadline`, `status`, `question_version`, `closed_at`, `deleted_at` | Check `budget_min <= budget_max`          |
| `requirement_answers` | `requirement_id`, `question_id`, `value` jsonb                                                                                                                                                                                            | Unique pair                               |
| `requirement_media`   | `requirement_id`, `media_id`, `position`                                                                                                                                                                                                  |                                           |

## Leads (Planned)

| Table                | Columns                                                                                                | Notes                          |
| -------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------ |
| `provider_interests` | `requirement_id`, `provider_id`, `note`, `status`, `decided_at`                                        | Unique pair                    |
| `shortlists`         | `requirement_id`, `provider_id`                                                                        | Composite PK; private to owner |
| `connections`        | `interest_id` unique, `requirement_id`, `customer_user_id`, `provider_id`, `status` (`open`, `closed`) |                                |

## Messaging (Planned)

| Table                  | Columns                                                                 | Notes                                                                  |
| ---------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `conversations`        | `connection_id` unique, `last_message_at`, `status`                     |                                                                        |
| `conversation_members` | `conversation_id`, `user_id`, `last_read_at`                            | Composite PK                                                           |
| `messages`             | `conversation_id`, `sender_user_id`, `body`, `client_key`, `deleted_at` | Unique `(conversation_id, sender_user_id, client_key)` for idempotency |
| `message_attachments`  | `message_id`, `media_id`                                                |                                                                        |

## Content (Planned)

| Table                | Columns                                                                                                                                                                 | Notes                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `media_assets`       | `owner_user_id`, `bucket`, `storage_file_id` unique, `kind`, `mime_type`, `size_bytes`, `width`, `height`, `duration_seconds`, `status` (`pending`, `ready`, `removed`) |                             |
| `portfolios`         | `provider_id`, `title`, `project_type`, `description`, `category_id`, `materials`, `budget_min_paise`, `budget_max_paise`, `started_on`, `finished_on`                  | Budget optional (Confirmed) |
| `portfolio_items`    | `portfolio_id`, `media_id`, `position`, `caption`                                                                                                                       |                             |
| `content_posts`      | `author_user_id`, `provider_id` nullable, `kind`, `title`, `body`, `category_id`, `tags` text[], `status`, `is_featured`, `published_at`, `deleted_at`                  |                             |
| `content_post_media` | `post_id`, `media_id`, `position`                                                                                                                                       |                             |
| `saved_content`      | `user_id`, `post_id`                                                                                                                                                    | Composite PK                |
| `content_reports`    | `post_id`, `reporter_user_id`, `reason`, `status`, `resolved_by`, `resolved_at`                                                                                         | Unique pair                 |
| `banners`            | `title`, `media_id`, `target`, `starts_at`, `ends_at`, `is_active`, `position`                                                                                          |                             |

## Business (Planned)

Money is stored as integer paise, never floats.

| Table                | Columns                                                                                                                                                                     | Notes                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `subscription_plans` | `name`, `price_paise`, `currency`, `billing_period`, `benefits` jsonb, `provider_product_ids` jsonb, `is_active`                                                            | New row for changed terms                            |
| `subscriptions`      | `provider_id`, `plan_id`, `billing_provider`, `provider_subscription_id`, `status`, `current_period_start`, `current_period_end`, `cancel_at_period_end`, `idempotency_key` | Partial unique on `provider_id` where status is live |
| `payments`           | `subscription_id`, `billing_provider`, `provider_payment_id` unique, `amount_paise`, `currency`, `status`, `paid_at`, `raw_event_id`                                        |                                                      |
| `payment_events`     | `billing_provider`, `event_id`, `event_type`, `payload` jsonb, `processed_at`                                                                                               | Unique `(billing_provider, event_id)`                |
| `invoices`           | `payment_id` unique, `number` unique, `tax_details` jsonb, `pdf_media_id`                                                                                                   | Format pending D-14                                  |
| `refunds`            | `payment_id`, `provider_refund_id` unique, `amount_paise`, `reason`, `status`, `created_by`                                                                                 |                                                      |

## Reputation (Planned)

| Table                    | Columns                                                                                            | Notes                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `reviews`                | `connection_id` unique, `provider_id`, `customer_user_id`, `rating` check 1 to 5, `body`, `status` |                                                          |
| `provider_profile_views` | `provider_id`, `viewer_user_id`, `viewed_on` date                                                  | Unique per day, so counts stay honest                    |
| `lead_views`             | `provider_id`, `requirement_id`, `viewed_at`                                                       | Optional. Add only if lead analytics need it, per flow 6 |

## Platform (Planned)

| Table              | Columns                                                                                         | Notes                              |
| ------------------ | ----------------------------------------------------------------------------------------------- | ---------------------------------- |
| `notifications`    | `user_id`, `kind`, `title`, `body`, `data` jsonb, `read_at`                                     |                                    |
| `outbox_events`    | `kind`, `payload` jsonb, `status`, `attempts`, `next_attempt_at`, `last_error`                  |                                    |
| `rate_limits`      | `key`, `window_start`, `count`                                                                  | Composite PK `(key, window_start)` |
| `admin_audit_logs` | `admin_user_id`, `action`, `target_type`, `target_id`, `reason`, `metadata` jsonb, `ip_address` | Insert only; no `updated_at`       |

## Realtime (TablesDB, not PostgreSQL)

`user_signals`. See [Realtime architecture](../architecture/REALTIME_ARCHITECTURE.md).
