import axios from "axios";
import { api } from "./AxiosClient";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("auth/token/", { email, password });
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.access}`;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Login error response:", error.response.data);
      throw error.response.data;
    }
    throw error;
  }
};

export const register = async (
  email: string,
  password: string,
  confirm_password: string,
  first_name: string,
  last_name: string
) => {
  try {
    const response = await api.post("auth/register/", {
      email,
      password,
      confirm_password: confirm_password,
      first_name: first_name,
      last_name: last_name,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Registration error response:", error.response.data);
    }
    throw error;
  }
};

export const getDashboard = async () => {
  const response = await api.get("/dashboard/");
  return response.data;
};

export const submitStudyPreference = async (userId: number, preferenceData: {
  chronotype: string;
  concentration: string;
  studying_style: string;
  procrastination: boolean;
  physical_activity: string;
}) => {
  try {
    const response = await api.post(`auth/form/${userId}/`, preferenceData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error submitting study preference:', error.response.data);
      throw error.response.data;
    }
    throw error;
  }
};