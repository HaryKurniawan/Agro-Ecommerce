// =====================================================
// DATA DUMMY SELLER - ECOMMERCE SAYUR
// =====================================================

import type { TokoSaya, ProdukSaya, PaketSaya, PesananMasuk, BookingMasuk } from '../types/seller';

export const dummyTokoSaya: TokoSaya = {
  id: 'TK001', nama: 'Agro Bandung', kabupaten: 'Kab. Bandung', wilayah: 'Bandung Raya',
  alamat: 'Jl. Soekarno-Hatta No. 123, Bandung', deskripsi: 'Toko sayur segar langsung dari petani Bandung Raya. Menyediakan berbagai komoditas unggulan Jawa Barat.',
  rating: 4.8, totalProduk: 12, totalPesanan: 320, totalPendapatan: 45600000,
  foto: '🏪', status: 'aktif', noHp: '081234567890', email: 'agrobandung@agro.id', nomorSIUP: 'SIUP/503/2025/001',
};

export const dummyProdukSaya: ProdukSaya[] = [
  { id: 'SP001', nama: 'Tomat Segar Premium', kategori: 'Sayuran', harga: 12000, stok: 500, satuan: 'kg', terjual: 230, rating: 4.8, gambar: '🍅', deskripsi: 'Tomat merah segar dari kebun Lembang', status: 'aktif', beratPerItem: 1 },
  { id: 'SP002', nama: 'Cabai Merah Keriting', kategori: 'Sayuran', harga: 45000, stok: 200, satuan: 'kg', terjual: 180, rating: 4.9, gambar: '🌶️', deskripsi: 'Cabai merah segar, pedas mantap', status: 'aktif', beratPerItem: 1 },
  { id: 'SP003', nama: 'Kubis Hijau', kategori: 'Sayuran', harga: 6500, stok: 1000, satuan: 'kg', terjual: 560, rating: 4.4, gambar: '🥬', deskripsi: 'Kubis hijau segar dari dataran tinggi', status: 'aktif', beratPerItem: 1 },
  { id: 'SP004', nama: 'Bawang Merah', kategori: 'Umbi', harga: 35000, stok: 0, satuan: 'kg', terjual: 90, rating: 4.5, gambar: '🧅', deskripsi: 'Bawang merah pilihan', status: 'habis', beratPerItem: 1 },
  { id: 'SP005', nama: 'Kangkung Segar', kategori: 'Sayuran', harga: 5000, stok: 300, satuan: 'ikat', terjual: 420, rating: 4.3, gambar: '🥬', deskripsi: 'Kangkung segar setiap hari', status: 'aktif', beratPerItem: 0.3 },
  { id: 'SP006', nama: 'Terong Ungu', kategori: 'Sayuran', harga: 8000, stok: 150, satuan: 'kg', terjual: 65, rating: 4.2, gambar: '🍆', deskripsi: 'Terong ungu segar', status: 'draft', beratPerItem: 1 },
];

export const dummyPaketSaya: PaketSaya[] = [
  { id: 'SPK001', nama: 'Paket Sayur Sop', tipe: 'Masakan Rumahan', harga: 35000, hargaAsli: 42000, items: ['Wortel', 'Kentang', 'Kubis', 'Buncis', 'Daun Bawang'], porsi: 4, terjual: 89, status: 'aktif' },
  { id: 'SPK002', nama: 'Paket Tumis Kangkung', tipe: 'Masakan Rumahan', harga: 15000, hargaAsli: 18000, items: ['Kangkung', 'Cabai', 'Bawang Merah', 'Tomat'], porsi: 3, terjual: 156, status: 'aktif' },
  { id: 'SPK003', nama: 'Paket Gado-Gado', tipe: 'Masakan Tradisional', harga: 25000, hargaAsli: 30000, items: ['Kubis', 'Tauge', 'Kentang', 'Tomat', 'Mentimun'], porsi: 3, terjual: 45, status: 'aktif' },
];

export const dummyPesananMasuk: PesananMasuk[] = [
  { id: 'PM001', pembeli: 'Rina Agustina', noHpPembeli: '081999111222', items: [{ nama: 'Tomat Segar', qty: 2, harga: 12000 }, { nama: 'Kubis Hijau', qty: 1, harga: 6500 }], total: 30500, status: 'baru', tanggal: '2026-02-28', alamat: 'Jl. Merdeka No. 5, Bandung', metodeBayar: 'Transfer BCA', catatan: 'Tolong pilih yang segar ya' },
  { id: 'PM002', pembeli: 'Maya Sari', noHpPembeli: '081888222333', items: [{ nama: 'Paket Sayur Sop', qty: 1, harga: 35000 }, { nama: 'Cabai Merah', qty: 0.5, harga: 45000 }], total: 57500, status: 'diproses', tanggal: '2026-02-28', alamat: 'Jl. Dago No. 20, Bandung', metodeBayar: 'GoPay' },
  { id: 'PM003', pembeli: 'Agus Setiawan', noHpPembeli: '081777333444', items: [{ nama: 'Kangkung Segar', qty: 5, harga: 5000 }, { nama: 'Tomat Segar', qty: 3, harga: 12000 }], total: 61000, status: 'dikirim', tanggal: '2026-02-27', alamat: 'Jl. Pasteur No. 15, Bandung', metodeBayar: 'DANA' },
  { id: 'PM004', pembeli: 'Siti Nurhaliza', noHpPembeli: '081666444555', items: [{ nama: 'Kubis Hijau', qty: 3, harga: 6500 }], total: 19500, status: 'selesai', tanggal: '2026-02-25', alamat: 'Jl. Cihampelas No. 8, Bandung', metodeBayar: 'COD' },
  { id: 'PM005', pembeli: 'Budi Hartono', noHpPembeli: '081555666777', items: [{ nama: 'Cabai Merah', qty: 2, harga: 45000 }], total: 90000, status: 'dibatalkan', tanggal: '2026-02-26', alamat: 'Jl. Buah Batu No. 33, Bandung', metodeBayar: 'Transfer BRI', catatan: 'Batal karena stok habis' },
];

export const dummyBookingMasuk: BookingMasuk[] = [
  { id: 'BM001', perusahaan: 'PT Catering Bandung Sejahtera', pic: 'Pak Darmawan', noHp: '081222333444', komoditas: 'Kubis Hijau', jumlahKg: 500, hargaPerKg: 5500, total: 2750000, status: 'dikonfirmasi', tanggalBooking: '2026-02-20', tanggalKirim: '2026-03-05' },
  { id: 'BM002', perusahaan: 'Hotel Savoy Homann', pic: 'Chef Ronal', noHp: '081444555666', komoditas: 'Tomat Premium', jumlahKg: 200, hargaPerKg: 11000, total: 2200000, status: 'masuk', tanggalBooking: '2026-02-27', tanggalKirim: '2026-03-10' },
  { id: 'BM003', perusahaan: 'RM Padang Sederhana', pic: 'Ibu Sari', noHp: '081333444555', komoditas: 'Cabai Merah', jumlahKg: 100, hargaPerKg: 42000, total: 4200000, status: 'selesai', tanggalBooking: '2026-02-15', tanggalKirim: '2026-02-22' },
];

export const formatRupiah = (angka: number): string => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
};

export const formatTanggal = (tanggal: string): string => {
  return new Date(tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};
