// =====================================================
// TIPE DATA ADMIN - ECOMMERCE SAYUR
// =====================================================

export type StatusPesanan = 'diproses' | 'dikirim' | 'selesai' | 'dibatalkan';
export type StatusBooking = 'diajukan' | 'dikonfirmasi' | 'selesai' | 'dibatalkan';
export type StatusPromo = 'aktif' | 'nonaktif' | 'kadaluarsa';
export type StatusListing = 'draft' | 'aktif' | 'nonaktif' | 'habis';
export type StatusIzin = 'aktif' | 'kadaluarsa' | 'dalam_proses';

export interface AdminToko {
  id: string; nama: string; kabupaten: string; wilayah: string;
  alamat: string; rating: number; totalProduk: number; totalPesanan: number;
  status: 'aktif' | 'nonaktif'; emoji: string; bergabung: string;
}

export interface AdminProduk {
  id: string; nama: string; kategori: string; tokoId: string; tokoNama: string;
  harga: number; stok: number; satuan: string; terjual: number;
  rating: number; gambar: string; status: StatusListing;
}

export interface AdminPaket {
  id: string; nama: string; tipe: string; tokoId: string; tokoNama: string;
  harga: number; hargaAsli: number; items: string[];
  porsi: number; terjual: number; status: StatusListing;
}

export interface AdminPesanan {
  id: string; pembeli: string; tokoNama: string; items: { nama: string; qty: number; harga: number }[];
  total: number; status: StatusPesanan; tanggal: string;
  alamat: string; metodeBayar: string;
}

export interface AdminBooking {
  id: string; perusahaan: string; tokoNama: string;
  komoditas: string; jumlahKg: number; hargaPerKg: number;
  total: number; status: StatusBooking; tanggalBooking: string;
  tanggalPengiriman: string; pic: string; noHp: string;
}

export interface AdminPromo {
  id: string; judul: string; kode: string; tipe: 'diskon_persen' | 'diskon_rupiah' | 'gratis_ongkir';
  nilai: number; minBelanja: number; berlakuSampai: string;
  status: StatusPromo; pemakaian: number; maxPemakaian: number;
}

export interface BarangSiapJual {
  id: string; komoditasNama: string; emoji: string;
  beratBersihKg: number; grade: string; daerah: string;
  tanggalSiap: string; statusListing: StatusListing; tokoTujuan: string;
}

export interface DataIzin {
  id: string; tokoId: string; tokoNama: string;
  jenisIzin: string; nomorIzin: string;
  tanggalTerbit: string; tanggalBerlaku: string;
  instansiPenerbit: string; status: StatusIzin;
}

export type StatusBarangMasukProcessing = 'baru' | 'dikonfirmasi' | 'diterima';

export interface BarangMasukProcessing {
  id: string;
  komoditasNama: string;
  emoji: string;
  jumlahPack: number;
  beratPerPack: number;
  totalBeratKg: number;
  grade: string;
  kodeBarcode: string;
  daerahAsal: string;
  unitProsesNama: string;
  kontakProses: string;
  emailProses: string;
  tanggalDistribusi: string;
  tanggalKonfirmasi?: string;
  tanggalDiterima?: string;
  status: StatusBarangMasukProcessing;
  catatan?: string;
}
