import axios from "axios";

async function fetchLaboratoriesData(): Promise<any> {
  try {
    const response = await axios.get(`/api/laboratories`, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    });

    const apiData = response.data; // Datos de la API sin mapear
    return apiData;
  } catch (error) {
    console.error("Error fetching laboratories data:", error);
    throw error;
  }
}

async function fetchPcsData(): Promise<any> {
  try {
    const response = await axios.get(`/api/pcs`, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    });

    const apiData = response.data; // Datos de la API sin mapear
    return apiData;
  } catch (error) {
    console.error("Error fetching PCs data:", error);
    throw error;
  }
}

async function getUser() {
  try {
    const response = await axios.get(`/api/auth/validateCookie`);

    const apiData = response.data; // Datos de la API sin mapear
    console.log(apiData);
    return apiData;
  } catch (error) {
    console.error("Error fetching User data:", error);
    throw error;
  }
}

export { fetchLaboratoriesData, fetchPcsData, getUser };
