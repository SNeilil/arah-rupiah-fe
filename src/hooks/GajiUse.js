import { useCallback, useEffect, useState } from "react";
import { gajiService } from "../api/gajiApi";
import { today } from "../utils/periode";
import { Alert } from "react-native";

export const useGaji = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [periode, setPeriode] = useState(today());
  const [nominal, setNominal] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await gajiService.getAll();
      setData(response.data);
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

  const handleCreate = async () => {
    setLoading(true);
    const payload = { periode, nominal };
    try {
      await gajiService.create(payload);
      await fetchData();
      setNominal("");
      Alert.alert("Gaji berhasil ditambah");
    } catch (err) {
      console.log("create gaji error:", err.response?.status, err.message);
      Alert.alert("Gagal menambah gaji");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    periode,
    nominal,
    setPeriode,
    setNominal,
    setData,
    handleCreate,
    refetch: fetchData,
  };
};
