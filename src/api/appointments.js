import config from "../config";

export async function getAppointments(from_date = null, to_date = null) {
  const urlParams = new URLSearchParams({
    ...(from_date && { from_date }),
    ...(to_date && { to_date }),
  });
  return fetch(`${config.API_URL}/appointments/?${urlParams.toString()}`)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}

export async function addAppointment(appointment) {
  return fetch(`${config.API_URL}/appointments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  })
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error[0] || error["non_field_errors"] || "An error occurred",
        );
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
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
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error[0] || error["non_field_errors"] || "An error occurred",
        );
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}
