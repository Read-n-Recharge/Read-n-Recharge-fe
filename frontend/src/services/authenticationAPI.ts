import axios from "axios";
import { api } from "./AxiosClient";

export const login = async (email: string, password: string) => {
  const response = await api.post("auth/token/", { email, password });
  localStorage.setItem("access_token", response.data.access);
  localStorage.setItem("refresh_token", response.data.refresh);
  api.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.access}`;
  return response.data;
};

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const response = await api.post("auth/token/register/", {
    email,
    password,
    first_name: firstName,
    last_name: lastName,
  });
  return response.data;
};

export const getDashboard = async () => {
  const response = await api.get("/dashboard/");
  return response.data;
};
