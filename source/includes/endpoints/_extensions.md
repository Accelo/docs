# Extensions (Custom Fields)
<a name="extensions"></a>

> Resource URI:  
`/api/v0/extensions`

Extensions, also known as Custom Fields, are similar to [profiles](#profiles). The main difference is in their availability. A given profile may be available to all types of a particular object, for example any type of [issues](#issues), or even across a range of objects. Conversely, an extension is available to only one type of one object at at time, see also the [support documentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/modules/companies-and-contacts/custom-company-fields/#CustomProfileFieldvsCustomField). Extensions may be set up through the Accelo deployment, see the [support documentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/triggers-and-business-processes/custom-fields/custom-fields/) for information on setting them up. Currently the following objects support extensions through the API:  

* [Contracts](#contracts)  
* [Issues](#issues)  
* [Jobs](#jobs-projects)  
* [Prospects](#prospects-sales)

Similarly to [profiles](#profiles), extensions are described by [extension fields](#the-extension-field-object) and [extension values](#the-extension-value-object), which store the information of values of an extension field.

## The Extension Field Object
> Sample extension field:

```json
{
  "link_type": "job",
  "default_value": "national",
  "lookup_type": null,
  "field_type": "fixed_select",
  "field_name": "Project Work Location",
  "link_type_id": "1",
  "information": "Will the work be carried out internationally?",
  "options": [
    "national",
    "international"
  ],
  "exported": "no",
  "ordering": "0",
  "id": "9",
  "required": "no",
  "important": "no",
  "archived": "no"
}
```

These are objects describing the custom field on the deployment, they contain the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the extension. |
| **field_name** | string | A name for the extension. |
| **field_type** | select | The type of extension, may be either "text", "textbox", "int", "date", "date_time", "float", "certify", "fixed_select", "flexible_select", "multi_select", "lookup", "currency", "hyperlink", or "contributor". |
| **link_type_id** | unsigned | The unique identifier of the type of object this extension is linked to. For example, if "link_type" is job, this will be the id of the job type that this extension can appear under. |
| link_type | string | The type of object the extension is linked to. |
| ordering | int | The extension's order on the Accelo deployment. |
| required | select | Either "yes" or "no", whether this extension is required for the object it is linked to. |
| archived | select | Either "yes" or "no", whether this extension is no longer in use and has been archived. |
| exported | select | Either "yes" or "no", whether this extension is exported when the linked object is exported. |
| important | select | Either "yes" or "no", whether this extension has been marked as "important" on the Accleo deployment. |
| default_value | dynamic | The default value for the field, the type will depend on the `field_type`. |
| lookup_type | string | When `field_type` is lookup, this will contain the type of object for the lookup. |
| information | string | Any extra information about the extension. |

## The Extension Value Object
> Example extension field value:

```json
{
  "field_name": "Project Work Location",
  "field_type": "fixed_select",
  "link_type": "job",
  "is_sensitive": "0",
  "link_type_id": "1",
  "field_id": "9",
  "link_id": "2",
  "date_modified": "1495681796",
  "default_value": "national",
  "is_exported": "0",
  "modified_by": "14",
  "id": "6",
  "value": "national",
  "is_important": "0"
}
```

These describe the value of a given [extension field](#the-extension-field-object), identified by the `field_id`. This object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the extension value. |
| **field_type** | string | The `field_type` of the related extension field. |
| **file_name** | string | The name of the related extension field. |
| **value** | dynamic | The value for the extension, the type will depend on the `field_type` of the related extension field. If `field_type` is "lookup" then this will be the title of the linked object. If `field_type` is "contributor" it will be the name of the affiliation or staff who is the contributor |
| field_id | unsigned | The unique identifier of the related extension field. |
| link_id | unsigned | The unique identifier of the object the profile value is against. |
| link_type | string | The type of object the related extension field is linked to. |
| link_type_id | unsigned | The unique identifier of the type of object the related extension is linked to. |
| date_modified | unix ts | The date this extension value was last modified. |
| modified_by | unsigned or object | The staff member who last modified this extension value. |
| default_value | dynamic |  The default value of the related extension field. |
| is_sensitive | bool | Whether this value can only be viewed by people with "sensitive" permissions for the `link_type` object. See the [support documentation](https://www.accelo.com/resources/help/faq/user-permissions-and-settings/setup-permissions/) for information on setting permissions. |
| is_important | bool | Whether the related extension field is marked as "important". |
| is_exported | bool | Whether the related extension field is "exported". |
| value_id | unsigned | If `field_type` is "lookup" or "contributor" this will be the ID of the lookup object (e.g, the company id) or the contributor id |
| value_type | string | If `field_type` is "lookup" or "contributor" this will be the type of lookup object (e.g, "company") or "contributor" |







## List Extension Fields
<a name="retrieve-a-list-of-extension-fields"></a>
> Sample Request:  

```http
GET /api/v0/contracts/extensions/fields HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contraxts/extensions/fields
  -H 'authorization: Bearer {access_token}'
```

`GET /{object}/extensions/fields`

This request request returns a list of [extension fields](#the-extension-field-object) available for the given object

### Configuring the Response
#### Pagination
This request supports all of the [pagination](#configuring-the-response-pagination) parameters

#### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [extension field object](#the-extension-field-object) using the [`_fields`](#configuring-the-response-fields) parameter.

### handling the Response
The response will be a list of [extension field object](#the-extension-field-object) with their default fields, and any additional fields requested using `_fields.`







## List Extension Field Values
<a name="retrieve-a-list-of-extension-field-values"></a>
> Sample Request:  

```http
GET /api/v0/contracts/{contract_id}/extensions/values HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/contraxts/{contract_id}/extensions/values
  -H 'authorization: Bearer {access_token}'
```

`GET /{object}/{object_id}/extensions/values`

This request returns a list of [extension field values](#the-extension-value-object) for the given `object` identified by its `object_id`.

### Configuring the Response
#### Pagination
This request supports all of the [pagination](#configuring-the-response-pagination) parameters

#### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [extension value object](#the-extension-value-object) using the [`_fields`](#configuring-the-response-fields) parameter.

### Handling the Response
The response will be a list of [extension field values](#the-extension-value-object) with their default fields, and any additional fields requested through `_fields`.







## Update an Extension Field Value
<a name="update-an-extension-value"></a>

> Sample Request, here we are updating the value of an extension field value of "jobs/56" to be "international":  

```http
PUT /api/v0/jobs/56/extensions/values/4 HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded

value=international
```

```shell
curl -X put \
  https://{deployment}.api.accelo.com/api/v0/jobs/56/extensions/values/4 \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded'
  -d 'value=international'
```

`PUT /{object}/{object_id}/extensions/values/{extension_value_id}`

This request updates and returns a [extension values](#the-extension-value-object), specified by its `extension_value_id`, of a particular object, specified by its `object_id`, of a particular type, specified by `object`.

### Configuring the Extension Value
This request updates the `value` of an extension value, since this object is dynamic the field we send will depend on the type of `value`:

| Field | Type | Description |
|:-|:-|:-|
| value_int | int | If `field_type` is "integer", update the `value` with this integer. |
| value_date | unix ts | If `field_type` is "date", "date_time", or "certify", update the `value` with this string. |
| value_id | int | If `field_type` is "lookup" or "contributor", update the `value` with this integer, representing an object id.  |
| value_type | string | If 'field_type' is "lookup", update the `value_type` with this string.  |
| value | string | If `field_type` is none of the above, update the `value` with this string. |

### Configuring the Response
This request supports requesting additional fields and linked objects from the [extension value object](#the-extension-value-object) using the [`_fields`](#configuring-the-response-fields) parameter.

### handling the Response
This request will return the single, updated [extension value object](#the-extension-value-object) with its default fields, and any additional fields requesting through `_fields`.







## Set an Extension Field Value
<a name="create-an-extension-value"></a>
> Sample Request, here we are setting a value for an extension field value for "jobs/12":  

```http
PUT /api/v0/jobs/59/extensions/fields/12 HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded

value=international
```

```shell
curl -X put \
  https://{deployment}.api.accelo.com/api/v0/jobs/59/extensions/fields/12 \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded'
  -d 'value=international'
```

`POST /{object}/{object_id}/extensions/fields/{extension_field_id}`

This request sets and returns an [extension value](#the-extension-value-object). for an extension field, specified by its `extension_field_id`. The object whose profile field is to be updated is identified by `object` and `object_id`

### Configuring the Extension Value
This request accepts the same fields as the [previous request](#update-an-extension-value), that is, it takes only the relevant value field(s). These fields are required for this request.

### Configuring the Response
This request supports requesting additional fields and linked objects from the [extension value object](#the-extension-value-object) using the [`_fields`](#configuring-the-response-fields) parameter.

### handling the Response
This request will return the newly created [extension value object](#the-extension-value-object) with its default fields and any additional fields requested using `_fields`.
