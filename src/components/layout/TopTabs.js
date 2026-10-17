import { Pressable, Text, View } from "react-native";

export default function TopTabs({ tabs, activeId, onChange }) {
  return (
    <View className="mx-4 mb-3 flex-row rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
      {tabs.map((tab) => {
        const aktif = tab.id === activeId;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChange(tab.id)}
            className={`flex-1 items-center rounded-lg py-2 ${
              aktif ? "bg-teal-700" : ""
            }`}
          >
            <Text
              className={`font-semibold ${
                aktif ? "text-white" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
