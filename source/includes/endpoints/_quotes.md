# Quotes
> Resource URI:  
`/api/v0/quotes`

Quotes in Accelo allow you to generate and edit your quotes and proposals. See the [support documentation](https://www.accelo.com/resources/help/guides/user/modules/sales/quotes/) for information on quotes.

## The Quote Object
> Example quote object:

```json
{
  "created_by": "14",
  "conclusion": "<p><b>Looking forward to starting.</b></p>",
  "service_time_total": "3600",
  "created_by_staff_id": "14",
  "status_id": "1",
  "notes": "Here are some notes",
  "date_expiry": null,
  "title": "Website Redesign",
  "portal_access": "0",
  "affiliation": "98",
  "service_price_total": "300.50",
  "manager": "14",
  "status": "1",
  "terms": "<p><i>These are some terms and conditions</i></p>",
  "against": "prospects/9",
  "introduction": "<h1>We're quite happy to perform the work.</h1>",
  "contact": "98",
  "material_price_total": "41.10",
  "affiliation_id": "98",
  "total_price": "341.60",
  "manager_id": "14",
  "date_created": "1494311070",
  "standing": "draft",
  "against_id": "9",
  "against_type": "prospect",
  "id": "3"
}
```

The quote object contains the following:

| Field | Type | Description
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the quote. |
| **title** | string | A name for the quote. |
| against_type | string | The type of object the quote is against. |
| against_id | unsigned | The unique identifier of the object the quote is against. |
| against | string | The API URI of the object the quote is against. |
| notes | string | Additional notes on the quote. |
| portal_access | boolean | Whether the quote has been published with a client portal link.  |
| affiliation_id | unsigned | The unique identifier of the [affiliation](#affiliations) associated with the quote. |
| affiliation | unsigned or object | The [affiliation](#affiliations) associated with the quote |
| date_created | unix ts | The date the quote was created. |
| date_expiry | unix ts | The date the quote is set to expire. |
| manager_id | unsigned | The unique identifier of the [staff](#staff) member who is set to manage the quote. |
| manager | unsigned or object | The [staff](#staff) member who is assigned to manage the quote. |
| status_id | unsigned | the unique identifier of the quote [status](#statuses) of the quote. |
| status | unsigned or object | The quote [status](#statuses) |
| standing | string | The standing of the quote. This is part of the status object. |
| created_by_staff_id | unsigned | The unique identifier of the staff member who created the quote. |
| created_by | unsigned or object | The staff member who created the quote. |
| introduction | string | HTML for a the introduction of the published quote. |
| conclusion | string | HTML for the conclusion of the published quote. |
| terms | string | HTML for the terms and conditions of the published quote. |
| service_price_total | decimal | The total price for all services associated with the quote. |
| service_time_total | integer | The total time, in seconds, of services for the quote. |
| material_price_total | decimal | The total price for all materials associated with the quote. |
| total_price  | decimal | The total price of the quote; `service_price_total` + `material_price_total`|







## Get Quote
> Sample Request:

```http
GET /api/v0/quotes/{quote_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/quotes/{quote_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /quotes/{quote_id}`

This request returns a single [quote](#the-quote-object), identified by its `quote_id`.

### Configuring the Response
This request supports requesting additional fields and linked resources from the [quote object](#the-quote-object) using the [`_fields`](#configuring-the-response-fields) parameter.

### Handling the Response
The response will be the single [quote object](#the-quote-object) with its default fields and any additional fields requested through `_fields`.







## List Quotes
> Sample Request:  

```http
GET /api/v0/quotes HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/quotes \
  -H 'authorization: Bearer {access_token}'
```

`GET /quotes`

This request returns a list of quotes on the deployment.

### Configuring the Response

#### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters.

#### Additional Fields and Linked Resources
This request supports requesting additional fields and linked resources from the [quote object](#the-quote-object) using the [`_fields`](#configuring-the-response-fields) paramter.

#### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| standing ||
| affiliation | Filter by `affiliation_id`. |
| manager | Filter by the `manager_id`. |
| status | Filter by the `status_id`.
| against_type ||
| against_id ||
| created_by | Filter by the `created_by_staff_id`. |

#### Date Filters
This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| date_created |
| date_expiry |

#### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| date_created |
| date_expiry |
| service_price_total |
| service_time_total |
| material_price_total |
| total_price |

#### Range Filters
This request supports [range filters](#range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| against_id ||
| manager | Range by the `manager_id`. |
| affiliation | Range by the `affiliation_id`. |
| status | Range by the `status_id`. |
| created_by | Range by the `created_by_staff_id`. |
| service_price_total ||
| service_time_total ||
| material_price_total |
| total_price ||

#### Object Filters
This request supports the following [object filters](#filters-object-filters):

| Filter | Description |
|:-|:-|
| against | Filter by quotes against these objects. |

#### Searching
This request supports the [`_search`](#configuring-the-response-searching) request over the following fields:

| Field |
|:-|
| title |

### Handling the Response
The response will be a list of [quotes](#the-quote-object) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.







## Count Quotes
> Sample Request:  

```http
GET /api/v0/quotes/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/quotes/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /quotes/count`

This request will return a count of quotes in a list defined by any available searches or filters. With no searches or filters this will be a count of all quotes on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the quotes listed |







## Update a Quote
> Sample Request:  

```http
PUT /api/v0/quotes/{quote_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/quotes/{quote_id} \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`PUT /quotes/{quote_id}`

This request updates and returns a [quote](#the-quote-object), identified by its `quote_id`.

### Configuring the Quote
The following fields from the [quote object](#the-quote-object) may be updated with this request:

| Filter Name | Notes |
|:-|:-|
| title ||
| affiliation_id ||
| manager_id ||
| date_expiry ||
| notes ||
| introduction ||
| conclusion ||
| terms_and_conditions | Update the HTML of the `terms` of the published quote. |
| client_portal_access | Update the `portal_access` field. |

### Configuring the Response
This request supports requesting additional fields and linked objects from the [quote object](#the-quote-object) using the [`_fields`](#configuring-the-response-fields) parameter.

### Handling the Response
The response will be the single, updated [quote](#the-quote-object) with its default fields and any additional fields requested through `_fields`







## Create a Quote
> Sample Request:  

```http
POST /api/v0/quotes HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/quotes \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`POST /quotes`

This request creates and returns a [quote](#the-quote-object).

### Configuring the Quote
This request accepts the same fields as [`PUT /quotes/{quote_id}`](#update-a-quote), with the addition of the following required fields:

| Filter Name |
|:-|
| **title** |
| **against_id** |
| **against_type** |

### Configuring the Response
This request supports requesting additional fields and linked objects from the [quote object](#the-quote-object) using the [`_fields`](#configuring-the-response-fields) parameter.

### Handling the Response
The response will be the single, created [quote object](#the-quote-object) with its default fields and any additional fields requested through `_fields`.







## List Resource Collections
> See the [resources (attachments) section](#retrieve-an-array-of-collections-for-an-object) for an example

`GET /quotes/{quote_id}/collections`

This request returns a list of [resource collections](#resources-attachments) against an [quote](#the-quote-object), specified by its `quote_id`. This is the request [`GET /{object}/{object_id}/collections`](#retrieve-an-array-of-collections-for-an-object) where the object is "quotes" and hose id is `{quote_id}`.







## Upload a Resource (Attachment)
> See the [resources (attachments) section](#upload-a-resource-to-a-collection-of-an-object) for an example  

`POST /quotes/{quote_id}/collections/{collection_id}/resources`

This request uploads a [resource](#resources-attachments) to a collection, specified by its `collection_id`, of an [quote](#the-quote-object) specified by its `quote_id`. This is the request [`POST /{object}/{object_id}/collections/{collection_id}/resources`](#upload-a-resource-to-a-collection-of-an-object) where the object is "quotes" whose id is `{quote_id}`.
