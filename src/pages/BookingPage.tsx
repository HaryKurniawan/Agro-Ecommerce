// =====================================================
// BOOKING PAGE — LANDING PAGE BOOKING B2B (Primary Theme)
// =====================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarCheck, Truck, BadgePercent, Shield, ChevronRight, Clock } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { dummyBookings, formatRupiah, formatTanggal } from '../data/dummy';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    { icon: BadgePercent, title: 'Harga Grosir', desc: 'Harga spesial untuk pembelian dalam jumlah besar' },
    { icon: Truck, title: 'Prioritas Kirim', desc: 'Jadwal pengiriman rutin sesuai kebutuhan' },
    { icon: Shield, title: 'Kualitas Terjamin', desc: 'Sayuran segar langsung dari kebun lokal' },
    { icon: Clock, title: 'Supply Rutin', desc: 'Harian, mingguan, atau bulanan' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header — primary color theme */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white p-5 pb-8 rounded-b-3xl lg:rounded-none lg:pt-6">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/15 rounded-xl lg:hidden">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-display font-bold text-xl">Booking Supply</h1>
            <p className="text-primary-200 text-xs">Untuk restoran, hotel & catering</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white/15 backdrop-blur rounded-2xl p-5 mt-2">
          <h2 className="font-display font-bold text-lg">Butuh sayuran dalam jumlah besar?</h2>
          <p className="text-primary-100 text-sm mt-1">
            Ajukan booking langsung ke toko Agro Daerah pilihan Anda. Dapatkan harga grosir dan jadwal pengiriman rutin.
          </p>
          <button
            onClick={() => navigate('/booking/form')}
            className="mt-3 w-full bg-white text-primary-800 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-lg"
          >
            <CalendarCheck size={18} /> Ajukan Booking Baru
          </button>
        </div>
      </div>

      <div className="px-4 lg:px-6 -mt-4 space-y-5 pb-4">
        {/* Benefits */}
        <div className="grid grid-cols-2 gap-3">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                <b.icon size={20} className="text-primary-600" />
              </div>
              <h3 className="font-semibold text-xs text-gray-800">{b.title}</h3>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Riwayat Booking */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-sm text-gray-800">Riwayat Booking</h2>
            <button
              onClick={() => navigate('/booking/riwayat')}
              className="text-primary-600 text-xs font-medium flex items-center gap-1"
            >
              Lihat semua <ChevronRight size={14} />
            </button>
          </div>

          {dummyBookings.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-gray-100">
              <p className="text-3xl mb-2">📋</p>
              <p className="text-gray-500 text-sm font-medium">Belum ada riwayat booking</p>
              <p className="text-xs text-gray-400 mt-0.5">Ajukan booking pertama Anda</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dummyBookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{booking.namaPerusahaan}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{booking.storeName} • {formatTanggal(booking.tanggalDibuat)}</p>
                    </div>
                    <StatusBadge status={booking.status} size="sm" />
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-gray-500">{booking.items.length} komoditas • {booking.frekuensi}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Kirim: {formatTanggal(booking.tanggalKirim)}</p>
                      </div>
                      <p className="font-display font-bold text-sm text-primary-700">{formatRupiah(booking.totalHarga)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BookingPage;
