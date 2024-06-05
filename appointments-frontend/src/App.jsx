import { useEffect, useState } from "react";
import "./App.css";
import config from "./config";

function App() {
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    fetch(`${config.API_URL}/appointments/`) // Adjust the URL to your Django endpoint
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Data from Django</h1>
      {appointments ? (
        <pre>{JSON.stringify(appointments, null, 2)}</pre>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;
