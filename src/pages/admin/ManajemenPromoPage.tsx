import React, { useState } from 'react';
import { Tag, Plus } from 'lucide-react';
import { dummyAdminPromo, formatRupiah, formatTanggal } from '../../data/adminDummy';

const ManajemenPromoPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('semua');
  const filtered = dummyAdminPromo.filter(p => filterStatus === 'semua' || p.status === filterStatus);
  const statusColor = (s: string) => s === 'aktif' ? 'bg-emerald-100 text-emerald-700' : s === 'kadaluarsa' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500';
  const tipeLabel = (t: string) => t === 'diskon_persen' ? 'Diskon %' : t === 'diskon_rupiah' ? 'Potongan Rp' : 'Gratis Ongkir';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2"><Tag size={24} className="text-pink-600" /> Manajemen Promo</h1>
          <p className="text-sm text-gray-500">Kelola voucher & promosi</p>
        </div>
        <button className="bg-pink-600 text-white px-4 py-2 rounded-xl font-medium text-sm hover:bg-pink-700 transition-all flex items-center gap-1"><Plus size={16} /> Buat Promo</button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="flex gap-2">
          {['semua', 'aktif', 'nonaktif', 'kadaluarsa'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-2 rounded-xl text-xs font-medium capitalize ${filterStatus === s ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(promo => (
          <div key={promo.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-gray-900">{promo.judul}</p>
                <p className="text-xs text-gray-500">{tipeLabel(promo.tipe)}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColor(promo.status)}`}>{promo.status}</span>
            </div>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3 mb-3 text-center">
              <p className="text-2xl font-display font-bold text-pink-600">
                {promo.tipe === 'diskon_persen' ? `${promo.nilai}%` : promo.tipe === 'diskon_rupiah' ? formatRupiah(promo.nilai) : '🚛 FREE'}
              </p>
              <p className="text-xs text-gray-500 mt-1 font-mono bg-white rounded-md px-2 py-0.5 inline-block">{promo.kode}</p>
            </div>
            <div className="space-y-1 text-xs text-gray-500">
              <div className="flex justify-between"><span>Min. Belanja</span><span className="font-medium text-gray-700">{formatRupiah(promo.minBelanja)}</span></div>
              <div className="flex justify-between"><span>Pemakaian</span><span className="font-medium text-gray-700">{promo.pemakaian}/{promo.maxPemakaian}</span></div>
              <div className="flex justify-between"><span>Berlaku Sampai</span><span className="font-medium text-gray-700">{formatTanggal(promo.berlakuSampai)}</span></div>
            </div>
            <div className="mt-3 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div className="bg-pink-500 h-full rounded-full" style={{ width: `${(promo.pemakaian / promo.maxPemakaian) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManajemenPromoPage;
