import { useState } from 'react';
import '../App.css'; // Adjust path

// SVG Icons
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const PosIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="14" x2="23" y2="14"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="14" x2="4" y2="14"></line>
  </svg>
);

const InventoryIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const HRIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const SaasIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

const AccountingIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const ReportsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);


function Home() {
  const handleOrder = (plan) => {
    const phoneNumber = "6285117667198";
    const message = encodeURIComponent(`Halo, saya mau order paket ${plan}.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero container">
        <div className="hero-content animate-fade-in">
          <h1>Sistem Manajemen Terpadu untuk <span className="text-gradient">Bisnis Anda</span></h1>
          <p>
            Platform SaaS POS komprehensif dengan fitur kasir, inventaris, akuntansi, HRD, dan laporan keuangan yang mendalam. Tingkatkan efisiensi dan pantau bisnis Anda dalam satu dashboard cerdas.
          </p>
          <div className="hero-buttons">
            <a href="#pricing" className="btn btn-primary">Lihat Harga</a>
            <a href="#features" className="btn btn-outline">Pelajari Fitur</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="text-gradient">Fitur Unggulan</h2>
            <p>Aplikasi super lengkap yang dirancang khusus untuk memenuhi seluruh kebutuhan operasional bisnis modern Anda.</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card glass">
              <div className="feature-icon"><PosIcon /></div>
              <h3>Point of Sale (POS)</h3>
              <p>Sistem kasir cepat, antarmuka mudah digunakan, mendukung multi-tenant, dan transaksi offline sementara.</p>
            </div>
            
            <div className="feature-card glass">
              <div className="feature-icon"><InventoryIcon /></div>
              <h3>Manajemen Inventaris</h3>
              <p>Lacak stok real-time, retur barang, stock opname, dan peringatan batas stok otomatis untuk semua cabang.</p>
            </div>
            
            <div className="feature-card glass">
              <div className="feature-icon"><HRIcon /></div>
              <h3>HRD & Karyawan</h3>
              <p>Kelola data karyawan, sistem absensi (shifts), penggajian, dan kasbon (cash advances) dengan mudah.</p>
            </div>

            <div className="feature-card glass">
              <div className="feature-icon"><AccountingIcon /></div>
              <h3>Akuntansi Terintegrasi</h3>
              <p>Pencatatan keuangan otomatis, manajemen pembelian (purchasing), dan pengelolaan voucher promosi.</p>
            </div>

            <div className="feature-card glass">
              <div className="feature-icon"><ReportsIcon /></div>
              <h3>Laporan Finansial</h3>
              <p>Laporan rugi laba, neraca, arus kas, dan analitik performa penjualan cabang secara komprehensif.</p>
            </div>

            <div className="feature-card glass">
              <div className="feature-icon"><SaasIcon /></div>
              <h3>SaaS & Multi-Tenant</h3>
              <p>Satu platform untuk berbagai tenant dan cabang bisnis. Kelola hak akses super-admin secara terpusat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing container">
        <div className="section-header">
          <h2 className="text-gradient">Pilih Paket Sesuai Kebutuhan</h2>
          <p>Investasi cerdas dengan pilihan paket transparan dan tanpa biaya tersembunyi untuk mengembangkan skala bisnis Anda.</p>
        </div>

        <div className="pricing-grid">
          {/* Basic Tier */}
          <div className="pricing-card glass">
            <div className="pricing-header">
              <h3>Starter</h3>
              <div className="price">Rp 3.5jt<span>/tahun</span></div>
            </div>
            <ul className="pricing-features">
              <li><CheckIcon /> 1 Cabang / Tenant</li>
              <li><CheckIcon /> Point of Sale (POS)</li>
              <li><CheckIcon /> Inventaris Dasar</li>
              <li><CheckIcon /> Laporan Penjualan</li>
              <li><CheckIcon /> Dukungan Email</li>
            </ul>
            <button className="btn btn-outline" onClick={() => handleOrder('Starter')}>Pilih Starter</button>
          </div>

          {/* Pro Tier (Custom) */}
          <div className="pricing-card glass popular">
            <div className="pricing-header">
              <h3>Enterprise (Custom)</h3>
              <div className="price">Rp 15jt++<span>/sekali bayar</span></div>
            </div>
            <ul className="pricing-features">
              <li><CheckIcon /> Kepemilikan Source Code Penuh</li>
              <li><CheckIcon /> Multi Cabang / Multi Tenant</li>
              <li><CheckIcon /> Akuntansi & Laporan Keuangan Lengkap</li>
              <li><CheckIcon /> Modul HRD, Shift & Kasbon</li>
              <li><CheckIcon /> Custom Fitur & Penyesuaian Alur Bisnis</li>
              <li><CheckIcon /> Prioritas Dukungan 24/7 (3 Bulan)</li>
            </ul>
            <button className="btn btn-primary" onClick={() => handleOrder('Enterprise (Custom)')}>Hubungi Kami</button>
          </div>
          
          {/* Business Tier */}
          <div className="pricing-card glass">
            <div className="pricing-header">
              <h3>Business</h3>
              <div className="price">Rp 7.5jt<span>/tahun</span></div>
            </div>
            <ul className="pricing-features">
              <li><CheckIcon /> Hingga 5 Cabang</li>
              <li><CheckIcon /> Semua Fitur Starter</li>
              <li><CheckIcon /> Akuntansi Dasar</li>
              <li><CheckIcon /> Manajemen Karyawan</li>
              <li><CheckIcon /> Dukungan Prioritas Jam Kerja</li>
            </ul>
            <button className="btn btn-outline" onClick={() => handleOrder('Business')}>Pilih Business</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Aplikasi Manajemen Bisnis. Hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
