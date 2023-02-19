import api, { Endpoints } from "./axios";

export async function getUsers() {
  return await api.get(Endpoints.users);
}
