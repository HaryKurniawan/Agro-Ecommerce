// =====================================================
// DUMMY DATA — AGRO MARKET E-COMMERCE
// =====================================================

import type { Store, Category, Product, CookingPackage, Booking, CartItem, Order, User, Promo } from '../types/types';

// ========== HELPER ==========
export const formatRupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

export const formatTanggal = (d: string) =>
  new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

// ========== TOKO AGRO DAERAH ==========
export const dummyStores: Store[] = [
  {
    id: 'STR001', nama: 'Agro Bandung', kabupaten: 'Kab. Bandung',
    wilayah: 'Bandung Raya',
    deskripsi: 'Menyediakan sayuran segar dari dataran tinggi Bandung dengan kualitas premium.',
    alamat: 'Jl. Raya Soreang No. 45, Kab. Bandung',
    telepon: '022-5891234', jamOperasional: '06:00 - 20:00',
    foto: '🏔️', banner: '🌿',
    rating: 4.8, totalProduk: 45, totalPenjualan: 1250,
    komoditasUnggulan: ['Brokoli', 'Wortel', 'Kubis'],
    bergabungSejak: '2024-01-15',
  },
  {
    id: 'STR002', nama: 'Agro Garut', kabupaten: 'Kab. Garut',
    wilayah: 'Priangan Timur',
    deskripsi: 'Sayuran organik dari lembah Garut yang subur, terkenal dengan kentang dan kubisnya.',
    alamat: 'Jl. Ahmad Yani No. 78, Garut',
    telepon: '0262-231567', jamOperasional: '05:30 - 19:00',
    foto: '🌄', banner: '🥬',
    rating: 4.7, totalProduk: 38, totalPenjualan: 980,
    komoditasUnggulan: ['Kentang', 'Kubis', 'Tomat'],
    bergabungSejak: '2024-02-10',
  },
  {
    id: 'STR003', nama: 'Agro Cianjur', kabupaten: 'Kab. Cianjur',
    wilayah: 'Sukabumi Raya',
    deskripsi: 'Produk segar dari Cianjur, terkenal dengan sayuran dataran tinggi berkualitas.',
    alamat: 'Jl. Dr. Muwardi No. 12, Cianjur',
    telepon: '0263-271890', jamOperasional: '06:00 - 19:30',
    foto: '🏞️', banner: '🥕',
    rating: 4.6, totalProduk: 32, totalPenjualan: 750,
    komoditasUnggulan: ['Wortel', 'Seledri', 'Peterseli'],
    bergabungSejak: '2024-03-05',
  },
  {
    id: 'STR004', nama: 'Agro Sukabumi', kabupaten: 'Kab. Sukabumi',
    wilayah: 'Sukabumi Raya',
    deskripsi: 'Sayuran dari pegunungan Sukabumi dengan kesegaran terjamin.',
    alamat: 'Jl. Pelabuhan II No. 33, Sukabumi',
    telepon: '0266-221456', jamOperasional: '06:00 - 19:00',
    foto: '⛰️', banner: '🌽',
    rating: 4.5, totalProduk: 28, totalPenjualan: 620,
    komoditasUnggulan: ['Jagung Manis', 'Buncis', 'Terong'],
    bergabungSejak: '2024-04-12',
  },
  {
    id: 'STR005', nama: 'Agro Subang', kabupaten: 'Kab. Subang',
    wilayah: 'Pantura',
    deskripsi: 'Sayuran dataran rendah dari Subang, spesialis kangkung dan bayam.',
    alamat: 'Jl. Otto Iskandardinata No. 56, Subang',
    telepon: '0260-411789', jamOperasional: '05:00 - 18:30',
    foto: '🌾', banner: '🥗',
    rating: 4.4, totalProduk: 25, totalPenjualan: 540,
    komoditasUnggulan: ['Kangkung', 'Bayam', 'Kacang Panjang'],
    bergabungSejak: '2024-05-20',
  },
  {
    id: 'STR006', nama: 'Agro Cirebon', kabupaten: 'Kab. Cirebon',
    wilayah: 'Ciayumajakuning',
    deskripsi: 'Sayuran khas pantura Cirebon, terkenal dengan terong dan cabai.',
    alamat: 'Jl. Sunan Kalijaga No. 89, Cirebon',
    telepon: '0231-201345', jamOperasional: '05:30 - 19:00',
    foto: '🌊', banner: '🌶️',
    rating: 4.5, totalProduk: 30, totalPenjualan: 680,
    komoditasUnggulan: ['Cabai Rawit', 'Terong', 'Timun'],
    bergabungSejak: '2024-03-18',
  },
  {
    id: 'STR007', nama: 'Agro Tasikmalaya', kabupaten: 'Kab. Tasikmalaya',
    wilayah: 'Priangan Timur',
    deskripsi: 'Produk pertanian unggulan dari Tasikmalaya dengan harga terjangkau.',
    alamat: 'Jl. Ir. H. Juanda No. 67, Tasikmalaya',
    telepon: '0265-331678', jamOperasional: '06:00 - 19:00',
    foto: '🌳', banner: '🥒',
    rating: 4.6, totalProduk: 35, totalPenjualan: 820,
    komoditasUnggulan: ['Mentimun', 'Labu Siam', 'Kol'],
    bergabungSejak: '2024-02-28',
  },
  {
    id: 'STR008', nama: 'Agro Bandung Barat', kabupaten: 'Kab. Bandung Barat',
    wilayah: 'Bandung Raya',
    deskripsi: 'Sayuran premium dari Lembang dan sekitarnya, terkenal akan kesegarannya.',
    alamat: 'Jl. Grand Hotel No. 15, Lembang',
    telepon: '022-2786543', jamOperasional: '05:00 - 20:00',
    foto: '🗻', banner: '🥦',
    rating: 4.9, totalProduk: 50, totalPenjualan: 1580,
    komoditasUnggulan: ['Brokoli', 'Selada', 'Paprika'],
    bergabungSejak: '2024-01-05',
  },
  {
    id: 'STR009', nama: 'Agro Majalengka', kabupaten: 'Kab. Majalengka',
    wilayah: 'Ciayumajakuning',
    deskripsi: 'Sayuran dari dataran Majalengka dengan kearifan lokal.',
    alamat: 'Jl. KH. Abdul Halim No. 34, Majalengka',
    telepon: '0233-281234', jamOperasional: '06:00 - 18:30',
    foto: '🌱', banner: '🧅',
    rating: 4.3, totalProduk: 22, totalPenjualan: 430,
    komoditasUnggulan: ['Bawang Merah', 'Cabai', 'Tomat'],
    bergabungSejak: '2024-06-01',
  },
  {
    id: 'STR010', nama: 'Agro Karawang', kabupaten: 'Kab. Karawang',
    wilayah: 'Pantura',
    deskripsi: 'Sayuran segar dari lumbung pangan Karawang.',
    alamat: 'Jl. Tuparev No. 90, Karawang',
    telepon: '0267-401567', jamOperasional: '05:30 - 19:00',
    foto: '🌾', banner: '🌿',
    rating: 4.4, totalProduk: 26, totalPenjualan: 510,
    komoditasUnggulan: ['Kangkung', 'Bayam', 'Pare'],
    bergabungSejak: '2024-04-25',
  },
];

