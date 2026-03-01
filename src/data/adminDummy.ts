// =====================================================
// DATA DUMMY ADMIN - ECOMMERCE SAYUR
// =====================================================

import type { AdminToko, AdminProduk, AdminPaket, AdminPesanan, AdminBooking, AdminPromo, BarangSiapJual, DataIzin, BarangMasukProcessing } from '../types/admin';

export const dummyAdminToko: AdminToko[] = [
  { id: 'TK001', nama: 'Agro Bandung', kabupaten: 'Kab. Bandung', wilayah: 'Bandung Raya', alamat: 'Jl. Soekarno-Hatta No. 123', rating: 4.8, totalProduk: 45, totalPesanan: 320, status: 'aktif', emoji: '🏪', bergabung: '2025-06-01' },
  { id: 'TK002', nama: 'Agro Garut', kabupaten: 'Kab. Garut', wilayah: 'Priangan Timur', alamat: 'Jl. Ahmad Yani No. 33', rating: 4.6, totalProduk: 32, totalPesanan: 198, status: 'aktif', emoji: '🏬', bergabung: '2025-07-15' },
  { id: 'TK003', nama: 'Agro Cianjur', kabupaten: 'Kab. Cianjur', wilayah: 'Bandung Raya', alamat: 'Jl. Dr. Muwardi No. 8', rating: 4.5, totalProduk: 28, totalPesanan: 145, status: 'aktif', emoji: '🏪', bergabung: '2025-08-01' },
  { id: 'TK004', nama: 'Agro Sukabumi', kabupaten: 'Kab. Sukabumi', wilayah: 'Sukabumi', alamat: 'Jl. Pelabuhan Ratu No. 5', rating: 4.7, totalProduk: 38, totalPesanan: 267, status: 'aktif', emoji: '🏬', bergabung: '2025-09-10' },
  { id: 'TK005', nama: 'Agro Subang', kabupaten: 'Kab. Subang', wilayah: 'Pantura', alamat: 'Jl. Otto Iskandardinata No. 12', rating: 4.3, totalProduk: 20, totalPesanan: 87, status: 'nonaktif', emoji: '🏪', bergabung: '2025-10-20' },
];

export const dummyAdminProduk: AdminProduk[] = [
  { id: 'PRD001', nama: 'Tomat Segar Premium', kategori: 'Sayuran', tokoId: 'TK001', tokoNama: 'Agro Bandung', harga: 12000, stok: 500, satuan: 'kg', terjual: 230, rating: 4.8, gambar: '🍅', status: 'aktif' },
  { id: 'PRD002', nama: 'Cabai Merah Keriting', kategori: 'Sayuran', tokoId: 'TK001', tokoNama: 'Agro Bandung', harga: 45000, stok: 200, satuan: 'kg', terjual: 180, rating: 4.9, gambar: '🌶️', status: 'aktif' },
  { id: 'PRD003', nama: 'Kentang Granola', kategori: 'Umbi', tokoId: 'TK002', tokoNama: 'Agro Garut', harga: 15000, stok: 800, satuan: 'kg', terjual: 420, rating: 4.7, gambar: '🥔', status: 'aktif' },
  { id: 'PRD004', nama: 'Wortel Baby', kategori: 'Sayuran', tokoId: 'TK003', tokoNama: 'Agro Cianjur', harga: 18000, stok: 300, satuan: 'kg', terjual: 150, rating: 4.6, gambar: '🥕', status: 'aktif' },
  { id: 'PRD005', nama: 'Bawang Merah', kategori: 'Umbi', tokoId: 'TK002', tokoNama: 'Agro Garut', harga: 35000, stok: 0, satuan: 'kg', terjual: 90, rating: 4.5, gambar: '🧅', status: 'habis' },
  { id: 'PRD006', nama: 'Kubis Hijau', kategori: 'Sayuran', tokoId: 'TK001', tokoNama: 'Agro Bandung', harga: 6500, stok: 1000, satuan: 'kg', terjual: 560, rating: 4.4, gambar: '🥬', status: 'aktif' },
  { id: 'PRD007', nama: 'Buncis Segar', kategori: 'Sayuran', tokoId: 'TK004', tokoNama: 'Agro Sukabumi', harga: 14000, stok: 150, satuan: 'kg', terjual: 75, rating: 4.3, gambar: '🫘', status: 'draft' },
];

