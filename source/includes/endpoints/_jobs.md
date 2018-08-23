## Jobs (Projects)
> Resource URI:  
`api/v0/jobs`

 Jobs (or Projects) help you to plan, delegate and track client and internal projects. Projects can be as simple or complex as you like, see the [support documentation](https://www.accelo.com/resources/help/guides/user/modules/projects/) for more information.

### The Jobs Object
> Example job object:

```json
{
  "date_modified": "1495681796",
  "modified_by": "14",
  "status": "5",
  "staff_bookmarked": "1",
  "type": "3",
  "job_type": "3",
  "against": "companies/65",
  "date_completed": null,
  "against_id": "39",
  "against_type": "company",
  "company": "39",
  "id": "2",
  "date_due": "1495245600",
  "rate": "3",
  "date_created": "1495238402",
  "standing": "active",
  "date_started": "1495245600",
  "title": "New Logo Design",
  "paused": "0",
  "date_last_interacted": "1495686301",
  "manager": "7",
  "rate_charged": "125.00",
  "date_commenced": "1494209132",
  "affiliation": "77"
}
```

The jobs object contains the following:

| Field | Type | Description|
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the job. |
| **title** | string | A name for the job. |
| against_type | string  | The type of object the job is against. |
| against_id | unsigned | The unique identifier of the object the job is against. |
| against | string | The API URI of the object the job is against, that is,`against_type` and `against_id` concatenated with a "/".|
| paused | integer | The number of days the jobs has been paused. |
| staff_bookmarked | boolean | Whether the current user has bookmarked the job on the deployment. |
| date_created |unix ts | The date the project was created. |
| date_modified | unix ts| The date the project was last modified. |
| date_commenced | unix ts | The date the job started, that is, when its status moved from "setup" to "active" |
| date_started | unix ts | The date the job is scheduled to start. |
| date_due | unix ts | The date the job is scheduled to be completed. |
| date_completed | unix ts | The date the job was completed. |
| date_last_interacted | unix ts | The date the job was last interacted with. |
| type | unsigned or object | The [job type](#the-job-type) object of the job. Deprecated, please use `job_type`. |
| job_type | unsigned or object | The [job type](#the-job-type) associated with the job. |
| rate | unsigned or object | The [rate object](#rates) associated with the job. |
| rate_charged | decimal | The rate charged for billable work, this is part of the rate object. |
| status | unsigned or object | The [status](#statuses) associated with the job|
| standing | string | The standing of the project. This is part of the status. |
| manager | unsigned or object | The [staff](#staff) manager managing the job. |
| modified_by | unsigned or object | The [staff](#staff) member who last modified the job. |
| company | unsigned or object | The [company](#companies) against the job, if any. |
| affiliation | unsigned or object | The [affiliation](#affiliations) against the job. |
| job_object_budget | unsigned or object | The [object budget](#object-budgets) associated with the job. |
| job_contract | unsigned or object | The [contract](#contracts) associated with the job, if any. |

#### The Job Type
> Example job type:

```json
{
  "id": "3",
  "title": "Internal",
  "standing": "active",
  "ordering": "0"
}
```

You may set up and configure different job types to suit your business processes, general information on types can be
found in the [support documentation](https://www.accelo.com/resources/help/guides/settings-and-configuration-guide
/triggers-and-business-processes/types/). For jobs, the type object contains the following:

 Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the job type. |
| **title** | string | A name for the job type. |
| standing | select | Either "active" or "inactive", the standing of the job type. |
| ordering | integer | An integer representing the type's order as displayed on the deployment. |

**Note:** Requesting the job type object via `type()` is deprecated, please instead
request it via `job_type()`, this object will have an additional field:

 Field | Type | Description |
|:-|:-|:-|
| has_custom_id | boolean | Either "1" or "0", whether the job type has a custom id. |






### Get Job
> Sample Request:  

```http
GET /api/v0/jobs/{job_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/jobs/{job_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /jobs/{job_id}`

This request returns a single [job](#the-jobs-object), specified by its `job_id`.


#### Configuring the Response

This request supports requesting additional fields and linked resources from the [job object](#the-jobs-object) using
the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).


#### Handling the Response

The response will be the single job with its default fields and any additional fields requested through `_fields`.







### List Jobs
> Sample Request:  

```http
GET /api/v0/jobs HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/jobs \
  -H 'authorization: Bearer {access_token}'
```

`GET /jobs`

This request returns a list of [jobs](#the-jobs-object) on the deployment.


#### Configuring the Response

##### Pagination

This request supports all the [pagination](#configuring-the-response-pagination) parameters.


##### Additional Fields and Linked Object

This request supports requesting additional fields and linked objects from the [jobs object](#the-jobs-object) using the
[`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).


##### Basic Filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| standing ||
| against_id ||
| against_type ||
| paused ||
| type | Filter by the `type_id` of the job. Deprecated, please use `job_type`. |
| job_type | Filter by the `job_type_id`. |
| manager | Filter by the `staff_id` of the job manager. |
| modified_by | Filter by the `staff_id` of the last staff member to modify the job. |
| status | Filter by the `status_id`. |
| rate | Filter by the `rate_id`. |
| affiliation | Filter by the `affiliation_id`. |


##### Date Filters

This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| dated_created |
| date_modified |
| date_started |
| date_commenced |
| date_due |
| date_completed |


##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| date_started |
| date_created |
| date_commenced |
| date_due |
| date_completed |
| date_modified |
| date_last_interacted |
| id |
| title |
| standing |
| status | Order by the `status_id`. |


##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| against_id ||
| type | Range by the `type_id`. Deprecated, please use `job_type`. |
| job_type | Range by the `job_type_id`. |
| manager | Range by the `staff_id` of the manager of the job. |
| affiliation | Range by the `affiliation_id`. |
| modified_by | Range by the `staff_id` of the last staff member to modify the job. |
| status | Range by the `status_id`. |
| rate | Range by the `rate_id`. |
| rate_charged ||
| contract | Range by the `contract_id` of any contract associated with the job. |
| plan_modified_by | Range by the `staff_id` of the last staff member to modify the job plan. |


##### Object Filters

This request supports the following [object filters](#filters-object-filters):

| Filter | Description |
|:-|:-|
| against | Filter by jobs against these objects. |


##### Searching

This request supports the [`_search`](#configuring-the-response-searching) filter to search over the following fields:

| Field |
|:-|
| title |


#### Handling the Response

The response will be a list of [job objects](#the-jobs-object) containing the default fields and any additional fields
requested through `_fields`, and displayed according to any pagination parameters, filters or searches used.







### Count Jobs
> Sample Request:  

```http
GET /api/v0/jobs/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/jobs/count \
  -H 'authorization: Bearer {access_token}'
```


`GET /jobs/count`

This request will return a count of jobs in a list defined by any available searches or filters. With no searches or
filters this will be a count of all jobs on the deployment. This request returns a single field:

| Field | Type | Value |
|:-|:-|:-|
| **count** | unsigned | A count of jobs listed. |







### List Recent Jobs
> Sample Request:  

```http
GET /api/v0/jobs/recent HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/jobs/recent \
  -H 'authorization: Bearer {access_token}'
```

`GET /jobs/recent`

This request returns a list of [job](#the-jobs-object) on the deployment, sorted by the most recently created, that is
in descending order of `date_created`.


#### Configuring the Response

The response to this response may be configured as per [`GET /jobs`](#list-jobs), although any [order filters](#filters-order-filters) 
used will have no impact on the response.


#### Handling the Response

This request will return a list of [job objects](#the-jobs-object) on the deployment with their default fields and any
additional fields requested through `_fields`, displayed in descending order of `date_created` and according to any
pagination parameters, filters, or searches used.







### List Latest Modified Jobs
> Sample Request:  

```http
GET /api/v0/jobs/newest HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/jobs/newest \
  -H 'authorization: Bearer {access_token}'
```

`GET /jobs/newest`

This request returns a list of [jobs](#the-jobs-object) on the deployment, sorted by the most recently modified, that
is, in descending order of `date_modified`.


#### Configuring the Response

The response to this response may be configured as per [`GET /jobs`](#list-jobs), although any [order filters](#filters-order-filters) 
used will have no impact on the response.


#### Handling the Response

This request will return a list of [job objects](#the-jobs-object) on the deployment with their default fields and any
additional fields requested through `_fields`, displayed in descending order of `date_modified` and according to any
pagination parameters, filters, or searches used.






### Get Job Type
> Sample request:  

```http
GET /api/v0/jobs/types/{job_type_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}

_fields=standing,has_custom_id
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/jobs/types/{job_type_id} \
  -H 'authorization: Bearer {access_token}' \
  -d '_fields=standing,has_custom_id'
```

`GET /jobs/types/{job_type_id}`

This request returns a [job type](#the-job-type) specified by its unique id.


#### Configuring the Response

This request supports requesting additional fields and linked objects from the job type object using the 
[`_fields`](#configuring-the-response-fields) parameter.


#### Handling the Response

The response will contain a single job type with its default fields and any additional fields requested through
`_fields`.





### List Job Types

> Sample request:  

```http
GET /api/v0/jobs/types HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}

_fields=standing,has_custom_id
_filters=standing(active)
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/jobs/types \
  -H 'authorization: Bearer {access_token}' \
  -d '_fields=standing,has_custom_id' \
  -d '_filters=standing(active)'
```

`GET /jobs/types`

This request returns a list of [job types](#the-job-type).

#### Configuring the Response

##### Pagination

This request supports all the [pagination](#configuring-the-response-pagination) parameters.


##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects from the job type using the 
[`_fields`](#configuring-the-response-fields) parameter.


##### Basic Filters

This request supports the following [basic filters](#filters-basic-filters):

| Filter |
|:-|:-|
| id |
| standing |


##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Field |
|:-|:-|
| id |
| title |
| standing |


##### Range Filters

This request supports [range filters](#filters-range-filters) over the following fields:

| Field |
|:-|
| id |


##### Searching

This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following
fields:

| Field |
|:-|
| title |


#### Handling the Response

The response will be a list of [job types](#the-job-type) with their default fields and any additional fields requested
through `_fields`, and displayed according to any pagination parameters, filters, or searches used.





### List Job Statuses (Beta)

> Sample request:

```http
GET /api/v0/jobs/statuses HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X GET \
  https://{deployment}.api.accelo.com/api/v0/jobs/statuses \
  -H 'authorization: Bearer {access_token}' \
```

`GET/jobs/statuses`

This request returns a list of job [statuses](#statuses).


#### Configuring the Response

##### Pagination

This request supports all the [pagination](#configuring-the-response-pagination) parameters.


##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects from the [status](#statuses) object using the
[`_fields`](#configuring-the-response-fields) parameter.


##### Basic Filters

This request supports the following [basic filters](#filters-basic-filters):

| Filter | Notes |
|:-|:-|
| id  | |
| title | |
| standing | |
| color | |


##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter | Notes |
|:-|:-|
| id | |
| title |  |
| standing |  |
| color |  |
| ordering |  |


##### Searching

This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following
fields:

| Field |
|:-|
| title |


#### Handling the Response

The response will be a list of [statuses](#statuses) with their default fields and any additional fields requested
through `_fields`, and displayed according to any pagination parameters, filters, or searches used.









### List Job Milestones
> Sample Request:  

```http
GET /api/v0/jobs/{job_id}/milestones HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/jobs/{job_id}/milestones \
  -H 'authorization: Bearer {access_token}'
```

`GET /jobs/{job_id}/milestones`

This request returns a list of [milestones](#milestones) of a job, specified by its `job_id`. This request is handled
and configured in the same way as [`GET /milestones`](#list-milestones).






### Update a Job
> Sample Request:

```http
PUT /api/v0/jobs/{job_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/jobs/{job_id} \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`PUT /jobs/{job_id}`

This request updates and returns a [job](#the-jobs-object), specified by its `job_id`.


#### Configuring the Job

The following fields from the [job object](#the-jobs-object) may be updated with this request:

| Filter Name | Notes |
|:-|:-|
| title ||
| engagement_table | The `against_type` for the job |
| engagement_id | The `against_id` for the job. |
| manager_id | The `staff_id` of the staff member to be assigned manager. |
| status_id | MUST point to a valid [job status](#the-job-status). |
| contract_id | The `contract_id` of a [contract](#contracts) to be linked to the job |
| affiliation_id | The `affiliation_id` of an [affiliation](#affiliations) to be linked to the job. |
| rate_id |
| rate_charged ||
| date_due ||
| date_created ||


#### Configuring the Response

This request supports requesting additional fields and linked resources from the [jobs object](#the-jobs-object) through
the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).


#### Handling the Response

The response will be the single, updated [job](#the-jobs-object) with its default fields and any additional fields
requested through `_fields`.







### Create a Job
> Sample Request:  

```http
POST /api/v0/jobs/ HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/jobs/\
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`POST /jobs`

This request creates and returns a new [job](#the-jobs-object).


#### Configuring the Job

The following fields may be set through this request:

| Filter Name | Notes |
|:-|:-|
| **engagement_table** | The `against_type` for the job. |
| **engagement_id** |The `against_id` for the job. |
| **manager_id** | The `staff_id` of the staff member to be assigned manager. This MUST point to a valid staff. |
| **type_id*** | MUST point to a valid [job type](#the-job-type). |
| title ||
| rate_id ||
| status_id | MUST point to a valid [job status](#the-job-status). |
| contract_id | The `contract_id` of a [contract](#contracts) to be linked to the job. |
| affiliation_id |  The `affiliation_id` of an [affiliation](#affiliations) to be linked to the job. |
| rate_charged ||
| date_due ||
| date_started ||
| date_created | If this is not sent it will default to the current time. |


#### Configuring the Response

This request supports requesting additional fields and linked resources from the [jobs object](#the-jobs-object) through
the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).


#### Handling the Response

The response will be the single, created [job](#the-job-object) with its default fields and any additional fields
requested through `_fields`.







### Delete a Job
> Sample Request:  

```http
DELETE /api/v0/jobs/{job_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/jobs/{job_id} \
  -H 'authorization: Bearer {access_token}'
```

`DELETE /jobs/{job_id}`

This request deletes a job from the deployment, specified by its `job_id`. This request takes no arguments and returns
no resources.






### List a Job's Profile Field Values
> See the [profiles section](#retrieve-a-list-of-profile-values) for a sample request

`GET /jobs/{job_id}/profiles/values`

This request returns a list of [profile values](#the-profile-value-object) of a [job](#the-job-object), specified by its
`job_id`. This is the request [`GET /{object}/{object_id}/profiles/values`](#retrieve-a-list-of-profile-values), where
the object is "jobs", and whose id is `{job_id}`.






### List all Profile Field Values on a Job
> See the [profiles section](#list-profile-values) for a sample request

`GET /jobs/profiles/values`

This request returns a list of all [profile field values](#the-profile-value-object) on [jobs](#the-job-object). This
is the request [`GET /{object}/profiles/values`](#list-profile-values), where the object is "jobs".






### List Jobs Profile Fields
> See the [profiles section](#retrieve-a-list-of-profile-fields) for a sample request

`GET /jobs/profiles/fields`

This request returns a list of [profile fields](#the-profile-field-object) available for jobs. This is the request 
[`GET/{object}/profiles/fields`](#retrieve-a-list-of-profile-fields) where the object is "jobs".






### Update a Profile Value on a Job
> See the [profiles section](#update-a-profile-value-link) for a sample request 

`PUT /jobs/{job_id}/profiles/values/{profile_value_id}`

This request updates and returns a [profile value](#the-profile-value-object), specified by its `profile_value_id`, of a
particular job, specified by it's `job_id`. This is the request 
[`POST/{object}/{object_id}/profiles/fields/{profile_field_id}`](#update-a-profile-value-link) where the object is "jobs", and
whose value is `{job_id}`.





### Set a Profile Value on a Job
> See the [profiles section](#create-a-profile-value-link) for a sample request

`POST /jobs/{job_id}/profiles/fields/{profile_field_id}`

This request sets and returns a [profile value](#the-profile-value-object) for a profile field, specified by its
`profile_field_id`, for a "job", specified by it's `job_id`. This is the request 
[`POST/{object}/{object_id}/profiles/fields/{profile_field_id}`](#update-a-profile-value-link) where the object is "jobs", and
whose value is `{job_id}`.






### List Job Extension Fields
> See the [extension section](#retrieve-a-list-of-extension-fields) for an example

`GET /jobs/extensions/fields`

This request returns a list of [extension fields](#the-extension-field-object) available for any [job](#the-job-object).
This is the request [`GET /{object}/extensions/fields`](#retrieve-a-list-of-extension-fields), where the object is
"jobs".







### List a Job's Extension Field Values
> See the [extension section](#retrieve-a-list-of-extension-field-values) for an example    

`GET /jobs/{job_id}/extensions/values`

This request returns a list of [extension values](#the-extension-value-object) for a [job](#the-job-object), specified
by its `job_id`. This is the request [`GET /{object}/{object_id}/extensions/values`](#retrieve-a-list-of-extension-field-values), 
where the object is "jobs", and whose id is the `job_id`.







### Update an Extension Field Value on a Job
> See the [extension section](#update-an-extension-value) for an example     

`PUT /jobs/{job_id}/extensions/values/{extension_value_id}`

This request updates the value of an [extension field value](#the-extension-value-object), specified by its
`extension_value_id`, of a [job](#the-job-object), specified by its `job_id`. This is the request 
[`PUT{object}/{object_id}/extensions/values/{extension_value_id}`](#update-an-extension-value), where the object is "jobs",
and whose id is `job_id`







### Set an Extension Field Value on a Job
> Sample Request:  

`POST /jobs/{job_id}/extensions/fields/{extension_field_id}`


This request sets and returns the value of an extension field, specified by its `extension_field_id`, of a job,
specified by its `job_id`. This request is the request
[`POST/{object}/{object_id}/extensions/fields/{extension_field_id}`](#create-an-extension-value) where our object is "jobs"
whose id is `job_id`.







### List Available Progressions on a Job
> See the [progressions section](#retrieve-a-list-of-available-progressions) for a sample request

`GET /jobs/{jobs_id}/progressions`

This request returns a list of available [progressions](#the-progression-object) for a [job](#the-job-object), specified
by its `job_id`. This is the request [`GET /{object}/{object_id}/progressions`](#retrieve-a-list-of-available-progressions) 
where the object is "jobs" whose id is `job_id`.







### Auto Run Progression on a Job
> See the [progressions section](#run-a-status-update-using-a-given-progression) for a sample request

`[POST|PUT] /jobs/{jobs_id}/progressions/{progression_id}/auto`

This request uses the given progression, specified by its `progression_id` to progress a [job](#the-job-object),
specified by its `jobs_id`. This is the request 
[`[POST|PUT]/{object}/{object_id}/progressions/{progression_id}/auto`](#run-a-status-update-using-a-given-progression) 
where theobject is "jobs" whose id is `job_id`.







### List a Job's Resource Collections
> See the [resources (attachments) section](#retrieve-an-array-of-collections-for-an-object) for an example

`GET /jobs/{job_id}/collections`

This request returns a list of [resource collections](#resources-attachments) against a [job](#the-job-object),
specified by its `job_id`. This is the request [`GET /{object}/{object_id}/collections`](#retrieve-an-array-of-collections-for-an-object) 
where the object is "jobs" and hose id is `{job_id}`.







### Upload a Resource (Attachment) to a Collection on a Job
> See the [resources (attachments) section](#upload-a-resource-to-a-collection-of-an-object) for an example   

`POST jobs/{job_id}/collections/{collection_id}/resources`

This request uploads a [resource](#resources-attachments) to a collection, specified by its `collection_id`, of a [job
](#the-job-object) specified by its `job_id`. This is the request 
[`POST/{object}/{object_id}/collections/{collection_id}/resources`](#upload-a-resource-to-a-collection-of-an-object) where the
object is "jobs" whose id is `{job_id}.`
