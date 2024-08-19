import axios from "axios";
import { api } from "./AxiosClient";
import {
  AuthCredentials,
  StudyPreferenceData,
  UserData,
  DecodedTokenData,
  Todo,
} from "../type";
import { jwtDecode } from "jwt-decode";

const getToken = (): string => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token found");
  return token;
};

const decodeToken = (): DecodedTokenData => {
  try {
    const token = getToken();
    return jwtDecode<DecodedTokenData>(token);
  } catch (error) {
    throw new Error("Failed to decode token: " + error.message);
  }
};

export const getUserIdFromToken = (): number => {
  const decoded = decodeToken();
  const userId = decoded.user_id;
  if (!userId) throw new Error("Invalid token");
  return userId;
};

export const login = async ({ email, password }: AuthCredentials) => {
  try {
    const response = await api.post("/auth/token/", { email, password });

    // Store token in localStorage
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

export const getUserProfile = async () => {
  const userId = getUserIdFromToken();
  try {
    const response = await api.get(`auth/user/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const RetrieveTask = async (): Promise<Todo[]> => {
  try {
    const response = await api.get(`task/tasks`);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const CreateTask = async (task: Partial<Todo>): Promise<Todo[]> => {
  try {
    const response = await api.post(`/task/tasks/create`, task);
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const UpdateTask = async (
  user: number,
  updatedTask: Partial<Todo>
): Promise<Todo[]> => {
  try {
    const response = await api.put(`task/tasks/update/${user}`, updatedTask);
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const DeleteTask = async (id: number): Promise<Todo[]> => {
  try {
    const response = await api.delete(`task/tasks/delete/${id}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const RetrieveStudyPreference = async () => {
  const userId = getUserIdFromToken();
  try {
    const response = await api.get(`auth/form/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const PostMoodRecord = async (moodData) => {
  const userId = getUserIdFromToken();
  try {
    const response = await api.post(`moods/${userId}`, moodData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const RetrieveMoodRecords = async () => {
  try {
    const response = await api.get(`moods/`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    await api.post("/auth/logout", { refresh_token: refreshToken });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    delete api.defaults.headers.common["Authorization"];
    window.location.href = "/";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const points_record = async (points, action) => {
  try {
    const response = await api.post("/points/points_record/", {
      points: points,
      action: action,
    });
    console.log(response.data);
  } catch (error) {
    throw new Error(error);
  }
};

export const startRelay = async (relayID: number, duration: number) => {
  const response = await api.post(`/mqtt/relay/${relayID}/start/`, { duration });
  return response.data; 
};

export const stopRelay = async (relayID: number) => {
  const response = await api.post('/mqtt/relay/${relayID}/stop');
  return response.data;
};

export const Relaytatus = async () => {
  const response = await api.get(`/mqtt/relay/status/`);
  return response.data; 
};
