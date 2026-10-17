import { ScrollView, Text } from "react-native";
import { labelBulan } from "../utils/periode";

export default function DashboardScreen({ period }) {
  return (
    <ScrollView contentContainerClassName="p-4">
      <Text className="text-2xl font-bold text-slate-900 dark:text-white">
        Ringkasan {labelBulan(period)}
      </Text>
    </ScrollView>
  );
}
