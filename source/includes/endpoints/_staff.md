## Staff
> Resource URI:  
`/api/v0/staff`

Staff (or users) are the users registered on the Accelo deployment. They are the company's Accelo users, admins, professionals, and collaborators

### The Staff Object
The staff object contains the following

| Field | Type | Description |
|:-|:-|:-|
| **id** | string | A unique identifier for the staff member. |
| **firstname** | string | The staff member's first name. |
| **surname** | string | The staff member's surname. |
| financial_level | select | Either "none", "time", or "all", the staff member's financial permission level. |
| title | string | A title for the member, for example "Mr", "Ms". |
| email | string | The staff member's email address. |
| mobile | string | The staff member's mobile number. |
| phone | string | The staff member's phone number. |
| fax | string | The staff member's fax number. |
| position | string | The staff member's position in the company. |
| username | string | The staff member's username on the deployment. |
| timezone | string | The staff member's timezone. |







### Get Staff
> Sample Request:   

```http
GET /api/v0/staff/{staff_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/staff/{staff_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /staff/{staff_id}`

This requests returns a [staff member](#the-staff-object), specified by their `staff_id`.

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [staff object](#the-staff-object) using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response
The response is the single [staff object](#the-staff-object) with its default fields and any additional fields requested through `_fields`.







### Get Current Staff
> Sample Request:   

```http
GET /api/v0/staff/whoami HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/staff/whoami \
  -H 'authorization: Bearer {access_token}'
```

`GET /staff/whoami`

This request returns the [staff object](#the-staff-object) for the current staff member. It can be configured and handled in the same way as [`GET /staff/{staff_id}`](#get-staff).







### List Staff
> Sample Request:   

```http
GET /api/v0/staff HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/staff \
  -H 'authorization: Bearer {access_token}'
```

`GET /staff`

This request returns a list of [staff members](#the-staff-object) on the deployment.

#### Configuring the Response

##### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [staff object](#the-staff-object) using the [`_fields`](#configuring-the-response-fields).

##### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name |
|:-|
| id |
| email |
| standing |
| username |

##### Range Filters
This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name |
|:-|
| id |
| rate |

#### Handling the Response
The response will be a list of [staff objects](#the-staff-object) with their default fields and any additional fields requested through `_fields`, displayed according to any pagination parameters or filters used.







### Count Staff
> Sample Request:   

```http
GET /api/v0/staff/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/staff/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /staff/count`

This request will return a count of staff in a list defined by any available searches or filters. With no searches or filters this will be a count of all staff on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of staff members listed. |







### Update a Staff Member
> Sample Request:   

```http
PUT /api/v0/staff/{staff_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/staff/{staff_id} \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`PUT /staff/{staff_id}`

This request updates and returns a [staff member](#the-staff-object), identified by their `staff_id`.

#### Configuring the Staff
The following fields from the [staff object](#the-staff-object) may be updated with this Sample Request:

| Field Name |
|:-|
| firstname |
| surname |
| title |
| email |
| fax |
| phone |
| mobile |
| position |

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [staff object](#the-staff-object) using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response
The response will be the update [staff object](#the-staff-object) with its default fields and any additional fields requested through `_fields`.







### Create a Staff Member
> Sample Request:   

```http
POST /api/v0/staff HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/staff \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`POST /staff`

This request creates and returns a new [staff member](#the-staff-object).

#### Configuring the Staff
The following fields from the [staff object](#the-staff-object) may be set through this Sample Request:

| Field Name | Notes |
|:-|:-|
| **username** ||
| **password** | A password for the new staff member on the deployment. |
| firstname ||
| suranme ||
| title ||
| email ||
| fax ||
| phone ||
| mobile ||
| position ||

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [staff object](#the-staff-object) using the `_fields` parameter.

#### Handling the Response
The response will be the single, updated [staff object](#the-staff-object) with its default fields and any additional fields requested through `_fields`.







### Delete a Staff Member
> Sample Request:   

```http
DELETE /api/v0/staff HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/staff \
  -H 'authorization: Bearer {access_token}'
```

`DELETE /staff/{staff_id}`

This request removes a [staff member](#the-staff-object) from the deployment, identified by their `staff_id`. This request takes no parameters and returns no resources.







### List Profile Fields
> See the [profiles section](#retrieve-a-list-of-profile-fields) for a sample request  

`GET /staff/profiles/fields`

This request returns a list of [profile fields](#the-profile-field-object) available for any [staff object](#the-staff-object). This is the request [`GET /{object}/profiles/fields`](#retrieve-a-list-of-profile-fields) where the object is "staff".







### List Profile Field Values
> See the [profiles section](#retrieve-a-list-of-profile-values) for a sample request

`GET /staff/{staff_id}/profiles/values`

This request returns a list of [profile values](#the-profile-value-object) of a [staff object](#the-staff-object), specified by its `staff_id`. This is the request [`GET /{object}/{object_id}/profiles/values`](#retrieve-a-list-of-profile-values), where the object is "staff", and whose id is `staff_id`.







### Update a Profile Field Value
> See the [profiles section](#update-a-profile-value-link) for a sample request  

`PUT /staff/{staff_id}/profiles/fields/{profile_value_id}`


This request updates and returns a [profile value](#the-profile-value-object), specified by its `profile_value_id`, of a particular [staff object](#the-staff-object), specified by its `staff_id`. This is the request [`PUT /{object}/{object_id}/profiles/values/{profile_value_id}`](#update-a-profile-value-link) where the object is "staff", and whose id is the `staff_id`.







### Set a Profile Field Value
> See the [profiles section](#create-a-profile-value-link) for a sample request 

`PUT|POST /staff/{staff_id}/profiles/fields/{profile_field_id}`

This request sets and returns a [profile value](#the-profile-value-object) for a profile field, specified by its `profile_field_id`, for a [staff object](#the-staff-object), specified by its `staff_id`. This is the request [`POST /{object}/{object_id}/profiles/fields/{profile_field_id}`](#update-a-profile-value-link) where the object is "staff", and whose value is `staff_id`.
