// =====================================================
// DETAIL BOOKING PAGE
// =====================================================

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Tractor, Truck, CheckCircle2, MapPin, Building2, Store, Calendar, Info } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { dummyBookings, formatRupiah, formatTanggal } from '../data/dummy';

// Komponen mini untuk step tracking (sama dengan di RiwayatBookingPage)
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
    <div className="py-6 my-4 border-y border-gray-100 bg-gray-50/50 rounded-2xl px-4 lg:px-8">
      <div className="flex items-center justify-between relative px-2">
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200" />
        <div 
          className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-primary-500 transition-all duration-700 ease-in-out" 
          style={{ width: `calc(${(curIdx / (steps.length - 1)) * 100}% - 12px)` }} 
        />
        
        {steps.map((step, idx) => {
          const isActive = idx <= curIdx;
          const isCurrent = idx === curIdx;
          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                isActive ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white border-gray-200 text-gray-400'
              } ${isCurrent ? 'ring-4 ring-primary-100 shadow-md scale-110' : ''}`}>
                {step.icon}
              </div>
              <span className={`text-[10px] font-bold text-center max-w-[60px] leading-tight ${isActive ? 'text-primary-800' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Skenario Khusus Lintas Daerah untuk status 'diproses' / 'dikonfirmasi' */}
      {(status === 'diproses' || status === 'dikonfirmasi' || status === 'dikirim') && (
        <div className="mt-8 space-y-4 pl-2 lg:px-6">
          <div className="flex items-center gap-2 text-gray-800">
            <Info size={16} className="text-primary-600" />
            <p className="text-xs font-bold font-display uppercase tracking-wider">Update Progress Logistik & Tanam</p>
          </div>
          <div className="relative pl-5 space-y-5 border-l-2 border-primary-100">
            <div className="relative">
              <div className="absolute -left-[26px] top-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white" />
              <p className="text-[10px] text-gray-400 font-medium tracking-tight">27 Feb 2026, 14:00 WIB</p>
              <p className="text-xs text-gray-700 leading-relaxed mt-0.5">BUMD telah membagi alokasi tender ke <b>Agro Tani Garut (3 Ton)</b> dan <b>Agro Tani Lembang (2 Ton)</b> sesuai kapasitas wilayah.</p>
            </div>
            
            {(status === 'diproses' || status === 'dikirim') && (
              <div className="relative">
                <div className="absolute -left-[26px] top-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white shadow-sm ring-2 ring-amber-100 animate-pulse" />
                <p className="text-[10px] text-amber-600 font-bold tracking-tight">Hari ini, 09:00 WIB</p>
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm mt-1.5 max-w-sm">
                  <p className="text-xs text-gray-800 font-bold">Progress Masa Tanam (Estimasi Panen: 70 Hari)</p>
                  <div className="w-full bg-gray-100 rounded-full h-2 mt-2.5 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: '45%' }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1.5 font-medium">
                    <span>Hari ke-30</span>
                    <span className="text-amber-600 font-bold italic">Sedang Berlangsung</span>
                    <span>70 Hari</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const DetailBookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const booking = dummyBookings.find(b => b.id === id);

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl">⚠️</div>
        <h2 className="text-xl font-bold text-gray-800">Booking Tidak Ditemukan</h2>
        <p className="text-gray-500 text-sm mt-2 max-w-xs">Maaf, data booking dengan ID #{id} tidak ada dalam sistem kami.</p>
        <button onClick={() => navigate('/booking')} className="mt-6 btn-primary px-8">Kembali</button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 lg:top-16 z-40 transition-shadow">
        <div className="flex items-center gap-4 max-w-5xl mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-lg text-gray-900">Detail Booking</h1>
              <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-bold text-gray-500 rounded uppercase">#{booking.id}</span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">Diajukan pada {formatTanggal(booking.tanggalDibuat)}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 lg:p-6 space-y-4">
        {/* Tracking Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-gray-800 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-primary-600 rounded-full" />
              Status Booking
            </h3>
            <StatusBadge status={booking.status} />
          </div>
          <TrackingStepper status={booking.status} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Info Booking */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-display font-bold text-gray-800 mb-5 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary-600 rounded-full" />
                Informasi Pemesan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Perusahaan / Instansi</p>
                    <p className="font-semibold text-gray-800">{booking.namaPerusahaan}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{booking.kontakNama} • {booking.kontakTelepon}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Store className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Toko Agro Tujuan</p>
                    <p className="font-semibold text-gray-800">{booking.storeName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Jawa Barat, Indonesia</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="text-gray-400 mt-0.5" size={16} />
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Jadwal Kirim</p>
                    <p className="text-sm font-medium text-gray-700">{formatTanggal(booking.tanggalKirim)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-gray-400 mt-0.5" size={16} />
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Frekuensi</p>
                    <p className="text-sm font-medium text-gray-700 capitalize">{booking.frekuensi}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Item Table */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden">
              <h3 className="font-display font-bold text-gray-800 mb-5 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary-600 rounded-full" />
                Daftar Komoditas
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="pb-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nama Produk</th>
                      <th className="pb-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Volume</th>
                      <th className="pb-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Harga / Kg</th>
                      <th className="pb-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {booking.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-4 text-sm font-semibold text-gray-800">{item.komoditasNama}</td>
                        <td className="py-4 text-sm text-gray-600 text-center font-medium">{item.jumlahKg} kg</td>
                        <td className="py-4 text-sm text-gray-600 text-right">{formatRupiah(item.hargaPerKg)}</td>
                        <td className="py-4 text-sm font-bold text-gray-900 text-right">{formatRupiah(item.jumlahKg * item.hargaPerKg)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Ringkasan Biaya */}
          <div className="lg:col-span-1">
            <div className="bg-primary-900 rounded-3xl p-6 text-white shadow-xl shadow-primary-900/10 sticky top-24 lg:top-40">
              <h3 className="font-display font-bold text-lg mb-6 opacity-90">Ringkasan Biaya</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="opacity-60 font-medium">Total Harga Produk</span>
                  <span className="font-semibold">{formatRupiah(booking.totalHarga)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-60 font-medium">Estimasi Pajak (11%)</span>
                  <span className="font-semibold">{formatRupiah(0)}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                  <span className="opacity-80 text-xs font-bold uppercase tracking-widest">Total Tagihan</span>
                  <span className="text-2xl font-display font-bold text-primary-300">{formatRupiah(booking.totalHarga)}</span>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                  <Info size={20} className="text-primary-300 flex-shrink-0" />
                  <p className="text-[10px] leading-relaxed opacity-70 font-medium">
                    Harga bersifat estimasi dan akan disesuaikan dengan kondisi pasar saat waktu panen/pengiriman.
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => window.print()}
                className="w-full mt-6 py-3.5 bg-white text-primary-900 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/90 active:scale-95 transition-all shadow-lg"
              >
                Cetak Bukti Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBookingPage;
