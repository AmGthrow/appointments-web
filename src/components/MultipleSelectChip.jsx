import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from "@mui/material";

export default function MultipleSelectChip({
  label,
  choices,
  value,
  onChange,
}) {
  return (
    <FormControl variant="filled" sx={{ width: "100%" }}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        variant="filled"
        value={value}
        onChange={onChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {choices.map((choice) => (
          <MenuItem key={choice} value={choice}>
            {choice}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
