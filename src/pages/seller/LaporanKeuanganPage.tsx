import React, { useState } from 'react';
import { FileText, Search, CreditCard, Upload, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';

// Dummy Data untuk Invoice Tagihan dari Agro Jabar
const dummyTagihan = [
  {
    id: 'INV-AGRO-001',
    tanggal: '2026-03-01T08:00:00Z',
    keterangan: 'Pembelian Cabai Merah Besar (Grade A) - 50kg',
    totalTagihan: 2500000,
    jatuhTempo: '2026-03-08T08:00:00Z',
    status: 'Belum Lunas'
  },
  {
    id: 'INV-AGRO-002',
    tanggal: '2026-02-25T10:00:00Z',
    keterangan: 'Pembelian Tomat Ceri (Grade B) - 30kg',
    totalTagihan: 600000,
    jatuhTempo: '2026-03-04T10:00:00Z',
    status: 'Ditinjau' // Sudah upload bukti, menunggu verifikasi Agro Jabar
  },
  {
    id: 'INV-AGRO-003',
    tanggal: '2026-02-20T09:00:00Z',
    keterangan: 'Pembelian Bawang Merah (Grade A) - 100kg',
    totalTagihan: 4500000,
    jatuhTempo: '2026-02-27T09:00:00Z',
    status: 'Lunas'
  }
];

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
};

const formatTanggal = (isoString: string) => {
  return new Date(isoString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
};

const LaporanKeuanganPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showBayarModal, setShowBayarModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const filtered = dummyTagihan.filter(t => 
    t.id.toLowerCase().includes(search.toLowerCase()) || 
    t.keterangan.toLowerCase().includes(search.toLowerCase())
  );

  const totalHutang = dummyTagihan.filter(t => t.status === 'Belum Lunas').reduce((s, t) => s + t.totalTagihan, 0);

  const handleBayar = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowBayarModal(true);
  };

  const handleKonfirmasiBayar = () => {
    alert(`Bukti Transfer diupload!\nStatus Invoice ${selectedInvoice.id} berubah menjadi "Ditinjau". Menunggu validasi Agro Jabar.`);
    setShowBayarModal(false);
    setSelectedInvoice(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2">
          <CreditCard className="text-emerald-600" size={28} /> Laporan Keuangan & Piutang
        </h1>
        <p className="text-gray-500 mt-1">Kelola tagihan pembelian Grosir (Account Payable) ke Agro Jabar Pusat</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-rose-500 to-rose-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-rose-100 text-sm">Total Hutang Berjalan</p>
              <p className="text-3xl font-bold mt-1">{formatRupiah(totalHutang)}</p>
            </div>
            <div className="p-2 bg-white/20 rounded-xl"><AlertCircle className="text-white" size={24} /></div>
          </div>
          <p className="text-xs text-rose-100 mt-4 opacity-80">*Harap lunasi tagihan sebelum jatuh tempo.</p>
        </div>
        
        <div className="card sm:col-span-2 bg-emerald-50 border-emerald-100">
          <div className="flex gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm self-start"><FileText className="text-emerald-600" size={24}/></div>
            <div>
              <h3 className="font-bold text-emerald-900 text-lg">Bagaimana Alur Tagihan Bekarja?</h3>
              <p className="text-sm text-emerald-800 mt-1 leading-relaxed">
                Pembelian B2B Grosir Anda kepada Agro Jabar menggunakan sistem <strong>Tempo 7 Hari</strong> setelah B.A.S.T disetujui. 
                Sistem akan otomatis menerbitkan <i>Invoice Tagihan</i> di halaman ini. Jika bukti transfer telah diunggah dan divalidasi oleh Keuangan Agro Jabar, maka statusnya akan berubah menjadi <strong>Lunas</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
          <h2 className="font-semibold text-gray-700 flex items-center gap-2">Daftar Invoice Agro Jabar</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Cari No. Invoice..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none w-64"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-600">
                <th className="text-left py-3 px-4 font-semibold">No. Invoice</th>
                <th className="text-left py-3 px-4 font-semibold">Keterangan B.A.S.T</th>
                <th className="text-left py-3 px-4 font-semibold">Tgl Selesai B.A.S.T</th>
                <th className="text-left py-3 px-4 font-semibold">Jatuh Tempo</th>
                <th className="text-right py-3 px-4 font-semibold">Total Tagihan</th>
                <th className="text-center py-3 px-4 font-semibold">Status</th>
                <th className="text-center py-3 px-4 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-700">{inv.id}</td>
                  <td className="py-3 px-4 text-gray-700 max-w-xs truncate" title={inv.keterangan}>{inv.keterangan}</td>
                  <td className="py-3 px-4 text-gray-500">{formatTanggal(inv.tanggal)}</td>
                  <td className="py-3 px-4">
                    <span className={`flex items-center gap-1 ${inv.status === 'Belum Lunas' ? 'text-rose-600 font-semibold' : 'text-gray-500'}`}>
                      {inv.status === 'Belum Lunas' && <Calendar size={14}/>} {formatTanggal(inv.jatuhTempo)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-gray-900">{formatRupiah(inv.totalTagihan)}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      inv.status === 'Lunas' ? 'bg-emerald-100 text-emerald-700' :
                      inv.status === 'Ditinjau' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {inv.status === 'Belum Lunas' ? (
                      <button 
                        onClick={() => handleBayar(inv)}
                        className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-emerald-700 transition"
                      >
                        Bayar via Transfer
                      </button>
                    ) : inv.status === 'Ditinjau' ? (
                      <span className="text-xs text-amber-600 font-medium">Cek Berkala</span>
                    ) : (
                      <span className="text-xs text-emerald-600 font-medium flex items-center justify-center gap-1"><CheckCircle2 size={14}/> Selesai</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">Tidak ada tagihan yang sesuai.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Bayar */}
      {showBayarModal && selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowBayarModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-display font-bold text-xl text-gray-900 mb-2">Pelunasan Tagihan</h3>
            <p className="text-sm text-gray-500 mb-6">Upload bukti transfer bank ke rekening Agro Jabar untuk invoice <strong className="text-emerald-700">{selectedInvoice.id}</strong></p>
            
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
              <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Total yang harus dibayar</p>
              <p className="text-3xl font-bold text-gray-900">{formatRupiah(selectedInvoice.totalTagihan)}</p>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Transfer ke Rekening BUMD:</p>
                <p className="font-medium text-gray-900 flex items-center gap-2">
                  <CreditCard size={16} className="text-blue-600"/> Bank BJB: 123-456-789-0 (a.n PT Agro Jabar)
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Bukti Transfer</label>
              <div className="border-2 border-dashed border-emerald-200 bg-emerald-50 rounded-xl p-6 text-center cursor-pointer hover:border-emerald-400 transition">
                <Upload className="mx-auto text-emerald-500 mb-2" size={28} />
                <p className="text-sm font-medium text-emerald-800">Klik untuk upload foto struk/screenshot</p>
                <p className="text-xs text-emerald-600 mt-1">Format: JPG, PNG, PDF</p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowBayarModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200">Batal</button>
              <button onClick={handleKonfirmasiBayar} className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 flex items-center gap-2">
                <CheckCircle2 size={16}/> Konfirmasi Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaporanKeuanganPage;
