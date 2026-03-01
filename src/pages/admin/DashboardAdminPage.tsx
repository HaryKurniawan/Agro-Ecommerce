import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Package, ClipboardList, CalendarCheck, Tag, TrendingUp, DollarSign } from 'lucide-react';
import { dummyAdminToko, dummyAdminProduk, dummyAdminPesanan, dummyAdminBooking, dummyAdminPromo, formatRupiah, formatTanggal } from '../../data/adminDummy';

const DashboardAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const totalPenjualan = dummyAdminPesanan.filter(p => p.status === 'selesai').reduce((s, p) => s + p.total, 0);
  const pesananHariIni = dummyAdminPesanan.filter(p => p.tanggal === '2026-02-28').length;

  const stats = [
    { label: 'Total Toko', value: dummyAdminToko.filter(t => t.status === 'aktif').length, icon: Store, color: 'bg-blue-100 text-blue-600', path: '/admin/toko' },
    { label: 'Total Produk', value: dummyAdminProduk.length, icon: Package, color: 'bg-emerald-100 text-emerald-600', path: '/admin/produk' },
    { label: 'Pesanan Hari Ini', value: pesananHariIni, icon: ClipboardList, color: 'bg-amber-100 text-amber-600', path: '/admin/pesanan' },
    { label: 'Booking Aktif', value: dummyAdminBooking.filter(b => b.status === 'diajukan' || b.status === 'dikonfirmasi').length, icon: CalendarCheck, color: 'bg-purple-100 text-purple-600', path: '/admin/booking' },
    { label: 'Promo Aktif', value: dummyAdminPromo.filter(p => p.status === 'aktif').length, icon: Tag, color: 'bg-pink-100 text-pink-600', path: '/admin/promo' },
    { label: 'Total Penjualan', value: formatRupiah(totalPenjualan), icon: DollarSign, color: 'bg-green-100 text-green-600', path: '/admin/pesanan' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-sm text-gray-500">Ringkasan Agro Market Ecommerce</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {stats.map((stat, i) => (
          <button key={i} onClick={() => navigate(stat.path)} className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all text-left">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color} mb-3`}><stat.icon size={20} /></div>
            <p className="text-xl font-display font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pesanan Terbaru */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-display font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <ClipboardList size={20} className="text-blue-600" /> Pesanan Terbaru
          </h2>
          <div className="space-y-3">
            {dummyAdminPesanan.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-sm">{p.pembeli}</p>
                  <p className="text-xs text-gray-500">{p.tokoNama} • {formatTanggal(p.tanggal)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{formatRupiah(p.total)}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    p.status === 'selesai' ? 'bg-emerald-100 text-emerald-700' :
                    p.status === 'dikirim' ? 'bg-blue-100 text-blue-700' :
                    p.status === 'dibatalkan' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Produk */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-display font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-emerald-600" /> Produk Terlaris
          </h2>
          <div className="space-y-3">
            {dummyAdminProduk.sort((a, b) => b.terjual - a.terjual).slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-lg font-bold text-gray-300 w-6">{i + 1}</span>
                <span className="text-2xl">{p.gambar}</span>
                <div className="flex-1">
                  <p className="font-medium text-sm">{p.nama}</p>
                  <p className="text-xs text-gray-500">{p.tokoNama}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{p.terjual} terjual</p>
                  <p className="text-xs text-gray-400">{formatRupiah(p.harga)}/kg</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
