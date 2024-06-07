import config from "../config";

export async function getAppointments() {
  return fetch(`${config.API_URL}/appointments/`)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}

export async function deleteAppointment(id) {
  return fetch(`${config.API_URL}/appointments/${id}/`, { method: "DELETE" })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}

export async function editAppointment(appointment) {
  return fetch(`${config.API_URL}/appointments/${appointment.id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}
