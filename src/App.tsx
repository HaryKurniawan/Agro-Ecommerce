// =====================================================
// APP.TSX — ROUTING AGRO MARKET E-COMMERCE
// Frontend + Seller Panel + Admin Panel
// =====================================================

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { SellerLayout } from './components/SellerLayout';

// ==================== FRONTEND PEMBELI ====================
import HomePage from './pages/HomePage';
import DaftarTokoPage from './pages/DaftarTokoPage';
import DetailTokoPage from './pages/DetailTokoPage';
import KatalogPage from './pages/KatalogPage';
import DetailProdukPage from './pages/DetailProdukPage';
import PaketPage from './pages/PaketPage';
import DetailPaketPage from './pages/DetailPaketPage';
import BookingPage from './pages/BookingPage';
import FormBookingPage from './pages/FormBookingPage';
import RiwayatBookingPage from './pages/RiwayatBookingPage';
import DetailBookingPage from './pages/DetailBookingPage';
import BookingInstructionsPage from './pages/BookingInstructionsPage';
import KeranjangPage from './pages/KeranjangPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilPage from './pages/ProfilPage';
import RiwayatPesananPage from './pages/RiwayatPesananPage';
import PembayaranPage from './pages/PembayaranPage';
import AlamatPage from './pages/AlamatPage';
import FormBukaTokoPage from './pages/FormBukaTokoPage';

// ==================== SELLER PANEL ====================
import LoginSellerPage from './pages/seller/LoginSellerPage';
import DashboardSellerPage from './pages/seller/DashboardSellerPage';
import ProdukSayaPage from './pages/seller/ProdukSayaPage';
import PaketSayaPage from './pages/seller/PaketSayaPage';
import PesananMasukPage from './pages/seller/PesananMasukPage';
import BookingMasukPage from './pages/seller/BookingMasukPage';
import ProfilTokoPage from './pages/seller/ProfilTokoPage';
import BarangMasukProcessingPage from './pages/seller/BarangMasukProcessingPage';
import LaporanKeuanganPage from './pages/seller/LaporanKeuanganPage';

// ==================== ADMIN ECOMMERCE ====================
import LoginAdminPage from './pages/admin/LoginAdminPage';
import DashboardAdminPage from './pages/admin/DashboardAdminPage';
import ApprovalTokoPage from './pages/admin/ApprovalTokoPage';
import ManajemenTokoPage from './pages/admin/ManajemenTokoPage';
import ManajemenProdukPage from './pages/admin/ManajemenProdukPage';
import ManajemenPaketPage from './pages/admin/ManajemenPaketPage';
import ManajemenPesananPage from './pages/admin/ManajemenPesananPage';
import ManajemenBookingPage from './pages/admin/ManajemenBookingPage';
import ManajemenPromoPage from './pages/admin/ManajemenPromoPage';
import BarangSiapJualPage from './pages/admin/BarangSiapJualPage';
import DataIzinPage from './pages/admin/DataIzinPage';

const App: React.FC = () => {
  return (
    <Routes>
      {/* ==================== FRONTEND PEMBELI ==================== */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/toko" element={<DaftarTokoPage />} />
        <Route path="/toko/:id" element={<DetailTokoPage />} />
        <Route path="/katalog" element={<KatalogPage />} />
        <Route path="/produk/:id" element={<DetailProdukPage />} />
        <Route path="/paket" element={<PaketPage />} />
        <Route path="/paket/:id" element={<DetailPaketPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/form" element={<FormBookingPage />} />
        <Route path="/booking/riwayat" element={<RiwayatBookingPage />} />
        <Route path="/booking/detail/:id" element={<DetailBookingPage />} />
        <Route path="/booking/panduan" element={<BookingInstructionsPage />} />
        <Route path="/keranjang" element={<KeranjangPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/profil/pesanan" element={<RiwayatPesananPage />} />
        <Route path="/pembayaran" element={<PembayaranPage />} />
        <Route path="/alamat" element={<AlamatPage />} />
      </Route>

      {/* Form Buka Toko (tanpa layout) */}
      <Route path="/buka-toko" element={<FormBukaTokoPage />} />

      {/* ==================== SELLER PANEL ==================== */}
      <Route path="/seller/login" element={<LoginSellerPage />} />
      <Route element={<SellerLayout />}>
        <Route path="/seller/dashboard" element={<DashboardSellerPage />} />
        <Route path="/seller/produk" element={<ProdukSayaPage />} />
        <Route path="/seller/paket" element={<PaketSayaPage />} />
        <Route path="/seller/pesanan" element={<PesananMasukPage />} />
        <Route path="/seller/booking" element={<BookingMasukPage />} />
        <Route path="/seller/barang-masuk-processing" element={<BarangMasukProcessingPage />} />
        <Route path="/seller/keuangan" element={<LaporanKeuanganPage />} />
        <Route path="/seller/profil-toko" element={<ProfilTokoPage />} />
      </Route>

      {/* ==================== ADMIN ECOMMERCE ==================== */}
      <Route path="/admin/login" element={<LoginAdminPage />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<DashboardAdminPage />} />
        <Route path="/admin/approval-toko" element={<ApprovalTokoPage />} />
        <Route path="/admin/toko" element={<ManajemenTokoPage />} />
        <Route path="/admin/produk" element={<ManajemenProdukPage />} />
        <Route path="/admin/paket" element={<ManajemenPaketPage />} />
        <Route path="/admin/pesanan" element={<ManajemenPesananPage />} />
        <Route path="/admin/booking" element={<ManajemenBookingPage />} />
        <Route path="/admin/promo" element={<ManajemenPromoPage />} />
        <Route path="/admin/barang-siap" element={<BarangSiapJualPage />} />
        <Route path="/admin/izin" element={<DataIzinPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
