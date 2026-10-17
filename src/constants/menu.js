// children: [] artinya menu ini TIDAK punya menu atas
export const MENU = [
  {
    id: "beranda",
    label: "Beranda",
    icon: "🏠",
    children: [],
  },
  {
    id: "transaksi",
    label: "Transaksi",
    icon: "🧾",
    children: [
      { id: "pengeluaran", label: "Pengeluaran" },
      { id: "pemasukan", label: "Pemasukan" },
    ],
  },
  {
    id: "anggaran",
    label: "Anggaran",
    icon: "🧮",
    children: [
      { id: "gaji", label: "Gaji" },
      { id: "kategori", label: "Kategori" },
      { id: "budget", label: "Budget" },
    ],
  },
  {
    id: "investasi",
    label: "Investasi",
    icon: "📈",
    children: [
      { id: "portofolio", label: "Portofolio" },
      { id: "evaluasi", label: "Evaluasi" },
    ],
  },
];
