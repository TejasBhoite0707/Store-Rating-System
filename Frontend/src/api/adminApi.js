import api from "./axios";

export const getDashboardStats =
  async () => {
    return await api.get(
      "/admin/dashboard"
    );
  };

export const getAllUsers =
  async () => {
    return await api.get(
      "/admin/users"
    );
  };

export const getAllStores =
  async () => {
    return await api.get(
      "/admin/stores"
    );
  };

export const createUser =
  async (data) => {
    return await api.post(
      "/admin/users",
      data
    );
  };

export const createStore =
  async (data) => {
    return await api.post(
      "/admin/stores",
      data
    );
  };

  export const getStoreOwners =
  async () => {
    return await api.get(
      "/admin/users?role=STORE_OWNER"
    );
  };