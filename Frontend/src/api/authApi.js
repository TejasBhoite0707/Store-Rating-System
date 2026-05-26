import api from "./axios";

export const signupUser =
  async (data) => {
    return await api.post(
      "/auth/signup",
      data
    );
  };

export const loginUser =
  async (data) => {
    return await api.post(
      "/auth/login",
      data
    );
  };

export const getCurrentUser =
  async () => {
    return await api.get(
      "/users/me"
    );
  };