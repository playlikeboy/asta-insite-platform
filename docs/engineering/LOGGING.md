# Logging

**Status:** Planned for M2. No logger exists yet because there is nothing to log but the health route. Use structured JSON to stdout, without adding a logging library until the need is proven.

## Fields

`timestamp`, `level`, `message`, `requestId`, `route`, `status`, `durationMs`, `userId` (internal UUID only), `errorCode`.

## Levels

| Level   | Use                                                           |
| ------- | ------------------------------------------------------------- |
| `error` | Needs attention: unexpected exception, job permanently failed |
| `warn`  | Handled but notable: bad webhook signature, retry             |
| `info`  | Key events: request summary, job run, state change            |
| `debug` | Off in production                                             |

## Never log

Tokens, cookies, API keys, OTP codes, passwords, connection strings, phone numbers, email addresses, addresses, message bodies, document contents, full webhook payloads, card or UPI details.

Redact at the logger by key name, as a safety net.

## Request IDs

Generate per request; return as `x-request-id`; include in 500 responses. Users can quote it to support.

## Audit logs are different

`admin_audit_logs` is a database record of admin decisions, kept for years. Application logs are for debugging and expire.

## Retention

Function logs last 7 days on Pro (verified). Sites log retention is not stated in the docs read. Confirm in S-01. Consider a log drain if this proves too short. See [Monitoring](../operations/MONITORING.md).

## `console.log`

Banned in source. The project logger is the one allowed place to write to the console.
