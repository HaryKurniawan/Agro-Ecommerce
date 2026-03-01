// =====================================================
// DETAIL PRODUK PAGE — HALAMAN DETAIL PRODUK
// Shopee-style quantity modal + cart success modal
// =====================================================

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, ShoppingCart, Store, Heart, Share2, Leaf, Check, X, AlertTriangle, Search } from 'lucide-react';
import { dummyProducts, dummyStores, dummyUser, formatRupiah } from '../data/dummy';

const DetailProdukPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Modal states
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [modalMode, setModalMode] = useState<'beli' | 'cart'>('beli');
  const [showCartSuccessModal, setShowCartSuccessModal] = useState(false);
  const [showOutOfAreaModal, setShowOutOfAreaModal] = useState(false);

  const product = dummyProducts.find(p => p.id === id);
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-4xl">😕</p>
        <p className="text-gray-500">Produk tidak ditemukan</p>
        <button onClick={() => navigate('/katalog')} className="btn-primary">Ke Katalog</button>
      </div>
    );
  }

  // Detect out-of-area store
  const getUserWilayah = () => {
    const alamat = dummyUser.alamat[0] || '';
    if (alamat.includes('Bandung')) return 'Bandung Raya';
    if (alamat.includes('Garut')) return 'Priangan Timur';
    if (alamat.includes('Cirebon')) return 'Ciayumajakuning';
    return 'Bandung Raya';
  };
  const userWilayah = getUserWilayah();
  const productStore = dummyStores.find(s => s.id === product.storeId);
  const isOutOfArea = productStore ? productStore.wilayah !== userWilayah : false;

  const openModal = (mode: 'beli' | 'cart') => {
    setModalMode(mode);
    setQuantity(1);
    setShowQuantityModal(true);
  };

  const handleConfirm = () => {
    setShowQuantityModal(false);
    if (modalMode === 'beli') {
      // Beli Sekarang -> langsung ke checkout
      navigate('/checkout', { state: { directBuy: { product, quantity } } });
    } else {
      // Add to Cart -> tampilkan success modal
      setShowCartSuccessModal(true);
    }
  };

  return (
    <div className="animate-fade-in relative">
      {/* Header */}
      <div className="bg-white sticky top-0 lg:top-16 z-40 border-b border-gray-100 p-4 flex items-center justify-between lg:hidden">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="font-display font-semibold text-sm text-gray-800 line-clamp-1">Detail Produk</h1>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-gray-50 rounded-xl"><Heart size={20} className="text-gray-400" /></button>
          <button className="p-2 hover:bg-gray-50 rounded-xl"><Share2 size={20} className="text-gray-400" /></button>
        </div>
      </div>

      <div className="lg:flex lg:gap-8 lg:px-6 lg:pt-6">
        {/* Product Image */}
        <div className="lg:w-2/5">
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-64 lg:h-80 lg:rounded-2xl flex items-center justify-center">
            <span className="text-8xl">{product.gambar}</span>
            {product.diskonPersen && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-md">
                -{product.diskonPersen}%
              </span>
            )}
            {product.isFlashSale && (
              <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-md animate-pulse">
                ⚡ Flash Sale
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:flex-1">
          <div className="px-4 lg:px-0 mt-4 lg:mt-0 space-y-4">
            {/* Store Badge */}
            <button
              onClick={() => navigate(`/toko/${product.storeId}`)}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-xl border border-primary-100 hover:bg-primary-100 transition-colors"
            >
              <Store size={14} className="text-primary-700" />
              <span className="text-xs font-medium text-primary-700">{product.storeName}</span>
            </button>

            {/* Out-of-area clickable label */}
            {isOutOfArea && (
              <button
                onClick={() => setShowOutOfAreaModal(true)}
                className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors w-full text-left"
              >
                <AlertTriangle size={14} className="text-amber-500" />
                <span className="text-xs font-medium text-amber-700 flex-1">Toko di luar jangkauan — ada biaya tambahan</span>
                <span className="text-[10px] text-amber-500 font-semibold">Detail ›</span>
              </button>
            )}

            {/* Name & Price */}
            <div>
              <h1 className="font-display font-bold text-xl text-gray-900">{product.nama}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-sm text-amber-600 font-medium">
                  <Star size={14} fill="currentColor" /> {product.rating}
                </span>
                <span className="text-sm text-gray-400">{product.terjual} terjual</span>
                <span className="text-sm text-gray-400">Stok: {product.stok}</span>
              </div>
              <div className="mt-2">
                <p className="font-display font-bold text-2xl text-primary-700">
                  {formatRupiah(product.harga)}
                  <span className="text-sm text-gray-400 font-normal"> / {product.satuan}</span>
                </p>
                {product.hargaAsli && (
                  <p className="text-sm text-gray-400 line-through mt-0.5">{formatRupiah(product.hargaAsli)}</p>
                )}
              </div>
            </div>

            {/* Freshness & Origin Info */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={14} className="text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-700">Estimasi Segar</span>
                </div>
                <p className="text-sm font-bold text-emerald-800">{product.estimasiSegarHari} hari</p>
                {product.tanggalPanen && (
                  <p className="text-[10px] text-emerald-600">Dipanen: {product.tanggalPanen}</p>
                )}
              </div>
              <button 
                onClick={() => navigate(`/toko/${product.storeId}`)}
                className="bg-primary-50 rounded-xl p-3 border border-primary-100 text-left hover:bg-primary-100 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Store size={14} className="text-primary-600" />
                  <span className="text-xs font-semibold text-primary-700">Nama Toko</span>
                </div>
                <p className="text-sm font-bold text-primary-800 line-clamp-1">{product.storeName}</p>
              </button>
            </div>

            {/* Description */}
            <div className="card">
              <h3 className="font-semibold text-sm text-gray-800 mb-1.5">Deskripsi</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{product.deskripsi}</p>
            </div>

            {/* Info Nutrisi */}
            {product.nutrisi && (
              <div className="card bg-green-50 border-green-100 mb-6 lg:mb-0">
                <h3 className="font-semibold text-sm text-green-800 flex items-center gap-1.5 mb-1.5">
                  <Leaf size={14} /> Info Nutrisi
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {product.nutrisi.split(', ').map((n, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white rounded-lg text-xs text-green-700 font-medium border border-green-200">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50 lg:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 desktop-container">
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
          <h3 className="font-semibold text-gray-800 mb-3">Atur Jumlah</h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={16} className={quantity <= 1 ? "text-gray-400" : "text-gray-600"} />
              </button>
              <span className="w-8 text-center font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition-colors"
              >
                <Plus size={16} className="text-primary-700" />
              </button>
            </div>
            <span className="text-sm font-medium text-gray-500">Stok: {product.stok}</span>
          </div>
          <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="font-display font-bold text-xl text-primary-700">
              {formatRupiah(product.harga * quantity)}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowCartSuccessModal(true);
              }}
              className="flex-1 py-3 border border-primary-600 text-primary-700 rounded-xl font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Keranjang
            </button>
            <button
              onClick={() => navigate('/checkout', { state: { directBuy: { product, quantity } } })}
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
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setShowQuantityModal(false)}
          />
          {/* Bottom Sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl animate-slide-up overflow-hidden">
            {/* Close */}
            <button
              onClick={() => setShowQuantityModal(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
            >
              <X size={18} className="text-gray-500" />
            </button>

            {/* Product Preview */}
            <div className="p-5 pb-0">
              <div className="flex gap-3 items-start">
                <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 border border-gray-100">
                  {product.gambar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">{product.nama}</p>
                  <p className="font-display font-bold text-xl text-primary-700 mt-1">
                    {formatRupiah(product.harga)}
                  </p>
                  <p className="text-xs text-gray-400">Stok: {product.stok}</p>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100 mt-4" />

            {/* Quantity Selector */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Jumlah</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${
                      quantity <= 1 ? 'border-gray-200 text-gray-300' : 'border-primary-300 text-primary-600 hover:bg-primary-50 active:scale-95'
                    }`}
                    disabled={quantity <= 1}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-10 text-center font-display font-bold text-xl">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stok, quantity + 1))}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-primary-300 text-primary-600 hover:bg-primary-50 transition-all active:scale-95"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between py-3 mt-2 border-t border-dashed border-gray-200">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="font-display font-bold text-xl text-primary-700">
                  {formatRupiah(product.harga * quantity)}
                </span>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirm}
                className={`w-full py-3.5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 mt-2 shadow-lg transition-all active:scale-[0.98] ${
                  modalMode === 'beli'
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
              >
                {modalMode === 'beli' ? (
                  <>Beli Sekarang — {formatRupiah(product.harga * quantity)}</>
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
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCartSuccessModal(false)}
          />
          {/* Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-[90%] max-w-sm mx-auto p-6 animate-slide-up">
            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Check size={32} className="text-emerald-600" />
              </div>
            </div>

            <h3 className="font-display font-bold text-lg text-gray-900 text-center">Berhasil Ditambahkan!</h3>
            <p className="text-sm text-gray-500 text-center mt-1 mb-1">Produk sudah masuk ke keranjang belanja kamu</p>

            {/* Item Preview */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3 my-4 border border-gray-100">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border border-gray-100">
                {product.gambar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 line-clamp-1">{product.nama}</p>
                <p className="text-xs text-gray-400">x{quantity} • {formatRupiah(product.harga * quantity)}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCartSuccessModal(false)}
                className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Lanjut Belanja
              </button>
              <button
                onClick={() => navigate('/keranjang')}
                className="flex-1 py-3 px-4 bg-primary-600 rounded-2xl text-sm font-semibold text-white hover:bg-primary-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingCart size={16} /> Keranjang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ OUT-OF-AREA STORE MODAL ============ */}
      {showOutOfAreaModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative bg-white rounded-3xl shadow-2xl w-[90%] max-w-sm mx-auto overflow-hidden animate-slide-up">
            {/* Illustration */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 px-6 pt-8 pb-6 flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
                <AlertTriangle size={36} className="text-amber-500" />
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                <MapPin size={16} /> Toko di Luar Jangkauan
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-5">
              <p className="text-sm text-gray-700 leading-relaxed text-center">
                <b>{product.storeName}</b> berada di wilayah <b>{productStore?.wilayah}</b>,
                sedangkan alamat kamu di wilayah <b>{userWilayah}</b>.
                Pesanan dari toko ini akan dikenakan <span className="text-amber-700 font-bold">biaya pengiriman tambahan</span>.
              </p>

              {/* Extra Fee Preview */}
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-center">
                <p className="text-xs text-amber-600">Estimasi biaya tambahan</p>
                <p className="text-base font-bold text-amber-700">+Rp 15.000 - Rp 25.000</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 mt-5">
                <button
                  onClick={() => {
                    setShowOutOfAreaModal(false);
                    navigate('/katalog');
                  }}
                  className="w-full py-3 border-2 border-primary-200 rounded-2xl text-sm font-semibold text-primary-700 hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Search size={16} /> Cari Produk Serupa di Sekitar
                </button>
                <button
                  onClick={() => setShowOutOfAreaModal(false)}
                  className="w-full py-3 bg-primary-600 rounded-2xl text-sm font-bold text-white hover:bg-primary-700 transition-colors shadow-md"
                >
                  Oke, Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProdukPage;
