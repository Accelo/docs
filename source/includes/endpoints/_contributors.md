## Contributors
> Resource URI:  
`/api/v0/contributors`

Contributors are third party contacts who are involved in your client's work. You can easily keep them in the loop on any project or issue by making them a contributor. 
See the [support documentation](https://www.accelo.com/resources/help/faq/contributors/) for more information on contributors. Contributors link Staff or Affiliations to work like Jobs or issues.

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
 "auto_link": "0",
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
| object_id | unsiged | The unique id of the object linked by the contributor. |
| type_id | unsiged | The id of the type of contributor. |
| auto_link | boolean | Whether the contributor was automatically linked. |
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
The response will be the single requested [contributor](#the-contributor-object) with its default fields and any additional fields requested through `_fields`.









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
This request supports requesting additional fields and linked objects using the [`_fields`](#configuring-the-response-fields) parameter.

##### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name |
|:-|
| id |
| standing |
| status_id |
| type_id |
| against_type |
| against_id |
| object_id |
| object_type |
| auto_cc |
| auto_link |

##### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| type_id |
| standing |
| status_id |
| against_id |
| auto_link |
| auto_cc |

##### Range Filters
This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name |
|:-|
| id |
| against_id |
| object_id |
| type_id |

##### Searching
This request supports the [`_search`](#configuring-the-response-searching) paramter to search over the following fields:

| Filter Name |
|:-|
| id |
| description |

#### handling the Response
The response will be a list of [contributors](#the-contributor-object) on the Deployment, with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.








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
With no searches or filters this will be a count of all incoivce on the deployment. This request
returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of contributors listed. |

















