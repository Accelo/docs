## Object Schedules
An object schedule is a schedule against a specific object. For example, the
schedule on a given [task](#tasks).

### The Object Schedule
> Sample JSON object:

```json
{
  "date_planned_due": "1362618000",
  "against_id": "24",
  "date_planned_start": "1362358800",
  "id": "113",
  "against_type": "task"
}
```

The object schedule budget contains the following

| Field | Type | Description |
|:-|:-|:-|
| **id** | unsigned | A unique identifier for the object schedule. |
| **against_id** | unsigned | The unique identifier of the object the schedule is against. |
| **against_type** | string | The type of object the schedule is against. |
| date_planned_start | unix ts | The planned start date. |
| date_planned_due | unix ts | The planned due date. |
| date_predicted_start | unix ts | The predicted start date computed by Accelo based on current progress, any dependencies and planned durations. |
| date_predicted_end | unix ts | The predicted start date computer by Accelo based on current progress, any dependencies and planned durations. |
| date_commenced | unix ts | The actual commenced date. |
| date_completed | unix ts | The actual completed date. |
| date_user_estimated_start | unix ts | The date the user responsible for the work has scheduled to start it. |
| date_user_estimated_due | unix ts | The date the user responsible for the work has scheduled to complete it.|
| date_targeted_start | unix ts | The date the user responsible for the work should have _definitely_ started, based on current progress, planned dates,  and the planned durations. |
| date_targeted_start | unix ts | The date the assignee becomes responsible for the work, based on current progress, planned dates, and the planned durations. |
| date_targeted_due | unix ts | The date the assignee becomes responsible for the work, based on current progress, planned dates, and the planned durations. |
| date_fixed_start | unix ts | The fixed start date. |
| date_fixed_due | unix ts | The fixed deadline for the due date. |

There are no endpoints associated with this object.

