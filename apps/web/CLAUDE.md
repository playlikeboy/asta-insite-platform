# apps/web

Next.js 16 App Router: admin dashboard and the API for mobile. Read [Frontend](../../docs/architecture/FRONTEND_ARCHITECTURE.md), [Backend](../../docs/architecture/BACKEND_ARCHITECTURE.md) and [Admin screens](../../docs/design/ADMIN_SCREENS.md).

- Pages render; route handlers validate and call services; services own rules; repositories own queries. `page.tsx` never contains a query or workflow.
- Server code goes in `src/server/<feature>/` when M2 creates it. Database access uses `src/lib/database.ts`.
- Use Node.js runtime for anything touching PostgreSQL. Edge cannot open TCP sockets.
- Add shadcn components with the CLI into `src/components/ui`, and do not hand-edit them without reason.
- Colors come from Tailwind token classes. Admin is light only.
- Tests: `*.test.ts` beside the code; Playwright in `e2e/`, which needs `pnpm build` first.
