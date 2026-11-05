import "./global.css";
import { useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "./src/components/layout/header";
import BottomNav from "./src/components/layout/BottomNav";
import DashboardScreen from "./src/screens/DashboardScreen";
import GajiScreen from "./src/screens/GajiScreen";
import PlaceholderScreen from "./src/screens/PlaceholderScreen";
import { MENU } from "./src/constants/menu";
import { bulanIni } from "./src/utils/periode";

// Daftar halaman: id menu → komponen halamannya.
// Setiap kali kamu membuat halaman baru, tambahkan satu baris di sini.
const SCREENS = {
  gaji: GajiScreen,
  // kategori: KategoriScreen,
  // budget: BudgetScreen,
  // pengeluaran: PengeluaranScreen,
  // pemasukan: PemasukanScreen,
  // portofolio: PortofolioScreen,
  // evaluasi: EvaluasiScreen,
};

export default function App() {
  const [period, setPeriod] = useState(bulanIni());
  const [groupId, setGroupId] = useState("beranda"); // menu bawah
  const [subId, setSubId] = useState(null); // menu atas

  const group = MENU.find((g) => g.id === groupId);

  // Saat menu bawah diganti, menu atas kembali ke sub-menu pertama
  const pilihGroup = (id) => {
    const g = MENU.find((item) => item.id === id);
    setGroupId(id);
    setSubId(g.children.length > 0 ? g.children[0].id : null);
  };

  // Tentukan halaman yang ditampilkan
  const renderScreen = () => {
    if (groupId === "beranda") {
      return <DashboardScreen period={period} />;
    }

    const sub = group.children.find((c) => c.id === subId);
    const Screen = SCREENS[subId]; // cari halaman di daftar

    if (Screen) {
      return <Screen period={period} />;
    }
    // Belum ada halamannya → tampilkan halaman sementara
    return <PlaceholderScreen title={sub ? sub.label : group.label} />;
  };

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-950">
      <StatusBar style="auto" />

      <Header
        title="Duitku"
        period={period}
        onChangePeriod={setPeriod}
        tabs={group.children}
        activeTab={subId}
        onChangeTab={setSubId}
      />

      <View className="flex-1">{renderScreen()}</View>

      <BottomNav items={MENU} activeId={groupId} onChange={pilihGroup} />
    </View>
  );
}
