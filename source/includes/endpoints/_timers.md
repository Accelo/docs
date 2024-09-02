## Timers
> Resource URI:  
`/api/v0/timers`

Timers are used to log time through Accelo. See the [support documentation](https://help.accelo.com/guides/user/timers-timesheets-and-scheduling/log-time-and-use-timers/) for more information on these objects, and how to access them on the deployment.

**NOTE:** Timer endpoints all operate from the current user and because of this are **not available to service applications**. If this restriction impacts your business model, please contact support and we will consider opening certain timer access up to service applications by requiring a staff id. It also means that a user will only be able to view or edit timers that they own.

### The Timer Object
The timer object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the timer. |
| **subject** | string | A name for the timer. |
| **seconds** | integer | How long the timer has been running for, in seconds. |
| status | select | Either "stopped" or "running", whether the timer is running. |
| against_type | string | The type of object the timer is against. |
| against_id | unsigned | The unique identifier of the object the timer is against. |
| against_title | string | The title of the object the timer is against. |
| staff_id | unsigned | The unique identifier of the [staff](#staff) member running the timer. |
| staff | unsigned or object | The [staff](#staff) member running the timer. |  







### Get Timer
> Sample Request:   

```http
GET /api/v0/timers/{timer_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/timers/{timer_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /timers/{timer_id}`

This request returns a [timer](#the-timer-object) identified by its `timer_id`.

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [timer object](#the-timer-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

#### Handling the Response
The response will be the [timer](#the-timer-object) with its default fields and any additional fields requested through `_fields`.







### List Timers
> Sample Request:   

```http
GET /api/v0/timers HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/timers \
  -H 'authorization: Bearer {access_token}'
```

`GET /timers`

This request returns a list of [timers](#the-timer-object) on the deployment.

#### Configuring the Response

##### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [timer objects](#the-timer-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

##### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| staff | Filter by the `staff_id`. |
| status ||

##### Range Filters
This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| against_id ||
| staff | Range by the `staff_id`. |

#### Handling the Response
The response will be a list of [timers](#the-timer-object) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters or filters used.







### Update a Timer
> Sample Request:   

```http
POST /api/v0/timers/{timer_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/timers/{timer_id} \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`PUT /timers/{timer_id}`

This request updates and returns a [timer](#the-timer-object) identified by its `timer_id`.

#### Configuring the Timer
The following fields from the [timer objects](#the-timer-object) may be updated through this Sample Request:

| Field Name | Notes |
|:-|:-|
| subject ||
| against_type ||
| against_id ||
| seconds | Can only be updated for stopped timers. |

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [timer object](#the-timer-object) using the `_fields` parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

#### Handling the Response
The response is the single, updated [timer](#the-timer-object) with its default fields and any additional fields requested through `_fields`







### Create a Timer
> Sample Request:   

```http
POST /api/v0/timers HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/timers \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`POST /timers`

This request creates and returns a [timer](#the-timer-object).

#### Configuring the Timer
The following fields may be set through this Sample Request:

| Field Name | Notes |
|:-|:-|
| **subject** ||
| against_id ||
| against_type ||
| seconds ||
| auto_start | May be either "1" or "0", whether the timer starts upon creation. If it starts, it will stop any current timers. The default is "0". |

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [timer object](#the-timer-object) through the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

#### Handling the Response
The response will be the single, created, [timer](#the-timer-object) with its default fields and any additional fields requested through `_fields`







### Delete a Timer
> Sample Request:

```http
DELETE /api/v0/timers/{timer_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/timers/{timer_id} \
  -H 'authorization: Bearer {access_token}'
```

`DELETE /timers/{timer_id}`

This request deletes a [timer](#the-timer-object), specified by its `timer_id`. It takes no parameters and returns no resources.







### Pause a Timer
> Sample Request:   

```http
PUT /api/v0/timers/{timer_id}/pause HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/timers/{timer_id}/pause \
  -H 'authorization: Bearer {access_token}'
```

`PUT|POST /timers/{timer_id}/pause`

This request pauses and returns a [timer](#the-timer-object) identified by its `timer_id`. This request may be handled, and configured, in the same way as [`GET /timers/{timer_id}`](#get-timer)







### Start a Timer
> Sample Request:   

```http
PUT /api/v0/timers/{timer_id}/start HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/timers/{timer_id}/start \
  -H 'authorization: Bearer {access_token}'
```

`PUT|POST /timers/{timer_id}/start`

This request starts and returns a [timer](#the-timer-object) identified by its `timer_id`. This request may be handled, and configured, in the same way as [`GET /timers/{timer_id}`](#get-timer)







### Cancel a Timer
> Sample Request:   

```http
PUT /api/v0/timers/{timer_id}/cancel HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/timers/{timer_id}/cancel \
  -H 'authorization: Bearer {access_token}'
```

`PUT|POST /timers/{timer_id}/cancel`

This is request behaves the same as [`DELETE /timers/{timer_id}`](#get-timer).
