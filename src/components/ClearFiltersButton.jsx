import Fab from "@mui/material/Fab";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function ClearFiltersButton({ onClick }) {
  return (
    <Fab color="primary" variant="extended" onClick={onClick}>
      <RestartAltIcon />
      Clear Filters
    </Fab>
  );
}
