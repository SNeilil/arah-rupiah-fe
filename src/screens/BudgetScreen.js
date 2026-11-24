import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import Card from "../components/ui/Card";
import { Picker } from "@react-native-picker/picker";
import { useBudget } from "../hooks/BudgetUse";
import { labelBulan } from "../utils/periode";
import { formatRupiah } from "../utils/format";

export default function BudgetScreen() {
  const {
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
  } = useBudget();

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="gap-4 p-4"
    >
      <Text className="text-2xl font-bold text-slate-900 dark:text-white">
        Budget
      </Text>

      {/* CARD 1: Form */}
      <Card className="gap-3">
        <View className="flex-row">
          <View className="flex-1">
            <Text className="mb-1 text-xs text-slate-500 dark:text-slate-400">
              Gaji
            </Text>
            <View className="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700">
              <Picker
                selectedValue={selectGaji}
                onValueChange={(value) => setSelectGaji(value)}
              >
                <Picker.Item label="Pilih Gaji" value="" />
                {gaji.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={labelBulan(item.periode)}
                    value={item.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View className="flex-1">
            <Text className="mb-1 text-xs text-slate-500 dark:text-slate-400">
              Kategori
            </Text>
            <View className="rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700">
              <Picker
                selectedValue={selectCategory}
                onValueChange={(value) => setSelectCategory(value)}
              >
                <Picker.Item label="Pilih Kategori" value="" />
                {category.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={item.name}
                    value={item.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        <View className="flex-row">
          <View className="flex-[1]">
            <Text className="mb-1 text-xs text-slate-500 dark:text-slate-400">
              Persen
            </Text>
            <TextInput
              value={persen}
              onChangeText={setPersen}
              // editable={!idEdit}
              placeholder="100"
              placeholderTextColor="#94a3b8"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
          </View>
          <View className="flex-[2]">
            <Text className="mb-1 text-xs text-slate-500 dark:text-slate-400">
              Nominal
            </Text>
            <TextInput
              value={nominal}
              onChangeText={setNominal}
              // editable={!idEdit}
              placeholder="100000"
              placeholderTextColor="#94a3b8"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
          </View>
        </View>
        {idEdit !== "" ? (
          <Pressable
            onPress={handleEdit}
            className="items-center rounded-lg bg-teal-700 py-3 active:opacity-80"
          >
            <Text className="font-bold text-white">Simpan update</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={handleCreate}
            className="items-center rounded-lg bg-teal-700 py-3 active:opacity-80"
          >
            <Text className="font-bold text-white">Simpan Budget</Text>
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
            Kategori
          </Text>
          <Text className="flex-1 text-right text-xs font-semibold text-slate-500 dark:text-slate-400">
            %
          </Text>
          <Text className="flex-1 text-right text-xs font-semibold text-slate-500 dark:text-slate-400">
            Budget
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
                  {item.persen}
                </Text>
                <Text className="flex-1 text-right text-slate-900 dark:text-white">
                  {" "}
                  {formatRupiah(item.nominal)}
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
