import React, { useState } from 'react';
import { Store, Check, X, Eye, MapPin, Phone, FileText } from 'lucide-react';
import { formatTanggal } from '../../data/adminDummy';

const pendaftaranToko = [
  { id: 'REG001', namaToko: 'Agro Tasikmalaya', kabupaten: 'Kab. Tasikmalaya', wilayah: 'Priangan Timur', pemilik: 'Dedi Kurniawan', nik: '3201234567890010', noHp: '081777888999', email: 'agrotasik@agro.id', alamat: 'Jl. Pasar Baru No. 12, Tasikmalaya', nomorSIUP: 'SIUP/503/2026/010', tanggalDaftar: '2026-02-25', status: 'pending' as const },
  { id: 'REG002', namaToko: 'Agro Kuningan', kabupaten: 'Kab. Kuningan', wilayah: 'Cirebon Raya', pemilik: 'Yanti Sumiati', nik: '3201234567890011', noHp: '081888999000', email: 'agrokuningan@agro.id', alamat: 'Jl. Siliwangi No. 5, Kuningan', nomorSIUP: 'SIUP/503/2026/011', tanggalDaftar: '2026-02-27', status: 'pending' as const },
  { id: 'REG003', namaToko: 'Agro Karawang', kabupaten: 'Kab. Karawang', wilayah: 'Pantura', pemilik: 'Ahmad Firdaus', nik: '3201234567890012', noHp: '081666777888', email: 'agrokarawang@agro.id', alamat: 'Jl. Galuh Mas No. 8, Karawang', nomorSIUP: 'SIUP/503/2026/012', tanggalDaftar: '2026-02-20', status: 'approved' as const },
];

const ApprovalTokoPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('semua');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const filtered = pendaftaranToko.filter(r => filterStatus === 'semua' || r.status === filterStatus);
  const selected = pendaftaranToko.find(r => r.id === selectedId);
  const statusColor = (s: string) => s === 'pending' ? 'bg-amber-100 text-amber-700' : s === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2"><Store size={24} className="text-indigo-600" /> Approval Toko Baru</h1>
          <p className="text-sm text-gray-500">Verifikasi pendaftaran toko Agro Daerah</p>
        </div>
        <div className="bg-amber-50 rounded-xl px-4 py-2 text-center">
          <p className="text-2xl font-bold text-amber-700">{pendaftaranToko.filter(r => r.status === 'pending').length}</p>
          <p className="text-xs text-amber-600">Menunggu</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="flex gap-2">
          {['semua', 'pending', 'approved', 'rejected'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-2 rounded-xl text-xs font-medium capitalize ${filterStatus === s ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s === 'pending' ? 'Menunggu' : s === 'approved' ? 'Disetujui' : s === 'rejected' ? 'Ditolak' : 'Semua'}</button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {filtered.map(r => (
          <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏪</span>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{r.namaToko}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={12} /> {r.kabupaten} • {r.wilayah}</p>
                  </div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColor(r.status)}`}>{r.status === 'pending' ? 'Menunggu' : r.status === 'approved' ? 'Disetujui' : 'Ditolak'}</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
              <div className="bg-gray-50 rounded-xl p-2.5"><p className="text-xs text-gray-500">Pemilik</p><p className="font-medium text-sm">{r.pemilik}</p></div>
              <div className="bg-gray-50 rounded-xl p-2.5"><p className="text-xs text-gray-500">No. HP</p><p className="font-medium text-sm">{r.noHp}</p></div>
              <div className="bg-gray-50 rounded-xl p-2.5"><p className="text-xs text-gray-500">SIUP</p><p className="font-mono text-xs">{r.nomorSIUP}</p></div>
              <div className="bg-gray-50 rounded-xl p-2.5"><p className="text-xs text-gray-500">Tanggal Daftar</p><p className="font-medium text-sm">{formatTanggal(r.tanggalDaftar)}</p></div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button onClick={() => setSelectedId(r.id)} className="text-xs text-blue-600 font-medium flex items-center gap-1 hover:underline"><Eye size={14} /> Lihat Detail</button>
              {r.status === 'pending' && (
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-4 py-2 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700"><Check size={14} /> Setujui</button>
                  <button className="flex items-center gap-1 px-4 py-2 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100"><X size={14} /> Tolak</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedId(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-xl">Detail Pendaftaran</h2>
              <button onClick={() => setSelectedId(null)} className="p-2 hover:bg-gray-100 rounded-xl"><X size={20} /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><Store size={16} className="text-gray-400" /> <span className="font-semibold">{selected.namaToko}</span></div>
              <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-400" /> {selected.alamat}</div>
              <div className="flex items-center gap-2"><Phone size={16} className="text-gray-400" /> {selected.noHp} • {selected.email}</div>
              <div className="flex items-center gap-2"><FileText size={16} className="text-gray-400" /> SIUP: {selected.nomorSIUP}</div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">NIK Pemilik</p>
                <p className="font-mono font-medium">{selected.nik}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalTokoPage;
