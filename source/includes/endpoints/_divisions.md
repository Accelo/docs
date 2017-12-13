# Divisions
> Resource URI:  
`/api/v0/divisions`

Divisions allow you manage contacts, companies, and staff under different details, rates, or identities. See the [support documentation](https://www.accelo.com/resources/help/faq/divisions/) for more information.

## The Division Object (Beta)
> Sample division JSON object:

```json
{
    "title": "Support",
    "standing": "active",
    "ordering": "0",
    "id": "1"
}
```

The division object contains the following:

| Name | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The unique identifier of the division |
| **title** | string | The title of the division. |
| standing | select | Either "active" or "inactive", the standing of the division. |
| ordering | unsigned | The division's ordering as displayed on the deployment. |






## Get Division (Beta)
> Sample request:

```shell
curl -X get \
    https://{deployment}.api.accelo.com/api/v0/divisions/{division_d} \
    -H 'authorization: Bearer {access_token} \
    -d '_fields=standing'
```

```http
GET /api/v0/divisions/{division_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded

_fields=standing
```

`GET /division/{division_id}`

This request returns a division specified by its unique identifier.

### Configuring the Response
This request supports requesting additional fields and linked objects from the [division object](#the-division-object-beta) using the [`_fields`](#configuring-the-response-fields) parameter.

### Handling the Response
The response will be a single division with its default fields and any additional fields requested through `_fields`.





## List Divisions (Beta)
> Sample request:

```shell
curl -X get \
    https://deployment.api.accelo.com/api/v0/divisions \
    -H 'authorization: Bearer foobar'
    -d '_fields=_ALL'
    -d '_filters=standing(active)'
```

```http
GET /api/v0/divisions HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

`GET /divisions`

This request returns a list of [divisions](#the-division-object-beta) on the deployment.

### Configuring the Response

#### Pagination
This request supports all of the [pagination](#configuring-the-response-pagination) parameters.

#### Basic Filters
This request supports the following [basic filters](#filters-basic-filters):

| Filter Name |
|:-|
| id |
| title |
| standing |

#### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Field |
|:-|
| id |
| ordering |

#### Searching
This request supports the use of the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Field |
|:-|
| title |

### Handling the Response
The response will be a list of [divisions](#the-division-object-beta) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.





## Count Divisions (Beta)
> Sample request:

```shell
curl -X get \
    https://deployment.api.accelo.com/api/v0/divisions/count \
    -H 'authorization: Bearer foobar'
    -d '_fields=_ALL'
    -d '_filters=standing(active)'
```

```http
GET /api/v0/divisions/count HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

`GET /divisions/count`

This request will return a count of [divisions](#the-division-object-beta) in a list defined by any available searches or filters. With no searches or filters this will be a count of all divisions on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the divisions listed. |