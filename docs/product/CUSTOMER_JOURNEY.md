# Customer Journey

Diagram: [CUSTOMER_FLOW](../architecture/diagrams/CUSTOMER_FLOW.mmd). Status: Planned.

| Stage   | Customer wants                       | Screens                                                          | What must go right                                      |
| ------- | ------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------- |
| Arrive  | To know what this is                 | Splash, sign-in                                                  | Clear value in one sentence                             |
| Sign up | A fast start                         | Phone entry, OTP                                                 | SMS arrives in seconds; retry is obvious                |
| Set up  | Relevance                            | Category selection, basic profile                                | Under one minute; can skip optional fields              |
| Explore | Ideas before committing              | Home, search, inspiration feed, gallery                          | Strong photography; fast image loading                  |
| Post    | To describe a project without jargon | Requirement wizard                                               | One question at a time; draft survives interruption     |
| Wait    | Reassurance                          | My requirements, requirement details                             | A visible status and what happens next                  |
| Choose  | To trust someone                     | Interested professionals, provider profile, portfolio, shortlist | Ratings, real work, comparison                          |
| Connect | To talk                              | Chat                                                             | Phone number stays private until the customer shares it |
| Decide  | To finish                            | Requirement close, review                                        | Closing is one step; reviewing is optional              |
| Return  | The next project                     | Saved content, new requirement                                   | Previous details are reused                             |

Non-technical customers are the priority. Use plain words such as "Find a professional", not "Post a lead". Show one primary action per screen.

Risks: a requirement receiving no interest. Show an honest empty state with a timeframe and suggest browsing providers. Too many interested providers is D-08.
