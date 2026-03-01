import React, { useState } from 'react';
import { UtensilsCrossed, Search } from 'lucide-react';
import { dummyAdminPaket, formatRupiah } from '../../data/adminDummy';

const ManajemenPaketPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = dummyAdminPaket.filter(p => p.nama.toLowerCase().includes(search.toLowerCase()) || p.tokoNama.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2"><UtensilsCrossed size={24} className="text-orange-600" /> Manajemen Paket</h1>
          <p className="text-sm text-gray-500">Kelola paket bahan masak</p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-xl font-medium text-sm hover:bg-orange-700 transition-all">+ Tambah Paket</button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari paket..." className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(paket => (
          <div key={paket.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-gray-900 text-lg">{paket.nama}</p>
                <p className="text-xs text-gray-500">{paket.tokoNama} • {paket.tipe}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${paket.status === 'aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{paket.status}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {paket.items.map((item, i) => (
                <span key={i} className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded-md text-xs">{item}</span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-gray-500">Harga</p>
                <p className="font-bold text-sm">{formatRupiah(paket.harga)}</p>
                <p className="text-[10px] text-gray-400 line-through">{formatRupiah(paket.hargaAsli)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-gray-500">Porsi</p>
                <p className="font-bold">{paket.porsi} org</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-gray-500">Terjual</p>
                <p className="font-bold">{paket.terjual}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManajemenPaketPage;
