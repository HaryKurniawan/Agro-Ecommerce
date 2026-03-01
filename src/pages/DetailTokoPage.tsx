// =====================================================
// DETAIL TOKO PAGE — PROFIL TOKO AGRO DAERAH
// =====================================================

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Phone, ShoppingBag, CalendarCheck, TrendingUp } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import PackageCard from '../components/PackageCard';
import { dummyStores, dummyProducts, dummyPackages } from '../data/dummy';

const DetailTokoPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const store = dummyStores.find(s => s.id === id);
  if (!store) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-4xl">😕</p>
        <p className="text-gray-500">Toko tidak ditemukan</p>
        <button onClick={() => navigate('/toko')} className="btn-primary">Kembali</button>
      </div>
    );
  }

  const storeProducts = dummyProducts.filter(p => p.storeId === store.id);
  const storePackages = dummyPackages.filter(p => p.storeId === store.id);

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white p-5 pb-8 rounded-b-3xl lg:rounded-none relative">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/15 rounded-xl mb-3 lg:hidden">
          <ArrowLeft size={20} />
        </button>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
            {store.foto}
          </div>
          <div className="flex-1">
            <h1 className="font-display font-bold text-xl">{store.nama}</h1>
            <p className="text-green-200 text-xs flex items-center gap-1 mt-0.5">
              <MapPin size={12} /> {store.kabupaten} • {store.wilayah}
            </p>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="flex items-center gap-1 text-sm font-medium">
                <Star size={14} fill="currentColor" className="text-amber-300" /> {store.rating}
              </span>
              <span className="text-green-200 text-xs">{store.totalProduk} produk</span>
              <span className="text-green-200 text-xs">{store.totalPenjualan.toLocaleString()} terjual</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white/15 backdrop-blur rounded-xl p-2.5 text-center">
            <ShoppingBag size={16} className="mx-auto mb-1 text-green-200" />
            <p className="text-sm font-bold">{store.totalProduk}</p>
            <p className="text-[10px] text-green-200">Produk</p>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl p-2.5 text-center">
            <TrendingUp size={16} className="mx-auto mb-1 text-green-200" />
            <p className="text-sm font-bold">{store.totalPenjualan.toLocaleString()}</p>
            <p className="text-[10px] text-green-200">Terjual</p>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl p-2.5 text-center">
            <Star size={16} className="mx-auto mb-1 text-amber-300" />
            <p className="text-sm font-bold">{store.rating}</p>
            <p className="text-[10px] text-green-200">Rating</p>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-6 -mt-4 space-y-5 pb-4">
        {/* Info Card */}
        <div className="card">
          <h3 className="font-display font-semibold text-sm text-gray-800 mb-2">Tentang Toko</h3>
          <p className="text-sm text-gray-600">{store.deskripsi}</p>
          <div className="mt-3 space-y-1.5">
            <p className="text-xs text-gray-500 flex items-center gap-2">
              <MapPin size={13} className="text-gray-400" /> {store.alamat}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-2">
              <Clock size={13} className="text-gray-400" /> {store.jamOperasional}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-2">
              <Phone size={13} className="text-gray-400" /> {store.telepon}
            </p>
          </div>
        </div>

        {/* Komoditas Unggulan */}
        <div className="card">
          <h3 className="font-display font-semibold text-sm text-gray-800 mb-2">🏆 Komoditas Unggulan</h3>
          <div className="flex flex-wrap gap-2">
            {store.komoditasUnggulan.map((k, i) => (
              <span key={i} className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-xl text-xs font-medium border border-primary-100">
                {k}
              </span>
            ))}
          </div>
        </div>

        {/* Produk Toko */}
        {storeProducts.length > 0 && (
          <section>
            <h3 className="section-title mb-3">📦 Produk ({storeProducts.length})</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {storeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Paket Toko */}
        {storePackages.length > 0 && (
          <section>
            <h3 className="section-title mb-3">🍳 Paket Bahan Masak</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {storePackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} variant="full" />
              ))}
            </div>
          </section>
        )}

        {/* Booking CTA */}
        <button
          onClick={() => navigate('/booking/form')}
          className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-base"
        >
          <CalendarCheck size={18} />
          Booking dari Toko Ini
        </button>
      </div>
    </div>
  );
};

export default DetailTokoPage;
