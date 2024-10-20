## Rates
> Resource URI:  
`/api/v0/rates`

Rates define the hourly rate paid for work done. They may be set up and modified from the deployment, see the [support documentation](https://help.accelo.com/faq/setup-rates/) for information.

### The Rate Object
> Example rate object:

```json
{
  "object": "staff,issue,job,milestone,contract_period",
  "standing": "active",
  "charged": "175.00",
  "title": "Consulting",
  "id": "6"
}
```

The rate object contains the following:

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the rate. |
| **title** | string | A name for the rate. |
| charged | decimal | The hourly rate for this rate. |
| standing | select | Either "active" or "inactive", the standing of the rate. |
| object | string | A list of objects this rate is applicable to. |







### Get Rate
> Sample Request:  

```http
GET /api/v0/rates/{rate_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/rates/{rate_id} \
  -H 'authorization: Bearer {access_token}'
```

`GET /rates/{rate_id}`

This request returns a [rate](#the-rate-object) specified by its `rate_id`.

#### Configuring the Response
This request supports requesting additional fields and linked objects from the [rate object](#the-rate-object) using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response
The response will be the single [rate](#the-rate-object) with its default fields and any additional fields requested through `_fields`.







### List Rates
> Sample Request:  

```http
GET /api/v0/rates HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/rates \
  -H 'authorization: Bearer {access_token}'
```

`GET /rates`

This request returns a list of [rates](#the-rate-object) on the deployment.

#### Configuring the Response

##### Pagination
This request supports all the [pagination](#configuring-the-response-pagination) parameters.

##### Additional Fields and Linked Objects
This request supports requesting additional fields and linked objects from the [rate object](#the-rate-object) using the [`_fields`](#configuring-the-response-fields) parameter.

#### Handling the Response
The response will be a list of [rates](#the-rate-object) with the default fields and any additional fields requested through `_fields`, displayed according to any pagination parameters used.







### Count Rates
> Sample Request:  

```http
GET /api/v0/rates/count HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deployment}.api.accelo.com/api/v0/rates/count \
  -H 'authorization: Bearer {access_token}'
```

`GET /rates/count`

This request will return a count of rates in a list defined by any available searches or filters. With no searches or filters this will be a count of all rates on the deployment. This request returns a single field:

| Field | Type | Description |
|:-|:-|:-|
| **count** | unsigned | A count of rates listed. |
