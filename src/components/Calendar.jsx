import { useEffect, useState } from "react";
import { getAppointments } from "../api/appointments";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import AppointmentModal from "./AppointmentDetails";
import AddAppointmentButton from "./AddAppointmentButton";
import dayjs from "dayjs";

function Calendar() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentFocused, setAppointmentFocused] = useState();
  const [viewAssessmentDetails, setViewAssessmentDetails] = useState(false);

  useEffect(() => {
    if (!viewAssessmentDetails) {
      getAppointments().then((appointments) => {
        setAppointments(appointments);
      });
    }
  }, [viewAssessmentDetails]);

  function handleEventClick(clickInfo) {
    const appointmentFromAPI = appointments.find(
      (appointment) => appointment.id == clickInfo.event.id,
    );
    setAppointmentFocused(appointmentFromAPI);
    setViewAssessmentDetails(true);
  }
  function handleAddAppointment() {
    const now = new Date();
    const appointmentDuration = 1000 * 60 * 60; // 1 hour from now
    const newAppointment = {
      start_time: dayjs(now),
      end_time: dayjs(now.getTime() + appointmentDuration),
      patients: [],
      comments: "",
    };
    setAppointmentFocused(newAppointment);
    setViewAssessmentDetails(true);
  }

  return (
    <>
      <AppointmentModal
        appointment={appointmentFocused}
        setAppointment={setAppointmentFocused}
        open={viewAssessmentDetails}
        setOpen={setViewAssessmentDetails}
      />
      <AddAppointmentButton onClick={handleAddAppointment} />
      <FullCalendar
        schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={"timeGridWeek"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        allDaySlot={false}
        height={"96vh"}
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
