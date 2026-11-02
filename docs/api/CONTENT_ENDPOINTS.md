# Content Endpoints

Status: Planned for M3 (media) and M7. Bearer auth.

| Method        | Path                                 | Requires          | Purpose                                              |
| ------------- | ------------------------------------ | ----------------- | ---------------------------------------------------- |
| GET           | `/api/v1/feed`                       | Signed in         | Discovery: `categoryId`, `tag`, `kind`, cursor       |
| GET           | `/api/v1/posts/:id`                  | Signed in         | Post details                                         |
| POST          | `/api/v1/posts`                      | Approved provider | Create post                                          |
| PATCH, DELETE | `/api/v1/posts/:id`                  | Owner             | Edit, soft delete                                    |
| POST          | `/api/v1/posts/:id/report`           | Signed in         | Report; one per user                                 |
| GET           | `/api/v1/banners`                    | Signed in         | Active banners                                       |
| POST          | `/api/v1/media/uploads`              | Signed in         | Validate purpose, type, size; get bucket and file ID |
| POST          | `/api/v1/media/uploads/:id/complete` | Owner             | Verify real file; register asset                     |
| GET           | `/api/v1/media/:id/access`           | Permitted user    | Short-lived file token for private files             |

`purpose` values: `avatar`, `portfolio`, `post`, `requirement`, `credential`, `chat`. Each maps to a bucket and limits; see [Storage architecture](../architecture/STORAGE_ARCHITECTURE.md).
