## Object Budgets
> Resource URI:  
`api/v0/object_budgets`

Object budgets are budgets against a specific object, for example a budget against an [issue](#issues) or a [milestone](#milestones). They are able to track the time and money spent by staff and on services, as well as expenses and the cost of materials.

### The Object Budget
> Example object budget:

```json
{
  "charged": "45.84",
  "service_time": "0",
  "material_price_subtotal": "56.10",
  "service_time_estimate": "0",
  "service_price_subtotal_estimate": "425.00",
  "billable": "1320",
  "expense_price": "0.00",
  "material_cost_subtotal": "35.50",
  "remaining_subtotal": "180",
  "object_table": "job",
  "service_price_subtotal": "0.00",
  "charged_subtotal": "70.84",
  "logged": "1500",
  "object_id": "2",
  "logged_subtotal": "2100",
  "is_billable": "yes",
  "billable_subtotal": "1920",
  "material_cost": "35.50",
  "id": "11",
  "service_price_estimate": "0.00",
  "nonbillable": "180",
  "service_price": "0.00",
  "material_price": "56.10",
  "service_time_subtotal_estimate": "10800",
  "nonbillable_subtotal": "180"
}
```

The object budget resource contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the object budget. |
| against_type | string | The type of object the object budget is against. |
| against_id | unsigned | The unique identifier of the object the object budget is against. |
| object_table | string | The type of object the object budget is against. **Deprecated** please use "against_type". |
| object_id | unsigned | The unique identifier of the object the object budget is against.**Deprecated** please use "against_type".  |
| object | string | The API URI of the object the object budget is against. This is "`{against_type}`/`{against_id}`" |
| is_billable | select | Either "yes" or "no", whether time logged against the object is billable. |
| service_time_estimate | integer | The estimated total time for services against the object, in seconds.|
| service_time | integer | The total time logged for services against the object, in seconds. |
| service_time_subtotal_estimate | integer | The estimated total time for services against the object and its children, in seconds. |
| service_price_estimate | decimal | An estimate for the total price of services against the object. |
| service_price | decimal | The total price of services against the object. |
| service_price_subtotal_estimate | decimal | An estimate for the total price of services against the object and all of its children. |
| service_price_subtotal | decimal | The total price of services against the object and all of its children. |
| expense_price | decimal | The total prices of expenses for the object. |
| material_cost | decimal | The total cost of materials for the object. |
| material_cost_subtotal | decimal | the total cost of materials for the object and all its children. |
| material_price | decimal | The total price of materials for the object. |
| material_price_subtotal | decimal | The total price of materials for the object and all its children. |
| billable | integer | The total billable time logged against the object, in seconds. |
| billable_subtotal | integer | The total billable time logged against the object and all its children, in seconds. |
| nonbillable | integer | The total nonbillable time logged against the object, in seconds. |
| nonbillable_subtotal | integer | The total nonbillable time logged against the object and all its children, in seconds. |
| logged | integer | The total time logged against the object, in seconds. That is, the sum of `billable` and `nonbillable`. |
| logged_subtotal | integer | The total time logged against the object and all its children, in seconds. |
| charged | decimal | The total cost charged against the object. |
| charged_subtotal | decimal | The total cost charged against the object, and all its children. |
| remaining_subtotal | decimal | If `object_table` is `tasks` the remaining budget for the task, otherwise the sum of the remaining subtotal of all the object's children's. |






#### The Item Template Object
> Example template object:

```json
{
    "code": "260",
    "cost": "0.0000",
    "cost_rate_id": null,
    "description": "Other Revenue GST on Income",
    "expense_type_ledger": "20",
    "id": "8",
    "ledger_id": "20",
    "line_item_ledger": "20",
    "price": "0.0000",
    "price_rate_id": null,
    "quantity": "1.0000",
    "standing": "active",
    "tax_id": "12",
    "title": "Other Revenue GST on Income",
    "type": "service"
}
```

These are templates for [expenses](#the-expense-object), [materials](#the-material-object),
and [services](#the-service-object). These templates allow you to easily add items to your budgets. The template object
contains:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the template. |
| **title** | string | The title of the template. |
| description | string | A description of the template. |
| price | decimal | The sale price. |
| type | select | Either 'expense', 'material', or 'service', the type of item described by the template. |
| code | string | The code given for the template |
| standing | select | Either 'active' or 'inactive', the standing of the template. |
| quantity | decimal | The default quantity used with this template. |
| cost | Decimal | The cost (or purchase price) of the template. |
| cost_rate_id | unsigned | The id of the cost [rate](#the-rate-object) associated with the template (if any).  |
| cost_tax_id | unsigned | The id of  the cost [tax](#the-tax-object) (or purchase tax) associated with the template. |
| cost_ledger_id | unsigned | The id of the cost [ledger](#the-ledger-object) (or purchase ledger) associated with the template.|
| price | decimal | The sale price of the template. |
| price_rate_id | unsigned | The id of the price [rate](#the-rate-object) associated with the template (if any). |
| tax_id | unsigned | The id of the sale [tax](#the-tax-object) associated with the template. |
| ledger_id | unsigned | Then id of the sale [ledger](#the-ledger-object) associated  with the template. |
| line_item_ledger | unsigned or object | The [ledger](#the-ledger-object) associated with the template.  |
| expense_type_ledger | unsigned or object | Where `type` is `expense`, the [ledger](#the-ledger-object) associated with the template. |
| cost_tax | unsigned or object | The cost [tax](#the-tax-object) (or purchase tax) associated with the template. |
| cost_ledger | unsigned or object  | The cost [ledger](#the-ledger-object) (or purchase ledger) associated with the template. |


#### The Material Object
> Example material object:

```json
{
    "against_id": "201",
    "against_type": "milestone",
    "budget_item_template": "0",
    "budget_item_template_id": "0",
    "cost": "24.0000",
    "date_created": "1457523796",
    "id": "10",
    "material_item_ledger": "0",
    "material_item_ledger_id": null,
    "ordering": "0",
    "price": "0.9900",
    "quantity": "1.0000",
    "tax_id": null,
    "title": "Design Tools"
}
```

These describe instances of material templates as items on a budget. These contain the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the material. |
| **title** | string | A title for the material. |
| against_type | string | The type of object the material has be added against. |
| against_id | unsigned | The id of the object the material has been added against. |
| quantity | decimal | The quantity of the material added. |
| cost | decimal | The cost (or purchase price) of the material. |
| price | decimal | The sale price of the material |
| date_created | unix ts | The date the material was created. |
| material_ledger_id | unsigned | The unique identifier of the [ledger](#the-ledger-object) used by the material. |
| material_template_id | unsigned | The unique identifier of the [item template](#the-item-template-object) the material is based off. |
| tax_id | unsigned | The unique identifier of the [tax](#the-tax-object) on the material. |
| material_ledger | unsigned or object | The [ledger](#the-ledger-object) used by the material. |
| material_template | unsigned or object | The [item template](#the-item-template-object) the material is based off. |
| ordering | unsigned | A number describing the order the material is displayed. |

#### The Service Object
> Example service object:

```json
{
    "against_id": "22",
    "against_type": "contract",
    "budget_item_template": "8",
    "budget_item_template_id": "8",
    "id": "92",
    "service_item_ledger": "20",
    "service_item_ledger_id": "20",
    "tax_id": "12"
}
```

These describe instances of service templates as items on a budget. These contain the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the service. |
| against_type | string | The type of object the service has been added against. |
| against_id | unsigned | The id of the object the service has been added against. |
| service_ledger_id | unsigned | The unique identifier of the [ledger](#the-ledger-object) used by the service. |
| service_template_id | unsigned | The unique identifier of the [template](#the-item-object-template) used by the service. |
| tax_id | unsigned  | The unique identifier of the [tax](#the-tax-object) used by the service. |
| service_ledger | unsigned or object | The [ledger](#the-ledger-object) used by the service. |
| service_template | unsigned of object | The [template](#the-item-object-template) used by the service. |








### Get Object budget
> Sample Request:

```http
GET /api/v0/object_budgets/{object_budget_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/object_budgets/{object_budget_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /object_budgets/{object_budget_id}`

This request returns an [object budget](#the-object-budget) identified by its `object_budget_id`.

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [object budget](#the-object-budget) using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response
The response will be the single [object budget](#the-object-budget) with its default fields and any additional fields requested through `_fields`.







### List Object Budgets
> Sample Request:

```http
GET /api/v0/object_budgets HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/object_budgets \
  -H 'authorization: Bearer {access_token}'
```

`GET /object_budgets`

This request returns a list of [object budgets](#the-object-budget) on the deployment.

#### Configuring the Response

##### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [object budget](#the-object-budget) using the [`_fields`](#configuring-the-response-fields) parameter.

##### Basic Filters
This request supports the following [basic filters](#filters-basic-filters):

| Filter Name |
|:-|
| id |
| against_id |
| against_type |

##### Order Filters
This request supports the following [order filters](#filters-order-filters):

| Filter Name |
|:-|
| id |

##### Object Filters
This request supports the following [object filters](#filters-object-filters):

| Filter Name |
|:-|
| against | Filter by object budgets against these objects. |

#### Handling the Response
The response will be a list of [object budgets](#the-object-budget) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination requests used.







### Count Object Budgets
> Sample Request:

```http
GET /api/v0/object_budgets/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/object_budgets/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /object_budgets/count`

This request will return a count of object budgets in a list defined by any available searches or filters. With no searches or filters this will be a count of all object budgets on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of object budgets listed. |








### List Item Templates

> Sample request:

```http
GET /api/v0/object_budgets/templates HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
  https://{deployment}.api.accelo.com/api/v0/object_budgets/templates \
  -H 'authorization: Bearer {access_token}' \
```

`GET /object_budgets/templates`

This request returns a list of [item templates](#the-item-template-object) on the deployment.

#### Configuring the Response

##### Pagination

This request supports all the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects from the
[item template object](#the-item-template-object) using the [`_fields`](#configuring-the-response-fields) parameter.

##### Basic Filters

This request supports the following [basic filters](#filters-basic-filters):

| Filter Name | Notes |
|:-|:-|
| id | |
| type | |
| standing | |
| ledger_id | |
| cost_ledger_id | |
| cost_tax_id | |
| tax_id | |

##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id | |
| price | |
| cost | |

##### Order Filters

This request supports the following [order filters](#filters-order-filters):

| Filter Name | Notes |
|:-|:-|
| id | |
| cost | |
| title | |
| price | |
| standing | |

##### Empty Filters

This request supports [empty filters](#filters-empty-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| title | |

##### Searching

This request supports the [`_search`](#configuring-the-response-searching) parameter
to search over the following fields:

| Field |
|:-|
| title |
| description |
| code |

#### Handling the Response

The response will be a list of [item templates](#the-item-template-object) with their default fields and any additional
fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.












### List Materials

> Sample request:

```http
GET /api/v0/object_budgets/materials HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
  https://{deployment}.api.accelo.com/api/v0/object_budgets/materials \
  -H 'authorization: Bearer {access_token}' \
```

`GET /object_budgets/materials`

This request returns a list of [materials](#the-material-object) on the deployment.

#### Configuring the Response

##### Pagination

This request supports all the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects from the [material object](#the-material-object) using the
[`_fields`](#configuring-the-response-fields) parameter.

##### Basic Filters

This request supports the following [basic filters](#filters-basic-filters):

| Filter Name | Notes |
|:-|:-|
| id | |
| against_id | |
| against_type | |
| material_ledger_id | |
| material_template_id | |
| quantity | |
| cost | |
| price | |
| tax_id | |

##### Date Filters

This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| date_created | |

##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id | |
| cost | |
| price | |
| quantity | |

##### Order Filters

This request supports the following [order filters](#filters-order-filters):

| Filter Name | Notes |
|:-|:-|
| id | |
| quantity | |
| price | |
| cost | |
| date_created | |

##### Searching

This request supports the [`_search`](#configuring-the-response-searching) parameter
to search over the following fields:

| Field |
|:-|
| title |

#### Handling the Response

The response will be a list of [materials](#the-material-object) with their default fields and any additional fields
requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.






### List Services

> Sample request:

```http
GET /api/v0/object_budgets/services HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
  https://{deployment}.api.accelo.com/api/v0/object_budgets/services \
  -H 'authorization: Bearer {access_token}' \
```

`GET/object_budgets/services`

This request returns a list of [services](#the-service-object) on the deployment.

#### Configuring the Response

##### Pagination

This request supports all the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects from the [service object](#the-service-object) using the
[`_fields`](#configuring-the-response-fields) parameter.

##### Basic Filters

This request supports the following [basic filters](#filters-basic-filters):

| Filter Name | Notes |
|:-|:-|
| id | |
| against_id | |
| against_type | |
| service_template_id | |
| service_ledger_id | |
| tax_id | |

##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id | |

##### Object Filters

This request supports the following [object filters](#filters-object_filters):

| Filter Name | Notes |
|:-|:-|
| against | |

##### Order Filters

This request supports the following [order filters](#filters-order-filters):

| Filter Name | Notes |
|:-|:-|
| id | |

#### Handling the Response

The response will be a list of [services](#the-service-object) with their default fields and any additional fields
requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.
