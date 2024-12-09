import axios from "axios";

const api = axios.create({
    baseURL: "https://mern-azure-app-test.azurewebsites.net/",
    withCredentials: true,
})

export default api;