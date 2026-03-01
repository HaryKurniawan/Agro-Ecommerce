// =====================================================
// DAFTAR TOKO PAGE — LIST SEMUA TOKO AGRO DAERAH
// =====================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import StoreCard from '../components/StoreCard';
import SearchBar from '../components/SearchBar';
import { dummyStores } from '../data/dummy';

const wilayahList = ['Semua', 'Bandung Raya', 'Priangan Timur', 'Pantura', 'Sukabumi Raya', 'Ciayumajakuning', 'Cekungan Bandung'];

const DaftarTokoPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedWilayah, setSelectedWilayah] = useState('Semua');

  const filteredStores = dummyStores.filter(s => {
    const matchSearch = s.nama.toLowerCase().includes(search.toLowerCase()) ||
      s.kabupaten.toLowerCase().includes(search.toLowerCase());
    const matchWilayah = selectedWilayah === 'Semua' || s.wilayah === selectedWilayah;
    return matchSearch && matchWilayah;
  });

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white p-5 pb-6 rounded-b-3xl lg:rounded-none lg:pt-6">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/15 rounded-xl lg:hidden">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-display font-bold text-xl">Toko Agro Daerah</h1>
            <p className="text-green-200 text-xs">{dummyStores.length} toko di Jawa Barat</p>
          </div>
        </div>
        <SearchBar value={search} onChange={setSearch} placeholder="Cari toko atau kabupaten..." />
      </div>

      <div className="px-4 lg:px-6 mt-4 space-y-4 pb-4">
        {/* Filter Wilayah */}
        <div className="overflow-x-auto scroll-hide -mx-4 px-4 lg:mx-0 lg:px-0">
          <div className="flex gap-2">
            {wilayahList.map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWilayah(w)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedWilayah === w
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Store List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {filteredStores.map((store) => (
            <StoreCard key={store.id} store={store} variant="full" />
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500">Tidak ada toko ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DaftarTokoPage;
