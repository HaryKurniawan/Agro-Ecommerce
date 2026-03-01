// =====================================================
// PRODUCT CARD — KARTU PRODUK
// =====================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Star, Clock } from 'lucide-react';
import type { Product } from '../types/types';
import { formatRupiah } from '../data/dummy';

interface ProductCardProps {
  product: Product;
  hideCartOnMobile?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, hideCartOnMobile = false }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/produk/${product.id}`)}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left group w-full h-full flex flex-col"
    >
      {/* Image Area */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-32 lg:h-40 flex items-center justify-center flex-shrink-0">
        <span className="text-5xl lg:text-6xl group-hover:scale-110 transition-transform duration-300">
          {product.gambar}
        </span>
        {/*
        {product.diskonPersen && (
          <span className="badge-discount">-{product.diskonPersen}%</span>
        )}
        */}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-medium text-sm text-gray-800 line-clamp-1 mt-1 leading-tight group-hover:text-primary-700 transition-colors flex-1">
          {product.nama}
        </h3>

        {/* Price */}
        <div className="mt-1.5">
          <p className="font-display font-bold text-primary-700 text-sm">
            {formatRupiah(product.harga)}
            <span className="text-[10px] text-gray-400 font-normal">/{product.satuan}</span>
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-0.5 text-[11px] text-amber-600 font-medium">
              <Star size={10} fill="currentColor" /> {product.rating}
            </span>
          </div>
          <span className="flex items-center gap-0.5 text-[10px] text-emerald-600">
            <Clock size={9} /> {product.estimasiSegarHari}hr
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => { e.stopPropagation(); }}
          className={`w-full mt-2.5 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-xl text-xs font-semibold items-center justify-center gap-1 transition-colors mt-auto ${hideCartOnMobile ? 'hidden lg:flex' : 'flex'}`}
        >
          <Plus size={14} /> Keranjang
        </button>
      </div>
    </button>
  );
};

export default ProductCard;
