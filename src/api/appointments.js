import config from "../config";

export async function getAppointments() {
  return fetch(`${config.API_URL}/appointments/`) // Adjust the URL to your Django endpoint
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}
