# Content System

**Status:** Planned for M7. Depends on D-15 and spike S-07.

## Types

| Type                    | Author   | Where shown                          | Table                                          |
| ----------------------- | -------- | ------------------------------------ | ---------------------------------------------- |
| Portfolio project       | Provider | Provider profile; discovery          | `portfolios`, `portfolio_items`                |
| Blog or write-up        | Provider | Provider profile; discovery          | `content_posts` (`kind = article`)             |
| Status update           | Provider | Provider profile; discovery          | `content_posts` (`kind = update`)              |
| Short video             | Provider | Discovery; profile                   | `content_posts` (`kind = video`)               |
| Educational or tutorial | Admin    | Discovery; provider learning section | `content_posts` (`kind = guide`, admin author) |
| Banner                  | Admin    | Home                                 | `banners`                                      |

## Discovery feed

First version: filter by category and tag, newest first, cursor pagination, active providers only. Curation is a `is_featured` flag set by admins (Confirmed: "curated per category"). No recommendation engine.

## Saved content

`saved_content(user_id, content_post_id)`. Unique per pair. Saving deleted content hides it from the list.

## Moderation

| Status         | Meaning                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| `published`    | Visible                                                                                                           |
| `under_review` | Reported above a threshold, or in a pre-moderation queue if D-15 chooses that. Hidden from feeds if pre-moderated |
| `removed`      | Hidden; reason recorded; provider notified                                                                        |

Reports go in `content_reports` with a reason. One report per user per item. Apple guideline 1.2 expects user-generated content apps to offer filtering, reporting, blocking and a contact method. That text was not re-read for this document, so check it before release.

## Media handling

See [Storage architecture](../architecture/STORAGE_ARCHITECTURE.md). Show thumbnails from Appwrite previews. Keep autoplay off on mobile data. Keep original files private to the bucket's permissions.

## Tags

Free-form tags stored as a normalized lowercase `text[]` with a GIN index. Admins can hide a tag. Hashtags in text become tags.