// ========== KATEGORI ==========
export const dummyCategories: Category[] = [
  { id: 'KAT01', nama: 'Sayuran Daun', icon: '🥬', jumlahProduk: 24 },
  { id: 'KAT02', nama: 'Sayuran Buah', icon: '🍅', jumlahProduk: 18 },
  { id: 'KAT03', nama: 'Umbi-umbian', icon: '🥕', jumlahProduk: 12 },
  { id: 'KAT04', nama: 'Kacang-kacangan', icon: '🫘', jumlahProduk: 8 },
  { id: 'KAT05', nama: 'Bumbu & Rempah', icon: '🌶️', jumlahProduk: 15 },
  { id: 'KAT06', nama: 'Jamur', icon: '🍄', jumlahProduk: 6 },
  { id: 'KAT07', nama: 'Buah Segar', icon: '🍌', jumlahProduk: 10 },
];

// ========== PRODUK ==========
export const dummyProducts: Product[] = [
  {
    id: 'PRD001', storeId: 'STR008', storeName: 'Agro Bandung Barat',
    nama: 'Brokoli Segar Premium', kategoriId: 'KAT01', kategoriNama: 'Sayuran Daun',
    harga: 15000, hargaAsli: 20000, satuan: '250g', stok: 120,
    deskripsi: 'Brokoli segar dari kebun Lembang, dipanen pagi hari. Kaya vitamin C dan serat.',
    gambar: '🥦', nutrisi: 'Vit C, Vit K, Serat, Kalium',
    asalKebun: 'Kebun Lembang Hijau', tanggalPanen: '2026-02-27',
    estimasiSegarHari: 5, rating: 4.8, terjual: 342, isFlashSale: true, diskonPersen: 25,
  },
  {
    id: 'PRD002', storeId: 'STR001', storeName: 'Agro Bandung',
    nama: 'Wortel Organik', kategoriId: 'KAT03', kategoriNama: 'Umbi-umbian',
    harga: 12000, satuan: '500g', stok: 200,
    deskripsi: 'Wortel organik dari dataran tinggi Bandung. Manis dan renyah, cocok untuk jus maupun masakan.',
    gambar: '🥕', nutrisi: 'Beta-karoten, Vit A, Serat',
    asalKebun: 'Kebun Organik Pangalengan', tanggalPanen: '2026-02-26',
    estimasiSegarHari: 7, rating: 4.7, terjual: 289,
  },
  {
    id: 'PRD003', storeId: 'STR002', storeName: 'Agro Garut',
    nama: 'Kentang Dieng Garut', kategoriId: 'KAT03', kategoriNama: 'Umbi-umbian',
    harga: 18000, satuan: '1kg', stok: 150,
    deskripsi: 'Kentang berkualitas tinggi dari Garut, cocok untuk berbagai olahan.',
    gambar: '🥔', nutrisi: 'Karbohidrat, Vit C, Kalium',
    asalKebun: 'Kebun Cikajang', tanggalPanen: '2026-02-25',
    estimasiSegarHari: 14, rating: 4.6, terjual: 456,
  },
  {
    id: 'PRD004', storeId: 'STR005', storeName: 'Agro Subang',
    nama: 'Kangkung Hidroponik', kategoriId: 'KAT01', kategoriNama: 'Sayuran Daun',
    harga: 5000, satuan: 'ikat', stok: 300,
    deskripsi: 'Kangkung hidroponik segar, bebas pestisida. Batang renyah dan daun lebar.',
    gambar: '🥬', nutrisi: 'Zat Besi, Vit A, Kalsium',
    asalKebun: 'Farm Hidroponik Subang', tanggalPanen: '2026-02-28',
    estimasiSegarHari: 3, rating: 4.5, terjual: 678,
  },
  {
    id: 'PRD005', storeId: 'STR006', storeName: 'Agro Cirebon',
    nama: 'Cabai Rawit Merah', kategoriId: 'KAT05', kategoriNama: 'Bumbu & Rempah',
    harga: 35000, hargaAsli: 45000, satuan: '250g', stok: 80,
    deskripsi: 'Cabai rawit merah segar dari Cirebon. Pedas mantap untuk sambal dan masakan.',
    gambar: '🌶️', nutrisi: 'Vit C, Capsaicin, Vit A',
    asalKebun: 'Kebun Cabai Losari', tanggalPanen: '2026-02-27',
    estimasiSegarHari: 5, rating: 4.4, terjual: 523, diskonPersen: 22,
  },
  {
    id: 'PRD006', storeId: 'STR008', storeName: 'Agro Bandung Barat',
    nama: 'Selada Keriting Hidroponik', kategoriId: 'KAT01', kategoriNama: 'Sayuran Daun',
    harga: 8000, satuan: '150g', stok: 100,
    deskripsi: 'Selada keriting segar dari greenhouse Lembang. Renyah dan cocok untuk salad.',
    gambar: '🥗', nutrisi: 'Vit K, Vit A, Folat',
    asalKebun: 'Greenhouse Lembang Fresh',  tanggalPanen: '2026-02-28',
    estimasiSegarHari: 4, rating: 4.7, terjual: 198,
  },
  {
    id: 'PRD007', storeId: 'STR002', storeName: 'Agro Garut',
    nama: 'Tomat Cherry Merah', kategoriId: 'KAT02', kategoriNama: 'Sayuran Buah',
    harga: 22000, satuan: '250g', stok: 60,
    deskripsi: 'Tomat cherry merah manis dari Garut. Cocok untuk salad dan garnish.',
    gambar: '🍅', nutrisi: 'Likopen, Vit C, Kalium',
    asalKebun: 'Kebun Samarang', tanggalPanen: '2026-02-26',
    estimasiSegarHari: 6, rating: 4.8, terjual: 167, isFlashSale: true, diskonPersen: 15,
  },
  {
    id: 'PRD008', storeId: 'STR003', storeName: 'Agro Cianjur',
    nama: 'Seledri Segar', kategoriId: 'KAT05', kategoriNama: 'Bumbu & Rempah',
    harga: 6000, satuan: 'ikat', stok: 180,
    deskripsi: 'Seledri segar dari Cianjur, aroma kuat cocok untuk sup dan tumisan.',
    gambar: '🌿', nutrisi: 'Vit K, Folat, Kalium',
    asalKebun: 'Kebun Cipanas', tanggalPanen: '2026-02-27',
    estimasiSegarHari: 4, rating: 4.5, terjual: 234,
  },
  {
    id: 'PRD009', storeId: 'STR004', storeName: 'Agro Sukabumi',
    nama: 'Jagung Manis Super', kategoriId: 'KAT02', kategoriNama: 'Sayuran Buah',
    harga: 10000, satuan: '2 tongkol', stok: 250,
    deskripsi: 'Jagung manis super dari Sukabumi. Bisa langsung dikukus atau dibakar.',
    gambar: '🌽', nutrisi: 'Serat, Vit B, Magnesium',
    asalKebun: 'Kebun Sukaraja', tanggalPanen: '2026-02-26',
    estimasiSegarHari: 5, rating: 4.6, terjual: 412,
  },
  {
    id: 'PRD010', storeId: 'STR007', storeName: 'Agro Tasikmalaya',
    nama: 'Labu Siam Segar', kategoriId: 'KAT02', kategoriNama: 'Sayuran Buah',
    harga: 7000, satuan: '500g', stok: 160,
    deskripsi: 'Labu siam segar dari Tasikmalaya, lembut dan cocok untuk tumis dan sayur bening.',
    gambar: '🥒', nutrisi: 'Vit C, Folat, Serat',
    asalKebun: 'Kebun Manonjaya', tanggalPanen: '2026-02-27',
    estimasiSegarHari: 7, rating: 4.4, terjual: 189,
  },
  {
    id: 'PRD011', storeId: 'STR005', storeName: 'Agro Subang',
    nama: 'Bayam Hijau Segar', kategoriId: 'KAT01', kategoriNama: 'Sayuran Daun',
    harga: 4000, satuan: 'ikat', stok: 350,
    deskripsi: 'Bayam hijau segar langsung dari kebun Subang. Daun lebar dan batang muda.',
    gambar: '🥬', nutrisi: 'Zat Besi, Kalsium, Vit A',
    asalKebun: 'Kebun Subang Asri', tanggalPanen: '2026-02-28',
    estimasiSegarHari: 2, rating: 4.3, terjual: 567,
  },
  {
    id: 'PRD012', storeId: 'STR001', storeName: 'Agro Bandung',
    nama: 'Kubis Ungu Premium', kategoriId: 'KAT01', kategoriNama: 'Sayuran Daun',
    harga: 14000, satuan: '500g', stok: 70,
    deskripsi: 'Kubis ungu premium dari Bandung, kaya antioksidan. Cocok untuk salad dan coleslaw.',
    gambar: '🟣', nutrisi: 'Anthocyanin, Vit C, Vit K',
    asalKebun: 'Kebun Pangalengan', tanggalPanen: '2026-02-26',
    estimasiSegarHari: 10, rating: 4.7, terjual: 145,
  },
  {
    id: 'PRD013', storeId: 'STR008', storeName: 'Agro Bandung Barat',
    nama: 'Paprika Merah', kategoriId: 'KAT02', kategoriNama: 'Sayuran Buah',
    harga: 28000, satuan: '250g', stok: 45,
    deskripsi: 'Paprika merah manis dari greenhouse Lembang. Import quality, local price.',
    gambar: '🫑', nutrisi: 'Vit C, Vit A, Vit B6',
    asalKebun: 'Greenhouse Lembang Premium', tanggalPanen: '2026-02-27',
    estimasiSegarHari: 7, rating: 4.9, terjual: 98, isFlashSale: true, diskonPersen: 20,
  },
  {
    id: 'PRD014', storeId: 'STR004', storeName: 'Agro Sukabumi',
    nama: 'Buncis Kenya', kategoriId: 'KAT04', kategoriNama: 'Kacang-kacangan',
    harga: 9000, satuan: '250g', stok: 130,
    deskripsi: 'Buncis kenya segar dari Sukabumi, renyah dan panjang. Cocok untuk tumis dan cap cay.',
    gambar: '🫘', nutrisi: 'Protein, Serat, Vit K',
    asalKebun: 'Kebun Cibadak', tanggalPanen: '2026-02-27',
    estimasiSegarHari: 4, rating: 4.5, terjual: 267,
  },
  {
    id: 'PRD015', storeId: 'STR006', storeName: 'Agro Cirebon',
    nama: 'Terong Ungu', kategoriId: 'KAT02', kategoriNama: 'Sayuran Buah',
    harga: 8000, satuan: '500g', stok: 190,
    deskripsi: 'Terong ungu segar dari Cirebon, daging tebal dan biji sedikit.',
    gambar: '🍆', nutrisi: 'Serat, Mangan, Antioksidan',
    asalKebun: 'Kebun Losari', tanggalPanen: '2026-02-26',
    estimasiSegarHari: 5, rating: 4.3, terjual: 312,
  },
  {
    id: 'PRD016', storeId: 'STR009', storeName: 'Agro Majalengka',
    nama: 'Bawang Merah Lokal', kategoriId: 'KAT05', kategoriNama: 'Bumbu & Rempah',
    harga: 32000, satuan: '500g', stok: 100,
    deskripsi: 'Bawang merah lokal Majalengka, aroma kuat dan tahan lama.',
    gambar: '🧅', nutrisi: 'Quercetin, Vit C, Vit B6',
    asalKebun: 'Kebun Kadipaten', tanggalPanen: '2026-02-25',
    estimasiSegarHari: 21, rating: 4.6, terjual: 389,
  },
  {
    id: 'PRD017', storeId: 'STR010', storeName: 'Agro Karawang',
    nama: 'Pare Segar', kategoriId: 'KAT02', kategoriNama: 'Sayuran Buah',
    harga: 10000, satuan: '500g', stok: 80,
    deskripsi: 'Pare segar dari Karawang, pahit sedang cocok untuk tumis dan jus kesehatan.',
    gambar: '🥒', nutrisi: 'Vit C, Zat Besi, Kalium',
    asalKebun: 'Kebun Telukjambe', tanggalPanen: '2026-02-27',
    estimasiSegarHari: 5, rating: 4.2, terjual: 156,
  },
  {
    id: 'PRD018', storeId: 'STR003', storeName: 'Agro Cianjur',
    nama: 'Peterseli Segar', kategoriId: 'KAT05', kategoriNama: 'Bumbu & Rempah',
    harga: 5000, satuan: 'ikat', stok: 120,
    deskripsi: 'Peterseli segar dari Cipanas Cianjur, aroma harum untuk garnish dan masakan western.',
    gambar: '🌿', nutrisi: 'Vit K, Vit C, Vit A',
    asalKebun: 'Kebun Cipanas Hijau', tanggalPanen: '2026-02-28',
    estimasiSegarHari: 3, rating: 4.5, terjual: 178,
  },
  {
    id: 'PRD019', storeId: 'STR007', storeName: 'Agro Tasikmalaya',
    nama: 'Jamur Tiram Putih', kategoriId: 'KAT06', kategoriNama: 'Jamur',
    harga: 15000, satuan: '250g', stok: 90,
    deskripsi: 'Jamur tiram putih segar dari Tasikmalaya, tekstur lembut dan rasa gurih.',
    gambar: '🍄', nutrisi: 'Protein, Vit D, Serat',
    asalKebun: 'Rumah Jamur Singaparna', tanggalPanen: '2026-02-28',
    estimasiSegarHari: 4, rating: 4.7, terjual: 234,
  },
  {
    id: 'PRD020', storeId: 'STR005', storeName: 'Agro Subang',
    nama: 'Kacang Panjang Segar', kategoriId: 'KAT04', kategoriNama: 'Kacang-kacangan',
    harga: 6000, satuan: 'ikat', stok: 200,
    deskripsi: 'Kacang panjang segar dari Subang, cocok untuk pecel, gado-gado, dan tumis.',
    gambar: '🫘', nutrisi: 'Protein, Serat, Folat',
    asalKebun: 'Kebun Pagaden', tanggalPanen: '2026-02-27',
    estimasiSegarHari: 4, rating: 4.4, terjual: 345,
  },
];

