import React, { useState, useEffect } from 'react';

function Adres() {
  const [adresler, setAdresler] = useState([]);
  const [yeniAdres, setYeniAdres] = useState({ sehir: '', ilce: '', detay: '' });

  // MADDE 6: Sayfa yüklendiğinde LocalStorage'dan (veya DB'den) adresleri çek
  useEffect(() => {
    const kayitliAdresler = JSON.parse(localStorage.getItem('rich_addresses')) || [];
    setAdresler(kayitliAdresler);
  }, []);

  const adresKaydet = (e) => {
    e.preventDefault();
    // MADDE 6: Form Validasyonu (Boş alan bırakılmaması)
    if (!yeniAdres.sehir || !yeniAdres.ilce || !yeniAdres.detay) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const güncelListe = [...adresler, { ...yeniAdres, id: Date.now() }];
    setAdresler(güncelListe);
    localStorage.setItem('rich_addresses', JSON.stringify(güncelListe)); // Senkronizasyon
    setYeniAdres({ sehir: '', ilce: '', detay: '' }); // Formu temizle
    alert("Adres başarıyla kaydedildi! 🏠");
  };

  return (
    <div className="address-manager p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3 className="mb-4">📍 Adres Yönetimi</h3>
      <p className="text-muted small">Madde 6: Teslimat Adresi Kaydı ve Listeleme</p>

      {/* ADRES EKLEME FORMU */}
      <form onSubmit={adresKaydet} className="bg-white p-3 rounded shadow-sm mb-4">
        <div className="row g-2">
          <div className="col-6">
            <input 
              type="text" placeholder="Şehir" className="form-control"
              value={yeniAdres.sehir} onChange={(e) => setYeniAdres({...yeniAdres, sehir: e.target.value})}
            />
          </div>
          <div className="col-6">
            <input 
              type="text" placeholder="İlçe" className="form-control"
              value={yeniAdres.ilce} onChange={(e) => setYeniAdres({...yeniAdres, ilce: e.target.value})}
            />
          </div>
          <div className="col-12">
            <textarea 
              placeholder="Tam Adres Bilgisi" className="form-control mt-2"
              value={yeniAdres.detay} onChange={(e) => setYeniAdres({...yeniAdres, detay: e.target.value})}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">Adresi Kaydet</button>
      </form>

      {/* KAYITLI ADRESLER LİSTESİ */}
      <div className="address-list">
        <h6>Kayıtlı Adreslerim</h6>
        {adresler.length === 0 ? (
          <p className="text-muted">Henüz kayıtlı adresiniz bulunmuyor.</p>
        ) : (
          adresler.map(adres => (
            <div key={adres.id} className="address-card p-3 bg-light border rounded mb-2">
              <strong>{adres.sehir} / {adres.ilce}</strong>
              <p className="mb-0 text-secondary small">{adres.detay}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Adres;