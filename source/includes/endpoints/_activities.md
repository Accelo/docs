## Activities
Activities hold communications to and from your Accelo deployment, such as client communication, meetings, and notes. See the [support documentation](https://www.accelo.com/resources/help/guides/user/activities-and-tasks/activities-notes-and-emails/) for more information on activities.

> Resource URI:  
`api/v0/activities`

The Activity object is complex and contains some special objects:  

* [Activity Medium](#activity-medium)  
* [Activity Visibility](#activity-visibility)  
* [Activity Classes](#the-activity-class)  
* [Activity Priorities](#the-activity-priority)  
* [Activity Threads and Parents](#activity-threads-and-parents)  
* [Activity Interactions](#activity-interactions)
* [Time Allocations](#the-time-allocation-object)

### The Activity Object
> Sample activity object:

```json
{
  "subject": "Support Request via Accelo The website has become unresponsive",
  "nonbillable": "0",
  "class": "1",
  "rate_charged": "0.00",
  "time_allocation": "0",
  "against_id": "32",
  "date_created": "1495762476",
  "against_type": "request",
  "date_ended": null,
  "staff": "14",
  "task": "0",
  "activity_priority": "3",
  "owner_id": "14",
  "parent": "activities/0",
  "details": "Request from jack.black@jack-and-co.com",
  "against": "request/32",
  "body": "Your home page is timing out?",
  "visibility": "all",
  "id": "1053",
  "owner": "staff/14",
  "thread": "activities/1053",
  "owner_type": "staff",
  "rate": "0",
  "date_logged": "1495762476",
  "billable": "0",
  "date_modified": "1495762476",
  "date_started": null,
  "confidential": 0,
}
```

The activities object contains the following fields:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The activity's unique identifier. |
| **subject** | string | String describing the content of the activity. 
| **confidential** | boolean (0 or 1) | The flag indicates whether the activity has been marked as confidential to the current user. Confidential activities are returned but the content of the subject and body is replaced with a confidential placeholder. You can use this flag to determine whether or not the content has been covered up. If 1, then it has been replaced and the subject and body will be something like "Confidential activity sent to: Bob, Alice". Otherwise 0 indicates the body and subject are returned in full. Don't confuse this with the "visibility" attribute. |
| parent_id | unsigned | The unique identifier of the parent activity, returns "0" if the activity has no parent. |
| thread | string | If the activity is part of the response set to another activity, this will be a string describing the original activity, as outlined [below](#activity-threads-and-parents) e.g. "activity/346". Otherwise this will be the current activity. |
| parent | string | API URI of the parent activity object of the request activity, returns "/activities/0" if the activity has no parent. Example "/activities/347" |
| thread_id | unsigned | The unique identifier of the thread activity. |
| against_type | string | The type of the object that the activity is against. |
| against_id | unsigned | The unique identifier of the object the activity is against. |
| against | string | API URI of the object the activity is against. |
| owner_type | string | The type of the owner object of the activity. |
| owner_id | unsigned | The unique identifier of the owner object of the activity. |
| owner | string | API URI of the object representing the owner of the activity.|
| medium | string | The [activity medium](#activity-medium). |
| body | string | The main plaintext content of the activity. |
| preview_body | string | A preview of the plaintext body. This is the first 250 characters only. |
| html_body | string | The main content of the activity as HTML. For example, for plain text activities, newlines will be replaced with line breaks (`<br>`). For rich text activities, complete HTML will be returned. |
| visibility | string | The [activity visibility](#activity-visibility). |
| details | string | Additional details assigned to an activity. For meetings and postals this is used to store the location/address. For calls this is used to store the number. |
| date_created | unix ts | The date the activity was created. |
| date_started | unix ts | The date the activity was started. For meetings this is the scheduled start date of the meeting, for other activities it is the date time was logged, returns null otherwise. |
| date_ended | unix ts | For meetings, the scheduled end date of the meeting. |
| date_logged | unix ts | **Read only** takes the value of `date_started`, if this is not set then it takes the value of `date_created`. |
| date_modified | unix ts | The date the event was last modified. |
| billable | unsigned | Amount of billable time logged for the activity, in seconds. |
| nonbillable | unsigned | Amount of non-billable time logged for the activity, in seconds. |
| staff | unsigned or object | The [staff](#staff) member that has logged time on the event.|
| priority | unsigned or object | **Deprecated**, please use `activity_priority` |
| activity_priority | unsigned or object | The [priority](#the-activity-priority) of the activity. |
| class | unsigned or object | The activity's [class](#the-activity-class). The default is "1" |
| task | unsigned or object | The [task](#tasks) the activity is against. Returns null if there is no task against the activity. |
| time_allocation | unsigned or object | The [time allocation](#the-time-allocation-object) for the activity. |
| rate | unsigned or object | The [rate](#rates) charged for any billable time logged against the activity. |
| rate_charged | unsigned | The rate at which billable time was charged, this is part of the rate object. |
| tag | array of objects | A list of [tags](#tags) associated with the activity. |
| standing | select | The standing of the activity, may be one of "unapproved", "approved", "invoiced", "locked", or empty.|
| invoice_id | unsigned | The unique identifier of the [invoice](#invoices) the activity is attached to, if any. |
| contract_period_id | unsigned | The unique identifier of the [contract period](#the-contract-period) the activity is attached to, if any. |

#### Activity Medium
Activities are communicative objects, e.g. notes and emails. The type of communication is described by the "medium", Accelo currently supports five types of media for activities:  

| Name | Description |
|:-|:-|
| Note | Notes are internal messages as well as a way to log time. |
| Email | Emails to contacts or colleagues. |
| Meeting | Allows you to invite contacts or colleagues to a meeting. |
| Call | Useful for recording the notes from a phone call. |
| Postal | Log information about letters or packages you have sent to contacts, such as package tracking numbers. |


#### Activity Visibility
Activities also have a visibility associated with them, which determines how they are viewed by others. The visibility of an activity can be set to one of three values:

| Visibility | Description |
|:-|:-|
| Private | Only you can see this Activity. Completely hides all traces of an activity from other users. |
| Confidential | Hides full content of this activity and replaces with the word "Confidential". Other users see that a Confidential Activity has occurred on the date but will see no other details. |
| All | Displays full content of this activity to all users. |

#### The Activity Class
Classes are an additional field for further describing Activities, you may add or remove classes from your deployment through the configuration menu, this process is outlined in the Accelo [support documentation](https://www.accelo.com/resources/help/guides/user/activities-and-tasks/activities-notes-and-emails/set-up-and-customize/classes/). By default your Accelo deployment will have three classes:


| Class | Description |
|:-|:-|
| Client Work | For activities related to client projects. |
| Sales | For activities related to sales or account management. |
| Internal | For activities related to improving business processes, or business administration activities. |

The class object for activities will contain the following:

> Sample JSON of an activity class:

```json
"class": {
  "id": "1",
  "title": "Client Work",
  "parent": "0",
  "status": "active"
}
```

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the class. |
| **title** | string | A name for the class. |
| parent | unsigned | The unique identifier of the parent class, if there is no parent class this will be "0". |
| status | select | The status of the class, either "active" or "inactive". |

**Note:** This object does not support the `_ALL` argument with [`_fields`](#configuring-the-response-fields)

#### The Activity Priority
> Sample JSON of an activity priority:

```json
{
  "id": "3",
  "title": "Medium",
  "level": "3"
}
```
The activity priority describes the urgency of a given activity, it contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the priority. |
| **title** | string | A name for the priority. |
| level | integer | A number representing the urgency, by default 1 is "extreme", 5 is "none"  |

**Note:** This object does not support the `_ALL` argument with [`_fields`](#configuring-the-response-fields)

#### Activity Threads and Parents

> Activity threads and parents:  

```example
              |------activities/57
activities/56 |
              |------activities/59------activities/62
```
Naturally, we expect these communicative objects to build off each other, for example a single email may be responded to by several other emails, which may in turn have their own responses. To keep track of these we use the `thread` and `parent` objects. The `thread` object tracks the original activity in the thread the current activity is in response to, and the `parent` object tracks the activity that the current activity is in direct response to.


We will describe these with an example. Imagine an email is sent out as `activities/56`, then this email is responded to by two new emails `activities/57` and `activity/59`, imagine further that the email `activities/59` is responded to by another email, `activities/62`. In this case, each activity will have a `thread` of `activities/56`, `activities/57` and `activities/59` will have a `parent` of `activities/56`, and `activities/62` will have a parent of `activities/59`.

##### The Activity Thread Object
> Sample JSON of an activity thread object:

```json
"id": 1041,
"event_text": "created a note",
"activities": [
  {
    "subject": "Time Entry",
    "id": "1041"
  }
],
"total_activities": "1"
```

Activity threads are described by the thread object, this contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The unique `activity_id` of the original activity in the thread. |
| **event_text** | string | A description of the original activity in the thread, for example "created a note" or "sent an email". |
| **activities** | array | An array containing the most recent [activity](#the-activity-object) in the thread. |
| **total_activities** | integer | A count of the number of activities in the thread. |


#### Activity Interactions
In the context of activities, an interaction is a recipient or sender of an activity, this will either be a staff, or affiliation or contact object. An activity can have several interactions; an email may be sent to several staff members and an affiliation. The form of interactions, and the way they are handled vary depending on the context, thus we deal with each case individually:  

1. [Interactions with a list of activities](#get-activities-handling-interacts)   
2. [List of interactions with a single activity](#get-activities-id-interacts)

#### The Time Allocation Object
When an activity includes logging time the time logged is described by the time allocation object, this contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the time allocation. |
| against | string | The object the time is logged against, in the form "`{object}/{object_id}`". |
| standing | string | The standing of the logged time. |
| billable | integer | The amount of billable time logged, in seconds. |
| nonbillable | integer | The amount of nonbillable time logged, in seconds. |
| charged | decimal | The rate charged for billable work. |
| comments | string | Any comments made against the logged time. |
| date_locked | unix ts | The date the activity was locked, that is, when the logged time was approved for invoicing. |
| date_created  | unix ts | The date the time was logged. |







### Get Activity
`GET /activities/{activity_id}`

> Sample request:  

```http
GET /api/v0/activities/41 HTTP/1.1
HOST: {deployment}.api.accelo.com
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer {access_token}

_fields=against,owner
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/activities/41 \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d '_fields=against,owner'
```
If successful, this request returns an activity identified by its `activity_id`.

#### Configuring the Response
this request supports requesting additional fields and linked objects from the [activity object](#the-activity-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

#### Handling the Response
The response will be the [activity](#the-activity-object) with its default fields and any additional fields requested through `_fields`.

> Sample response, excluding meta:

```json
{
  },
  "response": {
    "subject": "Update on last week's work",
    "id": "41",
    "owner": "staff/22",
    "against": "affiliations/69"
  }
}
```






### List Activities
`GET /activities`

> Sample request:  

```http
GET /api/v0/activities HTTP/1.1
HOST: {deployment}.api.accelo.com
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer {access_token}

_fields=body,staff(),medium
_filters=date_created_after(1485495266),order_by_desc(id)
_limit=2
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/activities
  -H 'authorization: Bearer {access_token}' \
  -H 'content_type: application/x-www-form-urlencoded' \
  -d '_fields=body,staff(),medium' \
  -d '_filters=date_created_after(1485495266),order_by_desc(id)' \
  -d '_limit=2'
```

This request will return a list of activities on the Accelo deployment.

#### Configuring the Response


##### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [activity object](#the-activity-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

##### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| parent_id ||
| thread_id ||
| against_type ||
| against_id ||
| owner_id ||
| owner_type ||
| medium ||
| visibility ||
| staff | Filter by the `staff_id` of any staff who have logged time against the activities. |
| priority | **Deprecated**, please use `activity_priority` |
| activity_priority | Filter by the `priority_id` of the activities. |
| class | Filter by the `class_id` of the activities. |
| task | Filter by the `task_id` of any tasks the activities are against. |
| time_allocation | Filter by the `time_allocation_id`. |



##### Date Filters
> Sample response:

```json
{
  "meta":{
    "status": "ok",
    "message": "Everything executed as expected.",
    "more_info": "https://affinitylive.jira.com/wiki/display/APIS/Status+Codes#ok"
  },
"response":[
  {
    "subject:": "Progress with our New Client",
    "id": "1003",
    "body": "",
    "staff": {
      "id": "14",
      "surname": "Hughes",
      "firstname": "Matthew"
    },
    "medium": "note"
  },
  {
    "subject:": "Discussing Our Project",
    "id": "998",
    "body": "",
    "staff": {
      "id": "14",
      "surname": "Hughes",
      "firstname": "Matthew"
    },
    "medium": "email"
  }
]
}
```

This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| date_created |
| date_started |
| date_ended |
| date_logged |
| date_modified |


##### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| date_started |
| date_created |
| date_ended |
| date_modified |
| id |
| billable |
| nonbillable |

##### Range Filters
This request supports [range filters](#filters-range-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| against_id ||
| thread | Range over the `thread_id`. |
| owner | Range over the `owner_id`. |
| staff | Range over the `staff_id`. |
| priority | **Deprecated**, please use `activity_priority` |
| activity_priority | Range over the `priority_id`. |
| class | Range over the `class_id`. |
| task | Range over the `task_id`. |

##### Object Filters
This request supports [object filters](#filters-object-filters) over the following linked object:

| Filter Name | Description |
|:-|:-|
| owner | Filter by activities owned by these objects. |
| against | Filter by activities against these objects. |

#### Handling the Response
The response will be a List of [activities](#the-activity-object) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters or filters used.

#### Handling Interacts
> Sample response, here we are looking at the interactions of a single activity.

```json
"response": {
  "affiliations": [
    {
      "email": "matthew--hughes@hotmail.com",
      "id": "98",
      "mobile": null
    }
  ],
  "staff": [
    {
      "id": "14",
      "surname": "Hughes",
      "firstname": "Matthew"
    }
  ],
  "activities": [
    {
      "id": "1015",
      "subject": "A test email",
      "interacts": [
        {
          "type": "to",
          "owner_name": "Hubert Farnsworth",
          "date_actioned": "1493254821",
          "email": "hfarnsworth@plentexpress.com",
          "id": "2052",
          "owner_type": "affiliation",
          "owner_id": "98"
        },
        {
          "owner_id": "14",
          "id": "2053",
          "email": "matthewhughes934@gmail.com",
          "owner_type": "staff",
          "date_actioned": "1493254821",
          "owner_name": "Matthew Hughes",
          "type": "from"
        }
      ]
    }
  ]
},
```


We can investigate the interactions associated with a list of activities via the special field `interacts`. Given a list of activities, we may investigate the associated interactions by including `_fields=interacts`. **Note:** if this field is requested the structure of the response is altered. The response will contain three arrays, one labeled "activities", one labeled "[staff](#staff)", and one labeled "[affiliations](#affiliations)". The objects in the "activities" array will be [activity objects](#the-activity-object) with the addition of an array labeled "interacts". Each interact here contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned int | Unique identifier for the interact. |
| **date_actioned** | unix ts | The date the interact actioned the activity (if actioned) |
| **type** | string | The type of the interaction, one of: "creator", "from" "to", "cc", "bcc", "attendee", "did_not_attend" |
| **owner_id** | unsigned int | The owner's unique id. This will correspond to the id of either a `staff` or `affiliation` object. |
| **owner_type** | string | The type of owner, either "staff" or "affiliation". |
| **owner_name** | string | The firstname and surname of the owner. |
| **email** | string | The e-mail associated with the owner. |


That is, each activity has an interaction where each interaction identifies an owner (either a staff or affiliation) and recipient(s), if available. The arrays "staff" and "affiliations" contain these owners or recipients, so we can readily identify who interacted with a given activity, and how.








### Count Activities
> Sample request, here we request the response as xml

```http
GET /api/v0/activities/count.xml HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://al-interns.api.accelo.com/api/v0/activities/count.xml \
  -H 'authorization: Bearer {access_token}'
```

`GET /activities/count`

> Sample response:

```xml
<data>
    <response count="1013" />
</data>
```
This request will return a count of activities in a list defined by any available searches or filters. With no searches or filters this will be a count of all activities on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned int | A count of the activities listed. |








### List Interactions

```http
GET /api/v0/activities/{activity_id}/interacts HTTP/1.1
HOST: {deployment}.api.accelo.com
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer {access_token}
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/activities/{activity_id}/interacts \
  -H 'authorization: Bearer {access_token}'
```

`GET /activities/{activity_id}/interacts`

This request returns an array of activity interactions for the activity identified.

> Sample response:

```json
"response": {
  "staff": [
    {
      "interact": {
        "date_actioned": "1493254821",
        "type": "from",
        "id": "2053"
      },
      "firstname": "Matthew",
      "surname": "Hughes",
      "id": "14"
    }
  ],
  "contacts": [
    {
      "surname": "Farnsworth",
      "id": "94",
      "email": "hfarnsworth@planetexpress.com",
      "mobile": null,
      "interact": {
        "date_actioned": "1493254821",
        "type": "to",
        "id": "2052"
      },
      "firstname": "Hubert"
    }
  ]
}
```

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [staff](#the-activity-object) and [contact](#the-contact-object) objects using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response
The response will contain two arrays:

| Name | Description |
|:-|:-|
| staff | Array of staff objects that have an interaction against the activity. |
| contacts | Array of contact objects that have an interaction against the activity. |

The staff and contact objects returned will contain their default fields, plus any fields added via the `_fields` parameter, as well as a `interact` object containing:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The unique identifier of the interaction. |
| **date_actioned** | unix ts | The date the interact actioned the activity (if actioned) |
| **type** | string  | The type of the interaction, one of: "creator", "from" "to", "cc", "bcc", "attendee", "did_not_attend" |

**Note** this request returns a [contact](#contacts) object, rather than [affiliation](#affiliations) object as in the case of `GET /activities?_fields=interacts`. These objects are closely linked, please see the section for either object to view a description of this relationship.








### Count Interactions
> Sample request:

```http
GET /api/v0/activities/{activity_id}/interacts/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer {access_token}
```

```shell
curl -X -get \
  https://{deployment}.api.accelo.com/api/v0/activities/{activity_id}/interacts/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /activities/{activity_id}/interacts/count`

> Sample response  

```json
"response": {
  "count": "2"
}
```
This request will return a count of activity threads in a list defined by any available searches or filters. With no searches or filters this will be a count of all interactions against the activity. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned int | A count of the activity interactions listed against the activity identified. |








### Get Time Allocated
> Sample Request:  

`GET /activities/allocations`

```http
GET /api/v0/activities/allocations HTTP/1.1
HOST: {deployment}.api.accelo.com
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer {access_token}
```

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/activities/allocations \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded'
```

This request returns information on timed logged and the value charged against a collection of activities.

> Sample response:  

```json
"response": {
  "nonbillable": "3600",
  "billable": "1660",
  "charged": "21.26"
}
```


#### Configuring the Response
An aggregation that returns the sum of time allocation information from a set of activities. To filter the activities consumed, you may use the same filters supported by [`GET /activities`](#list-activities).

#### handling the Response
The response will contain the following fields describing the allocations for the activities:

| Field | Type | Description |
|:-|:-|:-|
| billable | unsigned | Total billable time, in seconds, for all activities found. |
| unbillable | unsigned | Total unbillable time, in seconds, for all activities found. |
| charged | double | The total charged for all billable hours. |







### Update an Activity
`PUT /activities/{activity_id}`

> Sample request, we wish to update and return the priority field:

```http
PUT /api/v0/activities/{activity_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer {access_token}

priority=4
_fields=activity_priority()
```

```shell
curl -X put \
  https://{deployment}.api.accelo.com/api/v0/activities/1002 \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'priority_id=3' \
  -d '_fields=activity_priority()'
```
This request will update, and return, the identified activity.

#### Configuring the Activity
The following fields from the [activity object](#the-activity-object) may be updated through this request:

| Field | Conditions |
|:-|:-|
| subject | Updating this is only possible if the user executing the request is the owner. |
| body | Updating this is only possible if the user executing the request is the owner. |
| medium | Type of activity to create. This can be: note, meeting, report, email, call, postal, fax, sms, twitter or event_log. |
| visibility | Updating this is only possible if the user executing has an interaction with the activity. |
| details | Additional details assigned to an activity. |
| priority_id | The unique identifier of the [priority](#the-activity-priority) to be linked to the activity.|
| class_id | The unique identifier of the [class](#the-activity-class) to be linked to the activity.|
| message_id | A custom message id to be given to the activity.|
| date_started | Seconds since UTC |
| date_ended | Seconds since UTC |
| date_due |Seconds since UTC |

> Sample response:  

```json
"response": {
  "subject": "A note on my schedule",
  "id": "1002",
  "activity_priority": {
    "title": "Low",
    "id": "4"
  }
}
```

#### Configuring the response
This request supports requesting additional fields and linked objects from the [activity object](#the-activity-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

#### Handling the Response
The response will be the single, updated [activity](#the-activity-object) with its default fields and any additional fields requested through `_fields`.







### Create an Activity
`POST /activities`

> Sample request, here we send the data as json:

```http
POST /api/v0/activities HTTP/1.1
HOST: {deployment}.api.accelo.com
Content-Type: application/json
Authorization: Bearer {access_token}

{
  "against_id": "14"
  "against_type": "staff"
  "subject": "Conference Schedule Update"
  "priority_id": "1"
}

```
```shell
curl -X post \
  https://{deployment}.api.accleo.com/api/v0/activities \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/json' \
  -d '{
    "against_id": "14"
    "against_type": "staff"
    "subject": "Conference Schedule Update"
    "priority_id": "1"
  }'
```

This request will create, and return, a new [activity](#the-activity-object) on the deployment.

#### Configuring the Activity
Values for the following fields may be set through this request.

| Field | Notes |
|:-|:-|
| **subject** | Activity's subject that will appear in the title of the activity. |
| **against_id** | The id of the against_table object, the activity is linked against. This will default to the current user's id. |
| **against_type** | The object the activity is linked against. This can be: affiliation, annex, campaign, account_invoice, campaign_action, component, contract, contract_period, deployment, event, invoice, issue, job, membership, prospect, request, task or staff. This will default to staff. |
| body | The content of the activity. |
| medium | Type of activity to create. This can be: note, meeting, report, email, call, postal, fax or sms. This will default to note. |
| owner_type | The activity can be owned by a staff member or an affiliation. The owner defaults to the current user |
| owner_id | Owner's id. i.e, the staff or affiliation id of owner_table. |
| visibility | Defaults to `private` unless you are POSTing from a service application, in which case it defaults to `all`.|
| details | Additional details assigned to an activity. For meetings and postals this is used to store the location/address. For calls this is used to store the number. |
| priority_id | The unique identifier of the [priority](#the-activity-priority) to be linked to the new activity. |
| class_id | The unique identifier of the [class](#the-activity-class) to be linked to the new activity. |
| thread_id |The unique identifier of the [thread](#the-activity-thread-object) to be linked to the new activity. |
| task_id | The unique identifier of the [task](#tasks) to be linked to the new activity. |
| parent_id | The unique identifier of the parent activity of the new activity. |
| message_id | A custom message id to be given to the new activity. |
| date_started | Seconds since UTC |
| date_ended | Seconds since UTC |
| date_due | Seconds since UTC |
| file | A file you would like to add as an attachment to the new activity (Requires "multi-part/form-data") |
| send_invites | Only applicable if `medium` is set to "meeting". Either "true" or "false", whether invitations are enabled or not. Defaults to "false". |
| nonbillable | Requires the owner is a staff member. |
| billable | As above, but also requires the activity is against an [issue](#issues), [job](#jobs-projects), [milestone](#milestones), [contract](#contracts), or [period](#contract-periods)|
| block_send | `1` or `0`, whether to block sending the activity. Defaults to `0`, so the activity will be sent if it is eligible. |


#### Including "to", "cc" and "bcc" Interactions
> Sample json request segment to add interactions. In this case we would create an activity to staff with id 10, cc'ing affiliations 13 and 14 and bcc'ing the email recipient "bcc-recipient@affinitylive.com".

```json
{
  "..."
  "to": {
    "staff": [10]
  },
  "cc": {
    "affiliation": [13,14]
  },
  "bcc": {
    "emails": "bcc-recipient@affinitylive.com"
  }
}
```

We can create interactions with our activity by sending our request as JSON (see the [introduction](#json-content-types) for information on sending JSON requests) and including the following objects:

| Object Name | Description |
|:-|:-|
| to | Anyone to whom the activity is directed. |
| cc | Anyone to whom the activity should be cc'd.  |
| bcc | Anyone to whom the activity should be bcc'd|

Each object accepts a staff or affiliation (identified by their id) or a general email.

#### Logging time

The billable and nonbillable attributes require that you supply a staff owner (owner_type and owner_id) otherwise no time allocation is created against the new activity. i.e, the user who the time belongs to.

#### Logging time against a task

To log an activity against a task, you should pass in the task's against_id and against_type as the new activity's against_id and against_type. Essentially you are creating an activity against the object the task is against.

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [activity object](#the-activity-object) using the [`_fields`](#configuring-the-response-fields) parameter. This request also supports [breadcrumbs](#configuring-the-response-breadcrumbs).

#### Handling the Response
The response will be the new [activity](#the-activity-object) with its default fields and any additional fields requested through `_fields`








### Delete Activity
> Sample Request:  

```http
DELETE /api/v0/activities/{activity_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer {access_token}
```

```shell
curl -X delete \
  https://{deployment}.api.accelo.com/api/v0/activities/{activity_id} \
  -H 'authorization: Bearer {access_token}'
```
`DELETE /activity/{activity_id}`

This request will delete the activity identified by its `activity_id`. This request takes no parameters and returns no resources.







### List Activity Threads
> Sample Request:  

```http
GET /api/v0/activities/threads HTTP/1.1
HOST: {deployment}.api.accelo.com
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer {access_token}
```

```shell
curl -X get \
  http://{deployment}.api.accelo.com/api/v0/activities/threads \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded'
```


`GET /activities/threads`

This request returns a list of [activity threads](#the-activity-thread-object).

#### Configuring the Response

##### Pagination
This request supports all of the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [activity object](#the-activity-object) using the [`_fields`](#configuring-the-response-fields) parameter.

##### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

> Sample response of a single thread:  

```json
{
  "activities": [
    {
      "subject": "Redesign update",
      "id": "280"
    }
  ],
  "event_text": "replied by email",
  "id": 278,
  "total_activities": "3"
}
```

| Filter Name | Notes |
|:-|:-|
| against_type | Return only threads whose original activity was against an object of this type. If this is provided, `against_id` must also be provided. |
| against_id | Return only threads whose original activity was against an object with this id. If this is provided, `against_type` must also be provided. |
| staff_involved | Filter by the `staff_id` the staff member(s) who have interacted with activities within the thread. |
| scope | Takes either "internal" or "external" as arguments, whether the thread is external, such as emails from clients, or internal, such as notes. |

##### Date Filters
This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| date_logged_after | Filter by threads that have activities with `date_logged` after this time. |
| date_logged_before | Filter by threads that have activities with `date_logged` before this time. |

#### Handling the Response
The response will be a list of [activity threads](#the-activity-thread-object), displayed according to any pagination parameters or searches used. The activity listed under the `activities` array of the thread will be displayed with its default fields and any additional fields requested through `_fields`.







### Count Activity Threads
> Sample Request:  

```http
GET /api/v0/activities/threads/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
  http://{deployment}.api.accelo.com/api/v0/activities/threads/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /activities/threads/count`

This request will return a count of activity threads in a list defined by any available searches or filters. With no searches or filters this will be a count of all activity threads. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of the number of activity threads listed. |







### List Activities in a Thread
> Sample request:  

```http
GET /api/v0/activities/threads/280 HTTP/1.1
HOST: {deployment}.api.accelo.com
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer {access_token}

_fields=thread,parent
```

```shell
curl -X get \
  http://{deployment}.api.accelo.com/api/v0/activities/threads/280 \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d '_fields=thread,parent'
```

`GET /activities/threads/{thread_id}`

This request returns a list of activities in a thread, identified by its `thread_id`. This request may be configured and handled in the same way as [`GET /activities`](#list-activities).

> Sample response:

```json
"thread": {
  "event_text": "replied by email",
  "total_activities": "3",
  "activities": [
    {
      "thread": "activities/278",
      "parent": "activities/279",
      "subject": "Redesign update",
      "id": "280"
    },
    {
      "id": "279",
      "parent": "activities/278",
      "subject": "Redesign update",
      "thread": "activities/278"
    },
    {
      "id": "278",
      "thread": "activities/278",
      "subject": "Redesign update",
      "parent": "activities/0"
    }
  ],
  "id": "278"
}
```

This request returns a list of activities in a thread, identified by its `thread_id`. This request may be configured and handled in the same way as [`GET /activities`](#get-activities).
