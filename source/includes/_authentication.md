# Authentication

Accelo's API uses the OAuth 2.0 protocol and provides routines that cover web, service and installed application's authorization and authentication. It supports authorization code grants and client credential grants as necessary between the available API applications.

Please read OAuth 2.0's [final version specification](https://tools.ietf.org/html/rfc6749) for more information on the protocol.

Generally, accessing an Accelo resource protected by OAuth2.0 takes three steps:   
1. Authorize  
2. Acquire token  
3. Access resource  

Before access to a token is granted authorization is achieved for a limited range of requests using the `client_id` and `client_secret` which can be found through your Accelo toolbox and are given upon registering your API. To gain an access token your application must first be authorized by the end user, once authorized we are able to send a token request to the OAuth endpoint. We will go through this process for each of the application types support by Accelo.

<!-- Use html anchor because normal markdown method does not like "."-->






<a name="oauth2-uri"></a>
## OAuth2.0 URI

<!-- The following line will print in the right column right where the body for the next section starts -->
> Example OAuth2.0 base URI for planet express:  

```example
https://planet-express.api.accelo.com/oauth2/v0
```

The OAuth2.0 base URI is different to the base URI for Accelo resources, in general this base URI will be found at:

`https://{deployment}.api.accelo.com/oauth2/v0`

This URI is used to authorize and access tokens.

### Scope

> For example, to request permission to read all information and write only to companies and contacts:

```example
scope=read(all),write(companies,contacts)
```

> For example, to request permission to read and write to contacts and staff:

```example
scope=write(contacts,staff)
```

The range of access permissions for a given token is provided by the `scope` parameter. Currently, the following scopes are available:

`read({resource})` - Read only access to data related to the `{resource}` object, which may be any resource. `read(all)` gives read only access to all data the user owns or has access to. To provide read access to any collection of resources, `{resource_1},{resource_2},...` you can simply concatenate, `read({resource_1},{resource_2},...)`

`write({resource})` - Read and write access related to the resource specified.  `write(all)` gives read and write access to all data the user owns or has access to. As for read access, write access for a collection of resources is given via concatenation.

The `scope` field is optional in all requests that use it, and defaults to `read(all)`.

### OAUTH2.0 Endpoints

There are three endpoints off the OAUTH2.0 URI, they are `/authorize`, `/token`, and `revoke`. These endpoints support the following requests:

| Request | Description |
|:-|:-|
| GET &#124; POST /authorize | Request authorization from a user. |
| POST /token | Request an access token using a grant code or refresh token. |
| POST /revoke | Revoke and access token. |

We will cover handling the responses on a case-by-case basis for each application type, as the responses vary between them. Note that authorization and token requests should always be encoded, for the purposes of demonstration, our examples are not.

### Redirect URIs
Redirect URIs are used in the authorization of web and installed applications, these are the URIs to which the end-user's response to authentication requests are sent. Redirect URIs for an application may be registered through the api control panel. You may register many callback URIs for a web application, but only one for an installed application.

## Authentication Without a Token

Authenticating an application before you have been granted an access token is done
using HTTP Basic authorization. The format is `{client_id}:{client_secret}` encoded in base64.
For example if your client id is `5ba17c78ao@planet-express.accelo.com` and your client
secret is `zTfFgiyQCVDFk-1EtUerVLRk1is6LgL6` then you would authorize with the header:

`Authorization: Basic NWJhMTdjNzhhb0BwbGFuZXQtZXhwcmVzcy5hY2NlbG8uY29tOnpUZkZnaXlRQ1ZERmstMUV0VWVyVkxSazFpczZMZ0w2`.

For convenience we will just write `{client_credentials}`








## Service Applications
These are not run from the end user's deployment, and hence do not need to be authorized by the user, so authorization and accessing a token is are combined into one step for these application.

### Token Acquisition for Service Applications
> Example token request for the Planet Express deployment, here `{client_credentials}` is `client_id:client_secret` encoded in base64, as described above.

<!-- This code block will be  in the right column, to change this do not have an empty line before it-->
```http
POST /oauth2/v0/token HTTP/1.1
Host: planet-express.api.accelo.com
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {client_credentials}

grant_type=client_credentials
scope=read(staff)
```

```shell
curl X- POST https://planet-express.api.accelo.com/oauth2/v0/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'authorization: Basic {client_credentials}' \
  -d 'grant_type=client_credentials' \
  -d 'scope=read(staff)'
```
The token endpoint:

`https://{deployment}.api.accelo.com/oauth2/v0/token`

