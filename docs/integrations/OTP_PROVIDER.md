# OTP Provider

**Status: Open, D-12.** The developer decides after spike S-04.

## Options

|                                   | Appwrite phone OTP                                   | MSG91 with Appwrite custom token                            |
| --------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------- |
| Effort                            | Lowest; built in                                     | Build send and verify endpoints, rate limiting, token issue |
| Cost                              | Listed at $0.003 per SMS to +91; rates may fluctuate | Not verified                                                |
| DLT                               | Handling for Indian routes not stated in docs read   | Client must register entity, sender ID and template         |
| Control over sender name, routing | Low                                                  | High                                                        |
| Security burden                   | On Appwrite                                          | On this project                                             |
| Delivery in India                 | **Unknown until tested**                             | Unknown until tested                                        |

Appwrite's docs do not state that auth SMS can use your own provider. Its Messaging product does list MSG91, but that is for messages you send, not auth. So MSG91 means issuing a custom token after verifying the code ourselves.

## Recommendation

Start with Appwrite phone OTP. Run S-04: 20 of 20 test SMS across Jio, Airtel and Vi delivered within 30 seconds. Move to MSG91 only if this fails or the client requires a branded sender. Client code should use a small auth module, so the swap touches one place.

## Rules, either way

- Codes are never logged, returned by an API or placed in analytics.
- Limit by phone number and by IP. Lock out after repeated failures.
- Do not reveal whether a number is registered.
- Tests use Appwrite mock numbers. Never put real numbers in the repository.
- SMS costs money, so an attacker can run up the bill ("SMS pumping"). Watch daily volume and set a budget alert.

## DLT

Telecom rules require DLT registration of entity, sender ID and templates to send SMS to Indian numbers. The client must do it as the legal entity. Registration can take days, so start early if MSG91 is chosen.

## When it is down

Sign-in by phone fails with a clear retry message. Existing sessions continue. If D-11 enables Google or Apple login, those remain.
