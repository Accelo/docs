# Tags
> Resource URI:  
`/api/v0/tags`

Tags are keywords you my apply to a range of objects within Accelo, for example [activities](#activities) or [jobs](#jobs). They may both help describe the object, and make searching easier. See the [support documentation](https://www.accelo.com/resources/help/guides/user/activities-and-tasks/activities-notes-and-emails/set-up-and-customize/tags/) for more information on tags and how to apply them.

## The Tag Object
The tag object contains the following:

| Fields | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the tag. |
| **name** | string | A name for the tag. |







## List Tags
> Sample Request:  

```http
GET /api/v0/tags HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/tags \
  -H 'authorization: Bearer {access_token}'
```

`GET /tags`

This request returns a list of [tags](#the-tag-object) on the deployment.

### Configuring the Response

#### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters.

#### Additional Fields and Linked Resources
This request supports requesting additional fields and linked resources from the [tag object](#the-tag-object) using the [`_fields`](#configuring-the-response-fields) parameter.

#### Basic Filters
This request supports basic filters over the following fields:

| Filter Name |
|:-|
| id |
| name |

#### Object Filters
This request supports the following [object filters](#filters-object-filters):

| Filter Name | Description |
|:-|:-|
| against | Filter by tags applied to this object. |

#### Searching
This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Field Name |
|:-|
| name |

### Handling the Response
The response will be a list of [tags](#the-tag-object) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.







## Count Tags
> Sample Request:  

```http
GET /api/v0/tags/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/tags/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /tags/count`

This request will return a count of tags in a list defined by any available searches or filters. With no searches or filters this will be a count of all tags on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of tags listed. |







## Create a Tag
> Sample Request:  

```http
POST /api/v0/tags HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/tags \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`POST /tags`

This request creates and returns a [tag](#the-tag-object).

### Configuring the Tag
The following fields from the [tag object](#the-tag-object) may be set with this request:

| Field Name |
|:-|
| name |

### Configuring the Response
This request supports requesting additional fields and linked objects from the [tag object](#the-tag-object) using the [`_fields`](#configuring-the-response-fields) parameter.

### Handling the Response
The response will be the single, created [tag](#the-tag-object) with its default fields and any additional fields request through `_fields`.
