## User
This resource contains information about the current user, their deployment, and access token.

### The User Object
The user object contains the same fields as the [staff](#staff) object, as well as the following:

| Field | Type | Description |
|:-|:-|:-|
| user_titles | hash | A key-value object containing the user defined plural and singular for each object type. |
| user_access | hash | A key-value object containing manages, add, view, and admin permissions for the different types of objects. |
| locale | hash | A key-value object containing the user's timezone and currency symbol preferences. |






### GET /user
This request returns a [user object](#the-user-object), it takes no parameters.
