import axios from "axios";
import Config from "../Config/Config";

const api = axios.create({
    baseURL: "https://mern-azure-app-test.azurewebsites.net",
    withCredentials: true,
})

export default api;