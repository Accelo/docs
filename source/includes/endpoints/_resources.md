## Resources (Attachments)
> Resource URI:  
`api/v0/resources`

Resources (or attachments) are files uploaded to the deployment. Collections are used to group resources on the deployment, they are similar to a folder system for resources.

### The Resource Object
> Example resource object:

```json
{
  "id": "4",
  "title": "Quote 14 May 2015.pdf",
  "date_created": "1431565085",
  "mimetype": "application/pdf",
  "filesize": "13678"
}
```

The resource object contains the details on an uploaded file:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the resource. |
| **title** | string | A name for the resource. |
| date_created | unix ts | The date the resource was uploaded. |
| mimetype | string | The MIME type of the resource. For example "application/pdf", "image/png".|
| filesize | integer | The size of the file in bytes. |
| collection_id | unsigned | The unique identifier of the collection the resources belongs to. |
| owner_type | string | The type of object that uploaded the resource. |
| owner_id | unsigned | The unique identifier of the object that uploaded the resource. |

### The Collection Object
> Example collection object:

```json
{
  "id": "48",
  "title": "1. Sign up quote"
}
```

 The collection object describes a collection against a specific object, it contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the collection. |
| **title** | string | A name for the collection. |
| against_type | string | The type of object the collection is against. |
| against_id | unsigned | The unique identifier of the object the collection is against. |







### Get Resource
> Sample Request:   

```http
GET /api/v0/resources/{resource_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/resources/{resource_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /resources/{resource_id}`

This request returns a [resource](#the-resource-object) identified by its `resource_id`.

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [resource objects](#the-resource-object) using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response
The response will be the [resource](#the-resource-object) with its default fields and any additional fields requested through `_fields`.







### List Resources
> Sample Request:   

```http
GET /api/v0/resources HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/resources \
  -H 'authorization: Bearer {access_token}'
```

`GET /resources`

  This request returns a list of [resources](#the-resource-object) on the deployment.

#### Configuring the Response

##### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) requests.

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [resource object](#the-resource-object) using the `_fields` parameter.

##### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| mimetype ||
| activity_id | Filter by the `activity_id` of the [activity](#activities) through which the resources was uploaded. |
| collection_id | Filter by resources belonging to the collections with these IDs. |

##### Date Filters
This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| date_created |

##### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| title |
| filesize |
| mimetype |

##### Object Filters
This request supports the following [object filters](#filters-object-filters):

| Filter Name | Notes |
|:-|:-|
| owner | Filter by resources owned by these objects. | 

##### Searching
This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Field |
|:-|
| title |

#### Handling the Response
The response will be a list of [resources](#the-resource-object) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.







### Count Resources
> Sample Request:   

```http
GET /api/v0/resources/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/resources/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /resources/count`

This request will return a count of resources in a list defined by any available searches or filters. With no searches or filters this will be a count of all resources on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of resources listed. |






### List Collections for an Object
<a name="retrieve-an-array-of-collections-for-an-object"></a>
> Sample Request:

```http
GET /api/v0/{object}/{object_id}/collections HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0{object}/{object_id}/collections \
  -H 'authorization: Bearer {access_token}'
```

`GET /{object}/{object_id}/collections`

This request returns a list of [collections](#the-collection-object) against an `object`, identified by its `object_id`.

#### Configuring the Response

##### Pagination
This request supports all of the [pagination](#configuring-the-response-pagination) parameters.

#### Handling the Response
The response will be a list of [collections](#the-collection-object) with their default fields, and displayed according to any pagination filters used.







<a name="upload-a-resource-to-a-collection-of-an-object"></a>
### Upload a Resource to a Collection
> Sample Sample Request:

```http
POST /api/v0/companies/39/collections/83/resources
HOST: {deployment}.api.accelo.com
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Authorization: Bearer {access_token}

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="resource"; filename="example.pdf"
Content-Type: application/pdf


------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

```shell
curl -X post \
  https://{deployment}.api.accelo.com/api/v0/companies/39/collections/83/resources \
  -H 'authorization: Bearer tM.G-I_F8jEn8oKzm.IvqWtq7gii4rHj.FBSKZr-RaABnRsYaF734afGRzXosjrY' \
  -H 'content-type: multipart/form-data' \
  -F 'resource=@/home/user/example.pdf'
```

`POST /{object}/{object_id}/collections/{collection_id}/resources`

This request uploads a file to a given collection, identified by its `collection_id`, of a particular object identified through `object` and `object_id`.

#### Configuring the Resource
The file may be uploaded using the following parameter:

| Field | Type | Description |
|:-|:-|:-|
| **resource** | file | The file to be uploaded. |

#### Handling the Response
The response will contain the following fields:

| Field | Type | Description |
|:-|:-|:-|
| **title** | string | The name of the resource. |
| size | integer | The size of the attachment in bytes. |
| mimetype | string | The mime type of the attachment. |







### Download a Resource
> Sample Request:   

```http
GET /api/v0/resources/{resource_id}/download HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/resources/{resource_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /resources/{resource_id}/download`

This request downloads a resource, identified by its `resource_id`. This request takes no parameters and returns only the file to be downloaded.
