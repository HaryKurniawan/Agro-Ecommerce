// =====================================================
// FORM BOOKING PAGE — MULTI-STEP BOOKING FORM
// =====================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ChevronLeft, Check, Store, Package, Calendar, Building2, Box } from 'lucide-react';
import { dummyStores, dummyProducts, formatRupiah } from '../data/dummy';

const steps = ['Pilih Toko', 'Komoditas', 'Jadwal', 'Konfirmasi'];

const FormBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedItems, setSelectedItems] = useState<{ nama: string; jumlahKg: number; hargaPerKg: number }[]>([]);
  const [tipePengemasan, setTipePengemasan] = useState<'curah' | 'cuci' | 'premium'>('curah');
  const [formData, setFormData] = useState({
    namaPerusahaan: '',
    kontakNama: '',
    kontakTelepon: '',
    tanggalKirim: '',
    frekuensi: 'sekali' as 'sekali' | 'harian' | 'mingguan' | 'bulanan',
    catatan: '',
  });

  const store = dummyStores.find(s => s.id === selectedStore);
  const storeProducts = dummyProducts.filter(p => p.storeId === selectedStore);
  
  const totalKg = selectedItems.reduce((sum, item) => sum + item.jumlahKg, 0);
  const biayaPengemasanPerKg = tipePengemasan === 'curah' ? 0 : tipePengemasan === 'cuci' ? 500 : 2500;
  const totalBiayaTambahan = totalKg * biayaPengemasanPerKg;
  const totalHargaKomoditas = selectedItems.reduce((sum, item) => sum + item.jumlahKg * item.hargaPerKg, 0);
  const totalHarga = totalHargaKomoditas + totalBiayaTambahan;

  const addItem = (nama: string, hargaPerKg: number) => {
    if (!selectedItems.find(i => i.nama === nama)) {
      setSelectedItems([...selectedItems, { nama, jumlahKg: 10, hargaPerKg }]);
    }
  };

  const updateItemQty = (nama: string, qty: number) => {
    setSelectedItems(selectedItems.map(i => i.nama === nama ? { ...i, jumlahKg: Math.max(1, qty) } : i));
  };

  const removeItem = (nama: string) => {
    setSelectedItems(selectedItems.filter(i => i.nama !== nama));
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 lg:top-16 z-40">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="font-display font-bold text-lg text-gray-900">Form Booking</h1>
        </div>
        {/* Step Indicator */}
        <div className="flex items-center gap-1">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className={`flex items-center gap-1.5 ${i <= currentStep ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i < currentStep ? 'bg-primary-600 text-white' :
                  i === currentStep ? 'bg-primary-100 text-primary-700 border-2 border-primary-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {i < currentStep ? <Check size={12} /> : i + 1}
                </div>
                <span className="text-[10px] font-medium hidden sm:inline">{step}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 rounded ${i < currentStep ? 'bg-primary-500' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="px-4 lg:px-6 py-4 max-w-2xl mx-auto">
        {/* Step 1: Pilih Toko */}
        {currentStep === 0 && (
          <div className="space-y-3 animate-fade-in">
            <h2 className="font-display font-semibold text-base flex items-center gap-2">
              <Store size={18} className="text-primary-600" /> Pilih Toko Agro Daerah
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {dummyStores.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStore(s.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    selectedStore === s.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-primary-200'
                  }`}
                >
                  <span className="text-2xl">{s.foto}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{s.nama}</p>
                    <p className="text-xs text-gray-400">{s.kabupaten} • {s.wilayah}</p>
                  </div>
                  {selectedStore === s.id && (
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Komoditas */}
        {currentStep === 1 && (
          <div className="space-y-3 animate-fade-in">
            <h2 className="font-display font-semibold text-base flex items-center gap-2">
              <Package size={18} className="text-primary-600" /> Pilih Komoditas
            </h2>
            
            {/* Available Products */}
            <div className="space-y-2">
              {storeProducts.map((p) => {
                const isSelected = selectedItems.some(i => i.nama === p.nama);
                return (
                  <div key={p.id} className={`flex items-center gap-3 p-3 rounded-xl border ${isSelected ? 'border-primary-300 bg-primary-50' : 'border-gray-200 bg-white'}`}>
                    <span className="text-2xl">{p.gambar}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{p.nama}</p>
                      <p className="text-xs text-gray-400">{formatRupiah(p.harga * 4)}/kg (est.)</p>
                    </div>
                    {isSelected ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={selectedItems.find(i => i.nama === p.nama)?.jumlahKg || 10}
                          onChange={(e) => updateItemQty(p.nama, parseInt(e.target.value) || 1)}
                          className="w-16 px-2 py-1 border rounded-lg text-sm text-center"
                        />
                        <span className="text-xs text-gray-400">kg</span>
                        <button onClick={() => removeItem(p.nama)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                      </div>
                    ) : (
                      <button onClick={() => addItem(p.nama, p.harga * 4)} className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg text-xs font-medium hover:bg-primary-200">
                        + Tambah
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedItems.length > 0 && (
              <>
                <div className="card mt-2">
                  <h3 className="font-semibold text-sm mb-3 text-gray-800 flex items-center gap-2">
                    <Box size={16} className="text-primary-600"/> Tipe Pemrosesan & Pengemasan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button 
                      onClick={() => setTipePengemasan('curah')}
                      className={`p-3 text-left border rounded-xl transition ${tipePengemasan === 'curah' ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-100' : 'border-gray-200 hover:border-primary-300'}`}
                    >
                      <p className="font-bold text-sm text-gray-800">1. Raw / Curah</p>
                      <p className="text-[10px] text-gray-500 mt-1">Tanpa proses gudang. Dropship langsung dari Lahan. (Rp 0/kg)</p>
                    </button>
                    <button 
                      onClick={() => setTipePengemasan('cuci')}
                      className={`p-3 text-left border rounded-xl transition ${tipePengemasan === 'cuci' ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-100' : 'border-gray-200 hover:border-primary-300'}`}
                    >
                      <p className="font-bold text-sm text-gray-800">2. Cuci Bersih Curah</p>
                      <p className="text-[10px] text-gray-500 mt-1">Dibawa ke Gudang Agro Core untuk dibersihkan dari tanah. (+Rp 500/kg)</p>
                    </button>
                    <button 
                      onClick={() => setTipePengemasan('premium')}
                      className={`p-3 text-left border rounded-xl transition ${tipePengemasan === 'premium' ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-100' : 'border-gray-200 hover:border-primary-300'}`}
                    >
                      <p className="font-bold text-sm text-gray-800">3. Premium Retail Pack</p>
                      <p className="text-[10px] text-gray-500 mt-1">Pembersihan utuh, sortir Grade A, dan divakum label/retail. (+Rp 2.500/kg)</p>
                    </button>
                  </div>
                </div>

                <div className="card bg-primary-50 border-primary-100 mt-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-medium text-primary-800">{selectedItems.length} komoditas ({totalKg} kg)</p>
                      <p className="text-xs text-primary-600">Biaya Kemasan: {formatRupiah(totalBiayaTambahan)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-primary-600 font-bold uppercase">Total Estimasi</p>
                      <p className="text-lg font-bold text-primary-900">{formatRupiah(totalHarga)}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 3: Jadwal & Data */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-display font-semibold text-base flex items-center gap-2">
              <Calendar size={18} className="text-primary-600" /> Jadwal & Data Perusahaan
            </h2>

            <div className="space-y-3">
              <div>
                <label className="label-field">Nama Perusahaan / Usaha</label>
                <input
                  type="text"
                  value={formData.namaPerusahaan}
                  onChange={(e) => setFormData({ ...formData, namaPerusahaan: e.target.value })}
                  className="input-field"
                  placeholder="Contoh: Restoran Sunda Rasa"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-field">Nama Kontak</label>
                  <input
                    type="text"
                    value={formData.kontakNama}
                    onChange={(e) => setFormData({ ...formData, kontakNama: e.target.value })}
                    className="input-field"
                    placeholder="Nama PIC"
                  />
                </div>
                <div>
                  <label className="label-field">No. Telepon</label>
                  <input
                    type="tel"
                    value={formData.kontakTelepon}
                    onChange={(e) => setFormData({ ...formData, kontakTelepon: e.target.value })}
                    className="input-field"
                    placeholder="08xxx"
                  />
                </div>
              </div>
              <div>
                <label className="label-field">Tanggal Kirim Pertama</label>
                <input
                  type="date"
                  value={formData.tanggalKirim}
                  onChange={(e) => setFormData({ ...formData, tanggalKirim: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-field">Frekuensi Pengiriman</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['sekali', 'harian', 'mingguan', 'bulanan'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormData({ ...formData, frekuensi: f })}
                      className={`py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                        formData.frekuensi === f ? 'bg-primary-600 text-white shadow-md' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label-field">Catatan (opsional)</label>
                <textarea
                  value={formData.catatan}
                  onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                  className="input-field"
                  rows={3}
                  placeholder="Catatan khusus..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Konfirmasi */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-display font-semibold text-base flex items-center gap-2">
              <Building2 size={18} className="text-primary-600" /> Konfirmasi Booking
            </h2>

            <div className="card">
              <h3 className="font-semibold text-sm mb-2">📍 Toko</h3>
              <p className="text-sm text-gray-800">{store?.nama} — {store?.kabupaten}</p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-sm mb-2">📦 Komoditas</h3>
              {selectedItems.map((item, i) => (
                <div key={i} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-sm">{item.nama} ({item.jumlahKg} kg)</span>
                  <span className="text-sm font-medium">{formatRupiah(item.jumlahKg * item.hargaPerKg)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
                <span className="font-semibold text-xs text-gray-500">Subtotal Komoditas</span>
                <span className="font-semibold text-xs text-gray-800">{formatRupiah(totalHargaKomoditas)}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-semibold text-xs text-gray-500">
                  Biaya {tipePengemasan === 'curah' ? 'Curah' : tipePengemasan === 'cuci' ? 'Cuci Bersih' : 'Premium Pack'}
                </span>
                <span className="font-semibold text-xs text-gray-800">{formatRupiah(totalBiayaTambahan)}</span>
              </div>
              <div className="flex justify-between pt-2 mt-2 border-t-2 border-black/10">
                <span className="font-bold text-sm">Total Estimasi</span>
                <span className="font-display font-bold text-primary-700">{formatRupiah(totalHarga)}</span>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-sm mb-2">🏢 Data Perusahaan</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>{formData.namaPerusahaan || '-'}</p>
                <p>{formData.kontakNama} • {formData.kontakTelepon}</p>
                <p>Kirim: {formData.tanggalKirim || '-'} • {formData.frekuensi}</p>
                {formData.catatan && <p className="text-xs text-gray-400">Catatan: {formData.catatan}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="btn-secondary flex-1 flex items-center justify-center gap-1"
            >
              <ChevronLeft size={16} /> Kembali
            </button>
          )}
          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={(currentStep === 0 && !selectedStore) || (currentStep === 1 && selectedItems.length === 0)}
              className="btn-primary flex-1 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Lanjut <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => navigate('/booking')}
              className="btn-primary flex-1 flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700"
            >
              <Check size={16} /> Ajukan Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBookingPage;
