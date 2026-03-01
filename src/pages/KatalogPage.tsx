// =====================================================
// KATALOG PAGE — SEMUA PRODUK LINTAS TOKO
// Cart icon di header, filter di samping search
// =====================================================

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal, ShoppingCart, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { dummyProducts, dummyCategories, dummyStores, dummyCart } from '../data/dummy';

type SortOption = 'populer' | 'termurah' | 'termahal' | 'terbaru';

const KatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('populer');
  const [showFilter, setShowFilter] = useState(false);

  let filtered = dummyProducts.filter(p => {
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !selectedCategory || p.kategoriId === selectedCategory;
    const matchStore = !selectedStore || p.storeId === selectedStore;
    return matchSearch && matchCategory && matchStore;
  });

  // Sort
  switch (sortBy) {
    case 'populer': filtered.sort((a, b) => b.terjual - a.terjual); break;
    case 'termurah': filtered.sort((a, b) => a.harga - b.harga); break;
    case 'termahal': filtered.sort((a, b) => b.harga - a.harga); break;
    case 'terbaru': filtered.sort((a, b) => b.rating - a.rating); break;
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 lg:pt-6 sticky top-0 lg:top-16 z-40">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl lg:hidden">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="font-display font-bold text-lg text-gray-900 lg:text-xl flex-1">Katalog Sayur</h1>
          {/* Cart Icon */}
          <button
            onClick={() => navigate('/keranjang')}
            className="p-2 hover:bg-gray-50 rounded-xl relative"
          >
            <ShoppingCart size={20} className="text-gray-600" />
            {dummyCart.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center min-w-[18px] min-h-[18px]">
                {dummyCart.length}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar + Filter Button */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} placeholder="Cari sayur..." />
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`p-3 rounded-xl border transition-all flex-shrink-0 ${
              showFilter || selectedCategory || selectedStore
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'bg-white border-gray-200 text-gray-500 hover:border-primary-300'
            }`}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* Category Pills (clean, no emoji) */}
        <div className="overflow-x-auto scroll-hide mt-3 -mx-4 px-4">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                !selectedCategory
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Semua
            </button>
            {dummyCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.nama}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div className="bg-white border-b border-gray-100 p-4 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Filter & Urutkan</h3>
            <button onClick={() => setShowFilter(false)}><X size={18} className="text-gray-400" /></button>
          </div>
          
          {/* Sort */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1.5">Urutkan</p>
            <div className="flex flex-wrap gap-2">
              {([['populer', 'Populer'], ['termurah', 'Termurah'], ['termahal', 'Termahal'], ['terbaru', 'Rating']] as [SortOption, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    sortBy === key ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Toko */}
          <div>
            <p className="text-xs text-gray-500 mb-1.5">Toko</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedStore('')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  !selectedStore ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Semua Toko
              </button>
              {dummyStores.slice(0, 6).map((store) => (
                <button
                  key={store.id}
                  onClick={() => setSelectedStore(selectedStore === store.id ? '' : store.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedStore === store.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {store.nama}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="px-4 lg:px-6 mt-4 pb-4">
        <p className="text-xs text-gray-400 mb-3">{filtered.length} produk ditemukan</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500">Tidak ada produk ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KatalogPage;
