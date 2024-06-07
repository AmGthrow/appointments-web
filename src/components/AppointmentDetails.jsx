import dayjs from "dayjs";
import { Box, Button, Modal, TextField } from "@mui/material";
import { deleteAppointment } from "../api/appointments";
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import MultipleSelectChip from "./MultipleSelectChip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Appointment({ appointment, handleDelete }) {
  const [appointmentDetails, setAppointmentDetails] = useState(appointment);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2,
        }}
      >
        <DateTimePicker
          label={"Start time"}
          value={dayjs(appointmentDetails.start_time)}
          onChange={(newValue) =>
            setAppointmentDetails((prev) => ({
              ...prev,
              start_time: newValue,
            }))
          }
        />
        <DateTimePicker
          label={"End time"}
          value={dayjs(appointmentDetails.end_time)}
          onChange={(newValue) =>
            setAppointmentDetails((prev) => ({
              ...prev,
              end_time: newValue,
            }))
          }
        />
      </Box>
      <MultipleSelectChip
        label={"Patients"}
        choices={["Patient One", "Patient Two", "Patient Three"]}
        value={appointmentDetails.patients}
        onChange={(event) =>
          setAppointmentDetails((prev) => ({
            ...prev,
            patients: event.target.value,
          }))
        }
      />
      <TextField
        variant="filled"
        label="Comments"
        value={appointmentDetails.comments}
        onChange={(event) =>
          setAppointmentDetails((prev) => ({
            ...prev,
            comments: event.target.value,
          }))
        }
        multiline={true}
        maxRows={10}
      />
      <Button color={"error"} variant={"text"} onClick={handleDelete}>
        Delete
      </Button>
    </Box>
  );
}

export default function AppointmentModal({ appointment, open, setOpen }) {
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    deleteAppointment(appointment.id);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {appointment && (
          <Appointment appointment={appointment} handleDelete={handleDelete} />
        )}
      </Box>
    </Modal>
  );
}
