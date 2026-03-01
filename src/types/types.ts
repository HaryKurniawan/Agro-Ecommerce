// =====================================================
// TYPES — AGRO MARKET E-COMMERCE
// =====================================================

export interface Store {
  id: string;
  nama: string;
  kabupaten: string;
  wilayah: 'Bandung Raya' | 'Priangan Timur' | 'Pantura' | 'Cekungan Bandung' | 'Sukabumi Raya' | 'Ciayumajakuning';
  deskripsi: string;
  alamat: string;
  telepon: string;
  jamOperasional: string;
  foto: string;
  banner: string;
  rating: number;
  totalProduk: number;
  totalPenjualan: number;
  komoditasUnggulan: string[];
  bergabungSejak: string;
}

export interface Category {
  id: string;
  nama: string;
  icon: string;
  jumlahProduk: number;
}

export interface Product {
  id: string;
  storeId: string;
  storeName: string;
  nama: string;
  kategoriId: string;
  kategoriNama: string;
  harga: number;
  hargaAsli?: number;
  satuan: string;
  stok: number;
  deskripsi: string;
  gambar: string;
  nutrisi?: string;
  asalKebun: string;
  tanggalPanen?: string;
  estimasiSegarHari: number;
  rating: number;
  terjual: number;
  isFlashSale?: boolean;
  diskonPersen?: number;
}

export interface PackageItem {
  produkId: string;
  produkNama: string;
  jumlah: string;
  gambar: string;
}

export interface CookingPackage {
  id: string;
  storeId: string;
  storeName: string;
  nama: string;
  deskripsi: string;
  gambar: string;
  items: PackageItem[];
  harga: number;
  hargaAsli?: number;
  porsi: number;
  kategoriMasakan: string;
  rating: number;
  terjual: number;
}

export interface Booking {
  id: string;
  storeId: string;
  storeName: string;
  namaPerusahaan: string;
  kontakNama: string;
  kontakTelepon: string;
  items: BookingItem[];
  tanggalKirim: string;
  frekuensi: 'sekali' | 'harian' | 'mingguan' | 'bulanan';
  totalHarga: number;
  status: 'diajukan' | 'dikonfirmasi' | 'diproses' | 'dikirim' | 'selesai' | 'dibatalkan';
  catatan?: string;
  tanggalDibuat: string;
}

export interface BookingItem {
  komoditasNama: string;
  jumlahKg: number;
  hargaPerKg: number;
}

export interface CartItem {
  produkId: string;
  storeId: string;
  storeName: string;
  produkNama: string;
  harga: number;
  gambar: string;
  satuan: string;
  jumlah: number;
  isPaket?: boolean;
  paketNama?: string;
  paketItems?: { nama: string; jumlah: string; gambar: string }[];
}

export interface Order {
  id: string;
  items: CartItem[];
  totalHarga: number;
  ongkir: number;
  metodeBayar: string;
  alamatKirim: string;
  jadwalKirim: string;
  status: 'menunggu_bayar' | 'diproses' | 'dikirim' | 'selesai' | 'dibatalkan';
  tanggalDibuat: string;
}

export interface User {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  foto: string;
  alamat: string[];
  tokoFavorit: string[];
}

export interface Promo {
  id: string;
  judul: string;
  deskripsi: string;
  gambar: string;
  kodeVoucher?: string;
  diskonPersen?: number;
  berlakuSampai: string;
}
