# Change log

With the release of the new and easier to maintain documentation, we're going to do a much better job of tracking changes.

**Note - Beta Changes:** New objects or endpoints may be introduced with a **(Beta)** tag, which may last up to a month after introduction. While in beta these are subject to change without notice.

### Wednesday 11th April 2018

#### Misc

Added some extra documentation around `_not` [filters](#configuring-the-response-filtering).

#### Features

Updated the [`PUT /activities/{activity_id}`](#update-an-activity) endpoint:

- You may now update the `billable` or `nonbillable` field when updating an
activity.

New fields added to the [Activity Object](#the-activity-object):

- Added the `is_billable` field.
- Added the `permissions` object.

Additional changes:

- Added the [Contract Budget](#the-contract-budget) object on [Contract
Periods](#the-contract-period).
- Added `won_by_id`, `cancelled_by_id`, and `abandoned_by_id` on the [Prospect
Ojbect](#the-prospect-object).


### Tuesday 6th February 2018

#### Misc

- Rename some sections for clarity and to avoid title duplication.

#### Features

The following endpoints have been added to activities:

- [`GET /activities/classes`](#list-activity-classes)
- [`GET /activities/classes/{class_id}`](#get-activity-class)
- [`GET /activities/classes/count`](#count-activity-classes)

The following endpoints have been added to issues:

- [`GET /issues/resolutions/{resolution_id}`](#get-issue-resolution) - Get issue resolution
- [`GET /issues/resolutions`](#list-issue-resolutions) - List issue resolutions
- [`GET /issues/resolutions/count`](#count-issue-resolutions) - Count issue resolutions

The following issue endpoints have been updated:

- [PUT /issues/{issue_id}](#update-an-issue) - you may now update the following:
  - The issue's resolution, via: `resolution` or `resolution_details`
  - The issue's contract via: `contract_id`


The following [webhook events](#webhook-events) have been added:

- `create_issue`
- `update_issue`

#### Deprecations

- The `class` attribute and object on [activities](#activities) is deprecated. Please use `activity_class` instead.

#### Bug Fixes

In addition to the `username` and `password`, the following fields are now required when creating a new staff member via
[POST /staff](#create-a-staff-member):

- `firstname`
- `surname`
- `email`

### Friday 2nd February 2018

#### Features

- Add the `block_send` flag to allow blocking [activities created through the API](#create-an-activity)
from being sent.

### Monday 22nd January 2018

#### Deprecations

- The `priority` attribute and object on [Activities](#activities) and [Requests](#requests) is deprecated. Please use `activity_priority` and `request_priority` instead.

### Monday 15th January 2018

#### Deprecations

- The `priority` attribute and object on [Issues](#issues) is deprecated. Please use `issue_priority` instead.

#### Features

- The following endpoints have been added
 - [`GET /issues/priorities`](#list-issue-priorities)
 - [`GET /issues/priorities/{priority_id`}](#get-issue-priority)
 - [`GET /issues/priorities/count`](#count-issue-priorities)
- The following endpoints have been updated:
 - [`PUT /issues/{issue_id}`](#update-an-issue) supports updating `priority_id` and (`status_id` or `standing`)
 - [`POST /issues`](#create-an-issue) supports setting `priority_id` and (`status_id` or `standing`) 

### Friday 22nd December 2017

#### Misc Updates

The following endpoints have been added:

- [`GET /jobs/statuses`](#list-job-statuses-beta)
- [`PUT /assets/{asset_id}`](#update-an-asset-beta)

### Friday 13th October

#### Object Types

The following objects are to have their `type` object deprecated and replaced by
a corresponding `_type` object:

- [Contracts](#contracts)
- [Expenses](#expenses)
- [Issues](#issues)
- [Jobs](#jobs-projects)
- [Prospects](#prospects-sales)
- [Tasks](#tasks)

Included in this change, the following endpoints have been added:

- [`GET /issues/types/{issue_type_id}`](#get-issue-type)
- [`GET jobs/types`](#list-job-types)
- [`GET jobs/types/{job_type_id}`](#get-job-type)


### Friday 6th October

#### Rate Limiting

[Rate limiting](#rate-limiting) will be introduced into the API. We have added documentation
describing what the limits will be once it is introduced.

#### Configuring the Response

This has been moved to its own section, [configuring responses](#configuring-responses).

#### AND/OR Filtering

The API now supports [combining filters](#filters-combining-filters) using logical AND/OR operations.

### Friday 22nd September

#### Progression Webhooks

[Webhooks](#webhooks) are now supported on [progressions](#progressions) via [progression webhooks](#progression-webhooks). These are currently only supported via the Web App but there are plans to implement it via the API.

#### Purchases

[Purchases](#purchases) are now accessible through the API. They are available through the [purchase object](#the-purchase-object-beta) and accessed via the new endpoints:

- [`GET /purchases/{purchase_id}`](#get-purchase-beta)
- [`GET /purchases`](#list-purchases-beta)
- [`GET /purchases/count`](#count-purchases-beta)

#### Groups
[Groups](#groups) may now be accessed through the API. They are available through the [group object](#the-group-object-beta) and accessed via the new endpoints:

- [`GET /groups/{group_id}`](#get-group-beta)
- [`GET /groups`](#list-groups-beta)
- [`GET /groups/count`](#count-groups-beta)

#### Divisions
[Divisions](#divisions) may now be accessed through the API. They are available through the [division object](#the-division-object-beta) and accessed via the new endpoints:

- [`GET /divisions/{division_id}`](#get-division-beta)
- [`GET /divisions`](#list-divisions-beta)
- [`GET /divisions/count`](#count-divisions-beta)

#### Request Types
A new endpoint for request types has also been added:

- [`GET /requests/types`](#list-request-types-beta)

### Wednesday 16th August

#### Close/Reopen Contract Periods

Contract periods may now be closed or reopened using the API, this is done through the two new endpoints:

- [`[PUT | POST] /api/v0/contracts/periods/{period_id}/close`](#close-a-contract-period-beta)
- [`[PUT | POST] /api/v0/contracts/periods/{period_id}/open`](#reopen-a-contract-period-beta)

#### New Fields for Activities

The following fields have been added to the [activity object](#the-activity-object):

- standing
- invoice_id
- contract_period_id

### Friday 21st July

#### Holidays
User holidays may now be accessed through the API. As well as adding the [holiday object](#the-holiday-object-beta), the following endpoints are now available:

- [Get holiday](#get-holiday-beta)
- [List holidays](#list-holidays-beta)
- [Count holidays](#count-holidays-beta)
- [Update holiday](#update-holiday-beta)
- [Create holiday](#create-holiday-beta)
- [Delete holiday](#delete-holiday-beta)

#### Asset Links
We are rolling out asset links, which join an asset to another object, to the API. Currently the following new objects have been added:

- [Asset links](#the-asset-link-beta)
- [Asset types](#the-asset-type-beta)
- [Asset object link fields](#asset-object-link-fields-beta)

As well as the following endpoints:

- [Get asset type](#get-asset-type-beta)
- [List asset types](#list-asset-types-beta)
- [List asset links](#list-asset-links-beta)
- [Create-asset-link](#create-asset-link-beta)
- [Delete-asset-link](#delete-asset-link-beta)

#### Invoices
We are also rolling out improvements to assets on the API. As part of these improvements we have added the following objects:

- [The invoice line item](#the-line-item-beta)

With the following new endpoints:

- [Get line item](#get-line-item-beta)
- [List line items](#list-line-items-beta)
- [Count line items](#count-line-items-beta)

Future updates will include update, create and delete invoices.

#### Payments Ledgers and Taxes
Related to our asset improvements is the introduction of [payments](#payments), [ledgers](#ledgers), and [taxes](#taxes) with the following endpoints:

- [Get payment](#get-payment-beta), [Get ledger](#get-ledger-beta), [Get tax](#get-tax-beta)
- [List payment](#list-payments-beta), [List ledgers](#list-ledgers-beta), [List taxes](#list-taxes-beta)
- [Count payments](#count-payments-beta), [count ledgers](#count-ledgers-beta), [count taxes](#count-taxes-beta)

Future updates will include update, create and delete payments.

### Friday 16th June

#### New documentation
- Complete endpoints
- Up to date
- More examples

#### New filters
- Filter [resources](#resources-attachments) by collection and owners. e.g, `_filters=collection_id(10),owner(staff(10,32))`

#### New fields
- View the [budget](#object-budgets) attached to [jobs](#jobs-projects) using `_fields=job_budget_object()`
- View the [contract](#contracts) object linked to jobs using `_fields=job_contract()`
- View collection id, owner type and owner id on resources using `_fields=owner_id,owner_type,collection_id`
