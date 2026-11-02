# Business Rules

Enforced in services, with database constraints where possible. IDs let tests cite rules. "Default" means a working default for an open decision.

## Accounts

- **BR-01** One `users` row per Appwrite user.
- **BR-02** A person may hold customer and provider profiles (Default, D-01).
- **BR-03** Suspended or deleted users are refused on every request.
- **BR-04** Admin rights come only from `admin_users`.

## Providers

- **BR-10** New providers start as `draft`.
- **BR-11** Status moves: `draft` to `pending_review` to `approved` or `rejected`; `rejected` to `pending_review`; `approved` to `deactivated`; `deactivated` to `approved`.
- **BR-12** Only admins can approve, reject or deactivate.
- **BR-13** **Lead access** requires all of: account `active`, `approved`, subscription active by date.
- **BR-14** Only providers with lead access can set `available_for_leads` to true, and losing access clears it from lead notifications.
- **BR-15** At least one category and one service area before review.

## Requirements

- **BR-20** Status: `draft`, `active`, `closed`, `expired`, `removed`.
- **BR-21** Providers can see only `active` requirements in their categories and areas.
- **BR-22** Before connection, providers never see customer name, phone, email or exact address (Default, D-08). City or locality is visible.
- **BR-23** Editing an active requirement keeps existing interests and notifies them.
- **BR-24** Closing stops new interest and leaves existing connections and chats open.
- **BR-25** Answers are stored against the question version answered.
- **BR-26** Requirements expire after 60 days without activity (Assumption, for client approval).

## Interest and connection

- **BR-30** One interest per provider per requirement.
- **BR-31** Interest status: `pending`, `accepted`, `declined`, `withdrawn`.
- **BR-32** Only the requirement's owner can accept or decline.
- **BR-33** No cap on providers or on interests (Default, D-08).
- **BR-34** A shortlist is private to the customer and grants nothing.
- **BR-35** Accepting creates one connection and one conversation atomically.
- **BR-36** A provider cannot show interest in their own requirement.

## Messaging

- **BR-40** Conversations exist only from connections.
- **BR-41** Only members read or write.
- **BR-42** Suspending a user blocks their sending at once.
- **BR-43** A lapsed subscription does not cut off existing conversations (Assumption, D-04).
- **BR-44** Phone numbers are shared only if a user chooses (Default, D-06).

## Subscriptions and payments

- **BR-50** Only verified gateway or store events activate or renew.
- **BR-51** One live subscription per provider.
- **BR-52** Amounts are integers in paise.
- **BR-53** Plans are versioned by creating a new row; a sold plan's terms never change.
- **BR-54** Refunds cannot exceed the amount paid.
- **BR-55** Payment before approval is not allowed (Default, D-10).

## Content

- **BR-60** Only approved providers publish to discovery.
- **BR-61** Publish immediately; reports go to moderators (Default, D-15).
- **BR-62** Removed content is hidden everywhere and kept for the audit period.

## Reviews

- **BR-70** One review per connection, by the customer, rating 1 to 5 (Default, D-13).
- **BR-71** Providers cannot edit or delete reviews and can report them.
