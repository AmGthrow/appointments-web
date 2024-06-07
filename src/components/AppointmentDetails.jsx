import { Box, Button, Modal, Typography } from "@mui/material";
import { deleteAppointment } from "../api/appointments";

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
  const getTimeFromISO = (s) => {
    const dateObj = new Date(s);
    return dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Typography>
        Time: {getTimeFromISO(appointment.start_time)} -{" "}
        {getTimeFromISO(appointment.end_time)}
      </Typography>
      <Typography>Patients: {appointment.patients.join(", ")}</Typography>
      <Typography>Comments: {appointment.comments}</Typography>
      <Button color={"error"} variant={"text"} onClick={handleDelete}>
        Delete
      </Button>
    </>
  );
}

export default function AppointmentModal({
  appointment,
  deleteAppointment,
  open,
  setOpen,
}) {
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
