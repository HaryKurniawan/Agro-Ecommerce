// =====================================================
// BARANG MASUK DARI PROCESSING - Seller Portal
// =====================================================

import React, { useState } from 'react';
import { Package, Search, CheckCircle2, Phone, Mail, Clock, Truck, Factory, ShoppingBag, X, Tag, AlertTriangle } from 'lucide-react';
import { dummyBarangMasukProcessing, formatTanggal, formatRupiah } from '../../data/adminDummy';

const statusConfig: Record<string, { label: string; className: string }> = {
  baru: { label: 'Baru Masuk', className: 'bg-blue-100 text-blue-700' },
  dikonfirmasi: { label: 'Dikonfirmasi', className: 'bg-amber-100 text-amber-700' },
  diterima: { label: 'Diterima', className: 'bg-emerald-100 text-emerald-700' },
};

const BarangMasukProcessingPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [showSuccess, setShowSuccess] = useState('');
  const [showListingModal, setShowListingModal] = useState(false);
  const [listingItem, setListingItem] = useState<typeof dummyBarangMasukProcessing[0] | null>(null);
  const [listingHarga, setListingHarga] = useState(0);
  const [listedIds, setListedIds] = useState<string[]>([]);
  
  const [showTerimaModal, setShowTerimaModal] = useState(false);
  const [terimaItem, setTerimaItem] = useState<typeof dummyBarangMasukProcessing[0] | null>(null);
  const [inputBeratAktual, setInputBeratAktual] = useState('');
  const [showError, setShowError] = useState('');

  const filtered = dummyBarangMasukProcessing.filter(item => {
    const matchSearch = item.komoditasNama.toLowerCase().includes(search.toLowerCase()) ||
      item.daerahAsal.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'semua' || item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const baruCount = dummyBarangMasukProcessing.filter(b => b.status === 'baru').length;
  const konfirmasiCount = dummyBarangMasukProcessing.filter(b => b.status === 'dikonfirmasi').length;
  const diterimaCount = dummyBarangMasukProcessing.filter(b => b.status === 'diterima').length;

  const handleKonfirmasi = (id: string) => {
    setShowSuccess(`Barang ${id} berhasil dikonfirmasi!`);
    setTimeout(() => setShowSuccess(''), 3000);
  };

  const openTerimaModal = (item: typeof dummyBarangMasukProcessing[0]) => {
    setTerimaItem(item);
    setInputBeratAktual('');
    setShowError('');
    setShowTerimaModal(true);
  };

  const handleValidasiTerima = () => {
    if (!terimaItem) return;
    
    const beratInput = parseFloat(inputBeratAktual);
    if (beratInput !== terimaItem.totalBeratKg) {
      setShowError('B.A.S.T Ditolak! Terdapat selisih berat antara manifes gudang dan fisik dari supir. Harap tahan supir dan segera hubungi pusat Agro Jabar.');
      return;
    }

    setShowSuccess(`Barang ${terimaItem.komoditasNama} berhasil diverifikasi & diterima stok toko!`);
    setShowTerimaModal(false);
    setTimeout(() => setShowSuccess(''), 3000);
  };

  const handleOpenListing = (item: typeof dummyBarangMasukProcessing[0]) => {
    setListingItem(item);
    // Auto-suggest harga berdasarkan komoditas
    const hargaMap: Record<string, number> = { 'Kubis': 6500, 'Cabai Merah': 45000, 'Wortel': 10000, 'Kentang': 15000, 'Tomat': 12000 };
    setListingHarga(hargaMap[item.komoditasNama] || 10000);
    setShowListingModal(true);
  };

  const handleSubmitListing = () => {
    if (listingItem) {
      setListedIds(prev => [...prev, listingItem.id]);
    }
    setShowListingModal(false);
    setShowSuccess('Produk berhasil di-listing ke toko! 🎉');
    setTimeout(() => setShowSuccess(''), 3000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2">
          <Factory size={24} className="text-cyan-600" /> Barang Masuk dari Processing
        </h1>
        <p className="text-sm text-gray-500">Barang dari unit processing yang siap diterima ke stok toko Anda</p>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle2 size={20} />
          <span className="font-medium">{showSuccess}</span>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <Package size={24} className="text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-display font-bold text-blue-600">{baruCount}</p>
          <p className="text-xs text-gray-500">Baru Masuk</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <Clock size={24} className="text-amber-500 mx-auto mb-2" />
          <p className="text-2xl font-display font-bold text-amber-600">{konfirmasiCount}</p>
          <p className="text-xs text-gray-500">Dikonfirmasi</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <CheckCircle2 size={24} className="text-emerald-500 mx-auto mb-2" />
          <p className="text-2xl font-display font-bold text-emerald-600">{diterimaCount}</p>
          <p className="text-xs text-gray-500">Diterima</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari komoditas atau daerah..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            {['semua', 'baru', 'dikonfirmasi', 'diterima'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  filterStatus === s ? 'bg-cyan-600 text-white shadow-md' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {s === 'semua' ? 'Semua' : statusConfig[s]?.label || s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const cfg = statusConfig[item.status];

          return (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <p className="font-bold text-gray-900">{item.komoditasNama}</p>
                    <p className="text-xs text-gray-500">
                      {item.unitProsesNama} • {item.daerahAsal}
                    </p>
                  </div>
                </div>
                {cfg && (
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.className}`}>
                    {cfg.label}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                  <p className="text-[10px] text-gray-500">Pack</p>
                  <p className="font-bold">{item.jumlahPack.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                  <p className="text-[10px] text-gray-500">Per Pack</p>
                  <p className="font-bold">{item.beratPerPack} kg</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                  <p className="text-[10px] text-gray-500">Total</p>
                  <p className="font-bold">{item.totalBeratKg.toLocaleString()} kg</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                  <p className="text-[10px] text-gray-500">Grade</p>
                  <p className="font-bold">{item.grade}</p>
                </div>
              </div>

              {/* Barcode & Date */}
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                <span>📊 {item.kodeBarcode}</span>
                <span>📅 Distribusi: {formatTanggal(item.tanggalDistribusi)}</span>
                {item.tanggalKonfirmasi && <span>✅ {formatTanggal(item.tanggalKonfirmasi)}</span>}
                {item.tanggalDiterima && <span>📦 {formatTanggal(item.tanggalDiterima)}</span>}
              </div>

              {/* Kontak Processing */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Hubungi Unit Processing</p>
                <div className="flex gap-2">
                  <a
                    href={`tel:${item.kontakProses}`}
                    className="flex items-center gap-1.5 bg-cyan-50 px-3 py-2 rounded-xl text-xs text-cyan-700 hover:bg-cyan-100 transition-colors border border-cyan-200 font-medium"
                  >
                    <Phone size={12} /> {item.kontakProses}
                  </a>
                  <a
                    href={`mailto:${item.emailProses}`}
                    className="flex items-center gap-1.5 bg-blue-50 px-3 py-2 rounded-xl text-xs text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200 font-medium"
                  >
                    <Mail size={12} /> {item.emailProses}
                  </a>
                </div>
              </div>

              {/* Catatan */}
              {item.catatan && (
                <div className="mt-3 bg-amber-50 rounded-xl p-3 text-xs text-amber-700 border border-amber-100">
                  💬 {item.catatan}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                {item.status === 'baru' && (
                  <button
                    onClick={() => handleKonfirmasi(item.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-amber-500 text-white rounded-xl text-sm font-semibold hover:bg-amber-600 transition-colors shadow-sm"
                  >
                    <Clock size={14} /> Konfirmasi Barang
                  </button>
                )}
                {item.status === 'dikonfirmasi' && (
                  <button
                    onClick={() => openTerimaModal(item)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <CheckCircle2 size={14} /> Terima & Verifikasi Fisik
                  </button>
                )}
                {item.status === 'diterima' && !listedIds.includes(item.id) && (
                  <button
                    onClick={() => handleOpenListing(item)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors shadow-sm"
                  >
                    <ShoppingBag size={14} /> Listing ke Toko
                  </button>
                )}
                {item.status === 'diterima' && listedIds.includes(item.id) && (
                  <div className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-violet-50 text-violet-700 rounded-xl text-sm font-semibold border border-violet-200">
                    <Tag size={14} /> Sudah di-Listing
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Truck size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Belum ada barang masuk dari processing</p>
        </div>
      )}

      {/* Modal Listing Produk */}
      {showListingModal && listingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowListingModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-display font-bold text-gray-900">Listing Produk ke Toko</h2>
                <p className="text-xs text-gray-500">Data otomatis terisi dari processing</p>
              </div>
              <button onClick={() => setShowListingModal(false)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400">
                <X size={18} />
              </button>
            </div>

            {/* Auto-filled info */}
            <div className="p-6 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{listingItem.emoji}</span>
                <div>
                  <p className="font-bold text-gray-900">{listingItem.komoditasNama}</p>
                  <p className="text-xs text-gray-500">Dari: {listingItem.unitProsesNama}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white rounded-xl p-2 text-center">
                  <p className="text-[10px] text-gray-500">Stok</p>
                  <p className="font-bold text-sm">{listingItem.jumlahPack.toLocaleString()} pack</p>
                </div>
                <div className="bg-white rounded-xl p-2 text-center">
                  <p className="text-[10px] text-gray-500">Per Pack</p>
                  <p className="font-bold text-sm">{listingItem.beratPerPack} kg</p>
                </div>
                <div className="bg-white rounded-xl p-2 text-center">
                  <p className="text-[10px] text-gray-500">Grade</p>
                  <p className="font-bold text-sm">{listingItem.grade}</p>
                </div>
              </div>
            </div>

            {/* Form Listing */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Produk</label>
                <input
                  type="text"
                  defaultValue={`${listingItem.komoditasNama} Segar Grade ${listingItem.grade}`}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Harga per {listingItem.beratPerPack} kg</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">Rp</span>
                  <input
                    type="number"
                    value={listingHarga}
                    onChange={(e) => setListingHarga(Number(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Estimasi total: {formatRupiah(listingHarga * listingItem.jumlahPack)}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Barcode</label>
                <input
                  type="text"
                  defaultValue={listingItem.kodeBarcode}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-500" readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 outline-none bg-white">
                  <option>Sayuran</option>
                  <option>Umbi</option>
                  <option>Buah</option>
                  <option>Rempah</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowListingModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSubmitListing}
                className="flex-1 py-3 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag size={14} /> Listing Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Terima Barang (Blind Check) */}
      {showTerimaModal && terimaItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowTerimaModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-display font-bold text-gray-900">Validasi Penerimaan (B.A.S.T)</h2>
                <p className="text-xs text-amber-600 font-medium flex items-center gap-1 mt-1">
                  <AlertTriangle size={12} /> Mode Blind Check Aktif
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                <Package className="text-blue-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold text-blue-900 text-sm">Masuk Dari: {terimaItem.unitProsesNama}</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Timbang fisik seluruh barang yang diturunkan oleh supir. Masukkan total berat aktual untuk <b>{terimaItem.komoditasNama}</b> ke dalam sistem. Pencocokan ke surat jalan akan dilakukan secara buta (Blind Check).
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Input Berat Timbangan Fisik Anda (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputBeratAktual}
                  onChange={(e) => {
                    setInputBeratAktual(e.target.value);
                    setShowError('');
                  }}
                  placeholder="Contoh: 50.5"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg font-bold text-center focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {showError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2 animate-fade-in">
                  <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={16} />
                  <p className="text-xs font-semibold text-red-700">{showError}</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowTerimaModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                Tunda
              </button>
              <button
                onClick={handleValidasiTerima}
                disabled={!inputBeratAktual}
                className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <CheckCircle2 size={16} /> Verifikasi & Terima
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarangMasukProcessingPage;
