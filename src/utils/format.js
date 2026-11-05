export const formatRupiah = (angka) => {
  const nilai = Number(angka);
  if (isNaN(nilai)) return "Rp 0";

  const negatif = nilai < 0;
  const teks = Math.abs(Math.round(nilai))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${negatif ? "-" : ""}Rp ${teks}`;
};
