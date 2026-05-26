import api from "./axios";

export const getStores =
  async (search = "") => {
    return await api.get(
      `/stores?search=${search}`
    );
  };

  export const getOwnerDashboard =
  async () => {
    return await api.get(
      "/stores/owner/dashboard"
    );
  };