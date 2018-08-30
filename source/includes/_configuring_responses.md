# Configuring Responses

There are several tools available to configure the response from the API:

* [Pagination](#configuring-the-response-pagination)
* [Requesting Additional Fields and Linked Objects](#configuring-the-response-fields)
* [Searching](#configuring-the-response-searching)
* [Filtering](#configuring-the-response-filtering)

<a name="configuring-the-response-pagination"></a>

## Pagination

Accelo has the capacity to hold tens of thousands of resources. So, without being careful we could have a hard time
returning the required resources. Thankfully, the API also supports pagination to help us work through a resource list.
The available parameters are:

| Argument | Description |
|:-|:-|
| \_page | The page of result to retrieve. For example to retrieve the first page you would use `_page=0`, and for the 5th page, `_page=4`. The default is 0 |
| \_limit | The max number of resources to return. When combined with `_page`, this is the number of requests returned per page.  Default is 10, max is 50 |
| \_offset | The resource to return from. Default is 0, this will be overridden if `_page` is set. |






<a name="configuring-the-response-fields"></a>

## Requesting Additional Fields and Linked Objects

> Requesting companies with the "website" and "phone" fields, as well as the linked "postal_address" object and its
"city" field:

```http
GET /activities HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}

_fields=website,phone,postal_address(city)
```

```shell
curl -X GET \
	https://{deployment}.api.accelo.com/api/v0/activities \
	-H 'authorization: Bearer {access_token}' \
	-d '_fields=website,phone,postal_address(city)'
```

By default, each resource returns only the minimal required fields, these are displayed in the table describing the
object. To request additional fields we can use the `_fields` parameter. For example, the [company](#companies) object
has additional fields `website` and `phone`, to display these in a request response we would add
`_fields=website,phones` to our request. The keyword `_ALL` may be used to return all optional fields.

For linked objects (those marked as "unsigned or object") the `_fields` parameter may be used to request the linked
object by adding parenthesis to the field. For example, the company object contains a link to an [address](#addresses)
object under the `postal_address` field, to return this object with its default fields we add
`_fields=postal_address()`. Requesting optional fields from a linked object is done by including the fields within these
parenthesis, for example if we wanted the `city` field from within  the `postal_address` we would use
`_fields=postal_address(city)`, here the `_ALL` keyword would return all optional fields from the `postal_address`
object. If a linked object is request without the parenthesis, e.g. `_fields=postal_address` then the unique identifier
for the object will be returned. This process also supports nesting, for example if we wish to return the `country`
object from within the `postal_address` object here we would use `_fields=postal_address(country())`.



### Breadcrumbs

Breadcrumbs give identifying information on the parent object(s) of the object requested. They may be requested through
`_fields=breadcrumbs`. Requesting breadcrumbs will return an array of breadcrumb objects, these contain the following
fields:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | The unique identifier of the parent object. |
| **table** | string | The type of the parent object. |
| **title** | string | The title of the parent object. |

For example if a [job](#jobs) is created against a [company](#companies), then the job will have a single breadcrumb
containing information on the company. If a [task](#tasks) is then created against that job the task will have two
breadcrumbs, one identifying the job and another identifying the company. Breadcrumbs are always displayed in ascending
order, so the direct parent will be displayed first, then its parent, an so on.






<a name="configuring-the-response-searching"></a>

## Searching

Some requests support the use of the `_search` parameter to search through certain fields and display only results
satisfying the search. For example, the `GET /contacts` request supports this filter over the `firstname`,
`surname`,`mobile` and `email`, so `_search=kurt+wagner` would display any contacts where "kurt" and "wagner" is found
in the first name, surname, mobile or email. Another available search method is through the
[search filter](#search-filters).








<a name="configuring-the-response-filtering"></a>

## Filtering

Most API endpoints support a `_filter` parameter that allows you to filter the response. The supported filters will be
listed for each endpoint, in general there are several types of filters:

* [Basic Filters](#filters-basic-filters)
* [Date Filters](#filters-date-filters)
* [Range Filters](#filters-range-filters)
* [Order Filters](#filters-order-filters)
* [Empty Filters](#filters-empty-filters)
* [Object Filters](#filters-object-filters)
* [Search Filters](#search-filters)

Filters may take any number of arguments, new arguments may be separated by a comma. Appending `_not` to any filter will
return results that DO NOT satisfy the filter, e.g. `standing_not(active)` would return only results whose standing is
not 'active'. Any number of filters may be [combined](#filters-combining-filters) in a single request.

<a name="filters-basic-filters"></a>

### Basic Filters

> Example request, filter activities by those owned by a staff member:

```http
GET /activities HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}

_filters=owner_type(staff)
```

```shell
curl -X GET \
	https://{deployment}.api.accelo.com/api/v0/activities \
	-H 'authorization: Bearer {access_token}' \
	-d '_filters=owner_type(staff)'
```

These simply filter resources with certain fields for certain values, generally
they are requested simply by `<field>(<value>)`. For examples,
 [activities](#activities) support basic filters on the `owner_type` and
 `owner_id` fields, so for example if we wanted to search for activities
 owner by the staff member with id 17 we would use
 `_filters=owner_type(staff),owner_id(17)`.





<a name="filters-date-filters"></a>

### Date Filters

> Filter activities by those created after 2017-03-22 00:00:00 (UTC)

```http
GET /activities HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}

_filters=date_created_after(1490140800)
```

```shell
curl -X GET \
	https://{deployment}.api.accelo.com/api/v0/activities \
	-H 'authorization: Bearer {access_token}' \
	-d '_filters=date_created_after(1490140800)'
```

Many endpoints contain fields representing dates, such as `date_created` under [activities](#activities). Date fields
are express as unix timestamps (for brevity we will just use the shorter "unix ts"). The API supports filtering for may
of these "date_fields" through the following filters:

| Filter | Description |
|:-|:-|
| \<date_field\>_before(\<date\>) | Filter by results whose value of `<date_field>` is less than the `<date>` value (expressed as a unix ts). |
| \<date_fields\>_after(\<date\>) | Filter by results whose value of `<date_field>` is greater than the `<date>` value (expressed as a unix ts). |

<a name="filters-range-filters"></a>





### Range Filters

> Filter activities with and id greater than 17:

```http
GET /activities HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}

_filters=id_greater_than(17)
```

```shell
curl -X GET \
	https://{deployment}.api.accelo.com/api/v0/activities \
	-H 'authorization: Bearer {access_token}' \
	-d '_filters=id_greater_than(17)'
```

These are similar to [Date Filters](#filters-date-filters) except they operate on non-date fields. For a given "field"
there are four range filters defined:

| Filter | Description |
|:-|:-|
| \<field_name\>_greater_than(\<value\>) | Filter by results that have a value for `<field>` greater than `<value>`. |
| \<field_name\>_less_than(\<value\>) | Filter by results that have a value for `<field_name>` less than `<value>`. |
| \<field_name\>_greater_than_or_equal(\<value\>) | Filter by results that have a value for `<field_name>` greater than or equal to `<value>`. |
| \<field_name\>_less_than_or_equal(\<value\>) | Filter by results that have a value for `<field_name>` less than or equal to `<value>`.|






<a name="filters-order-filters"></a>

### Order Filters

> Filter activities by descending order of id:

```http
GET /activities HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}

_filters=order_by_desc(id)
```

```shell
curl -X GET \
	https://{deployment}.api.accelo.com/api/v0/activities \
	-H 'authorization: Bearer {access_token}' \
	-d '_filters=order_by_desc(id)'
```

These change of the order in which the response is displayed, they are not strictly filters in that they will not
exclude any objects from the response, but they are called using `_filters` so we shall list them here. By default a
response will be sorted in ascending order of the `id` of the objects requested. For a given "field" there are two order
filters defined:

| Filter | Description |
|:-|:-|
| order_by_asc(\<field\>) | Order the results in ascending value of `<field>`.|
| order_by_desc(\<field\>) | Order the results in descending value of `<field>`.|






<a name="filters-empty-filters"></a>

### Empty Filters

> Filter contracts with an empty date_expires:

```http
GET /activities HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}

_filters=empty(date_expires)
```

```shell
curl -X GET \
	https://{deployment}.api.accelo.com/api/v0/activities \
	-H 'authorization: Bearer {access_token}' \
	-d '_filters=empty(date_expires)'
```

These filter resources which have no value for the given field, the format is `empty(<field_name>)`. For example, the
`date_expires` field for [contract](#contracts) supports this filter, so `_filters=empty(date_expires)` would display
all contracts without an expiry date.






<a name="filters-object-filters"></a>

### Object Filters

> Filter activities owned by "staff/17"

```http
GET /activities HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}

_filters=owner(staff(17))
```

```shell
curl -X GET \
	https://{deployment}.api.accelo.com/api/v0/activities \
	-H 'authorization: Bearer {access_token}' \
	-d '_filters=owner(staff(17))'
```

These are an extension of basic filters that allow for more compact filtering over entire objects, they take both an
object and an id as arguments. For example, [activities](#activities) support object filtering on the "owner" object. As
we saw previously we could specify activities by a certain staff member using `_filters=owner_type(staff),owner_id(17)`
we may achieve the same using the `owner` object filter on activities, `_filters=owner(staff(17))`.

As with other filters, additional arguments for both fields may be added and separated by a comma, for example
`_filters=owner(staff(17,13),affiliation(22)` would show all activities owned by the staff with id 17 or 13, or owned by
the [affiliation](#affiliations) with id 22.








### Search Filters
>Filter contacts by "kurt wagner"

```http
GET /contacts HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}

_filters=search(kurt wagner)
```

```shell
curl -X GET \
	https://{deployment}.api.accelo.com/api/v0/contacts \
	-H 'authorization: Bearer {access_token}' \
	-d '_filters=search(kurt wagner)'
```

This filter is similar to the [searching](#searching) parameter and supports the same requests available to that
parameter. Automatically this filter will append an `AND` between multiple search requirements. Search terms are
separated by `,` or any space. Some characters e.g. `(,)` and `,` will be ignored using this filter whereas these are
accepted by `_search`.  It will search through the available fields and only return results that satisfy the search. This
filter expands on the searching parameter by allowing the use of `_OR`. For example, the `GET /contacts` request
supports search over `firstname`, `surname`, `mobile`, and `email` so if we wanted to find contacts with "kurt" or
"wagner" in any of the listed fields we could use `_filters=_OR(search(kurt),search(wagner))`.






<a name="filters-combining-filters"></a>

### Combining Filters

> Filter by activities owned by "staff/17" and created after 2017-03-22 00:00:00 (UTC)
> and _not_ against a job

```http
GET /activities HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}

_filters=owner(staff(17)),date_created_after(1490140800),against_type_not(job)
```

```shell
curl -X GET \
	https://{deployment}.api.accelo.com/api/v0/activities \
	-H 'authorization: Bearer {access_token}' \
	-d '_filters=owner(staff(17)),date_created_after(1490140800),against_type_not(job)'
```

Any combination of filters may be used to filter response, this is achieved by separating them with a comma. More
flexible filter combinations may be achieved through the `_AND` and `_OR` keywords. For example, if instead of the above
we wanted to search for activities owned by the specific staff OR created after the given date we could use
`_filters=_OR(staff(17),date_created_after(1490140800))`. As expected, the original filter is equivalent to
`_filters=_AND(staff(17),date_created_after(1490140800))`.These keywords may also be nested, for example if we wanted
all activities created by the given staff member, or after a given date and before another date we could use
`_filters=_OR(staff(17),_AND(date_created_after(1490140800),date_created_before(1490140800)))`.

If the same filter is used more than once in a combination only the final instance of the filter will be used. For
example `_filters=_OR(staff(10),staff(11))` will just filter by staff with id 11, here the simple filter
`_filters=staff(10,11)` should be used.
