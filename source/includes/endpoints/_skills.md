# Skills
> Resource URI:  
`/api/v0/skills`

Skills are tags assigned to tasks or users which can then be used to appropriately assign work. See the [support documentation](https://www.accelo.com/resources/blog/schedule-tasks-to-the-right-person-with-skills-tagging/) for more information skills and how to use them on the deployment.

## The Skill Object
> Example skill object:

```json
{
  "id": "4",
  "title": "Android"
}
```


The skills object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | A unique identifier for the skill. |
| **title** | A name for the skill. |







## List Skills
> Sample Request:   

```http
GET /api/v0/skills HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/skills \
  -H 'authorization: Bearer {access_token}'
```

`GET /skills`

This request returns a list of [skills](#the-skill-object) on the deployment.

### Configuring the Response

#### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters.

#### Additional Fields and Linked Resource
This request supports requesting additional fields and linked resources from the [skill object](#the-skill-object) using the `_fields` parameter.

#### Basic Filters
This request supports basic filters over the following fields:

| Filter Name |
|:-|
| id |
| title |

#### Object Filters
This request supports the following [object filters](#filters-object-filters):

| Filter Name | Description |
|:-|:-|
| against | Filter by skills applied to this object. |

#### Searching
This request supports using the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Field |
|:-|
| title |

### Handling the Response
The response will be a list of [skills](#the-skill-object) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.







## Count Skills
> Sample Request:   

```http
GET /api/v0/skills/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/skills/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /skills/count`

This request will return a count of skills in a list defined by any available searches or filters. With no searches or filters this will be a count of all skills on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the skills listed. |







## Create a Skill
> Sample Request:   

```http
POST /api/v0/skills HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/skills \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`POST /skills`

This request creates and returns a [skill](#the-skill-object).

### Configuring the Skill
This request supports setting the following fields from the [skill object](#the-skill-object):

| Field Name |
|:-|
| **title** |

### Configuring the Response
This request supports requesting additional fields and linked items from the [skill object](#the-skill-object) using the [`_fields`](#configuring-the-response-fields) parameter.

### Handling the Response
The response will be the single, created [skill](#the-skill-object) with its default fields and any additional fields requested through `_fields`.
