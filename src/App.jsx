import { ThemeProvider, createTheme } from "@mui/material";
import Calendar from "./components/Calendar";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Calendar />
    </ThemeProvider>
  );
}

export default App;
