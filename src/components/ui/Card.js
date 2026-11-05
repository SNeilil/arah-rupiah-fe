import { View } from "react-native";

export default function Card({ children, className = "" }) {
  return (
    <View
      className={`rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      {children}
    </View>
  );
}
