## Checklists
> Resource URI:  
`/api/v0/checklists`

When creating a task in Accelo, you may want to cleanly lay out all of the key to-do items to ensure the task is completed properly.

Using the Checklist feature, these key to-dos can be easily listed, marked and tracked to ensure your tasks stay on track. When a checklist item is marked as completed, Accelo will record which user completed it.

See the [support documentation](https://help.accelo.com/guides/user/messages-and-tasks/tasks/using-checklists/) for more information on checklists.





### The Checklist Object
> Example checklist:

```json
{
  "id": "124",
  "against_id": "15",
  "against_type": "task",
  "created_by": "11",
  "date_created": "1624345472"
}

```

The checklist object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the checklist. |
| against_id | unsigned | The unique identifier of the object the checklist is against. |
| against_type | string | The type of object the checklist is against. Only 'task' is supported. |
| created_by | unsigned | The unique identifier of the staff member that created the checklist. |
| date_created | unix ts | The date the checklist was created. |

#### The Checklist Item
Each checklist can have one or more items

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the checklist item. |
| **title** | string | A title for the checklist item. |
| created_by | unsigned | The unique identifier of the staff member that created the checklist item. |
| complete | boolean | Whether the checklist item has been marked as completed. |
| checklist_id | unsigned | The unique identifier of the checklist the item is associated with. |
| date_modified | unix ts | The date the checklist was last modified. |
| modified_by | unsigned | The unique identifier of the staff member that last modified the checklist item. |
| date_completed | unix ts | The date the checklist was completed. |
| completed_by | unsigned | The unique identifier of the staff member that completed the checklist item. |
| ordering | integer | An integer representing the checklist item's ordering within the checklist. |
| date_created | unix ts | The date the checklist was created. |





### Get Checklist
> Sample Request:   

```http
GET /api/v0/checklists/{checklist_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/checklists/{checklist_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /checklists/{checklist_id}`

This request returns a single [checklist](#the-checklist-object), identified by its `checklist_id`.

#### Configuring the response
This request supports requesting additional fields and linked objects from the [checklist object](#the-checklist-object) using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the response
The response will be the single [checklist object](#the-checklist-object) with its default fields and any additional fields requested through `_fields`.





### List Checklists
> Sample Request:   

```http
GET /api/v0/checklists HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/checklists \
  -H 'authorization: Bearer {access_token}'
```

`GET /checklists`

This request returns a list of [checklists](#the-checklist-object) on the deployment.

#### Configuring the response

##### Pagination
This request supports the [pagination](#configuring-the-response-pagination) parameters.

#### Configuring the response
This request supports requesting additional fields and linked objects from the [checklist object](#the-checklist-object) using the [`_fields`](#configuring-the-response-fields) parameter.

##### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| **id** |
| against_id | Filter by the against_id. |
| against_type | Filter by the against_type. |
| created_by | Filter by the `staff_id` of the creator. |

##### Date Filters
This request supports [date_filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| date_created |

##### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| date_created ||

##### Searching
This request does not support the [`_search`](#configuring-the-response-searching) parameter.

#### Handling the response
The response will be a list of [checklists](#the-checklist-object) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.





### Count Checklists
> Sample Request:   

```http
GET /api/v0/checklists/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/checklists/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /checklists/count`

This request will return a count of checklists in a list defined by any available searches or filters. With no searches or filters this will be a count of all checklists on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of checklists listed. |





### List Checklist Items
> Sample Request:   

```http
GET /api/v0/checklists/items HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/checklists/items \
  -H 'authorization: Bearer {access_token}'
```

`GET /checklists/items`

This request returns a list of [checklist items](#the-checklist-item).





### Get Checklist Items
> Sample Request:   

```http
GET /api/v0/checklists/items HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}

_filters=checklist_id({checklist_id})
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/checklists/items \
  -H 'authorization: Bearer {access_token}' \
  -d '_filters=checklist_id({checklist_id})'
```

`GET /checklists/items?_filters=checklist_id(2)`

This request returns the [checklist items](#the-checklist-item) for a given checklist.





### Count Checklist Items
> Sample Request:

```http
GET /api/v0/checklists/items/count HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/checklists/items/count \
  -H 'authorization: Bearer {access_token}' \
```

`GET /checklists/items/count`

This request will return a count of checklist items in a list defined by any available searches or filters.
With no searches or filters this will be a count of all checklist items on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the listed checklist items. |





### Create a Checklist
> Sample Request:   

```http
POST /api/v0/checklists HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X post \
 https://{deployment}.api.accelo.com/api/v0/checklists \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`POST /checklists`

This request creates and returns a [checklist](#the-checklist-object).

#### Configuring the request

The following fields from the [checklist object](#the-checklist-object) may be set with this Sample Request:

| Field Name | Notes |
|:-|:-|
| **against_id** | Must point to a valid object. |
| **against_type** | Must point to a valid object type. Only 'task' is supported. |
| **items** | An array of items for the checklist. Each item includes 'title' and 'ordering'. |

#### Handling the response
The response will be the single, created [checklist](#the-checklist-object) with its default fields and any additional fields requested through `_fields`.





### Update a Checklist
> Sample Request:   

```http
PUT /api/v0/checklists/{checklist_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X put \
 https://{deployment}.api.accelo.com/api/v0/checklists/{checklist_id} \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`PUT /checklists/{checklist_id}`

This request updates and returns a [checklist](#the-checklist-object) on the deployment.

#### Configuring the checklist
The following fields from the [checklist object](#the-checklist-object) may be updated through this Sample Request:

| Field Name | Notes |
|:-|:-|
| **against_id** | Must point to a valid object. |
| **against_type** | Must point to a valid object type. Only 'task' is supported. |
| **items** | An array of items for the checklist. Each item includes 'title' and 'ordering'. |





### Delete a Checklist
> Sample Request:

```http
DELETE /api/v0/checklists/{checklist_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```
  
```shell
curl -X delete \
 https://{deployment}.api.accelo.com/api/v0/checklists/{checklist_id} \
  -H 'authorization: Bearer {access_token}'
```
  
`DELETE /checklists/{checklist_id}`
  
This request removes a checklist from the deployment, specified by its `checklist_id`. This request takes no parameters and
returns no resources.





### Delete a Checklist Item
> Sample Request:

```http
DELETE /api/v0/checklists/items/{checklist_item_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```
  
```shell
curl -X delete \
 https://{deployment}.api.accelo.com/api/v0/checklists/items/{checklist_item_id} \
  -H 'authorization: Bearer {access_token}'
```
  
`DELETE /checklists/items/{checklist_item_id}`
  
This request removes a checklist item from the deployment, specified by its `checklist_item_id`. This request takes no parameters and
returns no resources.

