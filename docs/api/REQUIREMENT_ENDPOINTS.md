# Requirement Endpoints

Status: Planned for M5 and M6. Bearer auth. Flows 4, 7 and 8 in [User flows](../product/USER_FLOWS.md).

| Method | Path                                             | Requires          | Purpose                                |
| ------ | ------------------------------------------------ | ----------------- | -------------------------------------- |
| POST   | `/api/v1/requirements`                           | Customer          | Create (draft or active)               |
| GET    | `/api/v1/requirements`                           | Customer          | **Own** requirements: `status`, cursor |
| GET    | `/api/v1/requirements/:id`                       | Owner             | Full details                           |
| PATCH  | `/api/v1/requirements/:id`                       | Owner             | Edit                                   |
| POST   | `/api/v1/requirements/:id/close`                 | Owner             | Close                                  |
| GET    | `/api/v1/requirements/:id/interests`             | Owner             | Interested providers                   |
| POST   | `/api/v1/interests/:id/accept`                   | Requirement owner | Creates connection and conversation    |
| POST   | `/api/v1/interests/:id/decline`                  | Requirement owner | Decline                                |
| PUT    | `/api/v1/requirements/:id/shortlist/:providerId` | Owner             | Add (idempotent)                       |
| DELETE | `/api/v1/requirements/:id/shortlist/:providerId` | Owner             | Remove                                 |
| GET    | `/api/v1/requirements/:id/shortlist`             | Owner             | List                                   |
| GET    | `/api/v1/connections`                            | Party             | Own connections                        |

The blueprint's `GET /api/requirements` searched requirements for providers. That use is `GET /api/v1/leads`, which has different visibility rules, so the two are separate.

## Create body

```json
{
  "categoryId": "uuid",
  "questionVersion": 3,
  "title": "Paint a 2BHK flat",
  "description": "Interior walls only",
  "state": "Jharkhand",
  "city": "Ranchi",
  "locality": "Lalpur",
  "budgetMinPaise": 2000000,
  "budgetMaxPaise": 5000000,
  "deadline": "2027-01-15",
  "answers": [{ "questionId": "uuid", "value": "2 BHK" }],
  "mediaIds": ["uuid"],
  "status": "active"
}
```

## Errors

| Status | When                                                      |
| ------ | --------------------------------------------------------- |
| 409    | `questionVersion` is out of date; app refetches questions |
| 422    | Required answers missing or wrong type                    |
| 429    | Daily limit reached                                       |

## Accept response

```json
{ "success": true, "data": { "connectionId": "uuid", "conversationId": "uuid" } }
```
