---
paths:
  - 'apps/web/**'
---

# Next.js

- Server Components by default; `'use client'` only for interaction.
- `page.tsx` and `route.ts` stay thin: no queries or business workflows.
- Routes touching PostgreSQL use the Node.js runtime. Never use a `NEXT_PUBLIC_` secret.
- Admin pages stay out of search engines. Admin access is checked on the server, not only hidden in the UI.
- Add shadcn components through its CLI. Keep the `components.json` settings.
- Do not read env at module load, because `next build` runs without runtime secrets.
