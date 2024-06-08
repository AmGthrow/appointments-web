# Installation and setup

Install dependencies

```
npm install
```

Run a local instance of the frontend server

```
npm run dev
```

# Usage

## Calendar Navigation

<https://github.com/AmGthrow/appointments-web/assets/54239564/797172fd-b6f4-4b2d-90c3-6c0eace099ed>

- On the top right, press "Today" to jump to today's date
- On the top right, press the left/right keys to navigate between months/days/weeks
- On the top left, press "month" to see all appointments for a given month
- On the top left, press "week" to see all appointments for a given week
- On the top left, press "day" to see all appointments for a given day

## Adding an appointment

<https://github.com/AmGthrow/appointments-web/assets/54239564/5bf7d55b-6845-4891-923c-2f8b55cc1e47>

1. Click on any portion of the calendar that doesn't have an existing appointment
   - Alternatively, press the "Add Appointment" button on the bottom right to create an appoinment for the _current_ time, not the time you click on
2. Select the start time and end time of the appointment (By default, timestamped to current time)
3. Select the patients booked for the appointment. Multiple patients may be booked (By default, no patients are set)
4. Write any comments for the appointment (By default, comments are empty)
5. On the bottom right, press the "Save" button

### Restrictions

The backend server will return an error for the following conditions

- Start time is later than end time
- Appointment is booked on a Sunday
- Appointment is booked outside of 9AM - 5PM

## Editing an appointment

<https://github.com/AmGthrow/appointments-web/assets/54239564/f1589c07-c4c7-4e54-9ec2-87792fe3da5d>

1. In the calendar, click on an existing appointment to be edited
2. Modify the start & end time of the appointment
3. Modify the patients booked for the appointment. Multiple patients may be booked
4. Modify any comments for the appointment
5. On the bottom right, press the "Save" button

### Restrictions

The backend server will return an error for the following conditions

- Start time is later than end time
- Appointment is booked on a Sunday
- Appointment is booked outside of 9AM - 5PM

## Deleting an appointment

<https://github.com/AmGthrow/appointments-web/assets/54239564/db645c7f-77a8-4356-b64f-42d1fbe35f2d>

1. In the calendar, click on an existing appointment to be edited
2. On the bottom left, press the "Delete" button

## Filtering appointments by date

<https://github.com/AmGthrow/appointments-web/assets/54239564/eae9c7f5-6376-4aed-a1ab-0e818dd48d43>

1. At the bottom, press the calendar on the "Filter from this date..." picker
2. Select a date. Appointments later than this date will be included
3. At the bottom, press the calendar on the "Filter to this date..." picker
4. Select a date. Appointments earlier than this date will be included
5. At the bottom, press the "Clear Filters" button to remove filters and show all appointments.
