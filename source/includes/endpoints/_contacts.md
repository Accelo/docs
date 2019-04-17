## Contacts
> Resource URI:  
`/api/v0/contacts`

Contacts are the Accelo entries for individual people. Contact entries Provide a central location where you can view all
correspondence involving them. A contact is not directly associated with a company but it is with an affiliation. To
create a contact against a given company, you should first create the contact and then the affiliation for the new
contact against the company.


### The Contact Object

The contact object contains the following fields and linked objects:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The unique identifier for the contact. |
| **firstname** | string | The contact's first name. |
| **surname** | string | The contact's surname. |
| **mobile** | string | The contact's mobile number. __Deprecated__ please use the [affiliation object](#the-affiliation-object) to store and lookup contact information of a contact. |
| **email** | string | The contact's email address. __Deprecated__ as for "mobile". |
| username | string | The contact's Accelo username. |
| middlename | string | The contact's middle name. |
| title | string | The contact's preferred title. For example "Ms", "Mr", "Dr". |
| timezone | string | The contact's timezone. |
| date_created | unix ts | The date the contact was added on the Accelo deployment. |
| date_modified | unix ts | The date the contact was last modified. |
| date_last_interacted | unix ts | The most recent date of interaction with the contact. |
| comments | string | Any comments or notes made against the contact. |
| default_affiliation | unsigned | The unique identifier of the default [affiliation](#affiliations) associated with the contact. |
| status | unsigned or object | The [status](#statuses) of the contact. |
| standing | string | The contact's standing, this is part of the status object. For example "active", "potential". |







### Get Contact
> Sample Request:  

```http
GET /api/v0/contacts/{contact_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contacts/{contact_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /contacts`

This request returns a single contact, identified by their `contact_id`.


#### Configuring the Request

This request supports requesting additional fields and linked objects from the [contact object](#the-contact-object)
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will contain a single contact object with its default fields, and any additional fields requested through
`_fields`.







### List Contacts
> Sample Request:

```http
GET /api/v0/contacts/ HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contacts/ \
  -H 'authorization: Bearer {access_token}'
```


`GET /contacts`

This request returns a list of contacts on the Accelo deployment.

#### Configuring the Response

##### Pagination

This request supports all of the [pagination](#configuring-the-response-pagination) parameters.


##### Additional Fields and Linked Objects

This request supports requesting any extra fields or linked objects from the [contacts object](#the-contact-object)
object via the [`_fields`](#configuring-the-response-fields) parameter.


##### Basic Filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Field | Notes |
|:-|:-|
| id | |
| email | |
| title | |
| standing | |
| affiliation | Filter by the `default_affiliation_id`. |
| status | |
| username | |
| contact_number | Filter over `phone`, `fax`, and `mobile`. |

##### Date Filters

This request supports [date filters](#filters-date-filters) over the following fields:

| Field |
|:-|
| date_created |
| date_modified |
| date_last_interacted |


#### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| fullname |
| firstname |
| username |
| surname |
| title |
| contact_status_id |
| standing |
| date_modified |
| date_created |
| date_last_interacted |

#### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Field | Notes |
|:-|:-|
| id | |
| status | |
| country | Filter by the `country_id` of the default affiliation of the contact. |


#### Searching

This request supports the use of the [`_search`](#configuring-the-response-searching) parameter over the following fields:

| Field | Notes |
|:-|:-|
| firstname | |
| surname | |
| email | |


#### Handling the Response

This request will return a list of contacts containing their default fields and any additional field requested by
`_fields`, and displayed according to any pagination parameters, filters or searches used.







### Count Contacts
> Sample Request:  

```http
GET /api/v0/contacts/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contacts/count \
  -H 'authorization: Bearer {access_token}'
```


`GET /contacts/count`

This request will return a count of contacts in a list defined by any available searches or filters. With no searches or
filters this will be a count of all contacts on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the listed contacts. |







### List Recent Contacts
> Sample Request:  

```http
GET /api/v0/contacts/recent HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contacts/recent \
  -H 'authorization: Bearer {access_token}'
```

`GET /contacts/recent`

Equivalent request:  

`GET /contacts?_filters=order_by_desc(date_created)`

This request returns a list of [contacts](#the-contact-object) on the Accelo deployment sorted by the most recently
created, that is, in descending order of the their `date_created`.


#### Configuring the Response

This request accepts the same parameters and filters as [`GET /contacts`](#list-contacts), although it will always be
ordered in descending order of `date_created`.


#### Handling the Response

This request will return a list of contacts displayed according to any parameters used, and with their default fields
plus and additional fields requested by `_fields`, and sorted in descending order of `date_created`.







### List Recently Modified Contacts
> Sample Request:  

```http
GET /api/v0/contacts/newest HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contacts/newest \
  -H 'authorization: Bearer {access_token}'
```

`GET /contacts/newest`

Equivalent request:  

`GET /contacts?_filters=order_by_desc(date_created)`

This request returns a list of [contacts](#the-contact-object) on the Accelo deployment sorted by most recently
modified, that is, in descending order of `date_modified`.


#### Configuring the Request

This request accepts the same parameters and filters as [`GET /contacts`](#list-contacts), although it will always be
ordered in descending order of `date_modified`.


#### Handling the Response

This request will return a list of contacts displayed according to any parameters used, and with their default fields
plus and additional fields requested by `_fields`, and sorted in descending order of `date_modified`.







### Update a Contact
> Sample Request:  

```http
PUT /api/v0/contacts/{contact_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contacts/{contact_id} \
  -H 'authorization: Bearer {access_token}'
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`PUT /contacts/{contact_id}`

This request updates and returns a [contact](#the-contact-object) in the Accelo deployment, identified by its
`contact_id`. Recall that [affiliations](#affiliations) hold contact information (address, phone numbers etc.) for a
contact, so if you wish to update these fields, or do not see the field you are after here, you may need to look at the
[affiliation object](#the-affiliation-object).

#### Configuring the Contact

This request allows updating the following fields in the [contact object](#the-contact-object):

| Field | Type | Notes |
|:-|:-|:-|
| firstname | string | |
| middlename | string | |
| surname | string | |
| username | string | The contact's new username, this must be a unique username, otherwise an invalid request will be returned. |
| password | string | The contact's new password for the Accelo deployment. This field is write only. |
| title | string | |
| comments | string | |
| status | unsigned | Must point to a valid `status_id`, otherwise an invalid request will be returned. |
| standing | string | Please only send one of `status` or `standing`, it both are sent the `standing` of the linked [status object](#statuses) will dominate anything sent through this field. |


#### Configuring the Response

This request supports requesting additional fields and linked objects through the [`_fields`](#configuring-the-response-fields) 
parameter.


#### Handling the Response

The response will be the single, updated contact object, with its default fields and any additional fields requested
through `_fields`.







### Create a Contact
> Sample Request:

```http
POST /api/v0/contacts/ HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contacts/ \
  -H 'authorization: Bearer {access_token}'
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`POST /contacts`

This request adds a new contact to the Accelo deployment and returns it. This is a sort of hybrid request, as it also
creates an [affiliation](#affiliations) to associate the contact with a company.


#### Configuring the Contact

This request accepts all fields from  the [`PUT \contacts`](#update-a-contact) request, with the `firstname` and
`surname` fields being required, as well as the following fields from the [affiliation object](#affiliations-fields-and-linked-objects):

| Field | Type | Notes |
|:-|:-|:-|
| **company_id** | unsigned | Must point to a valid company. This is the company the new affiliated contact will be associated with. |
| country_id | unsigned | Must point to a valid country |
| physical_address_id | unsigned | Must point to a valid address. |
| postal_address_id | unsigned | Must point to a valid address. |
| phone | string | The contact's phone number in their role in the associated company. For example, their work number. |
| fax | string | As for `phone` but a fax number. |
| email | string | As for `phone` but an email address. Must be a valid email address. |
| position | string | The contact's position in the associated company. |
| communication | string | As in the [affiliation object](#affiliations-fields-and-linked-objects) |
| invoice_method | string | As in the [affiliation object](#affiliations-fields-and-linked-objects) |


#### Configuring the Response

This request supports requesting additional fields and linked resources from the [contact object](#the-contact-object)
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

This request will return the single new contact, with its default fields and any additional fields requested through
`_fields`







### Deactivate a Contact
> Sample Request:  

```http
DELETE /api/v0/contacts/{contact_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contacts/{contact_id} \
  -H 'authorization: Bearer {access_token}'
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`DELETE /contacts/{contact_id}`

Equivalent request:  

`PUT /contact/{contact_id}?standing=inactive`

This request sets a contact on the Accelo deployment, identified by its `contact_id`, to `inactive`. This request does
**NOT** delete the contact, a user can only be removed from the web deployment, see the [support
documentation](https://www.accelo.com/resources/help/guides/user/modules/companies-and-contacts/deactivate-delete-a
-company-contact/#HowtoDeleteContact) for information. This request accepts no parameters and only returns the meta
object.







### List Addresses Against a Contact
> Sample Request:  

```http
PUT /api/v0/contacts/{contact_id}/addresses HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contacts/{contact_id}/addresses \
  -H 'authorization: Bearer {access_token}'
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`GET /contacts/{contact_id}/addresses`

This is simply the [`GET /{object}/{object_id}/addresses`](#list-addresses-against-an-object) request, where `{object}`
is company and `{object_id}` is the `{company_id}`.






### Create an Address Against a Contact
> Sample Request (TODO):

`POST /contacts/{contacts_id}/addresses`

This request creates and returns an [address](#addresses) against a [contact](#the-contact-object) specified by its
`contact_id`. This is the request [`POST /{object}/{object_id}/addresses`](create-an-address-against-an-object) where
the object is "addresses" whose id is `{contact_id}`.






### Get Contact Status
> Sample Request:  

`GET /contacts/{contact_id}/status`

This request returns the [status](#statuses) of a contact on the Accelo deployment, identified by their `contact_id`.


#### Configuring the Request

This request supports requesting additional fields and linked objects from the [status](#statuses) using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

This request returns a single status with its default fields and any additional fields requested through `_fields`.






### List Contact Segmentations
> Sample Request:  

`GET /contacts/{contact_id}/segmentations`

This request returns a list of [segmentations](#the-segmentation-object) for a [contact](#the-contact-object) specified
by its `contact_id`. This request supports no parameters and returns a list of segmentations.






### List a Contact's Profile Field Values
> See the [profiles section](#retrieve-a-list-of-profile-values) for a sample request

`GET /contacts/{contact_id}/profiles/values`

This request returns a list of [profile values](#the-profile-value-object) of a [contact](#the-contact-object),
specified by its `contact_id`. This is the request [`GET /{object}/{object_id}/profiles/values`](#retrieve-a-list-of-profile-values), 
where the object is "contacts", and whose id is `contact_id`.





### List all Profile Field Values on a Contact
> See the [profiles section](#list-profile-values) for a sample request

`GET /contacts/profiles/values`

This request returns a list of all [profile field values](#the-profile-value-object) on [contacts](#the-contact-object). 
This is the request [`GET /{object}/profiles/values`](#list-profile-values), where the object is "contacts".





### List Contact Profile Fields
> See the [profiles section](#retrieve-a-list-of-profile-fields) for general usage.

`GET /contacts/profiles/fields`

This request returns a list of [profile fields](#the-profile-field-object) available for [contacts](#the-contact-object).






### Update a Profile Field Value on a Contact
> See the [profiles section](#update-a-profile-value-link) for general usage.

`PUT /contacts/{contact_id}/profiles/values/{profile_value_id}`

This request updates and returns a [profile value](#the-profile-value-object), specified by its `profile_value_id`, of a
particular contact, specified by its `contact_id`.





### Set a Contact's Profile Field Value
> See the [profiles section](#create-a-profile-value-link) for a sample request

`POST /contacts/{contact_id}/profiles/fields/{profile_field_id}`

This request sets and returns a [profile value](#the-profile-value-object) for a profile field, specified by its
`profile_field_id`, for a [contact](#the-contact-object), specified by its `contact_id`. This is the request 
[`POST/{object}/{object_id}/profiles/fields/{profile_field_id}`](#update-a-profile-value-link) where the object is "contacts",
and whose value is `contact_id`.







### List Available Progressions on a Contact
> See the [progressions section](#retrieve-a-list-of-available-progressions) for a sample request

`GET /contacts/{contact_id}/progressions`

This request returns a list of available [progressions](#the-progression-object) for a [contact](#the-contact-object),
specified by its `contact_id`. This is the request [`GET /{object}/{object_id}/progressions`](#retrieve-a-list-of-available-progressions) 
where the object is "contacts" whose id is `contact_id`.







### Auto Run a Progression on a Contact
> See the [progressions section](#run-a-status-update-using-a-given-progression) for a sample request

`PUT|POST /contacts/{contact_id}/progressions/{progression_id}/auto`

This request uses the given progression, specified by its `progression_id` to progress a [contact](#the-contact-object),
specified by its `contact_id`. This is the request 
[`[POST|PUT]/{object}/{object_id}/progressions/{progression_id}/auto`](#run-a-status-update-using-a-given-progression) where the
object is "contact" whose id is `contact_id`.







### List a Contact's Resource Collections
> See the [resources (attachments) section](#retrieve-an-array-of-collections-for-an-object) for an example

`GET /contacts/{contact_id}/collections`

This request returns a list of [collections](#resources-attachments) against a [contact](#the-contact-object), specified
by its `contact_id`. This is the request [`GET /{object}/{object_id}/collections`](#retrieve-an-array-of-collections-for-an-object) 
where the object is "contacts" and whose id is `{contact_id}`.







### Upload a Resource (Attachment) to a Collection on a Contact
> See the [resources (attachments) section](#upload-a-resource-to-a-collection-of-an-object) for an example  

`POST /contacts/{contact_id}/collections/{collection_id}/resources`

This request uploads a [resource](#resources-attachments) to a collection, specified by its `collection_id`, of a
[contact](#the-contact-object) specified by its `contact_id`. This it the request 
[`POST/{object}/{object_id}/collections/{collection_id}/resources`](#upload-a-resource-to-a-collection-of-an-object) where the
object is "contacts" and whose id is `{contact_id}`.
