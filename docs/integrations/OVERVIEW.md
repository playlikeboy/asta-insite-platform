# Integrations Overview

**Nothing here is connected yet.** No Appwrite project, gateway or messaging account has been used by this code. Vendor facts and their sources: [Official references](../technical/OFFICIAL_REFERENCES.md). Design: [Integration architecture](../architecture/INTEGRATION_ARCHITECTURE.md).

| Service                                      | Vendor                                                           | Purpose                | Called from            | Status                                 |
| -------------------------------------------- | ---------------------------------------------------------------- | ---------------------- | ---------------------- | -------------------------------------- |
| Hosting, auth, storage, functions, messaging | [Appwrite](APPWRITE.md)                                          | Main platform          | Web server, mobile SDK | Planned M1, M2                         |
| PostgreSQL                                   | Appwrite Native PostgreSQL                                       | System of record       | Web server only        | Schema Implemented; no hosted database |
| Payments                                     | [Razorpay](RAZORPAY.md), store billing per D-05                  | Provider subscriptions | Web server, webhook    | Planned M4, M10                        |
| OTP SMS                                      | [Appwrite or MSG91](OTP_PROVIDER.md)                             | Phone sign-in          | Appwrite Auth          | Open D-12                              |
| Email                                        | [Resend through Appwrite Messaging](EMAIL.md)                    | Receipts, alerts       | Outbox job             | Planned M8                             |
| Push                                         | [FCM and APNs through Appwrite Messaging](PUSH_NOTIFICATIONS.md) | Notifications          | Outbox job             | Planned M8                             |
| Files                                        | [Appwrite Storage](FILE_STORAGE.md)                              | Media and documents    | Mobile SDK, web server | Planned M3                             |

## Rules for every integration

1. Isolate it behind one module in `apps/web/src/server/integrations/`. Business code never imports a vendor SDK.
2. Keep credentials in server environment variables. Only `EXPO_PUBLIC_*` values reach the app, and they are public.
3. Set a timeout. A vendor call never happens inside a database transaction.
4. Make writes idempotent. Send through the outbox where a retry could duplicate work.
5. Decide what users see when it is down, and write it in that integration's document.
6. Sign up with the client's accounts, not the developer's, so [handover](../operations/HANDOVER.md) is a formality.

## Client-owned accounts needed

| Account                              | Needed by          | Blocks               |
| ------------------------------------ | ------------------ | -------------------- |
| Appwrite organization on a paid plan | M1                 | Deployment, spikes   |
| Domain and DNS access                | M1                 | Admin URL, API URL   |
| Razorpay business account (KYC)      | M4                 | Payments             |
| Apple Developer, Google Play Console | M2 for test builds | Store release (D-16) |
| Firebase project                     | M8                 | Android push         |
| Resend, verified sending domain      | M8                 | Email                |
| DLT registration, if using MSG91     | M2                 | SMS (D-12)           |
