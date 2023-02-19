import api, { Endpoints } from "./axios";

export async function login(credentials) {
  return await api.post(`${Endpoints.auth}/login`, credentials);
}
