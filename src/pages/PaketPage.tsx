// =====================================================
// PAKET PAGE — DAFTAR PAKET BAHAN MASAK
// Clean, minimalist UI matching primary theme
// =====================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChefHat, Filter, Search, Sparkles } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import { dummyPackages } from '../data/dummy';

const kategoriMasakanList = ['Semua', 'Sup & Soto', 'Tumis & Oseng', 'Salad & Gado', 'Sambal & Bumbu'];

const PaketPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('Semua');

  const filtered = dummyPackages.filter(p => {
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase());
    const matchKategori = selectedKategori === 'Semua' || p.kategoriMasakan === selectedKategori;
    return matchSearch && matchKategori;
  });

  return (
    <div className="animate-fade-in min-h-screen pb-20">
      {/* Header Container */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white rounded-b-[2rem] p-5 lg:rounded-none lg:pt-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/15 hover:bg-white/25 rounded-xl transition-colors lg:hidden">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-display font-bold text-xl flex items-center gap-2">
              <ChefHat size={22} className="text-secondary-300" /> Paket Masak
            </h1>
            <p className="text-primary-100 text-xs mt-0.5">Bahan lengkap, tinggal masak!</p>
          </div>
        </div>

        {/* Promo Message */}
        <div className="flex items-center gap-2 mb-4 bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="w-8 h-8 bg-secondary-400 rounded-full flex items-center justify-center text-white flex-shrink-0">
            <Sparkles size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">Spesial Hari Ini</p>
            <p className="text-[11px] text-primary-100">Diskon s.d 20% untuk semua paket keluarga</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Mau masak apa hari ini?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-400/30 shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="px-4 lg:px-6 mt-6 space-y-5">
        {/* Kategori Filter Bubbles */}
        <div>
          <h2 className="font-display font-semibold text-sm text-gray-800 mb-3 px-1">Kategori Pilihan</h2>
          <div className="overflow-x-auto scroll-hide -mx-4 px-4 lg:mx-0 lg:px-0">
            <div className="flex gap-2">
              {kategoriMasakanList.map((k) => (
                <button
                  key={k}
                  onClick={() => setSelectedKategori(k)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                    selectedKategori === k
                      ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-200'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <h3 className="font-bold text-emerald-800 text-sm">Gratis Ongkir! 🚚</h3>
            <p className="text-xs text-emerald-600 mt-0.5">Minimal pembelian 2 paket</p>
          </div>
          <div className="w-10 h-10 bg-white shadow-sm border border-emerald-50 rounded-full flex items-center justify-center text-lg">
            🍲
          </div>
        </div>

        {/* Package List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} variant="full" />
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Filter size={24} className="text-gray-400" />
            </div>
            <h3 className="font-display font-bold text-gray-800 text-sm mb-1">Paket Tidak Ditemukan</h3>
            <p className="text-gray-500 text-xs">
              Pilih kategori atau kata kunci lain
            </p>
            <button
              onClick={() => { setSearch(''); setSelectedKategori('Semua'); }}
              className="mt-4 px-5 py-2 bg-primary-50 text-primary-700 font-semibold rounded-lg hover:bg-primary-100 transition-colors text-xs"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaketPage;
