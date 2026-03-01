import React, { useState } from 'react';
import { CalendarCheck, CheckCircle, XCircle } from 'lucide-react';
import { dummyBookingMasuk, formatRupiah, formatTanggal } from '../../data/sellerDummy';

const BookingMasukPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('semua');
  const filtered = dummyBookingMasuk.filter(b => filterStatus === 'semua' || b.status === filterStatus);
  const statusColor = (s: string) => s === 'masuk' ? 'bg-amber-100 text-amber-700' : s === 'dikonfirmasi' ? 'bg-blue-100 text-blue-700' : s === 'selesai' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700';

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2"><CalendarCheck size={24} className="text-purple-600" /> Booking Masuk</h1>
        <p className="text-sm text-gray-500">Permintaan booking B2B dari perusahaan/restoran</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="flex gap-2">
          {['semua', 'masuk', 'dikonfirmasi', 'selesai', 'ditolak'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-2 rounded-xl text-xs font-medium capitalize ${filterStatus === s ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {filtered.map(b => (
          <div key={b.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-gray-900 text-lg">{b.perusahaan}</p>
                <p className="text-xs text-gray-500">{b.id} • PIC: {b.pic} ({b.noHp})</p>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColor(b.status)}`}>{b.status}</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
              <div className="bg-purple-50 rounded-xl p-3"><p className="text-xs text-purple-600">Komoditas</p><p className="font-bold">{b.komoditas}</p></div>
              <div className="bg-blue-50 rounded-xl p-3"><p className="text-xs text-blue-600">Jumlah</p><p className="font-bold">{b.jumlahKg.toLocaleString()} kg</p></div>
              <div className="bg-emerald-50 rounded-xl p-3"><p className="text-xs text-emerald-600">Harga/kg</p><p className="font-bold">{formatRupiah(b.hargaPerKg)}</p></div>
              <div className="bg-amber-50 rounded-xl p-3"><p className="text-xs text-amber-600">Total</p><p className="font-bold">{formatRupiah(b.total)}</p></div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">📅 Kirim: {formatTanggal(b.tanggalKirim)}</p>
              {b.status === 'masuk' && (
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700"><CheckCircle size={14} /> Konfirmasi</button>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100"><XCircle size={14} /> Tolak</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingMasukPage;
