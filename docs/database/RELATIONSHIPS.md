# Relationships

## Delete behavior

| Parent to child                                         | On delete                                       | Why                                                     |
| ------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------- |
| `users` to `customer_profiles`, `provider_profiles`     | Cascade                                         | Implemented. Profile has no meaning alone               |
| `users` to `admin_users`                                | Restrict                                        | Implemented. Forces explicit removal of admin rights    |
| `users` to `requirements`, `messages`, `reviews`        | Restrict; users are soft-deleted and anonymized | Others depend on these records                          |
| `requirements` to answers, media, interests, shortlists | Cascade                                         | Removed together; rare in practice due to soft delete   |
| `provider_profiles` to categories, areas, portfolios    | Cascade                                         |                                                         |
| `provider_profiles` to `subscriptions`, `payments`      | Restrict                                        | Financial records stay                                  |
| `connections` to `conversations`                        | Restrict                                        |                                                         |
| `conversations` to members, messages                    | Cascade                                         | Only on retention purge                                 |
| `media_assets` to link tables                           | Restrict                                        | Remove links first, so a file is never silently missing |
| `admin_users` to `admin_audit_logs`                     | Restrict                                        | Audit logs stay                                         |

## Cardinality, from the blueprint

- One customer creates many requirements.
- One requirement receives interest from many providers.
- One provider shows interest in many requirements.
- One provider has many portfolio projects.
- One provider has a subscription history, with at most one live subscription.
- One conversation has many messages and two members in the first version.

## Rules a foreign key cannot express

Service code must enforce these and tests must cover them:

- A `connections` row's customer and provider match its interest and requirement.
- A provider is not the owner of the requirement they show interest in.
- `requirement_answers.question_id` belongs to the requirement's category and question version.
- Only the two connection parties can be conversation members.

## Across systems

| Link                                           | Consistency                                           |
| ---------------------------------------------- | ----------------------------------------------------- |
| `users.appwrite_user_id` to Appwrite user      | Created on first `GET /me`; removed by deletion job   |
| `media_assets.storage_file_id` to Storage file | Verified when registered; cleanup job handles orphans |
| `user_signals` row to `users.id`               | Disposable; recreated on demand                       |

No SQL joins are possible across these. The backend connects them.
