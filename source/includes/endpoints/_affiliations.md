## Affiliations
> Resources URI:  
`/api/v0/affiliations`

Affiliations map the connections between contacts and companies; an affiliation contains the information on a single
contact's link to a company.

They are necessary because one contact may be linked to a company in more than one way, and also a contact may be linked
to two or more companies. An affiliation contains the contact object, the company object, as well as contact details for
the contact in that particular role.

For example we may have a contact who works as an engineer for one company (imaginatively, call it company A), and an
advisor for another company (company B). Then there will be two affiliation objects, both with the same contact object,
however, one will have the company object of Company A, and the other of Company B. Furthermore, the contact information
(mobile, email etc.) for each affiliation may be different, one will hold the contact information for an engineer
working at Company A, the other for an advisor working at Company B.

### The Affiliation Object
> Sample affiliation JSON object:

```json
{  
  "staff_bookmarked": "0",
  "company": "40",
  "physical_address": "33",
  "position": "CEO",
  "date_modified": "1489507383",
  "postal_address": "33",
  "standing": "active",
  "date_last_interacted": "1489453228",
  "mobile": "(682)401-6327",
  "fax": "",
  "email": "joe@example.com",
  "contact": "95",
  "phone": "12345678",
  "affiliation_status": "0",
  "id": "99",
  "portal_access": "1"
}
```

The Affiliation object contains the following:

