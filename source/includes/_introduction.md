# Introduction
Welcome to Accelo's Public REST API documentation. Here you will find resources and information to help you use the API.

**Developer Forum** - Connect with other developers on our [developer forum](https://community.accelo.com/c/dev-forum/6).
Use this space to ask any questions and report errors in the documentation.


## Registering your Application

Before doing anything, you will need to register your application with Accelo. This is
done from your deployment under "Configuration" → "API" → "Register Application". Accelo currently offers three types of
applications:

* Installed Application
* Web Application
* Service Application

**Note:** An application can only be registered with one type. If your application requires multiple types you will need to register multiple applications

Once registered, your application will be given a `client_id` and `client_secret`, which are required to [authenticate](#authentication).







## Accessing Resources
> For example, base URI for a company called "Planet Express":  

```example
https://planet-express.api.accelo.com/api/v0
```

Your Accelo deployment will be given a unique deployment (or hostname), from this we can form the URI for each resource,
which will have a form like:

`https://{deployment}.api.accelo.com/api/v0`

All resources may be called from this base URI:

`https://{deployment}.api.accelo.com/api/v0/{resource}`

> For example, accessing the "[Staff](#staff)" resource of "Planet Express":  

```example
https://planet-express.api.accelo.com/api/v0/staff
```


Keep in mind, for an installed or web application we will want to use the end-user's deployment, not the API's
deployment. Note, all authorization endpoints are accessed through the OAuth2.0 base URI, which is different from the
resource base URI, see the [authentication section](#oauth2-uri) for more information.

## Cipher Suites

In order to maintain security for Accelo and our customers, we may need to stop using old cipher suites; this could cause problems for users utilising older SSL/TLS libraries.
Before doing so we will ensure that this will not affect the majority of our users, and will work with those that would be impacted.

See the [following documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#fs-supported-policies) for technical details, as of 2023 we are using `ELBSecurityPolicy-FS-1-2-Res-2020-10`. 




## Response and Request Structure

> Sample request to return a list of [staff](#staff) as XML:  

```example
GET https://{deployment}.api.accelo.com/api/v0/staff.xml
```

By default, all resource requests return JSON `(application/json)`. You may also request the response in XML or YAML by
either setting the `Accept-Type` header to `text/xml` or `text/x-yaml`, or by appending the extension type to the end of
the request resource.

> Sample response with no suppression:  

```json
{
    "meta" : {
        "more_info": "https://affinitylive.jira.com/wiki/display/APIS/Status+Codes#ok",
        "status" : "ok",
        "message" : "Everything executed as expected."
    },
    "response" : { "..." }
}
```

> Sample failed response, here we requested a company by an id that doesn't exist:

```json
{
  "response": null,
  "meta": {
    "message": "The request could not be interpreted. This can be caused by missing or invalid data. Please ensure that the resource you are requesting actually exists.",
    "more_info": "https://affinitylive.jira.com/wiki/display/APIS/Status+Codes#invalid_request",
    "status": "invalid_request"
  }
}
```

### The Meta Object

Each request made will return two objects, a meta object, and a response object. The response object contains the
requested response data. The meta object contains the following:

| Field Name | Description |
|--|:-|
| status | A string representing the result of the request. |
| message | An explanation of the status | "Everything executed as expected" |
| more_info | A URL where more information regarding the current status may be found. |
| response code | HTTP status. Only visible when suppressing http status with `_suppress_http_status=yes`. See [here](#status-codes) for a list of possible response codes. |

> Sample response with \_suppress\_message=yes and \_suppress\_http\_status=yes

```json
{
    "meta" : {
         "status" : "ok",
         "response_code" : 200
    },
    "response" : { "..." }
}
```

The following parameters may be used to suppress parts, or all, of the meta response:

| Name | Description |
|:-|:-|
| \_suppress\_message | Suppresses `message` and `more_info`. |
| \_suppress\_http\_status | Forces HTTP status to 200 and stores the actual status in `response_code` |
| \_suppress\_meta | Suppresses all meta data. This is useful if you wish to purely utilize HTTP headers. |

They make take values of either "1" or "yes", for example to suppress all meta we could use `_suppress_meta=yes` or `_suppress_meta=1`.

### Default and Required Fields

A resource will only return a small number of fields by default, these fields will be in bold in the resource's table of
fields and linked objects. Similarly, POST request will generally require values for some fields, these fields will be
in bold within the endpoint's description.

The following parameter may be used to hide the default fields that would be returned in the response:

| Name | Description |
|:-|:-|
| \_hide\_defaults | Hides the default fields from the response. This is useful to reduce the size of the payload to just the fields you need. |






## Overriding the Request Method

We understand that certain types of requests are not always available to the client. In response to this we allow you to
override the request method using the `_method` parameter, this can take one of four values:

| Value | Description |
|:-|:-|
| get | Override the request type to be GET. |
| put | Override the request type to be PUT. |
| post | Override the request type to be POST. |
| delete | Override the request type to be DELETE. |

> For example, each of the following deletes the company with id 10:

```example
DELETE /companies/10
GET /companies/10?_method=delete
POST /companies/10?_method=delete
```






## JSON Content Types


Requests may also be sent as JSON. This can greatly simplify the client side implementation as it offers filters and
fields that translate well to programmatic structures. This may also be necessary when you wish to search or filter
using non-alphanumeric characters e.g "@", "." or special or accented characters e.g. "à", "ç", "ö".



### Parsing \_fields as JSON
> Translating "\_fields" from query to json, query:
`_fields=status(color),username,company(_ALL)`

> Equivalent JSON "\_fields" object:

```json
  "_fields": "status(color), username, company(_ALL)"
```

When sending JSON data with your request, the `"_fields"` key should hold a string of the desired fields and linked
objects, separated by a comma. For example, the query `_fields=status` would be equivalent to including `"_fields":
"status"` in the JSON body. The same method is used to request additional objects and their fields as for queries, the
"\_ALL" value also works as for queries..



### Parsing \_filters as JSON
> Example, converting a query list of filters to JSON:    
`_filters=id(12,13),date_created_after(1498175480),
rate_charged_greater_than(10),order_by_desc(status)
`




> Equivalent JSON "\_filters" object




```json
"_filters": {
  "id": [12, 13],
  "date_created_after": [1498175480],
  "rate_charged_greater_than": [10],
  "order_by_desc": ["status"]
}
```

Filters are sent through JSON bodies using the `_filters` key, which hold a hash of keys (filter names) and values (the
values to be filtered). For example applying the filter `_filters=id(12,13),status(3,1)` would be equivalent to
including in the value of `"_filters"` the pair `"id": [12,13], "status": [3,1]`. This basic key-value pairing works for
all filters outside of object filters.

> Example object filter query and json. Here we are using the against and referrer filters of issues.

```example
_filters=against(company(312,466),job(998)),referrer(prospect(42))
```

```json
{
  "_filters": {
    "against": [{
      "company": [312,466],
      "job": [998],
    }],
    "referrer": [{
      "prospect": [42]
    }]
  }
}
```

There are two ways to generate object filters though JSON bodies. The first is by simply building them from the
corresponding basic filters, for example the filter `against(company(32))` is equivalent to
`against_type(company),against_id(32)`, which can be parsed into JSON as shown above. The other is to build a nested
JSON object of the form `"<object_filter>": [{ "<object_type>": ["<object id>"] }]`.

### Parsing \_search as JSON

Parsing a search through `_search` in JSON is simply a matter of assigning a string to be searched to the key
"\_search". For example searching for a contact with name "Hubert Farnsworth" may be done in a query through
`_search=(Hubert+Farnsworth)`, or in a JSON request by adding `"_search": "Hubert Farnsworth"`.





## Rate Limiting

> Meta object for a 429 response:

```json
{
  "message": "Rate limit exceeded for planet-express.api.accelo.com",
  "status": "too_many_requests",
  "more_info": "api.accelo.com/docs/#rate-limiting"
}

```

Requests to the API will be limited to 5000/hour per deployment, this is to protect the quality of the service offered
by the API. Authentication or authorization requests (those made to `/oauth2` endpoints) will not be limited and will
not be counted against this limit. Requests made after exceeding this limit  will return a `429` error.

The following headers have also been added to track usage rates:

| Header | Type | Description |
|:-|:-|:-|
| X-RateLimit-Reset | unix ts | The time at which the current rate limit window resets. |
| X-RateLimit-Remaining | int | Number of requests remaining in the current rate limit window. |
| X-RateLimit-Limit | int | Maximum number of requests allowed in each rate limit window. |

