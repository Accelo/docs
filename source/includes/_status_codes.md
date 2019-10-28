# Status Codes
The following statuses and codes may be returned.




## ok

### Code 
200

### Description 
Everything executed as expected.




## invalid_client
Code: 401

### Description
Invalid client authentication, e.g. unknown client, no client authentication included, or unsupported authentication method. 

### Common Causes

* No client credentials were provided
* The client was not found in the system
* An incorrect client secret was provided
* The IP is restricted in the application's configuration of the deployment
* The user is locked out due to the number of failed attempts exceeding the max limit
* No token provided when accessing a resources
* Token provided is invalid 
* The token's user is invalid



## invalid_grant
Code: 400

### Description
The provided authorization grant is invalid.

### Common Causes

* Provided grant or refresh token is invalid, expired, or revoked 
* Provided grant or refresh token does not match the URI used in the authorization request or was issued to another client



## duplicate
Code: 400

### Description
Your write actions would cause a duplicate unique identifier. The response message should identify the offending field. If it odes not, please report it to us.

### Common Causes

* An attempt to create an object with the same name, title, or username as an already existing object of the same type


## invalid_request
Code: 400

### Description
We could not interpret your request. This is commonly seen when you forgot to include required parameters or attempt to request a resource that doesn't exist. For example `/api/v0/monkeys` or `/api/v20000/companies` would result in an 'invalid request'.

### Common Causes

* The request is for an unknown resource or version
* The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed
* The request includes multiple credentials
* The request did not result in any data to return. For example, requesting a job that doesn't exist



## too_many_requests
Code: 429

### Description
Your deployment has exceeded the maximum number of allowed requests for this hour.
See [rate limiting](#rate-limiting) for more information.



## server_error
Code: 500

### Description
The request failed due to a server error and we were notified. Unfortunately these errors are 99% of the time out of your control. If you continue to see such an error, please notify us.

### Common Causes

* Database connection error
* Deployment can't be found
* A routine threw an exception
* Bad or corrupt data



## invalid_scope
Code: 400

### Description
The request scope is invalid, unknown, malformed or exceeds the scope granted by the resource owner. 

### Common Causes

* The requested scope doe not conform to our API scope syntax



## unsupported_grant_type
Code: 400

### Description
The authorization grant type is not supported by the authorization server.

### Common Causes

* You are sending an grant type that is not "authorization_code", "refresh_token", or "client_credentials"



## unauthorized client
Code: 401

### Description
The authenticated client is not authorized to use this authorization grant type

### Common Causes

* Provided grant was issue to another client



## invalid_permission
Code: 403

### Description
The user is authenticated but does not have permission to perform the action

