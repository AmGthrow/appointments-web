import config from "../config";

export async function getAppointments() {
  return fetch(`${config.API_URL}/appointments/`) // Adjust the URL to your Django endpoint
    .then((response) => response.json())
    .then((appointments) =>
      appointments.map((appointment) => ({
        id: appointment.id,
        start: appointment.start_time,
        end: appointment.end_time,
        title: appointment.patients.join(","),
      })),
    )
    .catch((error) => console.error("Error:", error));
}
