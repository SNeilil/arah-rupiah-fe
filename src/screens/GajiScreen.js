import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Card from "../components/ui/Card";
import { bulanIni, labelBulan } from "../utils/periode";
import { formatRupiah } from "../utils/format";
import { useGaji } from "../hooks/GajiUse";

export default function GajiScreen() {
  const {
    data,
    loading,
    error,
    periode,
    nominal,
    setPeriode,
    setNominal,
    handleCreate,
    handleDelete,
  } = useGaji();

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="gap-4 p-4"
    >
      <Text className="text-2xl font-bold text-slate-900 dark:text-white">
        Gaji
      </Text>

      {/* CARD 1: Form */}
      <Card className="gap-3">
        <View>
          <Text className="mb-1 text-xs text-slate-500 dark:text-slate-400">
            Periode (TAHUN-BULAN)
          </Text>
          <TextInput
            value={periode}
            onChangeText={setPeriode}
            placeholder="2026-10"
            placeholderTextColor="#94a3b8"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </View>

        <View>
          <Text className="mb-1 text-xs text-slate-500 dark:text-slate-400">
            Nominal (Rp)
          </Text>
          <TextInput
            value={nominal}
            onChangeText={setNominal}
            keyboardType="numeric"
            placeholder="10000000"
            placeholderTextColor="#94a3b8"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </View>

        <Pressable
          onPress={handleCreate}
          className="items-center rounded-lg bg-teal-700 py-3 active:opacity-80"
        >
          <Text className="font-bold text-white">+ Simpan gaji</Text>
        </Pressable>
      </Card>

      {/* CARD 2: Daftar gaji */}
      <Card>
        {/* Judul kolom */}
        <View className="flex-row border-b border-slate-200 pb-2 dark:border-slate-700">
          <Text className="flex-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
            Periode
          </Text>
          <Text className="flex-1 text-right text-xs font-semibold text-slate-500 dark:text-slate-400">
            Nominal
          </Text>
          <View className="w-8" />
        </View>

        {/* Baris data */}
        {data.length === 0 ? (
          <Text className="py-6 text-center text-slate-500 dark:text-slate-400">
            Belum ada data gaji
          </Text>
        ) : (
          data.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center border-b border-slate-100 py-3 dark:border-slate-700"
            >
              <Text className="flex-1 text-slate-900 dark:text-white">
                {labelBulan(item.periode)}
              </Text>
              <Text className="flex-1 text-right text-slate-900 dark:text-white">
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
          ))
        )}
      </Card>
    </ScrollView>
  );
}
