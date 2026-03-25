import React, { useState } from 'react';

function Odeme() {
  const [isim, setIsim] = useState('');
  const [loading, setLoading] = useState(false);

  const odemeYap = async (e) => {
    e.preventDefault();
    if (!isim) return alert("Lütfen kart üzerindeki ismi giriniz!");

    setLoading(true);
    try {
      // NOT: Aşağıdaki URL'yi kendi backend adresinle değiştirmeyi unutma!
      const response = await fetch('http://localhost:5000/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          kullanici: isim, 
          tutar: 1250.50,
          tarih: new Date().toLocaleString('tr-TR')
        })
      });

      if (response.ok) {
        alert(`Tebrikler ${isim}! Ödeme başarıyla veritabanına kaydedildi.`);
      } else {
        alert("Bağlantı başarılı ancak API hata döndürdü.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("API'ye bağlanılamadı. Backend'in çalışıyor mu?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>💳 1. Ödeme İşlemleri</h3>
      <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '15px' }}>
        REST API üzerinden güvenli ödeme simülasyonu.
      </p>
      
      <form onSubmit={odemeYap}>
        <label style={{ fontSize: '13px', display: 'block', marginBottom: '5px' }}>Kart Sahibi</label>
        <input 
          type="text" 
          placeholder="Ad Soyad" 
          value={isim}
          onChange={(e) => setIsim(e.target.value)} 
          required 
        />
        
        <div style={{ margin: '15px 0', padding: '10px', background: '#0f172a', borderRadius: '6px' }}>
          <span style={{ fontSize: '14px' }}>Toplam Tutar:</span>
          <span style={{ float: 'right', fontWeight: 'bold', color: '#646cff' }}>1.250,50 TL</span>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'İşleniyor...' : 'Ödemeyi Onayla'}
        </button>
      </form>
    </div>
  );
}

export default Odeme;