import { useEffect, useState } from "react";
import { getAppointments } from "../api/appointments";

function Calendar() {
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    getAppointments().then((appointments) => setAppointments(appointments));
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
export default Calendar;
