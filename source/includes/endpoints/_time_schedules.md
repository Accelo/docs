## Time Schedules
> Resource URI:
`/api/v0/time/schedules`

Increase your productivity with Accelo's Schedules feature, assign yourself and your team tasks to complete now and later,
integrate your external calendar, easily change the assigned amount of time for each task. View everything your team is
working on and assign work to members of your team on a daily, weekly, or monthly basis.
See the [support documentation](https://www.accelo.com/resources/help/guides/user/timers-timesheets-and-scheduling/schedules/)
for more information on time schedules.

### The Time Schedules Object
> Example time schedule object:

```json
{
	"id": "3904",
	"duration": "0",
	"type": "past",
	"staff_id": "7",
	"staff": "7",
	"rate_charged": "0.00",
	"cost_rate_charged": "0.00",
	"date_scheduled": "1335362400",
	"charged": "0.00",
	"task_id": "0",
	"rate_id": "0",
	"against_type": "affiliation",
	"against_id": "284",
	"costing": "0.00",
	"cost_rate_id": "0"
}
```

The contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the time schedule. |
| **duration** | unsigned | How long the scheduled time is for in seconds |
| **type** | string | The type of scheduled time. Either "past", "scheduled", "autoscheduled", "meeting" or "external" |
| staff_if | unsigned | The id of the staff member the schedule is associated with the time schedule. |
| staff | unsigned or object | The id of or entire [staff object](#the-staff-object). |
| rate_charged | decimal | The billable rate (if any) for that time schedule |
| date_scheduled | unix ts | The date the time is/was scheduled for. |
| charged | unsigned | The total amount charged for the time scheduled (if any). |
| task_id | unsigned | The identifier for the [task](#the-task-object) the schedule is associated with. |
| rate_id | unsigned | The identifier for the [rate](#the-rate-object) that the time schedule is/was charged at. |
| against_type | string | The type of object the time is scheduled against. |
| against_id | unsigned | The identifier of the object the time is scheduled against .|
| costing | decimal | The total cost of the time scheduled. |
| cost_rate_charged | decimal | The cost rate of the time schedule (if any). |
| cost_rate_id | unsigned | The identifier of the cost [rate object](#the-rate-object) associated with the time schedule. |







#### The Time Schedule Link Object
> Example time schedule object:

```json
{
	"id": "3904",
	"schedule_id": "3",
	"activity_id": "5",
}
```

The contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the time schedule link. |
| schedule_id | unsigned | An identifier for the time schedule. |
| activity_id | unsigned | An identifier for the activity the time is scheduled against. |








### Get Time Schedule
> Sample Request:

```http
GET /api/v0/time/schedules/{id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/time/schedules/{id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /time/schedules/{id}`

This request returns a single [time schedule](#the-time-schedule-object), specified by its `id`.

#### Configuring the Response

This request supports requesting additional fields and linked objects from the [time schedule](#the-time-schedule-object)
using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response

The response will be the single requested [time schedule](#the-time-schedule-object) with its default fields and any
additional fields requested through `_fields`.





### List Time Schedules
> Sample Request:

```http
GET /api/v0/time/schedules HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/time/schedules \
  -H 'authorization: Bearer {access_token}'
```

`GET /time/schedules`


This request returns a list of [time schedules](#the-time-schedules-object) on the deployment.

#### Configuring the Request

##### Pagination

This request accepts all the standard [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects using the [`_fields`](#configuring-the-response-
fields) parameter.

##### Basic Filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name |
|:-|
| id |
| staff_id |
| type_id |
| task |
| against_type |
| against |

##### Date Filters

This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
| :- |
| scheduled |

##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| type |
| staff_id |
| task_id |
| against_type |
| against_id |
| date_scheduled |

##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name |
|:-|
| task_id |
| staff_id |
| against_id |

##### Empty Filters

This request supports [`empty filters`](#filters-empty-filters) over the following fields:

| Filter Name |
|:-|
| title |
| description |

#### Handling the Response

The response will be a list of [time schedules](#the-time-schedule-object) on the Deployment, with their default fields and
any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or
searches used.






### Count Time Schedules
> Sample Request:

```http
GET /api/v0/time/schedules/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/time/schedules/count \
  -H 'authorization: Bearer {access_token}'
```


`GET /time/schedules/count`

This request will return a count of time schedules in a list defined by any available searches of filters.
With no searches or filters this will be a count of all time schedules on the deployment. This request returns a single field.

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of time schedules listed. |








### Get Time Schedule Link
> Sample Request:

```http
GET /api/v0/time/schedules/links/{id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/time/schedules/link/{id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /time/schedules/links/{id}`

This request returns a single [time schedule link](#the-time-schedule-link-object), specified by its `id`.

#### Configuring the Response

This request supports requesting additional fields and linked objects from the [time schedule link](#the-time-schedule-object)
using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response

The response will be the single requested [time schedule](#the-time-schedule-link-object) with its default fields and any
additional fields requested through `_fields`.






### List Time Schedule Links
> Sample Request:

```http
GET /api/v0/time/schedules/links HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/time/schedules/links \
  -H 'authorization: Bearer {access_token}'
```

`GET /time/schedules/links`


This request returns a list of [time schedule links](#the-time-schedule-link-object) on the deployment.

#### Configuring the Request

##### Pagination

This request accepts all the standard [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects using the [`_fields`](#configuring-the-response-
fields) parameter.

##### Basic Filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name |
|:-|
| id |
| activity_id |
| schedule_id |







### Count Time Schedule Links
> Sample Request:

```http
GET /api/v0/time/schedules/links/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/time/schedules/count \
  -H 'authorization: Bearer {access_token}'
```


`GET /time/schedules/links/count`

This request will return a count of time schedule links in a list defined by any available searches of filters.
With no searches or filters this will be a count of all time schedules on the deployment. This request returns a single field.

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of time schedule links listed. |
