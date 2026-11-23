import { useCallback, useEffect, useState } from "react";
import { categoryService } from "../api/kategoriApi";
import { today } from "../utils/periode";
import { Alert } from "react-native";

export const useKategori = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [isInves, setIsInves] = useState(false);
  const [idEdit, setIdEdit] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await categoryService.getAll();
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
    const payload = { name, isInves };
    try {
      await categoryService.create(payload);
      await fetchData();
      setName("");
      setIsInves(false);
      Alert.alert("Kategori berhasil ditambah");
    } catch (err) {
      console.log("create kategori error:", err.response?.status, err.message);
      Alert.alert("Gagal menambah kategori");
    } finally {
      setLoading(false);
    }
  };

  const handlePress = async (item) => {
    setName(item.name);
    setIsInves(item.is_investasi);
    setIdEdit(item.id);
  };
  const handleDelete = async (id) => {
    try {
      await categoryService.delete(id);
      await fetchData();
      Alert.alert("Kategori berhasil dihapus");
    } catch (err) {
      console.log("delete kategori error:", err.response?.status, err.message);
    }
  };
  const handleClear = () => {
    setName("");
    setIsInves(false);
    setIdEdit("");
  };
  const handleEdit = async () => {
    setLoading(true);
    const payload = { name, isInves };
    try {
      await categoryService.update(idEdit, payload);
      await fetchData();
      setName("");
      setIsInves(false);
      Alert.alert("Kategori berhasil diupdate");
    } catch (err) {
      console.log("create kategori error:", err.response?.status, err.message);
      Alert.alert("Gagal edit kategori");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    name,
    isInves,
    idEdit,
    setName,
    setIsInves,
    setData,
    handleCreate,
    handleDelete,
    handlePress,
    handleClear,
    handleEdit,
    refetch: fetchData,
  };
};
