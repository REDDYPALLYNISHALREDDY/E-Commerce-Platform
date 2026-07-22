import API from "../api/axios";

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);

  localStorage.setItem("token", response.data.token);

  return response.data;
};

export const logoutUser = async () => {
  localStorage.removeItem("token");
  return { success: true };
};

export const getCurrentUser = async () => {
  const response = await API.get("/auth/me");
  return response.data;
};