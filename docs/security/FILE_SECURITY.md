# File Security

**Status:** Planned for M3. Design: [Storage architecture](../architecture/STORAGE_ARCHITECTURE.md). Buckets: [File storage](../integrations/FILE_STORAGE.md).

## Upload controls

1. The API validates purpose, type and size, then returns the target.
2. The client uploads directly to Appwrite with its own session.
3. `complete` fetches actual metadata from Storage. Client-sent values are never trusted.
4. A file not completed within 24 hours gets removed by `clean-orphan-media`.

Check the file's real signature for documents and images where practical, not only the extension. Reject SVG and HTML, since browsers can execute them. Strip EXIF location from public images before upload where the device library allows, because a photo can reveal a home address.

## Access

| Bucket              | Read                                               | Write                        |
| ------------------- | -------------------------------------------------- | ---------------------------- |
| `public-media`      | Anyone                                             | Owner through the flow above |
| `requirement-media` | Owner, connected provider, approved leads per D-08 | Owner                        |
| `chat-attachments`  | Conversation members                               | Members                      |
| `verification-docs` | Owner, Operations, Super admin                     | Owner                        |
| `invoices`          | Owner, Finance, Super admin                        | Server only                  |

Private file access goes through `GET /api/v1/media/:id/access`, which checks permission, then issues a short-lived file token. File tokens grant access **without** permissions, so keep expiry to minutes and never store them.

## Malware

Appwrite's antivirus details were not on the docs read, so do not assume coverage. Confirm in S-07. Until then, block executable types, open documents through the OS viewer and warn users about files from others.

## Deletion

Removing a file deletes it from Storage and marks the `media_assets` row. Verification documents have a retention limit in [Data retention](../database/DATA_RETENTION.md).

## Abuse

Limit per user: uploads per hour and total storage. Removed content is hidden at once and its file deleted after the retention period.

## Tests

Oversized file, wrong type, another user's `complete`, access token denied to a non-member, expired token.
