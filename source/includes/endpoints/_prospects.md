## Prospects (Sales)
> Resource URI:  
`api/v0/prospects`

Prospects (also known as Sales) are a way to keep track of your sales and deals. See the [support
documentation](https://www.accelo.com/resources/help/guides/user/modules/sales/) for more information on the full
potential of these, and also information on setting up and configuring them via the deployment.


### The Prospect Object
> Example prospects object

```json
{
  "affiliation": "75",
  "progress": "0.2500",
  "staff_bookmarked": "0",
  "status": "2",
  "comments": "Lets get these shoes out the door",
  "manager": "2",
  "date_created": "1494293760",
  "contact": "75",
  "date_actioned": "1494252000",
  "success": "no",
  "id": "9",
  "value": "1000.00",
  "type": "1",
  "value_weighted": "20",
  "standing": "active",
  "date_due": "1494424800",
  "date_last_interacted": "1494263000",
  "title": "Super Sonic Shoes (SSS)",
  "prospect_probability": "5",
  "weighting": "3"
}
```

The prospect object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the prospect. |
| **title** | string | A name for the prospect. |
| date_created | unix ts | The date the prospect was created. |
| date_actioned | unix ts | The date the prospect was actioned. |
| date_due | unix ts | The due date for the prospect. |
| date_last_interacted | unix ts | The date the prospect was last interacted with. |
| date_modified | unix ts | The date the prospect was last modified. |
| weighting | integer | A rating of the prospect, this is on a scale of 1-5, with 5 being the highest rating. |
| value | decimal | The currency value of the prospect. |
| success | select | Either "yes" or "no", whether the sale has been successfully completed, or won. |
| comments | string | Comments, description etc. of the Prospect. |
| progress | decimal | A decimal representation of the "progress %" associated with the current standing of the prospect. See the [support documentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/triggers-and-business-processes/business-processes/progressions/#CreateProgression) on setting up progressions for information on this field. |
| value_weighted | integer | A value incorporating the `progress` and `weighting` values to describe the prospect. |
| staff_bookmarked | boolean | Whether the current user has bookmarked the prospect on the deployment. |
| won_by_id | unsigned | The id of the [staff](#staff) who won the prospect. 'null' if the prospect has not been won. |
| cancelled_by_id | unsigned | The id of the [staff](#staff) who cancelled the prospect. 'null' if the prospect has not been cancelled. |
| abandoned_by_id | unsigned | The id of the [staff](#staff) who abandoned the prospect. 'null' if the prospect has not been abandoned. |
| contact | unsigned or object | The [contact](#contacts) associated with the prospect|
| manager | unsigned or object | The [staff](#staff) assigned to manage the prospect. |
| type | unsigned or object | The [prospect type](#the-prospect-type). Deprecated, please use `prospect_type`. |
| prospect_type | unsigned or object | The [prospect type](#the-prospect-type) of the prospect. |
| status | unsigned or object | The [status](#statuses) of the prospect. |
| standing | string | The standing of the prospect, this is part of the status object |
| prospect_probability | unsigned or object | The [prospect probability](#the-prospect-probability) of the prospect. |
| affiliation | unsigned or object | The [affiliation](#affiliations) associated with the prospect. |


#### The Prospect Type
> Example prospect type object:

```json
{
  "title": "Partner",
  "id": "1",
  "parent": "0",
  "ordering": "3",
  "standing": "active"
}
```

You may group prospect using prospect types to reflect the different actions taken on different types of prospect. See
the [support documentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-
guide/modules/prospect/sales-types/) for information on prospect types. The prospect type contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the prospect type. |
| **title** | string | A name for the prospect type. |
| parent | unsigned | The unique identifier of the parent prospect type. If there is no parent this has the value "0".  |
| standing | select | The standing of the prospect type, may be either "active" or "inactive". |
| ordering | integer | An integer representing the prospect type's ordering as displayed on the deployment. |


#### The Prospect Probability

Prospect probabilities are customizable fields you may use to reflect how likely you are to win a sale. The prospect
probability contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the prospect probability. |
| **title** | string | A name for the prospect probability. |
| **value** | integer | The value assigned to the prospect probability. |
| ordering | integer | An integer representing the prospect probability's ordering as displayed on the deployment. |


#### The Prospect Status

> Example Prospect Status object:

```json
{
  "standing": "active",
  "start": "yes",
  "ordering": "1",
  "id": "2",
  "title": "Qualified",
  "color": "yellow"
}
```

Prospect Statuses may be used to track the progress of a Prospect. These may be configured on the deployment, see the
[support documentation](https://www.accelo.com/resources/help/faq/automating-your-business-processes/statuses/) for more
information. The status object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the status. |
| **title** | string | A name for the status. |
| standing | string | A string describing the standing of the prospect. |
| color | string | The color of the status shown on the deployment. |
| start | select | Either "yes" or "no", whether an prospect may be created with this status. |
| ordering | unsigned | A number describing the order of the status on the deployment. |








### Get Prospect
> Sample Request:  

```http
GET /api/v0/prospects/{prospect_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/prospects/{prospect_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /prospects/{prospect_id}`

This request returns a single prospect, identified by its `prospect_id`.


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [prospect object](#the-prospect-object)
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will be the single [prospect](#the-prospect-object) with its default fields and any additional fields
requested via `_fields`.







### List Prospects
> Sample Request:  

```http
GET /api/v0/prospects HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/prospects \
  -H 'authorization: Bearer {access_token}'
```

`GET /prospects`

This request returns a list of prospects on the deployment.

#### Configuring the Response

##### Pagination

This request supports all the [pagination](#configuring-the-response-pagination) parameters.


##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects from the [prospects object](#the-prospect-object)
using the [`_fields`](#configuring-the-response-fields) parameter.


##### Basic Filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| standing ||
| weighting ||
| success ||
| affiliation | Filter by the `affiliation_id`. |
| manager | Filter by the `staff_id` of the manager. |
| type | Filter by the `type_id`. Deprecated, please use `prospect_type`. |
| prospect_type | Filter by the `prospect_type_id`. |
| status | Filter by the `status_id`. |
| prospect_probability | Filter by the `prospect_probability`. |
| company | Filter by the `company_id`. |
| won_by_id | Filter by the id of the staff who won the prospect. |
| cancelled_by_id | Filter by the id of the staff who cancelled the prospect. |
| abandoned_by_id | Filter by the id of the staff who abandoned the prospect. |


##### Date Filters

This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| date_created |
| dated_actioned |
| date_due |
| date_modified |


##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| date_actioned ||
| date_created ||
| date_due ||
| date_last_interacted ||
| date_modified |
| title ||
| id ||
| status | Order by the `status_id`. |
| standing ||


##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| weighting ||
| value ||
| progress ||
| value_weighted ||
| affiliation | Range over the `affiliation_id`. |
| manager | Range over the `staff_id` of the manager. |
| type | Range over the `type_id`. Deprecated, please use `prospect_type`. |
| prospect_type | Range over the `prospect_type_id`. |
| status | Range over the `status_id`. |


##### Searching

This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Filter Name |
|:-|
| title |


#### Handling the Response

This request will return a list of [prospects](#the-prospect-object) with their default fields and any additional fields
requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.







### Count Prospects
> Sample Request:  

```http
GET /api/v0/prospects/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/prospects/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /prospects/count`

This request will return a count of prospects in a list defined by any available searches or filters. With no searches
or filters this will be a count of all prospects on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the prospects listed. |







### Get Prospect Status
> Sample Request:  

```http
GET /api/v0/prospects/{prospect_id}/status HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/prospects/{prospect_id}/status \
  -H 'authorization: Bearer {access_token}'
```

`GET /prospects/{prospect_id}/status`

This request returns the [prospect status](#the-prospect-status) of a prospect, identified by its `prospect_id`.

#### Configuring the Response

This request supports requesting additional fields and linked objects from the [prospect status object](#the-prospect-status) 
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will be the single [prospect status](#the-prospect-status) with its default fields and any additional
fields requested through `_fields`.







### List Prospect Statuses
> Sample Request:  

```http
GET /api/v0/prospects/statuses HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/prospects/statuses \
  -H 'authorization: Bearer {access_token}'
```

`GET /prospects/statuses`

This request returns a list of  [statuses](#statuses) for prospects on the deployment.

#### Configuring the Response

##### Pagination

This request supports all the [pagination](#configuring-the-response-pagination) parameters.


##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects from the [status object](#statuses) using the
[`_fields`](#configuring-the-response-fields) parameter.


##### Basic Filters

This request supports the following [basic filters](#filters-basic-filters):

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


#### Handling the Response

The response will be a list of prospect [statuses](#statuses) with their default fields and
any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or
searches used.







### List Prospect Types
> Sample Request:  

```http
GET /api/v0/prospects/types HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/prospects/types \
  -H 'authorization: Bearer {access_token}'
```

`GET /prospects/types`

This request returns a list of [prospect types](#the-prospect-type) on the deployment.
The `_filters` parameter is set to `standing_not(inactive)` by default.


#### Configuring the Request

##### Pagination

This request supports all of the [pagination](#configuring-the-response-pagination) parameters.


##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects from the [prospect type](#the-prospect-type)
object using the [`_fields`](#configuring-the-response-fields) parameter.


##### Basic Filters

This request supports the following [basic filters](#filters-basic-filters):

| Filter |
|:-|
| id |
| standing |


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


##### Searching

This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following
fields:

| Field |
|:-|
| title |


#### Handling the Response

The response will be a list of [prospect types](#the-prospect-type) with their default fields and any additional fields
requested through `_fields`, and displayed according to any pagination parameters used.







### Update a Prospect
> Sample Request:  

```http
PUT /api/v0/prospects/{prospect_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/prospects/{prospect_id} \
  -H 'authorization: Bearer {access_token}'
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`PUT /prospects/{prospects_id}`

This request updates and returns a [prospect](#the-prospect-object), specified by its `prospect_id`.


#### Configuring the Prospect

The following fields may be updated through this request:

| Field | Type | Notes |
|:-|:-|:-|
| title |string ||
| comments | string ||
| value | decimal ||
| success | select | If provided, must be one of 'yes' or 'no'. |
| affiliation_id | int | MUST point to a valid affiliation. Updating this may relocate the prospect to a new company. |
| staff_id | int | Update the `staff_id` of the manager. MUST point to a valid staff. |
| date_due | unix ts or ISO8601 String ||
| weighting | int | Must be between 0 and 5. |
| progress | int  | Must be between 0 and 100. |
| probability_id | int ||
| status_id | int | Must point to a valid [prospect status](#the-prospect-status). **Warning** This will bypass any progressions and should only be used deliberately when automating tasks. Please use [progressions](#progressions) otherwise. |

See the [prospect object](#the-prospect-object) for more information on these fields.


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [prospect object](#the-prospect-object)
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will be the single, updated [prospect object](#the-prospect-object) with its default fields and any
additional fields requested through `_fields`.






### Create a Prospect

> Sample  Request:

```http
POST /api/v0/jobs HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded

title='New Prospect'
affiliation_id=1421
type_id=3
```

```shell
curl -X POST \
  https://{deployment}.api.accelo.com/api/v0/jobs/ \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'title=New Prospect' \
  -d 'affiliation_id=1421' \
  -d 'type_id=1'
```

`POST /prospects`

This request creates and returns a new [prospect](#the-prospect-object)


#### Configuring the Prospect

All fields available when [updating a prospect](#update-a-prospect) may also be set here, with the following additions:

| Field | Type | Notes |
|:-|:-|:-|
| **title** | string ||
| **affiliation_id** | int | Must point to a valid [affiliation](#the-affiliation-object). |
| **type_id** | int | Must point to a valid [prospect type](#the-prospect-type). |
| status_id | int | The starting status for the progression. Defaults to the status with the lowest `ordering`. **Note** this will skip any progressions. |


#### Handling the Response

The response will be the newly created prospect with its default fields and any additional fields requested through
`_fields`








### List a Prospect's Profile Field Values
> See the [profiles section](#retrieve-a-list-of-profile-values) for a sample request  

`GET /prospects/{prospect_id}/profiles/values`

This request returns a list of [profile values](#the-profile-value-object) of a [prospect](#the-prospect-object),
specified by its `prospect_id`. This is the request [`GET /{object}/{object_id}/profiles/values`](#retrieve-a-list-of-profile-values), 
where the object is "prospects", and whose id is `prospect_id`.






### List all Profile Field Values on a Prospect
> See the [profiles section](#list-profile-values) for a sample request

`GET /prospects/profiles/values`

This request returns a list of all [profile field values](#the-profile-value-object) on [prospects](#the-prospect-object). 
This is the request [`GET /{object}/profiles/values`](#list-profile-values), where the object is "prospects".






### List Prospect Profile Fields
> See the [profiles section](#retrieve-a-list-of-profile-fields) for a sample request)

`GET /prospects/profiles/fields`

This request returns a list of [profile fields](#the-profile-field-object) available for [prospects](#the-prospect-object). 
This is the request [`GET /{object}/profiles/fields`](#retrieve-a-list-of-profile-fields) where the object is "prospects".







### Update a Profile Field Value on a Prospect
> See the [profiles section](#update-a-profile-value-link) for a sample request  

`PUT /prospects/{prospect_id}/profiles/values/{profile_value_id}`


This request updates and returns a [profile value](#the-profile-value-object), specified by its `profile_value_id`, of a
particular [prospect](#the-prospect-object), specified by its `prospect_id`. This is the request 
[`PUT/{object}/{object_id}/profiles/values/{profile_value_id}`](#update-a-profile-value-link) where the object is
"prospects", and whose id is the `prospect_id`.







### Set a Profile Field Value on a Prospect
> See the [profiles section](#create-a-profile-value-link) for a sample request

`PUT|POST /prospects/{prospect_id}/profiles/fields/{profile_field_id}`

This request sets and returns a [profile value](#the-profile-value-object) for a profile field, specified by its
`profile_field_id`, for a [prospect](#the-prospect-object), specified by its `prospect_id`. This is the request 
[`POST/{object}/{object_id}/profiles/fields/{profile_field_id}`](#update-a-profile-value-link) where the object is
"prospects", and whose value is `prospects_id`.







### List Prospect Extension Fields
> See the [extension section](#retrieve-a-list-of-extension-fields) for an example   

`GET /prospects/extensions/fields`

This request returns a list of [extension fields](#the-extension-field-object) available for any [prospect](#the-prospect-object). 
This is the request [`GET/{object}/extensions/fields`](#retrieve-a-list-of-extension-fields), where the object is "prospects".







### List a Prospect's Extension Field Values
> See the [extension section](#retrieve-a-list-of-extension-field-values) for an example    

`GET /prospects/{prospect_id}/extensions/values`

This request returns a list of [extension values](#the-extension-value-object) for a [prospect](#the-prospect-object),
specified by its `prospect_id`. This is the request [`GET /{object}/{object_id}/extensions/values`](#retrieve-a-list-of-extension-field-values), 
where the object is "prospects", and whose id is `prospect_id`.





### List all Extension Field Values on Prospects
> See the [extension section](#list-extension-values) for an example

`GET /prospects/extensions/values`

This request returns a list of [extension field values](#the-extension-value-object) on [prospects](#the-prospect-object).
This is the request [`GET /{object}/extensions/values`](#list-profile-values), where the object is "prospects".






### Update an Extension Field Value on a Prospect
> See the [extension section](#update-an-extension-value) for an example    

`PUT /prospects/{prospect_id}/extensions/values/{extension_value_id}`

This request updates the value of an [extension field value](#the-extension-value-object), specified by its
`extension_value_id`, of a [prospect](#the-prospect-object), specified by its `prospect_id`. This is the request 
[`PUT{object}/{object_id}/extensions/values/{extension_value_id}`](#update-an-extension-value), where the object is
"prospect", and whose id is `prospect_id`







### Set an Extension Field Value on a Prospect
> Sample Request:  

`POST /prospects/{prospect_id}/extensions/fields/{extension_field_id}`

This request sets and returns the value of an extension field, specified by its `extension_field_id`, of a [prospect
](#the-prospect-object), specified by its `prospect_id`. This request is the request 
[`POST/{object}/{object_id}/extensions/fields/{extension_field_id}`](#create-an-extension-value) where our object is
"prospects" whose id is `prospect_id`.







### List Available Progressions on a Prospect
> See the [progressions section](#retrieve-a-list-of-available-progressions) for a sample request

`GET /prospects/{prospect_id}/progressions`

This request returns a list of available [progressions](#the-progression-object) for a [prospect](#the-prospect-object),
specified by its `prospect_id`. This is the request [`GET /{object}/{object_id}/progressions`](#retrieve-a-list-of-available-progressions) 
where the object is "prospects" whose id is `prospect_id`.







### Auto Run a Progression on a Prospect
> See the [progressions section](#run-a-status-update-using-a-given-progression) for a sample request

`PUT|POST /prospects/{prospect_id}/progressions/{progression_id}/auto`

This request uses the given progression, specified by its `progression_id` to progress a [prospect](#the-prospect-object), 
specified by its `prospect_id`. This is the request
[`[POST|PUT]/{object}/{object_id}/progressions/{progression_id}/auto`](#run-a-status-update-using-a-given-progression)
where the object is "prospect" whose id is `prospect_id`.







### List a Prospect's Resource Collections
> Sample Request:  

`GET /prospects/{prospect_id}/collections`

This request returns a list of [resource collections](#resources-attachments) against an [prospect](#the-prospect-object), 
specified by its `prospect_id`. This is the request [`GET /{object}/{object_id}/collections`](#retrieve-an-array-of-collections-for-an-object) 
where the object is "prospects" and hose id is `{prospect_id}`.







### Upload a Resource (Attachment) to a Collection on a Prospect
> Sample Request:  

`POST /prospects/{prospect_id}/collections/{collection_id}/resources`

This request uploads a [resource](#resources-attachments) to a collection, specified by its `collection_id`, of an
[prospect](#the-prospect-object) specified by its `prospect_id`. This is the request 
[`POST/{object}/{object_id}/collections/{collection_id}/resources`](#upload-a-resource-to-a-collection-of-an-object) where the
object is "prospects" whose id is `{prospect_id}`.