Please note, access and refresh tokens should **never** be transmitted without being encoded. Further note, all token requests require authorization using HTTP Basic as outlined [above](#authentication-without-a-token).

The `/token` endpoint to request a token. Since end-user authorization is not required, HTTP basic is used instead, the format as outlined [above](#authentication-without-a-token). For service applications this request supports the following parameters:


| Parameters | Type | Description |
|:-|:-|:-|
| **grant_type** | string | This **must** be set to client_credentials for this request. |
| scope | string | The scope of access desired for the application. See the [OAuth2 URI](#oauth2-uri) for possible values.|
| expires_in | unsigned | The lifetime in seconds of the access token. e.g, the value "3600" expresses that the token will expire in one hour from the time the token was created. This defaults to 30 days. |

A successful request will contain the following fields:

> Example successful response:

```json
{
  "access_token": "Ck9ma73_db",
  "expires_in": "2592000",
  "token_tpye": "Bearer",
  "..."
}
```

| Response | Type | Description |
|:-|:-|:-|
| access_token | string | Credential used to access Accelo's protected resources. |
| token_type | string | For service applications this will have the value "bearer". |
| expires_in | unsigned | The lifetime in seconds of the access token. |
| deployment | string | The deployment to which the token belongs. |
| deployment_name | string | A proper name for the deployment |
| deployment_uri | The full uri of the deployment. |
| account_id | string | A unique identifier for the Accelo account belonging to the deployment used. |
| account_details | hash | The details of the user for whom the token has been generated. This contains user information as well as a `user_access` has containing the user's permissions for each resources, and a `user_defined_title` hash containing a list of resource names as defined by the user on the deployment, and a `locale` hash containing information on the currency used by the user. |





## Web Applications
Web applications require the end-user to authorize an application before it can make any requests. Hence token acquisition requires two steps:  
1. [Authorization of the application](#authorization-for-web-applications)  
2. [Token Acquisition](#token-acquisition-for-web-applications)

Keep in mind for these applications that the host is the deployment for the *user* and not the web application's deployment host.

### Authorization for Web Applications
The authorize endpoint URI:  
`https://{deployment}.api.accelo.com/oauth2/v0/authorize`

<!-- A section three layers or more deeper will not show in the contents -->
#### Authorization Request for Web Applications

> Example authorization request:  

```http
POST /oauth2/v0/authorize HTTP/1.1
Host: planet-express.api.accelo.com
Content-Type: application/x-www-form-urlencoded

client_id=a17c78ao@planet-express.accelo.com
response_type=code
scope=read(companies,contacts),write(staff)
redirect_uri=https//planet-express.com/oauth-callback
```

```shell
curl -X POST https://planet-express.api.accelo.com/oauth2/v0/authorize \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=a17c78ao@planet-express.accelo.com' \
  -d 'response_type=code' \
  -d 'scope=read(companies,contacts),write(staff)' \
  -d 'redirect_uri=https//planet-express.com/oauth-callback'
```

Authorization is achieved through the authorize endpoint. For authorizing web applications, the endpoint takes the following parameters:

| Parameter | Type | Description |
|:-|:-|:-|
| **client_id** | string | The application's client ID as listed on the API control panel. |
| **response_type** | string | This **must** be set to `code` for this request. |
| scope | string | The scope of access desired for the application. See the [OAuth2.0 URI](#oauth2-uri) for possible values. |
| redirect_uri | string | If included this must match one of the redirect URIs provided when you registered your application. |
| state | string | This is any string you see fit. The state parameter will be sent back to you as a receipt. For example, a randomly generated number to act as a nonce to mitigate cross-site-request re-forgery attacks. Or, a path to redirect the user to once they are returned to your callback.  |


A successful request will send the end-user a prompt similar to the following:

![alt text](../images/screenshots/web-app.png)

The result of the end-user's response will be sent to the provided `redirect_uri`

#### Authorization Response for Web Applications

The response sent to the `redirect_uri` may contain the following parameters:

| Parameter | Type | Description |
|:-|:-|:-|
| code | string | The authorization code to be used to request a token. This is only sent upon the end-user giving approval for your app. |
| state | string | The state value sent in the request. This is only sent if a `state` is provided in the request, see [above](#authorization-for-web-applications) for information on this .|
| error | string | Error status when there has been an error in the request. This is only sent if the request was not approved. See the [OAUTH2.0 URI](#authorize-endpoint-errors) for a list of potential statuses |
| error_description | string | A human readable explanation on why the error may have occurred. This is only sent if there is an error. |

### Token Acquisition for Web Applications

Please note, access and refresh tokens should **never** be transmitted without encryption. Further note, all token requests require authoriztion using HTTP Basic as outlined [previously](#authentication-without-a-token)

> Example token request:

```http
POST /oauth2/v0/token HTTP/1.1
Host: planet-express.api.accelo.com
Authorization: Basic {client_credentials}

grant_type=authorization_code
code=frLA0s1m_D
redirect_uri=https://planet-express.com/oauth-callback
```

```shell
curl -X POST https://planet-express.api.accelo.com/oauth2/v0/token \
  -H 'authorization: Basic {client_credentials}' \
  -d 'grant_type=authorization_code' \
  -d 'code=frLA0s1m_D' \
  -d 'redirect_uri=https://planet-express.com/oauth-callback'
```

Once you have an authorization code from a successful authorization request you may exchange it for an access and refresh token. The token request requires that you authenticate using HTTP Basic Authorization as explained [here](#authentication-without-a-token). Token request are sent through the `/token` endpoint, for web application request this endpoint supports the following parameters:

| Parameter | Type | Description |
|:-|:-|:-|
| **grant_type** | string | This **must** be set to `authorization_code` for this request. |
| **code** | string | The authorization code obtained from the [authorization process](#authorization-response-for-web-applications) |
| redirect_uri | string | If a `redirect_uri` was provided when [authorizing](#authorization-for-web-applications) this must be the `redirect_uri` provided. Otherwise, this must be one of the redirect URIs provided when you registered your application. |
| expires_in | unsigned | The lifetime in seconds of the access token. e.g, the value "3600" expresses that the token will expire in one hour from the time the token was created. This defaults to 30 days. |

A successful response will contain the following fields:

> Example successful request:

```json
{
  "access_token": "Ck9ma73_db",
  "refresh_token": "VYfb63__vf",
  "token_type": "Bearer",
  "expires in": 2592000,
  "..."
}
```

> Example failed response, here our authorization code has expired:  

```json
{
  "error": "invalid_grant",
  "error_description": "Grant was not found (possibly expired)."
}
```


| Name | Type | Description |
|:-|:-|:-|
| access_token | string | The token used to access resources. |
| refresh_token | string | A refresh token which may be exchanged for a fresh token.  |
| token_type | string | The type of token returned.  |
| expires_in | unsigned | The lifetime in seconds of the access token. |
| error | string | For potential errors see the [OAUTH2.0](#token-endpoint-errors) URI |
| error_description | string | as for above, see [here](#token-endpoint-errors) |

Note that an invalid (that is, not one of the one those registered, or not matching that provided when [authorizing](#authorization-for-web-applications)) URI will return a "Grant was not found (possibly expired)." error







## Installed Applications
Similarly to web applications, to gain a token for installed applications you must first have the end-user authorize the application, so again the two steps are:  
1. [Authorize the application](#authorization-for-installed-applications)  
2. [Token Acquisition](#token-acquisition-for-installed-applications)


Keep in mind for these applications that the host is the deployment for the *user* and not the installed application's deployment host.

### Authorization for Installed Applications
#### The Authorization Request for Installed Applications
> Example authorization request:

```http
POST /oauth2/v0/authorize HTTP/1.1
Host: planet-express.api.accelo.com

client_id=9749c33f@planet-express.accelo.com
response_type=code
scope=read(companies,contacts),write(staff)
```

```shell
curl -X POST https://planet-express.api.accelo.com/oauth2/v0/authorize \
  -d 'client_id=9749c33f@planet-express.accelo.com'
  -d 'response_type=code'
  -d 'scope=read(companies,contacts),write(staff)'
```

This is done through the `/authorize` endpoint. For authorizing installed applications we have the following parameters:

| Parameter | Type | Description |
|:-|:-|:-|
| **client_id** | string | The applications client ID as listed on the API control panel. |
| **response_type** | string | This **must** be set to `code` for this request |
| scope | string | The scope of access desired for the application. See the [OAuth2.0 URI](#oauth2-uri) for possible values. |
| expires_in | unsigned | The lifetime in seconds of the access token. e.g, the value "3600" expresses that the token will expire in one hour from the time the token was created. This defaults to 30 days. |

A successful request will send the end-user a prompt similar to the following:

![alt text](../images/screenshots/installed-app.png)

#### Authorization Response for Installed Applications

If the user returns to the application and enters the pin, this will be the authorization code to be exchanged for a token.

### Token Acquisition for Installed Applications

Please note, access and refresh tokens should **never** be transmitted without encryption. Further note, all token requests require authoriztion using HTTP Basic as outlined [previously](#authentication-without-a-token)

> Example token request:

```http
POST /oauth2/v0/token HTTP/1.1
Host: planet-express.api.accelo.com
Authorization: Basic {client_credentials}

grant_type=authorization_code
code=750332955
```

```shell
curl -X POST https://planet-express.api.accelo.com/oauth2/v0/token \
  -H 'authorization: Basic {client_credentials}' \
  -d 'grant_type=authorization_code' \
  -d 'code=750332955'
```

Returning again to the `/token` endpoint, authenticating using [HTTP Basic](#authentication-without-a-token), for installed applications the request accepts the following parameters.

| Parameter | Type | Description |
|:-|:-|:-|
| **grant_type** | string | This **must** be set to `authorization_code` for this request. |
| **code** | string | The authorization code obtained from the user in the [authorization process](#the-authorization-request-for-installed-applications) |
| redirect_uri | string | If included, this **must** be the redirect URI provided when you registered your application. |
| expires_in | unsigned | The lifetime in seconds of the access token. e.g, the value "3600" expresses that the token will expire in one hour from the time the token was created. This defaults to 30 days. |

For installed applications, as with web applications, a refresh token is included in the response. Also included in the response are:







## Revoking a Token
> Sample request:

```http
POST /oauth2/v0/revoke HTTP/1.1
HOST: planet-express.api.accelo.com
Authorization Bearer: {access_token}

token={access_token_to_be_revoked}
```

```shell
curl -X POST https://planet-express.api.accelo.com/oauth2/v0/revoke \
    -d 'client_secret=a17c78ao@planet-express.accelo.com' \
    -d 'client_id=Mj.44Rkg' \
    -d 'token={access_token_to_be_revoked}'
```

`POST /oauth2/revoke`

Token revocation may be necessary when read/write permissions are no longer required e.g. on log-out, authorization on this request may either be done through Basic authorization as outlined previously, or by including the `client_id` and `client_secret` within the query parameters. This request takes the following parameters:

| Field Name | Type | Description |
|:-|:-|:-|
| token | string | The token to be revoked, must have been issued to the client making the request. |
| client_id | string | The client id of the application as shown on the deployment. Include this if you are not using HTTP Basic authorization in the header. |
| client_secret | string | The client secret of the application as shown on the deployment. Include this if you are not using HTTP Basic authorization in the header. |

A successful request will return an "ok" status.








## Refreshing a Token

> Example token request using refresh token:

```http
POST /oauth2/v0/token HTTP/1.1
Host: planet-express.api.accelo.com
Authorization: Basic {client_credentials}

token_type=refresh_token
refresh_token=VYfb63__vf
```

```shell
curl -X POST https://planet-express.api.accelo.com/oauth2/v0/token \
  -H 'authorization: Basic {client_credentials}' \
  -d 'token_type=refresh_token' \
  -d 'refresh_token=VYfb63__vf'
```

For installed and web applications if you still have a valid token, you may request a new token using the refresh token that came with it. This request uses the `/token` endpoint and accepts the following parameters:

| Parameters | Type | Description |
|:-|:-|:-|
| **grant_type** | string | This **must** be set to `refresh_token` for this request.|
| **refresh_token** | string | The refresh token that was sent with your current token. |

The response to this request will contain an access token and refresh token. Please note that service applications do not use refresh_tokens, if a new token is wanted you will need to generate a new one.

## Token Information

`https://{deployment}.api.accelo.com/api/v0/tokeninfo`

> Example request:

```http
GET /api/v0/tokeninfo HTTP/1.1
HOST: planet-express.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get https://planet-express.api.accelo.com/api/v0/tokeninfo \
  -H 'authorization: Bearer {access_token}'
```

To obtain the information of any access token the `/tokeninfo` endpoint is used. Note this endpoint is *not* located in `.../oauth2/v0` but rather `/api/v0`. It takes only a single parameter:

| Parameter | Type | Description |
|:-|:-|:-|
| _bearer_token | string | The token for which you would like information of. Default is the token used to authenticate the request. |

The response will contain the following:

| Name | Type | Description |
|:-|:-|:-|
| **email** | string | Email of the user assigned to the token. |
| **expiry_date** | unix ts | An expiry date time stamp assigned to the token. |
| **firstname** | string | First name of the user assigned to the token. |
| **surname** | string | Surname of the user assigned to the token. |
| **deployment** | string | Deployment prefix assigned to the token. |
| **locale** | object | Locale currency symbol and timezone assigned to the token. |
| **staff_id** | unsigned int | The id of the staff assigned to the token. |

## Using the Token to Access Resources

> Sample accessing a company resource using access token query:   

```example
GET http://planet-express.api.accelo.com/api/v0/compaines/1?_bearer_token=Ck9ma73_db
```

> Same request using preferred header method:

```http
GET /api/v0/companies/1 HTTP/1.1
Host: planet-express.api.accelo.com
Content-Type: application/x-www-form-urlencoded
Authorization: Bearer Ck9ma73_db
```

```shell
curl -X get https://planet-express.api.accelo.com/api/v0/companies/1 \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'authorization: Bearer {access_token}'
```

Once you have access to your token you may use it to access endpoints. This can be done by either including it as a query parameter as `_bearer_token`, or as a HTTP `Authorization: Bearer` header. For security reasons the latter is preferred. Note that including both of these will return an error.
