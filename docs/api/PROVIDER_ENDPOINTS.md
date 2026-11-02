# Provider Endpoints

Status: Planned for M4, M6, M7, M8. Bearer auth. "Lead access" means rule BR-13.

| Method        | Path                                        | Requires          | Purpose                                                                |
| ------------- | ------------------------------------------- | ----------------- | ---------------------------------------------------------------------- |
| PUT           | `/api/v1/me/provider-profile`               | Signed in         | Create or update draft. `approvalStatus` is not accepted               |
| PUT           | `/api/v1/me/provider-profile/categories`    | Provider          | Set categories                                                         |
| PUT           | `/api/v1/me/provider-profile/service-areas` | Provider          | Set areas                                                              |
| POST          | `/api/v1/me/provider-profile/credentials`   | Provider          | Add certification, license or award                                    |
| POST          | `/api/v1/me/provider-profile/submit`        | Provider          | Submit for review; validates completeness                              |
| PUT           | `/api/v1/me/provider-profile/availability`  | Lead access       | Toggle available for leads                                             |
| GET           | `/api/v1/leads`                             | Lead access       | Feed: `categoryId`, `city`, `budgetMaxPaise`, `deadlineBefore`, cursor |
| GET           | `/api/v1/leads/:id`                         | Lead access       | Lead details, contact hidden                                           |
| POST          | `/api/v1/requirements/:id/interest`         | Lead access       | Show Interest                                                          |
| DELETE        | `/api/v1/interests/:id`                     | Owner             | Withdraw while pending                                                 |
| GET           | `/api/v1/me/interests`                      | Provider          | Sent interests with status                                             |
| GET           | `/api/v1/me/analytics`                      | Provider          | Profile visits and lead activity                                       |
| GET, POST     | `/api/v1/portfolios`                        | Approved provider | List own, create (blueprint: `POST /api/portfolios`)                   |
| PATCH, DELETE | `/api/v1/portfolios/:id`                    | Owner             | Edit, delete                                                           |
| PUT           | `/api/v1/portfolios/:id/items`              | Owner             | Replace ordered media list                                             |
