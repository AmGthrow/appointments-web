import config from "../config";

export async function getAppointments() {
  return fetch(`${config.API_URL}/appointments/`) // Adjust the URL to your Django endpoint
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}

export async function deleteAppointment(id) {
  return fetch(`${config.API_URL}/appointments/${id}`, { method: "DELETE" }) // Adjust the URL to your Django endpoint
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}
