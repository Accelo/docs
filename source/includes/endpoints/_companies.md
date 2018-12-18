## Companies
> Resource URI:
`/api/v0/companies`

Companies are the entries in Accelo to note the companies with whom you interact. These can range from partners and
vendors to your actual customers, and can even include you! These Client entries also act as the central repository for
all information related to that group, including correspondence, project and sales updates, and contact information for
their employees. See the [support documentation](https://www.accelo.com/resources/help/guides/user/modules/companies-
and-contacts/) for more information on accessing and using companies on your deployment.

### The Company Object
> Example company object:

```json
{
  "date_modified": "1495671183",
  "phone": "61448824724",
  "status": "3",
  "name": "A Fresh New Company",
  "id": "45",
  "date_last_interacted": "1495675655",
  "comments": "This is a fresh new company",
  "date_created": "1495669367",
  "staff_bookmarked": "0",
  "standing": "active",
  "default_affiliation": "12",
  "postal_address": "31",
  "fax": null,
  "website": "www.example.com"
}
```


| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The company's unique identifier. |
| **name** | string | The name of the company. |
| custom_id | string | The custom id for the company. |
| website | string | The company's website. |
| phone | string | A contact phone number for the company. |
| fax | string | A fax number for the company. |
| date_created | unix ts | The date the company was created on the Accelo deployment. |
| date_modified | unix  ts | The date the company was last modified on the Accelo deployment. |
| date_last_interacted | unix ts | The date the company was last modified on the Accelo deployment. |
| comments | string | Any comments or notes made against the company. |
| standing | string | The standing of the company, from its status. |
| status | unsigned or object | The company's [status](#statuses). |
| postal_address | unsigned or object | The postal [address](#addresses) of the company. |
| staff_bookmarked | bool | Whether the company has been bookmarked by the current user. |
| default_affiliation | unsigned | The `affiliation_id`  of the main [affiliation](#affiliations) associated with this company. |


#### The Manager Object
> Example manager object with default fields:

```json
{
  "surname": "Hughes",
  "id": "14",
  "relationship_id": "28",
  "firstname": "Matthew"
}
```

A company may be managed by a [staff member](#staff), this management relationship is described by the manager object,
which contains the fields of a staff object, with the following addition:

| Field | Type | Description |
|:-|:-|:-|
| relationship_id | unsigned | A unique identifier for the relationship between the company and manager.


#### The Segmentation Object
> Example segmentation:

```json
{
  "value": "Small (5-14 staff)",
  "title": "Size",
  "values": [
    "Small (5-14 staff)"
  ],
  "id": "2"
}
```

Segmentations, or categories, are fields to group companies, contacts, and affiliations. For example, some segmentations
for a company may be:

| Segmentation | Description |
|:-|:-|
| Industry | Which industry does the company operate in. |
| Size | Roughly, how many staff does the company have. |
| Source | How did this company become known to us. |

Segmentations may be managed through your Accelo deployment, see the [support
documentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/modules/companies-and-
contacts/categories/) for information. A `segmentation` contains the following fields:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The unique identifier for this segmentation. |
| **title** | string | The title for this segmentation. For example "Industry" or "size"|
| **value** | string | The value(s) for this segmentation, separated by commas. For example "transport,utilities". |
| **values** | array | An array of the values for this segmentation.|







### Get Company
> Sample Request:  

```http
GET /api/v0/companies/{company_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/companies/{company_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /companies/{company_id}`

This request returns a single company from the Accelo deployment, identified by its `company_id`.


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [company object](#the-company-object)


#### Handling the Response

The response will contain a company object with its default fields and any additional fields requested via the `_fields`
parameter.







### List Companies
> Sample Request:  

```http
GET /api/v0/companies HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/companies/ \
  -H 'authorization: Bearer {access_token}'
```

`GET /companies`  

This request returns a list of [companies](#the-company-object) from the Accelo deployment.


#### Configuring the Response


##### Pagination

This request supports all of the [pagination](#configuring-the-response-pagination) parameters.


##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects from the [company object](#the-company-object)
using the `_fields` parameter.


##### Basic Filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| status | Filter over the `status_id`. |
| standing ||
| default_affiliation | Filter over the `affiliation_id` of the default affiliation. |
| postal_address | Filter over the `postal_address_id`. |
| manager_id | Filter by the `staff_id` of the [staff](#staff) set as manager of the company. |
| contact_number | Filter over `phone` and `fax`. |
| custom_id | Filter over the `custom_id`. |



##### Date Filters

This request [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| date_created |
| date_modified |


##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| date_created ||
| date_modified ||
| date_last_interacted ||
| name ||
| standing ||
| status | Order by the `status_id`. |
| custom_id ||


##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| date_created ||
| date_modified ||
| name |
| standing ||
| status | Range over the `status_id`.|
| custom_id ||


##### Searching

This request supports the [`_searching`](#configuring-the-response-searching) parameter to search over the following
fields:

| Field Name | Notes |
|:-|:-|
| website ||
| name ||
| phone ||
| fax ||


#### Handling the Response

The response will be a list of [company objects](#the-company-object) with their default fields and any additional
fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.







### Count Companies
> Sample Request:    

```http
GET /api/v0/companies/count HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/companies/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /companies/count`

This request will return a count of companies in a list defined by any available searches or filters. With no searches
or filters this will be a count of all companies on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned int | A count of the companies listed. |







### List Recent Companies
> Sample Request:  

```http
GET /api/v0/companies/recent HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/companies/recent \
  -H 'authorization: Bearer {access_token}'
```

`GET /companies/recent`

Equivalent request:  

`GET /companies?_filters=order_by_desc(date_created)`

```http
GET /api/v0/companies/recent HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

This request returns the most recently created companies on the Accelo deployment. This request is equivalent to
requesting all companies and ordering in descending order of `date_created`.


#### Configuring the Response

This request accepts the same parameters and filters as [`GET /companies`](#list-companies), although it will always be
ordered in descending order of `date_created`


#### Handling the Response

This request will return a list of [company objects](#the-company-object) with their default fields and any additional
fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.







### List Latest Modified Companies
> Sample Request:  

```http
GET /api/v0/companies/newest HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/companies/newest \
  -H 'authorization: Bearer {access_token}'
```

`GET /companies/newest`

Equivalent Request:

`GET /companies?_filters=order_by_desc(date_modified)`

```http
GET /api/v0/companies/newest HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

This request returns the most recently changed companies on the Accelo deployment. This request is equivalent to
requesting all companies and ordering in descending order of `date_modified`.


#### Configuring the Response

This request accepts the same parameters and filters as [`GET /companies`](#list-companies), although it will always be
ordered in descending order of `date_modified`


#### Handling the Response

This request will return a list of [company objects](#the-company-object) with their default fields and any additional
fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.







### Get Company Status
> Sample Request:  


```http
GET /api/v0/companies/{company_id}/status HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/companies/{company_id}/status \
  -H 'authorization: Bearer {access_token}'
```

`GET /companies/{company_id}/status`

This request returns the [status](#statuses) of a [company](#the-company-object) identified by its `company_id`.


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [status object](#statuses) using the
[`_fields`](#configuring-the-response-fields) parameter.


#### Handling The Response

The response will be a single status object with its default fields and any additional fields requested via `_fields`.






### Get Company Statuses
> Sample Request:  


```http
GET /api/v0/companies/statuses HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/companies/statuses \
  -H 'authorization: Bearer {access_token}'
```

`GET /companies/statuses`

This request returns the possible [statuses](#statuses) that[companies](#the-company-object) can have.


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [status object](#statuses) using the
[`_fields`](#configuring-the-response-fields) parameter.


#### Handling The Response

The response will be an array of status objects with its default fields and any additional fields requested via `_fields`.







### Get Main Contact
> Sample Request:  

```http
GET /api/v0/companies/{company_id}/contact HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/{company_id}/contact \
  -H 'authorization: Bearer {access_token}'
```

`GET /companies/{company_id}/contact`

This request returns the main [contact](#contacts) of a company identified by its `{company_id}`. This is the contact
associated with the company's `default_affiliation`.


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [contact object](#contacts) using the
[`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response 

The response will be a single [contact](#contact) with its default fields and any other additional fields requested via
`_fields`.







### List Contacts Against a Company
> Sample Request:  

```http
GET /api/v0/companies/{company_id}/contacts HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```


```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/{company_id}/contacts \
  -H 'authorization: Bearer {access_token}'
```

`GET /companies/{company_id}/contacts`

This request returns a list of [contacts](#contacts) for a company identified by its `{company_id}`.


#### Configuring the Response

This request may be configured and handled as per [`GET /contacts`](#list-contacts)







### Count Contacts on a Company
> Sample Request:  

```http
GET /api/v0/companies/{company_id}/contacts/count HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```


```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/{company_id}/contacts/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /companies/{company_id}/contacts/count`

This request returns a count of a list of contacts associated with a company specified by its `{company_id}`. With no
searches or filters this will be a count of all contacts associated with  the company. This request returns a single
field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned int | A count of the contacts listed against the company |







### List Managers
> Sample Request:  

```http
GET /api/v0/companies/{company_id}/managers HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```


```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/{company_id}/managers \
  -H 'authorization: Bearer {access_token}'
```

`GET /companies/{company_id}/managers`

This request returns a list of [managers](#the-manager-object) of a company specified by its `company_id`.


#### Configuring the Response

This request may be configured and handled a per [`GET /staff`](#list-staff)







### List Segmentations
> Sample Request:   

```http
GET /api/v0/companies/{company_id}/segmentations HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```


```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/{company_id}/segmentations \
  -H 'authorization: Bearer {access_token}'
```

`GET /companies/{company_id}/segmentations`

```http
GET /api/v0/companies/{company_id}/segmentations HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

This request returns a list of [segmentations](#the-segmentation-object) for a company identified by its `company_id`.
This request takes no parameters and returns a list of segmentations.

> Sample response:  

```json
{
  "meta": {
    "status": "ok",
    "more_info": "https://affinitylive.jira.com/wiki/display/APIS/Status+Codes#ok",
    "message": "Everything executed as expected."
  },
  "response": [
    {
      "title": "Industry",
      "values": [
        "Transport"
      ],
      "id": "1",
      "value": "Transport"
    },
    {
      "id": "2",
      "value": "Small (5-14 staff)",
      "values": [
        "Small (5-14 staff)"
      ],
      "title": "Size"
    }
  ]
}
```







### Update a Company
> Example request:

```http
PUT /api/v0/companies/{company_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded

comments=This%20is%20a%20fresh%20new%20company
_fields=comments
```

```shell
curl -X put \
  https://{deployment}.api.accelo.com/api/v0/companies/{company_id} \
  -H 'authorization: Bearer {acces_token}' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'comments=This%20is%20a%20fresh%20new%20company' \
  -d '_fields=comments'
```

`PUT /companies/{company_id}`

This request updates and returns a [company](#the-company-object) identified by its `company_id`.


#### Configuring the Company

The following fields from the [company object](#the-company-object) may be updated through this request:

| Field |
|:-|
| website |
| phone |
| fax |
| comments |
| name |


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [company object](#the-company-object)
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

This request returns the single updated company object, with its default fields and any additional fields requesting
through `_fields`.







### Create a Company

> Sample request:  

```http
POST /api/v0/companies/{company_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded

website=www.example.com
name=A%20Fresh%20New%20Company
standing=active
profile.12=09-17
```

```shell
curl -X post \
  https://{deployment}.api.accelo.com/api/v0/companies \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'website=www.example.com' \
  -d 'name=A%20Fresh%20New%20Company' \
  -d 'standing=active' \
  -d 'profile.12=09-17'
```

`POST /companies`

This request creates a new company on the Accelo deployment, and returns it.


#### Configuring the Company

Values for the following fields from the [company object](#the-company-object) may be sent with this request:

| Field | Notes |
|:-|:-|
| **name** | |
| parent_id | |
| status_id | |
| standing | If you also send a `status_id`, this will be overwritten by the `standing` of  the `status` linked. |
| website | |
| phone | |
| fax | |
| comments | |


##### Setting Profile Field Values

[Profile field values](#profiles) may be set when you create a company, for a given profile value identified by
[`profile_value_id` you may update it through the field "profile.{`profile_value_id`}".


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [company object](#the-company-object)
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

This request returns the created company object, with its default fields and any additional fields requesting through
`_fields`.







### Add a Manager
> Sample Request:  

```http
POST /api/v0/companies/{company_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded

manager_id=14
```

```shell
curl -X post \
  https://{deployment}.api.accelo.com/api/v0/companies \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'manager_id=14'
```

`POST /companies/{company_id}/managers/add`

This request adds a [manager](#the-manager-object), identified by their unique `staff_id`, as a manager to a company,
identified by its unique `company_id`. The request returns a list of managers of this company on the Accelo deployment.


#### Configuring the Manager

The following fields may be sent with this request:

| Field | Type | Description |
|:-|:-|:-|
| **manager_id** | unsigned | The `staff_id` of the staff member to be set as the manager of the company. |
| nature | select | Nature of the new relationship. Must be "professional","confidential" or "private". Defaults to "professional", see the [support documentation](https://www.accelo.com/resources/help/guides/user/modules/companies-and-contacts/managers-and-relationships/#PrivateRelationships) for more information on manager relationships. |


#### Configuring the Response

This response may be configured and handled in the same way as [`GET /companies/{company_id}/managers`](#list-managers).






### Remove a Company
> Sample Request:  

```http
DELETE /api/v0/companies/{company_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/companies/{company_id} \
  -H 'authorization: Bearer {access_token}'
```

`DELETE /companies/{company_id}`

This request will remove a company, specified by its `company_id`, from the Accelo deployment. This request takes no
parameters and returns no resource.








### Remove a Manager
> Sample Request:  

```http
DELETE /api/v0/companies/{company_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded

relationship=23
```

```shell
curl -X post \
  https://{deployment}.api.accelo.com/api/v0/companies \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'relationship_id=23'
```

`DELETE /companies/{company_id}/managers/delete`

This request returns a staff member, identified via the `relationship_id` of their manager object, from the role of
manager of a company, identified by its `company_id`. The `manager_id` is not used to identify the manager as a manager
can have multiple relationships with the same company. Hence this request takes a single parameter:

| Parameter | Description |
|:-|:-|
| **relationship_id** | The `relationship_id` of the manager to be removed. |


#### Handling the Response

This response returns a list of manager (staff members) for the given company.







### List a Company's Profile Field Values
> See the [profiles section](#retrieve-a-list-of-profile-values) for a sample request

`GET /companies/{company_id}/profiles/values`

This request returns a list of [profile field values](#the-profile-value-object) of a [company](#the-company-object),
specified by its `company_id`. This is the request [`GET /{object}/{object_id}/profiles/values`](#retrieve-a-list-of-profile-values), 
where the object is "companies" and whose id is `{company_id}`.






### List all Profile Field Values on a Company
> See the [profiles section](#list-profile-values) for a sample request

`GET /companies/profiles/values`

This request returns a list of all [profile field values](#the-profile-value-object) on [companies](#the-company-object). 
This is the request [`GET /{object}/profiles/values`](#list-profile-values), where the object is "companies".






### List Company Profile Fields
> See the [profiles section](#retrieve-a-list-of-profile-fields) for a sample request

`GET /companies/profiles/fields`

This request returns a list of [profile fields](#the-profile-field-object) available for [companies](#the-company-object). 
This is the request [`GET /{object}/profiles/fields`](#retrieve-a-list-of-profile-fields) where the object is "companies".






### Update a Profile Field Value on a Company
> See the [profiles section](#update-a-profile-value-link) for a sample request

`PUT /companies/{company_id}/profiles/values/{profile_value_id}`

This request updates and returns a [profile field value](#the-profile-value-object), specified by its `profile_value_id`
of a particular [company](#the-company-object), identified by its `company_id`. This is the request
[`PUT/{object}/{object_id}/profiles/values/{profile_value_id}`](#update-a-profile-value-link) where the object is
"company", and whose id is `{company_id}`.







### Set a Profile Field Value on a Company
> See the [profiles section](#create-a-profile-value-link) for a sample request

`POST /companies/{company_id}/profiles/{profile_field_id}`

This request sets and returns a [profile value](#the-profile-value-object) for a [profile field](#the-profile-field-object), 
specified by its `profile_field_id`, for a [company](#the-company-object), specified by its `company_id`. This
is the request [`POST /{object}/{object_id}/profiles/fields/{profile_field_id}`](#update-a-profile-value-link) where is
object is "companies" and whose id is `{company_id}`







### List Available Progressions on a Company
> See the [progressions section](#retrieve-a-list-of-available-progressions) for a sample request

`GET /companies/{company_id}/progressions`

This request returns a list of available [progressions](#progressions) for a [company](#the-company-object) identified
by its `company_id`. This is the request [`GET /{object}/{object_id}/progressions`](#retrieve-a-list-of-available-progressions) 
where the object is "companies" whose id is `{company_id}`







### Auto Run a Progression on a Company
> See the [progressions section](#run-a-status-update-using-a-given-progression) for a sample request

`[PUT|POST] /companies/{company_id}/progressions/{progression_id}/auto`


This request uses the given [progression](#progressions), specified by its `progression_id` to progress the status of a
[company](#the-company-object), specified by its `company_id`. This is the request
[`[PUT|POST]/{object}/{object_id}/progressions/{progression_id/auto}`](#run-a-status-update-using-a-given-progression)
where the object is "companies" whose id is `{company_id}`.








### List Addresses against a Company
> Sample Request:  

`GET /companies/{company_id}/addresses`

This request returns a list of [addresses](#addresses) associated with a [company](#the-company-object), specified by
its `company_id`. This is the request [`GET /{object}/{object_id}/addresses`](#list-addresses) where the object is
"companies" and whose id is `{company_id}`.







### Create an Address against a Company
> Sample Request:

`POST /companies/{company_id}/addresses`

This request creates a [address](#addresses) against a [company](#the-company-object), specified by its `company_id`.
This is the request [`POST /{object}/{object_id}/addresses`](#create-an-address-against-an-object) where the object is
"companies" and whose id is `{company_id}`.







### List a Company's Resource Collections
> See the [resources (attachments) section](#retrieve-an-array-of-collections-for-an-object) for an example

`GET /companies/{company_id}/collections`

This request returns a list of [collections](#resources) against a [company](#the-company-object), specified by its
`company_id`. This is the request [`GET /{object}/{object_id}/collections`](#retrieve-an-array-of-collections-for-an-object) 
where the object is "companies" and whose id is `{company_id}`.







### Upload a Resource (Attachment) to a Collection on a Company
> See the [resources (attachments) section](#upload-a-resource-to-a-collection-of-an-object) for an example

`POST /companies/{company_id}/collections/{collection_id}/resources`

This request uploads a [resource](#resources) to a collection, specified by its `collection_id`, of a [company](#the-company-object) 
specified by its `company_id`. This it the request
[`POST/{object}/{object_id}/collections/{collection_id}/resources`](#upload-a-resource-to-a-collection-of-an-object)
where the object is "companies" and whose id is `{company_id}`.