export const dummyAdminPaket: AdminPaket[] = [
  { id: 'PKT001', nama: 'Paket Sayur Sop', tipe: 'Masakan Rumahan', tokoId: 'TK001', tokoNama: 'Agro Bandung', harga: 35000, hargaAsli: 42000, items: ['Wortel', 'Kentang', 'Kubis', 'Buncis', 'Daun Bawang'], porsi: 4, terjual: 89, status: 'aktif' },
  { id: 'PKT002', nama: 'Paket Tumis Kangkung', tipe: 'Masakan Rumahan', tokoId: 'TK001', tokoNama: 'Agro Bandung', harga: 15000, hargaAsli: 18000, items: ['Kangkung', 'Cabai', 'Bawang Merah', 'Tomat'], porsi: 3, terjual: 156, status: 'aktif' },
  { id: 'PKT003', nama: 'Paket Nasi Goreng', tipe: 'Masakan Rumahan', tokoId: 'TK002', tokoNama: 'Agro Garut', harga: 20000, hargaAsli: 25000, items: ['Cabai', 'Bawang Merah', 'Bawang Putih', 'Wortel', 'Daun Bawang'], porsi: 3, terjual: 210, status: 'aktif' },
  { id: 'PKT004', nama: 'Paket Salad Segar', tipe: 'Diet & Sehat', tokoId: 'TK003', tokoNama: 'Agro Cianjur', harga: 28000, hargaAsli: 34000, items: ['Selada', 'Tomat Cherry', 'Wortel Baby', 'Mentimun'], porsi: 2, terjual: 45, status: 'aktif' },
];

export const dummyAdminPesanan: AdminPesanan[] = [
  { id: 'ORD001', pembeli: 'Rina Agustina', tokoNama: 'Agro Bandung', items: [{ nama: 'Tomat Segar', qty: 2, harga: 12000 }, { nama: 'Kubis Hijau', qty: 1, harga: 6500 }], total: 30500, status: 'diproses', tanggal: '2026-02-28', alamat: 'Jl. Merdeka No. 5, Bandung', metodeBayar: 'Transfer BCA' },
  { id: 'ORD002', pembeli: 'Dedi Hermawan', tokoNama: 'Agro Garut', items: [{ nama: 'Kentang Granola', qty: 5, harga: 15000 }], total: 75000, status: 'dikirim', tanggal: '2026-02-27', alamat: 'Jl. Sudirman No. 10, Garut', metodeBayar: 'COD' },
  { id: 'ORD003', pembeli: 'Maya Sari', tokoNama: 'Agro Bandung', items: [{ nama: 'Paket Sayur Sop', qty: 1, harga: 35000 }, { nama: 'Cabai Merah', qty: 1, harga: 45000 }], total: 80000, status: 'selesai', tanggal: '2026-02-25', alamat: 'Jl. Dago No. 20, Bandung', metodeBayar: 'GoPay' },
  { id: 'ORD004', pembeli: 'Irfan Hakim', tokoNama: 'Agro Cianjur', items: [{ nama: 'Wortel Baby', qty: 3, harga: 18000 }], total: 54000, status: 'dibatalkan', tanggal: '2026-02-26', alamat: 'Jl. Siliwangi No. 33, Cianjur', metodeBayar: 'Transfer BRI' },
  { id: 'ORD005', pembeli: 'Lia Nurmalasari', tokoNama: 'Agro Sukabumi', items: [{ nama: 'Buncis Segar', qty: 2, harga: 14000 }], total: 28000, status: 'diproses', tanggal: '2026-02-28', alamat: 'Jl. Bhayangkara No. 7, Sukabumi', metodeBayar: 'DANA' },
];

export const dummyAdminBooking: AdminBooking[] = [
  { id: 'BK001', perusahaan: 'PT Catering Bandung Sejahtera', tokoNama: 'Agro Bandung', komoditas: 'Kubis Hijau', jumlahKg: 500, hargaPerKg: 5500, total: 2750000, status: 'dikonfirmasi', tanggalBooking: '2026-02-20', tanggalPengiriman: '2026-03-05', pic: 'Pak Darmawan', noHp: '081222333444' },
  { id: 'BK002', perusahaan: 'RM Padang Sederhana', tokoNama: 'Agro Garut', komoditas: 'Cabai Merah', jumlahKg: 100, hargaPerKg: 42000, total: 4200000, status: 'diajukan', tanggalBooking: '2026-02-27', tanggalPengiriman: '2026-03-10', pic: 'Ibu Sari', noHp: '081333444555' },
  { id: 'BK003', perusahaan: 'Hotel Savoy Homann', tokoNama: 'Agro Bandung', komoditas: 'Tomat Premium', jumlahKg: 200, hargaPerKg: 11000, total: 2200000, status: 'selesai', tanggalBooking: '2026-02-15', tanggalPengiriman: '2026-02-22', pic: 'Chef Ronal', noHp: '081444555666' },
];

