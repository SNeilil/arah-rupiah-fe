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
  update: async (id, payload) => {
    const response = await apiClient.put(`gaji/${id}`, payload);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`gaji/${id}`);
    return response.data;
  },
};
