## Requests
> Resource URI:
`/api/v0/requests`

These allow you to track request from clients sent to your shared company addresses, such as "@support" or "@sales" addresses. See the [support documentation](https://www.accelo.com/resources/help/learn-the-basics/tickets-and-requests/request-basics/) for more information on requests.

### The Request Object
> Sample request object:

```json
{
  "thread_id": "1039",
  "id": "31",
  "source": null,
  "standing": "pending",
  "request_priority": "1",
  "date_created": "1494823725",
  "date_modified" : "123456789",
  "type_id": "2",
  "claimer": "23",
  "body": "This is a support request, it is urgent!",
  "title": "Urgent support request",
  "priority_id": "1",
  "type": "2",
  "affiliation_id": "77",
  "lead_id": "0",
  "affiliation": "77",
  "claimer_id": "23"
}
```

The request object contains the following:

| Field | Types | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the request. |
| **title** | string | A name for the request. |
| body | string | The body of the request. |
| standing | select | The standing of the request ,may be either "pending", "open", "converted", or "closed". |
| source | string | Either "email" or `null`, whether the source of the request was an external email. |
| lead_id | unsigned | A unique identifier for the sender, if they are a lead. If a request comes from an unknown sender they will be marked as a "lead". |
| thread_id | unsigned | The unique identifier of the [activity thread](#the-activity-thread-object) the request is associated with. |
| date_created | unix ts | The date the request was created. |
| date_modified | unix ts | The date the request was last updated. |
| type_id | unsigned | The unique identifier of the [request type](#the-request-type). |
| type | unsigned or object | The [request type](#the-request-type). |
| priority_id | unsigned | The unique identifier of the [request priority](#the-request-priority). |
| priority | unsigned or object | **Deprecated**, please use `request_priority` |
| request_priority | unsigned or object | The [request priority](#the-request-priority). |
| claimer_id | unsigned | The unique identifier of the [staff](#staff) who has claimed the request. |
| claimer | unsigned or object | The [staff](#staff) member who has claimed the request. |
| affiliation_id | unsigned | The unique identifier of the [affiliation](#affiliations) associated with the request. |
| affiliation | unsigned or object | The [affiliation](#affiliations) associated with the request. |
| conversion_type | unsigned or object | The module type that the request was converted to, for example Prospects (Sales), Issues (Tickets), Jobs (Projects) |
| conversion_id | unsigned | The ID of the module where the request was converted to. |

#### The Request Type
> Example request type object:

```json
{
  "unresolved_count": "21",
  "id": "2",
  "subscribed": 0,
  "status": "active",
  "title": "Support"
}
```

The request type object allows you to assign a type to each request, making them easier to track and categorize. By default there are two types "support" and "sales", you may set up as many different types as you like from your deployment, see the [support documentation](https://www.accelo.com/resources/help/guides/user/inbox-and-requests/request-inbox/setup-and-configuration/) for more information. This object contains the following:

| Fields | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the request type. |
| **title** | string | A name for the request type. |
| standing | select | The standing of the request type, either "active" or "inactive". |

#### The Request Priority
Issue priorities help you keep track of what needs to be done. They may be set up from the deployment, they contain the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the priority. |
| **title** | string | A name for the priority. |
| color | select | The color of the priority when displayed on the deployment. The colors, in order of increasing urgency a "grey", "blue", "green", "orange", "red". |
| factor | unsigned | A number representing the urgency of the priority. 5 is "Extreme", 1 is "None". |

#### Request Threads
> Sample request thread:

```json
{
  "title": "Urgent support request",
  "date_last_responded": 1494823725,
  "id": 31,
  "date_created": "1494823725",
  "number_of_activities": 1,
  "senders": [
    {
      "id": 77,
      "type": "affiliation"
    }
  ],
  "thread_id": 1039,
  "standing": "pending",
  "date_latest_external_interaction": 1494823725,
  "claimer": {
    "type": "staff",
    "id": 23
  },
  "type": {
    "id": 2,
    "type": "request_type"
  },
  "body": "This is a support request, it is urgent!",
  "affiliation": {
    "type": "affiliation",
    "contact": {
      "type": "contact",
      "id": 77
    },
    "id": 77,
    "company": {
      "id": 54,
      "type": "company"
    }
  }
}
```

Since request are communications made from the deployment, they each have an associated activity. We can then track the communication made on a request as a thread of activities, although we want a bit more information than is given in [activity threads](#the-activity-thread-object); the request thread contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **thread_id** | unsigned | The unique `activity_id` of the original request. |
| **id** | unsigned | The id of the request. |
| **title** | string | As in the [request object](#the-request-object). |
| **body** | string | As in the [request object](#the-request-object). |
| **standing** | select | As in the [request object](#the-request-object). |
| **number_of_activities** | integer | The number of activities in the thread. |
| **date_created** | unix ts | as in [the request object](#the-request-object). |
| **date_last_responded** | unix ts | The date of the latest response to the request (from either the client or a staff member). |
| **date_last_external_interaction** | unix ts | the date of the last interaction on the request by a client. |
| **claimer** | object | An object describing the claimer of the request, this object contains a "type" field, describing the type of object, and an "id" field giving its identifier. |
| **type** | object | The [request type](#the-request-type) of the request. |
| **senders** | array | An array of senders of the original request, each defined by a "type" an an "id". |
| **affiliation** | object | As in the [request object](#the-request-object). |

#### Request Thread Unresponded Counts
> Example object:

```json
{
    "subscribed": 1,
    "unresolved_count": "22",
    "id": "2",
    "title": "Support",
    "status": "active"
}
```

These objects track the number of unresponded requests against each request type, they may be requested with [request threads](#request-threads), see the [list threads request](#list-unresponded-counts). The unresponded counts object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| id | unsigned | The unique identifier for the request type. |
| title | string | The name of the request type. |
| status | string | The standing of the request as in the [type object](#the-request-type). |
| unresolved_count | unsigned | A count of unresolved requests of the given type. |
| subscribed | boolean | Either "1" or "0", whether the user has subscribed to the given request type through their preferences. |







### Get Request
> Sample Request:

```http
GET /api/v0/requests/{request_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/requests/{request_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /requests/{request_id}`

This request returns a [request](#the-request-object) specified by its `request_id`.

#### Configuring the Response
This request supports requesting additional fields and linked from the [request object](#the-request-object) using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response
The response will be the single [request](#the-request-object) with its default fields and any additional fields requested through `_fields`.







### List  Requests
> Sample Request:

```http
GET /api/v0/requests HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/requests \
  -H 'authorization: Bearer {access_token}'
```

`GET /requests`

This request returns a list of [requests](#the-request-object) on the deployment.

#### Configuring the Response

##### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [request object](#the-request-object) using the [`_fields`](#configuring-the-response-fields) parameter.

##### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| id ||
| standing ||
| affiliation | Filter by `affiliation_id`. |
| type | Filter by the `type_id`. |
| priority | **Deprecated**, please use `request_priority` |
| request_priority | Filter by the `priority_id`.|
| lead | Filter by the `lead_id`. |
| claimer_id ||

##### Date Filters
This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| date_created |
| date_modified |

##### Order Filters
This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name
|:-|
| id |
| date_created |
| date_modified |

##### Range Filters
This request supports [range filters](#filters-range-filters) over the following fields:

|| Notes |
|:-|:-|
| id |
| type | Range over the `type_id`. |
| progressed_by | Range over the `staff_id` of the last staff member to progress the standing of the request. |
| lead | Range over the `lead_id`. |
| affiliation | Range over the `affiliation_id`. |
| priority | **Deprecated**, please use request_priority |
| request_priority | Range over the `affiliation_id`. |

#### Searching
This request supports the [`_search`](#configuring-the-response-searching) parameter to search over the following fields:

| Field |
|:-|
| title |

#### Handling the Response
The response will be a list of [requests](#the-request-object) with their default fields and any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or searches used. s







### Count Requests
> Sample Request:

```http
GET /api/v0/requests/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/requests/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /requests/count`

This request will return a count of requests in a list defined by any available searches or filters. With no searches or filters this will be a count of all requests on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of requests listed. |







### List Request Threads
> Sample Request:

```http
GET /api/v0/requests/threads HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/requests/threads \
  -H 'authorization: Bearer {access_token}'
```

`GET /requests/threads`

This request returns a list of [request threads](#request-threads) on the deployment.

#### Configuring the Response

##### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters.

##### Basic Filters
This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name | Notes |
|:-|:-|
| standing ||
| request_type_id | Filter by the `type_id`. |
| interact_from_staff | Filter by the `staff_id` of staff who have interacted with the request. |

##### Date Filters
This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
|:-|
| date_created |

##### Boolean Filters
this request also supports a special kind of filter, the boolean filter. These filters take boolean arguments, the supported filters are:

| Filter Name | Notes |
|:-|:-|
| request_is_claimed | Filter by whether or not a request is claimed. |
| show_inactive_type | Whether or not to show requests from inactive types. By default these are not shown. |
| order_by_date_created | Whether to order in ascending order of `date_created`. |
| order_by_desc_latest_external_interaction | Whether to order in ascending order of `date_last_external_interaction`. |

##### List Unresponded Counts

> Sample request:

```http
GET /api/v0/requests/threads  HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}

_include_unresponded_counts = 1
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/requests/threads \
  -H 'authorization: Bearer {access_token}' \
  -d '_include_unresponded_counts = 1'
```

This request also supports a flag, `include_unresponded_counts` which may be either '0' or '1'. If set to '1' this returns an additional array, `unresponded_counts`

#### Handling the Response
The response will be an array of [request threads](#request-threads) labeled "requests", and an array of linked objects labeled "linked_objects". The "linked_objects" array is an array of objects linked to the requests in the "requests" array. Any filters used will be applied to the elements of the "request" array.






### List Request Types (Beta)
> Sample Request:

```shell
curl -X get \
  https://{deployment}.api.accelo.com/api/v0/requests/types \
  -H 'authorization: Bearer {access_token}' \
```

```http
GET /api/v0/requests/types HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

`GET /requests/types`

This request returns a list of `request_type` objects, which contain the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the object. |
| **title** | string | A title for the object. |
| **status** | select | Either "active" or "inactive" the status of the type.|
| **unresolved_count** | integer | A count of unresolved requests of this type on the deployment. |
| **subscribed** | boolean 1/0 | Whether the current user is subscribed to this request type. |

Note this is different to the [request type](#the-request-type) object.

#### Handling the Response
This request does not accept pagination, filtering, or searching. The response will be a list of `request_type` objects on the deployment.




### Update a Request
> Sample Request:

```http
PUT /api/v0/requests HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/requests \
  -H 'authorization: Bearer {access_token}'
  -H 'Content-Type: application/x-www-form-urlencoded'
```


`PUT /requests/{request_id}`

This request updates and returns a [request](#the-request-object) identified by its `request_id`.

#### Configuring the Request
Values for the following fields may be updated through this request:

| Field Name |
|:-|
| title |
| body |
| type_id |
| lead_id |
| affiliation_id |
| priority_id |
| source |
| standing |
| claimer_id |

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [request object](#the-request-object) using the [`_fields`](#configuring-the-response-fields) parameter

#### Handling the Response
The response will be the single, updated [request](#the-request-object) with its default fields and any additional fields requested through `_fields`.







### Create a Request
> Example request:

```shell
curl -post \
  https://al-interns.api.accelo.com/api/v0/requests \
  -H 'authorization: Bearer {access_token}' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'title=I%20request%20support%20your%20website' \
  -d 'body=how%20do%20I%20use%20it%3F' \
  -d 'type_id=2' \
  -d 'affiliation_company_name=Jack%20and%20Co.' \
  -d 'affiliation_company_phone=%2B13%203234%202324' \
  -d 'affiliation_contact_firstname=Jack' \
  -d 'affiliation_contact_surname=Black' \
  -d 'affiliation_email=jack.black%40jack-and-co.com' \
  -d 'affiliation_phone=64%20444%20444%20444'
```

> Request using JSON:

```shell
curl -X post \
  https://al-interns.api.accelo.com/api/v0/requests \
  -H 'authorization: Bearer H3idpjeiXO9FaS4C5IA3phXnYQYCT5bVmJRXruVCcpb7PdApC5K8Rrss-mO17wPi' \
  -H 'content-type: application/json' \
  -d '{
      "type_id": 2,
      "title": "The website has become unresponsive",
      "body": "Your home page is timing out?",
      "affiliation": {
          "contact" : {
              "firstname": "Jack",
              "surname": "Black"
           },
           "company": {
               "name": "Jack and Co.",
               "phone": "+13 3234 2324"
           },
           "email": "jack.black@jack-and-co.com",
           "phone": "64 444 444 444"
      }
  }'
```


`POST /requests`

This request creates and returns a [request](#the-request-object). Since a request requires an affiliation, and request may not necessarily come from known contacts, using this request you may also create a contact/affiliation, [see](#handling-a-lack-of-affiliation).

#### Configuring the Request
The following fields may be set through this request:

| Field Name | Notes |
|:-|:-|
| **title** ||
| **body** ||
| **type_id** ||
| affiliation_id | If an `affiliation_id` is not available please follow the proceeding steps. |
| priority_id ||
| source | May either be "email" or "null". |
| lead_id ||

#### Handling a Lack of Affiliation
If no [affiliation](#affiliations) data is available we will attempt to link the given data to a known affiliation, otherwise we will create one. There are three minimum sets of information we can use to create an affiliation:

1. [A firstname and a surname](#requests-first-method)
2. [A firstname and a company name](#requests-second-method)
3. [An email address](#requests-third-method)

<a name="requests-first-method"></a>
##### Given a Firstname and a Surname
If an affiliation exists which exactly matches these two names, we will link it. Otherwise, we will create a company and contact with the name "`firstname` `surname`", and then create an affiliation to link the two.

<a name="requests-second-method"></a>
##### Given a Firstname and a Company Name
If there is no match the company name, a new company with this name will be used, then a contact under this company will be created using the firstname supplied, finally an affiliation will be created to link the two.

<a name="requests-third-method"></a>
##### Given an Email Address
If there is no match, we will attempt to extract a name from the email provided. Next, a company will be made with the provided email as the name, then a contact will be made under this company, whose name would be the name extracted from the email. Finally an affiliation would link the two.

The following fields may be used to send this information:

> Create a new request without an affiliation:
> <a name="create-request-json-example"></a> The JSON method

```json
{
    "type_id": 2,
    "subject": "The website has become unresponsive",
    "title": "Your home page is timing out?",
    "affiliation": {
        "contact" : {
            "firstname": "Jack",
            "surname": "Black"
         },
         "company": {
             "name": "Jack and Co.",
             "phone": "+13 3234 2324"
         },
         "email": "jack.black@jack-and-co.com",
         "phone": "64 444 444 444"
    }
}
```

| Field Name |
|:-|
| affiliation_email |
| affiliation_phone |
| affiliation_contact_id |
| affiliation_contact_firstname |
| affiliation_contact_surname |
| affiliation_company_id |
| affiliation_company_name |
| affiliation_company_phone |

You may also send contact and company information as a JSON payload. Ensure that the content type is set to `application/json` in this case. [For example](#create-request-json-example) here we have created a contact, company and affiliation in handling a request.

#### Configuring the Response
The request supports requesting additional fields and linked objects from the [request object](#the-request-object) using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response
The response will be the new, single, [request](#the-request-object) with its default fields and any fields requested through `_fields`.
