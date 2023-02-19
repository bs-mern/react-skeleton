import api, { Endpoints } from "./axios";

export async function getUsers() {
  return await api.get(Endpoints.users);
}

export async function signUp(user) {
  return await api.post(Endpoints.users, user);
}
