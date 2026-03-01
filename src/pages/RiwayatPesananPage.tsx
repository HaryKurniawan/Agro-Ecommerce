// =====================================================
// RIWAYAT PESANAN PAGE — Reads filter from URL query
// =====================================================

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { dummyOrders, formatRupiah, formatTanggal } from '../data/dummy';

const RiwayatPesananPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('status') || 'semua';
  const [filterStatus, setFilterStatus] = useState(initialFilter);

  const statusList = ['semua', 'menunggu_bayar', 'diproses', 'dikirim', 'selesai'];
  const statusLabels: Record<string, string> = {
    semua: 'Semua',
    menunggu_bayar: 'Menunggu',
    diproses: 'Diproses',
    dikirim: 'Dikirim',
    selesai: 'Selesai',
  };
  const filtered = filterStatus === 'semua' ? dummyOrders : dummyOrders.filter(o => o.status === filterStatus);

  return (
    <div className="animate-fade-in">
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 lg:top-16 z-40">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl lg:hidden">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="font-display font-bold text-lg">Riwayat Pesanan</h1>
        </div>
        <div className="overflow-x-auto scroll-hide -mx-4 px-4">
          <div className="flex gap-2">
            {statusList.map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  filterStatus === s ? 'bg-primary-600 text-white shadow-md shadow-primary-200' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {statusLabels[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-6 py-4 space-y-3">
        {filtered.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-sm text-gray-800">Pesanan #{order.id}</p>
                <p className="text-xs text-gray-400">{formatTanggal(order.tanggalDibuat)} • {order.metodeBayar}</p>
              </div>
              <StatusBadge status={order.status} />
            </div>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{item.gambar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-medium text-sm line-clamp-1">{item.produkNama}</p>
                    <p className="text-xs text-gray-400">{item.storeName} • x{item.jumlah}</p>
                  </div>
                  <p className="font-medium text-sm">{formatRupiah(item.harga * item.jumlah)}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">Kirim: {order.jadwalKirim}</p>
                <p className="text-xs text-gray-400">{order.alamatKirim}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400">Total</p>
                <p className="font-display font-bold text-primary-700">{formatRupiah(order.totalHarga + order.ongkir)}</p>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📦</p>
            <p className="text-gray-500 font-medium">Belum ada pesanan</p>
            <p className="text-xs text-gray-400 mt-1">Pesanan dengan status "{statusLabels[filterStatus]}" belum tersedia</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiwayatPesananPage;
