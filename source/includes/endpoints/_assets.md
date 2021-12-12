## Assets
> Endpoint URI:  
`/api/v0/assets`

Assets are flexible objects within Accelo, they can represent almost any asset or object you want. For example, you may
wish to store information on the computers owned by your company, or the prices of advertising media offered by external
companies. For more information see the [support documentation](https://www.accelo.com/resources/help/guides/user/modules/assets/).

### The Asset Object
The asset object contains the following:

> Sample JSON asset:

```json
{
  "address": "14",
  "against_id": "39",
  "asset_type_id": "2",
  "manager_id": "14",
  "id": "2",
  "affiliation": "98",
  "asset_type": "2",
  "title": "Latest Laptop",
  "date_created": "1492651877",
  "manager": "14",
  "affiliation_id": "98",
  "standing": "inactive",
  "against_type": "company",
  "address_id": "14"
}
```

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The unique identifier for the asset. |
| **title** | string | The name given to the asset. |
| **latest_asset_link** | object | The most recent [asset link](#the-asset-link) made on the asset. |
| standing | string | The standing of the asset, see the [status object](#statuses) for more information. |
| date_created | unix ts | The date the asset was created. |
| against_type | string | A string representing the object the endpoint is against. |
| against_id | unsigned | The unique identifier of the object the asset is created against. |
| asset_type | unsigned or object | The [type](#the-asset-type) of the asset. Asset types can be created and edited from your Accelo deployment, see the [assets module page](https://www.accelo.com/resources/help/guides/user/modules/assets/) for more information. |
| asset_type_id | unsigned | The unique identifier given to this asset type. |
| affiliation | unsigned or object | The [affiliation](#affiliations) associated with the asset (if any). |
| affiliation_id | unsigned | The unique identifier of the affiliation associated with the asset. |
| manager | unsigned or object | The [staff](#staff) assigned to manage the asset (if any). |
| manager_id | unsigned | The unique identifier of the staff assigned to manage the asset. |
| address | unsigned or object | The physical [address](#addresses) associated with this asset (if any). |
| address_id | unsigned | The unique identifier of the physical address assigned to the asset.  |

#### The Asset Link
> Sample JSON asset link:

```json
{
  "linked_object_type": "job",
  "asset_link_id": 1,
  "linked_object_title": "#2215 Client web upgrade",
  "asset_id": 2,
  "linked_object_id": 2215,
  "description": "Laptop will be used on this remote project!",
  "linked_object_breadcrumbs": [
      {
          "title": "MonnDesigns",
          "id": "88213",
          "table": "company"
      }
  ]
}
```

An asset may be linked to an [issue](#issues), [job](#jobs-projects), [prospect](#prospects-sales), or
[contract](#contracts). If an asset is linked to an object, the link is described by the `asset_link` object. This
contains the following:

| Field | Type | Description |
|:-|:-|:-|
| asset_id | unsigned | The unique identifier for the asset linked. |
| linked_object_id  | unsigned | The unique identifier of the object the asset is linked to. |
| linked_object_title | string | The name of the object the asset is linked to. |
| linked_object_type  | string | The type of object the asset is linked to. |
| asset_link_id | unsigned | the unique identifier of the asset link. |
| linked_object_breadcrumbs | array | An array of [breadcrumbs](#configuring-the-response-breadcrumbs) associated with the linked object. |
| description | string | (optional) A description of the asset's link to the object. |
| start_date | unix ts | (optional) The date the asset link was started. |
| end_date | unix ts | (optional) The date the asset link was ended. |

If any of the fields labeled optional above are empty, they will not be displayed.


#### The Asset Type

> Sample JSON asset type:

```json
{
  "ordering": "0",
  "has_affiliation": "1",
  "has_manager": "1",
  "title": "Server",
  "has_address": "1",
  "id": "2",
  "standing": "active",
  "object_link_fields": {}
}
```

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the asset type. |
| **title** | string | The title of the asset type. |
| **object_link_fields** | hash | A hash of [asset object link fields](#asset-object-link-fields). |
| standing | string | The standing of the asset type. |
| has_manager | binary | Whether the asset type has a manger assigned to it. |
| has_affiliation | binary | Whether the asset type has an affiliation assigned to it. |
| has_address | binary | Whether the asset type has an address assigned to it. |
| ordering  | unsigned | An integer representing the asset type's ordering on the deployment. |

#### Asset Object Link Fields
> Sample json object link fields object:

```json
  "object_link_fields": {
      "contract": {
          "include_end_date": 0,
          "include_start_date": 0,
          "include_description": 1
      },
      "prospect": {
          "include_end_date": 0,
          "include_description": 1,
          "include_start_date": 0
      },
      "issue": {
          "include_end_date": 0,
          "include_description": 1,
          "include_start_date": 0
      },
      "job": {
          "include_start_date": 1,
          "include_description": 1,
          "include_end_date": 1
      }
  }
```

These contain information on the properties of assets of a given type linked to a given object. The object contains a
hash of each of the object types an asset can be linked to, [issues](#issues), [jobs](#jobs-projects), [prospects](#prospects-sales), 
and [contracts](#contracts). Each of these hashes contain the following fields:

| Field | Type | Description |
|:-|:-|:-|
| include_description | bool | Whether [asset links](#the-asset-link) for assets of this type have a description. |
| include_start_date | bool | Whether [asset links](#the-asset-link) for assets of this type have a start date. |
| include_end_date | bool | Whether [asset links](#the-asset-link) for assets of this type have an end date. |





### Get Asset
```http
GET /assets/{asset_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/assets/{asset_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /assets/{asset_id}`

This request will return a single asset, specified by its unique identifier.


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [asset object](#the-asset-object) using
the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).


#### Handling the Response

The response will contain the single asset object with its default fields and any others included via the `_fields` parameter.






### List Assets
> Sample Request:  

```http
GET /assets/ HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/assets \
  -H 'authorization: Bearer {access_token}'
```

`GET /assets`

This request will return a list of assets on the Accelo deployment.

#### Configuring the Response


##### Pagination

This request supports all of the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects from the [asset object](#the-asset-object) using
the [`_fields`](#configuring-the-response-fields) parameter. This request also supports 
[breadcrumbs](#configuring-the-response-breadcrumbs).


##### Basic Filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name |
|:-|
| id |
| standing |
| type_id |
| affiliation_id |
| manager_id |
| address_id |
| against_type |
| against_id |


##### Date Filters

This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| date_created |


##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| date_created |
| standing |


##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name |
|:-|
| id |
| standing |
| type_id |
| affiliation_id |
| manager_id |
| address_id |


##### Object Filters

This request supports the following [object filters](#filters-object-filters):

| Filter Name | Notes |
|:-|:-|
| against | Filter by assets against these objects. |


##### Searching

This supports the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Filter Name |
|:-|
| title |


#### Handling the Response

The response will be a list of [asset objects](#the-asset-object) with their default fields and any additional fields
requested through `_fields`, and displayed according to any pagination parameters, filters or searches used.






### Count Assets
> Sample Request:  

```http
GET /assets/count HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/assets/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /assets/count`

This request will return a count of assets in a list defined by any available searches or filters. With no searches or
filters this will be a count of all assets on the deployment. This request does not return a response object, just a
single value:

| Field | Type | Description |
|:-|:-|:-|
| **response** | unsigned int | A count of the assets listed. |






### Get Asset Type
> Sample request:

```http
GET /assets/types/{type_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization Bearer {access_token}
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/assets/types/{type_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /assets/types/{type_id}`

This request returns a single [asset type](#the-asset-type) specified by its `type_id`.

#### Configuring the Response

This request supports requesting additional fields and linked objects from the [asset type object](#the-asset-type)
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will be the single asset type with its default fields and any additional fields requested through `_fields`.





### List Asset Types
> Sample request:

```http
GET /assets/types HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization Bearer {access_token}
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/assets/types \
  -H 'authorization: Bearer {access_token}'
```

`GET /assets/types`

This request returns a list of [asset types](#the-asset-type).

#### Configuring the Response

##### Pagination 

This request supports all the [pagination](#configuring-the-response-pagination) parameters.


##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects from the [asset type](#the-asset-type) using
the [`_fields`](#configuring-the-response-fields) parameter.


##### Basic Filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Field Name |
|:-|
| id |
| standing |


##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| standing |
| title |


##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name |
|:-|
| id |


##### Searching

This request supports the use of the [`_search`](#configuring-the-response-searching) parameter to search over the
following fields:

| Field Name |
|:-|
| title |


#### Handling the Response

The response will be a list of asset types with their default fields and any additional fields requested through
`_fields`, and displayed according to any pagination parameters, filters or searches used.





### List Asset Links

> Sample request:

```http
GET /api/v0/assets/links HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/assets/links \
  -H 'authorization: Bearer {access_token}`
```

This request returns an array of [asset links](#the-asset-link) and an array of the linked [assets](#the-asset-object).


#### Configuring the Response

Any additional parameters requested will be applied to the returned asset links.


##### Pagination 

This request supports all the [pagination parameters](#configuring-the-response-pagination).


##### Additional Fields and Linked Objects

All fields of the asset link object are displayed by default. 


##### Basic Filters

This request supports the following [basic filters](#filters-basic-filters):

| Filter |
|:-|
| asset_link_id |
| asset_id |


##### Object Filters

This request supports [object filters](#filters-object-filters) over the following objects:

| Object |
|:-|
| linked_object |


##### Date Filters

This request supports the following [date filters](#filters-date-filters):

| Filter |
|:-|
| date_start |
| date_end |


##### Order Filters

This request supports the following [order filters](#filters-order-filters):

| Filter |
|:-|
| asset_link_id |
| date_start |
| date_end |


##### Range Filters

This request supports the following [range filters](#filters-range-filters):

| Filter |
|:-|
| asset_link_id |


#### Handling the Response

The response will contain an array, "assets", of [asset](#the-asset-object) with their default fields with the removal
of the `latest_asset_link` field, and the addition of the `breadcrumbs` field. The response will also contain an array,
"asset_links" of [asset links](#the-asset-link) with all their fields, and displayed according to any pagination
parameters or filters used.





### Create Asset Link
> Sample Request:

```http
POST /api/v0/asset/{asset_id}/links
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X POST \
  https://{deployment}.api.accelo.com/api/v0/assets/{asset_id}/links \
  -H 'authorization: Bearer {access_token}
```

`POST /assets/{asset_id}/links`

`POST /assets/links`

This request creates and returns an [asset link](#the-asset-link) between an [asset](#the-asset-object) and an object
from one of the supported types.

#### Configuring the Link
The following parameters may be sent to set the fields in the asset link:

| Parameter | Type | Notes |
|:-|:-|:-|
| **asset_id** | unsigned | Only to be sent if no `asset_id` was sent as part of the URL |
| **linked_object_id** | unsigned | The unique identifier of the object the asset is to be linked to. |
| **linked_object_type** | string | The type of object the asset is to be linked to. Should be one of the supported objects listed for [asset links](#the-asset-link). |
| Description | string | |
| end_date | unix ts | |
| start_date | unix ts | |


#### Handling the Response
The response will be the newly created [asset link](#the-asset-link).






### Delete Asset Link

> Sample Request:

```http
DELETE /api/v0/assets/link/{link_id}
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -x DELETE \
  https://{deployment}.api.accelo.com/api/v0/assets/links/{asset_link_id} \
  -H 'authorization: Bearer {access_token}
```

`DELETE /assets/links/{asset_link}`

This request deletes an asset link (and not the asset) specified by its `asset_link_id`. This request takes no
parameters and returns no resources.





### Update an Asset

> Sample request:

```http
PUT /api/v0/assets/{asset_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X PUT \
  https://{deployment}.api.accelo.com/api/v0/assets/{asset_id} \
  -H 'authorization: Bearer {access_token}' \
```

`PUT/assets/{asset_id}`

This request updates and returns an [asset](#the-asset-object), specified by its `asset_id`


#### Configuring the Asset

The following fields from the [asset object](#the-asset-object) may be updated with this request:

| Field | Notes |
|:-|:-|
| title |  |


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [asset](#the-asset-object) through the
[`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will be the single, updated [asset](#the-asset-object) with its default fields and any additional fields requested through `_fields`





### List Asset Extension Fields
> See the [extension section](#retrieve-a-list-of-extension-fields) for an example    

`GET /assets/extensions/fields`

This request returns a list of [extension fields](#the-extension-field-object) available for any [asset](#the-asset-object). 
This is the request [`GET/{object}/extensions/fields`](#retrieve-a-list-of-extension-fields), where the object is "assets".







### List an Asset's Extension Field Values
> See the [extension section](#retrieve-a-list-of-extension-field-values) for an example     

`GET /assets/{asset_id}/extensions/values`

This request returns a list of [extension values](#the-extension-value-object) for an [asset](#the-asset-object),
specified by its `asset_id`. This is the request 
[`GET /{object}/{object_id}/extensions/values`](#retrieve-a-list-of-extension-field-values), where the object is "assets", 
and whose id is `asset_id`.





### List all Extension Field Values on Assets
> See the [extension section](#list-extension-values) for an example

`GET /assets/extensions/values`

This request returns a list of [extension field values](#the-extension-value-object) on [assets](#the-asset-object) This
is the request [`GET /{object}/extensions/values`](#list-extension-values), where the object is "assets".






### Update an Extension Field Value on an Asset
> See the [extension section](#update-an-extension-value) for an example     

`PUT /assets/{asset_id}/extensions/values/{extension_value_id}`

This request updates the value of an [extension field value](#the-extension-value-object), specified by its
`extension_value_id`, of an [asset](#the-asset-object), specified by its `asset_id`. This is the request 
[`PUT{object}/{object_id}/extensions/values/{extension_value_id}`](#update-an-extension-value), where the object is "asset",
and whose id is `asset_id`







### Set an Extension Field Value on an Asset
> See the [extension section](#create-an-extension-value) for an example

`POST /assets/{asset_id}/extensions/fields/{extension_field_id}`

This request sets and returns the value of an extension field, specified by its `extension_field_id`, of an [asset
](#the-asset-object), specified by its `asset_id`. This request is the request 
[`POST/{object}/{object_id}/extensions/fields/{extension_field_id}`](#create-an-extension-value) where our object is "assets"
whose id is `asset_id`.
