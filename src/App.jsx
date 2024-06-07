import { ThemeProvider, createTheme } from "@mui/material";
import Calendar from "./components/Calendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={darkTheme}>
        <Calendar />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
