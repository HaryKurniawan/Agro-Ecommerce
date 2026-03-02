import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle2, Tractor, Truck, ShieldCheck, HelpCircle } from 'lucide-react';

const BookingInstructionsPage: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Ajukan Pernyataan Kebutuhan',
      desc: 'Pilih Toko Agro Daerah dan tentukan komoditas serta jumlah yang Anda butuhkan secara rutin.',
      icon: <BookOpen className="text-blue-600" size={24} />,
      status: 'diajukan'
    },
    {
      title: 'Verifikasi & Konfirmasi',
      desc: 'Tim BUMD akan memeriksa ketersediaan lahan dan alokasi stok. Anda akan menerima notifikasi jika disetujui.',
      icon: <CheckCircle2 className="text-emerald-600" size={24} />,
      status: 'dikonfirmasi'
    },
    {
      title: 'Pembayaran Booking',
      desc: 'Setelah dikonfirmasi, lakukan pembayaran sesuai invoice untuk mengunci alokasi lahan dan harga.',
      icon: <ShieldCheck className="text-primary-600" size={24} />,
      status: 'Pembayaran'
    },
    {
      title: 'Proses Masa Tanam',
      desc: 'Petani mitra kami mulai menyiapkan lahan dan menanam sesuai pesanan Anda. Progress dapat dipantau real-time.',
      icon: <Tractor className="text-amber-600" size={24} />,
      status: 'diproses'
    },
    {
      title: 'Pengiriman Rutin',
      desc: 'Hasil panen dikirim sesuai jadwal frekuensi (harian/mingguan) langsung ke lokasi Anda.',
      icon: <Truck className="text-purple-600" size={24} />,
      status: 'dikirim'
    }
  ];

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen pb-10">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center gap-4 sticky top-0 z-30 lg:top-16 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="font-display font-bold text-lg text-gray-900">Panduan Booking Supply</h1>
      </div>

      <div className="p-5 lg:p-8 max-w-2xl mx-auto space-y-8">
        {/* Intro Section */}
        <section className="text-center space-y-3">
          <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <BookOpen size={32} />
          </div>
          <h2 className="font-display font-bold text-xl text-gray-900">Bagaimana Cara Kerjanya?</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Layanan B2B Agro Jabar dirancang untuk memberikan kepastian stok dan harga bagi pelaku usaha kuliner dan perhotelan.
          </p>
        </section>

        {/* Step-by-Step */}
        <section className="space-y-6">
          <h3 className="font-display font-bold text-sm text-gray-400 uppercase tracking-widest">Langkah-langkah</h3>
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-gray-300">0{idx + 1}</span>
                    <h4 className="font-bold text-gray-900">{step.title}</h4>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Status Explanation */}
        <section className="bg-primary-900 rounded-[2.5rem] p-6 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
          <h3 className="font-display font-bold text-lg mb-4 relative z-10">Mengenal Status Booking</h3>
          <div className="grid grid-cols-1 gap-4 relative z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <span className="inline-block px-2 py-0.5 bg-blue-500 text-[9px] font-bold rounded uppercase mb-1">Diajukan</span>
              <p className="text-[11px] text-primary-100">Permohonan Anda sedang ditinjau oleh tim admin pusal.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <span className="inline-block px-2 py-0.5 bg-emerald-500 text-[9px] font-bold rounded uppercase mb-1">Dikonfirmasi</span>
              <p className="text-[11px] text-primary-100">Kebutuhan Anda disetujui & alokasi lahan segera disiapkan setelah pembayaran.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <span className="inline-block px-2 py-0.5 bg-amber-500 text-[9px] font-bold rounded uppercase mb-1">Diproses</span>
              <p className="text-[11px] text-primary-100">Masa tanam sedang berjalan. Laporan alokasi lintas daerah akan tampil di detail.</p>
            </div>
          </div>
        </section>

        {/* FAQ Area */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-primary-600">
            <HelpCircle size={18} />
            <h3 className="font-display font-bold text-sm uppercase tracking-widest">Informasi Penting</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-2xl border border-gray-100">
              <h5 className="font-bold text-sm text-gray-900 mb-1">Apakah harga bisa berubah?</h5>
              <p className="text-xs text-gray-500 leading-relaxed">Setelah status "Dikonfirmasi" dan dibayar, harga akan tetap (locked) sesuai kesepakatan awal hingga periode kontrak selesai.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100">
              <h5 className="font-bold text-sm text-gray-900 mb-1">Bagaimana jika panen gagal?</h5>
              <p className="text-xs text-gray-500 leading-relaxed">Agro Jabar menjamin ketersediaan stok melalui mekanisme alokasi lintas daerah antar BUMD jika terjadi kendala pada satu lahan.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookingInstructionsPage;
