import React from 'react';
import { UtensilsCrossed, Plus } from 'lucide-react';
import { dummyPaketSaya, formatRupiah } from '../../data/sellerDummy';

const PaketSayaPage: React.FC = () => {
  const statusColor = (s: string) => s === 'aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2"><UtensilsCrossed size={24} className="text-orange-600" /> Paket Saya</h1>
          <p className="text-sm text-gray-500">Kelola paket bahan masak toko Anda</p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-orange-700 transition-all flex items-center gap-1.5"><Plus size={16} /> Buat Paket</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {dummyPaketSaya.map(paket => (
          <div key={paket.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-gray-900 text-lg">{paket.nama}</p>
                <p className="text-xs text-gray-500">{paket.tipe} • {paket.porsi} porsi</p>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColor(paket.status)}`}>{paket.status}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {paket.items.map((item, i) => (<span key={i} className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded-md text-xs">{item}</span>))}
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-gray-500">Harga</p>
                <p className="font-bold text-sm">{formatRupiah(paket.harga)}</p>
                <p className="text-[10px] text-gray-400 line-through">{formatRupiah(paket.hargaAsli)}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-emerald-600">Hemat</p>
                <p className="font-bold text-sm text-emerald-700">{Math.round(((paket.hargaAsli - paket.harga) / paket.hargaAsli) * 100)}%</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-2.5 text-center">
                <p className="text-xs text-blue-600">Terjual</p>
                <p className="font-bold text-sm">{paket.terjual}</p>
              </div>
            </div>
            <button className="w-full py-2 text-sm font-medium bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all">Edit Paket</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaketSayaPage;
