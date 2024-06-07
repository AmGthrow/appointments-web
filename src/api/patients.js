import config from "../config";

export async function getPatients() {
  return fetch(`${config.API_URL}/patients/`)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}
