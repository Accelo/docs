## Ledgers
Accelo supports account ledgers, it also allows account ledger integration with certain online accounting systems (e.g. Xero). These account ledgers are described by the API through the `ledger` object. For information on viewing, adding and syncing account ledgers from your deployment, please see the [support documentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/modules/billing-and-invoices/ledgers/).

### The Ledger Object (Beta)
> Example ledger

```json
{
    "code": "200",
    "comment": "Ledger to be used for sales",
    "id": "1",
    "title": "Sales",
    "standing": "active",
    "parent_id": "0"
    }
```

The ledger object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The unique identifier of the ledger. |
| **title** | string | The ledger's title. |
| **code** | string | The account ledger code |
| parent_id | unsigned | The unique identifier of the parent ledger, defaults to "0" is there is no parent |
| standing | select | The standing of the ledger, either "active" or "inactive". |
| comment | string | Comments on the ledger |






### Get Ledger (Beta)

```http
GET /api/v0/ledgers/{ledger_id} HTTP/1.1
Host: {deployment}.api.accelo
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
    https://{deplyoment}.api.accelo.com/api/v0/ledgers/{ledger_id} \
    -H 'authorization: Bearer {access_token}'
```

`GET /ledgers/{ledger_id}`

This request returns a [ledger](#the-ledger-object-beta) identified by its unique `ledger_id`.

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [ledger object](#the-ledger-object-beta) using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response
The response wil be the single ledger with its default fields and any additional fields requested through `_fields`.





### List Ledgers (Beta)

```http
GET /api/v0/ledgers HTTP/1.1
Host: {deployment}.api.accelo
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
    https://{deplyoment}.api.accelo.com/api/v0/ledgers/ \
    -H 'authorization: Bearer {access_token}'
```

`GET /ledgers`

This request returns a list of [ledgers](#the-ledger-object-beta).

#### Configuring the Response

##### Pagination
This request supports all the standard [pagination parameters](#configuring-the-response-pagination).

##### Additional fields and Linked Objects
This request supports requesting additional fields and linked objects from the [ledger object](#the-ledger-object-beta) using the [`_fields`](#configuring-the-response-fields) parameter.

##### Basic Filters
This request supports the following [basic filters](#filters-basic-filters):

| Filter |
|:-|
| id |
| code |
| parent_id |
| standing |

##### Order Filters
This request supports the following [order filters](#filters-order-filters):

| Filter |
|:-|
| id |
| code |
| parent_id |
| standing |
| title |

##### Range Filters
This request supports the following [range filters](#filters-range-filters):

| Filter |
|:-|
| id |
| parent_id |

##### Searching
This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Field |
|:-|
| title |
| code |

#### Handling the Response
The response will be a list of [ledgers](#the-ledger-object-beta) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.






### Count Ledgers (Beta)

```http
GET /api/v0/ledgers/count HTTP/1.1
Host: {deployment}.api.accelo
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
    https://{deplyoment}.api.accelo.com/api/v0/ledgers/count \
    -H 'authorization: Bearer {access_token}'
```

`GET /ledgers/count`

This request will return a count of ledgers in a list defined by any available searches or filters. With no searches or filters this will be a count of all ledgers on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of ledgers listed. |