// ========== PAKET BAHAN MASAK ==========
export const dummyPackages: CookingPackage[] = [
  {
    id: 'PKT001', storeId: 'STR001', storeName: 'Agro Bandung',
    nama: 'Paket Sayur Sop', deskripsi: 'Bahan lengkap untuk membuat sayur sop rumahan yang segar dan bergizi.',
    gambar: '🍲',
    items: [
      { produkId: 'PRD002', produkNama: 'Wortel', jumlah: '2 buah', gambar: '🥕' },
      { produkId: 'PRD003', produkNama: 'Kentang', jumlah: '3 buah', gambar: '🥔' },
      { produkId: 'PRD012', produkNama: 'Kubis', jumlah: '1/4 buah', gambar: '🥬' },
      { produkId: 'PRD014', produkNama: 'Buncis', jumlah: '100g', gambar: '🫘' },
      { produkId: 'PRD008', produkNama: 'Seledri', jumlah: '1 ikat', gambar: '🌿' },
    ],
    harga: 35000, hargaAsli: 45000, porsi: 4, kategoriMasakan: 'Sup & Soto',
    rating: 4.8, terjual: 567,
  },
  {
    id: 'PKT002', storeId: 'STR005', storeName: 'Agro Subang',
    nama: 'Paket Gado-Gado', deskripsi: 'Sayuran lengkap untuk gado-gado autentik khas Sunda.',
    gambar: '🥗',
    items: [
      { produkId: 'PRD004', produkNama: 'Kangkung', jumlah: '1 ikat', gambar: '🥬' },
      { produkId: 'PRD011', produkNama: 'Bayam', jumlah: '1 ikat', gambar: '🥬' },
      { produkId: 'PRD020', produkNama: 'Kacang Panjang', jumlah: '100g', gambar: '🫘' },
      { produkId: 'PRD009', produkNama: 'Jagung Manis', jumlah: '1 tongkol', gambar: '🌽' },
    ],
    harga: 25000, porsi: 3, kategoriMasakan: 'Salad & Gado',
    rating: 4.6, terjual: 389,
  },
  {
    id: 'PKT003', storeId: 'STR008', storeName: 'Agro Bandung Barat',
    nama: 'Paket Capcay Spesial', deskripsi: 'Aneka sayuran premium untuk capcay restoran ala Lembang.',
    gambar: '🍳',
    items: [
      { produkId: 'PRD001', produkNama: 'Brokoli', jumlah: '200g', gambar: '🥦' },
      { produkId: 'PRD013', produkNama: 'Paprika Merah', jumlah: '1 buah', gambar: '🫑' },
      { produkId: 'PRD002', produkNama: 'Wortel', jumlah: '1 buah', gambar: '🥕' },
      { produkId: 'PRD009', produkNama: 'Jagung Manis', jumlah: '1 tongkol', gambar: '🌽' },
      { produkId: 'PRD019', produkNama: 'Jamur Tiram', jumlah: '100g', gambar: '🍄' },
      { produkId: 'PRD014', produkNama: 'Buncis', jumlah: '100g', gambar: '🫘' },
    ],
    harga: 45000, hargaAsli: 58000, porsi: 4, kategoriMasakan: 'Tumis & Oseng',
    rating: 4.9, terjual: 234,
  },
  {
    id: 'PKT004', storeId: 'STR006', storeName: 'Agro Cirebon',
    nama: 'Paket Sambal Nusantara', deskripsi: 'Bahan-bahan untuk membuat aneka sambal khas nusantara.',
    gambar: '🌶️',
    items: [
      { produkId: 'PRD005', produkNama: 'Cabai Rawit', jumlah: '100g', gambar: '🌶️' },
      { produkId: 'PRD015', produkNama: 'Terong Ungu', jumlah: '2 buah', gambar: '🍆' },
      { produkId: 'PRD016', produkNama: 'Bawang Merah', jumlah: '100g', gambar: '🧅' },
      { produkId: 'PRD007', produkNama: 'Tomat', jumlah: '3 buah', gambar: '🍅' },
    ],
    harga: 30000, porsi: 5, kategoriMasakan: 'Sambal & Bumbu',
    rating: 4.7, terjual: 456,
  },
  {
    id: 'PKT005', storeId: 'STR007', storeName: 'Agro Tasikmalaya',
    nama: 'Paket Sayur Bening', deskripsi: 'Bahan untuk sayur bening segar khas rumahan.',
    gambar: '🍀',
    items: [
      { produkId: 'PRD011', produkNama: 'Bayam', jumlah: '1 ikat', gambar: '🥬' },
      { produkId: 'PRD009', produkNama: 'Jagung Manis', jumlah: '1 tongkol', gambar: '🌽' },
      { produkId: 'PRD010', produkNama: 'Labu Siam', jumlah: '1 buah', gambar: '🥒' },
    ],
    harga: 18000, porsi: 3, kategoriMasakan: 'Sup & Soto',
    rating: 4.5, terjual: 321,
  },
  {
    id: 'PKT006', storeId: 'STR003', storeName: 'Agro Cianjur',
    nama: 'Paket Salad Sehat', deskripsi: 'Sayuran segar premium untuk salad bergizi tinggi.',
    gambar: '🥗',
    items: [
      { produkId: 'PRD006', produkNama: 'Selada Keriting', jumlah: '1 pack', gambar: '🥗' },
      { produkId: 'PRD007', produkNama: 'Tomat Cherry', jumlah: '100g', gambar: '🍅' },
      { produkId: 'PRD002', produkNama: 'Wortel', jumlah: '1 buah', gambar: '🥕' },
      { produkId: 'PRD013', produkNama: 'Paprika', jumlah: '1 buah', gambar: '🫑' },
      { produkId: 'PRD018', produkNama: 'Peterseli', jumlah: '1 ikat', gambar: '🌿' },
    ],
    harga: 38000, hargaAsli: 48000, porsi: 2, kategoriMasakan: 'Salad & Gado',
    rating: 4.8, terjual: 178,
  },
];

