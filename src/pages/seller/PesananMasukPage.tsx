import React, { useState } from 'react';
import { ClipboardList, CheckCircle, Truck, XCircle } from 'lucide-react';
import { dummyPesananMasuk, formatRupiah, formatTanggal } from '../../data/sellerDummy';

const PesananMasukPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('semua');
  const statusList = ['semua', 'baru', 'diproses', 'dikirim', 'selesai', 'dibatalkan'];
  const filtered = dummyPesananMasuk.filter(p => filterStatus === 'semua' || p.status === filterStatus);
  const statusColor = (s: string) => s === 'baru' ? 'bg-red-100 text-red-700' : s === 'diproses' ? 'bg-amber-100 text-amber-700' : s === 'dikirim' ? 'bg-blue-100 text-blue-700' : s === 'selesai' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500';

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2"><ClipboardList size={24} className="text-amber-600" /> Pesanan Masuk</h1>
        <p className="text-sm text-gray-500">Kelola pesanan dari pembeli</p>
      </div>
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
        {statusList.filter(s => s !== 'semua').map(s => {
          const count = dummyPesananMasuk.filter(p => p.status === s).length;
          return (
            <button key={s} onClick={() => setFilterStatus(filterStatus === s ? 'semua' : s)} className={`bg-white rounded-xl p-3 border text-center transition-all ${filterStatus === s ? 'ring-2 ring-emerald-500 border-emerald-200' : 'border-gray-100'}`}>
              <p className="text-xl font-bold">{count}</p>
              <p className={`text-xs font-medium capitalize ${statusColor(s).split(' ')[1]}`}>{s}</p>
            </button>
          );
        })}
      </div>
      {/* Orders */}
      <div className="space-y-3">
        {filtered.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-900">{p.pembeli}</p>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${statusColor(p.status)}`}>{p.status}</span>
                </div>
                <p className="text-xs text-gray-500">{p.id} • {formatTanggal(p.tanggal)} • {p.metodeBayar}</p>
              </div>
              <p className="font-display font-bold text-lg">{formatRupiah(p.total)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 mb-3">
              {p.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm py-1">
                  <span className="text-gray-600">{item.nama} × {item.qty}</span>
                  <span className="font-medium">{formatRupiah(item.harga * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">📍 {p.alamat}</p>
              <div className="flex gap-2">
                {p.status === 'baru' && (
                  <>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700"><CheckCircle size={14} /> Terima</button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100"><XCircle size={14} /> Tolak</button>
                  </>
                )}
                {p.status === 'diproses' && (
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700"><Truck size={14} /> Kirim</button>
                )}
              </div>
            </div>
            {p.catatan && <p className="text-xs text-amber-600 mt-2 bg-amber-50 rounded-lg p-2">💬 {p.catatan}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PesananMasukPage;
