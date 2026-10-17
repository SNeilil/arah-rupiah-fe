import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BottomNav({ items, activeId, onChange }) {
  return (
    <View className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      {/* SafeAreaView menjaga menu tidak tertutup garis navigasi HP */}
      <SafeAreaView edges={["bottom"]}>
        <View className="flex-row">
          {items.map((item) => {
            const aktif = item.id === activeId;
            return (
              <Pressable
                key={item.id}
                onPress={() => onChange(item.id)}
                className="flex-1 items-center py-2"
              >
                <Text className={`text-2xl ${aktif ? "" : "opacity-40"}`}>
                  {item.icon}
                </Text>
                <Text
                  className={`mt-0.5 text-xs ${
                    aktif
                      ? "font-bold text-teal-700 dark:text-teal-400"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}
