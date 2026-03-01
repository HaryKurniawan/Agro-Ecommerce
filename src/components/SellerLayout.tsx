import React from 'react';
import { Outlet } from 'react-router-dom';
import SellerSidebar from './SellerSidebar';

export const SellerLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
