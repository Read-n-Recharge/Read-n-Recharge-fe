import axios from "axios";
import { api } from "./AxiosClient";
import { AuthCredentials, StudyPreferenceData, UserData } from "../type";

export const login = async ({ email, password }: AuthCredentials) => {
  try {
    const response = await api.post("/auth/token/", { email, password });
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

export const register = async (data: UserData) => {
  try {
    const response = await api.post("auth/register/", data);
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

export const submitStudyPreference = async (
  userId: number,
  preferenceData: StudyPreferenceData
) => {
  try {
    const response = await api.post(`auth/form/${userId}/`, preferenceData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error submitting study preference:", error.response.data);
      throw error.response.data;
    }
    throw error;
  }
};

export const getUserProfile = async (userId: number) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found");
  }
  const response = await api.get(`/auth/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
};