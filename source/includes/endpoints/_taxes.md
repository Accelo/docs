# Taxes
The different account tax codes are stored by Accelo in the tax object. For information on these, and instructions on interacting with them through the deployment please see the [support doucmentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/modules/billing-and-invoices/tax-codes/)

## The Tax Object (Beta)
> Example tax:

```json
{
    "rate": "0.10000",
    "id": "6",
    "standing": "active",
    "title": "GST on Capital"
}
```

The tax object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the tax. |
| **title** | string | A name for the tax. |
| standing | select | The standing of the tax, either "active" or "inactive". |
| rate | decimal | The rate the tax is charged. |






## Get Tax (Beta)

```http
GET /api/v0/taxes/{tax_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
    https://{deplyoment}.api.accelo.com/api/v0/taxes/{tax_id} \
    -H 'authorization: Bearer {access_token}
```

`GET /taxes/{tax_id}`

This request returns a [tax object](#the-tax-object-beta) specified by its `tax_id`

### Configuring the Response
This request supports requesting additional fields and linked objects from the [tax object](#the-tax-object-beta) using the [`_fields`](#configuring-the-response-fields) parameter.

### Handling the Response
The response will be the single tax object with its default fields and any additional fields requested through `_fields`.






## List Taxes (Beta)

```http
GET /api/v0/taxes HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
    https://{deplyoment}.api.accelo.com/api/v0/taxes \
    -H 'authorization: Bearer {access_token}
```

`GET /taxes`

This request returns a list of [taxes](#the-tax-object-beta).

### Configuring the Response

#### Pagination
This request supports all the standard [pagination parameters](#configuring-the-response-pagination).

#### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [tax object](#the-tax-object-beta) using the [`_fields`](#configuring-the-response-fields) parameter.

#### Basic Filters
This request supports the following [basic filters](#filters-basic-filters):

| Filter |
|:-|
| id |
| standing |

#### Order Filters
This request supports the following [order filters](#filters-order-filters):

| Filter |
|:-|
| id |
| standing |
| title |

#### Range Filters
This request supports the following [range filters](#filters-range-filters):

| Filter |
|:-|
| id |

### Handling the Response
The response will be a list of [taxes](#the-tax-object-beta) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters or filters used.






## Count Taxes (Beta)

```http
GET /api/v0/taxes/count HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
    https://{deplyoment}.api.accelo.com/api/v0/taxes/count \
    -H 'authorization: Bearer {access_token}
```

`GET /taxes/count`

This request will return a count of taxes in a list defined by any available searches or filters. With no searches or filters this will be a count of all taxes on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of taxes listed. |