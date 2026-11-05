import { useEffect, useState } from "react";
import { gajiService } from "../api/gajiApi";

export const useGaji = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await gajiService.getAll();
        setData(response.data);
      } catch (err) {
        console.log("error gaji:", err.response?.status, err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    data,
    setData,
  };
};
