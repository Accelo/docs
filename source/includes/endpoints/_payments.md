## Payments
> Resource URI  
`/api/v0/payments`

Payments made, for example against an invoice, are stored under the `payments` object through the API. Attached to these payments are methods, receipts, and the currency used. 
### The Payment Object (Beta)
> Sample payment object:

```json
{
	"payment_method": "2",
	"receipt_id": "28945",
	"id": "30507",
	"currency_id": "0",
	"direction": "credit",
	"created_by_staff_id": "1055",
	"method_id": "2",
	"amount": "79.00",
	"against_id": "31347",
	"date_created": "1496887498",
	"payment_currency": "0",
	"against_type": "account_invoice",
	"payment_receipt": "28945"
}
```

The payment object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The unique identifier of the payment. |
| **receipt_id** | unsigned | The unique identifer of the [receipt](#the-payment-receipt-object-beta) associated with the payment. |
| **amount** | decimal | The amount paid through the payment. |
| currency_id | unsigned | The unique identifier of the [currency](#the-currency-object-beta) used. |
| method_id | unsigned | The unique identifier of the [payment method](#the-payment-method-object-beta).|
| against_id | unsigned | The unique identifier of the object the payment is against. |
| against_type | string | The type of object the payment is against. |
| date_created | unix ts | The date the payment was created. |
| created_by_staff_id | unsigned | The unique identifier of the staff member who entered the payment. |
| direction | select | Either "debit" or "credit", defaults to "credit". |
| payment_currency | unsigned or object | The [currency](#the-currency-object-beta) used for the payment. |
| payment_method | unsigned or object | The [method](#the-payment-method-object-beta) of the payment. |
| payment_receipt | unsigned or objects| The [receipt](#the-payment-receipt-object-beta) for the payment. |

#### The Payment Receipt Object (Beta)
> Sample receipt object:

```json
{
	"owner_type": "staff",
	"owner_id": "1055",
	"id": "28945",
	"affiliation_id": "152348",
	"amount": "79.00"
}
```

Where a payment object stores the information on a payment made against a single object, a receipt may be issued for a single payment, or a collection of payments. For information on accessing receipts from the deployment and receiving receipts from an integrated accounting system see the [support documentation](https://www.accelo.com/resources/help/guides/user/modules/billing-and-invoices/receipts/). The receipt object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The unique identifier of the receipt. |
| **amount** | decimal | The amount the receipt is for. |
| affiliation_id | unsigned | The unique id of the [affiliation](#affiliations) associated with the receipt. |
| owner_id | unsigned | The unique identifier of the owner. |
| owner_type | select | Either "staff" or "contact", the type of owner of the receipt. |


#### The Payment Method Object (Beta)
> Sample payment method object:

```json
{
	"id": "2",
	"title": "Visa",
	"standing": "active"
}
```

The payment method describes the different methods payment may be given, for example via cash or via mastercard. Payments from online billing systems should automatically update the method, see the [support documentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/modules/billing-and-invoices/receipt-and-payment-methods/) for more information. The payment method object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the method. |
| **title** | string | A name for the method. |
| standing | select | Either "active" or "inactive", the standing of the method. |

#### The Currency Object (Beta)
> Sample currency object:

```json
{
	"rate": "1",
	"id": "1",
	"symbol": "$",
	"title": "Australian Dollars",
	"code": "AUD"
}
```

The different currencies that may be handled by your deployment are stored in the currency object, this contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the currency. |
| **title** | string | A name for the currency. |
| code | string | A short code for the currency. |
| symbol | character | The symbol used for the currency. |
| rate | decimal | The rate, generally pulled from an external accounting system. |






### Get Payment (Beta)
> Sample request, list payments against a specific invoice:

```http
GET /payments/{payment_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
filters=against(account_invoice(133))
```

```shell
curl -X GET \
	https://{deplyoment}.api.accelo.com/payments/{payment_id} \
	-H 'authorization: Bearer {access_token}' \
	-d 'filters=against(account_invoice(133))
```

`GET /payments/{payment_id}`

This request returns a [payment](#the-payment-object-beta) identified by its unique `payment_id`.

#### Configuring the Response
This request supports requesting additional fields and linked object from the [payment object](#the-payment-object-beta) using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response
The response will be the single payment object with its default fields and any additional fields requested through `_fields`.






### List Payments (Beta)
> Sample request:

```http
GET /payments/ HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
	https://{deplyoment}.api.accelo.com/payments/ \
	-H 'authorization: Bearer {access_token}'
```

`GET /payments`

This request returns a list of [payments](#the-payment-object-beta) on the deployment.

#### Configuring the Response

##### Pagination
This request supports all the standard [pagination parameters](#configuring-the-response-pagination).

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked object from the [payment object](#the-payment-object-beta) using the [`_fields`](#configuring-the-response-fields) parameter.

##### Basic Filters
This request supports the following [basic filters](#filters-basic-filters):

| Filter |
|:-|
| id |
| currency_id |
| method_id |
| receipt_id |
| created_by_staff_id |
| against_id |
| against_type |

##### Date Filters
This request supports [date filters](#filters-date-filters) over the following fields:

| Field |
|:-|
| date_created |

##### Order Filters
This request supports the following [order filters](#filters-order-filters):

| Filter |
|:-|
| id |
| currency_id |
| method_id |
| receipt_id |
| created_by_staff_id |
| amount |
| date_created |
| direction |
| against_id |

##### Range Filters
This request supports the following [range filters](#filters-range-filters):

| Filter |
|:-|
| id |
| currency_id |
| method_id |
| receipt_id |
| created_by_staff_id |
| amount |
| against_id |

##### Object Filters
This request supports the following [object filters](#filters-object-filters):

| Filter | Description |
|:-|:-|
| against | Filter by the object the payment is against. |

#### Handling the Response
The response will be a list of [payments](#the-payment-object-beta) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters or filters used.






### Count Payments (Beta)
> Sample request:

```http
GET /payments/count HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
	https://{deplyoment}.api.accelo.com/payments/count \
	-H 'authorization: Bearer {access_token}'
```

`GET /payments/count`

This request will return a count of payments in a list defined by any available searches or filters. With no searches or filters this will be a count of all payments on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of payments listed. |