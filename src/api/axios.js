import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000" });

export default api;

export const Endpoints = { users: "users", auth: "auth" };
