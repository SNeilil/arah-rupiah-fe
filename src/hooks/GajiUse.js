import { useEffect, useState } from "react";
import { gajiService } from "../api/gajiApi";
import { today } from "../utils/periode";
import { Alert } from "react-native";

export const useGaji = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [periode, setPeriode] = useState(today());
  const [nominal, setNominal] = useState();
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

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      periode: periode,
      nominal: nominal,
    };
    try {
      const response = await gajiService.create(payload);
      Alert.alert("Gaji berhasil ditambah");
    } catch (error) {
      return err;
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
  };
};
