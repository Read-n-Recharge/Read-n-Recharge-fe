import axios from "axios";
import { api } from "./AxiosClient";
import { AuthCredentials, StudyPreferenceData, Todo, UserData } from "../type";

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

export const RetrieveTask = async (): Promise<Todo[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found");
  }
  try {
    const response = await api.get(`task/tasks`);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const CreateTask = async (task: Partial<Todo>): Promise<Todo[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found");
  }
  try {
    const response = await api.post(`/task/tasks/create`, task);
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const UpdateTask = async (id:Todo):Promise<Todo[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found");
  }
  try {
    const response = await api.put(`task/tasks/update/${id}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// export const DeleteTask = async (id:Todo) => {
//   const token = localStorage.getItem("access_token");
//   if (!token) {
//     throw new Error("No access token found");
//   }
//   try {
//     const response = await api.put(`task/tasks/delete/${id}`);
//     console.log(response.data);
//     return response.data;
//   } catch (err) {
//     throw err;
//   }
// };
