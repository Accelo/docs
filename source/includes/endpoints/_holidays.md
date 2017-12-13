# Holidays (Beta)
A user's holidays are available through the API as the "holiday" object. 

## The Holiday Object (Beta)
> Sample holiday:

```json
{
	"id": "2",
	"duration_seconds": null,
	"date_end": "1432216800",
	"staff_id": "1041",
	"date_start": "1432130400",
	"staff": "1041",
	"title": "OOO - Sister's Graduation"
}
```

The holiday object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The unique identifier for the holiday. |
| **staff_id** | unsigned | The unique identifier of the staff who belongs to the holiday. |
| **date_start** | unix ts | The date the holiday is set to start. |
| **title** | string | A name for the holiday |
| date_end | unix ts | The date the holiday is set to end. Note: only one of `date_end` and `duration_seconds` should have a value. |
| duration_seconds | int | The length of the holiday, in seconds. Note: only one of `date_end` and `duration_seconds` should have a value. |
| staff() | object | The staff member who belongs to the holiday. |






## Get Holiday (Beta)

```http
GET /holidays/{holiday_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
	https://{deployment}.api.accelo.com/api/v0/holidays/{holiday_id} \
	-H 'authorization: Bearer {access_token} \
```

`GET /holidays/{holiday_id}`

This request returns a single [holiday](#the-holiday-object-beta), specified by its `holiday_id`.

### Configuring the Response
This request supports requesting additional fields and linked objects from the [holiday object](#the-holiday-object-beta) using the [`_fields`](#configuring-the-response-fields) parameter.

### Handling the Response
The response will be a single holiday with its default fields and any additional fields requested through `_fields`.






## List Holidays (Beta)

```http
GET /holidays/ HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
	https://{deployment}.api.accelo.com/api/v0/holidays/ \
	-H 'authorization: Bearer {access_token} \
```

`GET /holidays/`

This request returns a list of [holidays](#the-holiday-object-beta).

### Configuring the Response

#### Pagination
This request supports all the standard [pagination parameters](#configuring-the-response-pagination).

#### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [holiday object](#the-holiday-object-beta) using the [`_fields`](#configuring-the-response-fields) parameter.

#### Basic Filters
This request supports the following [basic filters](#filters-basic-filters):

| Filter |
|:-|
| id |
| staff_id |

#### Date Filters
This request supports [date filters](#filters-date-filters) over the following fields:

| Field |
|:-|
| date_start |
| date_end|

#### Range Filters
This request supports [range filters](#filters-range-filters) over the following fields:

| Field |
|:-|
| id |
| staff_id |
| date_start |
| date_end |
| duration_seconds |

#### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Field |
|:-|
| id |
| staff_id |
| date_start |
| date_end |
| title |
| duration |

#### Empty Filters
This request supports the following [empty filters](#filters-empty-filters):

| Filter |
|:-|
| date_end |
| duration_seconds |

#### Searching
This request supports the [`_search`](#configuring-the-response-searching) to search over the following fields:

| Field |
|:-|
| title |

### Handling the Response
The response will be a list of [holidays](#the-holiday-object-beta) with their default fields and any additional fields requested through `_fields`, and displaying according to any pagination parameters, filters, or searches used.






## Count Holidays (Beta)

```http
GET /holidays/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
	https://{deployment}.api.accelo.com/api/v0/holidays/count \
	-H 'authorization: Bearer {access_token} \
```

`GET /holidays/count`

This request returns a count of [holidays](#the-holiday-object-beta) in a list defined by any available searches or filters. With no searches or filters this will be a count of all holidays on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of holidays listed. |






## Update Holiday (Beta)

```http
PUT /holidays/{holiday_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X PUT \
	https://{deployment}.api.accelo.com/api/v0/holidays/{holiday_id} \
	-H 'authorization: Bearer {access_token} \
```

`PUT /holidays/{holiday_id}`

This request updates and returns a [holiday](#the-holiday-object-beta) specified by its `holiday_id`.

### Configuring the Holiday

The following fields from the [holiday object](#the-holiday-object-beta) may be updated through this request, (date fields may be sent as unix timestamps, or in ISO8601 format):

| Field |
|:-|
| title |
| staff_id |
| date_start |
| date_end |
| duration_seconds |

**Note:** you may only update one of `date_end` or `duration_seconds`.

### Configuring the Response
The response may be configuring as per [Get Holiday](#get-holiday-beta)

### Handling the Response
The response will be the single, updated holiday with its default fields and any additional fields requested through `_fields`.






## Create Holiday (Beta)

```http
POST /holidays/ HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X POST \
	https://{deployment}.api.accelo.com/api/v0/holidays/ \
	-H 'authorization: Bearer {access_token} \
```

`POST /holidays`

This request creates and returns a [holiday](#the-holiday-object-beta).

### Configuring the Holiday
The following fields may be set through this request, (date fields may be sent as unix timestamps, or in ISO8601 format):

| Field |
|:-|
| **title** |
| **date_start** |
| **date_end** |
| **duration_seconds** |
| staff_id |

**Note:** only one of `date_end` or `duration_seconds` is required; both cannot be sent.

### Handling the Response
The response may be configuring as per [Get Holiday](#get-holiday-beta)

### Handling the Response
The response will be the new holiday with its default fields and any additional fields requested through `_fields`.






## Delete Holiday (Beta)

```http
DELETE /holidays/{holiday_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X DELETE \
	https://{deployment}.api.accelo.com/api/v0/holidays/{holiday_id} \
	-H 'authorization: Bearer {access_token} \
```

`DELETE /holidays/{holiday_id}`

This request removes a [holiday](#the-holiday-object-beta) from the deployment, identified by their `staff_id`. This request takes no parameters and returns no resources.