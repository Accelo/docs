## Referrals
> Resource URI:
`/api/v0/referrals`

Referrals provide a link between an object and the object it was created from. An example of this would be a job that has been created from a prospect.

### The Referral Object
> Example referral object:

```json
{
	"id": "29",
	"referrer_id": "88",
	"referrer_type": "job",
	"against_id": "84",
	"against_type": "issue",
	"updated_by": "1",
	"date_updated": "1448519478",
	"created_by": "2",
	"date_created": "1448519478",
}
```

The referrals object contains the following:

| Field | Type | Description |
|:- |:- |:- |
| **id** | unsigned | A unique identifier for the referral. |
| referrer_id | unsigned | The id of the object which made the referral. |
| referrer_type | string | The type of the object which made the referral. eg. 'prospect'. |
| against_id | unsigned | The id of the object which was created via referral. |
| against_type | string | The type of the object which was created via referral. eg. A 'job' which was created via a 'prospect'. |
| updated_by | unsigned | The id of the staff member who last updated this referral. |
| date_updated | unix ts | The date that this referral was last updated. |
| created_by | unsigned | The identifier of the user who created the referral. |
| date_created | unix ts | The date that the referral was created. |








### Get Referral
> Sample Request:

```http
GET /api/v0/referrals/{id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/referrals/{id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /referrals/{id}`

This request returns a single [referral](#the-referral-object), specified by its `id`.

#### Configuring the Response

This request supports requesting additional fields and linked objects from the [referral](#the-referral-object)
using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response

The response will be the single requested [referral](#the-referral-object) with its default fields and any
additional fields requested through `_fields`.





### List Referrals
> Sample Request:

```http
GET /api/v0/referrals HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/referrals \
  -H 'authorization: Bearer {access_token}'
```

`GET /referrals`


This request returns a list of [referrals](#the-referrals-object) on the deployment.

#### Configuring the Request

##### Pagination

This request accepts all the standard [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects

This request supports requesting additional fields and linked objects using the [`_fields`](#configuring-the-response-
fields) parameter.

##### Basic Filters

This request supports [basic filters](#filters-basic-filters) over the following fields:

| Filter Name |
|:-|
| id |
| against_type |
| against_id |
| referrer_type |
| referrer_id |
| created_by |
| updated_by |
| probability |
| standing |

##### Date Filters

This request supports [date filters](#filters-date-filters) over the following fields:

| Filter Name |
| :- |
| created |
| updated |

##### Order Filters

This request supports [order filters](#filters-order-filters) over the following fields:

| Filter Name |
|:-|
| date_created |
| date_updated |

#### Handling the Response

The response will be a list of [referrals](#the-referrals-object) on the Deployment, with their default fields and
any additional fields requested through `_fields`, and displayed according to any pagination parameters, filters, or
searches used.






### Count Referrals
> Sample Request:

```http
GET /api/v0/referrals/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/referrals/count \
  -H 'authorization: Bearer {access_token}'
```


`GET /referrals/count`

This request will return a count of [referrals](#the-referrals-object) defined by any available searches of filters.
With no searches or filters this will be a count of all referrals on the deployment. This request returns a single field.

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of referrals listed. |