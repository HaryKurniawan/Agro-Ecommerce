import React, { useState } from 'react';
import { Store, Search, Star, MapPin } from 'lucide-react';
import { dummyAdminToko, formatTanggal } from '../../data/adminDummy';

const ManajemenTokoPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = dummyAdminToko.filter(t => t.nama.toLowerCase().includes(search.toLowerCase()) || t.kabupaten.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2"><Store size={24} className="text-blue-600" /> Manajemen Toko</h1>
          <p className="text-sm text-gray-500">Kelola toko Agro Daerah</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-700 transition-all">+ Tambah Toko</button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari toko..." className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((toko) => (
          <div key={toko.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{toko.emoji}</span>
                <div>
                  <p className="font-bold text-gray-900">{toko.nama}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={12} /> {toko.kabupaten}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${toko.status === 'aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{toko.status}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="bg-blue-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-blue-600">Produk</p>
                <p className="font-bold">{toko.totalProduk}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-emerald-600">Pesanan</p>
                <p className="font-bold">{toko.totalPesanan}</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-amber-600">Rating</p>
                <p className="font-bold flex items-center justify-center gap-1"><Star size={12} className="text-amber-500" />{toko.rating}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">Bergabung: {formatTanggal(toko.bergabung)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManajemenTokoPage;
