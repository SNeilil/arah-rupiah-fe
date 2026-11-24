import { useCallback, useEffect, useState } from "react";
import { gajiService } from "../api/gajiApi";
import { categoryService } from "../api/kategoriApi";
import { budgetService } from "../api/budgetApi";
import { Alert } from "react-native";

export const useBudget = () => {
  const [data, setData] = useState([]);
  const [gaji, setGaji] = useState([]);
  const [selectGaji, setSelectGaji] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const responseGaji = await gajiService.getAll();
      setGaji(responseGaji.data);
      const responseCategory = await categoryService.getAll();
      setCategory(responseCategory.data);
      const responseBudget = await budgetService.getAll();
      setData(responseBudget.data);
      setError(null);
    } catch (err) {
      console.log("error fetch:", err.response?.status, err.message);
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
    data,
    gaji,
    category,
    selectGaji,
    selectCategory,
    setData,
    setGaji,
    setCategory,
    setSelectGaji,
    setSelectCategory,
    refetch: fetchData,
  };
};
