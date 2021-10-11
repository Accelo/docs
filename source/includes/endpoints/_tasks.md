## Tasks
> Resource URI:  
`/api/v0/tasks`

Tasks are small units of work, they may be thought of as the type of work you would put on a "to-do" list. See the [support documentation](https://www.accelo.com/resources/help/guides/user/activities-and-tasks/tasks/) for more information on tasks and how to interact with them on the deployment.

### The Task Object
> Example task:

```json
{
  "affiliation": "292",
  "against": "milestones/15",
  "against_id": "15",
  "against_type": "milestone",
  "assignee": "7",
  "billable": "3600",
  "budgeted": "0",
  "company": null,
  "contact": "292",
  "creator": "staff/7",
  "creator_id": "7",
  "creator_type": "staff",
  "custom_id": null,
  "date_accepted": "1362533400",
  "date_commenced": "1362533400",
  "date_completed": "1374208724",
  "date_created": "1362533400",
  "date_due": "1374199200",
  "date_modified": "1532347231",
  "date_started": "1362531600",
  "description": null,
  "id": "24",
  "issue": null,
  "job": null,
  "logged": "3600",
  "manager": "7",
  "milestone": "15",
  "nonbillable": "0",
  "object_budget": "113",
  "rate_charged": "175.00",
  "rate_id": "6",
  "remaining": "0",
  "staff_bookmarked": "0",
  "standing": "complete",
  "status": "5",
  "task_job": null,
  "task_object_budget": "113",
  "task_object_schedule": "113",
  "task_object_schedule_id": "113",
  "task_priority": "1",
  "task_status": "5",
  "task_type": "1",
  "title": "SEO Audit",
  "type": "1"
}

```

The task object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the task. |
| **title** | string | A name for the task. |
| description | string | A description of the task. |
| billable | integer | The total billable time logged against the task, in seconds. |
| nonbillable | integer | The total nonbillable time logged against the task, in seconds |
| logged | integer | The total time logged against the task, in seconds. |
| budgeted | integer | The total time budgeted, or estimated, for the task, in seconds |
| remaining | integer | The amount of budgeted time left, in seconds. |
| staff_bookmarked | boolean | Whether the current user has bookmarked the task in the deployment. |
| date_created | unix ts | The date the task was created. |
| date_started | unix ts | The date the task is is scheduled to start. |
| date_commenced | unix ts | The date the task was started; when its standing was progressed to "started". |
| date_accepted | unix ts | The date the task was accepted. |
| date_due | unix ts | The date the task is due to be completed. |
| date_completed | unix ts | The date the task was completed. |
| date_modified | unix ts | The date the task was last modified. |
| against_type | string | The type of object the task is against. |
| against_id | unsigned | The unique identifier of the object the task is against. |
| against | string | The API URI of the object the task is against. That is "`against_type`/`against_id`". |
| creator_type | string | The type of object that created the task. |
| creator_id | unsigned | The unique identifier of the object that made the task. |
| creator | string | The API URI of the object that made the task. That is "`creator_type`"/"`creator_id`".|
| assignee | unsigned or object | The [staff](#staff) member assigned to the task. |
| type | unsigned or object | The [task type](#the-task-type) of the task. Deprecated, please use `task_type`.|
| task_type | unsigned or object | The [task type](#the-task-type) of the task. |
| status | unsigned or object | The [status](#statuses) of the task. Deprecated, please use `task_status`. |
| task_status | unsigned or object | The [status](#statuses) of the task. |
| standing | string | The standing of the task, this is contained in the status object. |
| manager | unsigned or object | The [staff](#staff) member assigned to manager the task. |
| contact | unsigned or object | The [contact](#contacts) associated with the against object, if any. |
| affiliation | unsigned or object | The [affiliation](#affiliations) associated with the against object, if any. |
| company | unsigned or object | The [company](#companies) object the task is against, if any. |
| issue | unsigned or object | The [issue](#issues) object the task is against, if any. |
| job | unsigned or object | The [job](#jobs-projects) object the task is against, if any. Deprecated, please use `task_job`|
| task_job | unsigned or object | The [job](#jobs-projects) object the task is against, if any. |
| milestone | unsigned or object | The [milestone](#milestones) object the task is against, if any. |
| task_object_budget | unsigned or object | The [object budget](#object-budgets) linked to the task, if any. |
| task_object_schedule | unsigned or object | The [object schedule](#the-object-schedule) linked to the task. |
| task_object_schedule_id | unsigned | The id of the object schedule linked to the task. |
| task_priority | unsigned or object | The [priority](#the-task-priority) of the task. |
| rate_id | unsigned | The unique identifier of the [rate object](#rates) of the task. |
| rate_charged | decimal | The rate charged for billable work within this task. This is part of the rate object. |
| ordering | unsigned | An integer representing the task's order on the against object, only if the task is against a [job](#jobs-projects) or [milestone](#milestones) |


#### The Task Priority
Task priorities help you prioritize your task. They may be set up from the deployment, see the [support
documentation](https://www.accelo.com/resources/help/guides/user/activities-and-tasks/tasks/using-task-priorities/#configure_task_priority_name) for information. They
contain the following:


| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the task priority. |
| **title** | string | A title for the task priority. |
|icon | select | The icon of the priority when displayed on the deployment. The icons, in order of decreasing urgency a `critical_priority`, `high_priority`, `normal_priority`, `low_priority`, `none_priority`. |
| level | unsigned | A number representing the urgency of the priority. 1 is "Critical", 5 is "None"|


#### The Task Type
Task types allow you to assign type labels to tasks. The task type contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the task type. |
| **title** | string | A title for the task type. |
|standing | Select | Either "active" or "inactive", the standing of the task type. |
| ordering | unsigned | An integer representing the task type's order on the deployment. |

Note: This object does not support the `_ALL` argument when request with [`_fields`](#configuring-the-response-fields).

#### The Task Metadata
The metadata object associated with [tasks](#the-task-object) is a list of the following:

##### Task Metadata Managers
This is a list of [staff members](#staff) managing tasks on the deployment, the object has the following fields:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The unique identifier of the [staff member](#staff). |
| **name** | string | The staff member's full name (first name and surname). |
| **email** | string | The staff member's email address. |

##### Task Metadata Assignees
This is a list of [staff members](#staff) assigned to tasks on the deployment. The object contains the same fields as the [managers metadata object](#task-metadata-managers)

##### Task Metadata Against
This is a list of object types that have tasks listed against them on the deployment, this object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | string | An identifier to identify the object within the API. For example "prospect".|
| **name** | string | A name for the object. For example "Sale". |

##### Task Metadata Status
This is a list of [status](#statuses) objects available to tasks on the deployment. Note that this is a status object without the `start` field.







### Get Task
> Sample Request:   

```http
GET /api/v0/tasks/{task_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/tasks/{task_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /tasks/{task_id}`

This request returns a single [task](#the-task-object), identified by its `task_id`.

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [task object](#the-task-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

#### Handling the Response
The response will be the single [task object](#the-task-object) with its default fields and any additional fields requested through `_fields`.







### List Tasks
> Sample Request:   

```http
GET /api/v0/tasks HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/tasks \
  -H 'authorization: Bearer {access_token}'
```

`GET /tasks`

This request returns a list of [tasks](#the-task-object) on the deployment.

#### Configuring the Response

##### Pagination
This request supports the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [task object](#the-task-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

##### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id |
| assignee | Filter by the `staff_id` of the assignee. |
| manager | Filter by the `staff_id` of the manager. |
| status | Filter by `status_id`. |
| standing ||
| against_type ||
| against_id ||
| custom_id ||
| child_of_job | Filter by the `job_id` of the [job](#jobs-projects) the task, or its against object, is against. This allows you to find tasks under a certain job, even when they are not created directly against that job, for example if they are created against a [milestone](#milestones) under the job. |
| rate_id | |
| rate_charged | |


##### Date Filters
This request supports [date_filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| date_created |
| date_started |
| date_commenced |
| date_accepted |
| date_completed |
| date_modified |
| date_due |

##### Range Filters
This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| billable ||
| nonbillable ||
| budgeted ||
| remaining ||
| against_id ||
| creator_id ||
| assignee | Range over the `staff_id` of the assignee. |
| type | Range over `type_id`. Deprecated, please use `task_type`. |
| task_type | Range over the `task_type_id`. |
| status | Range over `status_id`. |
| manager | Range over the `staff_id` of the manager. |
| contact | Range over the `contact_id` of the associated contact. |
| rate_charged | |

##### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| date_created ||
| date_started ||
| date_commenced ||
| date_accepted ||
| date_completed ||
| date_modified ||
| date_due ||
| task_priority ||
| title ||
| standing ||
| status | Order by the `status_id`. |
| rate_charged | |
| ordering | The order of the tasks on their against object, if the against object is a [job](#jobs-projects) or [milestone](#milestones) |

##### Object Filters
This request supports the following [object filters](#filters-object-filters):

| Filter Name | Description |
|:-|:-|
| against | Filter by tasks against these objects. |
| creator | Filter by tasks created by these objects. |

##### Searching
This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Field |
|:-|
| description |
| title |

#### Handling the Response
The response will be a list of [tasks](#the-task-object) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used.







### Count Tasks
> Sample Request:   

```http
GET /api/v0/tasks/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/tasks/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /tasks/count`

This request will return a count of tasks in a list defined by any available searches or filters. With no searches or filters this will be a count of all tasks on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of tasks listed. |





### List Task Priorities
> Sample Request:   

```http
GET /api/v0/tasks/priorities HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/tasks/priorities \
  -H 'authorization: Bearer {access_token}'
```

`GET /tasks/priorities`

This request returns a list of [priorities](#the-task-priority) available for tasks.






### Get Task Status
> Sample Request:

```http
GET /api/v0/tasks/statuses/{status_id} HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/tasks/statuses/{status_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /tasks/statuses/{status_id}`

This request returns the task [status](#statuses) specified by its  `status_id`.

#### Configuring the Response

This request supports requesting additional fields and linked objects from the [status object](#statuses) using the
[`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will be a task [status object](#statuses) for the specified status with its default fields and any
additional fields requested through `_fields`.






### List Task Statuses
> Sample Request:   

```http
GET /api/v0/tasks/statuses HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/tasks/statuses \
  -H 'authorization: Bearer {access_token}'
```

`GET /tasks/statuses`

This request returns a list of [statuses](#statuses) available for [tasks](#the-task-object) on the deployment.

#### Configuring the Response

##### Pagination
This request supports the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [statuses](#statuses) object using the [`_fields`](#configuring-the-response-fields) parameter. Note, this request does not support the `_ALL` argument. Note, the status object for tasks does not contain the `start` field.

##### Basic Filters
This request supports the following [basic filters](#filters-basic-filters):

| Filter Name |
|:-|
| id |
| title |
| standing |
| color |

##### Order Filters
This request supports the following [order filters](#filters-order-filters):

| Filter Name |
|:-|
| id |
| title |
| standing |
| color |
| ordering |

##### Searching
This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Field |
|:-|
| title |


#### Handling the Response
The response will be a list of [statuses](#statuses) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters or searches used.






### Count Task Statuses
> Sample Request:

```http
GET /api/v0/tasks/statuses/count HTTP/1.1
Host: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/tasks/statuses/count \
  -H 'authorization: Bearer {access_token}' \
```

`GET /tasks/statuses/count`

This request will return a count of task statuses in a list defined by any available searches or filters.
With no searches or filters this will be a count of all task statuses on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the listed task statuses. |





### List Meta Data
> Sample Request:   

```http
GET /api/v0/tasks/meta HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/tasks/meta \
  -H 'authorization: Bearer {access_token}'
```

`GET /tasks/meta`

This request returns a list of [metadata objects](#the-task-metadata) for [tasks](#the-task-object) on the deployment. That is, a list of lists.

#### Handling the Response
The response will be a list of [task managers](#task-metadata-managers), [task assignees](#task-metadata-assignees), [against objects](#task-metadata-against), and [statuses](#task-metadata-status).







### Update a Task
> Sample Request:   

```http
PUT /api/v0/tasks HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/tasks \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`PUT /tasks/{task_id}`

This request updates and return a [task](#the-task-object) on the deployment.

#### Configuring the Task
The following fields from the [task object](#the-task-object) may be updated through this Sample Request:

| Field Name |
|:-|
| title |
| description |
| assignee_id |
| affiliation_id |
| manager_id |
| priority_id |
| type_id |
| rate_id |
| rate_charged |
| date_due |
| remaining |

#### Configuring the Response
This request supports requesting additional fields and linked resources from the [task object](#the-task-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

#### Handling the Response
The response will be the single, updated [task](#the-task-object) with its default fields and any additional fields requested through `_fields`.







### Create a Task
> Sample Request:   

```http
POST /api/v0/tasks HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/tasks \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`POST /tasks`

This request creates and returns a [task](#the-task-object).

#### Configuring the Task
The following fields from the [task object](#the-task-object) may be set with this Sample Request:

| Field Name | Notes |
|:-|:-|
| **title** ||
| **against_id** | Must point to a valid object. |
| **against_type** | Must point to a valid object type.|
| **date_started** ||
| description ||
| status_id | The `status_id` for the initial [status](#statuses). You may [retrieve a list of statuses for tasks](#retrieve-a-list-of-statuses-for-tasks) if required. |
| manager_id | The `staff_id` for the [staff](#staff) to be assigned manager. |
| assignee_id | The `staff_id` for the [staff](#staff) to be assigned to the task. |
| affiliation_id | The `affiliation_id` for the [affiliation](#affiliations) to be associated with the task. |
| date_due ||
| priority_id | The [priority](#the-task-priority) object's id. For available priorities see [`GET /tasks/priorities`](#list-task-priorities) |
| remaining | The field `budgeted` will be automatically updated with this value upon creation. |
| rate_id | Only available if the task is against a "job" or "milestone". The `rate_id` of the [rate](#rates) for this task. |
| rate_charged | Only available if the task is against a "job" or "milestone". The rate charged for work on this task, as a decimal. |
| is_billable | Only available if the task is against a "job" or "milestone". Whether this task is billable, may either by "yes" or "no". |

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [task object](#the-task-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

#### Handling the Response
The response will be the single, created [task](#the-task-object) with its default fields and any additional fields requested through `_fields`.







### List Available Progressions on a Task
> See the [progressions section](#retrieve-a-list-of-available-progressions) for a sample request

`GET /tasks/{task_id}/progressions`

This request returns a list of available [progressions](#the-progression-object) for a [task](#the-task-object), specified by its `task_id`. This is the request [`GET /{object}/{object_id}/progressions`](#retrieve-a-list-of-available-progressions) where the object is "tasks" whose id is `task_id`.







### Auto Run a Progression on a Task
> See the [progressions section](#run-a-status-update-using-a-given-progression) for a sample request 

`PUT|POST /tasks/{task_id}/progressions/{progression_id}/auto`

This request uses the given progression, specified by its `progression_id` to progress a [task](#the-task-object), specified by its `task_id`. This is the request [`[POST|PUT] /{object}/{object_id}/progressions/{progression_id}/auto`](#run-a-status-update-using-a-given-progression) where the object is "task" whose id is `task_id`.







### Auto Progress a Task to Start or End
> Requests:  

`PUT|POST /tasks/{task_id}/progressions/start`  
`PUT|POST /tasks/{task_id}/progressions/done`

These requests will auto progress the [status](#statuses) of a [task](#the-task-object), identified by its `task_id` to "start" or "done", respectively.
