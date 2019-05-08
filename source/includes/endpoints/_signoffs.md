## Signoffs
> Resource URI:  
`/api/v0/signoffs`

Signoffs in Accelo allow your clients to approve your work and make comments against attachments and work descriptions.
See the [support documentation](https://www.accelo.com/resources/help/guides/user/modules/projects/signoffs/) for more
information on signoffs.

### The Signoff Object

> Example Signoff Object:

```json
{
	"against": "jobs/39",
	"requires": "any",
	"standing": "draft",
	"date_created": "1398651556",
	"date_updated": "1529619011",
	"html_body": "Finish creating those things",
	"standing_color": "yellow",
	"against_id": "39",
	"body": "Finish creating those things",
	"created_by_id": "40",
	"subject": "Creating things",
	"permissions": {
      "can_redraft": 0,
      "can_send": 1,
      "can_edit": 1
	},
	"date_expires": "1519822799",
	"preview_body": "Finish creating those things",
	"against_type": "job",
	"id": "1",
	"created_by": "40"
}
```

The signoff object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the signoff. |
| **subject** | string | A name for the signoff. |
| standing | string | The signoffs standing/status. Either "Draft", "Sent", "Approved" or "Declined". |
| requires | string | Whether the signoff requires "any" approvers or "all" approvers to approve the quote. |
| against | string | The API URL for the object the signoff is against e.g. "jobs/39". |
| date_created | unix ts | The date the signoff was created.|
| date_updated | unix ts | The date the signoff was last updated. |
| standing_colour | string | The colour associated with the signoffs current standing/status. |
| against_id | unsigned | The unique identifier of the object this signoff is against. |
| against_type | string | The type of object this signoff is against. |
| body | string | The main content for the signoff. |
| preview_body | string | A shortened form of the main content of the signoff |
| html_body | string | The main content of the signoff returned as HTML. |
| created_by | unsigned or object | The staff member who created this signoff. |
| created_by_id | unsigned | The unique identifier for the staff member who created this signoff. |
| permissions | object | An object containing the permissions for the current user on this signoff |
| date_expires | unix ts | The date the signoff becomes invalid. |



### The Recipient Object
A recipient is the contact or contributor that a signoff is sent to.

> Example Recipient Object

```json
	{
      "recipient": {
        "type": "affiliation",
        "name": "Fred",
        "id": "300",
        "email": "fred@email.com"
      },
      "response": "pending",
      "date_responded": "1516689196",
      "recipient_type": "affiliation",
      "recipient_id": "300",
      "signoff_id": "2",
      "approver": "1",
      "id": "6"
    }
```

The recipient object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the recipient. |
| **signoff_id** | unsigned | The identifier of the signoff this recipient is related to. |
| **recipient_id** | unsigned | The identifier of the recipient |
| **recipient_type** | string | The object type of the recipient e.g. 'affiliation' or 'staff'. |
| **response** | string | The response of the recipient to the signoff. |
| date_responded | unix ts | The date in which the recipient responded to the sign off. |
| recipient | object | An object describing more information about the recipient. |
| approver | boolean | Whether the user can approve the quote related to this signoff. |


### The Attachment Object

The attachment object represents one resource that is attached to a signoff.

> Example Attachment Object

```json
{
      "signoff_id": "2",
      "activity_id": "0",
      "id": "1",
      "resource": "316",
      "resource_id": "316",
      "standing": "active"
}
```

The attachment object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the attachment. |
| signoff_id | unsigned | The identifier for the signoff the attachment is related to. |
| resource_id | unsigned | The identifier for the resource that is attached. |
| standing | string | The standing/status for the attachment either 'active' or 'inactive'. |
| activity_id| unsigned | The identifier of the activity (if any) that the attachment is related to. |



### Get Signoff
> Sample Request

```http
GET /api/v0/signoffs/{signoff_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/signoffs/{signoff_id}} \
  -H 'authorization: Bearer {access_token}'
```

`GET /signoffs/{signoff_id}`

This request returns a single [signoff](#the-signoff-object) using the [`_fields`](#configuring-the-response-fields)
parameter.

#### Configuring the response
This request supports requesting additional fields and linked resources from the [signoff object](#the-signoff-object)
using the [`_fields`](#configuring-the-response-fields) parameter.

##### Handling the Response
The response will be the single [signoff object](#the-signoff-object) with its default fields and any additional fields
requested through `_fields`.







### List Signoffs
> Sample Request:

```http
GET /api/v0/signoffs HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/signoffs \
  -H 'authorization: Bearer {access_token}'
```

`GET /signoffs`

This request returns a list of signoffs for the deployment.

##### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Resources
This request supports requesting additional fields and linked resources from the [signoff object](#the-signoff-object)
using the [`_fields`](#configuring-the-response-fields) parameter.

#### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| created_by ||
| standing ||
| requires ||
|against_type ||
|against_id ||

##### Date Filters
This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| created |
| expires |
| updated |

##### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| date_created |
| date_expires |
| date_updated |
| standing |
| subject |

##### Empty Filters

This request supports [empty filters](#filters-empty-filters) over the following fields:

| Field |
|:-|
| subject |
| body |
| created_by |
| date_expires |
| date_updated |

##### Range Filters
This request supports [range filters](#range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||

##### Object Filters
This request supports the following [object filters](#filters-object-filters):

| Filter | Description |
|:-|:-|
| against | Filter by quotes against these objects. |

##### Searching

This request the use of the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Field |
|:-|
| subject |







### Count Signoffs
> Sample Request:

```http
GET /api/v0/signoffs/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/signoffs/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /signoffs/count`

This request will return a count of the signoffs in a list defined by any available searches or filters. With no
searches or filters, this will be a count of all signoffs on the deployment. This request returns a single field.

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the signoffs listed. |






### Update Signoff
> Sample Request:

```http
PUT /api/v0/signoffs/signoff/{signoff_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X put \
 https://{deployment}.api.accelo.com/api/v0/signoffs/signoffs/{signoff_id} \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`PUT /signoffs/signoff/{signoff_id}`

This request updates and returns a [signoff](#the-signoff-object), identified by its `signoff_id`.

#### Configuring the Signoff
The following fields from the [signoff object](#the-signoff-object) may be updated with this request:

| Field |
| :- |
| body |






#### Redraft a signoff
 > Sample Request:

```http
POST /api/v0/signoffs/{signoff_id}/redraft HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X post \
 https://{deployment}.api.accelo.com/api/v0/signoffs/{signoff_id}/redraft \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`POST /signoffs/{signoff_id}/redraft`

This request allows a signoff to be re-drafted and returns the signoff, identified by its `signoff_id`.







### Send a signoff
 > Sample Request:

```http
POST /api/v0/signoffs/{signoff_id}/send HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X post \
 https://{deployment}.api.accelo.com/api/v0/signoffs/{signoff_id}/send \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`POST /signoffs/{signoff_id}/send`

This request allows a signoff to be sent and returns the sent signoff, identified by its `signoff_id`.








### List Signoff Recipients
 > Sample Request:

```http
GET /api/v0/signoffs/recipients HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/signoffs/recipients \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`GET /signoffs/recipients`

This request returns a list of all recipients for the deployment.

##### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Resources
This request supports requesting additional fields and linked resources from the [recipient object](#the-recipient-object)
using the [`_fields`](#configuring-the-response-fields) parameter.

#### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| signoff_id ||
| recipient_type ||
| recipient_id ||
| response ||
| approver ||

##### Date Filters
This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| responded |

##### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| id |
| date_responded ||

##### Range Filters
This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name |
|:-|
| id |
| signoff_id ||


##### Empty Filters

This request supports [empty filters](#filters-empty-filters) over the following fields:

| Field |
|:-|
| date_responded ||







### Count Signoff Recipients
> Sample Request:

```http
GET /api/v0/signoffs/signoffs/recipients/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/signoffs/recipients/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /signoffs/recipients/count`

This request will return a count of recipients in a list defined by any available searches or filters. With no searches
or filters this will be a count of all recipients on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of recipients listed. |







### Get Signoff Recipient
> Sample Request:

```http
GET /api/v0/signoffs/recipients/{recipient_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/signoffs/recipients/{recipient_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /signoffs/recipients/{recipient_id}`

This request returns a [recipient](#the-recipient-object) identified by its `recipient_id`.

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [recipient objects](#the-recipient-object)
using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response
The response will be the [recipient](#the-recipient-object) with its default fields and any additional fields requested
through `_fields`.






### Create Signoff Recipient
 > Sample Request:

```http
POST /api/v0/signoffs/recipients HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X post \
 https://{deployment}.api.accelo.com/api/v0/signoffs/recipients \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`POST /signoffs/recipient`

This request allows a recipient to be added to a signoff and returns a [recipient](#the-recipient-object). The
following fields are set via this request.

| Field | Type | Description |
|:-|:-|:-|
| **signoff_id** | unsigned | The identifier of the signoff this recipient is related to. |
| **recipient_id** | unsigned | The identifier of the recipient |
| **recipient_type** | string | The object type of the recipient e.g. 'affiliation' or 'staff'. |
| **approver** | boolean | Whether the user can approve the quote related to this signoff. |






### Update Signoff Recipient
 > Sample Request:

```http
PUT /api/v0/signoffs/recipients/{recipient_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X put \
 https://{deployment}.api.accelo.com/api/v0/signoffs/recipients/{recipient_id} \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`PUT /signoffs/recipients/{recipient_id}`

This request allows the recipient of a quote to be updated and returns the [recipient object](#the-recipient-object),
identified by their `recipient_id`. A recipient can only be edited if a user is the recipient and if the quote is in draft.

The following fields can be updated by this request:

| Field |
| :- |
| response |







### Delete Signoff Recipient
 > Sample Request:

```http
DELETE /api/v0/signoffs/recipients/{recipient_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X delete \
 https://{deployment}.api.accelo.com/api/v0/signoffs/recipients/{recipient_id} \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`DELETE /signoffs/recipients/{recipient_id}`

This request allows the recipient of a quote to be deleted, identified by their `recipient_id`.








### List Signoff Attachments
> Sample Request:

```http
GET /api/v0/signoffs/signoffs/attachments HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/signoffs/attachments \
  -H 'authorization: Bearer {access_token}'
```

`GET /signoffs/attachments`

This request an list of [attachment objects](#the-attachment-object) for the deployment.

#### Configuring the Response

##### Pagination

This request supports all the [pagination](#configuring-the-response-pagination) parameters.


##### Additional Fields and Linked Objects

This request supports requesting extra fields or linked objects from the [attachment object](#the-attachment-object)
using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports
[breadcrumbs](#configuring-the-response-breadcrumbs).


##### Basic Filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id |
| signoff_id |
| standing |
| resource_id |
| activity_id ||


#### Handling the Response

The response will be a list of [](#the-attachment-object) containing the default fields and any additional fields
requested by `_fields`, and displayed according to any pagination parameters or filters used.






### Get Signoff Attachment
> Sample Request:

```http
GET /api/v0/signoffs/signoffs/attachments/{attachment_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/signoffs/attachments/{attachment_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /signoffs/attachments/{attachment_id}`

This request returns an [attachment](#the-attachment-object) specified by its `attachment_id`.

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [attachment objects](#the-attachment-object)
using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response
The response will be the [attachment](#the-attachment-object) with its default fields and any additional fields
requested through `_fields`.







### Count Signoff Attachments
> Sample Request:

```http
GET /api/v0/signoffs/signoffs/attachments/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/signoffs/attachments/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /signoffs/attachments/count`

This request will return a count of attachments in a list defined by any available searches or filters. With no searches
 or filters this will be a count of all attachments on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of attachments listed. |







### Upload Signoff Attachment
> Sample Request:

```http
POST /api/v0/signoffs/{signoff_id}/attachments HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="resource"; filename="example.pdf"
Content-Type: application/pdf


------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

```shell
curl -X post \
 https://{deployment}.api.accelo.com/api/v0/signoffs/{signoff_id}/attachments \
  -H 'authorization: Bearer {access_token}'
```

`POST /signoffs/{signoff_id}/attachments`

This request uploads a file as an attachment to the given signoff.

#### Configuring the Resource
The file may be uploaded using the following parameter:

| Field | Type | Description |
|:-|:-|:-|
| **resource** | file | The file to be uploaded. |

#### Handling the Response
The response will contain the following fields:

| Field | Type | Description |
|:-|:-|:-|
| **title** | string | The name of the resource. |
| size | integer | The size of the attachment in bytes. |
| mimetype | string | The mime type of the attachment. |







### Update Signoff Attachment
> Sample Request:

```http
PUT /api/v0/signoffs/signoffs/attachments/{attachment_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/signoffs/attachments/{attachment_id} \
  -H 'authorization: Bearer {access_token}'
```

`PUT /signoffs/attachments/{attachment_id}`

This request updates an attachment identified by its `attachment_id` and returns the updated
[attachment object](#the-attachment-object).

The fields able to be updated by this request are:

| Field |
| :- |
| Standing |









