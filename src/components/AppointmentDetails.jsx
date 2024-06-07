import dayjs from "dayjs";
import { Box, Button, Modal, TextField } from "@mui/material";
import {
  addAppointment,
  deleteAppointment,
  editAppointment,
} from "../api/appointments";
import { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import MultipleSelect from "./MultipleSelect";
import { getPatients } from "../api/patients";

const style = {
  minWidth: 300,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function AppointmentForm({
  appointment,
  setAppointment,
  handleDelete,
  handleSave,
}) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients().then((patients) => {
      setPatients(patients.map((patient) => patient.name));
    });
  }, []);

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
          value={dayjs(appointment.start_time)}
          onChange={(newValue) =>
            setAppointment((prev) => ({
              ...prev,
              start_time: newValue,
            }))
          }
        />
        <DateTimePicker
          label={"End time"}
          value={dayjs(appointment.end_time)}
          onChange={(newValue) =>
            setAppointment((prev) => ({
              ...prev,
              end_time: newValue,
            }))
          }
        />
      </Box>
      <MultipleSelect
        label={"Patients"}
        choices={patients}
        value={appointment.patients}
        onChange={(event) =>
          setAppointment((prev) => ({
            ...prev,
            patients: event.target.value,
          }))
        }
      />
      <TextField
        variant="filled"
        label="Comments"
        value={appointment.comments}
        onChange={(event) =>
          setAppointment((prev) => ({
            ...prev,
            comments: event.target.value,
          }))
        }
        multiline={true}
        maxRows={10}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          alignSelf: "flex-end",
          gap: 2,
        }}
      >
        <Button color="error" variant="text" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default function AppointmentModal({
  appointment,
  setAppointment,
  open,
  setOpen,
}) {
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    await deleteAppointment(appointment.id);
    handleClose();
  };

  const handleSave = async () => {
    try {
      if (appointment.id) {
        await editAppointment(appointment);
      } else {
        await addAppointment(appointment);
      }
      handleClose();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {appointment && (
          <AppointmentForm
            appointment={appointment}
            setAppointment={setAppointment}
            handleDelete={handleDelete}
            handleSave={handleSave}
          />
        )}
      </Box>
    </Modal>
  );
}
