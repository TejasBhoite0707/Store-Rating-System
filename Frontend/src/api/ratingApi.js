import api from "./axios";

export const submitRating =
  async (data) => {
    return await api.post(
      "/ratings",
      data
    );
  };