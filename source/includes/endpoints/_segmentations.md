## Segmentations
> Resource URI:  
`/api/v0/segmentations`

Segmentations or (Categories) organize and segment your Company list into different categories for better management and
reporting, letting you shape Accelo to match just what your business needs. 
See the [support documentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/modules/companies-and-contacts/categories/) 
for more information.

### The Segmentation Object
> Example segmentation object:

```json
{
      "link_type": "company",
      "id": "2",
      "leaf": "1",
      "title": "Size",
      "exclusive": "1",
      "required": "0",
      "standing": "active"
}
```


The segmentation object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the segmentation. |
| **title** | string | A name for the segmentation. |
| link_type | enum | The object type that the segmentation is related to, may be 'company', 'affiliation' or 'contact'. |
| standing | enum | The standing of the segmentation, may be "active" or "inactive".|
| required | boolean | Either Yes or No, whether this segmentation is required for the object it is against. |
| exclusive | boolean | Either Yes or No, whether this segmentation is limited to one value. |
| leaf | boolean | Either Yes or No, whether this segmentation is limited to only child options. |







### Get a Segmentation
> Sample Request:

```http
GET /api/v0/segmentation/{id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/segmentation{id} \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`GET /segmentations/{id}`

This request gets and returns a single [segmentation](#the-segmentation-object) specified by its `id`.

#### Configuring the Response

This request supports requesting additional fields and linked items from the [segmentation object](#the-segmentation-object)
using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response
The response will be a single [segmentation](#the-segmentation-object) with its default fields and any
additional fields requested through `_fields`.







### List Segmentations
> Sample Request:

```http
GET /api/v0/segmentations HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/segmentations \
  -H 'authorization: Bearer {access_token}'
```

`GET /segmentations`

This request returns a list of [segmentations](#the-segmentation-object) for the deployment.

#### Configuring the Response

##### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Resource
This request supports requesting additional fields and linked resources from the [segmentation](#the-segmentation-object) using
the `_fields` parameter.

##### Basic Filters
This request supports basic filters over the following fields:

| Filter Name |
|:----------- |
| id          |
| link_type   |
| standing    |
| required    |
| exclusive   |
| leaf        |

##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id | |

##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id | |

#### Handling the Response
The response will be a list of [segmentations](#the-segmentation-object) with their default fields and any additional 
fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.







### Count Segmentations
> Sample Request:   

```http
GET /api/v0/segmentations/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/segmentations/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /segmentations/count`

This request will return a count of segmentations in a list defined by any available searches or filters. With no 
searches or filters this will be a count of all segmentations on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the segmentations listed. |
