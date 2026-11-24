import { useCallback, useEffect, useState } from "react";
import { gajiService } from "../api/gajiApi";
import { categoryService } from "../api/kategoriApi";
import { budgetService } from "../api/budgetApi";
import { Alert } from "react-native";

export const useBudget = () => {
  const [data, setData] = useState([]);
  const [gaji, setGaji] = useState([]);
  const [selectGaji, setSelectGaji] = useState("");
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [persen, setPersen] = useState(0);
  const [nominal, setNominal] = useState(0);

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

  const handleCreate = async () => {
    setLoading(true);
    const payload = {
      id_gaji: selectGaji,
      id_category: selectCategory,
      persen: persen,
      nominal: nominal,
      sisa: 0,
    };
    try {
      await budgetService.create(payload);
      await fetchData();
      setNominal("");
      setPersen("");
      setSelectCategory("");
      setSelectGaji("");
      Alert.alert("Budget berhasil ditambah");
    } catch (err) {
      console.log("create budget error:", err.response?.status, err.message);
      Alert.alert("Gagal menambah budget");
    } finally {
      setLoading(false);
    }
  };

  const handlePress = async (item) => {
    setSelectGaji(item.id_gaji);
    setSelectCategory(item.id_category);
    setPersen(String(item.persen));
    setNominal(String(item.nominal));
    setIdEdit(item.id);
  };
  const handleDelete = async (id) => {
    try {
      await budgetService.delete(id);
      await fetchData();
      Alert.alert("Budget berhasil dihapus");
    } catch (err) {
      console.log("delete budget error:", err.response?.status, err.message);
    }
  };
  const handleClear = () => {
    setSelectCategory("");
    setSelectGaji("");
    setNominal("");
    setPersen("");
    setIdEdit("");
  };
  const handleEdit = async () => {
    setLoading(true);
    const payload = { nominal };
    try {
      await budgetService.update(idEdit, payload);
      await fetchData();
      setNominal("");
      Alert.alert("Budget berhasil diupdate");
    } catch (err) {
      console.log("create budget error:", err.response?.status, err.message);
      Alert.alert("Gagal edit budget");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    gaji,
    category,
    selectGaji,
    selectCategory,
    idEdit,
    nominal,
    persen,
    handleCreate,
    handlePress,
    handleDelete,
    handleClear,
    handleEdit,
    setData,
    setGaji,
    setCategory,
    setSelectGaji,
    setSelectCategory,
    setIdEdit,
    setNominal,
    setPersen,
    refetch: fetchData,
  };
};
