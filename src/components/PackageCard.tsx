// =====================================================
// PACKAGE CARD — KARTU PAKET BAHAN MASAK
// =====================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Star, ShoppingCart } from 'lucide-react';
import type { CookingPackage } from '../types/types';
import { formatRupiah } from '../data/dummy';

interface PackageCardProps {
  pkg: CookingPackage;
  variant?: 'compact' | 'full';
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, variant = 'compact' }) => {
  const navigate = useNavigate();

  if (variant === 'compact') {
    return (
      <button
        onClick={() => navigate(`/paket/${pkg.id}`)}
        className="flex-shrink-0 w-56 bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left group"
      >
        <div className="bg-gradient-to-br from-primary-50 to-emerald-50 p-4 flex items-center justify-between">
          <span className="text-4xl">{pkg.gambar}</span>
          <div className="flex -space-x-2">
            {pkg.items.slice(0, 3).map((item, i) => (
              <span key={i} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg shadow-sm border-2 border-white">
                {item.gambar}
              </span>
            ))}
            {pkg.items.length > 3 && (
              <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500 shadow-sm border-2 border-white">
                +{pkg.items.length - 3}
              </span>
            )}
          </div>
        </div>
        <div className="p-3">
          <span className="badge-store">{pkg.storeName}</span>
          <h3 className="font-display font-semibold text-sm text-gray-800 mt-1.5 group-hover:text-primary-700 transition-colors">{pkg.nama}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-0.5 text-[11px] text-gray-400">
              <Users size={10} /> {pkg.porsi} porsi
            </span>
            <span className="flex items-center gap-0.5 text-[11px] text-amber-600">
              <Star size={10} fill="currentColor" /> {pkg.rating}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="font-display font-bold text-primary-700 text-sm">{formatRupiah(pkg.harga)}</p>
              {pkg.hargaAsli && (
                <p className="text-[10px] text-gray-400 line-through">{formatRupiah(pkg.hargaAsli)}</p>
              )}
            </div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate(`/paket/${pkg.id}`)}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left group w-full"
    >
      <div className="bg-gradient-to-br from-primary-50 to-emerald-50 p-5 flex items-center justify-between">
        <div>
          <span className="text-5xl">{pkg.gambar}</span>
        </div>
        <div className="flex -space-x-2">
          {pkg.items.slice(0, 4).map((item, i) => (
            <span key={i} className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-xl shadow-sm border-2 border-white">
              {item.gambar}
            </span>
          ))}
          {pkg.items.length > 4 && (
            <span className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500 shadow-sm border-2 border-white">
              +{pkg.items.length - 4}
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <span className="badge-store">{pkg.storeName}</span>
        <h3 className="font-display font-semibold text-base text-gray-800 mt-1.5 group-hover:text-primary-700 transition-colors">{pkg.nama}</h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{pkg.deskripsi}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Users size={12} /> {pkg.porsi} porsi
          </span>
          <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
            <Star size={12} fill="currentColor" /> {pkg.rating}
          </span>
          <span className="text-xs text-gray-400">{pkg.terjual} terjual</span>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <div>
            <p className="font-display font-bold text-primary-700">{formatRupiah(pkg.harga)}</p>
            {pkg.hargaAsli && (
              <p className="text-[11px] text-gray-400 line-through">{formatRupiah(pkg.hargaAsli)}</p>
            )}
          </div>
          <span className="flex items-center gap-1 px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-xl text-xs font-semibold transition-colors">
            <ShoppingCart size={14} /> Pesan
          </span>
        </div>
      </div>
    </button>
  );
};

export default PackageCard;