| Name | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The unique identifier for the affiliation. |
| **mobile** | string | The mobile number of the contact in the role of this affiliation. |
| **email** | string | The email address of the contact in the role of this affiliation. |
| fax | string | The fax number of the contact in the role of this affiliation. |
| position | string | The contact's position in the company. For example "CEO", "Software Engineer", "Advisor". |
| phone | string | The phone number of the contact in the role of this affiliation. |
| postal_address | unsigned or object | The postal [address](#addresses) of the contact in the role of this affiliation. |
| physical_address | unsigned or object | The physical [address](#addresses) of the contact in the role of this affiliation. |
| company | unsigned or object | The [company](#companies) that the contact is affiliated with. |
| contact | unsigned or object | The [contact](#contacts) the affiliation is against. |
| affiliation_status | unsigned | The contact's [status](#statuses) in the role of this affiliation. |
| standing | string | The standing of the contact's status. See the [status object](#statuses). |
| date_modified | unix ts | The latest date that this affiliation was modified. |
| date_last_interacted | unix ts | The latest date that there was interaction with this affiliation. |
| staff_bookmarked | boolean| Whether the current user has bookmarked the affiliation. |
| portal_access | boolean | Whether the affiliation has been granted access to the Client Portal. |






### Get Affiliation
> Sample request:

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/affiliations/{affiliation_id} \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded'
```

```http
GET /api/v0/affiliation/{affiliation_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

`GET /affiliation/{affiliation_id}`

This request returns an affiliation specified by their unique id.


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [affiliation object](#the-affiliation-object) 
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

If successful, the response will be a single affiliation object containing the default fields and any additional fields
requested by `_fields`.






### List Affiliations
> Sample request:

```http
GET /api/v0/affiliation HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded

_fields=company(),position
_filters=date_modified_after(1494596024)
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/affiliations \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d '_fields=company(),position' \
  -d '_filters=date_modified_after(1494596024)'
```

`GET /affiliations`


This request returns a list of [affiliation objects](#the-affiliation-object) on the deployment.


#### Configuring the Response

##### Pagination

This request supports all of the [pagination](#configuring-the-response-pagination) parameters


##### Basic Filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| email ||
| standing ||
| status | Filter by the `status_id` of the affiliations. |
| postal_address | Filter by the `address_id` of the postal addresses of the affiliations. |
| physical_address | Filter by the `address_id` of the physical addresses of the affiliations. |
| company | Filter by the `company_id` of the affiliations. |
| contact | Filter by the `contact_id` of the affiliations. |
| contact_number | Filter over `phone`, `fax`, and `mobile`. |


##### Date Filters

This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| date_modified |


##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| status | Order by the `status_id` of the affiliations. |
| standing ||
| date_modified ||
| date_created ||
| date_last_interacted ||
| fullname | Order by the full name of the affiliation, that is "`firstname` `surname`". |


##### Range Filters

This request supports range filters over the following fields:

| Filter Name | Notes |
|:-|:-|
| id |
| country | Range over the `country_id` of the affiliations. |
| physical_address | Range over the `address_id` of the physical address of the affiliations. |
| postal_address | Range over the `address_id` of the postal address of the affiliations. |
| contact | Range over the `contact_id` of the affiliations. |
| status | Range over the `status_id` of the affiliations. |

> Sample response:

```json
"response": [
  {
    "id": "98",
    "company": {
      "name": "Planet Express",
      "id": "39"
    },
    "position": "CEO",
    "mobile": "",
    "email": "hfanrsworth@planetexpress.com"
  },
  {"..."}
]
```

##### Searching

This request supports the use of the [`_search`](#configuring-the-response-searching) parameter to search over the
following fields:

| Field Name | Notes |
|:-|:-|
| firstname |
| surname |
| fax |
| phone |
| mobile |
| email |


#### Handling the Response

The response will be a list of [affiliations](#the-affiliation-object) with their default fields and any additional
fields requested through `_fields`, and displayed according to any pagination parameters, filters or searches used.






### Count Affiliations
> Sample request:

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/affiliations/count \
  -H 'authorization: Bearer {access_token}'
```

```http
GET /api/v0/affiliations/count HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

`GET /affiliations/count`

This request will return a count of affiliations in a list defined by any available searches or filters. With no
searches or filters this will be a count of all affiliations on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned  | A count of the affiliations listed. |






### Get an Affiliation's Status
> Sample request:


```http
GET /api/v0/affiliations/{affiliation_id}/status HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/affiliations/{affiliation_id}/status \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded'
```

`GET /affiliations/{affiliation_id}/status`

This request returns the [status](#statuses) of an affiliation specified by its `affiliation_id`.

> Sample response:  

```json
"response": {
  "id": "1",
  "title": "Active"
}
```

#### Configuring the Response

This request supports requesting additional fields and linked objects from the [status object](#statuses) using the
[`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will be a [status object](#statuses) for the specified [affiliation](#the-affiliation-object) with its
default fields and any additional fields requested through `_fields`.





### Get Affiliation Status
> Sample Request:

```http
GET /api/v0/affiliations/statuses/{status_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/affiliations/statuses/{status_id} \
  -H 'authorization: Bearer {access_token}' \
```

`GET /affiliations/statuses/{status_id}`

This request returns the affiliation [status](#statuses) specified by its `status_id`.

#### Configuring the Response

This request supports requesting additional fields and linked objects from the [status object](#statuses) using the
[`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will be an affiliation [status object](#statuses) for the specified status with its default fields and any
additional fields requested through `_fields`.





### List Affiliation Statuses
> Sample Request:

```http
GET /api/v0/affiliations/statuses HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/affiliations/statuses/{status_id} \
  -H 'authorization: Bearer {access_token}' \
```

`GET /affiliations/statuses`

This request returns a list of affiliation [statuses](#statuses) on the deployment.


#### Configuring the Response

##### Pagination

This request supports the standard [pagination](#configuring-the-response-pagination) requests.


##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects from the affiliation [status object](#statuses) through
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







### Count Affiliation Statuses
> Sample Request:

```http
GET /api/v0/affiliations/statuses/count HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/affiliations/statuses/count \
  -H 'authorization: Bearer {access_token}' \
```

`GET /affiliations/statuses/count`

This request will return a count of affiliation statuses in a list defined by any available searches or filters. With no 
searches or filters this will be a count of all affiliation statuses on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the listed affiliation statuses. |





### Update an Affiliation
```http
PUT /api/v0/affiliations/{affiliation_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}

_fields=physical_address
physical_address_id=17
postal_address_id=17
```

```shell
curl -X put \
  https://{deployment}.api.accelo.com/api/v0/affiliations/{affiliation_id} \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d '_fields=physical_address' \
  -d 'physical_address_id=17' \
  -d 'postal_address_id=17'
```

`PUT /affiliation/{affiliation_id}`


This request will update and return an [affiliation](#the-affiliation-object) identified by its `affiliation_id`.


#### Configuring the Affiliation.

The following fields may be updated via this request.

| Field Name | Notes|
|:-|:-|:
| country_id | Must point to a valid country. |
| physical_address_id | Must point to a valid address. |
| postal_address_id | Must point to a valid address. |
| phone ||
| fax ||
| mobile ||
| email ||
| position ||
| status_id | Must point to a valid status. |
| standing ||
| communication | Must be "yes" or "no", whether or not communications, such as updates, newsletters etc. are sent to this affiliation. |
| invoice_method | e.g. "email", "fax" or "postal", the method by which invoices should be sent. |

> Sample response:

```json
"response":{
  "id": "22",
  "email": "joe@example.com",
  "mobile": "",
  "physical_address": {
    "id": "17",
    "full": "880 Harrison St., San Francisco, 94107, CA, United States"
  }  
}
```

#### Configuring the Response

This request supports requesting additional fields and linked objects from the [affiliation object](#the-affiliation-object) 
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will be the single updated [affiliation object](#the-affiliation-object), with its default fields and any
additional fields requested through `_fields`






### Create an Affiliation
```http
POST /api/v0/affiliations/ HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X post \
  https://{deployment}.api.accelo.com/api/v0/affiliations \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded' \
```

`POST /affiliations`

This request will create a new [affiliation](#the-affiliation-object) between a [company](#companies) and
[contact](#contacts) (to be specified in the request), and return it.


#### Configuring the Affiliation

This request supports setting the following fields:

| Field Name | Notes |
|:-|:-|
| **company_id** | Must point to a valid company. This is the company the new affiliation will point to. |
| **contact_id** | Must point to a valid contact. This is the contact the new affiliation will point to. |
| country_id | Must point to a valid country. |
| physical_address_id | Must point to a valid address. |
| postal_address_id | Must point to a valid address. |
| phone ||
| fax ||
| mobile ||
| email ||
| position ||
| status_id | Must point to a valid status. |
| standing ||
| communication | Must be "yes" or "no", whether or not communications, such as updates, newsletters etc. are sent to this affiliation, default "no".|
| invoice_method | e.g. "email", "fax" or "postal", the method by which invoices should be sent. |


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [affiliation object](#the-affiliation-object) 
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will be the single, new, [affiliation object](#the-affiliation-object), with its default fields and any
additional fields requested through `_fields`






### Delete an Affiliation
```http
DELETE /api/v0/affiliations/{affiliation_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X delete \
  https://{deployment}.api.accelo.com/api/v0/affiliations/{affiliation_id} \
  -H 'authorization: Bearer {access_token}'
```

`DELETE /affiliation/{affiliation_id}`

This request will delete the affiliation identified by its `affiliation_id`. This request takes no parameters and return
no resources.






### List an Affiliation's Profile Field Values
> See the [profiles section](#retrieve-a-list-of-profile-values) for a sample request

`GET /affiliations/{affiliation_id}/profiles/values`

This request returns a list of [profile field values](#the-profile-value-object) of an [affiliation](#the-affiliation-object), 
specified by its `affiliation_id`. This is the request 
[`GET/{object}/{object_id}/profiles/values`](#retrieve-a-list-of-profile-values), where the object is "affiliations" whose id
is `{affiliation_id}`.




### List Affiliation Profile Field Values
> See the [profiles section](#list-profile-values) for a sample request

`GET /affiliations/profiles/values`

This request returns a list of all [profile field values](#the-profile-value-object) on [affiliations](#the-affiliation-object). 
This is the request [`GET /{object}/profiles/values`](#list-profile-values), where the object is "affiliations".






### List Affiliation Profile Fields
> See the [profiles section](#retrieve-a-list-of-profile-fields) for a sample request  

`GET /affiliations/profiles/fields`

This request returns a list of [profile fields](#the-profile-field-object) available for [affiliations](#the-affiliation-object). 
This is the request [`GET /{object}/profiles/fields`](#retrieve-a-list-of-profile-fields) where the object is "affiliations".







### Update a Profile Field Value on an Affiliation
> See the [profiles section](#update-a-profile-value-link) for a sample request  

`PUT /affiliations/{affiliation_id}/profiles/values/{profile_value_id}`

This request updates and returns a [profile field value](#the-profile-value-object), specified by its `profile_value_id`
of a particular [affiliation](#the-affiliation-object), identified by its `affiliation_id`. This is the request 
[`PUT/{object}/{object_id}/profiles/values/{profile_value_id}`](#update-a-profile-value-link) where the object is
"affiliations", and whose id is `{affiliation_id}`.









### Set a Profile Field Value on an Affiliation
> See the [profiles section](#create-a-profile-value-link) for a sample request

`POST /affiliations/{affiliation_id}/profiles/fields/{profile_field_id}`

This request sets and returns a [profile value](#the-profile-value-object) for a [profile field](#the-profile-field-object), 
specified by its `profile_field_id`, for an [affiliation](#the-affiliation-object), specified by its `affiliation_id`. 
This is the request [`POST /{object}/{object_id}/profiles/fields/{profile_field_id}`](#create-a-profile-value) 
where is object is "affiliations" and whose id is `{affiliation_id}`









### List Available Progressions on an Affiliation
> See the [progressions section](#retrieve-a-list-of-available-progressions) for a sample request

`GET /affiliations/{affiliation_id}/progressions`

This request returns a list of available [progressions](#progressions) for an [affiliation](#the-affiliation-object)
identified by its `affiliation_id`. This is the request [`GET /{object}/{object_id}/progressions`](#retrieve-a-list-of-available-progressions) 
where the object is "affiliations" whose id is `{affiliation_id}`







### Auto Run a Progression on an Affiliation
> See the [progressions section](#run-a-status-update-using-a-given-progression) for a sample request

`[PUT | POST] /affiliations/{affiliation_id}/progressions/{progression_id}/auto`

This request uses the given [progression](#progressions), specified by its `progression_id` to progress the status of an
[affiliation](#the-affiliation-object), specified by its `affiliation_id`. This is the request 
[`[PUT|POST]/{object}/{object_id}/progressions/{progression_id/auto}`](#run-a-status-update-using-a-given-progression) where the
object is "affiliations" whose id is `{affiliation_id}`.
