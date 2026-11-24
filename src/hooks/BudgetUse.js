import { useCallback, useEffect, useState } from "react";
import { gajiService } from "../api/gajiApi";
import { categoryService } from "../api/kategoriApi";
import { Alert } from "react-native";

export const useBudget = () => {
  const [gaji, setGaji] = useState([]);
  const [selectGaji, setSelectGaji] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await gajiService.getAll();
      setGaji(response.data);
      const res = await categoryService.getAll();
      setCategory(res.data);
      setError(null);
    } catch (err) {
      console.log("error gaji:", err.response?.status, err.message);
      setError(err);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };
    load();
  }, [fetchData]);

  return {
    loading,
    error,
    gaji,
    category,
    selectGaji,
    selectCategory,
    setGaji,
    setCategory,
    setSelectGaji,
    setSelectCategory,
    refetch: fetchData,
  };
};
