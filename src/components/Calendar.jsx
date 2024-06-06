import { useEffect, useState } from "react";
import { getAppointments } from "../api/appointments";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

function Calendar() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments().then((appointments) => {
      setAppointments(appointments);
    });
  }, []);

  function handleEventClick(clickInfo) {
    const appointmentFromAPI = appointments.find(
      (appointment) => appointment.id == clickInfo.event.id,
    );
    alert(
      `${appointmentFromAPI.id}
${appointmentFromAPI.start_time} - ${appointmentFromAPI.end_time}
Patients: ${appointmentFromAPI.patients}
Comments: ${appointmentFromAPI.comments}`,
    );
  }

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
        events={appointments.map((appointment) => ({
          id: appointment.id,
          start: appointment.start_time,
          end: appointment.end_time,
          title: appointment.patients.join(","),
        }))}
        eventClick={handleEventClick}
      />
    </>
  );
}
export default Calendar;
