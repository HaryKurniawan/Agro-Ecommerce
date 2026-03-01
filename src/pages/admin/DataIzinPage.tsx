import React, { useState } from 'react';
import { FileCheck } from 'lucide-react';
import { dummyDataIzin, formatTanggal } from '../../data/adminDummy';

const DataIzinPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('semua');
  const filtered = dummyDataIzin.filter(i => filterStatus === 'semua' || i.status === filterStatus);
  const statusColor = (s: string) => s === 'aktif' ? 'bg-emerald-100 text-emerald-700' : s === 'kadaluarsa' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700';

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2"><FileCheck size={24} className="text-teal-600" /> Data Izin</h1>
        <p className="text-sm text-gray-500">Izin usaha per toko (SIUP, PIRT, NIB)</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <div className="flex gap-2">
          {['semua', 'aktif', 'kadaluarsa', 'dalam_proses'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-2 rounded-xl text-xs font-medium capitalize ${filterStatus === s ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s === 'dalam_proses' ? 'Dalam Proses' : s}</button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50">
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Toko</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Jenis Izin</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Nomor</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Terbit</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Berlaku Sampai</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Penerbit</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Status</th>
          </tr></thead>
          <tbody>
            {filtered.map(i => (
              <tr key={i.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{i.tokoNama}</td>
                <td className="py-3 px-4">{i.jenisIzin}</td>
                <td className="py-3 px-4 font-mono text-xs">{i.nomorIzin}</td>
                <td className="py-3 px-4 text-gray-500 text-xs">{formatTanggal(i.tanggalTerbit)}</td>
                <td className="py-3 px-4 text-gray-500 text-xs">{formatTanggal(i.tanggalBerlaku)}</td>
                <td className="py-3 px-4 text-xs text-gray-600">{i.instansiPenerbit}</td>
                <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${statusColor(i.status)}`}>{i.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataIzinPage;
