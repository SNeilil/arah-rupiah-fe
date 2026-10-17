import { Text, View } from "react-native";

export default function PlaceholderScreen({ title }) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold text-slate-900 dark:text-white">
        {title}
      </Text>
      <Text className="mt-1 text-slate-500 dark:text-slate-400">
        Halaman ini belum dibuat
      </Text>
    </View>
  );
}
