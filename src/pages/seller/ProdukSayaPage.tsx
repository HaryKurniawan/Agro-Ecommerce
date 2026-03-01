import React, { useState } from 'react';
import { Package, Search, Plus, Star, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { dummyProdukSaya, formatRupiah } from '../../data/sellerDummy';

const ProdukSayaPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');
  const filtered = dummyProdukSaya.filter(p => {
    const ms = p.nama.toLowerCase().includes(search.toLowerCase());
    const mf = filterStatus === 'semua' || p.status === filterStatus;
    return ms && mf;
  });
  const statusColor = (s: string) => s === 'aktif' ? 'bg-emerald-100 text-emerald-700' : s === 'habis' ? 'bg-red-100 text-red-700' : s === 'draft' ? 'bg-gray-100 text-gray-500' : 'bg-amber-100 text-amber-700';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2"><Package size={24} className="text-emerald-600" /> Produk Saya</h1>
          <p className="text-sm text-gray-500">Kelola produk yang dijual di toko Anda</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-emerald-700 transition-all flex items-center gap-1.5"><Plus size={16} /> Tambah Produk</button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari produk..." className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div className="flex gap-2">
            {['semua', 'aktif', 'habis', 'draft'].map(s => (<button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-2 rounded-xl text-xs font-medium capitalize ${filterStatus === s ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4">
              <span className="text-4xl">{p.gambar}</span>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{p.nama}</p>
                    <p className="text-xs text-gray-500">{p.kategori}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${statusColor(p.status)}`}>{p.status}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{p.deskripsi}</p>
                <div className="grid grid-cols-4 gap-2 mt-3">
                  <div className="text-center"><p className="text-xs text-gray-500">Harga</p><p className="font-bold text-sm">{formatRupiah(p.harga)}</p></div>
                  <div className="text-center"><p className="text-xs text-gray-500">Stok</p><p className={`font-bold text-sm ${p.stok === 0 ? 'text-red-600' : ''}`}>{p.stok} {p.satuan}</p></div>
                  <div className="text-center"><p className="text-xs text-gray-500">Terjual</p><p className="font-bold text-sm">{p.terjual}</p></div>
                  <div className="text-center"><p className="text-xs text-gray-500">Rating</p><p className="font-bold text-sm flex items-center justify-center gap-0.5"><Star size={10} className="text-amber-500" />{p.rating}</p></div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Edit size={14} /> Edit</button>
                  <button className="flex items-center justify-center gap-1 py-2 px-3 text-xs font-medium bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100">{p.status === 'aktif' ? <><EyeOff size={14} /> Nonaktif</> : <><Eye size={14} /> Aktifkan</>}</button>
                  <button className="flex items-center justify-center gap-1 py-2 px-3 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProdukSayaPage;
