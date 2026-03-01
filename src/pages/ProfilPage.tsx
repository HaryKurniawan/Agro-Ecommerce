// =====================================================
// PROFIL PAGE — USER PROFILE + Inline Order Tracking
// =====================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ShoppingBag, CalendarCheck, Heart, Settings, LogOut, ChevronRight, Package, Truck, CheckCircle2, Clock } from 'lucide-react';
import { dummyUser, dummyStores, dummyOrders, dummyBookings, formatRupiah, formatTanggal } from '../data/dummy';
import StatusBadge from '../components/StatusBadge';

const ProfilPage: React.FC = () => {
  const navigate = useNavigate();
  const tokoFavorit = dummyStores.filter(s => dummyUser.tokoFavorit.includes(s.id));

  const menuItems = [
    { icon: CalendarCheck, label: 'Riwayat Booking', count: dummyBookings.length, path: '/booking/riwayat' },
    { icon: Heart, label: 'Toko Favorit', count: tokoFavorit.length, path: '/toko' },
    { icon: MapPin, label: 'Alamat Tersimpan', count: dummyUser.alamat.length, path: '/alamat' },
    { icon: Settings, label: 'Pengaturan', path: '#' },
  ];

  // Order status tabs like Shopee
  const orderTabs = [
    { icon: Clock, label: 'Menunggu', status: 'menunggu_bayar', count: dummyOrders.filter(o => o.status === 'menunggu_bayar').length },
    { icon: Package, label: 'Diproses', status: 'diproses', count: dummyOrders.filter(o => o.status === 'diproses').length },
    { icon: Truck, label: 'Dikirim', status: 'dikirim', count: dummyOrders.filter(o => o.status === 'dikirim').length },
    { icon: CheckCircle2, label: 'Selesai', status: 'selesai', count: dummyOrders.filter(o => o.status === 'selesai').length },
  ];

  // Recent orders (last 3)
  const recentOrders = dummyOrders.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white p-5 pb-8 rounded-b-3xl lg:rounded-none lg:pt-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
            {dummyUser.foto}
          </div>
          <div>
            <h1 className="font-display font-bold text-xl">{dummyUser.nama}</h1>
            <p className="text-green-200 text-xs">{dummyUser.email}</p>
            <p className="text-green-200 text-xs">{dummyUser.telepon}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white/15 backdrop-blur rounded-xl p-2.5 text-center">
            <p className="text-lg font-bold">{dummyOrders.length}</p>
            <p className="text-[10px] text-green-200">Pesanan</p>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl p-2.5 text-center">
            <p className="text-lg font-bold">{dummyBookings.length}</p>
            <p className="text-[10px] text-green-200">Booking</p>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl p-2.5 text-center">
            <p className="text-lg font-bold">{tokoFavorit.length}</p>
            <p className="text-[10px] text-green-200">Favorit</p>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-6 -mt-4 space-y-4 pb-4">

        {/* ====== PESANAN SAYA (Shopee-style) ====== */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <ShoppingBag size={16} className="text-primary-600" /> Pesanan Saya
            </h3>
            <button onClick={() => navigate('/profil/pesanan')} className="text-xs text-primary-600 font-semibold flex items-center gap-0.5">
              Lihat Semua <ChevronRight size={14} />
            </button>
          </div>

          {/* Order Status Tabs */}
          <div className="grid grid-cols-4 gap-1 mb-4">
            {orderTabs.map((tab) => (
              <button
                key={tab.status}
                onClick={() => navigate(`/profil/pesanan?status=${tab.status}`)}
                className="flex flex-col items-center gap-1 py-2.5 rounded-xl hover:bg-gray-50 transition-colors relative"
              >
                <div className="relative">
                  <tab.icon size={22} className="text-gray-500" />
                  {tab.count > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                      {tab.count}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium text-gray-600">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Recent Orders Compact */}
          {recentOrders.length > 0 && (
            <div className="space-y-2">
              {recentOrders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => navigate('/profil/pesanan')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 2).map((item, i) => (
                      <span key={i} className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-lg border border-gray-100">{item.gambar}</span>
                    ))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 line-clamp-1">
                      {order.items.map(it => it.produkNama).join(', ')}
                    </p>
                    <p className="text-[10px] text-gray-400">{formatTanggal(order.tanggalDibuat)} • {order.items.length} produk</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge status={order.status} size="sm" />
                    <span className="text-xs font-bold text-primary-700">{formatRupiah(order.totalHarga + order.ongkir)}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="card divide-y divide-gray-50">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 py-3.5 first:pt-0 last:pb-0 hover:bg-gray-50 -mx-5 px-5 transition-colors"
            >
              <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center">
                <item.icon size={18} className="text-primary-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm text-gray-800">{item.label}</p>
              </div>
              {item.count !== undefined && (
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.count}</span>
              )}
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>

        {/* Panel Access (Mockup) */}
        <div className="space-y-2">
          <button
            onClick={() => navigate('/seller/dashboard')}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg"
          >
            🏪 Masuk sebagai Seller (Pemilik Toko)
          </button>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
          >
            🔐 Masuk sebagai Admin Ecommerce
          </button>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 py-3 text-red-500 font-medium text-sm hover:bg-red-50 rounded-xl transition-colors">
          <LogOut size={18} /> Keluar
        </button>
      </div>
    </div>
  );
};

export default ProfilPage;
