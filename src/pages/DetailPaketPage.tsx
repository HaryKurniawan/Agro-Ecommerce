// =====================================================
// DETAIL PAKET PAGE — DETAIL PAKET BAHAN MASAK
// Beli Sekarang → Checkout, Add to Cart → Success Modal
// =====================================================

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Star, ShoppingCart, Store, Minus, Plus, Check, X } from 'lucide-react';
import { dummyPackages, formatRupiah } from '../data/dummy';

const DetailPaketPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Modal states
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [modalMode, setModalMode] = useState<'beli' | 'cart'>('beli');
  const [showCartSuccessModal, setShowCartSuccessModal] = useState(false);

  const pkg = dummyPackages.find(p => p.id === id);
  if (!pkg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-4xl">😕</p>
        <p className="text-gray-500">Paket tidak ditemukan</p>
        <button onClick={() => navigate('/paket')} className="btn-primary">Ke Paket</button>
      </div>
    );
  }

  const buildCartItem = () => ({
    product: {
      id: pkg.id,
      storeId: pkg.storeId,
      storeName: pkg.storeName,
      nama: pkg.nama,
      harga: pkg.harga,
      gambar: pkg.gambar,
      satuan: `${pkg.porsi} porsi`,
      isPaket: true,
      paketNama: pkg.nama,
      paketItems: pkg.items.map(i => ({ nama: i.produkNama, jumlah: i.jumlah, gambar: i.gambar })),
    },
    quantity,
  });

  const openModal = (mode: 'beli' | 'cart') => {
    setModalMode(mode);
    setQuantity(1);
    setShowQuantityModal(true);
  };

  const handleConfirm = () => {
    setShowQuantityModal(false);
    if (modalMode === 'beli') {
      const item = buildCartItem();
      navigate('/checkout', { state: { directBuy: item } });
    } else {
      setShowCartSuccessModal(true);
    }
  };

  return (
    <div className="animate-fade-in relative">
      {/* Header */}
      <div className="bg-white sticky top-0 lg:top-16 z-40 border-b border-gray-100 p-4 flex items-center gap-3 lg:hidden">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="font-display font-semibold text-sm text-gray-800">Detail Paket</h1>
      </div>

      <div className="lg:flex lg:gap-8 lg:px-6 lg:pt-6">
        {/* Image */}
        <div className="lg:w-2/5">
          <div className="bg-gradient-to-br from-primary-50 to-emerald-50 h-56 lg:h-72 lg:rounded-2xl flex flex-col items-center justify-center gap-2">
            <span className="text-7xl">{pkg.gambar}</span>
            <div className="flex -space-x-2 mt-2">
              {pkg.items.map((item, i) => (
                <span key={i} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-md border-2 border-white">
                  {item.gambar}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="lg:flex-1">
          <div className="px-4 lg:px-0 mt-4 lg:mt-0 space-y-4">
            {/* Store */}
            <button
              onClick={() => navigate(`/toko/${pkg.storeId}`)}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-xl border border-primary-100 hover:bg-primary-100 transition-colors"
            >
              <Store size={14} className="text-primary-700" />
              <span className="text-xs font-medium text-primary-700">{pkg.storeName}</span>
            </button>

            {/* Name */}
            <div>
              <h1 className="font-display font-bold text-xl text-gray-900">{pkg.nama}</h1>
              <p className="text-sm text-gray-600 mt-1">{pkg.deskripsi}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-sm text-amber-600 font-medium">
                  <Star size={14} fill="currentColor" /> {pkg.rating}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-400">
                  <Users size={14} /> {pkg.porsi} porsi
                </span>
                <span className="text-sm text-gray-400">{pkg.terjual} terjual</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <p className="font-display font-bold text-2xl text-primary-700">{formatRupiah(pkg.harga)}</p>
              {pkg.hargaAsli && (
                <p className="text-base text-gray-400 line-through">{formatRupiah(pkg.hargaAsli)}</p>
              )}
              {pkg.hargaAsli && (
                <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg">
                  Hemat {formatRupiah(pkg.hargaAsli - pkg.harga)}
                </span>
              )}
            </div>

            {/* Items List */}
            <div className="card">
              <h3 className="font-semibold text-sm text-gray-800 mb-3">📋 Isi Paket ({pkg.items.length} item)</h3>
              <div className="space-y-2.5">
                {pkg.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.gambar}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.produkNama}</p>
                        <p className="text-xs text-gray-400">{item.jumlah}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50 lg:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal('cart')}
            className="p-3 border border-primary-200 rounded-xl text-primary-600 bg-primary-50 hover:bg-primary-100 transition-colors"
          >
            <ShoppingCart size={20} />
          </button>
          <button
            onClick={() => openModal('beli')}
            className="flex-1 btn-primary py-3 px-4 font-semibold text-sm shadow-md flex items-center justify-center gap-2"
          >
            Beli Sekarang
          </button>
        </div>
      </div>

      {/* Desktop Inline Action Box */}
      <div className="hidden lg:block lg:w-1/3 lg:pl-6 mt-6 lg:mt-0">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm sticky top-24">
          <h3 className="font-semibold text-gray-800 mb-3">Pesan Paket</h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Jumlah</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200"
              >
                <Minus size={16} className="text-gray-600" />
              </button>
              <span className="w-8 text-center font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200"
              >
                <Plus size={16} className="text-primary-700" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">Total</span>
            <span className="font-display font-bold text-xl text-primary-700">{formatRupiah(pkg.harga * quantity)}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCartSuccessModal(true)}
              className="flex-1 py-3 border border-primary-600 text-primary-700 rounded-xl font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} /> Keranjang
            </button>
            <button
              onClick={() => {
                const item = buildCartItem();
                navigate('/checkout', { state: { directBuy: item } });
              }}
              className="flex-1 btn-primary py-3 flex items-center justify-center"
            >
              Beli Langsung
            </button>
          </div>
        </div>
      </div>

      {/* ============ SHOPEE-STYLE QUANTITY MODAL (Mobile) ============ */}
      {showQuantityModal && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowQuantityModal(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl animate-slide-up overflow-hidden">
            <button
              onClick={() => setShowQuantityModal(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center z-10"
            >
              <X size={18} className="text-gray-500" />
            </button>

            <div className="p-5 pb-0">
              <div className="flex gap-3 items-start">
                <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 border border-primary-100">
                  {pkg.gambar}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded mb-1">📦 PAKET</span>
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">{pkg.nama}</p>
                  <p className="font-display font-bold text-xl text-primary-700 mt-1">{formatRupiah(pkg.harga)}</p>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100 mt-4" />

            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Jumlah</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${
                      quantity <= 1 ? 'border-gray-200 text-gray-300' : 'border-primary-300 text-primary-600 hover:bg-primary-50'
                    }`}
                    disabled={quantity <= 1}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-10 text-center font-display font-bold text-xl">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-primary-300 text-primary-600 hover:bg-primary-50 transition-all"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 mt-2 border-t border-dashed border-gray-200">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="font-display font-bold text-xl text-primary-700">{formatRupiah(pkg.harga * quantity)}</span>
              </div>

              <button
                onClick={handleConfirm}
                className={`w-full py-3.5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 mt-2 shadow-lg transition-all active:scale-[0.98] ${
                  modalMode === 'beli'
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
              >
                {modalMode === 'beli' ? (
                  <>Beli Sekarang — {formatRupiah(pkg.harga * quantity)}</>
                ) : (
                  <><ShoppingCart size={18} /> Tambah ke Keranjang</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ CART SUCCESS MODAL ============ */}
     {showCartSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCartSuccessModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-[90%] max-w-sm mx-auto p-6 animate-slide-up">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Check size={32} className="text-emerald-600" />
              </div>
            </div>
            <h3 className="font-display font-bold text-lg text-gray-900 text-center">Berhasil Ditambahkan!</h3>
            <p className="text-sm text-gray-500 text-center mt-1 mb-1">Paket sudah masuk ke keranjang belanja kamu</p>

            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3 my-4 border border-gray-100">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border border-gray-100">
                {pkg.gambar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">PAKET</span>
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">{pkg.nama}</p>
                </div>
                <p className="text-xs text-gray-400">x{quantity} • {formatRupiah(pkg.harga * quantity)}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCartSuccessModal(false)}
                className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Lanjut Belanja
              </button>
              <button
                onClick={() => navigate('/keranjang')}
                className="flex-1 py-3 px-4 bg-primary-600 rounded-2xl text-sm font-semibold text-white hover:bg-primary-700 flex items-center justify-center gap-1.5"
              >
                <ShoppingCart size={16} /> Keranjang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPaketPage;
