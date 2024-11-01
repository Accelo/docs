## Profiles

Profile fields are objects used for tracking extra information from your Accelo deployment. See the [support
documentation](https://help.accelo.com/guides/settings-and-configuration-guide/triggers-and-business-processes/custom-fields/profile-fields/)
for further information about profile fields. Currently, custom profile fields are supported on the following objects:

* [Affiliations](#affiliations)
* [Companies](#companies)
* [Contacts](#contacts)
* [Contracts](#contracts)
* [Invoices](#invoices)
* [Issues](#issues)
* [Jobs](#jobs-projects)
* [Milestones](#milestones)
* [Prospects](#prospects-sales)
* [Staff](#staff)

### The Profile Field Object
> Example profile field:

```json
{  
  "link_type": "company",
  "required": "no",
  "parent_id": "0",
  "description": "These are the companies opening hours in the form \"HH-HH\", use 24h time.",
  "id": "12",
  "lookup_type": null,
  "confidential": "no",
  "field_name": "Opening Hours",
  "restrictions": "all",
  "field_type": "text",
  "exported": "no"
}
```

These are objects describing the custom fields on the deployment, they contain the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the profile field. |
| **field_name** | string | A name for the profile field. |
| **field_type** | select | The type of the profile field. This can be "text", "integer", "decimal", "date", "date_time", "currency", " lookup", "structure", "select", "multi_select", or "hyperlink". |
| parent_id | unsigned | The unique identifier of the parent profile field. If there is no parent this has a value of "0". |
| link_type | string | The  type of object this profile field is against. For example "contact". |
| required | select | Either "yes" or "no", whether this profile field is required for the object it is against. |
| restrictions | select | Who is able to edit the value of this field. May be one of "all", "edit", "process", "admin". For example, if set to "process", only users with "process" permission for custom fields will be able to edit this field. See the [support documentation](https://help.accelo.com/faq/how-do-i-set-up-user-permissions/) for information on setting permissions. |
| exported | select | Either "yes" or "no", whether this profile field will be included when you export the against object. |
| lookup_type | string | When `field_type` is "lookup", this will contain the lookup type, e.g. "company". |
| options | array | When `field_type` is either "select" or "multi_select" this will contain the possible values. |
| confidential | select | Either "yes" or "no", whether this is a confidential profile field. These are profile fields viewable only within confidential relationships, see the [support documentation](https://help.accelo.com/guides/user/modules/companies-and-contacts/managers-and-relationships/#Confidential) for more information. |
| description | string | A description of the profile field. |


### The Profile Value Object
> Example profile value object:

```json
{
  "value_type": null,
  "id": "128",
  "field_type": "multi_select",
  "value": "one, two",
  "values": ["one", "two"],
  "date_modified": "1495669367",
  "field_name": "Implementation Phases",
  "field_id": "12",
  "modified_by": "14",
  "link_type": "issues",
  "link_id": "45"
}
```

These are objects describing a value of a given [profile field](#the-profile-field-object), identified by the
`field_id`, they contain the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the profile field value. |
| **field_type** | string | The profile field type for this value, see the [profile field object](#the-profile-field-object) for possible values.|
| **field_name** | string | The name for the profile field. |
| **value_type** | string | For fields of type `lookup` this is the type of the lookup object. For example "company", "contact". Otherwise it is `null`. |
| **value** | dynamic | The value of the profile field. The type will change according to the `field_type`, for example if the field type is "date" this will be a unix ts. If it's a "multi_select" this will be all values joined by a comma. e.g, `"one, two"` for `["one", "two"]` |
| **values**<sup>*</sup> | array | When the field type is "multi_select", this will contain an array of the selected values. e.g, `["one", "two"]`|
| date_modified | unix ts | The date this profile field value was last modified. |
| modified_by | unsigned or object | The staff member who last modified this profile field value. |
| field_id | unsigned | The unique identifier of the profile field this value is for. |
| link_type | string | The object the profile value was created against. |
| link_id | unsigned | The unique identifier of the object the profile value is against. |

<sup>*</sup> The `values` field is _only_ returned when the `field_type` is "multi_select". 
When it's "multi_select", it's returned by default.



<a name="retrieve-a-list-of-profile-fields"></a>
### List Profile Fields
> Sample Request:  

```http
GET /api/v0/{issues}/profiles/fields HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/issues/profiles/fields \
  -H 'authorization: Bearer {access_token}'
```

`GET /{object}/profiles/fields`

This request returns a list of [profile fields](#the-profile-field-object) available for the given object.


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [profile field object](#the-profile-field-object) 
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

This response will be a list of [profile fields](#the-profile-field-object) with their default fields, and any
additional fields requested through `_fields`.






<a name="retrieve-a-list-of-profile-values"></a>
### List Object Profile Values
> Sample Request:  

```http
GET /api/v0/issues/{issue_id}/profiles/values HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/issues/{issue_id}/profiles/values \
  -H 'authorization: Bearer {access_token}'
```

`GET /{object}/{object_id}/profiles/values`

This request returns a list of [profile values](#the-profile-value-object) for the given `object` of identified by `object_id`.


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [profile value object](#the-profile-value-object) 
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

This response will be a list of [profile values](#the-profile-value-object) with their default fields, and any
additional fields requested through `_fields`.







### List Profile Values
> Sample Request:

```http
GET /api/v0/issues/profiles/values HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/issues/profiles/values \
  -H 'authorization: Bearer {access_token}'
```

`GET /{object}/profiles/values`

This request returns a list of [profile values](#the-profile-value-object) for the given `object`.


#### Configuring the Response

##### Pagination

This request supports all of the [pagination](#configuring-the-response-pagination) parameters


##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects from the [profile value object](#the-profile-value-object) 
using the [`_fields`](#configuring-the-response-fields) parameter.


### Basic Filter

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name |
|:-|
| unified |
| field_id |
| link_id |
| link_type |


### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| field_id |
| link_id |
| link_type |
| value_type |
| date_modified |


### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name |
|:-|
| field_id |
| link_id |


### Searching 

This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Filter Name |
|:-|
| title |






<a name="update-a-profile-value-link"></a>
### Update a Profile Value
> Example, a business has changed its opening hours:

```shell
curl -X put \
  https://{deployment}.api.accelo.com/api/v0/companies/{company_id}/profiles/values/128 \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'value=09-18'
```

`PUT /{object}/{object_id}/profiles/values/{profile_value_id}`

This request updates and returns a [profile value](#the-profile-value-object), specified by its `profile_value_id`, of a
particular object, specified by its `object_id`, of a particular type, specified by `object`.


#### Configuring the Profile Value

This request updates the `value` of a profile value, since this object is dynamic the field we send will depend on the
type of `value`:

| Field Name | Type | Description |
|:-|:-|:-|
| value_int | int | If `field_type` is "integer", update the `value` with this integer. |
| value_date | string | If `field_type` is "date", update the `value` with this string. This field supports values as both unix timestamps and in ISO8601 form, for ease of readability we recommend ISO8601. |
| value_id | integer | If `field_type` is "lookup", update the `value` with this integer, representing an object id. |
| value_type | string | If `field_type` is "lookup", update the `value_type` with this string. |
| value | string | If `field_type` is none of the above, update the `value` with this string. |


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [profile value object](#the-profile-field-object) 
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will be the single, updated [profile value](#the-profile-value-object) with its default fields, and any
additional fields requested through `_fields`.






<a name="create-a-profile-value-link"></a>
### Create a Profile Value
> Example, a company has give us their business hours:

```shell
curl -X post \
  https://{deployment}.api.accelo.com/api/v0/companies/{company_id}/profiles/fields/{profiles_field_id}
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'value=16-20'
```

`POST /{object}/{object_id}/profiles/fields/{profile_field_id}`

This request sets and returns a [profile value](#the-profile-value-object) for a profile field, specified by its
`profile_field_id`. The object whose profile field is to be update is identified by `object_id` and `object`.
The following lists which objects are supported:

* Affiliations
* Companies
* Contacts
* Invoices
* Issues
* Jobs
* Milestones
* Prospects
* Staff

#### Configuring the Profile Value

This request accepts the same fields as the [previous request](#configuring-the-profile-value), that is, it takes only
the relevant value field(s). The relevant value field is required for this request.


#### Configuring the Response

This request supports requesting additional fields and linked objects from the [profile value object](#the-profile-field-object) 
using the [`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will be the newly created [profile value](#the-profile-value-object) with its default fields, and any
additional fields requested through `_fields`.
