import axios from "axios";
import Config from "../Config/Config";

const api = axios.create({
    baseURL: Config.apiUrl,
    withCredentials: true,
})

export default api;