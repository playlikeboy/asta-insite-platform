# packages/contracts

Zod schemas shared by mobile and web: the API's public language. Read [API standards](../../docs/api/API_STANDARDS.md).

- No business logic, database imports or React. Only `zod`.
- Changes here are API changes. Keep them additive, because old app versions stay in use. Breaking changes need `/api/v2`.
- Update `docs/api/openapi.yaml` and the matching endpoint document in the same commit.
