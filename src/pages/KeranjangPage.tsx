// =====================================================
// KERANJANG PAGE — SHOPPING CART
// Fixed bottom summary, no bottom nav
// =====================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart, Store } from 'lucide-react';
import { dummyCart, formatRupiah } from '../data/dummy';
import type { CartItem } from '../types/types';

const KeranjangPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(dummyCart);

  // Group by store
  const groupedByStore = cartItems.reduce((acc, item) => {
    if (!acc[item.storeId]) {
      acc[item.storeId] = { storeName: item.storeName, items: [] };
    }
    acc[item.storeId].items.push(item);
    return acc;
  }, {} as Record<string, { storeName: string; items: CartItem[] }>);

  const updateQuantity = (produkId: string, delta: number) => {
    setCartItems(cartItems.map(item =>
      item.produkId === produkId
        ? { ...item, jumlah: Math.max(1, item.jumlah + delta) }
        : item
    ));
  };

  const removeItem = (produkId: string) => {
    setCartItems(cartItems.filter(item => item.produkId !== produkId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.harga * item.jumlah, 0);
  const ongkir = cartItems.length > 0 ? 10000 : 0;
  const total = subtotal + ongkir;

  return (
    <div className="animate-fade-in min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 lg:top-16 z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="font-display font-bold text-lg">Keranjang</h1>
          <span className="text-sm text-gray-400">({cartItems.length} item)</span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingCart size={32} className="text-gray-300" />
          </div>
          <p className="text-gray-500 font-medium">Keranjang kosong</p>
          <button onClick={() => navigate('/katalog')} className="btn-primary">Mulai Belanja</button>
        </div>
      ) : (
        <>
          {/* Scrollable Cart Items */}
          <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-4 space-y-4 pb-48 lg:pb-4">
            <div className="lg:flex lg:gap-6">
              <div className="flex-1 space-y-4">
                {Object.entries(groupedByStore).map(([storeId, { storeName, items }]) => (
                  <div key={storeId} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                      <Store size={14} className="text-primary-600" />
                      <span className="font-semibold text-sm text-gray-800">{storeName}</span>
                    </div>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.produkId} className="flex items-center gap-3">
                          <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                            {item.gambar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              {item.isPaket && (
                                <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded flex-shrink-0">📦 PAKET</span>
                              )}
                              <p className="font-medium text-sm text-gray-800 line-clamp-1">{item.produkNama}</p>
                            </div>
                            <p className="text-xs text-gray-400">{item.satuan}</p>
                            <p className="font-display font-bold text-sm text-primary-700 mt-0.5">
                              {formatRupiah(item.harga)}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1.5">
                            <button onClick={() => removeItem(item.produkId)} className="p-1 hover:bg-red-50 rounded-lg">
                              <Trash2 size={14} className="text-red-400" />
                            </button>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.produkId, -1)}
                                className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-sm font-bold w-5 text-center">{item.jumlah}</span>
                              <button
                                onClick={() => updateQuantity(item.produkId, 1)}
                                className="w-7 h-7 bg-primary-100 rounded-lg flex items-center justify-center"
                              >
                                <Plus size={12} className="text-primary-700" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Summary (inline) */}
              <div className="hidden lg:block lg:w-80">
                <div className="sticky top-20">
                  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                    <h3 className="font-display font-semibold text-sm mb-3">Ringkasan Belanja</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal ({cartItems.length} item)</span>
                        <span className="font-medium">{formatRupiah(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Ongkos Kirim</span>
                        <span className="font-medium">{formatRupiah(ongkir)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-100">
                        <span className="font-semibold">Total</span>
                        <span className="font-display font-bold text-lg text-primary-700">{formatRupiah(total)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/checkout')}
                      className="w-full btn-primary mt-4 py-3"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Bottom Summary (Mobile) */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">
            <div className="px-4 pt-3 pb-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500">Subtotal ({cartItems.length} item)</span>
                <span className="font-medium">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-gray-400">Ongkos Kirim</span>
                <span className="text-gray-500">{formatRupiah(ongkir)}</span>
              </div>
            </div>
            <div className="px-4 pb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] text-gray-400">Total</p>
                <p className="font-display font-bold text-lg text-primary-700">{formatRupiah(total)}</p>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="flex-1 btn-primary py-3 font-bold text-sm shadow-lg shadow-primary-200"
              >
                Checkout ({cartItems.length})
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KeranjangPage;
