# Customer Endpoints

Status: Planned for M3, M6, M7. All need Bearer auth and a customer profile unless noted.

| Method | Path                             | Purpose                                                                   |
| ------ | -------------------------------- | ------------------------------------------------------------------------- |
| PUT    | `/api/v1/me/customer-profile`    | Create or update profile. Any signed-in user                              |
| PUT    | `/api/v1/me/customer-categories` | Set categories of interest                                                |
| GET    | `/api/v1/providers`              | Search approved providers: `categoryId`, `city`, `minRating`, `q`, cursor |
| GET    | `/api/v1/providers/:id`          | Public profile, portfolio summary, ratings. Records a daily view          |
| GET    | `/api/v1/providers/:id/reviews`  | Reviews                                                                   |
| GET    | `/api/v1/saved-content`          | Saved items                                                               |
| PUT    | `/api/v1/saved-content/:postId`  | Save (idempotent)                                                         |
| DELETE | `/api/v1/saved-content/:postId`  | Unsave                                                                    |
| POST   | `/api/v1/connections/:id/review` | Leave a review                                                            |

Budget filtering on providers (Confirmed in C-13) depends on providers publishing a typical budget range. Add that field in M4.

Provider responses never include phone, email or `appwrite_user_id`.
