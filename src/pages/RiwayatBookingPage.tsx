// =====================================================
// RIWAYAT BOOKING PAGE
// =====================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Tractor, Truck, CheckCircle2, MapPin } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { dummyBookings, formatRupiah, formatTanggal } from '../data/dummy';

// Komponen mini untuk step tracking
const TrackingStepper = ({ status }: { status: string }) => {
  const steps = [
    { key: 'diajukan', label: 'Tinjauan', icon: <Clock size={14}/> },
    { key: 'dikonfirmasi', label: 'Alokasi Lahan', icon: <MapPin size={14}/> },
    { key: 'diproses', label: 'Masa Tanam', icon: <Tractor size={14}/> },
    { key: 'dikirim', label: 'Pengiriman Lintas Daerah', icon: <Truck size={14}/> },
    { key: 'selesai', label: 'B.A.S.T', icon: <CheckCircle2 size={14}/> },
  ];
  
  const curIdx = steps.findIndex(s => s.key === status) === -1 ? 0 : steps.findIndex(s => s.key === status);

  return (
    <div className="py-4 my-2 border-y border-gray-100 mb-4 bg-gray-50/50 rounded-xl px-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary-500 transition-all duration-500" style={{ width: `${(curIdx / (steps.length - 1)) * 100}%` }} />
        
        {steps.map((step, idx) => {
          const isActive = idx <= curIdx;
          const isCurrent = idx === curIdx;
          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center gap-1.5 bg-gray-50/50 px-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                isActive ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white border-gray-300 text-gray-400'
              } ${isCurrent ? 'ring-4 ring-primary-100 shadow-sm' : ''}`}>
                {step.icon}
              </div>
              <span className={`text-[10px] font-semibold text-center hidden md:block w-20 ${isActive ? 'text-primary-800' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Skenario Khusus Lintas Daerah untuk status 'diproses' */}
      {(status === 'diproses' || status === 'dikonfirmasi') && (
        <div className="mt-6 space-y-3 pl-2">
          <p className="text-xs font-bold text-gray-700">Histori & Alokasi Lintas Daerah:</p>
          <div className="relative pl-4 space-y-4 border-l-2 border-primary-200">
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-primary-500 rounded-full border-2 border-white" />
              <p className="text-[10px] text-gray-400">Kemarin, 14:00 WIB</p>
              <p className="text-xs text-gray-700 font-medium">BUMD telah memecah Tender ke <b>Agro Tani Garut (3 Ton)</b> dan <b>Agro Tani Lembang (2 Ton)</b> karena kekosongan stok di Bandung.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white shadow-sm ring-2 ring-amber-100 animate-pulse" />
              <p className="text-[10px] text-amber-600 font-bold">Hari ini, 09:00 WIB</p>
              <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm mt-1">
                <p className="text-xs text-gray-800 font-bold">Progress Masa Tanam (Estimasi Panen: 70 Hari)</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>Hari ke-30</span>
                  <span>70 Hari</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RiwayatBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('semua');

  const statusList = ['semua', 'diajukan', 'dikonfirmasi', 'diproses', 'dikirim', 'selesai'];

  const filtered = filterStatus === 'semua' ? dummyBookings : dummyBookings.filter(b => b.status === filterStatus);

  return (
    <div className="animate-fade-in">
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 lg:top-16 z-40">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl lg:hidden">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="font-display font-bold text-lg">Riwayat Booking</h1>
        </div>
        <div className="overflow-x-auto scroll-hide -mx-4 px-4">
          <div className="flex gap-2">
            {statusList.map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  filterStatus === s ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-6 py-4 space-y-3">
        {filtered.map((booking) => (
          <div 
            key={booking.id} 
            onClick={() => navigate(`/booking/detail/${booking.id}`)}
            className="card active:scale-[0.99] transition-all cursor-pointer hover:border-primary-100 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-sm text-gray-800">{booking.namaPerusahaan}</p>
                <p className="text-xs text-gray-400 mb-1">{booking.storeName} • #{booking.id}</p>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] font-semibold text-gray-600 uppercase">
                  📦 {booking.id.includes('001') ? 'Premium Retail Pack' : booking.id.includes('002') ? 'Mentah / Curah' : 'Cuci Bersih Curah'}
                </span>
              </div>
              <StatusBadge status={booking.status} />
            </div>
            <div className="mt-3 space-y-1.5">
              {booking.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.komoditasNama} ({item.jumlahKg} kg)</span>
                  <span className="text-gray-800 font-medium">{formatRupiah(item.jumlahKg * item.hargaPerKg)}</span>
                </div>
              ))}
            </div>

            {/* Stepper Tracking Visualisasi */}
            <TrackingStepper status={booking.status} />

            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
              <div>
                <p className="text-xs text-gray-400">Kirim: {formatTanggal(booking.tanggalKirim)} • {booking.frekuensi}</p>
                {booking.status === 'dikonfirmasi' && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/pembayaran', { state: { bookingId: booking.id } });
                    }}
                    className="mt-2 bg-primary-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-lg hover:bg-primary-700 transition-colors shadow-sm shadow-primary-200"
                  >
                    Bayar Booking
                  </button>
                )}
              </div>
              <p className="font-display font-bold text-primary-700">{formatRupiah(booking.totalHarga)}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📅</p>
            <p className="text-gray-500">Belum ada booking</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiwayatBookingPage;
