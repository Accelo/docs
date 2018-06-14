## Progressions
Progressions allow you and your team to intelligently move records between statuses. The Public API currently supports automatic progressions, which skip over details requiring user interaction. These automatic progressions are currently supported over the following resources:  
1. [tasks](#tasks)  
2. [companies](#companies)  
3. [jobs](#jobs-projects)  
4. [prospects](#prospects-sales)  
5. [issues](#issues)  
6. [milestones](#milestones)  
7. [affiliations](#affiliations)  
8. [contracts](#contracts)  
9. [contacts](#contacts)  
10. [expenses](#expenses)

**NOTE**: For a user to perform an interaction on a progression they MUST have the process permission or be a manager (or assignee for tasks) of the object. The list progression actions endpoint will NOT return progressions on objects that do not meet these requirements.

See the [support documentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide/triggers-and-business-processes/business-processes/progressions/) for information on progressions, including how to define new progressions on your deployment.


### The Progression Object
> Example progression object:

```json
{
  "standing": "paused",
  "color": "pink",
  "title": "Paused",
  "id": "8"
}
```

The progressions object contains the following fields and linked objects:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the progression. |
| **title** | string | A name for the progression. |
| **status** | object | The [status](#status-objects) the progression will move to. Note, the status object here does not contain the `start` field. |



#### The Progression History
The history of progressions taken by an object (equivalently, the history of statuses that it has taken) is tracked via
the progression history. Each of these objects tracks the status the object was moved to, by whom, and when. These
objects contain:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned  | A unique identifier for the history object |
| **to_id** | unsigned | The id of the [status](#status-objects) the object was progressed to. |
| **to_title** | string  | The title of the [status](#status-objects) the object was progressed to. |
| against_type | string | The type of object the progression was made against. |
| against_id | unsigned | The unique identifier of the object the progression was made against. |
| modified_by | unsigned | The unique identifier of the staff who progressed the object. |
| date_modified | unix ts | The date the object was progressed. |


#### Using Progressions
Progressions may be used to perform an automatic status update, this is a three step process:  
1. Determine which status progressions are available for the given object, this is achieved by a `GET` request which [retrieves a list of available progressions](#retrieve-a-list-of-available-progressions).  
2. From this list identify the appropriate progressions for your action, keep track of the `progression_id`.  
3. Use this `progression id` in a `POST` request to [run a status update](#run-a-status-update-using-a-given-progression).







### List Available Progressions
<a name="retrieve-a-list-of-available-progressions"></a>
> Example request:

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/jobs/{job_id}/progressions \
  -H 'authorization: Bearer {access_token}'
```


`GET /{resource}/{resource_id}/progressions`

This request returns a list of [progressions](#the-progression-object) available for a given resource, which may be one of the types [above](#progressions), specified by its unique resource id.

#### Handling the Response
This request will return a list of [progressions](#the-progression-object) available for the object given, displayed in ascending order of their `progression_id`.







### List Progression History

> Sample request:

```http
GET /api/v0/progressions/history HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
  https://{deployment}.api.accelo.com/api/v0/progressions/history \
  -H 'authorization: Bearer {access_token}' \
```

`GET/progressions/history`

This request returns a list of [progression history objects](#the-progression-history).

#### Configuring the Response

##### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [progression history
object](#the-progression-history) using the [`_fields`](#configuring-the-response-fields) parameter.

##### Basic Filters
This request supports the following [basic filters](#filters-basic-filters):

| Filter | Description |
|:-|:-|
| id |  |
| against_type |  |
| against_id |  |
| modified_by |  |

##### Order Filters
This request supports the following [order filters](#filters-order-filters):

| Filter | Description |
|:-|:-|
| id |  |
| date_modified |  |

##### Range Filters
This request supports [range filters](#filters-range-filters) over the following fields:

| Field | Description |
|:-|:-|
| id |  |

##### Object Filters
This request supports the following [object filters](#filters-object_filters):

| Filter Name | Description |
|:-|:-|
| against | Filter by histories against these objects. |

##### Date Filters
This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name | Description |
|:-|:-|
| date_modified |  |

#### Handling the Response
The response will be a list of [progression history objects](#the-progression-history) with their default fields and any
additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or
searches used.






### Get Progression History

> Sample request:

```http
GET /api/v0/progressions/history/{progression_history_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
  https://{deployment}.api.accelo.com/api/v0/progressions/history/{progression_history_id} \
  -H 'authorization: Bearer {access_token}' \
```

`GET/progressions/history/{progression_history_id}`

This request returns a single [progression history object](#the-progression-history) specified by its unique id.





### Count Progression Histories

> Sample request:

```http
GET /api/v0/progressions/history/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
  https://{deployment}.api.accelo.com/api/v0/progressions/history/count \
  -H 'authorization: Bearer {access_token}' \
```

`GET/progressions/history/count`

This request will return a count of [progression histories](#the-progression-history) in a list defined by any available
searches or filters. See [`GET /progressions/history`](#list-progression-history) for a list of available filters. With
no searches or filters this will be a count of all progression histories. The response contains a single fie

| Field | Type | Description |
|:-|:-|:-|
| **count** | Unsigned | A count of progression histories listed |











### Auto Run a Progression
<a name="run-a-status-update-using-a-given-progression"></a>
> Example request, we wish to move our job to "complete" from the above request we found that the progression with id "8" will do this:

```shell
curl -X post \
  https://{deployment}.api.accelo.com/api/v0/progressions/8/auto \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded'
```

`[POST|PUT] /{resource}/{resource_id}/progressions/{progression_id}/auto`

This request uses the given progression, specified by its `progression_id` to progress the status of the object, specified by its unique id. The object may be any one of those listed [above](#progressions).

#### Handling the Response
The response will contain the single updated object. Please see the appropriate resource endpoint for handling and configuring the response.