// ========== BOOKING ==========
export const dummyBookings: Booking[] = [
  {
    id: 'BKG001', storeId: 'STR001', storeName: 'Agro Bandung',
    namaPerusahaan: 'Restoran Sunda Rasa', kontakNama: 'Budi Santoso', kontakTelepon: '081234567890',
    items: [
      { komoditasNama: 'Wortel Organik', jumlahKg: 50, hargaPerKg: 22000 },
      { komoditasNama: 'Kubis Ungu', jumlahKg: 30, hargaPerKg: 26000 },
    ],
    tanggalKirim: '2026-03-05',
    frekuensi: 'mingguan', totalHarga: 1880000,
    status: 'dikonfirmasi', tanggalDibuat: '2026-02-25',
  },
  {
    id: 'BKG002', storeId: 'STR008', storeName: 'Agro Bandung Barat',
    namaPerusahaan: 'Hotel Grand Lembang', kontakNama: 'Siti Rahayu', kontakTelepon: '081298765432',
    items: [
      { komoditasNama: 'Brokoli Premium', jumlahKg: 100, hargaPerKg: 55000 },
      { komoditasNama: 'Selada Keriting', jumlahKg: 40, hargaPerKg: 48000 },
      { komoditasNama: 'Paprika Merah', jumlahKg: 25, hargaPerKg: 105000 },
    ],
    tanggalKirim: '2026-03-01',
    frekuensi: 'harian', totalHarga: 10045000,
    status: 'diproses', tanggalDibuat: '2026-02-20',
  },
  {
    id: 'BKG003', storeId: 'STR006', storeName: 'Agro Cirebon',
    namaPerusahaan: 'Catering Sehat Mandiri', kontakNama: 'Ahmad Fauzi', kontakTelepon: '081377889900',
    items: [
      { komoditasNama: 'Cabai Rawit', jumlahKg: 20, hargaPerKg: 130000 },
      { komoditasNama: 'Terong Ungu', jumlahKg: 40, hargaPerKg: 15000 },
    ],
    tanggalKirim: '2026-03-10',
    frekuensi: 'bulanan', totalHarga: 3200000,
    status: 'diajukan', tanggalDibuat: '2026-02-28',
  },
];

