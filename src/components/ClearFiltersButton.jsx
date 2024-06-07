import Fab from "@mui/material/Fab";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PropTypes from "prop-types";

export default function ClearFiltersButton({ onClick }) {
  return (
    <Fab color="primary" variant="extended" onClick={onClick}>
      <RestartAltIcon />
      Clear Filters
    </Fab>
  );
}
ClearFiltersButton.PropTypes = {
  onClick: PropTypes.func,
};