export const dummyAdminPromo: AdminPromo[] = [
  { id: 'PRM001', judul: 'Diskon Belanja Pertama', kode: 'AGROBARU', tipe: 'diskon_persen', nilai: 15, minBelanja: 50000, berlakuSampai: '2026-03-31', status: 'aktif', pemakaian: 45, maxPemakaian: 200 },
  { id: 'PRM002', judul: 'Gratis Ongkir', kode: 'FREEONGKIR', tipe: 'gratis_ongkir', nilai: 0, minBelanja: 100000, berlakuSampai: '2026-04-30', status: 'aktif', pemakaian: 120, maxPemakaian: 500 },
  { id: 'PRM003', judul: 'Potongan 10rb', kode: 'HEMAT10K', tipe: 'diskon_rupiah', nilai: 10000, minBelanja: 75000, berlakuSampai: '2026-02-28', status: 'kadaluarsa', pemakaian: 300, maxPemakaian: 300 },
];

export const dummyBarangMasukProcessing: BarangMasukProcessing[] = [
  {
    id: 'BMP001', komoditasNama: 'Kubis', emoji: '🥬',
    jumlahPack: 2680, beratPerPack: 1, totalBeratKg: 2680, grade: 'A',
    kodeBarcode: 'AGR-KBS-2026-001', daerahAsal: 'Bandung Barat',
    unitProsesNama: 'Unit Proses Bandung Barat',
    kontakProses: '08123456789', emailProses: 'processing.bdg@agrojabar.id',
    tanggalDistribusi: '2026-03-05', tanggalKonfirmasi: '2026-03-05', tanggalDiterima: '2026-03-06',
    status: 'diterima',
    catatan: 'Diterima lengkap, kondisi baik',
  },
  {
    id: 'BMP002', komoditasNama: 'Cabai Merah', emoji: '🌶️',
    jumlahPack: 465, beratPerPack: 0.5, totalBeratKg: 232, grade: 'A',
    kodeBarcode: 'AGR-CBM-2026-002', daerahAsal: 'Bandung Barat',
    unitProsesNama: 'Unit Proses Bandung Barat',
    kontakProses: '08123456789', emailProses: 'processing.bdg@agrojabar.id',
    tanggalDistribusi: '2026-03-20', tanggalKonfirmasi: '2026-03-20',
    status: 'dikonfirmasi',
    catatan: 'Sudah dikonfirmasi, menunggu pickup',
  },
  {
    id: 'BMP003', komoditasNama: 'Wortel', emoji: '🥕',
    jumlahPack: 900, beratPerPack: 0.5, totalBeratKg: 450, grade: 'A',
    kodeBarcode: 'AGR-WRT-2026-004', daerahAsal: 'Bandung Barat',
    unitProsesNama: 'Unit Proses Bandung Barat',
    kontakProses: '08123456789', emailProses: 'processing.bdg@agrojabar.id',
    tanggalDistribusi: '2026-03-25',
    status: 'baru',
  },
];

export const dummyBarangSiapJual: BarangSiapJual[] = dummyBarangMasukProcessing.map(b => ({
  id: b.id.replace('BMP', 'BSJ'),
  komoditasNama: b.komoditasNama,
  emoji: b.emoji,
  beratBersihKg: b.totalBeratKg,
  grade: b.grade,
  daerah: b.daerahAsal,
  tanggalSiap: b.tanggalDistribusi,
  statusListing: b.status === 'diterima' ? 'aktif' : (b.status === 'dikonfirmasi' ? 'draft' : 'nonaktif'),
  tokoTujuan: `Agro ${b.daerahAsal}`
}));

export const dummyDataIzin: DataIzin[] = [
  { id: 'IZN001', tokoId: 'TK001', tokoNama: 'Agro Bandung', jenisIzin: 'SIUP', nomorIzin: 'SIUP/503/2025/001', tanggalTerbit: '2025-06-01', tanggalBerlaku: '2028-06-01', instansiPenerbit: 'Dinas Perdagangan Kab. Bandung', status: 'aktif' },
  { id: 'IZN002', tokoId: 'TK001', tokoNama: 'Agro Bandung', jenisIzin: 'PIRT', nomorIzin: 'PIRT/206/2025/045', tanggalTerbit: '2025-07-01', tanggalBerlaku: '2030-07-01', instansiPenerbit: 'Dinas Kesehatan Kab. Bandung', status: 'aktif' },
  { id: 'IZN003', tokoId: 'TK002', tokoNama: 'Agro Garut', jenisIzin: 'SIUP', nomorIzin: 'SIUP/503/2025/002', tanggalTerbit: '2025-07-15', tanggalBerlaku: '2028-07-15', instansiPenerbit: 'Dinas Perdagangan Kab. Garut', status: 'aktif' },
  { id: 'IZN004', tokoId: 'TK004', tokoNama: 'Agro Sukabumi', jenisIzin: 'NIB', nomorIzin: 'NIB/1234567890', tanggalTerbit: '2024-09-10', tanggalBerlaku: '2025-09-10', instansiPenerbit: 'DPMPTSP Kab. Sukabumi', status: 'kadaluarsa' },
];



export const formatRupiah = (angka: number): string => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
};

export const formatTanggal = (tanggal: string): string => {
  return new Date(tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};
