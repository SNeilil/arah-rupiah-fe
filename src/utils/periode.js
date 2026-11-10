// Periode disimpan dalam bentuk teks "2026-10" (tahun-bulan)

export const bulanIni = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// delta = -1 untuk bulan lalu, +1 untuk bulan depan
export const geserBulan = (period, delta) => {
  const [tahun, bulan] = period.split("-").map(Number);
  const d = new Date(tahun, bulan - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

// "2026-10" → "Oktober 2026"
export const labelBulan = (period) => {
  const [tahun, bulan] = period.split("-").map(Number);
  return new Date(tahun, bulan - 1, 1).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
};

// Daftar 12 bulan terakhir, dari bulan ini mundur ke belakang
export const daftarBulan = (jumlah = 12) => {
  const sekarang = bulanIni();
  return Array.from({ length: jumlah }, (_, i) => geserBulan(sekarang, -i));
};
