// =====================================================
// FORM PEMBUKAAN TOKO DAERAH - ECOMMERCE SAYUR
// =====================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, User, FileText, ChevronRight, ChevronLeft, Check, ArrowLeft } from 'lucide-react';

const kabupatenList = [
  'Kab. Bandung', 'Kab. Bandung Barat', 'Kab. Garut', 'Kab. Tasikmalaya',
  'Kab. Cianjur', 'Kab. Sukabumi', 'Kab. Sumedang', 'Kab. Subang',
  'Kab. Purwakarta', 'Kab. Karawang', 'Kab. Bekasi', 'Kab. Ciamis',
  'Kab. Kuningan', 'Kab. Cirebon', 'Kab. Majalengka', 'Kab. Indramayu',
  'Kab. Pangandaran', 'Kab. Bogor', 'Kota Bandung', 'Kota Bogor',
];

const wilayahMap: Record<string, string> = {
  'Kab. Bandung': 'Bandung Raya', 'Kab. Bandung Barat': 'Bandung Raya', 'Kota Bandung': 'Bandung Raya',
  'Kab. Garut': 'Priangan Timur', 'Kab. Tasikmalaya': 'Priangan Timur', 'Kab. Ciamis': 'Priangan Timur',
  'Kab. Cianjur': 'Bandung Raya', 'Kab. Sukabumi': 'Sukabumi',
  'Kab. Sumedang': 'Sumedang', 'Kab. Subang': 'Pantura',
  'Kab. Purwakarta': 'Purwakarta', 'Kab. Karawang': 'Pantura', 'Kab. Bekasi': 'Pantura',
  'Kab. Kuningan': 'Cirebon Raya', 'Kab. Cirebon': 'Cirebon Raya', 'Kota Cirebon': 'Cirebon Raya',
  'Kab. Majalengka': 'Cirebon Raya', 'Kab. Indramayu': 'Pantura',
  'Kab. Pangandaran': 'Priangan Timur', 'Kab. Bogor': 'Bogor Raya', 'Kota Bogor': 'Bogor Raya',
};

const FormBukaTokoPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    namaToko: '', kabupaten: '', alamat: '', deskripsi: '',
    namaPemilik: '', nik: '', noHp: '', email: '',
    nomorSIUP: '', nomorPIRT: '', nomorNIB: '',
  });

  const updateForm = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));
  const wilayah = wilayahMap[form.kabupaten] || '-';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-1 text-emerald-600 text-sm font-medium mb-4 hover:underline">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </button>
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Store className="text-white" size={32} />
          </div>
          <h1 className="font-display font-bold text-2xl text-gray-900">Buka Toko Agro Daerah</h1>
          <p className="text-gray-500 text-sm mt-1">Daftarkan toko Anda untuk menjual produk di Agro Market</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                s < step ? 'bg-emerald-600 text-white' : s === step ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' : 'bg-gray-200 text-gray-500'
              }`}>{s < step ? <Check size={16} /> : s}</div>
              {s < 4 && <div className={`w-8 h-0.5 ${s < step ? 'bg-emerald-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
          {/* Step 1: Info Toko */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl flex items-center gap-2"><Store size={20} className="text-emerald-600" /> Informasi Toko</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Toko</label>
                <input type="text" value={form.namaToko} onChange={e => updateForm('namaToko', e.target.value)} placeholder="Contoh: Agro Bandung" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kabupaten/Kota</label>
                <select value={form.kabupaten} onChange={e => updateForm('kabupaten', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option value="">Pilih Kabupaten/Kota...</option>
                  {kabupatenList.map(k => (<option key={k} value={k}>{k}</option>))}
                </select>
                {form.kabupaten && <p className="text-xs text-emerald-600 mt-1">📍 Wilayah: {wilayah}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <textarea value={form.alamat} onChange={e => updateForm('alamat', e.target.value)} placeholder="Jl. ..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm min-h-[80px] focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Toko</label>
                <textarea value={form.deskripsi} onChange={e => updateForm('deskripsi', e.target.value)} placeholder="Ceritakan tentang toko Anda..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm min-h-[80px] focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
            </div>
          )}

          {/* Step 2: Data Pemilik */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl flex items-center gap-2"><User size={20} className="text-emerald-600" /> Data Pemilik</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input type="text" value={form.namaPemilik} onChange={e => updateForm('namaPemilik', e.target.value)} placeholder="Nama sesuai KTP" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
                <input type="text" value={form.nik} onChange={e => updateForm('nik', e.target.value)} placeholder="16 digit NIK" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. HP</label>
                <input type="tel" value={form.noHp} onChange={e => updateForm('noHp', e.target.value)} placeholder="08xxxxxxxxxx" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => updateForm('email', e.target.value)} placeholder="email@domain.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
            </div>
          )}

          {/* Step 3: Dokumen Izin */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl flex items-center gap-2"><FileText size={20} className="text-emerald-600" /> Dokumen Izin</h2>
              <p className="text-sm text-gray-500">Isi nomor izin yang sudah Anda miliki. Minimal salah satu.</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor SIUP</label>
                <input type="text" value={form.nomorSIUP} onChange={e => updateForm('nomorSIUP', e.target.value)} placeholder="SIUP/xxx/xxxx/xxx" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor PIRT (opsional)</label>
                <input type="text" value={form.nomorPIRT} onChange={e => updateForm('nomorPIRT', e.target.value)} placeholder="PIRT/xxx/xxxx/xxx" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIB (opsional)</label>
                <input type="text" value={form.nomorNIB} onChange={e => updateForm('nomorNIB', e.target.value)} placeholder="NIB/xxxxxxxxxx" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
                ⚠️ Dokumen izin akan diverifikasi oleh tim Agro Jabar. Proses verifikasi memakan waktu 3-5 hari kerja.
              </div>
            </div>
          )}

          {/* Step 4: Konfirmasi */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl flex items-center gap-2"><Check size={20} className="text-emerald-600" /> Konfirmasi Pendaftaran</h2>
              <div className="bg-emerald-50 rounded-xl p-5 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-xs text-gray-500">Nama Toko</p><p className="font-semibold">{form.namaToko || '-'}</p></div>
                  <div><p className="text-xs text-gray-500">Kabupaten</p><p className="font-semibold">{form.kabupaten || '-'}</p></div>
                  <div><p className="text-xs text-gray-500">Wilayah</p><p className="font-semibold">{wilayah}</p></div>
                  <div><p className="text-xs text-gray-500">Pemilik</p><p className="font-semibold">{form.namaPemilik || '-'}</p></div>
                  <div><p className="text-xs text-gray-500">No. HP</p><p className="font-semibold">{form.noHp || '-'}</p></div>
                  <div><p className="text-xs text-gray-500">Email</p><p className="font-semibold">{form.email || '-'}</p></div>
                </div>
                {form.nomorSIUP && <p className="text-xs text-emerald-700">✅ SIUP: {form.nomorSIUP}</p>}
                {form.nomorPIRT && <p className="text-xs text-emerald-700">✅ PIRT: {form.nomorPIRT}</p>}
                {form.nomorNIB && <p className="text-xs text-emerald-700">✅ NIB: {form.nomorNIB}</p>}
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
                Dengan mendaftar, Anda menyetujui syarat dan ketentuan Agro Market. Pendaftaran akan diverifikasi oleh admin sebelum toko Anda aktif.
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">
                <ChevronLeft size={16} /> Kembali
              </button>
            ) : <div />}
            {step < 4 ? (
              <button onClick={() => setStep(step + 1)} className="flex items-center gap-1 px-6 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all shadow-lg">
                Lanjut <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={() => alert('Pendaftaran toko berhasil dikirim! Tim kami akan memverifikasi dalam 3-5 hari kerja.')} className="flex items-center gap-1 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg">
                <Check size={16} /> Kirim Pendaftaran
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBukaTokoPage;
