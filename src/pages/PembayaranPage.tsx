// =====================================================
// PEMBAYARAN PAGE — Menunggu Pembayaran (Mockup)
// Payment Gateway waiting screen
// =====================================================

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, Copy, CheckCircle2, Shield, ArrowLeft, ShoppingBag } from 'lucide-react';
import { formatRupiah } from '../data/dummy';

const PembayaranPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as any;

  const total = state?.total || 0;
  const metode = state?.metode || { label: 'Transfer Bank', icon: '🏦' };
  const orderId = state?.orderId || 'ORD00000001';

  const [isPaid, setIsPaid] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mockup VA number
  const vaNumber = '8806 1234 5678 9012';

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Jika sudah dibayar, tampilkan halaman sukses
  if (isPaid) {
    return (
      <div className="animate-fade-in min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-emerald-50 to-white">
        {/* Success Animation Circle */}
        <div className="relative mb-6">
          <div className="w-28 h-28 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
              <CheckCircle2 size={48} className="text-white" />
            </div>
          </div>
          {/* Decorative dots */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-300 rounded-full animate-bounce" />
          <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-emerald-200 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="absolute top-1/2 -right-4 w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>

        <h1 className="font-display font-bold text-2xl text-gray-900 mb-1">Pembayaran Berhasil! 🎉</h1>
        <p className="text-sm text-gray-500 text-center mb-2">Pesanan kamu sedang diproses oleh penjual</p>

        {/* Order Summary Card */}
        <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-sm p-5 my-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">ID Pesanan</span>
            <span className="text-sm font-mono font-bold text-gray-700">{orderId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Metode Bayar</span>
            <span className="text-sm font-medium text-gray-700">{metode.icon} {metode.label}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-400">Total Dibayar</span>
            <span className="font-display font-bold text-lg text-emerald-600">{formatRupiah(total)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-3">
          <button
            onClick={() => navigate('/profil/pesanan')}
            className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary-200"
          >
            <ShoppingBag size={18} /> Lihat Pesanan Saya
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-semibold text-sm transition-all"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-40">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="font-display font-bold text-lg">Menunggu Pembayaran</h1>
        </div>
      </div>

      <div className="px-4 py-6 max-w-md mx-auto space-y-4">
        {/* Timer Banner */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-4 shadow-lg shadow-amber-200">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={18} />
            <span className="font-bold text-sm">Selesaikan pembayaran dalam</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
              <span className="font-display font-bold text-2xl">23</span>
              <span className="text-xs ml-1">Jam</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
              <span className="font-display font-bold text-2xl">59</span>
              <span className="text-xs ml-1">Menit</span>
            </div>
            <span className="text-xl font-bold">:</span>
            <div className="bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
              <span className="font-display font-bold text-2xl">59</span>
              <span className="text-xs ml-1">Detik</span>
            </div>
          </div>
        </div>

        {/* Payment Method & Amount */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Metode */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-xs text-gray-400 mb-1">Metode Pembayaran</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{metode.icon}</span>
              <span className="font-bold text-gray-800">{metode.label}</span>
            </div>
          </div>

          {/* VA Number / Payment Code */}
          <div className="p-4 bg-primary-50/50">
            <p className="text-xs text-gray-400 mb-2">Nomor Virtual Account</p>
            <div className="flex items-center justify-between bg-white rounded-xl p-3 border border-primary-200">
              <span className="font-mono font-bold text-lg text-gray-900 tracking-wider">{vaNumber}</span>
              <button
                onClick={handleCopy}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  copied
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                }`}
              >
                {copied ? <><CheckCircle2 size={12} /> Tersalin</> : <><Copy size={12} /> Salin</>}
              </button>
            </div>
          </div>

          {/* Amount */}
          <div className="p-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-1">Total Pembayaran</p>
            <p className="font-display font-bold text-2xl text-primary-700">{formatRupiah(total)}</p>
            <p className="text-[10px] text-gray-400 mt-1">
              Transfer sesuai jumlah di atas agar pembayaran terverifikasi otomatis
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <h3 className="font-semibold text-sm text-gray-800 mb-3">Cara Pembayaran</h3>
          <div className="space-y-3">
            {[
              'Buka aplikasi Mobile Banking / ATM bank Anda',
              'Pilih menu Transfer ke Virtual Account',
              `Masukkan nomor VA: ${vaNumber}`,
              `Pastikan nominal ${formatRupiah(total)} sudah sesuai`,
              'Konfirmasi dan selesaikan pembayaran',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary-700">{i + 1}</span>
                </div>
                <p className="text-sm text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 py-2">
          <Shield size={14} className="text-gray-400" />
          <span className="text-[10px] text-gray-400">Transaksi dilindungi enkripsi SSL 256-bit</span>
        </div>

        {/* Mockup: Berhasil Dibayar Button */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-dashed border-emerald-300 rounded-2xl p-4 text-center">
          <p className="text-xs text-emerald-700 font-semibold mb-2">🧪 Tombol Mockup (Demo Only)</p>
          <button
            onClick={() => setIsPaid(true)}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={18} /> Simulasi: Berhasil Dibayar
          </button>
        </div>

        {/* Order ID */}
        <div className="text-center pb-6">
          <p className="text-xs text-gray-400">ID Pesanan: <span className="font-mono font-bold">{orderId}</span></p>
        </div>
      </div>
    </div>
  );
};

export default PembayaranPage;
