import {
  ScrollView,
  Text,
  View,
  TextInput,
  Switch,
  Pressable,
  Button,
} from "react-native";
import Card from "../components/ui/Card";
import { useKategori } from "../hooks/KategoriUse";

export default function KategoriScreen() {
  const {
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
  } = useKategori();
  // console.log("data kategori", data);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="gap-4 p-4"
    >
      <Text className="text-2xl font-bold text-slate-900 dark:text-white">
        Kategori
      </Text>

      <Card className="gap-3">
        <View>
          <Text className="mb-1 text-xs text-slate-500 dark:text-slate-400">
            Nama
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Kebutuhan Pokok"
            placeholderTextColor="#94a3b8"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-slate-900 dark:text-white">
            Kategori Investasi?
          </Text>
          <Switch
            value={isInves}
            onValueChange={setIsInves}
            trackColor={{ false: "#cbd5e1", true: "#22c55e" }}
            thumbColor="#ffffff"
          />
        </View>
        {idEdit !== "" ? (
          <Pressable
            onPress={handleEdit}
            className="items-center rounded-lg bg-teal-700 py-3 active:opacity-80"
          >
            <Text className="font-bold text-white">Update Kategori</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={handleCreate}
            className="items-center rounded-lg bg-teal-700 py-3 active:opacity-80"
          >
            <Text className="font-bold text-white">Simpan Kategori</Text>
          </Pressable>
        )}
        <Button
          title="clear"
          onPress={() => {
            handleClear();
          }}
        />
      </Card>
      <Card>
        <View className="flex-row border-b border-slate-200 pb-2 dark:border-slate-700">
          <Text className="flex-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
            Periode
          </Text>
          <Text className="flex-1 text-right text-xs font-semibold text-slate-500 dark:text-slate-400">
            Tipe
          </Text>
          <View className="w-8" />
        </View>
        {data.length === 0 ? (
          <Text className="py-6 text-center text-slate-500 dark:text-slate-400">
            Belum ada data gaji
          </Text>
        ) : (
          data.map((item) => (
            <Pressable key={item.id} onPress={() => handlePress(item)}>
              <View className="flex-row items-center border-b border-slate-100 py-3 dark:border-slate-700">
                <Text className="flex-1 text-slate-900 dark:text-white">
                  {item.name}
                </Text>
                <Text className="flex-1 text-right text-slate-900 dark:text-white">
                  {item.is_investasi ? "Dana Investasi" : "Dana Biasa"}
                </Text>
                <Pressable
                  onPress={() => handleDelete(item.id)}
                  hitSlop={8}
                  className="w-8 items-end cursor-pointer"
                >
                  <Text className="text-lg text-slate-400">✕</Text>
                </Pressable>
              </View>
            </Pressable>
          ))
        )}
      </Card>
    </ScrollView>
  );
}
