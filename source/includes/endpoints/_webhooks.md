## Webhooks
> Resource URI:  
`api/v0/webhooks`

Webhooks allow you to build integrations that subscribe to specific Accelo events. Once an event is triggered, we will
HTTP POST a payload to your registered callback URL containing event meta data and a resource URL. The resource URL can
be used by your application to query the individual resource that fired the event. This is commonly referred to as
Notification Webhooks.

There's currently no limit on webhooks and they can be installed per deployment from an individual users account using
the webhooks control panel. See [our blog](https://www.accelo.com/resources/updates/2016-nov-27-dec-3/#webhooks) for
more information, and how to access webhooks on the deployment. We do enforce a 10 second timeout rule. If your trigger
URL takes more than 10 seconds to respond to webhook delivery, we will cancel the request. If this occurs too many
times, we will delete your webhook subscription automatically.

### Webhook Subscriptions

#### Webhook Events

When subscribing to webhooks you choose an event that you would like to receive payloads for. Each event corresponds to
a certain set of actions on a per object basis. The available events are:

| event_id | Description |
|:-|:-|
| assign_task | Any time a [task](#tasks) assignee changes. |
| unassign_task | Any time a [task](#tasks) is unassigned. |
| create_task | Any time a [task](#tasks) is created. |
| create_invoice_pdf | Anytime an [invoice](#invoices) PDF is created.|
| create_purchase_pdf | Any time a [purchase](#purchases) PDF is created. |
| create_quote | Anytime a new [quote](#quotes) is created|
| create_request | Any time a new [request](#requests) is created. |
| update_request_status | Any time a request status changes. |
| create_issue | Any time an [issue](#issues) is created. |
| update_issue | Any time an [issue](#issues) is updated. |
| create_contact | Any time a [contact](#contacts) is created. |
| update_contact | Any time a [contact](#contacts) is updated. |


##### Progression Webhooks

[Progression webhooks](https://www.accelo.com/resources/blog/product-priorities-update-q2-of-2017/#progressionwebhooks)
allow you to subscribe to changing statuses for companies, contacts,  prospects, jobs, issues and contracts. Currently
you can only do this from  the web application's administration page but there are plans to expose this  functionality
to the API.

![Add Webhook Progression Button](../images/screenshots/add-progression-webhook-button-annotated.png)
[Create Progression Action Button]

![Add Webhook Progression Form](../images/screenshots/add-progression-webhook-form.png)
[Create Progression Webhook Form]


#### Payloads

The payload sent to the callback URL will contain the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the object changed. |
| **resource_url** | string | The full URL of the object changed. |


#### Delivery Headers

As well as the information in the [payload body](#payloads), the headers of HTTP request sent to  the payload URL will
contain special headers:

| Header | Description |
|:-|:-|
| X-Accelo-Event | The `event_id` of the event that triggered the delivery. For example "assign_task". |
| X-Hub-Signature | HMAC hex digest of the payload using your configured subscriptions secret. |


#### The Webhook Subscription

The webhook subscription object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **content_type** | select | Either "application/x-www-form-urlencoded" or "application/json", the content type POSTed to the trigger url. |
| **event_id** | string | One of the [events](#webhook-events) listed above. |
| **trigger_table** | string | The type of object that triggers the subscription. |
| **trigger_type** | string | A string representing the type of trigger, either "create" or "update".  |
| **trigger_url** | string | The callback, or payload URL to which the payload is sent. |
| **user_deployment** | string | The user's deployment in the form `{deployment}`. |
| **user_id** | unsigned | The current user's unique identifier, that is, their `staff_id`. |


#### Webhook Subscription Types

Each webhook subscription is of a certain type, defined by the following fields from the [webhook subscription object](#webhook-subscriptions):

| Field |
|:-|
| **event_id** |
| **event_title** |
| **trigger_table** |
| **trigger_type** |


#### Unsubscribing

Your integration can tell Accelo to automatically unsubscribe by responding with a HTTP Status Gone 410. The dispatcher
will respect this and instantly remove the subscription that caused the webhook trigger. Alternatively you can use the
[delete subscription endpoint](#delete-webhook-subscription) mentioned below.







### List Webhook Subscriptions
> Sample Request:  

```http
GET /api/v0/webhooks/subscriptions HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/webhooks/subscriptions \
  -H 'authorization: Bearer {access_token}'
```

`GET /webhooks/subscriptions`

This request returns a list of [webhook subscriptions](#webhook-subscriptions) for the current user. This request takes
no parameters.







### List Webhook Subscription Types
> Sample Request:  

```http
GET /api/v0/webhooks/subscriptions/types HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/webhooks/subscriptions/types \
  -H 'authorization: Bearer {access_token}'
```

`GET /webhooks/subscriptions/types`

This request returns a list of  available [webhook subscription types](#webhook-subscription-types). This request takes
no parameters.







### Create Webhook Subscription
> Sample Request:  

```http
POST /api/v0/webhooks/subscriptions HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
Content-Type: application/x-www-form-urlencoded
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/webhooks/subscriptions \
  -H 'authorization: Bearer {access_token}' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

`POST /webhooks/subscriptions`

This request creates and returns a [webhook subscription](#webhook-subscriptions) for the current user. This request
takes no parameters to configure the response.

#### Configuring the Subscription
The following fields may be set through this Sample Request:  

|| Notes |
|:-|:-|
| **trigger_url** ||
| **event_id** ||
| content_type ||
| secret | Optional secret that we will use to generate a HMAC hex digest of the payload. The digest will be included in the triggered requests "X-Hub-Signature" header. |







### Delete Webhook Subscription
> Sample Request:  

```http
DELETE /api/v0/webhooks/subscriptions/{subscription_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/webhooks/subscriptions/{subscription_id} \
  -H 'authorization: Bearer {access_token}'
```

`DELETE /webhooks/subscriptions/{subscription_id}`

This request deletes a webhook subscription, identified by its `subscription_id`. It takes no parameters and returns no
resources.







### Trigger a Webhook Subscription
> Sample Request:  

```http
POST /api/v0/webhooks/subscriptions/{subscription_id}/trigger HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/webhooks/subscriptions/{subscription_id}/trigger \
  -H 'authorization: Bearer {access_token}' \
```

`POST /webhooks/subscription/{subscription_id}/trigger`

This request manually triggers a given subscription, identified by its `subscription_id`.  This will queue the event to
all other subscriptions and execute asynchronously. Use this if you want to trigger a subscription for an event for
others, otherwise see [dispatch a webhook subscription](#dispatch-a-webhook-subscription). This request takes the
following parameter:

| Field | Type | Description |
|:-|:-|:-|
| **object_id** | unsigned | The unique identifier of the object, of type `trigger_table`, to trigger the subscriptions. |


#### Handling the Response

This request returns nothing to the user.







### Dispatch a Webhook Subscription
> Sample Request:  

```http
POST /api/v0/webhooks/subscriptions/{subscription_id}/dispatch HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \ 
 https://{deployment}.api.accelo.com/api/v0/webhooks/subscriptions/{subscription_id}/dispatch \
  -H 'authorization: Bearer {access_token}' \
```

`POST /webhooks/subscriptions/{subscription_id}/dispatch`

This request manually dispatches a given subscription, identified by its `subscription_id`. This will dispatch
synchronously, and unlike triggering, this will only execute the current subscription so other subscriptions of the
event will not be affected. As this is performed synchronously you will get the HTTP status of the webhook result. This
request takes the following parameter:

| Field | Type | Description |
|:-|:-|:-|
| **object_id** | unsigned | The unique identifier of the object, of type `trigger_table` to run the dispatch on. |

#### Handling the Response
The response will contain a single field:

| Field | Type | Description |
|:-|:-|:-|
| **status** | integer | The http status of the webhook result. |
