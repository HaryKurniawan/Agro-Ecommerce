// =====================================================
// ALAMAT PAGE — Manajemen Alamat + OpenStreetMap Picker
// =====================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MapPin, Check, Trash2, Edit3, Navigation, Star } from 'lucide-react';

interface Alamat {
  id: string;
  label: string;
  penerima: string;
  telepon: string;
  detail: string;
  kecamatan: string;
  kota: string;
  kodePos: string;
  lat: number;
  lng: number;
  isUtama: boolean;
}

const AlamatPage: React.FC = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Dummy saved addresses
  const [daftarAlamat, setDaftarAlamat] = useState<Alamat[]>([
    {
      id: 'ALM001', label: 'Rumah', penerima: 'Rina Kusuma', telepon: '081234567890',
      detail: 'Jl. Merdeka No. 10, Kel. Braga', kecamatan: 'Sumur Bandung',
      kota: 'Kota Bandung', kodePos: '40111', lat: -6.9175, lng: 107.6191, isUtama: true,
    },
    {
      id: 'ALM002', label: 'Kantor', penerima: 'Rina Kusuma', telepon: '081234567890',
      detail: 'Jl. Asia Afrika No. 5, Gedung B Lt.3', kecamatan: 'Regol',
      kota: 'Kota Bandung', kodePos: '40253', lat: -6.9219, lng: 107.6085, isUtama: false,
    },
  ]);

  // New address form
  const [form, setForm] = useState({
    label: '', penerima: '', telepon: '', detail: '', kecamatan: '', kota: '', kodePos: '',
  });
  const [mapCenter, setMapCenter] = useState({ lat: -6.9175, lng: 107.6191 });

  const handleSave = () => {
    const newAlamat: Alamat = {
      id: `ALM${Date.now()}`,
      ...form,
      lat: mapCenter.lat,
      lng: mapCenter.lng,
      isUtama: daftarAlamat.length === 0, // auto utama if first
    };
    // New address becomes utama, others become non-utama
    setDaftarAlamat([
      { ...newAlamat, isUtama: true },
      ...daftarAlamat.map(a => ({ ...a, isUtama: false })),
    ]);
    setShowForm(false);
    setShowMap(false);
    setForm({ label: '', penerima: '', telepon: '', detail: '', kecamatan: '', kota: '', kodePos: '' });
  };

  const setUtama = (id: string) => {
    setDaftarAlamat(daftarAlamat.map(a => ({ ...a, isUtama: a.id === id })));
  };

  const hapus = (id: string) => {
    const updated = daftarAlamat.filter(a => a.id !== id);
    if (updated.length > 0 && !updated.some(a => a.isUtama)) {
      updated[0].isUtama = true;
    }
    setDaftarAlamat(updated);
  };

  return (
    <div className="animate-fade-in min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 lg:top-16 z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="font-display font-bold text-lg flex-1">Alamat Saya</h1>
          <button
            onClick={() => { setShowForm(true); setShowMap(false); }}
            className="flex items-center gap-1.5 px-3 py-2 bg-primary-600 text-white rounded-xl text-xs font-semibold hover:bg-primary-700 transition-all"
          >
            <Plus size={14} /> Tambah
          </button>
        </div>
      </div>

      <div className="px-4 py-4 max-w-lg mx-auto space-y-3">
        {/* Address List */}
        {daftarAlamat.map((alamat) => (
          <div
            key={alamat.id}
            className={`bg-white rounded-2xl border-2 p-4 transition-all ${
              alamat.isUtama ? 'border-primary-500 shadow-sm' : 'border-gray-100'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-lg">{alamat.label}</span>
                {alamat.isUtama && (
                  <span className="text-[10px] font-bold text-primary-700 bg-primary-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> Utama
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {!alamat.isUtama && (
                  <button
                    onClick={() => setUtama(alamat.id)}
                    className="text-[10px] text-primary-600 font-semibold px-2 py-1 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    Jadikan Utama
                  </button>
                )}
                <button onClick={() => hapus(alamat.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={14} className="text-red-400" />
                </button>
              </div>
            </div>
            <p className="font-semibold text-sm text-gray-800">{alamat.penerima}</p>
            <p className="text-xs text-gray-500">{alamat.telepon}</p>
            <p className="text-sm text-gray-700 mt-1">{alamat.detail}</p>
            <p className="text-xs text-gray-400 mt-0.5">{alamat.kecamatan}, {alamat.kota} {alamat.kodePos}</p>

            {/* Mini Map Preview */}
            <div className="mt-3 rounded-xl overflow-hidden border border-gray-100 h-24">
              <iframe
                title={`map-${alamat.id}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${alamat.lng - 0.005}%2C${alamat.lat - 0.003}%2C${alamat.lng + 0.005}%2C${alamat.lat + 0.003}&layer=mapnik&marker=${alamat.lat}%2C${alamat.lng}`}
              />
            </div>
          </div>
        ))}

        {daftarAlamat.length === 0 && !showForm && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin size={28} className="text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">Belum ada alamat tersimpan</p>
            <p className="text-xs text-gray-400 mt-1">Tambahkan alamat untuk mempermudah checkout</p>
          </div>
        )}
      </div>

      {/* ============ ADD ADDRESS FORM (FULL SCREEN OVERLAY) ============ */}
      {showForm && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
          {/* Form Header */}
          <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <button onClick={() => { setShowForm(false); setShowMap(false); }} className="p-2 hover:bg-gray-50 rounded-xl">
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h2 className="font-display font-bold text-lg">Tambah Alamat Baru</h2>
            </div>
          </div>

          <div className="px-4 py-4 max-w-lg mx-auto space-y-4 pb-32">
            {/* Map Picker */}
            <div className="card">
              <h3 className="font-semibold text-sm flex items-center gap-2 mb-3">
                <Navigation size={14} className="text-primary-600" /> Pilih Lokasi di Peta
              </h3>
              {!showMap ? (
                <button
                  onClick={() => setShowMap(true)}
                  className="w-full py-8 border-2 border-dashed border-primary-300 rounded-2xl bg-primary-50/50 flex flex-col items-center gap-2 hover:bg-primary-50 transition-colors"
                >
                  <MapPin size={28} className="text-primary-500" />
                  <span className="text-sm font-semibold text-primary-700">Buka Peta & Pin Lokasi</span>
                  <span className="text-[10px] text-gray-400">Powered by OpenStreetMap</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="rounded-2xl overflow-hidden border border-gray-200 h-56 relative">
                    <iframe
                      title="map-picker"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng - 0.01}%2C${mapCenter.lat - 0.006}%2C${mapCenter.lng + 0.01}%2C${mapCenter.lat + 0.006}&layer=mapnik&marker=${mapCenter.lat}%2C${mapCenter.lng}`}
                    />
                    {/* Pin overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-3 h-3 bg-primary-600 rounded-full border-2 border-white shadow-lg" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMapCenter({ lat: mapCenter.lat + 0.001, lng: mapCenter.lng })}
                      className="flex-1 text-xs py-2 bg-gray-100 rounded-lg font-medium text-gray-600 hover:bg-gray-200"
                    >
                      ↑ Utara
                    </button>
                    <button
                      onClick={() => setMapCenter({ lat: mapCenter.lat - 0.001, lng: mapCenter.lng })}
                      className="flex-1 text-xs py-2 bg-gray-100 rounded-lg font-medium text-gray-600 hover:bg-gray-200"
                    >
                      ↓ Selatan
                    </button>
                    <button
                      onClick={() => setMapCenter({ lat: mapCenter.lat, lng: mapCenter.lng - 0.001 })}
                      className="flex-1 text-xs py-2 bg-gray-100 rounded-lg font-medium text-gray-600 hover:bg-gray-200"
                    >
                      ← Barat
                    </button>
                    <button
                      onClick={() => setMapCenter({ lat: mapCenter.lat, lng: mapCenter.lng + 0.001 })}
                      className="flex-1 text-xs py-2 bg-gray-100 rounded-lg font-medium text-gray-600 hover:bg-gray-200"
                    >
                      → Timur
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center">
                    📍 Koordinat: {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)}
                  </p>
                </div>
              )}
            </div>

            {/* Label */}
            <div className="card space-y-4">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Edit3 size={14} className="text-primary-600" /> Detail Alamat
              </h3>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Label Alamat</label>
                <div className="flex gap-2">
                  {['Rumah', 'Kantor', 'Gudang', 'Lainnya'].map(l => (
                    <button
                      key={l}
                      onClick={() => setForm({ ...form, label: l })}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        form.label === l ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Nama Penerima</label>
                <input
                  type="text"
                  value={form.penerima}
                  onChange={e => setForm({ ...form, penerima: e.target.value })}
                  placeholder="Nama lengkap penerima"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">No. Telepon</label>
                <input
                  type="tel"
                  value={form.telepon}
                  onChange={e => setForm({ ...form, telepon: e.target.value })}
                  placeholder="08xxxxxxxxxx"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Alamat Lengkap</label>
                <textarea
                  value={form.detail}
                  onChange={e => setForm({ ...form, detail: e.target.value })}
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, patokan"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Kecamatan</label>
                  <input
                    type="text"
                    value={form.kecamatan}
                    onChange={e => setForm({ ...form, kecamatan: e.target.value })}
                    placeholder="Kecamatan"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Kota / Kabupaten</label>
                  <input
                    type="text"
                    value={form.kota}
                    onChange={e => setForm({ ...form, kota: e.target.value })}
                    placeholder="Kota"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="w-1/2">
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Kode Pos</label>
                <input
                  type="text"
                  value={form.kodePos}
                  onChange={e => setForm({ ...form, kodePos: e.target.value })}
                  placeholder="40111"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
              <p className="font-semibold mb-0.5">💡 Tip</p>
              <p>Alamat baru akan otomatis tersimpan sebagai <b>Alamat Utama</b> untuk checkout berikutnya.</p>
            </div>
          </div>

          {/* Fixed Save Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-10">
            <div className="max-w-lg mx-auto">
              <button
                onClick={handleSave}
                disabled={!form.penerima || !form.detail || !form.label}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  form.penerima && form.detail && form.label
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-200'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Check size={18} /> Simpan Sebagai Alamat Utama
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlamatPage;
