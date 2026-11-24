import apiClient from "./client";

export const budgetService = {
  getAll: async () => {
    const response = await apiClient.get(`budget`);
    return response.data;
  },
  create: async (payload) => {
    const response = await apiClient.post(`budget`, payload);
    return response.data;
  },
  update: async (id, payload) => {
    const response = await apiClient.put(`budget/${id}`, payload);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`budget/${id}`);
    return response.data;
  },
};
