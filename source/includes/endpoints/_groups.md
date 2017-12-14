## Groups
Groups allow you to categorize your staff for bulk assignments and access controls. See the [support documentation](https://www.accelo.com/resources/help/faq/user-permissions-and-settings/managing-user-groups/) for more information.

### The Group Object (Beta)
> Sample JSON group object:

```json
{
    "parent_id": "0",
    "id": "2",
    "standing": "active",
    "title": "Support"
}
```

The group object contains the following:
 
| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The unique identifier for the group. |
| **title** | string | The title of the group. |
| parent_id | unsigned | The unique identifier of the parent group, if no parent then this is "0". |
| standing | select | One of "active" or "inactive", the standing of the group. |






### Get Group (Beta)
> Sample Request

```shell
curl -X get \
    https://{deployment}.api.accelo.com/api/v0/groups/{group_id} \
    -H 'authorization: Bearer {access_token}' \
    -d '_fields=standing'
```

```http
GET /api/v0/groups/{group_id} HTTP/1.1
Host: https://{deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: www/x-form-urlencoded

_fields=standing
```

`GET /groups/{group_id}`

This request returns a [group](#the-group-object-beta) specified by its unique `group_id`.

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [group object](#the-group-object-beta) using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response
The response will be a single group with its default fields and any additional fields requested through `_fields`.






### List Groups (Beta)
> Sample Request

```shell
curl -X get \
    https://{deployment}.api.accelo.com/api/v0/groups \
    -H 'authorization: Bearer {access_token}' \
    -d '_fields=standing' \
    -d '_filters=parent_id(3)'
```

```http
GET /api/v0/groups HTTP/1.1
Host: https://{deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: www/x-form-urlencoded

_fields=standing
_filters=parent_id(3)
```

`GET /groups`

This request returns a list of [groups](#the-group-object-beta) on the deployment.

#### Configuring the Response

##### Pagination
This request supports all of the [pagination parameters](#configuring-the-response-pagination).

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [group object](#the-group-object-beta) using the [`_fields`](#configuring-the-response-fields) parameter.

##### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Field | Description |
|:-|:-|
| id |
| title |
| staff_id | Filter group(s) to which the [staff member](#staff) with this id belongs. |

##### Searching
This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Field |
|:-|
| title |

#### Handling the Response
The response will be a list of [group objects](#the-group-object-beta) with the default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.




### Count Groups (Beta)
 Sample Request

```shell
curl -X get \
    https://{deployment}.api.accelo.com/api/v0/groups/count \
    -H 'authorization: Bearer {access_token}' \
    -d '_filters=standing(active)'
```

```http
GET /api/v0/groups/count HTTP/1.1
Host: https://{deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: www/x-form-urlencoded

_fields=standing
_filters=standing(active)
```

`GET /groups/count`

This request will return a count of [groups](#the-group-object-beta) in a list defined by any available searches or filters. With no searches or filters this will be a count of all requests on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of groups satisfying the query. |
