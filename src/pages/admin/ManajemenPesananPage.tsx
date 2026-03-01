import React, { useState } from 'react';
import { ClipboardList, Search } from 'lucide-react';
import { dummyAdminPesanan, formatRupiah, formatTanggal } from '../../data/adminDummy';

const ManajemenPesananPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('semua');
  const [search, setSearch] = useState('');
  const statusList = ['semua', 'diproses', 'dikirim', 'selesai', 'dibatalkan'];
  const filtered = dummyAdminPesanan.filter(p => {
    const ms = filterStatus === 'semua' || p.status === filterStatus;
    const mc = p.pembeli.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    return ms && mc;
  });
  const statusColor = (s: string) => s === 'selesai' ? 'bg-emerald-100 text-emerald-700' : s === 'dikirim' ? 'bg-blue-100 text-blue-700' : s === 'dibatalkan' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700';

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2"><ClipboardList size={24} className="text-amber-600" /> Manajemen Pesanan</h1>
        <p className="text-sm text-gray-500">Kelola pesanan masuk dari pembeli</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari pesanan..." className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
          </div>
          <div className="flex gap-2">
            {statusList.map(s => (<button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-2 rounded-xl text-xs font-medium capitalize ${filterStatus === s ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>))}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {filtered.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-gray-900">{p.pembeli}</p>
                <p className="text-xs text-gray-500">{p.id} • {p.tokoNama} • {formatTanggal(p.tanggal)}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColor(p.status)}`}>{p.status}</span>
            </div>
            <div className="space-y-1 mb-3">
              {p.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.nama} × {item.qty}</span>
                  <span className="font-medium">{formatRupiah(item.harga * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                <span>📍 {p.alamat}</span> • <span>💳 {p.metodeBayar}</span>
              </div>
              <p className="font-display font-bold text-lg">{formatRupiah(p.total)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManajemenPesananPage;
