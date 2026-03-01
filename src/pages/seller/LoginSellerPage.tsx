import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Eye, EyeOff } from 'lucide-react';

const LoginSellerPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Store className="text-white" size={32} />
          </div>
          <h1 className="font-display font-bold text-2xl text-gray-900">Seller Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola Toko Agro Daerah Anda</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); navigate('/seller/dashboard'); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Toko</label>
            <input type="email" defaultValue="agrobandung@agro.id" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} defaultValue="seller123" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all pr-12" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg">
            Masuk ke Toko
          </button>
        </form>
        <div className="text-center mt-4">
          <button onClick={() => navigate('/buka-toko')} className="text-emerald-600 text-sm font-medium hover:underline">
            Belum punya toko? Daftar Toko Daerah →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSellerPage;
