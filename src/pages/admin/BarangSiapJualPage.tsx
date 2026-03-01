import React, { useState } from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import { dummyBarangSiapJual, formatTanggal } from '../../data/adminDummy';

const BarangSiapJualPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = dummyBarangSiapJual.filter(b => b.komoditasNama.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2"><ShoppingBag size={24} className="text-indigo-600" /> Barang Siap Jual</h1>
        <p className="text-sm text-gray-500">Barang dari Processing yang siap dijual di marketplace</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari komoditas..." className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(b => (
          <div key={b.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{b.emoji}</span>
                <div>
                  <p className="font-bold text-gray-900">{b.komoditasNama}</p>
                  <p className="text-xs text-gray-500">{b.daerah}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                b.statusListing === 'aktif' ? 'bg-emerald-100 text-emerald-700' :
                b.statusListing === 'draft' ? 'bg-amber-100 text-amber-700' :
                'bg-gray-100 text-gray-500'
              }`}>
                {b.statusListing === 'aktif' ? 'Diterima Toko' : 
                 b.statusListing === 'draft' ? 'Menunggu Seller' : 'Dalam Proses'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-indigo-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-indigo-600">Berat</p>
                <p className="font-bold">{b.beratBersihKg.toLocaleString()} kg</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-emerald-600">Grade</p>
                <p className="font-bold">{b.grade}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-blue-600">Toko</p>
                <p className="font-bold text-xs">{b.tokoTujuan}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">Siap: {formatTanggal(b.tanggalSiap)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarangSiapJualPage;
