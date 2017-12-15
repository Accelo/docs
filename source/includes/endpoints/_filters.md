## Filters
> Resource URI:  
`/api/v0/filters`

Filters are available on the Accelo deployment that allow you to search through the resources on the deployment. These filters may be customized and saved on the deployment, see the [support documentation](https://www.accelo.com/resources/help/guides/user/filters-and-favorites/filters/) for more information. Currently these filters are supported through the API on the following objects:

* [Activities](#activities)  
* [Affiliations](#affiliations)  
* [Companies](#companies)  
* [Contracts](#contracts)  
* [Expenses](#expenses)  
* [Issues](#issues)  
* [Jobs](#jobs-projects)
* [Milestones](#milestones)  
* [Prospects](#prospects-sales)  
* [Quotes](#quotes)  
* [Staff](#staff)  
* [Tasks](#tasks)


### The Filter Object
> Example filter object:

```json
{
  "object_type": "affiliation",
  "shared": "yes",
  "staff_id": "14",
  "staff": "14",
  "title": "Custom filter on affiliations",
  "id": "1"
}
```

This object stores information on the filter, such as who created it, and which type of resource it is used on. It contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the filter. |
| **title** | string | A name for the filter. |
| object_type | string | The object type the filter may be used on. For example "affiliations". |
| shared | select | Either "yes" or "no", whether the filter is selected to be shared on the Accelo deployment. |
| staff_id | unsigned | The unique identifier of the staff member who made the filter. |
| staff | unsigned or object | The staff member who created the filter. |







### List Filters
> Sample Request:

```http
GET /api/v0/filters HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/filters \
  -H 'authorization: Bearer {access_token}'
```

`GET /filters`

This request returns a list of saved [filters](#the-filter-object) on the Accelo deployment. This list will not include any filters created by other users which have not been shared.

#### Configuring the Response

##### Pagination
This request supports the standard [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects through the [`fields`](#configuring-the-response-fields) parameter.

##### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id | |
| shared | |
| staff | Filter by `staff_id`. |
| object_type | |

##### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| title |
| shared |

##### Range Filters
This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name |
|:-|
| id |

#### Handling the Response
The response will be a list of [filter objects](#the-filter-object) containing their default values, and any additional values requested through `_fields`, and displayed according to any pagination parameters or filters used.







### List Filters Against an Object
> Sample Request:

```http
GET /api/v0/{object}/filters HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/{object}/filters \
  -H 'authorization: Bearer {access_token}'
```

`GET /{object}/filters`

This request returns a list of [filters](#the-filter-object) saved against a particular object, specified by `object`. This list will not include any filters created by other users which have not been shared.

#### Configuring the Response

##### Pagination
This request supports the standard [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects through the [`_fields`](#configuring-the-response-fields) parameter.

##### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id | |
| shared | |
| staff | Filter by `staff_id`. |

##### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| title |
| shared |

##### Range Filters
This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name |
|:-|
| id |

#### Handling the Response
The response will be a list of [filter objects](#the-filter-object) saved against the given object, containing their default values, and any additional values requested through `_fields`, and displayed according to any pagination parameters or filters used.







### Update a Filter
> Sample Request:

```http
PUT /api/v0/filters/{filter_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/filters/{filter_id} \
  -H 'authorization: Bearer {access_token}'
```

`PUT|POST /filters/{filter_id}`

This request allows you to update a saved [filter](#the-filter-object) on the Accelo deployment.

#### Configuring the Filter
The following fields from the [filter object](#the-filter-object) may be updated with this request:

| Filter Name |
|:-|
| title |
| shared |

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [filter object](#the-filter-object) using the [`_fields`](#configuring-the-response-fields) parameter.

#### handling the Response
The response will be the single, updated [filter object](#the-filter-object) containing its default fields, and any additional fields requested via `_fields`







### Run a Filter
> Sample Request:

```http
GET /api/v0/filters/{filter_id}/run HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/filters/{filter_id}/run \
  -H 'authorization: Bearer {access_token}'
```

`GET /filters/{filter_id}/run`

This request allows you to run, and see the output of, a [filter](#the-filter-object).

#### Configuring the Response

##### Pagination
This request accepts the following [pagination](#configuring-the-response-pagination) parameters:

| Filter Name |
|:-|
| _limit |

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects through the [`_fields`](#configuring-the-response-fields) parameter. This parameter will be applied to whatever object the filter is used for, that is, the `object_type`.

#### Handling the Response
The response will be a list of objects that are of type `object_type`, with their default fields, and any additional fields requested through `_fields`, and displayed according to the value of `_limit` set.
