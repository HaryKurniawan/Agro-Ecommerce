import React, { useState } from 'react';
import { CalendarCheck, MapPin, X, CheckCircle2, SplitSquareHorizontal } from 'lucide-react';
import { dummyAdminBooking, formatRupiah, formatTanggal } from '../../data/adminDummy';

const ManajemenBookingPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('semua');
  const statusList = ['semua', 'diajukan', 'dikonfirmasi', 'selesai', 'dibatalkan'];
  const filtered = dummyAdminBooking.filter(b => filterStatus === 'semua' || b.status === filterStatus);
  const statusColor = (s: string) => s === 'selesai' ? 'bg-emerald-100 text-emerald-700' : s === 'dikonfirmasi' ? 'bg-blue-100 text-blue-700' : s === 'dibatalkan' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700';

  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const [alokasi, setAlokasi] = useState({
    garut: 0,
    lembang: 0,
    bandung: 0,
  });

  const openAlokasiModal = (b: any) => {
    setSelectedBooking(b);
    // Auto-calculate initial split suggestion based on dummy logic
    let sisa = b.jumlahKg;
    const bandung = Math.min(sisa, 0); // Simulasi stock Bandung kosong
    sisa -= bandung;
    const garut = Math.min(sisa, Math.floor(b.jumlahKg * 0.6)); // 60% ke Garut
    sisa -= garut;
    const lembang = sisa; // Sisanya ke Lembang

    setAlokasi({ bandung, garut, lembang });
    setShowModal(true);
  };

  const submitAlokasi = () => {
    alert(`Tender berhasil dilempar ke daerah:\n- Garut: ${alokasi.garut} kg\n- Lembang: ${alokasi.lembang} kg\n- Bandung: ${alokasi.bandung} kg\n\nPetani di wilayah tersebut akan menerima notifikasi pendaftaran Tender/Crowdsourcing.`);
    setShowModal(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2"><CalendarCheck size={24} className="text-purple-600" /> Manajemen Booking</h1>
        <p className="text-sm text-gray-500">Kelola booking B2B dari perusahaan & restoran</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="flex gap-2">
          {statusList.map(s => (<button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-2 rounded-xl text-xs font-medium capitalize ${filterStatus === s ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>))}
        </div>
      </div>
      <div className="space-y-4">
        {filtered.map(b => (
          <div key={b.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-gray-900 text-lg">{b.perusahaan}</p>
                <p className="text-xs text-gray-500">{b.id} • {b.tokoNama}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColor(b.status)}`}>{b.status}</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
              <div className="bg-purple-50 rounded-xl p-3">
                <p className="text-xs text-purple-600">Komoditas</p>
                <p className="font-bold">{b.komoditas}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-blue-600">Jumlah</p>
                <p className="font-bold">{b.jumlahKg.toLocaleString()} kg</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3">
                <p className="text-xs text-emerald-600">Harga/kg</p>
                <p className="font-bold">{formatRupiah(b.hargaPerKg)}</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-3">
                <p className="text-xs text-amber-600">Total</p>
                <p className="font-bold">{formatRupiah(b.total)}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-500 items-center justify-between">
              <div className="flex gap-4">
                <span>👤 PIC: {b.pic} ({b.noHp})</span>
                <span>📅 Booking: {formatTanggal(b.tanggalBooking)}</span>
                <span>🚛 Kirim: {formatTanggal(b.tanggalPengiriman)}</span>
              </div>
              {b.status === 'diajukan' && (
                <button 
                  onClick={() => openAlokasiModal(b)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-semibold hover:bg-purple-700 flex items-center gap-2 shadow-sm"
                >
                  <SplitSquareHorizontal size={14}/> Evaluasi & Alokasi Lintas Daerah
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL ALOKASI LINTAS DAERAH */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-gray-900 flex items-center gap-2">
                  <SplitSquareHorizontal className="text-purple-600" size={20}/> Split Tender Lintas Daerah
                </h3>
                <p className="text-xs text-gray-500 mt-1">Order: {selectedBooking.perusahaan} ({selectedBooking.jumlahKg.toLocaleString()} kg {selectedBooking.komoditas})</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl"><X size={18}/></button>
            </div>
            
            <div className="p-5 bg-purple-50 space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold text-purple-900">
                <span>Total Permintaan Booking:</span>
                <span className="text-lg">{selectedBooking.jumlahKg.toLocaleString()} kg</span>
              </div>
              <p className="text-xs text-purple-700">Karena pasokan lokal kosong, sistem merekomendasikan pelemparan tender ke beberapa Agro Daerah (Crowdsourcing Petani).</p>
            </div>

            <div className="p-5 space-y-4">
              {/* Lokasi 1 */}
              <div className="flex items-center justify-between gap-4 p-3 border border-gray-200 rounded-xl hover:border-purple-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg text-gray-500"><MapPin size={18}/></div>
                  <div>
                    <p className="font-bold text-sm text-gray-800">Agro Tani Bandung</p>
                    <p className="text-[10px] text-rose-500 font-bold">Stok/Lahan Lokal: 0 kg (Kosong)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" 
                    value={alokasi.bandung}
                    onChange={(e) => setAlokasi({...alokasi, bandung: parseInt(e.target.value) || 0})}
                    className="w-24 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-right focus:border-purple-500 outline-none" 
                  />
                  <span className="text-xs text-gray-500 font-medium">kg</span>
                </div>
              </div>

              {/* Lokasi 2 */}
              <div className="flex items-center justify-between gap-4 p-3 border border-purple-200 bg-purple-50/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><MapPin size={18}/></div>
                  <div>
                    <p className="font-bold text-sm text-purple-900">Agro Tani Garut</p>
                    <p className="text-[10px] text-emerald-600 font-bold">Lahan Tersedia: 15 Hektar (Potensi Besar)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" 
                    value={alokasi.garut}
                    onChange={(e) => setAlokasi({...alokasi, garut: parseInt(e.target.value) || 0})}
                    className="w-24 px-3 py-1.5 border border-purple-300 rounded-lg text-sm text-right focus:border-purple-500 outline-none" 
                  />
                  <span className="text-xs text-purple-700 font-medium">kg</span>
                </div>
              </div>

              {/* Lokasi 3 */}
              <div className="flex items-center justify-between gap-4 p-3 border border-purple-200 bg-purple-50/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><MapPin size={18}/></div>
                  <div>
                    <p className="font-bold text-sm text-purple-900">Agro Tani Lembang</p>
                    <p className="text-[10px] text-emerald-600 font-bold">Lahan Tersedia: 5 Hektar</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" 
                    value={alokasi.lembang}
                    onChange={(e) => setAlokasi({...alokasi, lembang: parseInt(e.target.value) || 0})}
                    className="w-24 px-3 py-1.5 border border-purple-300 rounded-lg text-sm text-right focus:border-purple-500 outline-none" 
                  />
                  <span className="text-xs text-purple-700 font-medium">kg</span>
                </div>
              </div>
              
              {/* Peringatan Ongkos */}
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                <span className="mt-0.5">⚠️</span> 
                <span>Pengiriman lintas daerah akan memunculkan pos tagihan <b>Ongkos Kirim Logistik Antar-Kota</b> saat B.A.S.T diterbitkan untuk Buyer.</span>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
              <button 
                onClick={submitAlokasi}
                disabled={(alokasi.garut + alokasi.lembang + alokasi.bandung) !== selectedBooking.jumlahKg}
                className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <CheckCircle2 size={16}/> Konfirmasi Lempar Tender
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManajemenBookingPage;
