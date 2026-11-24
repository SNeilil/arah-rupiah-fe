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

export default function BudgetScreen() {
  const {
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
              // value={periode}
              // onChangeText={setPeriode}
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
              // value={periode}
              // onChangeText={setPeriode}
              // editable={!idEdit}
              placeholder="100000"
              placeholderTextColor="#94a3b8"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
          </View>
        </View>
      </Card>

      <Card>
        <View className="flex-row border-b border-slate-200 pb-2 dark:border-slate-700">
          <Text className="flex-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
            Periode
          </Text>
          <Text className="flex-1 text-right text-xs font-semibold text-slate-500 dark:text-slate-400">
            Nominal
          </Text>
          <View className="w-8" />
        </View>
      </Card>
    </ScrollView>
  );
}
