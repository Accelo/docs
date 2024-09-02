## Statuses

Statuses are used to track the progress of work. See the [support
documentation](https://help.accelo.com/faq/automating-your-business-processes/statuses/) for more
information. Since many resources on Accelo track various types and aspects of work, statuses are present in many
different resources. Currently, statuses are supported on the following objects:

* [Affiliations](#affiliations)
* [Companies](#companies)
* [Contacts](#contacts)
* [Contracts](#contracts)
* [Issues](#issues)
* [Jobs](#jobs-projects)
* [Milestones](#milestones)
* [Prospects](#prospects-sales)
* [Quotes](#quotes)

### Status Objects
The status object contain the following:

| Fields | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the status. |
| **title** | string | A title for the status. |
| color | string | The color the status will appear in the Accelo deployment. |
| standing | string | The standing of the status. For example "active", "paused". |
| start | string | Either "yes" or "no", whether this status is available upon creation of the object. |
| ordering | unsigned | A number representing the status' order on the Accelo deployment. |

Note that each resources keeps track of statuses separately, so a given status may not contain all the fields listed
above, if this is the case we will state it in that resource's section.
