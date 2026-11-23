import apiClient from "./client";

export const categoryService = {
  getAll: async () => {
    const response = await apiClient.get(`category`);
    return response.data;
  },
  create: async (payload) => {
    const response = await apiClient.post(`category`, payload);
    return response.data;
  },
  update: async (id, payload) => {
    const response = await apiClient.put(`category/${id}`, payload);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`category/${id}`);
    return response.data;
  },
};
