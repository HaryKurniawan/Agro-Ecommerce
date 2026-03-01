import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ClipboardList, CalendarCheck, DollarSign, TrendingUp, Star } from 'lucide-react';
import { dummyTokoSaya, dummyProdukSaya, dummyPesananMasuk, dummyBookingMasuk, formatRupiah } from '../../data/sellerDummy';

const DashboardSellerPage: React.FC = () => {
  const navigate = useNavigate();
  const pesananBaru = dummyPesananMasuk.filter(p => p.status === 'baru').length;
  const bookingBaru = dummyBookingMasuk.filter(b => b.status === 'masuk').length;
  // const pendapatanBulan = dummyPesananMasuk.filter(p => p.status === 'selesai').reduce((s, p) => s + p.total, 0);

  const stats = [
    { label: 'Produk Aktif', value: dummyProdukSaya.filter(p => p.status === 'aktif').length, icon: Package, color: 'bg-emerald-100 text-emerald-600', path: '/seller/produk' },
    { label: 'Pesanan Baru', value: pesananBaru, icon: ClipboardList, color: 'bg-amber-100 text-amber-600', path: '/seller/pesanan' },
    { label: 'Booking Masuk', value: bookingBaru, icon: CalendarCheck, color: 'bg-purple-100 text-purple-600', path: '/seller/booking' },
    { label: 'Rating Toko', value: dummyTokoSaya.rating, icon: Star, color: 'bg-yellow-100 text-yellow-600', path: '/seller/profil-toko' },
    { label: 'Total Penjualan', value: dummyTokoSaya.totalPesanan, icon: TrendingUp, color: 'bg-blue-100 text-blue-600', path: '/seller/pesanan' },
    { label: 'Pendapatan', value: formatRupiah(dummyTokoSaya.totalPendapatan), icon: DollarSign, color: 'bg-green-100 text-green-600', path: '/seller/pesanan' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{dummyTokoSaya.foto}</span>
          <div>
            <h1 className="font-display font-bold text-2xl">{dummyTokoSaya.nama}</h1>
            <p className="text-emerald-100 text-sm">{dummyTokoSaya.kabupaten} • {dummyTokoSaya.wilayah}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        {stats.map((stat, i) => (
          <button key={i} onClick={() => navigate(stat.path)} className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all text-left">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color} mb-3`}><stat.icon size={20} /></div>
            <p className="text-lg font-display font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Recent Orders + Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <ClipboardList size={20} className="text-amber-600" /> Pesanan Terbaru
          </h2>
          <div className="space-y-3">
            {dummyPesananMasuk.slice(0, 3).map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-sm">{p.pembeli}</p>
                  <p className="text-xs text-gray-500">{p.items.map(i => i.nama).join(', ')}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{formatRupiah(p.total)}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    p.status === 'baru' ? 'bg-red-100 text-red-700' :
                    p.status === 'diproses' ? 'bg-amber-100 text-amber-700' :
                    p.status === 'dikirim' ? 'bg-blue-100 text-blue-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <CalendarCheck size={20} className="text-purple-600" /> Booking Terbaru
          </h2>
          <div className="space-y-3">
            {dummyBookingMasuk.map(b => (
              <div key={b.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-sm">{b.perusahaan}</p>
                  <p className="text-xs text-gray-500">{b.komoditas} • {b.jumlahKg} kg</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{formatRupiah(b.total)}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    b.status === 'masuk' ? 'bg-amber-100 text-amber-700' :
                    b.status === 'dikonfirmasi' ? 'bg-blue-100 text-blue-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSellerPage;
