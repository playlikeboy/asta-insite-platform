# Milestones

Summary of the [Roadmap](IMPLEMENTATION_ROADMAP.md).

| Milestone | Outcome                   | Blocked by                    | Days | Status           |
| --------- | ------------------------- | ----------------------------- | ---- | ---------------- |
| M0        | Foundation                |                               |      | Complete locally |
| M1        | Environments, spikes      | Push access, Appwrite project | 3    | Not started      |
| M2        | Auth and roles            | D-01, D-07, D-11, D-12, D-16  | 10   | Not started      |
| M3        | Customer discovery        | D-21                          | 10   | Not started      |
| M4        | Provider and subscription | **D-04, D-05**, D-10          | 12   | Not started      |
| M5        | Requirements              | D-02                          | 8    | Not started      |
| M6        | Leads and connections     | D-08                          | 8    | Not started      |
| M7        | Content and portfolio     | D-15                          | 10   | Not started      |
| M8        | Chat, push, reviews       | D-06, D-13                    | 12   | Not started      |
| M9        | Admin                     |                               | 12   | Shell only       |
| M10       | Billing completion        | D-03, D-09, D-14              | 6    | Not started      |
| M11       | Hardening                 | D-20                          | 10   | Not started      |
| M12       | Launch, handover          | **D-16**                      | 5    | Not started      |

**Total: about 106 working days** for M1 to M12, with no buffer.

## Timeline warning (D-18)

The proposal says 100 to 110 working days, or about 20 to 22 weeks. The blueprint says 24 to 28 weeks. The sum above fits the proposal only if nothing slips, the client decides on time, and store review goes smoothly. A solo project with this many open decisions should expect slippage, so the blueprint's longer estimate is the safer commitment. The developer and client must choose.

## Mapping from the blueprint

| Blueprint         | Here       |
| ----------------- | ---------- |
| M1 Foundation     | M0, M1, M2 |
| M2 Customer       | M3, M5     |
| M3 Provider       | M4, M7     |
| M4 Marketplace    | M6         |
| M5 Content        | M7         |
| M6 Communication  | M8         |
| M7 Administration | M9, M10    |
| M8 Production     | M11, M12   |

The blueprint's first deliverables were an SRS, a Figma screen map and an ER diagram. The ER diagram exists. A draft SRS base exists in [Product requirements](../project/PRODUCT_REQUIREMENTS.md), but is unsigned. The Figma map has not been started; [screen inventories](../design/MOBILE_SCREENS.md) are its input.
