// =====================================================
// LAYOUT — RESPONSIVE LAYOUT WRAPPER
// Bottom nav only on main menu pages
// =====================================================

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import Navbar from './Navbar';

// Pages that show bottom nav (main menu pages only)
const bottomNavPaths = ['/', '/paket', '/booking', '/booking/form', '/booking/riwayat', '/profil'];

const Layout: React.FC = () => {
  const location = useLocation();
  const showBottomNav = bottomNavPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className={`lg:pt-16 ${showBottomNav ? 'pb-20 lg:pb-6' : 'pb-6'}`}>
        <div className="desktop-container">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav — only on main menu pages */}
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default Layout;
