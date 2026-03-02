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
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Group by store
  const groupedByStore = cartItems.reduce((acc, item) => {
    if (!acc[item.storeId]) {
      acc[item.storeId] = { storeName: item.storeName, items: [] };
    }
    acc[item.storeId].items.push(item);
    return acc;
  }, {} as Record<string, { storeName: string; items: CartItem[] }>);

  // Selection Logic
  const toggleItemSelection = (produkId: string) => {
    setSelectedIds(prev => 
      prev.includes(produkId) 
        ? prev.filter(id => id !== produkId) 
        : [...prev, produkId]
    );
  };

  const toggleStoreSelection = (storeId: string, itemIds: string[]) => {
    const allSelected = itemIds.every(id => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds(prev => prev.filter(id => !itemIds.includes(id)));
    } else {
      setSelectedIds(prev => Array.from(new Set([...prev, ...itemIds])));
    }
  };

  const updateQuantity = (produkId: string, delta: number) => {
    setCartItems(cartItems.map(item =>
      item.produkId === produkId
        ? { ...item, jumlah: Math.max(1, item.jumlah + delta) }
        : item
    ));
  };

  const removeItem = (produkId: string) => {
    setCartItems(cartItems.filter(item => item.produkId !== produkId));
    setSelectedIds(prev => prev.filter(id => id !== produkId));
  };

  const removeSelected = () => {
    setCartItems(cartItems.filter(item => !selectedIds.includes(item.produkId)));
    setSelectedIds([]);
    setIsSelectMode(false);
  };

  // Totals based on selection
  const activeItems = isSelectMode 
    ? cartItems.filter(item => selectedIds.includes(item.produkId))
    : cartItems;

  const subtotal = activeItems.reduce((sum, item) => sum + item.harga * item.jumlah, 0);
  const ongkir = activeItems.length > 0 ? 10000 : 0;
  const total = subtotal + ongkir;

  return (
    <div className="animate-fade-in min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 lg:top-16 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="font-display font-bold text-lg">Keranjang</h1>
            </div>
          </div>
          <button 
            onClick={() => {
              setIsSelectMode(!isSelectMode);
              if (isSelectMode) setSelectedIds([]);
            }}
            className="text-sm font-bold text-primary-600 px-3 py-1.5 hover:bg-primary-50 rounded-lg transition-colors"
          >
            {isSelectMode ? 'Selesai' : 'Pilih'}
          </button>
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
          <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-4 space-y-4 pb-48 lg:pb-10">
            <div className="lg:flex lg:gap-6">
              <div className="flex-1 space-y-4">
                {Object.entries(groupedByStore).map(([storeId, { storeName, items }]) => {
                  const itemIds = items.map(i => i.produkId);
                  const isStoreSelected = itemIds.every(id => selectedIds.includes(id));
                  
                  return (
                    <div key={storeId} className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm overflow-hidden">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                          {isSelectMode && (
                            <input 
                              type="checkbox" 
                              checked={isStoreSelected}
                              onChange={() => toggleStoreSelection(storeId, itemIds)}
                              className="w-5 h-5 rounded-md border-gray-300 text-primary-600 focus:ring-primary-500 transition-all cursor-pointer"
                            />
                          )}
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-primary-50 rounded-lg">
                              <Store size={14} className="text-primary-600" />
                            </div>
                            <span className="font-bold text-sm text-gray-900">{storeName}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-5">
                        {items.map((item) => {
                          const isItemSelected = selectedIds.includes(item.produkId);
                          return (
                            <div key={item.produkId} className={`flex items-center gap-4 transition-opacity ${isSelectMode && !isItemSelected ? 'opacity-60' : ''}`}>
                              {isSelectMode && (
                                <input 
                                  type="checkbox" 
                                  checked={isItemSelected}
                                  onChange={() => toggleItemSelection(item.produkId)}
                                  className="w-5 h-5 rounded-md border-gray-300 text-primary-600 focus:ring-primary-500 transition-all cursor-pointer"
                                />
                              )}
                              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border border-gray-100">
                                {item.gambar}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  {item.isPaket && (
                                    <span className="text-[8px] font-black bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md flex-shrink-0">PAKET</span>
                                  )}
                                  <p className="font-bold text-sm text-gray-900 line-clamp-1">{item.produkNama}</p>
                                </div>
                                <p className="text-[10px] text-gray-400 font-semibold mt-0.5 uppercase tracking-wider">{item.satuan}</p>
                                <p className="font-display font-black text-sm text-primary-700 mt-1">
                                  {formatRupiah(item.harga)}
                                </p>
                              </div>
                              
                              <div className="flex flex-col items-end gap-2">
                                {!isSelectMode && (
                                  <button onClick={() => removeItem(item.produkId)} className="p-1.5 hover:bg-red-50 rounded-xl transition-colors">
                                    <Trash2 size={14} className="text-red-400" />
                                  </button>
                                )}
                                <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-100">
                                  <button
                                    onClick={() => updateQuantity(item.produkId, -1)}
                                    className="w-7 h-7 bg-white shadow-sm rounded-lg flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all"
                                  >
                                    <Minus size={10} className="text-gray-600" />
                                  </button>
                                  <span className="text-xs font-black w-7 text-center text-gray-900 tracking-tighter">{item.jumlah}</span>
                                  <button
                                    onClick={() => updateQuantity(item.produkId, 1)}
                                    className="w-7 h-7 bg-primary-600 shadow-md shadow-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-700 active:scale-90 transition-all"
                                  >
                                    <Plus size={10} className="text-white" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Summary (inline) */}
              <div className="hidden lg:block lg:w-96">
                <div className="sticky top-20">
                  <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="font-display font-bold text-sm mb-4 text-gray-900 uppercase tracking-widest">Ringkasan Belanja</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal ({activeItems.length} item)</span>
                        <span className="font-bold text-gray-900">{formatRupiah(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Ongkos Kirim</span>
                        <span className="font-bold text-gray-900">{formatRupiah(ongkir)}</span>
                      </div>
                      <div className="flex justify-between pt-4 border-t border-gray-100">
                        <span className="font-bold text-gray-900">Total Pembayaran</span>
                        <span className="font-display font-black text-xl text-primary-700 tracking-tight">{formatRupiah(total)}</span>
                      </div>
                    </div>
                    
                    {isSelectMode ? (
                      <button
                        disabled={selectedIds.length === 0}
                        onClick={removeSelected}
                        className="w-full mt-6 bg-red-500 text-white font-bold py-4 rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-100 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                      >
                        <Trash2 size={18} /> Hapus Terpilih ({selectedIds.length})
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate('/checkout')}
                        className="w-full mt-6 btn-primary py-4 font-black shadow-xl shadow-primary-100"
                      >
                        Lanjut ke Checkout
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Bottom Summary (Mobile) */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50">
            <div className="px-5 pt-4 pb-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500 font-medium">Subtotal ({activeItems.length} item)</span>
                <span className="font-bold text-gray-900">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] mb-2 uppercase tracking-widest font-bold">
                <span className="text-gray-400">Ongkos Kirim</span>
                <span className="text-primary-600">{formatRupiah(ongkir)}</span>
              </div>
            </div>
            
            <div className="px-5 pb-6 flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Bayar</p>
                <p className="font-display font-black text-xl text-primary-700 tracking-tighter leading-none">{formatRupiah(total)}</p>
              </div>
              
              {isSelectMode ? (
                <button
                  disabled={selectedIds.length === 0}
                  onClick={removeSelected}
                  className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-red-100 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Trash2 size={16} /> Hapus ({selectedIds.length})
                </button>
              ) : (
                <button
                  onClick={() => navigate('/checkout')}
                  className="flex-1 btn-primary py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary-100 active:scale-95 transition-all"
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KeranjangPage;
