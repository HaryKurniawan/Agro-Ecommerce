// =====================================================
// HOME PAGE — BERANDA AGRO MARKET
// Sticky search bar with filter + cart
// =====================================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ShoppingCart, ChevronRight, Search, MapPin, Star, ShoppingBag, Navigation, Store, SlidersHorizontal } from 'lucide-react';
import StoreCard from '../components/StoreCard';
import ProductCard from '../components/ProductCard';
import PackageCard from '../components/PackageCard';
import { dummyStores, dummyProducts, dummyPackages, dummyPromos, dummyCart, dummyUser } from '../data/dummy';

// Simulasi lokasi user dari alamat
const getUserWilayah = (): { kabupaten: string; wilayah: string } => {
  const alamat = dummyUser.alamat[0] || '';
  if (alamat.includes('Bandung')) return { kabupaten: 'Kab. Bandung', wilayah: 'Bandung Raya' };
  if (alamat.includes('Garut')) return { kabupaten: 'Kab. Garut', wilayah: 'Priangan Timur' };
  if (alamat.includes('Cirebon')) return { kabupaten: 'Kab. Cirebon', wilayah: 'Ciayumajakuning' };
  return { kabupaten: 'Kab. Bandung', wilayah: 'Bandung Raya' };
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showStickySearch, setShowStickySearch] = useState(false);
  const cartCount = dummyCart.reduce((sum, item) => sum + item.jumlah, 0);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/katalog?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Detect scroll to show sticky search
  useEffect(() => {
    const handleScroll = () => {
      setShowStickySearch(window.scrollY > 140);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const userLokasi = getUserWilayah();
  const nearbyStoreIds = dummyStores.filter(s => s.wilayah === userLokasi.wilayah).map(s => s.id);
  const nearbyProducts = dummyProducts.filter(p => nearbyStoreIds.includes(p.storeId)).slice(0, 8);

  const popularProducts = [...dummyProducts].sort((a, b) => b.terjual - a.terjual).slice(0, 8);
  const topStores = [...dummyStores].sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <div className="animate-fade-in">
      {/* ===== STICKY SEARCH BAR (appears on scroll) ===== */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 p-3 transition-all duration-300 ${
        showStickySearch ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="flex items-center gap-2">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari sayur, paket, toko..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              className="w-full pl-9 pr-10 py-2.5 bg-gray-100 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
            />
            {/* Filter inside search bar */}
            <button
              onClick={() => navigate('/katalog')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <SlidersHorizontal size={16} className="text-gray-500" />
            </button>
          </div>
          {/* Cart */}
          <button
            onClick={() => navigate('/keranjang')}
            className="relative p-2.5 bg-gray-100 rounded-xl flex-shrink-0"
          >
            <ShoppingCart size={20} className="text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ===== MOBILE HEADER ===== */}
      <div className="lg:hidden bg-gradient-to-br from-primary-700 to-primary-800 text-white p-5 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Leaf size={22} />
            </div>
            <div>
              <p className="text-green-200 text-[11px]">Selamat datang di 👋</p>
              <h1 className="font-display font-bold text-lg">Agro Market</h1>
            </div>
          </div>
          <button
            onClick={() => navigate('/keranjang')}
            className="relative p-2.5 bg-white/15 rounded-xl"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar Mobile */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary-300" />
          <input
            type="text"
            placeholder="Cari sayur, paket, toko..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            className="w-full pl-10 pr-4 py-2.5 bg-white/15 backdrop-blur-sm rounded-xl text-sm placeholder-primary-200 border border-white/20 focus:outline-none focus:bg-white/25 transition-all"
          />
        </div>

        {/* Location + Quick Info */}
        <div className="flex items-center gap-1.5 mt-3">
          <Navigation size={12} className="text-green-300" />
          <p className="text-green-200 text-xs">{userLokasi.kabupaten} • {userLokasi.wilayah}</p>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="px-4 lg:px-6 -mt-4 lg:mt-4 space-y-8 pb-4">

        {/* Promo Banner */}
        <div className="lg:hidden">
          {dummyPromos.slice(0, 1).map((promo) => (
            <div
              key={promo.id}
              className="relative rounded-2xl overflow-hidden shadow-md border-2 border-white/50 cursor-pointer group h-40"
            >
              <img 
                src={promo.gambar} 
                alt={promo.judul}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                <h3 className="font-display font-bold text-white text-lg leading-tight dropshadow-md">{promo.judul}</h3>
                {promo.kodeVoucher && (
                  <span className="inline-block mt-1.5 px-2.5 py-1 bg-primary-500/90 backdrop-blur-sm text-white rounded-lg text-[10px] font-mono font-bold w-max shadow-sm border border-primary-400/50">
                    KODE: {promo.kodeVoucher}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Desktop: all promos in grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-4">
          {dummyPromos.map((promo) => (
            <div
              key={promo.id}
              className="relative rounded-3xl overflow-hidden shadow-sm border-[3px] border-white hover:border-primary-100 hover:shadow-xl transition-all duration-300 cursor-pointer group h-48"
            >
              <img 
                src={promo.gambar} 
                alt={promo.judul}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <h3 className="font-display font-bold text-white text-xl leading-tight dropshadow-md">{promo.judul}</h3>
                <p className="text-gray-200 text-xs mt-1.5 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 text-shadow-sm">{promo.deskripsi}</p>
                {promo.kodeVoucher && (
                  <span className="inline-block mt-3 px-3 py-1 bg-primary-500/90 backdrop-blur-md text-white rounded-xl text-xs font-mono font-bold w-max shadow-md border border-primary-400/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    KODE: {promo.kodeVoucher}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ===== PRODUK SEKITAR ANDA ===== */}
        <section>
          <div className="flex items-center justify-between mb-1">
            <h2 className="section-title flex items-center gap-2">
              <Navigation size={18} className="text-primary-600" />
              Produk Sekitar Anda
            </h2>
            <button
              onClick={() => navigate('/katalog')}
              className="text-primary-600 text-xs font-medium flex items-center gap-1 hover:underline"
            >
              Lihat semua <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="overflow-x-auto scroll-hide -mx-4 px-4 lg:mx-0 lg:px-0">
            <div className="flex gap-3 lg:grid lg:grid-cols-4 items-stretch">
              {nearbyProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-40 lg:w-auto flex">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          {nearbyProducts.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-6">Belum ada produk dari daerah Anda</p>
          )}
        </section>

        {/* Paket Bahan Masak */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title">Paket Bahan Masak</h2>
            <button
              onClick={() => navigate('/paket')}
              className="text-primary-600 text-xs font-medium flex items-center gap-1"
            >
              Lihat semua <ChevronRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto scroll-hide -mx-4 px-4 lg:mx-0 lg:px-0">
            <div className="flex gap-3 lg:grid lg:grid-cols-3">
              {dummyPackages.slice(0, 4).map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} variant="compact" />
              ))}
            </div>
          </div>
        </section>

        
        {/* Produk Populer */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title">Produk Populer</h2>
            <button
              onClick={() => navigate('/katalog')}
              className="text-primary-600 text-xs font-medium flex items-center gap-1 hover:underline"
            >
              Lihat semua <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} hideCartOnMobile={true} />
            ))}
          </div>
        </section>

        {/* ===== TOKO AGRO DAERAH ===== */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="section-title flex items-center gap-2">
                <MapPin size={18} className="text-primary-600" />
                Toko Agro Daerah
              </h2>
              <p className="text-xs text-gray-500 mt-0.5 hidden lg:block">{dummyStores.length} toko tersebar di seluruh Jawa Barat</p>
            </div>
            <button
              onClick={() => navigate('/toko')}
              className="text-primary-600 text-xs font-medium flex items-center gap-1 hover:underline"
            >
              Lihat semua <ChevronRight size={14} />
            </button>
          </div>
          {/* Mobile: horizontal scroll compact cards */}
          <div className="lg:hidden overflow-x-auto scroll-hide -mx-4 px-4">
            <div className="flex gap-3">
              {topStores.map((store) => (
                <StoreCard key={store.id} store={store} variant="compact" />
              ))}
            </div>
          </div>
          {/* Desktop: proper grid with full cards */}
          <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {topStores.map((store) => (
              <button
                key={store.id}
                onClick={() => navigate(`/toko/${store.id}`)}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Store size={24} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-sm text-gray-800 group-hover:text-primary-700 transition-colors truncate">{store.nama}</h3>
                    <p className="text-[11px] text-gray-400 flex items-center gap-1">
                      <MapPin size={10} /> {store.kabupaten}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                    <Star size={12} fill="currentColor" /> {store.rating}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-400">
                    <ShoppingBag size={11} /> {store.totalProduk} produk
                  </span>
                  <span className="text-[11px] text-gray-400">{store.totalPenjualan.toLocaleString()} terjual</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {store.komoditasUnggulan.slice(0, 3).map((k, i) => (
                    <span key={i} className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full text-[10px] font-medium border border-primary-100">{k}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
