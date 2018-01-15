## Issues
> Resource URI:  
`/api/v0/issues`

Issues (also known as "Tickets") are used for when you need to track billable time against a client, but don’t need the complexity of a full Project and its workflow and components. For example, issues may be used to track support cases where you’re diagnosing and fixing a problem and don’t know beforehand the specific steps which will be required to resolve the Issue. See the [support documentation](https://www.accelo.com/resources/help/guides/user/modules/tickets/#WhenTickets) for more information on these objects.

### The Issue Object
> Example issue object:

```json
{
  "assignee": "14",
  "title": "Issue with public field",
  "referrer_type": null,
  "affiliation": "98",
  "date_submitted": "1493872605",
  "resolution_detail": "I fixed the field, it now displays as expected.",
  "staff_bookmarked": "1",
  "against": "companies/39",
  "contract": "1",
  "billable_seconds": "1400",
  "submitted_by": "14",
  "against_type": "company",
  "date_due": "1493906400",
  "contact": "98",
  "date_closed": "1495683190",
  "standing": "closed",
  "object_budget": "8",
  "date_started": "1493820000",
  "class": "19",
  "resolved_by": "14",
  "date_last_interacted": "1493872783",
  "resolution": "8",
  "closed_by": "14",
  "date_resolved": "1495683190",
  "referrer_id": null,
  "custom_id": "",
  "status": "4",
  "opened_by": "14",
  "type": "1",
  "description": "A public field is showing as public",
  "against_id": "39",
  "id": "7",
  "company": "39",
  "issue_priority": "1",
  "date_opened": "1493872605"
}
```

The issue object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the issue. |
| **title** | string | A name for the issue |
| custom_id | string | The custom ID for the issue. Only issues whose [type](#the-issue-type) allows custom IDs will have a value for this field. |
| description | string | A description of the issue. |
| against | string | The API URI of the object this issue is against. |
| against_type | string | A string representing the type of object this issue is against. |
| against_id | unsigned | The unique identifier of the object this issue is against.
| type | unsigned or object | The [issue type](#the-issue-type) of this issue. Deprecated, please use `issue_type`. |
| issue_type | unsigned or object | The [issue type](#the-issue-type) of this issue. |
| affiliation | unsigned or object | The [affiliation](#affiliations) associated with this issue. |
| class | unsigned or object | The [issue class](#the-issue-class) of this issue. |
| priority | unsigned or object | **Deprecated** please use `issue_priority` |
| issue_priority | unsigned or object | The [priority](#the-issue-priority) of the issue. |
| resolution | unsigned or object | The [resolution type](#the-issue-resolution) used by the issue, if it has been resolved. |
| resolution_detail | string | A description of the resolution, if resolved. |
| status | unsigned or object | The [status](#statuses) of the issue. |
| standing | string | The standing of the issue, taken from the issue [status](#statuses). |
| date_submitted | unix ts | The date the issue was submitted |
| submitted by | unsigned or object | The staff member who submitted the issue. |
| date_opened | unix ts | The date the issue was opened. |
| opened_by | unsigned or object | The staff member who opened the issue. |
| date_resolved | unix ts | If resolved, the date the issue was resolved. |
| resolved_by | unsigned or object | The staff member who resolved the issue. |
| date_closed | unix ts | If closed, the date the issue was closed. |
| closed_by | unsigned or object | The staff member who closed the issue. |
| date_due | unix ts |  The due date for the issue. |
| date_last_interacted | unix ts | The date the issue was last interacted with. |
| referrer_type | string | If the issue was created from the deployment as a "related issue" to an object, this will be the object's type. |
| referrer_id |  unsigned | The unique identifier of this related object. |
| staff_bookmarked | boolean | Whether the current viewer has bookmarked the issue. |
| billable_seconds | unsigned | The amount of billable time, in seconds, on the issue.|
| company | unsigned or object | If `against_type` is company, the company the issue is against. |
| assignee | unsigned or object | The staff assigned to the issue. |
| contract | unsigned or object | If the issue is assigned a [contract](#contracts) (retainer), this will return the contract object. |
| issue_object_budget | unsigned or object | The [object budget](#object-budgets) associated with the issue. |
| object_budget | unsigned or object | **Deprecated** please use `issue_object_budget`. |

#### The Issue Priority
> Example priority object:

```json
{
  "title": "Extreme",
  "id": "1",
  "color": "Red",
  "factor": "5"
}
```

Issue priorities help you keep track of what needs to be done. They may be set up from the deployment, see the [support documentation](https://www.accelo.com/resources/videos/config-and-setup/tickets/priorities/) for information. They contain the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the priority. |
| **title** | string | A name for the priority. |
| color | select | The color of the priority when displayed on the deployment. The colors, in order of increasing urgency a "grey", "blue", "green", "orange", "red". |
| factor | unsigned | A number representing the urgency of the priority. 5 is "Extreme", 1 is "None". |

#### The Issue Status
> Example issue status object:

```json
{
  "standing": "open",
  "start": "yes",
  "color": "yellow",
  "ordering": "2",
  "title": "Open",
  "id": "2"
}
```

Statuses may be used to track the progress of an issue. These statuses may be configured from the deployment, see the [support documentation](https://www.accelo.com/resources/help/faq/automating-your-business-processes/statuses/) for more information. The status objects contain the following

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the status. |
| **title** | string | A name for the status. |
| standing | string | A string describing the standing of the issue. |
| color | string | The color of the status shown on the deployment. |
| start | select | Either "yes" or "no", whether an issue may be created with this status. |
| ordering | unsigned | A number describing the order of the status on the deployment. |

#### The Issue Type
> Example issue type object:

```json
{
  "notes": "Issue type for support issues.",
  "standing": "active",
  "title": "Support",
  "id": "2",
  "parent": "0"
}
```

Issue types let you sort your issues according to the type of work the entail. Issue types may be set up and edited from the deployment, see the [support documentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/modules/tickets/#Types) for more information.

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the issue type. |
| **title** | string | A name for the issue type. |
| notes | string | Notes about the issue type. |
| parent | unsigned | The unique identifier of the parent issue type. If there is no parent has the value "0" |
| standing | select | Either "active" or "inactive", the standing of the issue type.  |
| budget | select | Either "yes" or "no", whether issues under this type are billable. |
| ordering | unsigned | A number describing the type's ordering on the deployment. |

**Note:** the `type` field is deprecated, please request the issue type object through the
`issue_type` field, which contains the following additional fields:

| Field | Type | Description |
|:-|:-|:-|
| default_class_id | unsigned | The unique identifier of the default [issue class](#the-issue-class) for this type of issue. Default is `null`. |
| has_custom_id | boolean | Either "1" or "0", whether the issue type uses custom ids. |

#### The Issue Resolution
> Example issue resolution:

```json
{
  "standing": "active",
  "title": "Support Resolution",
  "id": "8",
  "parent": "7",
  "report": "Use this resolution when resolving support issues.",
  "description": "I fixed the field, it now displays as expected."
}
```

Issue resolutions track how certain issues are resolved and may be set up on the deployment, see the [support documentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/modules/tickets/ticket-resolutions/) for more information. The issue resolution contains the following:

| Field | Type | Descriptions |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the issue resolution. |
| **title** | string | A name for the issue resolution. |
| parent | unsigned | The unique identifier of the parent resolution, it there is no parent this has value "0". |
| description | string | A generic description of the resolution, may be changed for a given issue. |
| report | string | A fixed description of the resolution. |
| standing | select | Either "active" or "inactive", the standing of the resolution. |

#### The Issue Class
> Example issue class:

```json
{
  "standing": "active",
  "description": "For issues pertaining to our website",
  "parent": "0",
  "title": "Website",
  "id": "2"
}
```

Issue classes help to classify symptoms or characteristics of an issue. They can be set up from the deployment, see the [support documentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/modules/tickets/ticket-classes/) for information. Ticket classes contain the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique description for the class. |
| **title** | string | A name for the class. |
| description | string | A description of the class. |
| parent | unsigned | The unique identifier of the parent class, if there is no parent this  has value "0". |
| standing | select | Either "active" or "inactive", the standing of the class. |







### Get Issue
> Sample Request:  

```http
GET /api/v0/issues/{issue_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deplyoment}.api.accelo.com/api/v0/issues/{issue_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /issues/{issue_id}`

This request returns a single issue, identified by its `issue_id`.

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [issue object](#the-issue-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

#### handling the Response
The response will be the single requested [issue](#the-issue-object) with its default fields, and any additional fields requested through `_fields`.







### List Issues
> Sample Request:  

```http
GET /api/v0/issues HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deplyoment}.api.accelo.com/api/v0/issues \
  -H 'authorization: Bearer {access_token}'
```

`GET /issues`

This request returns a list of [issue objects](#the-issue-object) on the deployment.

#### Pagination
This request supports the standard [pagination](#configuring-the-response-pagination) parameters.

#### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [issues object](#the-issue-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

##### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| standing ||
| custom_id |
| referrer_type ||
| referrer_id ||
| against_id ||
| against_type ||
| status | Filter by the `status_id` of the issue. |
| type | Filter by the `type_id` of the issue. Deprecated, please use `issue_type`. |
| issue_type | Filter by the `issue_type_id`. |
| affiliation | Filter by the `affiliation_id` of the issue. |
| class | Filter by the `class_id` of the issue. |
| priority | Filter by the `priority_id` of the issue. |
| resolution | Filter by the `resolution_id` of the issue. |
| submitted_by | Filter by the `staff_id` of the submitter. |
| opened_by | Filter by the `staff_id` of the user who opened the issue. |
| closed_by | Filter by the `staff_id` of the user who closed the issue. |
| resolved_by | Filter by the `staff_id` of the user who resolved the issue. |
| assignee | Filter by the `staff_id` of the assignee. |
| contract | Filter by the `contract_id` of any linked contracts. |

##### Date Filters
This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| date_opened |
| date_submitted |
| date_started |
| date_due |
| date_closed |

##### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| date_opened ||
| date_submitted ||
| date_started ||
| date_due ||
| date_closed ||
| date_resolved ||
| date_last_interacted |
| title ||
| standing ||
| status | Order by the `status_id` |

##### Range Filters
This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|:-|
| id |
| reopened_count | Range over the number of times the issue has been reopened. |
| rate_charged ||
| against_id ||
| billable_seconds ||
| assignee | Range over the `staff_id` of assignees. |
| type | Range over the `type_id`. Deprecated, please use `issue_type`. |
| issue_type | Range over `issue_type_id`. |
| affiliation | Range over the  `affiliation_id`. |
| class | Range over the `class_id`. |
| resolution | Range over the `range_id`. |
| priority | Range over the `priority_id`. |
| submitted_by | Range over the `staff_id` of submitters. |
| opened_by | Range over the `staff_id` of staff members who opened issues. |
| resolved_by | Range over the `staff_id` of staff members who resolved issues. |
| closed_by. | Range over the `staff_id` of staff members who closed issues. |
| status | Range over the `status_id`. |
| rate | Range over the `rate_id` of the rate charged. |
| contract | Range over the `contract_id` of contracts linked to issues. |

##### Object Filters
This request supports the following [object filters](#filters-object-filters):

|  Filter Name  | Description |
|:-|:-|
| against | Filter by issues against these objects. |
| referrer | Filter by issues referred by these objects. |

##### Searching
This request supports using the `_search` function to search over the following fields:

| Field |
|:-|
| subject |

#### handling the Response
This request will return a list of [issues](#the-issue-object) containing the default fields and any additional fields request by `_fields`, and displayed according to any pagination parameters, filters, or searches used.







### Count Issues
> Sample Request:  

```http
GET /api/v0/issues/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deplyoment}.api.accelo.com/api/v0/issues/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /issues/count`

This request will return a count of issues in a list defined by any available searches or filters. With no searches or filters this will be a count of all issues on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the issues listed. |







### List Recent Issues
> Sample Request:  

```http
GET /api/v0/issues/recent HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deplyoment}.api.accelo.com/api/v0/issues/recent \
  -H 'authorization: Bearer {access_token}'
```

`GET /issues/recent`

This request returns a list of issues on the deployment sorted by most recently submitted, that is, in descending order of `date_submitted`.

#### Configuring the Request
This request accepts the same parameters and filters over the same fields as the [`GET /issues`](#list-issues) request, although it will always be ordered in descending order of `date_submitted`.

#### handling the Response
This request will return a list of contacts displayed according to any parameters used, and with their default fields plus any additional fields requested by `_fields`, and ordered in descending order of `date_submitted`.







### List Issue Statuses
> Sample Request:  

```http
GET /api/v0/issues/statuses HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deplyoment}.api.accelo.com/api/v0/issues/statuses \
  -H 'authorization: Bearer {access_token}'
```

`GET /issues/statuses`

This request returns a list of issue [statuses](#statuses) on the deployment.

#### Configuring the Response

##### Pagination
This request supports the standard [pagination](#configuring-the-response-pagination) requests.

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the issue [status object](#statuses) through the [`_fields`](#configuring-the-response-fields) parameter.

##### Basic Filters
This request supports the following [basic filters](#filters-basic-filters):

| Filter Name |
|:-|
| id |
| title |
| standing |
| color |

##### Order Filters
This request supports the following [order filters](#filters-order-filters):

| Filter Name |
|:-|
| id |
| title |
| standing |
| color |
| ordering |

##### Searching
This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Field |
|:-|
| title |

#### Handling the Response
This request will return a list of issue [statuses](#statuses) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters or searches used.







### Get Issue Type

> Sample request:  

```http
GET /api/v0/issues/types/{issue_type_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/issues/types/{issue_type_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /issues/types/{issue_type_id}`

This request returns an [issue type](#issue-type-id) specified by its unique id.

#### Configuring the Response
This request supports request additional fields and linked objects from  the issue type using the
[`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response

The response will contain a single issue type with its default fields and any additional
fields requested through `_fields`.






### List Issue Types
> Sample Request:  

```http
GET /api/v0/issues/types HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deplyoment}.api.accelo.com/api/v0/issues/types \
  -H 'authorization: Bearer {access_token}'
```

`GET /issues/types`

This request returns a list of [issue types](#the-issue-type) on the deployment.

#### Configuring the Response

##### Pagination
This request supports the standard [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [issue type object](#the-issue-type) using the [`_fields`](#configuring-the-response-fields) parameter. **Note** this request does not support the `_ALL` argument for this parameter.

#### handling the Response
The response will be a list of [issue types](#the-issue-type) with their default fields and any additional fields requested through `_fields`.







### List Issue Classes
> Sample Request:  


```http
GET /api/v0/issues/classes HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deplyoment}.api.accelo.com/api/v0/issues/classes \
  -H 'authorization: Bearer {access_token}'
```

`GET /issues/classes`

This request returns a list of [issue classes](#the-issue-class) on the deployment.

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [issue class object](#the-issue-class) using the [`_fields`](#configuring-the-response-fields) parameter. **Note** this request does not support the `_ALL` argument for this parameter.

#### handling the Response
The response will be a list of [issue types](#the-issue-class) with their default fields and any additional fields requested through `_fields`.







### List Tasks Against an Issue
> Sample Request:  
`GET /issues/{issue_id}/tasks`

```http
GET /api/v0/issues/{issue_id}/tasks HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deplyoment}.api.accelo.com/api/v0/issues/{issue_id}/tasks \
  -H 'authorization: Bearer {access_token}'
```


This request returns a list of [tasks](#tasks) against an [issue](#the-issue-object) specified by its `issue_id`.

#### Configuring the Response
This response may be configuring in the same way as [`GET /tasks`](#list-tasks)

#### Handling the Response
This response may be handled in the same way as [`GET /tasks`](#list-tasks)







### Update an Issue
> Sample Request:  

```http
PUT /api/v0/issues/{issue_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deplyoment}.api.accelo.com/api/v0/issues/{issue_id} \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`PUT /issues/{issue_id}`

This request updates and returns an [issue object](#the-issue-object), identified by its `issue_id`.

#### Configuring the Issue
The following fields from the [issue object](#the-issue-object) may be updated through this request:

|| Notes |
|:-|:-|
| title ||
| description ||
| against_id | **Note:** If supplied, you must also supply an `against_type`.|
| against_type | **Note:** If supplied, you must also supply an `against_id`. |
| type_id | Must point to a valid [issue type](#the-issue-type). You may [retrieve a list of types](#list-issue-types) through `GET /issues/types`|
| class_id | Must point to a valid [issue class](#the-issue-class). You may [retrieve a list of classes](#list-issue-classes) through `GET /issues/classes`. |
| affiliation_id ||
| date_started ||
| date_due ||
| assignee | A `staff_id`, must point to a valid [staff](#staff) member. The staff will be assigned and informed of this assigned issue. |
| priority_id | The [priority](#the-issue-priority) object's id. For available priorities see [`GET /issues/priorities`](#list-issue-priorities) |
| status_id | Must point to a valid [issue status](#statuses). Should not be sent in conjunction with `standing`, otherwise `standing` will take priority. You may retrieve a list of statuses through [`GET /issues/statuses`](#list-issue-statuses). If you have a `status_id`, please use this instead of `standing`. `standing` will be used to _guess_ the status, thus, `status_id` is more precise. **Warning** this will bypass any progressions and should only be used deliberately when automating tasks. |
| standing | The `standing` you want to change the issue to (e.g, 'submitted', 'open', 'resolved', 'closed', or 'inactive'). **Warning** this will bypass any progressions and should only be used deliberately when automating tasks. |

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [issue object](#the-issue-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

#### handling the Response
The response will be the single updated [issue](#the-issue-object) with its default fields and any additional fields requested through `_fields`.







### Create an Issue
> Sample Request:  

```http
POST /api/v0/issues/ HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deplyoment}.api.accelo.com/api/v0/issues/ \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`POST /issues`

This request creates and returns an [issue](#the-issue-object).

#### Configuring the Issue
Values for the following fields from the [issue object](#the-issue-object) may be set through this request:

|| Notes |
|:-|:-|
| **title** ||
| **type_id** | Must point to a valid issue type. You may retrieve a list of types through [`GET /issues/types`](#list-issue-types). |
| **against_type** | Must be a valid type of object. |
| **against_id** | Must point to a valid object of type `against_type`. |
| standing | Must be a valid standing. (e.g, 'submitted', 'open', 'resolved', 'closed', or 'inactive'). If you have a `status_id`, please use this instead of `standing`. `standing` will be used to _guess_ the status, thus, `status_id` is more precise. |
| status_id | Must point to a valid [issue status](#statuses). Should not be sent in conjunction with `standing`, otherwise `standing` will take priority. You may retrieve a list of statuses through [`GET /issues/statuses`](#list-issue-statuses). |
| affiliation_id ||
| date_started ||
| date_due ||
| description ||
| class_id | Must point to a valid [issue class](#the-issue-class). You may retrieve a list of classes through [`GET /issues/classes`](#list-issue-classes) |
| assignee | A `staff_id`, must point to a valid [staff](#staff) member. |
| priority_id | The [priority](#the-issue-priority) object's id. For available priorities see [`GET /issues/priorities`](#list-issue-priorities) |

#### Configuring the Response
This request supports requesting additional fields and linked resources from the [issue object](#the-issue-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

#### handling the Response
The response will be the created [issue](#the-issue-object) with its default fields and any additional fields requested through `_fields`.







### Delete an Issue
> Sample Request:  

```http
DELETE /api/v0/issues/{issue_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deplyoment}.api.accelo.com/api/v0/issues/{issue_id} \
  -H 'authorization: Bearer {access_token}' \
```

`DELETE /issues/{issue_id}`

This request removes an issue from the deployment, specified by its `issue_id`. This request takes no parameters and returns no resources.




### List Issue Priorities

`GET /issues/priorities`

This request returns a list of [priorities](#the-issue-priority) available for issues.

### Get Issue Priority

`GET /issues/priorities/{priority_id}`

Returns a single [priority](#the-issue-priority) for the given priority id.

### Count Issue Priorities

`GET /issues/priorities/count`

Returns the number of issue priorities.





### List Profile Fields
> See the [profiles section](#retrieve-a-list-of-profile-fields) for a sample request  

`GET /issues/profiles/fields`

This request returns a list of [profile fields](#the-profile-field-object) available for issues. This is the request [`GET /{object}/profiles/fields`](#retrieve-a-list-of-profile-fields) where the object is "issues".







### List Profile Field Values
> See the [profiles section](#retrieve-a-list-of-profile-values) for a sample request

`GET /issues/{issue_id}/profiles/values`

This request returns a list of [profile values](#the-profile-value-object) of an issue, specified by its `issue_id`. This is the request [`GET /{object}/{object_id}/profiles/values`](#retrieve-a-list-of-profile-values), where the object is "issues", and whose id is `{issue_id}`.







### Update a Profile Value
> See the [profiles section](#update-a-profile-value-link) for a sample request  

`PUT /issues/issue_id/profiles/values/{profile_value_id}`

This request updates and returns a [profile value](#the-profile-value-object), specified by its `profile_value_id`, of a particular issue,specified by its `issue_id`. This is the request [`PUT /{object}/{object_id}/profiles/values/{profile_value_id}`](#update-a-profile-value-link) where the object is "issues", and whose id is the `{issue_id}`.







### Set a Profile Value
> See the [profiles section](#create-a-profile-value-link) for a sample request

`POST /issues/{issue_id}/profiles/fields/{profile_field_id}`

This request sets and returns a [profile value](#the-profile-value-object) for a profile field, specified by its `profile_field_id`, for an issue, specified by its `issue_id`. This is the request [`POST /{object}/{object_id}/profiles/fields/{profile_field_id}`](#update-a-profile-value-link) where the object is "issues", and whose value is `{issue_id}`.







### List Extension Fields
> See the [extension section](#retrieve-a-list-of-extension-fields) for an example  

`GET /issues/extensions/fields`

This request returns a list of [extension fields](#the-extension-field-object) available for an issue, specified by its `issue_id`. This is the request [`GET /{object}/extensions/fields`](#retrieve-a-list-of-extension-fields), where the object is "issues".







### List Extension Field Values
> See the [extension section](#retrieve-a-list-of-extension-field-values) for an example    

`GET /issues/{issue_id}/extensions/values`

This request returns a list of [extension values](#the-extension-value-object) for an issue, specified by its `issue_id`. This is the request [`GET /{object}/{object_id}/extensions/values`](#retrieve-a-list-of-extension-field-values), where the object is "issues", and whose id is the `{issue_id}`.







### Update an Extension Field Value
> See the [extension section](#update-an-extension-value) for an example      

`PUT /issues/{issue_id}/extensions/values/{extension_value_id}`

This request updates the value of an [extension field value](#the-extension-value-object), specified by its `extension_value_id`, of an issue, specified by its `issue_id`. This is the request [`PUT {object}/{object_id}/extensions/values/{extension_value_id}`](#update-an-extension-value), where the object is "issues", and whose id is `{issue_id}`







### Set an Extension Field Value
> Sample Request:  

`POST /issues/{issue_id}/extensions/fields/{extension_field_id}`


This request sets and returns the value of an extension field, specified by its `extension_field_id`, of an issue, specified by its `issue_id`. This request is the request [`POST /{object}/{object_id}/extensions/fields/{extension_field_id}`](#create-an-extension-value) where our object is "issues" whose id is `issue_id`.







### List Available Progressions
> See the [progressions section](#retrieve-a-list-of-available-progressions) for a sample request  

`GET /issues/{issue_id}/progressions`

This request returns a list of available [progressions](#the-progression-object) for an issue, specified by its `issue_id`. This is the request [`GET /{object}/{object_id}/progressions`](#retrieve-a-list-of-available-progressions) where the object is "issues" whose id is `{issue_id}`.







### Auto Run a Progression
> See the [progressions section](#run-a-status-update-using-a-given-progression) for a sample request  

`[POST|PUT] /issues/{issue_id}/progressions/{progression_id}/auto`

This request uses the given progression, specified by its `progression_id` to progress an issue, specified by its `issue_id`. This is the request [`[POST|PUT] /{object}/{object_id}/progressions/{progression_id}/auto`](#run-a-status-update-using-a-given-progression) where the object is "issues" whose id is `{issue_id}`.







### List Resource Collections
> See the [resources (attachments) section](#retrieve-an-array-of-collections-for-an-object) for an example  

`GET /issues/{issue_id}/collections`

This request returns a list of [resource collections](#resources-attachments) against an [issue](#the-issue-object), specified by its `issue_id`. This is the request [`GET /{object}/{object_id}/collections`](#retrieve-an-array-of-collections-for-an-object) where the object is "issues" and hose id is `{issue_id}`.







### Upload a Resource (Attachment)
> See the [resources (attachments) section](#upload-a-resource-to-a-collection-of-an-object) for an example   

`POST /issues/{issue_id}/collections/{collection_id}/resources`

This request uploads a [resource](#resources-attachments) to a collection, specified by its `collection_id`, of an [issue](#the-issue-object) specified by its `issue_id`. This is the request [`POST /{object}/{object_id}/collections/{collection_id}/resources`](#upload-a-resource-to-a-collection-of-an-object) where the object is "issues" whose id is `{issue_id}.`
