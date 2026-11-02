# Performance

Targets are Proposed; no production measurements exist.

| Metric                               | Target                                |
| ------------------------------------ | ------------------------------------- |
| API read p95, from Ranchi            | Under 300 ms (S-02)                   |
| API write p95                        | Under 500 ms                          |
| Chat send-to-signal p95              | Under 2 s (S-03)                      |
| Mobile cold start, mid-range Android | Under 3 s                             |
| Admin Largest Contentful Paint       | Under 2.5 s                           |
| Mobile feed scroll                   | Smooth at 60 fps on a mid-range phone |

Test on a mid-range Android phone on 4G, since it represents the audience better than a developer's device.

## Backend

- Reuse one connection pool per process; use port 6432 at runtime.
- Keep transactions short. No vendor calls inside them.
- Keyset pagination; see [Indexing](../database/INDEXING_STRATEGY.md).
- Avoid N+1 queries. Denormalize ratings. Move slow work to the outbox.
- Pool size small: serverless instances multiply connections. Confirm limits on each database tier.

## Mobile

- `FlashList` for long lists, added when a list first needs it.
- `expo-image` for caching and thumbnails, never full-size originals in grids.
- TanStack Query cache; sensible `staleTime`. Paginate.
- Compress before upload.
- Import only what you use from icon packages.

## Web

- Server Components by default. Stream long pages. Standalone output reduces cold starts on Sites (vendor statement).

## Region

App servers and database are in Singapore, users in India. Sites runs SSR at the "nearest edge location", which could add distance between app and database. That is what S-02 measures.

## Caching

Categories and public feeds may be cached briefly. Never cache per-user responses publicly. Lead access is never cached.

## Monitoring

See [Monitoring](../operations/MONITORING.md). Optimize measured problems, not guesses.
