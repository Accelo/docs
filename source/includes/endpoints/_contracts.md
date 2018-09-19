## Contracts
> Resource URI:  
`/api/v0/contracts`

Contracts (also known as retainers) are objects for managing recurring client work, maintenance quotas, or periodic
invoicing - such as license fee. A contract is created against a company/client record (that is, an
[affiliation](#affiliations)), and work is tracked against the contract through [periods](#the-contract-period). You can
configure your contract to automatically create periods at certain intervals, and invoice up-front for a fixed amount or
at the end of the period for the work done. See the [support documentation](https://www.accelo.com/resources/help/guides/user/modules/retainers/)
for more information on contracts/retainers.

The contracts model integrates flawlessly with the the [issues](#issues) and [jobs](#jobs-projects) modules so that you
can even allocate work from those into a contract period. Contracts can also be linked to [service
items](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/modules/billing-and-invoices/items/services/), 
allowing for easy handling of things like tax codes and ledger codes.

### The Contract Object
> Example contract:

```json
{
  "id": "1",
  "date_last_interacted": "1493265142",
  "send_invoice": "none",
  "job": null,
  "against_id": "39",
  "against_type": "company",
  "type": "1",
  "period_template_id": "2",
  "date_expires": "1495591200",
  "deployment": "1495325400",
  "auto_renew": "no",
  "title": "A new contract",
  "standing": "active",
  "manager": "14",
  "renew_days": "0",
  "date_created": "1493265142",
  "date_started": "1493258400",
  "company": "39",
  "status": "2",
  "billable": "98",
  "date_period_expires": "1493776800",
  "value": "0.00",
  "against": "companies/39",
  "notes": "This contract was created against a company",
  "affiliation": "98",
  "staff_bookmarked": "1"
}
```

The contract object contains the following fields and linked objects:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the contract. |
| **title** | string | A title for the contract. |
| **period_template_id** | unsigned | The unique identifier of the `period_template`. See the [support documentation](https://www.accelo.com/resources/help/guides/user/modules/retainers/add-a-retainer/#periodtemplate) for information on period templates. |
| date_created | unix ts | The date the contract was created on the Accelo deployment. |
| date_started | unix ts | The date the contract was started. |
| date_expires | unix ts | The date the contract expires. |
| date_period_expires | unix ts | The date the current period ends. |
| against | string | The API URI for the object the contract is against. For example "contact/94". |
| against_id | unsigned | The unique identifier of the object the contract is against. |
| against_type | string | The type of object the contract is against. For example "contact". |
| value | decimal | The total value of this contract. |
| auto_renew | string | Either "yes" or "no", whether the contract auto renews. |
| renew_days | string | Number of days before the current period expires to renew. |
| send_invoice | string | Type of invoice to be sent on renewal, if any. Can be "none", "email", "fax" or "postal". |
| notes | string | Any notes made against the contract. |
| staff_bookmarked | bool | Whether the current user has favourited the contract. |
| owner_affiliation | unsigned or object | The [affiliation](#affiliations) the contract is owned by. This replaces the deprecated "affiliation" object, please avoid requesting both objects at once. |
| billable_affiliation | unsigned | The unique id for the billable affiliation. |
| type  | unsigned or object | The [type](#the-contract-type) of the contract, contract types may be configured on the deployment. Deprecated, please use `contract_type`. |
| contract_type | unsigned or object | The [contract type](#the-contract-type) of the contract. |
| manager | unsigned or object | The staff member managing this contract. |
| status | unsigned or object | The [status](#statuses) of the contract. |
| standing | string | The standing of the contract, this is part of the status object. For example "active", "cancelled". |
| job | unsigned or object | The job the contract is against, if any. |
| company | unsigned or object | The company the contract is against, if any. |

#### The Contract Period
> Example contract period object:

```json
{
  "allowance_type": "unlimited_hours",
  "budget_type": "pre-paid",
  "duration_type": "fixed",
  "date_created": "1493265142",
  "rate_id": "11",
  "date_commenced": "1493258400",
  "rollover": "no",
  "contract": "contracts/1",
  "standing": "opened",
  "service_item_id": "1",
  "contract_budget": "1",
  "id": "1",
  "rate_type": "object",
  "date_expires": "1493776800",
  "contract_id": "1",
  "date_closed": null
}
```

The contract period is a duration of time to track and invoice a contract. The `contract_period` object contains the
following:

| Field | Type | Description |
|:-|:-|:-|
| id | unsigned | A unique identifier for the period. |
| date_created | unix ts | The date the period was created. |
| date_commenced | unix ts | The date the period commenced. |
| date_expires | unix ts | The date the period expires. |
| date_closed | unix ts | The date the period was closed. |
| budget_type | select | The budget or billing type. May be either "pre-paid" or "post-paid". |
| allowance_type | select | The prepaid allowance for the period. May be either "unlimited hours", "fixed hours", or "fixed value". |
| rate_type | select | Whether [activities](#activities) linked to the period should use the rate defined by the object they are against, or the rate defined by the contract. May be either "contract" or "object". |
| rate_id | unsigned | The unique identifier of the [rate object](#rates) of the period. |
| service_item_id | unsigned | The unique identifier of the service item linked to the contract. See the [support documentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/modules/billing-and-invoices/items/services/) for information on service items. |
| duration_type | select | The type of the period duration. May be either "fixed" or "unlimited". |
| rollover | select | Whether an expiring period should roll unused allowance into the next period. Either "yes" or "no". |
| standing | string | The standing of the period. For example "opened", "closed". |
| contract | string | The API URI of the contract the period belongs to. |
| contract_id | unsigned | The unique identifier of the contract the period belongs to. |
| contract_budget | unsigned or object | The id or object of the [budget](#the-contract-budget) assigned to the period. |


#### The Contract Type
> Example contract type object:

```json
{
  "period_template_id": "1",
  "title": "Default",
  "auto_renew": "no",
  "parent": "0",
  "renew_days": "0",
  "id": "1"
}
```

For ease of use and automation, different contract templates can be set up on the Accelo deployment. These templates are
covered by the contract type which contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the contract type. |
| **title** | string | A title for the contract type. |
| parent |unsigned | The unique identifier for the parent contract. Value is "0" if there is no parent. |
| standing | string | The standing of the contract upon creation. For example "pending", "active". |
| ordering | unsigned | The ordering of the contract type on the Accelo deployment. |
| auto_renew | string | As in the [contracts object](#the-contract-object). |
| renew_days | string | As in the [contracts object](#the-contract-object). |
| send_invoice | string | As in the [contracts object](#the-contract-object). |
| period_template_id | unsigned | As in the [contracts object](#the-contract-object). |

This object does not support the `_ALL` argument under `_fields`.

**Note:** The `type` field is deprecated, please request the contract type through the `contract_type` field,
which contains the following additional fields:

| Field | Type | Description |
|:-|:-|:-|
| invoice_template_id | unsigned | The unique identifier of the invoice template used for this contract type. |
| service_tax_id | unsigned | The unique identifier of the service tax used for this contract type. |
| service_tax_ledger_id | unsigned | The unique identifier of the service tax ledger used for this contract type. |
| auto_complete_task | boolean | Either "1" or "0" whether this contract type is set to autocomplete tasks. |


#### The Contract Budget
> Example contract budget object:

```json
{
  "id": "1",
  "value": "25.00",
  "product_charged": "30.00",
  "time_charged": "24.00",
  "time": "1000",
  "against_type": "contract_period",
  "against_id": "10"
}
```

| Field | Type | Description |
|:-|:-|:-|
| id | unsigned | A unique identifier for the contract budget. |
| value | string | The financial value of the budget (sum of all values within budget). This requires full financial access. |
| product_charged | string | The financial value charged for the budget's product(s) (sum of all product charges within budget). This requires full financial access. |
| time_charged | string | The financial value charged for the budget's time (sum of all time charges within budget). This requires full financial access. |
| time | unsigned | The time spent in seconds on the budget (sum of all time within budget). |
| against_type | string | The type of object this budget is against. e.g, "contract_period". |
| against_id | unsigned | The id of the object this budget is against. |

### Get Contract
> Sample Request:  

```http
GET /api/v0/contracts/{contract_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contracts/{contract_id}
  -H 'authorization: Bearer {access_token}'
```

`GET /contracts/{contract_id}`

This request returns a single contract from the Accelo deployment, specified by its `contract_id`.


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [contract object](#the-contract-object)
using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs
](#configuring-the-response-breadcrumbs).


#### Handling the Response

The response will be a single [contract object](#the-contract-object), with its default fields and any additional fields
requested by `_fields`.






### List Contracts
> Sample Request:  

```http
GET /api/v0/contracts HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contracts
  -H 'authorization: Bearer {access_token}'
```

`GET /contracts`

This request returns a list of contracts from the Accelo deployment.


#### Configuring the Response

##### Pagination

This request supports all the [pagination](#configuring-the-response-pagination) parameters.


##### Additional Fields and Linked Objects

This request supports requesting any extra fields or linked objects from the [contracts object](#the-contract-object)
via the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).


##### Basic Filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id | |
| standing | |
| type | Filter against the `type_id`. Deprecated, please use `contract_type`. |
| contract_type | Filter against the `contract_type_id`. |
| manager | Filter against the `staff_id` of the manager. |
| billable_affiliation | Filter against the `affiliation_id` of the billable affiliation. |
| owner_affiliation | Filter against the `affiliation_id` of the owner affiliation. |
| status | Filter against the `status_id`. |
| against_id | |
| against_type | |
| is_related_to_issue | Filter contracts related to an [issue](#issues) (or list of issues), identified by its `issue_id`. |


##### Date Filters

This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| date_created |
| date_started |
| date_expired |
| date_period_expires |


##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id | |
| date_created | |
| date_started | |
| date_expires | |
| date_period_expires | |
| standing | Order by the string field `standing`. |
| status | Order by the `status_id`|
| title | |
| date_last_interacted | |


##### Range Filters

this request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id | |
| type | Range by `type_id`. Deprecated, please use `contract_type`. |
| contract_type | Range by the `contract_type_id`. |
| billable | Range by the `company_id` of the billable company. |
| affiliation | Range by `affiliation_id`. |
| manager | Range by the `staff_id` of the manager of the contract. |
| against_id | |
| status | Range by `status_id`. |
| value | |
| renew_days | |
| period_template | Range by `period_template_id`. |
| service_tax | Range by `service_tax_id` from the [service item](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/modules/billing-and-invoices/items/services/) linked to the contract, if any. |
| service_ledger | Rage by `service_ledger_id`.from the [service item](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/modules/billing-and-invoices/items/services/) linked to the contract, if any. |


##### Object Filters

This request supports the following [object filters](#filters-object-filters):

| Filter Name | Description |
|:-|:-|
| against | Filter by contracts against these objects. |


#### Handling the Response

The response will be a list of [contract objects](#the-contract-object) containing the default fields and any additional
field requested by `_fields`, and displayed according to any pagination parameters or filters used.






### Count Contracts
> Sample Request:

```http
GET /api/v0/contracts/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contracts/count
  -H 'authorization: Bearer {access_token}'
```

`GET /contracts/count`

This request will return a count of contracts in a list defined by any available searches or filters. With no searches
or filters this will be a count of all contracts on the deployment. This request does not return a response object, just
a single value:

| Field | Type | Description |
|:-|:-|:-|
| **response** | unsigned | A count of the listed contracts. |






### Get Contract Period
> Sample Request:  

```http
GET /api/v0/contracts/{contract_id}/periods/{period_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contracts/{contract_id}/periods/{period_id}
  -H 'authorization: Bearer {access_token}'
```

`GET /contracts/periods/{period_id}`

This request returns a single [contract period](#the-contract-period) object from the Accelo deployment.


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [contract period object](#the-contract-
period) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports 
[breadcrumbs](#configuring-the-response-breadcrumbs).


#### Handling the Response

This response will be a single contract period object, with its default fields and any additional fields requested via
`_fields`.






### List Contract Periods
> Sample Request:  

```http
GET /api/v0/contracts/{contract_id}/periods HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contracts/{contract_id}/periods
  -H 'authorization: Bearer {access_token}'
```
`GET /contracts/{contract_id}/periods`

This request returns a list of [contract periods](#the-contract-period) for a contract, specified by its `contract_id`.


#### Configuring the Response

##### Pagination

This request supports all the [pagination](#configuring-the-response-pagination) parameters.


##### Additional Fields and Linked Objects

This request supports requesting extra fields or linked objects from the [contract_period object](#the-contract-period)
using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports 
[breadcrumbs](#configuring-the-response-breadcrumbs).


##### Basic Filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id |
| budget_type |
| allowance_type |
| rate_type |
| rate | Filter over the `rate_id`. |
| service_item | Filter over the `service_item_id`. |
| duration_type |
| rollover |
| standing |
| contract | Filter over the `contract_id`. |
| contract_budget | Filter by the id of the [budget](#the-contract-budget) assigned to the period. |


##### Date Filters

This request supports [date filters](#date-filters) over the following fields:

| Filter Name |
|:-|
| date_created |
| date_commenced |
| date_expires |
| date_closed |


##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id | |
| contract | Range over the `contract_id`. |
| rate | Range over the `rate_id`. |
| rate_charged | Range over the rate at which billable time is charged for [activities](#activities) against this contract. |
| budget | Range over the `budget_id`. |
| service_item | Range over the `service_item_id`. |


##### Order Filters

This request supports [order filtering](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| date_created |
| date_commenced |
| date_expires |
| date_closed |


#### Handling the Response

The response will be a list of [contract objects](#the-contract-object) containing the default fields and any additional
fields requested by `_fields`, and displayed according to any pagination parameters or filters used.






### List Contract Types
> Sample Request:  

```http
GET /api/v0/contracts/types HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contracts/types
  -H 'authorization: Bearer {access_token}'
```
`GET /contracts/types`

This request returns a list of contract types on the Accelo deployment.


#### Configuring the Response

##### Pagination

This request supports all the [pagination](#configuring-the-response-pagination) parameters.


##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects from the [contract type object](#the-contract-type) 
using the [`_fields`](#configuring-the-response-fields) parameter.


##### Basic filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Field |
|:-|
| id |
| standing |
| auto_renew |
| parent |
| send_invoice |
| period_template_id |
| invoice_template_id |
| service_tax_id |
| service_ledger_id |


##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Field |
|:-|
| id |
| title |
| standing |
| ordering |


##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Field |
|:-|
| id |
| renew_days |


##### Empty Filters

This request supports [empty filters](#filters-empty-filters) over the following fields:

| Field |
|:-|
| title |


##### Searching

This request the use of the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Field |
|:-|
| title |


#### Handling the Response

This request will return a list of contract types containing the default fields and any additional fields request by
`_fields`, and displayed according to any pagination parameters, filters, or searches used.






### Count Contract Types
> Sample Request:  

```http
GET /api/v0/contracts/types/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contracts/types/count
  -H 'authorization: Bearer {access_token}'
```
`GET /contracts/types/counts`

This request returns a count of [contract types](#the-contract-type) in a list defined by any available searches or
filters. With no searches or filters this will be a count of all contract types on the deployment. This request returns
a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the listed contract types. |






### Get Contract Type
> Sample Request:  

```http
GET /api/v0/contracts/types/{type_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contracts/types/{type_id}
  -H 'authorization: Bearer {access_token}'
```
`GET /contracts/types/{type_id}`

This request returns a single [contract type object](#the-contract-type) identified by its `contract_type_id`.


#### Configuring the Request

This request supports requesting extra fields or objects from the [contract type object](#the-contract-type) through the
`_fields` parameter.


#### Handling the Response

The response will contain the single contract type with its default fields, and any additional fields requested through
`_fields`.





### Get Contract Status
> Sample Request:

```http
GET /api/v0/contracts/statuses/{status_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/contracts/statuses/{status_id} \
  -H 'authorization: Bearer {access_token}' \
```


`GET /contracts/statuses/{status_id}`

This request returns the contract [status](#statuses) specified by its `status_id`.

#### Configuring the Response

This request supports requesting additional fields and linked objects from the [status object](#statuses) using the
[`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will be a contract [status object](#statuses) for the specified status with its default fields and any
additional fields requested through `_fields`.





### List Contract Statuses
> Sample Request:

```http
GET /api/v0/contracts/statuses HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contracts/statuses \
  -H 'authorization: Bearer {access_token}'
```

`GET /contracts/statuses`

This request reutrns a list of contract [statuses](#statuses) on the deployment.


#### Configuring the Response

##### Pagination

This request supports the standard [pagination](#configuring-the-response-pagination) requests.


##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects from the contract [status object](#statuses) through
the [`_fields`](#configuring-the-response-fields) parameter.


##### Basic Filters

This request supports the following [basic filters](#filters-order-filters):

| Filter Name |
|:-|
| id |
| title |
| standing |
| color |


##### Order Filters

This request supports the following [order filters](#filters-order-filters):

| Filter Name |
|:-|
| id |
| title |
| standing |
| color |
| ordering |


##### Searching

This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Field |
|:-|
| title |






### Count Contract Statuses
> Sample Request:

```http
GET /api/v0/contracts/statuses/count HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/contracts/statuses/count \
  -H 'authorization: Bearer {access_token}' \
```


`GET /contracts/statuses/count`

This request will return a count of contract statuses in a list defined by any available searches or filters.
With no searches or filters this will be a count of all contract statuses on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the listed contract statuses. |






### Close a Contract Period (Beta)
> Sample Request:

```http
PUT /api/v0/contracts/periods/{period_id}/close HTTP/1.1
HOST: {deployment.api.accelo.com}
Authorization: Bearer {access_token}
```

```shell
curl -X PUT \
  https://{deployment}.api.accelo.com/api/v0/contracts/periods/{period_id}/close \
  -H 'authorization: Bearer {access_token}
```

`[PUT | POST] /contracts/periods/{period_id}/close`

This request closes and returns a [contract period](#the-contract-period), see the [support
documentation](https://www.accelo.com/resources/help/guides/user/modules/retainers/close-period/#ClosePeriod) for
information on closing contract periods. The response may be configured as per [get contract period](#get-contract-period).

**Take Care:** This request doesn't just set the standing to 'closed', but will replicate the actions taken when you close
a contract period via the Web App, including closing tickets/issues if the contract is set to auto complete.





### Reopen a Contract Period (Beta)
> Sample Request:

```http
PUT /api/v0/contracts/periods/{period_id}/open HTTP/1.1
HOST: {deployment.api.accelo.com}
Authorization: Bearer {access_token}
```

```shell
curl -X PUT \
  https://{deployment}.api.accelo.com/api/v0/contracts/periods/{period_id}/open \
  -H 'authorization: Bearer {access_token}
```

`[PUT | POST] /contracts/periods/{period_id}/open`

This request reopens and returns a previously close [contract period](#the-contract-period). The response may be
configured as pre [get contract period](#get-contract-period).





### List Available Progressions on a Contract
> See the [progressions section](#retrieve-a-list-of-available-progressions) for a sample request

`GET /contracts/{contract_id}/progressions`

This request returns a list of available [progressions](#the-progression-object) for an contract, specified by its
`contract_id`. This is the request [`GET /{object}/{object_id}/progressions`](#retrieve-a-list-of-available-progressions) 
where the object is "contracts" whose id is `{contract_id}`.






### Auto Run a Progression on a Contract
> See the [progressions section](#run-a-status-update-using-a-given-progression) for a sample request

`[POST|PUT] /contracts/{contract_id}/progressions/{progression_id}/auto`

This request uses the given progression, specified by its `progression_id` to progress an contract, specified by its
`contract_id`. This is the request 
[`[POST|PUT] /{object}/{object_id}/progressions/{progression_id}/auto`](#run-a-status-update-using-a-given-progression) 
where the object is "contracts" whose id is `{contract_id}`.






### List a Contract's Resource Collections
> See the [resources (attachments) section](#retrieve-an-array-of-collections-for-an-object) for an example  

`GET /companies/{company_id}/collections`

This request returns a list of [collections](#resources) against a [company](#the-company-object), specified by its
`company_id`. This is the request [`GET /{object}/{object_id}/collections`](#retrieve-an-array-of-collections-for-an-object) 
where the object is "companies" and whose id is `{company_id}`.






### Upload a Resource (Attachment) to a Collection on a Contract
> See the [resources (attachments) section](#upload-a-resource-to-a-collection-of-an-object) for an example   

`POST /companies/{company_id}/collections/{collection_id}/resources`

This request uploads a [resource](#resources) to a collection, specified by its `collection_id`, of a [company](#the-
company-object) specified by its `company_id`. This it the request 
[POST/{object}/{object_id}/collections/{collection_id}/resources](#upload-a-resource-to-a-collection-of-an-object) 
where the object is "companies" and whose id is `{company_id}`.






### List a Contract's Profile Field Values
> See the [profiles section](#retrieve-a-list-of-profile-values) for a sample request

`GET /contract/{contract_id}/profiles/values`

This request returns a list of [profile field values](#the-profile-value-object) of a [contracts](#the-contract-object),
specified by its `contract_id`. This is the request  
[`GET/{object}/{object_id}/profiles/values`](#retrieve-a-list-of-profile-values), where the object is "contracts" whose id is `{contract_id}`.






### List all Profile Field Values on Contracts
> See the [profiles section](#list-profile-values) for a sample request

`GET /contracts/profiles/values`

This request returns a list of all [profile field values](#the-profile-value-object) on [contracts](#the-contract-object).
This is the request [`GET /{object}/profiles/values`](#list-profile-values), where the object is "contracts".





### List Contract Profile Fields
> See the [profiles section](#retrieve-a-list-of-profile-fields) for a sample request

`GET /contracts/profiles/fields`

This request returns a list of [profile fields](#the-profile-field-object) available for any [contract](#the-contract-object).
This is the request [`GET /{object}/profiles/fields`](#list-profile-fields), where the object is "contracts".






### List Contract Extension Fields
> See the [extension section](#retrieve-a-list-of-extension-fields) for an example

`GET /contracts/extensions/fields`

This request returns a list of [extension fields](#the-extension-field-object) available for an contract, specified by
its `contract_id`. This is the request [`GET /{object}/extensions/fields`](#retrieve-a-list-of-extension-fields), where
the object is "contracts".





### List all Extensions Field Values on Contracts
> See the [extension section](#list-extension-values) for an example

`GET /contracts/extensions/values`

This request returns a list of [extension field values](#the-extension-value-object) on [contracts](#the-contract-object). This is the request
[`GET /{object}/extensions/values`](#list-extension-values), where the object is "contracts".






### List a Contract's Extension Field Values
> See the [extension section](#retrieve-a-list-of-extension-field-values) for an example     

`GET /contracts/{contract_id}/extensions/values`

This request returns a list of [extension values](#the-extension-value-object) for an contract, specified by its
`contract_id`. This is the request [`GET /{object}/{object_id}/extensions/values`](#retrieve-a-list-of-extension-field-values), 
where the object is "contracts", and whose id is the `contract_id`.






### Update an Extension Field Value on a Contract
> See the [extension section](#update-an-extension-value) for an example    

`PUT /contracts/{contract_id}/extensions/values/{extension_value_id}`

This request updates the value of an [extension field value](#the-extension-value-object), specified by its
`extension_value_id`, of a [contract](#the-contract-object), specified by its `contract_id`. This is the request 
[`PUT{object}/{object_id}/extensions/values/{extension_value_id}`](#update-an-extension-value), where the object is
"contracts", and whose id is `contract_id`





### Set an Extension Value on a Contract
> See the [extension section](#create-an-extension-value) for an example  

`POST /contracts/{contract_id}/extensions/fields/{extension_field_id}`

This request sets and returns the value of an extension field, specified by its `extension_field_id`, of an contract,
specified by its `contract_id`. This request is the request 
[`POST/{object}/{object_id}/extensions/fields/{extension_field_id}`](#create-an-extension-value) where our object is
"contracts" whose id is `contract_id`.
