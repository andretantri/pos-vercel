import { useState } from 'react';
import './Admin.css';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [amount, setAmount] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Danreas1#') {
      setIsAuthenticated(true);
    } else {
      alert('Password salah!');
    }
  };

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    alert(`Membentuk invoice ${invoiceNo} dengan nominal Rp ${amount}. Callback ke Duitku akan diproses.`);
    // TODO: Integrasi API Duitku di sini
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <div className="admin-card glass animate-fade-in">
            <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Login</h2>
            <form onSubmit={handleLogin} className="admin-form">
              <div className="form-group">
                <label>Password Admin</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password..."
                  required
                  className="admin-input"
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-card glass animate-fade-in">
          <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '2rem' }}>Buat Invoice (Duitku)</h2>
          <form onSubmit={handleCreateInvoice} className="admin-form">
            <div className="form-group">
              <label>Nomor Invoice</label>
              <input 
                type="text" 
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                placeholder="Contoh: INV-001"
                required
                className="admin-input"
              />
            </div>
            <div className="form-group">
              <label>Nominal Pembayaran (Rp)</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Contoh: 150000"
                required
                className="admin-input"
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Proses VA / Callback</button>
          </form>
        </div>
      </div>
    </div>
  );
}
