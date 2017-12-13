# Expenses
> Resource URI:  
`/api/v0/expenses`

In the Accelo API, expenses are against objects, such as [jobs](#jobs), or [issues](#issues). For example, an expense may be the cost of some training materials, or the cost of travel expenses for a staff member.

## The Expenses Object
> Sample expense:

```json
{
  "reimbursable": "no",
  "resource": "3",
  "type": "2",
  "quantity": "1.0000",
  "activity_id": "1052",
  "against_type": "job",
  "submitter_id": "14",
  "against_id": "2",
  "id": "2",
  "standing": "submitted",
  "approver_id": "22",
  "title": "Lunch meeting",
  "submitter": "14",
  "billable": "no",
  "price": "78.0000",
  "unit_cost": "78.0000",
  "date_incurred": "1495634400",
  "approver": "22",
  "activity": "1052",
  "type_id": "2"
}
```

The expense object contains the following fields and linked objects:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the expense. |
| **title** | string | A title for the expense. |
| **unit_cost** | decimal | The cost for one of the expense. |
| **quantity** | decimal | The quantity of the expense.  |
| **standing** | string | The standing of the expense. For example "submitted", "invoiced". |
| price | decimal | The cost charged to a customer for one of the expense. |
| date_incurred | unix ts | The date the expense was incurred. |
| activity_id | unsigned | The unique identifier for the activity against the expense; the id for the note sent to the approver. |
| type_id | unsigned | The unique identifier for the [type of expense](#the-expense-type). |
| approver_id | unsigned | The unique identifier of the staff member assigned to approve the expense. |
| submitter_id | unsigned | The unique identifier of the staff member who submitted the expense. |
| against_id | unsigned | The unique identifier of the object the expense is against. |
| against_type | string | The type of object the expense is against. |
| billable | string | Whether the expense is billable. May be either "yes" or "no". |
| reimbursable | string | Whether the expense is reimbursable. May be either "yes" or "no". |
| approver | unsigned or object | The [staff](#staff) object of the approver of the expense. |
| submitter | unsigned or object | The [staff](#staff) object of the submitter of the expense. |
| type | unsigned or object | The [expense type object](#the-expense-type) of the expense. Deprecated, please use `expense_type`. |
| expense_type | unsigned or object | The [expense type object](#the-expense-type) of the expense. |
| activity | unsigned or object | The [activity object](#expenses) of the activity against the expense. |
| resource | unsigned or object | The [resource object](#resources-attachments) (attachment) associated with the expense. |

### The Expense Type
> Sample expense type:

```json
{
  "ledger_id": "3",
  "standing": "active",
  "title": "Food",
  "id": "2"
}
```

Similarly to [contracts](#contract-types), expenses have types associated with them. Expense types may be set up on the Accelo deployment (see the [support documentation](https://www.accelo.com/resources/help/guides/user/modules/retainers/expenses/) for information). This expense type object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the type. |
| **title** | string | A name for the type. |
| standing | string | The standing of the expense when created. |
| ledger_id | unsigned | The unique identifier of the billing ledger associated with this expense type. See the [support documentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/modules/billing-and-invoices/ledgers/) for information on ledgers. |

**Note:** The `type` field is deprecated, please request the expense type through the `expense_type` field,
which contains the following additional fields:

| Field | Type | Description |
|:-|:-|:-|
| tax_id | unsigned | The unique identifier of the [tax object](#taxes) associated with the expense type. |
| expense_type_ledger | unsigned or object | The unique identifier of the [ledger](#ledgers) associated with the expense type. |







## Get Expense
> Sample Request:  

```http
GET /api/v0/expenses/{expense_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/expenses/{expense_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /expenses/{expense_id}`

This request returns a single [expense object](#the-expense-object) specified by it's `expense_id`.

### Configuring the Request
This request supports requesting additional objects and fields from the [expenses object](#the-expense-object) using the `_fields` parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

### Handling the Response
The response will be a single expense object with its default fields and any additional fields requesting through `_fields`.







## List Expenses
> Sample Request:

```http
GET /api/v0/expenses HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/expenses \
  -H 'authorization: Bearer {access_token}'
```

`GET /expenses`

This request returns a list of expenses on the Accelo deployment.

### Configuring the Request

#### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters:

#### Additional Fields and Linked Objects
This request also supports requesting extra fields or linked objects of the [expenses object](#the-expenses-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

#### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| standing ||
| type | Filter over the `type_id`. Deprecated, please use `expense_type`. |
| expense_type | Filter over the `expense_type_id`. |
| submitter | Filter over the `submitter_id`. |
| approver | Filter over the `approver_id`. |
| against_type ||
| against_id ||

#### Date Filters
This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| date_incurred |

#### Order Filters
This requesting supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| date_incurred |
| title |
| standing |

#### Range Filters
This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| type | Range over `type_id`. Deprecated, please use `expense_type`. |
| expense_type | Range over the `expense_type_id`. |
| submitter | Range over `submitter_id`. |
| approver | Range over `approver_id`. |
| quantity ||
| unit_cost |
| cost | Range over the total cost, that is `unit_cost` times `quantity`. |

#### Object Filters
This request supports the following [object filters](#filters-object-filters):

| Filter | Description |
|:-|:-|
| against | Filter by expenses against these objects. |

#### Searching
This request supports the use of the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Field |
|:-|
| title |

### handling the Response
This request will return a list of expenses containing the default fields and any additional fields request by `_fields`, and displayed according to any pagination parameters, filters, or searches used.







## Count Expenses
> Sample Request:

```http
GET /api/v0/expenses/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/expenses/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /expenses/count`

This request will return a count of expenses in a list defined by any available searches or filters. With no searches or filters this will be a count of all expenses on the deployment. This request returns a single field:

|| Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the listed expenses. |







## Get Expense Type
> Sample Request:  

```http
GET /api/v0/expenses/types/{type_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/expenses/types/{type_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /expenses/types/{type_id}`

This request returns a single [expenses type](#the-expense-type) object, specified by its `type_id`.

### Configuring the Response
This request supports requesting extra fields and linked objects from the [expenses type](#the-expense-type) object using the [`_fields`](#configuring-the-response-fields) parameter.

### handling the Response
The response will be a single [expense type](#the-expense-type) object with its default fields, and any additional fields requested through `_fields`.







## List Expense Types
> Sample Request:  

```http
GET /api/v0/expenses/types HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/expenses/types \
  -H 'authorization: Bearer {access_token}'
```

`GET /expenses/types`

This request returns a list of [types of expenses](#the-expense-type) on the Accelo deployment.

### Configuring the Response

#### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters:

#### Additional Fields and Linked Objects
This request supports requesting extra fields and linked objects from the [expense type](#the-expense-type) object using the [`_fields`](#configuring-the-response-fields) parameter.

#### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name |
|:-|
| id |
| standing |
| ledger_id |
| tax_id |


#### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| title |
| standing |

#### Range Filters
This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name |
|:-|
| id |

#### Empty Filters
This request supports [empty filters](#filters-empty-filters) over the following fields:

| Field |
|:-|
| title |

#### Searching
This request the use of the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Field |
|:-|
| title |

### handling the Response
The response will contain a list of [expense types](#the-expense-type) with their default fields, and any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.







## Count Expense Types
> Sample Request:  

```http
GET /api/v0/expenses/types/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/expenses/types/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /expenses/types/count`

This request returns a count of [expense types](#the-expense-type) in a list defined by any available searches or filters. With no searches or filters this will be a count of all expense types on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of [expense types](#the-expense-type) listed. |







## Update an Expense
> Sample Request:  

```http
PUT /api/v0/expenses HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/expenses \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`PUT /expenses/{expense_id}`

This request updates and returns an [expense](#the-expense-object), identified by its `expense_id`.

### Configuring the Expense
The following fields from the [expense object](#the-expense-object) may be updated through this request:

| Field Name |
|:-|
| title |
| quantity |
| billable |
| reimbursable |
| type_id |
| unit_cost |
| date_incurred |
| resource_id |

### Configuring the Response
This request supports requesting additional fields and linked objects from the [expense object](#the-expense-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

### handling the Response
The response will be the single updated [expense object](#the-expense-object) with its default fields, and any additional fields requested through `_fields`.







## Create an Expense
> Sample Request:  

```http
POST /api/v0/expenses HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/expenses \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`POST /expenses`

This request creates and returns an [expense object](#the-expense-object).

### Configuring the Expense
The following fields from the [expense object](#the-expense-object) may be set with this request:

| Field Name | Notes |
|:-|:-|
| **title** ||
| **against_id** ||
| **against_type** ||
| **unit_cost** |||
| **quantity** ||
| **type_id** ||
| price | If not included, this will default to `unit_cost`. |
| date_incurred ||
| billable ||
| reimbursable ||
| file | Allows you to upload a file with the expense (i.e. a receipt in the form of an image or PDF). If this value is set then it must be POSTed with **multipart/form-data**. |
| resource_id | The unique identifier of a [resource (attachment)](#resources-attachments) to be sent with the expense. **Note**: you may only pass one of `resource_id` or `file`.|

### Configuring the Response
This response supports requesting extra fields and linked objects from the [expenses object](#the-expense-object) through the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

### Handling the Response
The request will return the single new [expense object](#the-expense-object) with its default fields, and any additional fields requested through `_fields`.







## Delete an Expense
> Sample Request:  

```http
DELETE /api/v0/expenses/{expense_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/expenses/{expense_id} \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`DELETE /expenses/id`

This request removes an expense from the deployment. It takes no parameters and returns no resources.  







## List Available Progressions
> See the [progressions section](#retrieve-a-list-of-available-progressions) for a sample request

`GET /companies/{expense_id}/progressions`

This request returns a list of available [progressions](#progressions) for an [expense](#the-expense-object) identified by its `expense_id`. This is the request [`GET /{object}/{object_id}/progressions`](#retrieve-a-list-of-available-progressions) where the object is "companies" whose id is `{expense_id}`






## Auto Run a Progression
> See the [progressions section](#run-a-status-update-using-a-given-progression) for a sample request

`[PUT|POST] /companies/{expense_id}/progressions/{progression_id}/auto`


This request uses the given [progression](#progressions), specified by its `progression_id` to progress the status of an [expense](#the-expense-object), specified by its `expense_id`. This is the request [`[PUT|POST] /{object}/{object_id}/progressions/{progression_id/auto}`](#run-a-status-update-using-a-given-progression) where the object is "companies" whose id is `{expense_id}`.
