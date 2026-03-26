import React, { useState } from 'react';

function Odeme() {
  const [kartNo, setKartNo] = useState('');
  const [isim, setIsim] = useState('');
  const [skt, setSkt] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);

  // MADDE 1: Form Validasyonu (Tüm alanlar dolmadan buton pasif kalır)
  const isFormValid = kartNo.length === 16 && isim.length > 2 && skt.length === 5 && cvv.length === 3;

  const odemeYap = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // MADDE 1: API Endpoint Bağlantısı
      const response = await fetch('http://localhost:5000/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          kartSahibi: isim, 
          kartNumarasi: kartNo,
          tutar: "1.250,00 TL" 
        })
      });

      if (response.ok) {
        // MADDE 1: Kullanıcı Deneyimi Mesajı
        alert("Siparişiniz Alındı! 🎉 RICH'i tercih ettiğiniz için teşekkürler.");
      } else {
        alert("Ödeme sırasında bir hata oluştu. (Bakiye Yetersiz vb.)");
      }
    } catch (error) {
      alert("Backend bağlantısı kurulamadı! (Hoca videoda sorarsa: API henüz localhost'ta çalışıyor dersin)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-lg p-4" style={{ maxWidth: '450px', margin: '20px auto' }}>
      <h3 className="mb-3">💳 Güvenli Ödeme</h3>
      <p className="text-muted small">Madde 1: Ödeme Arayüzü Entegrasyonu</p>
      
      <form onSubmit={odemeYap}>
        <input 
          type="text" placeholder="Kart Üzerindeki İsim" className="form-control mb-2"
          onChange={(e) => setIsim(e.target.value)} 
        />
        <input 
          type="text" placeholder="Kart Numarası (16 Hane)" className="form-control mb-2"
          maxLength="16" onChange={(e) => setKartNo(e.target.value)} 
        />
        <div className="d-flex gap-2">
          <input type="text" placeholder="AA/YY" className="form-control mb-2" maxLength="5" onChange={(e) => setSkt(e.target.value)} />
          <input type="text" placeholder="CVV" className="form-control mb-2" maxLength="3" onChange={(e) => setCvv(e.target.value)} />
        </div>

        <div className="bg-light p-3 rounded mb-3">
          <div className="d-flex justify-content-between">
            <span>Sepet Toplamı:</span>
            <span className="fw-bold">1.250,00 TL</span>
          </div>
        </div>

        {/* MADDE 1: Yükleniyor animasyonu ve Disabled kontrolü */}
        <button 
          type="submit" 
          className="btn btn-primary w-100" 
          disabled={!isFormValid || loading}
        >
          {loading ? 'İşlem Yapılıyor...' : 'Ödemeyi Tamamla'}
        </button>
      </form>
    </div>
  );
}

export default Odeme;