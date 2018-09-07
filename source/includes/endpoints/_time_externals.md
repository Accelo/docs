## Time Externals
> Resource URI: 
`/api/v0/time_externals`

Time Externals are imported appointments from calendars such as Google, Exchange, or Outlook. Once they are
imported and turned into [activities](#the-activity-object) you can use them on your schedule and entries on your
timesheet. See the [support documentation](https://www.accelo.com/resources/help/guides/user/timers-timesheets-and-
scheduling/schedules/external-appointments-in-your-schedule/) for more information on time externals.

### The Time External Object
> Example time external object:

```json
{
	"id": "2",
	"staff_id": "7",
	"title": "Budget Meeting",
	"description": "Discuss next quarter's budget",
	"date_created": "1362707577",
	"date_modified": "1362707577",
	"date_started": "1362772800",
	"date_ended": "1362776400",
}
```

The contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the time external. |
| staff_id | unsigned | The unique identifier for the staff member |
| title | string | The title of the appointment. |
| description | string | A description of the appointment. |
| date_created | unix ts | The date the appointment was created. |
| date_modified | unix ts | The last date the appointed was modified. |
| date_started | unix ts | The start date and time of the appointment. |
| date_ended | unix ts | The end date and time of the appointment. |





### Get Time External 
> Sample Request: 

```http
GET /api/v0/time/externals/{id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/time/externals/{id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /time/externals/{id}`

This request returns a single [time external](#the-time-external-object), specified by its `id`.

### Configuring the Response

This request supports requesting additional fields and linked objects from the [time external](#the-time-external-object) 
using the [`_fields`](#configuring-the-response-fields) parameter.

### Handling the Response

The response will be the single requested [time external](#the-time-external-object) with its default fields and any
additional fields requested through `_fields`.





### List Time Externals
> Sample Request:

```http
GET /api/v0/time/externals HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/time/externals \
  -H 'authorization: Bearer {access_token}'
```

`GET /time/externals`


This request returns a list of [time externals](#the-time-external-object) on the deployment.

### Configuring the Request

### Pagination

This request accepts all the standard [pagination](#configuring-the-response-pagination) parameters.

### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects using the [`_fields`](#configuring-the-response-
fields) parameter.

### Basic Filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name |
|:-|
| id |
| staff_id |

### Order Filters 

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| staff_id |
| date_created |
| date_modified |
| date_started |
| date_ended |

### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name |
|:-|
| id |
| staff_id |

### Searching 

This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Filter Name |
|:-|
| title |
| description |

### Handling the Response 


The response will be a list of [time externals](#the-time-external-object) on the Deployment, with their default fields and
any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or
searches used.






### Count Time Externals
> Sample Request:

```http
GET /api/v0/time/externals/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/time/externals/count \
  -H 'authorization: Bearer {access_token}'
```


`GET /time/externals/count`

This request will return a count of time externals in a list defined by any available searches of filters.
With no searches or filters this will be a count of all time externals on the deployment. This request returns a single field.

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of time externals listed. |






### Delete an External Appointment
> Sample Request: 

```http
DELETE /api/v0/time/externals/{time_external_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/time/externals/{time_external_id} \
  -H 'authorization: Bearer {access_token}' \
```

`DELETE /time/externals/{time_externals_id}`

This request removes an external appointment from the deployment and deletes it from any given timesheet or schedule it
is linked to, specified by its `time_external_id`.






### Convert an External Appointment to an Activity
>Sample Request:

```http
POST /time/externals/{time_external_id}/convert_to_meeting HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/time/externals/{time_external_id}/convert_to_meeting \
  -H 'authorization: Bearer {access_token}' \
```


`POST /time/externals/:time_external_id/convert_to_meeting` 

This request will convert the external into an [activity](#the-activity-object) as a [meeting](#activity-medium). It will
also create a second [activity](#the-activity-object) as a [report](#activity-medium) on the meeting. This is the process
to converting the external appointment as a workable entry to use in Accelo.
