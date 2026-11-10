import apiClient from "./client";

export const gajiService = {
  getAll: async () => {
    const response = await apiClient.get(`gaji`);
    return response.data;
  },
  create: async (payload) => {
    const response = await apiClient.post(`gaji`, payload);
    return response.data;
  },
};
