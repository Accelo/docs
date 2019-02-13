## Contributors
> Resource URI:  
`/api/v0/contributors`

Contributors are third party contacts who are involved in your client's work. You can easily keep them in the loop on
any project or issue by making them a contributor.  See the [support
documentation](https://www.accelo.com/resources/help/faq/contributors/) for more information on contributors.
Contributors link Staff or Affiliations to work like Jobs or issues.

### The Contributor Object
> Example contributor object:

```json
{
 "id": "2",
 "against_id": "7",
 "type_id": "1",
 "against_type": "prospect",
 "description": "Description of work the contributor will do",
 "auto_cc": "0",
 "status_id": null,
 "standing": "active",
 "object_type": "affiliation",
 "object_id": "159"
}
```

The contributor object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the contributor. |
| **description** | string | The description of the contributor. |
| standing | select | The status of the contributor. |
| status_id | unsigned | The id of the status associated with the contributor. |
| against_type | string | The object the contributor was created against. |
| against_id | unsigned | The unique identifier for the object the contributor was created against. |
| object_type | string | The type of object linked by the contributor. |
| object_id | unsigned | The unique id of the object linked by the contributor. |
| contributor_type_id | unsigned | The id of the contributor. |
| contributor_type | unsigned or object | The id of or whole [contributor type object](#the-contributor-type-object) for the contributor. |
| auto_cc | boolean | Whether the contributor will be Auto-CC'd on correspondence. |



### Get Contributor
> Sample Request: 

```http
GET /api/v0/contributors/{id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/contributors/{id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /contributors/{id}`

This request returns a single [contributor](#the-contributor-object), specified by its `id`.

#### Configuring the Response

This request supports requesting additional fields and linked objects from the [contributor](#the-contributor-object)
using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response

The response will be the single requested [contributor](#the-contributor-object) with its default fields and any
additional fields requested through `_fields`.









### List Contributors

>Sample Request:

```http
GET /api/v0/contributors HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/contributors \
  -H 'authorization: Bearer {access_token}'
```

`GET /contributors`


This request returns a list of [contributors](#the-contributor-object) on the deployment.

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
| standing |
| status_id |
| contributor_type_id |
| against_type |
| against_id |
| object_id |
| object_type |
| auto_cc |

##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| contributor_type_id |
| standing |
| status_id |
| against_id |
| auto_cc |

##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name |
|:-|
| id |
| against_id |
| object_id |
| contributor_type_id |

##### Searching

This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Filter Name |
|:-|
| description |

#### Handling the Response

The response will be a list of [contributors](#the-contributor-object) on the Deployment, with their default fields and
any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or
searches used.








### Count Contributors

> Sample Request:

```
GET /api/v0/contributors/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/contributors/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /contributors/count`

This request will return a count of contributors in a list defined by any available searches of filters.
With no searches or filters this will be a count of all contributors on the deployment. This request
returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of contributors listed. |







### The Contributor Type Object
> Example contributor type object:

```json
"response": {
    "id": "1",
    "title": "Advisor",
    "default_status_id": "2",
    "has_status": "1",
    "auto_cc": "1",
    "default_standing": "active",
    "standing": "active", 
    "ordering": "0"
  }
```

The contributor type object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the contributor. |
| **title** | string | The title of the type |
| default_status_id | unsigned | The identifier for the default status of this contributor type. |
| has_status | unsigned | The id of the current status of this contributor type. |
| auto_cc | boolean | Whether the contributors of this type will be Auto-CC'd on correspondence. |
| default_standing | string | The default standing for this contributor type. Related to the default_status_id. |
| standing | string | The current standing for this contributor type. Related to has_status. |
| ordering | unsigned | The contributor types order as displayed in the web application. |







### Get Contributor Type
> Sample Request: 

```http
GET /api/v0/contributors/types/{id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/contributors/types/{id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /contributors/types/{id}`

This request returns a single [contributor type](#the-contributor-type-object), specified by its `id`.

#### Configuring the Response

This request supports requesting additional fields and linked objects from the [contributor type](#the-contributor-type-object)
using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response

The response will be the single requested [contributor type](#the-contributor-type-object) with its default fields and any
additional fields requested through `_fields`.








### List Contributor Types

>Sample Request:

```http
GET /api/v0/contributors/types HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/contributors/types \
  -H 'authorization: Bearer {access_token}'
```

`GET /contributors/types`


This request returns a list of [contributor types](#the-contributor-type-object) on the deployment.

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
| title |
| default_status_id |
| default_standing |

##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| ordering |


#### Handling the Response

The response will be a list of [contributor types](#the-contributor-type-object) on the Deployment, with their default 
fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters, 
filters, or searches used.









### Count Contributor Types

> Sample Request:

```
GET /api/v0/contributors/types/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/contributors/types/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /contributors/types/count`

This request will return a count of contributor types in a list defined by any available searches of filters.
With no searches or filters this will be a count of all contributors types on the deployment. This request
returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of contributor types listed. |