import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import PeriodPicker from "./PeriodPicker";
import TopTabs from "./TopTabs";

export default function Header({
  title,
  period,
  onChangePeriod,
  tabs,
  activeTab,
  onChangeTab,
}) {
  const adaMenuAtas = tabs && tabs.length > 0;

  return (
    <View className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <SafeAreaView edges={["top"]}>
        {/* Baris 1: logo + judul, pemilih periode */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <View className="flex-row items-center">
            <Text className="text-2xl">💰</Text>
            <Text className="ml-2 text-xl font-bold text-teal-700 dark:text-teal-400">
              {title}
            </Text>
          </View>
          {/* <PeriodPicker period={period} onChange={onChangePeriod} /> */}
        </View>

        {/* Baris 2: menu atas, hanya tampil kalau menu bawah punya sub-menu */}
        {adaMenuAtas && (
          <TopTabs tabs={tabs} activeId={activeTab} onChange={onChangeTab} />
        )}
      </SafeAreaView>
    </View>
  );
}
