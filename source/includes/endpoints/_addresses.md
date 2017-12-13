# Addresses
> Resource URI:    
`/api/v0/adddresses`

The Addresses endpoint stores the address information of companies and contacts on the Accelo deployment.

## The Address Object
> Sample address object:

```json
{
    "postal": "yes",
    "short": "San Francisco, 94107, CA, United States",
    "zipcode": "94107",
    "title": "US Headquarters",
    "full": "880 Harrison St., San Francisco, 94107, CA, United States",
    "id": "17",
    "city": "San Francisco",
    "state": "15",
    "country": "2",
    "physical": "yes",
    "street1": "880 Harrison St.",
    "street2": "Suite 302"
}
```

The address object contains the following:

| Name | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The address' unique identifier. |
| **full** | string | The full address, including street, city, state and country. For example "880 Harrison St., San Francisco, 94107, CA, United States". |
| title | string | A custom name given to the address. For example "US Headquarters". |
| street1 | string | The first line of the street address. For example "880 Harrison St." |
| street2 | string | The second line of the street address. For example "Suite 302". |
| city | string | The city of the address. For example "San Francisco". |
| zipcode | string | The zipcode of the address. For example 94107. |
| state | unsigned or object | The [state](#the-state-object) the address is located in. |
| country | unsigned or object | The [country](#the-country-object) the address is located. |
| postal | string | This will be either "yes" or "no", if this address is a postal address or not.|
| physical | string | This will be either "yes" or "no", if this address is a physical address of not. |


### The Country Object
> JSON country object for the USA:

```json
{
  "id": "2",
  "title": "United States",
  "prefix": "1",
  "suffix": "us",
  "postcode_name": "Zipcode",
  "state_name": "State",
  "state_required": "1",
  "postcode_required": "1"
}
```

> JSON country object for Australia:

```json
{  
  "title": "Australia",
  "postcode_required": "1",
  "suffix": "au",
  "state_required": "1",
  "state_name": "State",
  "prefix": "61",
  "postcode_name": "Postcode",
  "id": "1"
}
```

This object contains the details of a country. It is made up of the following fields:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The country's unique identifier. |
| **title** | string | The full name of the country.  |
| prefix | string | The country's international calling prefix.  |
| suffix | string | A short abbreviation for the country. |
| postcode_name | string | A string representing how the things we Australians call "postcodes" are referred to in the country.|
| state_name | string | A string representing how the things us Australians call "states" are referred to in the country.|
| state_required | boolean | Whether a state needs to be specified for addresses in this country. |
| postcode_required | boolean | Whether a postcode needs to be specified for addresses in this country. |

### The State Object
> JSON object for NSW, Australia:

```json
{
  "id": "1",
  "title": "New South Wales",
  "abbreviation": "NSW",
  "country_id": "1",
  "ordering": "0",
  "timezone": "Australia/Sydney"
}
```

> JSON object for California, USA

```json
{
  "title": "California",
  "timezone": "America/Los_Angeles",
  "country_id": "2",
  "ordering": "5",
  "abbreviation": "CA",
  "id": "15"
}
```

This object contains the details of a state within a given country. It is made up of the following fields:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The state's unique identifier within its country. For example for NSW "1", for California "15". |
| **title** | string | The full name of the state. For example "New South Wales", "California". |
| **abbreviation** | string | A short abbreviation of the state's name. For example "NSW", "CA". |
| country_id | unsinged | The unique identifier of the country to which the state belongs. For example "1", "2" |
| ordering | unsigned | The state's order as displayed on the Accelo deployment. |
| timezone | string | The name of the timezeone the state obeys. For example "Australia/Sydney", "Europe/London". |

### Postal and Physical Addresses
An address in Accelo may be physical or postal or both. For example, a company may have an office that is both a physical and postal address, but also have a post office box that is only a postal address.

### The Address Object

> Example JSON of full address object:

```json
{
  "physical": "yes",
  "street1": "880 Harrison St.",
  "country": "2",
  "full": "880 Harrison St., San Francisco, 94107, CA, United States",
  "city": "San Francisco",
  "postal": "yes",
  "short": "San Francisco, 94107, CA, United States",
  "state": "15",
  "street2": "Suite 302",
  "title": "US Headquarters",
  "zipcode": "94107",
  "id": "17"
}
```








## Get Address
> Sample Request:    

```http
GET api/v0/addresses/1 HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded

_fields=country(),state
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/addresses/{address_id} \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d '_fields=country(),state'
```

`GET /addresses/{address_id}`

> Sample response:

```json
 "response" :
    {
       "country" : {
          "title" : "Australia",
          "id" : "1"
       },
       "id" : "1",
       "full" : "6/221 Crown St, Wollongong, 2500, NSW, Australia",
       "state" : "1"
    },
 "meta" : {
    "status" : "ok",
    "message" : "Everything executed as expected."
 }
```

This request will return the address identified by its `address_id`.

### Configuring the Response
This request supports requesting additional fields and linked objects from the [address object](#the-address-object) through the [`_fields`](#configuring-the-response-fields) parameter.

### Handling the Response
The response will be a single address object containing the default fields and any other fields included via the `_fields` parameter.









## List Addresses
> Sample request:

```http
GET /api/v0/addresses HTTP/1.1
Host: {deployment}.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/addresses \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded'
```

`GET /addresses`

This request returns a list of addresses on the Accelo deployment.

<a name="get-addresses-configuring-the-response"></a>
### Configuring the Response

#### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters.

#### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following  fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| against_type ||
| against_id ||
| physical ||
| postal ||
| country_id ||
| state_id ||
| zipcode | Filter over the postcode field. |

#### Range Filters
This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name |
|:-|
| id |
| against_id |

#### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| title |
| suffix |
| prefix |

### Handling the Response
The response will be a list of [addresses](#the-address-object) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters or filters used.








## Count Addresses
> Sample request:

```http
GET /api/v0/addresses/count HTTP/1.1
Host: {deployment}.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/addresses/count
  -H 'authorization: Bearer {access_token}'
```

`GET /addresses/count`

This request will return a count of addresses in a list defined by any available searches or filters. With no searches or filters this will be a count of all address on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the addresses listed. |






## List Addresses Against an Object
> Sample request:


```http
GET /api/v0/{object}/{object_id}/addresses HTTP/1.1
Host: {deployment}.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get
  https://{deployment}.api.accelo.com/api/v0/{object}/{object_id}/addresses \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded'
```

`GET /{object}/{object_id}/addresses`


This request returns all addresses against the object of type `{object}` and unique identifier `{object_id}`. This request supports the following object types:

1. [Company](#companies)
2. [Contacts](#contacts)

For example, the request `GET /companies/39/addresses` would return all addresses registered with the company with id 39.

### Configuring the Response
This request may be configured as [`GET /addresses`](#list-addresses)

### Handling the Response
The response will be a list of addresses against the identified object with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters or filters used.







## Update an Address
`PUT /addresses/{address_id}`

```http
PUT /api/v0/addresses/{address_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded

country_id=Australia
state=NSW
street1=221 Crown St
city=Wollongong
postcode=2500
physical=yes
```

```shell
curl -X put
  https://{deployment}.api.accelo.com/api/v0/addresses/{address_id} \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded'
  -d 'country_id=Australia'
  -d 'state=NSW'
  -d 'street1=221 Crown St'
  -d 'city=Wollongong'
  -d 'postcode=2500'
  -d 'physical=yes'
```

This request updates and returns an [address](#the-address-object) on the Accelo deployment specified by its unique `{address_id}`.

### Configuring the Address
The following fields may be updated through this request:

| Field | Notes |
|:-|:-|
| state | The name of the state of province. |
| state_id | The unique identifier of the state of province. This **must** point to a valid state, if you do not know the `state_id` please use the `state` parameter.
| country | The name of the country. |
| country_id | The unique identifier of the country. This **must** point to a valid country, if you do not know the `country_id` please use the `country` parameter. |
| title ||
| street1 ||
| street2 ||
| city ||
| zipcode/postcode ||
| postal ||
| physical ||

### Configuring the Response
This request supports requesting additional fields and linked objects from the [address object](#the-address-object) using the [`_fields`](#configuring-the-response-fields) parameter.

### Handling the Response
The response will be the single updated address object with its default fields and any fields added through the `_fields` parameter.







<a name="post-addresses"></a>
## Create an Address
> Sample request:

```http
POST /api/v0/addresses HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X post
  https://{deployment}.api.accelo.com/api/v0/addresses \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded'
```

`POST /addresses`

This request will create a new address and return it.

### Configuring the Address
The address may be configured in the same manner as [`PUT /addresses/{address_id}`](#update-an-address), with the addition of the following fields:

| Field | Type | Description |
|:-|:-|:-|
| **against_type** | string | The type of object the address is against, must be a [company](#companies) or [contact](#contacts). |
| **against_id** | unsigned | The unique identifier of the object the address is against. |
| overwrite | boolean | Whether to overwrite the address if the address to be created already exists. |

### Configuring the Response
This request supports requesting additional fields and linked objects from the [address object](#the-address-object) using the [`_fields`](#configuring-the-response-fields) parameter.

### Handling the Response
The response will be the single updated address object with its default fields and any fields added through the `_fields` parameter.








## Create an Address Against an Object
> Sample request:

```http
POST /api/v0/{object}/{object_id}/addresses HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X post
  https://{deployment}.api.accelo.com/api/v0/{object}/{object_id}/addresses \
  -H 'authorization: Bearer {access_token}' \
  -H 'content_type: application/x-www-form-urlencoded'
```

`POST /{object}/{object_id}/addresses`

This request performs the same action as [POST /addresses](#post-addresses), this request however does not require the fields `against_type` and `against_id`.
