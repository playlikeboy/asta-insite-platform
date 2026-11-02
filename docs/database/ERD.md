# Entity Relationship Diagram

**Implemented:** `users`, `customer_profiles`, `provider_profiles`, `admin_users`, `service_categories`. **All others Planned.** Field details: [Schema reference](SCHEMA_REFERENCE.md).

```mermaid
erDiagram
  users ||--o| customer_profiles : has
  users ||--o| provider_profiles : has
  users ||--o| admin_users : has
  users ||--o{ notifications : receives
  users ||--o{ saved_content : saves
  users ||--o{ customer_categories : selects
  service_categories ||--o{ customer_categories : ""
  users ||--o{ media_assets : owns
  users ||--o{ conversation_members : joins

  service_categories ||--o{ provider_categories : ""
  service_categories ||--o{ category_questions : ""
  service_categories ||--o{ requirements : ""
  provider_profiles ||--o{ provider_categories : ""
  provider_profiles ||--o{ service_areas : ""
  provider_profiles ||--o{ provider_credentials : ""

  customer_profiles ||--o{ requirements : posts
  requirements ||--o{ requirement_answers : ""
  category_questions ||--o{ requirement_answers : ""
  requirements ||--o{ requirement_media : ""
  media_assets ||--o{ requirement_media : ""

  requirements ||--o{ provider_interests : receives
  provider_profiles ||--o{ provider_interests : shows
  requirements ||--o{ shortlists : ""
  provider_profiles ||--o{ shortlists : ""
  provider_interests ||--o| connections : becomes
  connections ||--|| conversations : opens
  conversations ||--o{ conversation_members : ""
  conversations ||--o{ messages : ""
  messages ||--o{ message_attachments : ""
  media_assets ||--o{ message_attachments : ""
  connections ||--o| reviews : allows

  provider_profiles ||--o{ portfolios : ""
  portfolios ||--o{ portfolio_items : ""
  media_assets ||--o{ portfolio_items : ""
  provider_profiles ||--o{ content_posts : ""
  content_posts ||--o{ content_post_media : ""
  media_assets ||--o{ content_post_media : ""
  content_posts ||--o{ saved_content : ""
  content_posts ||--o{ content_reports : ""
  provider_profiles ||--o{ provider_profile_views : ""
  provider_profiles ||--o{ lead_views : ""
  requirements ||--o{ lead_views : ""

  subscription_plans ||--o{ subscriptions : ""
  provider_profiles ||--o{ subscriptions : ""
  subscriptions ||--o{ payments : ""
  payments ||--o| invoices : ""
  payments ||--o{ refunds : ""

  admin_users ||--o{ admin_audit_logs : writes
```

Standalone tables: `payment_events`, `banners`, `outbox_events`, `rate_limits`.

## Changes from the original entity list

| Change                                                                                                                                        | Why                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `requirement_questions` becomes `category_questions`                                                                                          | Questions belong to a category and are versioned; answers belong to a requirement                                                                   |
| `device_tokens` removed                                                                                                                       | Appwrite Messaging stores push targets ([ADR-012](../architecture/ARCHITECTURE_DECISIONS.md#adr-012-native-push-tokens-through-appwrite-messaging)) |
| `ratings` merged into `reviews`                                                                                                               | One rating per review; two tables would duplicate it                                                                                                |
| `provider_analytics` replaced by `provider_profile_views`                                                                                     | Store events and derive numbers                                                                                                                     |
| `reports` becomes `content_reports`                                                                                                           | Clearer name; business reports are queries                                                                                                          |
| `user_profiles` named `users`                                                                                                                 | Avoids two identity concepts                                                                                                                        |
| Added `payment_events`, `outbox_events`, `rate_limits`, `saved_content`, `banners`, `content_post_media`, `message_attachments`, `shortlists` | Needed by workflows                                                                                                                                 |
