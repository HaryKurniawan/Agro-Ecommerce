// =====================================================
// NAVBAR — DESKTOP TOP NAVIGATION
// =====================================================

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Leaf, Store, Package, CalendarCheck, ChevronDown } from 'lucide-react';
import { dummyCart } from '../data/dummy';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const cartCount = dummyCart.reduce((sum, item) => sum + item.jumlah, 0);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Toko', path: '/toko', icon: Store },
    { label: 'Katalog', path: '/katalog' },
    { label: 'Paket', path: '/paket', icon: Package },
    { label: 'Booking', path: '/booking', icon: CalendarCheck },
  ];

  return (
    <header className="hidden lg:block fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm z-50">
      <div className="desktop-container px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-md">
              <Leaf size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-gray-900 leading-tight">Agro Market</h1>
              <p className="text-[10px] text-gray-400 -mt-0.5">Sayur Segar Jawa Barat</p>
            </div>
          </button>

          {/* Nav Links */}
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path ||
                (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  {link.icon && <link.icon size={16} />}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Search + Actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari sayur, paket..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && searchQuery.trim()) navigate(`/katalog?q=${encodeURIComponent(searchQuery.trim())}`); }}
                className="pl-9 pr-4 py-2 w-56 bg-gray-50 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Cart */}
            <button
              onClick={() => navigate('/keranjang')}
              className="relative p-2.5 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <ShoppingCart size={20} className="text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            <button
              onClick={() => navigate('/profil')}
              className="flex items-center gap-2 pl-3 pr-2 py-1.5 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <User size={16} className="text-primary-700" />
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
