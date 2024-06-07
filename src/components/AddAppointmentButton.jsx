import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function AddAppointmentButton() {
  const style = {
    position: "fixed",
    bottom: 20,
    right: 20,
    borderRadius: "50px",
  };
  return (
    <Fab color="primary" variant="extended" sx={style}>
      <AddIcon sx={{ mr: 1 }} />
      Add Appointment
    </Fab>
  );
}
