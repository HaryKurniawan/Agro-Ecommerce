import React from 'react';
import { Store, MapPin, Phone, Mail, FileText, Star, Package, ShoppingBag } from 'lucide-react';
import { dummyTokoSaya, formatRupiah } from '../../data/sellerDummy';

const ProfilTokoPage: React.FC = () => {
  const t = dummyTokoSaya;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2"><Store size={24} className="text-emerald-600" /> Profil Toko</h1>
        <p className="text-sm text-gray-500">Kelola informasi toko Anda</p>
      </div>

      {/* Toko Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{t.foto}</span>
          <div>
            <h2 className="font-display font-bold text-2xl">{t.nama}</h2>
            <div className="flex items-center gap-2 text-emerald-100 text-sm mt-1">
              <MapPin size={14} /> {t.kabupaten} • {t.wilayah}
            </div>
          </div>
          <span className={`ml-auto px-3 py-1 rounded-lg text-sm font-semibold ${t.status === 'aktif' ? 'bg-white/20' : 'bg-red-500/50'}`}>{t.status}</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/15 rounded-xl p-3 text-center">
            <Package size={20} className="mx-auto mb-1" />
            <p className="text-xl font-bold">{t.totalProduk}</p>
            <p className="text-xs text-emerald-200">Produk</p>
          </div>
          <div className="bg-white/15 rounded-xl p-3 text-center">
            <ShoppingBag size={20} className="mx-auto mb-1" />
            <p className="text-xl font-bold">{t.totalPesanan}</p>
            <p className="text-xs text-emerald-200">Pesanan</p>
          </div>
          <div className="bg-white/15 rounded-xl p-3 text-center">
            <Star size={20} className="mx-auto mb-1" />
            <p className="text-xl font-bold">{t.rating}</p>
            <p className="text-xs text-emerald-200">Rating</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Info Toko */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Informasi Toko</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Nama Toko</label>
              <input type="text" defaultValue={t.nama} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Deskripsi</label>
              <textarea defaultValue={t.deskripsi} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm min-h-[80px]" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Alamat</label>
              <input type="text" defaultValue={t.alamat} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" />
            </div>
            <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all">Simpan Perubahan</button>
          </div>
        </div>

        {/* Kontak & Izin */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Phone size={18} className="text-emerald-600" />
                <div><p className="text-xs text-gray-500">No. Telepon</p><p className="font-medium text-sm">{t.noHp}</p></div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Mail size={18} className="text-emerald-600" />
                <div><p className="text-xs text-gray-500">Email</p><p className="font-medium text-sm">{t.email}</p></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Izin Usaha</h3>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <FileText size={18} className="text-emerald-600" />
              <div><p className="text-xs text-gray-500">SIUP</p><p className="font-mono font-medium text-sm">{t.nomorSIUP}</p></div>
              <span className="ml-auto px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded">Aktif</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Total Pendapatan</h3>
            <p className="text-3xl font-display font-bold text-emerald-700">{formatRupiah(t.totalPendapatan)}</p>
            <p className="text-xs text-gray-500 mt-1">Kumulatif sejak terdaftar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilTokoPage;
