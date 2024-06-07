import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";

export default function AddAppointmentButton({ onClick }) {
  return (
    <Fab color="primary" variant="extended" onClick={onClick}>
      <AddIcon sx={{ mr: 1 }} />
      Add Appointment
    </Fab>
  );
}

AddAppointmentButton.PropTypes = {
  onClick: PropTypes.func,
};
