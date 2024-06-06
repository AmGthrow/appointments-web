import { useEffect, useState } from "react";
import { getAppointments } from "../api/appointments";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import AppointmentModal from "./AppointmentDetails";

function Calendar() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentFocused, setAppointmentFocused] = useState();
  const [viewAssessmentDetails, setViewAssessmentDetails] = useState(false);

  useEffect(() => {
    getAppointments().then((appointments) => {
      setAppointments(appointments);
    });
  }, []);

  function handleEventClick(clickInfo) {
    const appointmentFromAPI = appointments.find(
      (appointment) => appointment.id == clickInfo.event.id,
    );
    setAppointmentFocused(appointmentFromAPI);
    setViewAssessmentDetails(true);
  }

  return (
    <>
      <AppointmentModal
        appointment={appointmentFocused}
        open={viewAssessmentDetails}
        setOpen={setViewAssessmentDetails}
      />
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
