# Auth Endpoints

Status: Planned for M2. OTP, OAuth and sessions on mobile go **directly to Appwrite** through its SDK. The API only verifies identity. [Auth architecture](../architecture/AUTH_ARCHITECTURE.md).

| Method | Path                         | Auth                 | Purpose                                                                      |
| ------ | ---------------------------- | -------------------- | ---------------------------------------------------------------------------- |
| GET    | `/api/v1/me`                 | Bearer               | Current user, profiles, derived roles. Creates the `users` row on first call |
| DELETE | `/api/v1/me`                 | Bearer               | Begin account deletion. Requires fresh OTP proof                             |
| POST   | `/api/v1/me/deletion/cancel` | Bearer               | Cancel during grace                                                          |
| POST   | `/api/v1/admin/auth/session` | Public, rate-limited | Admin sign-in; sets httpOnly cookie                                          |
| DELETE | `/api/v1/admin/auth/session` | Cookie               | Admin sign-out                                                               |

The blueprint's generic `POST /api/auth/session` is split this way because mobile needs no server session.

## `GET /api/v1/me`

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "active",
    "roles": ["customer"],
    "customerProfile": { "fullName": "Asha", "city": "Ranchi" },
    "providerProfile": null,
    "leadAccess": false
  }
}
```

| Error | When                                                                    |
| ----- | ----------------------------------------------------------------------- |
| 401   | Missing, expired or invalid JWT. App refreshes the JWT and retries once |
| 403   | Account suspended                                                       |
