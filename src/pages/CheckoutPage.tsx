// =====================================================
// CHECKOUT PAGE — Payment Gateway Style
// Paket items show expandable dropdown
// =====================================================

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Truck, Check, ChevronRight, ChevronDown, Shield } from 'lucide-react';
import { dummyCart, dummyUser, formatRupiah } from '../data/dummy';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedAlamat, setSelectedAlamat] = useState(0);
  const [selectedBayar, setSelectedBayar] = useState('bca');
  const [jadwalKirim, setJadwalKirim] = useState('pagi');
  const [expandedPaket, setExpandedPaket] = useState<string[]>([]);

  // Check if direct buy from DetailProdukPage or DetailPaketPage
  const directBuy = (location.state as any)?.directBuy;

  const checkoutItems = directBuy
    ? [{
        produkId: directBuy.product.id,
        produkNama: directBuy.product.nama,
        gambar: directBuy.product.gambar,
        harga: directBuy.product.harga,
        jumlah: directBuy.quantity,
        satuan: directBuy.product.satuan,
        storeId: directBuy.product.storeId,
        storeName: directBuy.product.storeName,
        isPaket: directBuy.product.isPaket || false,
        paketNama: directBuy.product.paketNama,
        paketItems: directBuy.product.paketItems,
      }]
    : dummyCart;

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.harga * item.jumlah, 0);
  const ongkir = 10000;
  const biayaLayanan = 1000;
  const total = subtotal + ongkir + biayaLayanan;

  const togglePaketExpand = (id: string) => {
    setExpandedPaket(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  // Metode pembayaran
  const metodeBayar = [
    { id: 'bca', label: 'BCA Virtual Account', icon: '🏦', sublabel: 'Transfer Bank' },
    { id: 'bri', label: 'BRI Virtual Account', icon: '🏛️', sublabel: 'Transfer Bank' },
    { id: 'mandiri', label: 'Mandiri Virtual Account', icon: '🏢', sublabel: 'Transfer Bank' },
    { id: 'gopay', label: 'GoPay', icon: '💚', sublabel: 'E-Wallet' },
    { id: 'ovo', label: 'OVO', icon: '💜', sublabel: 'E-Wallet' },
    { id: 'dana', label: 'DANA', icon: '💙', sublabel: 'E-Wallet' },
  ];

  const jadwalOptions = [
    { id: 'pagi', label: 'Pagi (06:00 - 10:00)', desc: 'Besok pagi' },
    { id: 'siang', label: 'Siang (10:00 - 14:00)', desc: 'Besok siang' },
    { id: 'sore', label: 'Sore (14:00 - 18:00)', desc: 'Besok sore' },
  ];

  const handleBayar = () => {
    const selectedMetode = metodeBayar.find(m => m.id === selectedBayar);
    navigate('/pembayaran', {
      state: {
        total,
        metode: selectedMetode,
        orderId: `ORD${Date.now().toString().slice(-8)}`,
        items: checkoutItems,
      }
    });
  };

  return (
    <div className="animate-fade-in pb-28">
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 lg:top-16 z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="font-display font-bold text-lg">Checkout</h1>
        </div>
      </div>

      <div className="px-4 lg:px-6 py-4 max-w-2xl mx-auto space-y-4">
        {/* Alamat Pengiriman */}
        <div className="card">
          <h3 className="font-semibold text-sm flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-primary-600" /> Alamat Pengiriman
          </h3>
          <div className="space-y-2">
            {dummyUser.alamat.map((alamat, i) => (
              <button
                key={i}
                onClick={() => setSelectedAlamat(i)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                  selectedAlamat === i
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-800">{alamat}</p>
                    {i === 0 && <span className="inline-block text-[10px] bg-primary-100 text-primary-700 font-semibold px-2 py-0.5 rounded mt-1">Utama</span>}
                  </div>
                  {selectedAlamat === i && (
                    <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Jadwal Kirim */}
        <div className="card">
          <h3 className="font-semibold text-sm flex items-center gap-2 mb-3">
            <Truck size={16} className="text-primary-600" /> Jadwal Pengiriman
          </h3>
          <div className="space-y-2">
            {jadwalOptions.map((j) => (
              <button
                key={j.id}
                onClick={() => setJadwalKirim(j.id)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                  jadwalKirim === j.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{j.label}</p>
                    <p className="text-xs text-gray-400">{j.desc}</p>
                  </div>
                  {jadwalKirim === j.id && (
                    <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Metode Pembayaran */}
        <div className="card">
          <h3 className="font-semibold text-sm flex items-center gap-2 mb-1">
            <CreditCard size={16} className="text-primary-600" /> Metode Pembayaran
          </h3>
          <p className="text-[10px] text-gray-400 mb-3 flex items-center gap-1">
            <Shield size={10} /> Transaksi dijamin aman melalui Payment Gateway terenkripsi
          </p>

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Transfer Bank (Virtual Account)</p>
          <div className="space-y-2 mb-4">
            {metodeBayar.filter(m => m.sublabel === 'Transfer Bank').map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedBayar(m.id)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  selectedBayar === m.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-200'
                }`}
              >
                <span className="text-xl w-8 text-center">{m.icon}</span>
                <span className="text-sm font-medium text-gray-800 flex-1">{m.label}</span>
                {selectedBayar === m.id && (
                  <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">E-Wallet</p>
          <div className="space-y-2">
            {metodeBayar.filter(m => m.sublabel === 'E-Wallet').map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedBayar(m.id)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  selectedBayar === m.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-200'
                }`}
              >
                <span className="text-xl w-8 text-center">{m.icon}</span>
                <span className="text-sm font-medium text-gray-800 flex-1">{m.label}</span>
                {selectedBayar === m.id && (
                  <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Ringkasan Pesanan — with Paket expandable dropdown */}
        <div className="card">
          <h3 className="font-semibold text-sm mb-3">📋 Ringkasan Pesanan</h3>
          {checkoutItems.map((item) => (
            <div key={item.produkId} className="border-b border-gray-50 last:border-0">
              <div
                className={`flex items-center gap-3 py-2.5 ${item.isPaket ? 'cursor-pointer' : ''}`}
                onClick={() => item.isPaket && togglePaketExpand(item.produkId)}
              >
                <div className="w-11 h-11 bg-gray-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {item.gambar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {item.isPaket && (
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded flex-shrink-0">📦 PAKET</span>
                    )}
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.produkNama}</p>
                  </div>
                  <p className="text-xs text-gray-400">x{item.jumlah}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-sm">{formatRupiah(item.harga * item.jumlah)}</span>
                  {item.isPaket && (
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform duration-200 ${
                        expandedPaket.includes(item.produkId) ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>
              </div>

              {/* Expanded paket contents */}
              {item.isPaket && item.paketItems && expandedPaket.includes(item.produkId) && (
                <div className="ml-14 mb-3 bg-amber-50/50 rounded-xl border border-amber-100 p-3 animate-fade-in">
                  <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-2">Isi Paket</p>
                  <div className="space-y-1.5">
                    {item.paketItems.map((pi: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-sm">{pi.gambar}</span>
                        <span className="text-xs text-gray-700 flex-1">{pi.nama}</span>
                        <span className="text-[10px] text-gray-400">{pi.jumlah}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Ongkos Kirim</span>
              <span>{formatRupiah(ongkir)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Biaya Layanan</span>
              <span>{formatRupiah(biayaLayanan)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-100">
              <span className="font-bold">Total Bayar</span>
              <span className="font-display font-bold text-xl text-primary-700">{formatRupiah(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400">Total Pembayaran</p>
            <p className="font-display font-bold text-lg text-primary-700">{formatRupiah(total)}</p>
          </div>
          <button
            onClick={handleBayar}
            className="btn-primary py-3 px-8 text-sm font-bold flex items-center gap-2 shadow-lg"
          >
            Bayar Sekarang <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