// ========== KERANJANG ==========
export const dummyCart: CartItem[] = [
  { produkId: 'PRD001', storeId: 'STR008', storeName: 'Agro Bandung Barat', produkNama: 'Brokoli Segar Premium', harga: 15000, gambar: '🥦', satuan: '250g', jumlah: 2 },
  { produkId: 'PRD006', storeId: 'STR008', storeName: 'Agro Bandung Barat', produkNama: 'Selada Keriting Hidroponik', harga: 8000, gambar: '🥗', satuan: '150g', jumlah: 1 },
  { produkId: 'PRD005', storeId: 'STR006', storeName: 'Agro Cirebon', produkNama: 'Cabai Rawit Merah', harga: 35000, gambar: '🌶️', satuan: '250g', jumlah: 1 },
  { produkId: 'PRD002', storeId: 'STR001', storeName: 'Agro Bandung', produkNama: 'Wortel Organik', harga: 12000, gambar: '🥕', satuan: '500g', jumlah: 3 },
];

// ========== PESANAN ==========
export const dummyOrders: Order[] = [
  {
    id: 'ORD001',
    items: [
      { produkId: 'PRD001', storeId: 'STR008', storeName: 'Agro Bandung Barat', produkNama: 'Brokoli Segar', harga: 15000, gambar: '🥦', satuan: '250g', jumlah: 3 },
      { produkId: 'PRD002', storeId: 'STR001', storeName: 'Agro Bandung', produkNama: 'Wortel Organik', harga: 12000, gambar: '🥕', satuan: '500g', jumlah: 2 },
    ],
    totalHarga: 69000, ongkir: 10000,
    metodeBayar: 'Transfer Bank', alamatKirim: 'Jl. Merdeka No. 10, Bandung',
    jadwalKirim: '2026-02-27 08:00', status: 'dikirim', tanggalDibuat: '2026-02-25',
  },
  {
    id: 'ORD002',
    items: [
      { produkId: 'PRD005', storeId: 'STR006', storeName: 'Agro Cirebon', produkNama: 'Cabai Rawit Merah', harga: 35000, gambar: '🌶️', satuan: '250g', jumlah: 2 },
    ],
    totalHarga: 70000, ongkir: 15000,
    metodeBayar: 'E-Wallet', alamatKirim: 'Jl. Asia Afrika No. 5, Bandung',
    jadwalKirim: '2026-02-28 10:00', status: 'diproses', tanggalDibuat: '2026-02-26',
  },
  {
    id: 'ORD003',
    items: [
      { produkId: 'PRD009', storeId: 'STR004', storeName: 'Agro Sukabumi', produkNama: 'Jagung Manis', harga: 10000, gambar: '🌽', satuan: '2 tongkol', jumlah: 5 },
    ],
    totalHarga: 50000, ongkir: 12000,
    metodeBayar: 'COD', alamatKirim: 'Jl. Braga No. 20, Bandung',
    jadwalKirim: '2026-02-26 14:00', status: 'selesai', tanggalDibuat: '2026-02-23',
  },
  {
    id: 'ORD004',
    items: [
      { produkId: 'PRD001', storeId: 'STR008', storeName: 'Agro Bandung Barat', produkNama: 'Brokoli Segar Premium', harga: 15000, gambar: '🥦', satuan: '250g', jumlah: 4 },
      { produkId: 'PRD007', storeId: 'STR002', storeName: 'Agro Garut', produkNama: 'Tomat Cherry Merah', harga: 22000, gambar: '🍅', satuan: '250g', jumlah: 2 },
    ],
    totalHarga: 104000, ongkir: 12000,
    metodeBayar: 'Transfer Bank', alamatKirim: 'Jl. Dago No. 100, Bandung',
    jadwalKirim: '2026-03-05 09:00', status: 'menunggu_bayar', tanggalDibuat: '2026-03-01',
  },
];


