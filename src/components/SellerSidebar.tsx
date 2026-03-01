// =====================================================
// SELLER SIDEBAR - ECOMMERCE SAYUR (PEMILIK TOKO)
// =====================================================

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, UtensilsCrossed, ClipboardList,
  CalendarCheck, Store, Factory, CreditCard,
  ChevronLeft, ChevronRight, LogOut, Menu, X
} from 'lucide-react';

const menuItems = [
  { path: '/seller/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { path: '/seller/produk', label: 'Produk Saya', icon: <Package size={20} /> },
  { path: '/seller/paket', label: 'Paket Saya', icon: <UtensilsCrossed size={20} /> },
  { path: '/seller/pesanan', label: 'Pesanan Masuk', icon: <ClipboardList size={20} /> },
  { path: '/seller/booking', label: 'Booking Masuk', icon: <CalendarCheck size={20} /> },
  { path: '/seller/barang-masuk-processing', label: 'Barang dari Processing', icon: <Factory size={20} /> },
  { path: '/seller/keuangan', label: 'Keuangan & Tagihan', icon: <CreditCard size={20} /> },
  { path: '/seller/profil-toko', label: 'Profil Toko', icon: <Store size={20} /> },
];

const SellerSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="p-4 border-b border-emerald-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Store className="text-white" size={24} />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-display font-bold text-white text-lg leading-tight">Seller Panel</h1>
              <p className="text-white/60 text-xs">Agro Daerah</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive ? 'bg-white/20 text-white shadow-sm' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
              title={collapsed ? item.label : undefined}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </div>

      <div className="p-3 border-t border-emerald-700">
        <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:bg-white/10 hover:text-white text-sm font-medium transition-all">
          <LogOut size={20} /> {!collapsed && <span>Kembali ke Toko</span>}
        </button>
        {!collapsed ? (
          <button onClick={() => setCollapsed(true)} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-white/40 hover:bg-white/10 text-xs mt-1 transition-all">
            <ChevronLeft size={16} /> <span>Kecilkan</span>
          </button>
        ) : (
          <button onClick={() => setCollapsed(false)} className="w-full flex items-center justify-center py-2 rounded-xl text-white/40 hover:bg-white/10 mt-1 transition-all">
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      <button onClick={() => setMobileOpen(true)} className="lg:hidden fixed top-4 left-4 z-50 bg-emerald-600 text-white p-2.5 rounded-xl shadow-lg">
        <Menu size={20} />
      </button>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 h-full bg-gradient-to-b from-emerald-800 to-emerald-900 flex flex-col">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-white/70 hover:text-white"><X size={20} /></button>
            {sidebarContent}
          </div>
        </div>
      )}
      <aside className={`hidden lg:flex flex-col h-screen bg-gradient-to-b from-emerald-800 to-emerald-900 sticky top-0 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
        {sidebarContent}
      </aside>
    </>
  );
};

export default SellerSidebar;
