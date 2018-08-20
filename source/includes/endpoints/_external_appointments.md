## External Appointments 
> Resource URI  
`/api/v0/time_externals`

External appointments are imported appointments from calendars such as Google, Exchange, or Outlook. Once they are
imported and turned into [activities](the-activity-object) you can use them on your schedule and entries on your
timesheet. See the [support documentation](https://www.accelo.com/resources/help/guides/user/timers-timesheets-and-
scheduling/schedules/external-appointments-in-your-schedule/) for more information on external apppointments.

Currently the API supports two functions, deleting an external appointment, and coverting the external appointment to an
activity.

### Delete an External Appointment
> Sample Request: 

```http
DELETE /api/v0/time/externals/{time_external_id} HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deplyoment}.api.accelo.com/api/v0/time/externals/{time_external_id} \
  -H 'authorization: Bearer {access_token}' \
```

`DELETE /time/externals/{time_externals_id}`

This request removes an external appointment from the deployment and deletes it from any given timesheet or schedule it
is linked to, specified by its `time_external_id`.






### Convert an External Appointment to an Activity
>Sample Request:

```http
POST /time/externals/{time_external_id}/convert_to_meeting HTTP/1.1
HOST: {deployment}.api.accelo.com
Authorization: Bearer {access_token}
```

```shell
curl -X get \
 https://{deplyoment}.api.accelo.com/api/v0/time/externals/{time_external_id}/convert_to_meeting \
  -H 'authorization: Bearer {access_token}' \
```


`POST /time/externals/:time_external_id/convert_to_meeting` 

This request will convert the external into an [activity](the-activity-object) as a [meeting](activity-medium). It will
also create a second [activity](the-activity-object) as a [report](activity-medium) on the meeting. This is the process
to converting the external appointment as a workable entry to use in Accelo.
