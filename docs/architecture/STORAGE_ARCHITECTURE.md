# Storage Architecture

**Status:** Planned for M3 and M7. See [ADR-006](ARCHITECTURE_DECISIONS.md#adr-006-appwrite-storage-with-server-registered-media).

## Buckets

| Bucket              | Contents                                      | Read access                                 | Max size                                     | Types                          |
| ------------------- | --------------------------------------------- | ------------------------------------------- | -------------------------------------------- | ------------------------------ |
| `public-media`      | Portfolio and post images and videos, avatars | Any signed-in user                          | Image 10 MB, video 200 MB (Assumption, S-07) | jpg, png, webp, heic, mp4, mov |
| `requirement-media` | Requirement photos and attachments            | Owner, interested providers through the API | 20 MB                                        | jpg, png, webp, heic, pdf      |
| `private-documents` | Licenses, certifications, chat documents      | Owner and admins, through the API           | 20 MB                                        | pdf, jpg, png                  |

New buckets grant no access by default, which is the correct baseline. Enable encryption on private buckets. Files over 20 MB cannot be encrypted, which is why private limits stop at 20 MB.

## Upload flow

1. Client calls `POST /api/v1/media/uploads` with purpose, type and size. The server checks them and returns the bucket and a file ID.
2. Client uploads to Appwrite with the SDK, which handles chunking.
3. Client calls `POST /api/v1/media/uploads/:id/complete`. The server re-reads the real file's size and type, creates `media_assets`, and sets permissions.
4. Rows reference `media_assets`. Unregistered files are deleted after 24 hours.

## Serving

- Images: use Appwrite preview parameters for thumbnails (`width`, `quality`, `output=webp`).
- Private files: the API checks permission, then issues a short-lived file token.
- Video: **Appwrite documents no transcoding or adaptive streaming.** Plan on short clips, played directly. Compress on the device before upload. If quality or bandwidth becomes a problem, add a video vendor through an ADR. Verified in S-07.

## Open items

- Antivirus status on Cloud was not stated on the page read. Check before accepting documents.
- Per-plan upload limits need checking on the pricing page (S-08).

Security rules are in [File security](../security/FILE_SECURITY.md).
