## Purchases

> Object URI:  
`/api/v0/purchases`

Track the purchases made when completing a [job](#jobs-projects), [issue](#issues) or [contract](#contracts). More
information can be found on the [support docuementation](#https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/modules/purchases/)

### The Purchase Object
The purchase object contains the following fields:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The unique identifier for the purchase. |
| **title** | string | The title of the purchase. |
| owner_id | unsigned | The identifier of the [staff](#staff) who owns the purchase. Defaults to "0". |
| creator_id | unsigned | The identifier of the [staff](#staff) who created the invoice. Defaults to "0". |
| affiliation_id | unsigned | The identifier of the [affiliation](#affiliations) associated with the purchase. Defaults to "0". |
| amount  | decimal | The monetary amount of the purchase. Defaults to "0.00".|
| tax | decimal | The tax on the purchase. Defaults to "0.00". |
| total | decimal | The total value of the purchase: `amount + tax`. Defaults to "0.00". |
| date_purchased | unix ts | The date of the purchase. Defaults to "0". |







### Get Purchase
`GET /purchases/{purchase_id}`
> Sample request:

```http
GET /api/v0/purchases/{purchase_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
CURL -X get \
    https://{deployment}.api.accelo.com/api/v0/purchases/{purchase_id} \
    -H 'authorization: Bearer {access_token}'
```

This request returns a [purchase](#the-purchase-object) identified by its `purchase_id`.


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [purchase object](#the-purchase-object)
using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports 
[breadcrumbs](#configuring-the-response-breadcrumbs).


#### Handling the Response

The response will be the [purchase](#the-purchase-object) with its default fields and any additional fields
requested through `_fields`.






### List Purchases
`GET /purchases`

```http
GET /api/v0/purchases/ HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
CURL -X get \
    https://{deployment}.api.accelo.com/api/v0/purchases/ \
    -H 'authorization: Bearer {access_token}'
```

This request returns a list of [purchases](#the-purchase-object) on the deployment.


#### Configuring the Response

##### Pagination

This request supports all of the [pagination](#configuring-the-response-pagination) parameters.


##### Additional Fields and Linked Objects

This request also supports requesting additional fields and linked objects from the [purchase object](#the-purchase-object) 
using the [`_fields`](#configuring-the-response-fields) parameter, as well as  [breadcrumbs](#configuring-the-response-breadcrumbs).


##### Basic Filters

This request supports the following [basic filters](#filters-basic-filters):

| Filter |
|:-|
| id |
| owner_id |
| creator_id |
| affiliation_id |


##### Date Filters

This request supports the following [date filters](#filters-date-filters):

| Filter |
|:-|
| date_purchased |


##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Field |
|:-|
| amount |
| tax |
| total |
| id |
| owner_id |
| creator_id |
| affiliation_id |


##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Field |
|:-|
| amount |
| tax |
| total |
| id |
| owner_id |
| creator_id |
| affiliation_id |


##### Searching

This request supports the [`_search`](#configuring-the-response-searching) parameter to search over teh following fields:

| Field |
|:-|
| title |


#### Handling the Response

The response will be a list of [purchases](#the-purchase-object) with their default fields and any additional fields
requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.






### Count Purchases
`GET /purchases/count`

```http
GET /api/v0/purchases/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
CURL -X get \
    https://{deployment}.api.accelo.com/api/v0/purchases/count \
    -H 'authorization: Bearer {access_token}'
```

This request will return a count of [purchases](#the-purchase-object) in a list defined by any available searches or
filters. With no searches or filters this will return a count of all purchases on the deployment. This request returns a
single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the purchases listed. |





### List a Purchase's Profile Field Values
> See the [profiles section](#retrieve-a-list-of-profile-values) for a sample request

`GET /purchases/{purchase_id}/profiles/values`

This request returns a list of [profile field values](#the-profile-value-object) on a [purchase](#the-purchase-object)
specified by its `purchase_id`. This is the request   [`GET/{object}/{object_id}/profiles/values`](#retrieve-a-list-of-profile-values), 
where the object is "purchases" whose id is `{purchase_id}`





### List all Profile Field Values on Purchases
> See the [profiles section](#list-profile-values) for a sample request

`GET /purchases/profiles/values`

This request returns a list of all [profile field values](#the-profile-value-object) on [purchases](#the-purchase-object)
This is the request [`GET /{object}/profiles/values`](#list-profile-values), where the object is "purchases".





### List Purchase Profile Fields
> See the [profiles section](#retrieve-a-list-of-profile-fields) for a sample request

`GET /purchases/profiles/fields`

This request returns a list of [profile fields](#the-profile-field-object) available for any [purchase](#the-purchase-object)
This is the request [`GET /{object}/profiles/values`](#list-profile-values), where the object is "purchases".
