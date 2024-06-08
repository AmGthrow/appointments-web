import { useEffect, useState } from "react";
import { getAppointments } from "../api/appointments";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AppointmentModal from "./AppointmentDetails";
import AddAppointmentButton from "./AddAppointmentButton";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/material";
import ClearFiltersButton from "./ClearFiltersButton";

const style = {
  controlButtons: {
    position: "fixed",
    bottom: 20,
    right: 20,
    borderRadius: "50px",
    display: "flex",
    alignItems: "center",
    gap: 2,
    zIndex: 100,
  },
  datePicker: {
    backgroundColor: "#424242",
  },
};

function Calendar() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentFocused, setAppointmentFocused] = useState();
  const [appointmentStartDate, setAppointmentStartDate] = useState();
  const [appointmentEndDate, setAppointmentEndDate] = useState();
  const [viewAssessmentDetails, setViewAssessmentDetails] = useState(false);

  useEffect(() => {
    if (!viewAssessmentDetails) {
      getAppointments(appointmentStartDate, appointmentEndDate).then(
        (appointments) => {
          setAppointments(appointments);
        },
      );
    }
  }, [viewAssessmentDetails, appointmentStartDate, appointmentEndDate]);

  function handleEventClick(clickInfo) {
    const appointmentFromAPI = appointments.find(
      (appointment) => appointment.id == clickInfo.event.id,
    );
    setAppointmentFocused(appointmentFromAPI);
    setViewAssessmentDetails(true);
  }

  function handleAddAppointment() {
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);
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
  function handleClickEmptyDate(info) {
    const now = new Date(info.dateStr);
    now.setSeconds(0);
    now.setMilliseconds(0);
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

  function handleClearDateFilters() {
    setAppointmentStartDate();
    setAppointmentEndDate();
  }

  return (
    <>
      <AppointmentModal
        appointment={appointmentFocused}
        setAppointment={setAppointmentFocused}
        open={viewAssessmentDetails}
        setOpen={setViewAssessmentDetails}
      />
      <Box sx={style.controlButtons}>
        <DatePicker
          sx={style.datePicker}
          label="Filter from this date..."
          format="YYYY/MM/DD"
          variant="filled"
          value={appointmentStartDate ? dayjs(appointmentStartDate) : null}
          slotProps={{
            field: {
              readOnly: true,
            },
          }}
          onAccept={(newValue) =>
            setAppointmentStartDate(newValue.toISOString())
          }
        />
        <DatePicker
          sx={style.datePicker}
          label="Filter until this date..."
          format="YYYY/MM/DD"
          variant="filled"
          value={appointmentEndDate ? dayjs(appointmentEndDate) : null}
          slotProps={{
            field: {
              readOnly: true,
            },
          }}
          onAccept={(newValue) => setAppointmentEndDate(newValue.toISOString())}
        />
        <ClearFiltersButton onClick={handleClearDateFilters} />
        <AddAppointmentButton onClick={handleAddAppointment} />
      </Box>
      <FullCalendar
        schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"timeGridWeek"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        dateClick={handleClickEmptyDate}
        allDaySlot={false}
        height="95vh"
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
