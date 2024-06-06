import { Box, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AppointmentModal({ appointment, open, setOpen }) {
  const handleClose = () => setOpen(false);

  const getTimeFromISO = (s) => {
    const dateObj = new Date(s);
    return dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {appointment && (
        <Box sx={style}>
          <Typography>
            Time: {getTimeFromISO(appointment.start_time)} -{" "}
            {getTimeFromISO(appointment.end_time)}
          </Typography>
          <Typography>Patients: {appointment.patients.join(", ")}</Typography>
          <Typography>Comments: {appointment.comments}</Typography>
        </Box>
      )}
    </Modal>
  );
}
