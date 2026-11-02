# File Storage

**Status:** Planned for M3. Design: [Storage architecture](../architecture/STORAGE_ARCHITECTURE.md). Security: [File security](../security/FILE_SECURITY.md).

## Buckets

Sizes are proposals until spike S-07. Bucket extension and size settings are enforced by Appwrite in addition to the API's checks.

| Bucket              | Visibility           | Contents                           | Types                                | Max size (proposed)       |
| ------------------- | -------------------- | ---------------------------------- | ------------------------------------ | ------------------------- |
| `public-media`      | Public read          | Portfolio, posts, avatars, banners | jpg, jpeg, png, webp, heic, mp4, mov | 10 MB image, 200 MB video |
| `requirement-media` | Private              | Requirement photos and documents   | jpg, jpeg, png, webp, heic, pdf      | 10 MB                     |
| `chat-attachments`  | Private              | Chat files                         | jpg, jpeg, png, webp, heic, pdf      | 20 MB                     |
| `verification-docs` | Private, admins only | Provider credentials               | jpg, jpeg, png, pdf                  | 10 MB                     |
| `invoices`          | Private              | Generated PDFs                     | pdf                                  | 5 MB                      |

Files over 20 MB cannot be encrypted or compressed by Appwrite (verified), which is why private buckets stop at 20 MB.

## Images and video

- Thumbnails: Appwrite preview API (up to 4000 px, `webp` or `avif`, cached). Plan restrictions not stated on the page read.
- Video: no transcoding or adaptive streaming in the first version. Compress on the device, limit length, show a poster image. Playback must be tested in S-07.

## When it is down

Uploads show a retry; text in a form is kept. Screens show placeholders in place of images. Other functions continue.

## Costs

Storage and bandwidth are the likeliest growth in the bill. Details in [Cost estimates](COST_ESTIMATES.md).
