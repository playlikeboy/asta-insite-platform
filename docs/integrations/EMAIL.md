# Email

**Status:** Planned for M8. Proposed vendor: Resend, sent through Appwrite Messaging, which lists Resend as a provider.

## What is sent

Only low-volume transactional email; see [Notifications](../product/NOTIFICATIONS.md): approval decisions, subscription events, invoices, content removal, deletion confirmation. Sign-in is by phone, so email is optional on an account. Send only when the user has given an address.

## Setup

1. Client verifies a sending domain, for example `mail.<domain>`, adding SPF, DKIM and DMARC records.
2. Create the provider in Appwrite Messaging for each environment.
3. Dev and staging use a sandbox or a restricted recipient list, so tests never reach real users.

## Rules

- Queue through `outbox_events`, never inline in a request.
- Templates live in code with plain-text alternatives.
- Never include OTP codes, full documents or chat content.
- Marketing email needs a separate consent and an unsubscribe link. Not planned for launch.

## When it is down

The outbox retries with backoff. In-app notifications still appear, because they are database rows.

## Unverified

Resend price and limits; not checked in this research. Check before M8.
