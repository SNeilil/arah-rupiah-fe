import apiClient from "./client";

export const gajiService = {
  getAll: async () => {
    const response = await apiClient.get(`gaji`);
    return response.data;
  },
};
