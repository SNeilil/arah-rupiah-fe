import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 30000,
});

console.log("API URL:", process.env.EXPO_PUBLIC_API_URL);

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(
      "API error:",
      err.config?.url,
      err.response?.status,
      err.message,
    );
    return Promise.reject(err);
  },
);

export default apiClient;
