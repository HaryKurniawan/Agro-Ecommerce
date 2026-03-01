import React, { useState } from 'react';
import { Package, Search, Star } from 'lucide-react';
import { dummyAdminProduk, formatRupiah } from '../../data/adminDummy';

const ManajemenProdukPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');
  const filtered = dummyAdminProduk.filter(p => {
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) || p.tokoNama.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'semua' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2"><Package size={24} className="text-emerald-600" /> Manajemen Produk</h1>
          <p className="text-sm text-gray-500">Kelola produk sayuran & umbi</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium text-sm hover:bg-emerald-700 transition-all">+ Tambah Produk</button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari produk..." className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div className="flex gap-2">
            {['semua', 'aktif', 'draft', 'habis'].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-2 rounded-xl text-xs font-medium capitalize ${filterStatus === s ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50">
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Produk</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Toko</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Harga</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Stok</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Terjual</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Rating</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Status</th>
          </tr></thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3 px-4"><span className="flex items-center gap-2"><span className="text-lg">{p.gambar}</span><div><p className="font-medium">{p.nama}</p><p className="text-xs text-gray-400">{p.kategori}</p></div></span></td>
                <td className="py-3 px-4 text-gray-600">{p.tokoNama}</td>
                <td className="py-3 px-4 font-semibold">{formatRupiah(p.harga)}</td>
                <td className="py-3 px-4">{p.stok > 0 ? `${p.stok} ${p.satuan}` : <span className="text-red-500 font-semibold">Habis</span>}</td>
                <td className="py-3 px-4 font-semibold">{p.terjual}</td>
                <td className="py-3 px-4"><span className="flex items-center gap-1"><Star size={12} className="text-amber-500" />{p.rating}</span></td>
                <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${p.status === 'aktif' ? 'bg-emerald-100 text-emerald-700' : p.status === 'habis' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManajemenProdukPage;
