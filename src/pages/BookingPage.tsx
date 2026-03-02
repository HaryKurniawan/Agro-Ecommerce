// =====================================================
// BOOKING PAGE — LANDING PAGE BOOKING B2B (Primary Theme)
// =====================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarCheck, ChevronRight, BookOpen } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { dummyBookings, formatRupiah, formatTanggal } from '../data/dummy';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      {/* Top Bar — Clean & Minimal */}
      <div className="bg-white px-5 py-4 flex items-center gap-4 sticky top-0 z-30 lg:top-16 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors lg:hidden">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="font-display font-bold text-lg text-gray-900">Booking Supply</h1>
          <p className="text-gray-500 text-[10px] font-medium tracking-wide uppercase">Restoran, Hotel & Catering</p>
        </div>
      </div>

      <div className="p-4 lg:p-6 space-y-6">
        {/* CTA Hero Card — Premium Aesthetic */}
        <div className="relative overflow-hidden bg-white rounded-3xl p-6 shadow-sm border border-gray-100 group">
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              
              <h2 className="font-display font-bold text-2xl text-gray-900 leading-tight">
                Butuh pasokan sayur <span className="text-primary-600">skala besar?</span>
              </h2>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-sm">
                Dapatkan harga grosir eksklusif dan jadwal pengiriman rutin langsung dari Toko Agro pilihan Anda.
              </p>
            </div>
            
            <button
              onClick={() => navigate('/booking/form')}
              className="mt-2 md:mt-0 bg-primary-600 text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary-700 transition-all active:scale-95"
            >
              <CalendarCheck size={20} />
              <span>Ajukan Booking Baru</span>
            </button>
          </div>
          
          {/* Link Panduan */}
          <div className="mt-4 flex justify-center md:justify-end">
            <button 
              onClick={() => navigate('/booking/panduan')}
              className="flex items-center gap-2 text-primary-600 font-bold text-xs hover:text-primary-700 transition-all group"
            >
              <div className="p-1.5 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors">
                <BookOpen size={14} />
              </div>
              Lihat Panduan & Cara Booking
            </button>
          </div>
        </div>

        {/* Active Bookings (Riwayat yang Aktif) */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-sm text-gray-800">Booking Aktif</h2>
            <button
              onClick={() => navigate('/booking/riwayat')}
              className="text-primary-600 text-xs font-medium flex items-center gap-1"
            >
              Lihat semua <ChevronRight size={14} />
            </button>
          </div>

          {dummyBookings.filter(b => b.status !== 'selesai').length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-gray-100">
              <p className="text-3xl mb-2">📋</p>
              <p className="text-gray-500 text-sm font-medium">Belum ada booking aktif</p>
              <p className="text-xs text-gray-400 mt-0.5">Ajukan booking pertama Anda</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dummyBookings
                .filter(b => b.status !== 'selesai')
                .slice(0, 3)
                .map((booking) => (
                  <div 
                    key={booking.id} 
                    onClick={() => navigate(`/booking/detail/${booking.id}`)}
                    className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
                  >
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
                      {booking.status === 'dikonfirmasi' && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/pembayaran', { state: { bookingId: booking.id } });
                          }}
                          className="mt-3 w-full bg-primary-600 text-white text-[11px] font-bold py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-sm shadow-primary-200"
                        >
                          Bayar Booking
                        </button>
                      )}
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