// ========== USER ==========
export const dummyUser: User = {
  id: 'USR001',
  nama: 'Rina Kusuma',
  email: 'rina.kusuma@email.com',
  telepon: '081234567890',
  foto: '👩',
  alamat: ['Jl. Merdeka No. 10, Bandung', 'Jl. Asia Afrika No. 5, Bandung'],
  tokoFavorit: ['STR001', 'STR008'],
};

// ========== PROMO ==========
export const dummyPromos: Promo[] = [
  {
    id: 'PRM001',
    judul: 'Flash Sale Sayuran Segar!',
    deskripsi: 'Diskon hingga 25% untuk sayuran pilihan dari Agro Bandung Barat.',
    gambar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    diskonPersen: 25,
    berlakuSampai: '2026-03-05',
  },
  {
    id: 'PRM002',
    judul: 'Gratis Ongkir Se-Jabar',
    deskripsi: 'Belanja min. Rp50.000 gratis ongkir ke seluruh Jawa Barat.',
    gambar: 'https://images.unsplash.com/photo-1592878904946-b3ce8a35fa18?auto=format&fit=crop&q=80&w=800',
    kodeVoucher: 'GRATISONGKIR',
    berlakuSampai: '2026-03-15',
  },
  {
    id: 'PRM003',
    judul: 'Paket Hemat',
    deskripsi: 'Beli paket bahan masak diskon 20%, belanja lebih hemat!',
    gambar: 'https://images.unsplash.com/photo-1628102491629-77858ab5721d?auto=format&fit=crop&q=80&w=800',
    diskonPersen: 20,
    kodeVoucher: 'PAKETMARET',
    berlakuSampai: '2026-03-31',
  },
];
