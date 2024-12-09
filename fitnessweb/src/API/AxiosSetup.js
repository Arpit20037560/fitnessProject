import axios from "axios";

const api = axios.create({
    baseURL: "https://fitnessproject-azure-app-service-plan-d9b0dqeqffatd5ea.westeurope-01.azurewebsites.net/",
    withCredentials: true,
})

export default api;