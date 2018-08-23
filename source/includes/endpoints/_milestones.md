## Milestones
> Resource URI:  
`/api/vo/milestones`

Milestones are the steps on the road to a [Job's](#jobs-projects) (Project's) completion. They define the schedule of
the job, and contain the budget for their respective portion of the job. For information on accessing milestones through
the deployment, see the [support
documentation](https://www.accelo.com/resources/help/guides/user/modules/projects/view-a-milestone/), milestones may
also be imported through the deployment, see again the [support documentation](https://www.accelo.com/resources/help/faq
/importing-clients-contacts-and-sales-data/import-milestones/) for information.

Deleting, creating, and updating milestones is only available through the deployment on the project planning screen, see
the [support documentation](https://www.accelo.com/resources/help/guides/user/modules/projects/creating-a-project-plan/)
for more information.

### The Milestone Object
> Example milestone object:

```json
{
  "date_modified": "1494912868",
  "date_completed": "1494911355",
  "status": "4",
  "date_due": "1495072800",
  "id": "1",
  "description": "Initial planning",
  "standing": "complete",
  "date_created": "1494286008",
  "job": "2",
  "rate": "3",
  "title": "A milestone",
  "date_started": "1494208800",
  "object_budget": "12",
  "milestone_object_budget": "12",
  "rate_charged": "125.00",
  "ordering": "1",
  "parent": "0",
  "manager": "21",
  "date_commenced": "1494286232"
}
```

The milestone object contains the following: 

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the milestone. |
| **title** | string | A name for the milestone. |
| description | string | A description of the milestone. |
| ordering | integer | An integer representing the milestone's ordering on the deployment. |
| parent | unsigned | The unique identifier of the parent milestone. If there is not parent this has the value "0". |
| date_created | unix ts | The date the milestone was created. |
| date_modified | unix ts | The date the milestone was last modified. |
| date_started | unix ts | The date the milestone is scheduled to start. |
| date_commenced | unix ts | The date the milestone was started, that is, when the standing was changed from "pending". |
| date_due | unix ts |  The date the milestone is scheduled to be completed. |
| date_complete | unix ts | The date the milestone was completed. |
| job | unsigned or object | The [job](#jobs-projects) (project) the milestone has been created for. |
| manager | unsigned or object | The [staff](#staff) member assigned to manage the project. |
| status | unsigned or object | The [status](#statuses) of the milestone. |
| standing | string | The standing of the milestone. This is part of the status object |
| rate | unsigned or object | The [rate](#rates) associated with the milestone. |
| rate_charged | decimal | The rate charged for billable work within this milestone. This is part of the rate object. |
| milestone_object_budget | unsigned or object | The [object budget](#object-budgets) associated with the milestone. |
| object_budget | unsigned or object | **Deprecated** please use `milestone_object_budget`. |







### Get Milestone
> Sample Request:  

```http
GET /api/v0/milestones/{milestone_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/milestones/{milestone_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /milestones/{milestone_id}`

This request returns a single [milestone](#the-milestone-object), identified by its `milestone_id`.


#### Configuring the Response

This request supports requesting additional fields and linked resource from the [milestone object](#the-milestone-object) 
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will be the single [milestone](#the-milestone-object) with its default fields and any additional fields
requested through `_fields`.







### List Milestones
> Sample Request:  

```http
GET /api/v0/milestones HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/milestones \
  -H 'authorization: Bearer {access_token}'
```

`GET /milestones`

This request returns a list of [milestones](#the-milestone-object) on the deployment.

#### Configuring the Response


##### Pagination

This request supports all the [pagination](#configuring-the-response-pagination) parameters.


##### Additional Fields and Linked Objects

This request supports request additional fields and linked objects from the [milestone object](#the-milestone-object)
using the [`_fields`](#configuring-the-response-fields).

##### Basic Filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| standing ||
| ordering ||
| job | Filter by the `job_id`. |
| parent | Filter by the `milestone_id` of the parent milestone. |
| manager | Filter by the `staff_id` of the manager. |
| rate | Filter by the `rate_id`. |
| object_budget | Filter by the `object_budget_id`. |
| status | Filter by the `status_id`. |


##### Date Filters

This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| date_modified |
| date_created |
| date_started |
| date_commenced |
| date_due |
| date_completed |


##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| job | Range by the `job_id`. |
| manager | Range by the `staff_id` of the manager. |
| status | Range by the `status_id`. |
| modified_by | Range by the `staff_id` of the last staff to modify the milestone. |
| rate | Range by the `rate_id`. |
| rate_charged ||


##### Searching

This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Filter Name |
|:-|
| title |


#### Handling the Response

The response will be a list of [milestones](#the-milestone-object) containing their default
fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters,
filters, or searches used.







### Count Milestones
> Sample Request:  

```http
GET /api/v0/milestones/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/milestones/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /milestones/count`

This request will return a count of milestones in a list defined by any available searches or filters. With no searches
or filters this will be a count of all milestones on the deployment. This request does not return a response object,
just a single value:

| Field | Type | Description |
|:-|:-|:-|
| **response** | unsigned | A count of milestones listed. |








### List a Milestone's Profile Field Values
> See the [profiles section](#retrieve-a-list-of-profile-values) for a sample request  

`GET /milestones/{milestone_id}/profiles/values`

This request returns a list of [profile values](#the-profile-value-object) of a [milestone](#the-milestone-object),
specified by its `milestone_id`. This is the request [`GET /{object}/{object_id}/profiles/values`](#retrieve-a-list-of-profile-values), 
where the object is "milestones", and whose id is `milestone_id`.






### List all Profile Field Values on a Milestone
> See the [profiles section](#list-profile-values) for a sample request

`GET /milestones/profiles/values`

This request returns a list of all [profile field values](#the-profile-value-object) on [milestones](#the-milestone-object). 
This is the request [`GET /{object}/profiles/values`](#list-profile-values), where the object is "milestones".






### List Milestone Profile Fields
> See the [profiles section](#retrieve-a-list-of-profile-fields)) for a sample request

`GET /milestones/profiles/fields`

This request returns a list of [profile fields](#the-profile-field-object) available for [milestones](#the-milestone-object). 
This is the request [`GET /{object}/profiles/fields`](#retrieve-a-list-of-profile-fields) where the object is "milestones".






### Update a Profile Field Value on a Milestone
> See the [profiles section](#update-a-profile-value-link) for a sample request   

`PUT /milestones/{milestone_id}/profiles/values/{profile_value_id}`

This request updates and returns a [profile value](#the-profile-value-object), specified by its `profile_value_id`, of a
particular [milestone](#the-milestone-object), specified by its `milestone_id`. This is the request 
[`PUT/{object}/{object_id}/profiles/values/{profile_value_id}`](#update-a-profile-value-link) where the object is
"milestones", and whose id is the `milestone_id`.







### Set a Profile Field Value on a Milestone
> See the [profiles section](#create-a-profile-value-link) for a sample request

`POST /milestones/{milestone_id}/profiles/fields/{profile_field_id}`

This request sets and returns a [profile value](#the-profile-value-object) for a profile field, specified by its
`profile_field_id`, for a [milestone](#the-milestone-object), specified by its `milestone_id`. This is the request
[`POST /{object}/{object_id}/profiles/fields/{profile_field_id}`](#update-a-profile-value-link) where the object is
"milestones", and whose value is `milestone_id`.







### List Available Progressions on a Milestone
> See the [progressions section](#retrieve-a-list-of-available-progressions) for a sample request

`GET /milestones/{milestone_id}/progressions`

This request returns a list of available [progressions](#the-progression-object) for a [milestone](#the-milestone-object), 
specified by its `milestone_id`. This is the request [`GET /{object}/{object_id}/progressions`](#retrieve-a-list-of-available-progressions) 
where the object is "milestones" whose id is `milestone_id`.







### Auto Run a Progression on a Milestone
> See the [progressions section](#run-a-status-update-using-a-given-progression) for a sample request

`PUT|POST /milestones/{milestone_id}/progressions/{progression_id}/auto`

This request uses the given progression, specified by its `progression_id` to progress a [milestone](#the-milestone-object), 
specified by its `milestone_id`. This is the request 
[`[POST|PUT]/{object}/{object_id}/progressions/{progression_id}/auto`](#run-a-status-update-using-a-given-progression) 
where theobject is "milestone" whose id is `milestone_id`.
