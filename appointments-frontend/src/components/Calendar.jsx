import { useEffect, useState } from "react";
import { getAppointments } from "../api/appointments";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

function Calendar() {
  return (
    <>
      <FullCalendar
        schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={"timeGridWeek"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={getAppointments}
      />
    </>
  );
}
export default Calendar;
