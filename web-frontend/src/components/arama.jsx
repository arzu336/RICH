import React, { useState } from 'react';

function Arama() {
  const [query, setQuery] = useState('');
  const [sonucMesaji, setSonucMesaji] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    // MADDE 5: En az 2 karakter validasyonu
    if (value.length >= 2) {
      // API Simülasyonu (GET /products?search=...)
      setSonucMesaji(`"Tüm" kategorisinde "${value}" için sonuçlar listeleniyor...`);
    } else {
      setSonucMesaji('');
    }
  };

  return (
    <div className="search-wrapper">
      <div className="search-bar-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Ürün ara... (En az 2 harf)" 
          value={query}
          onChange={handleSearch}
        />
        <button className="search-btn">🔍</button>
      </div>
      
      {/* MADDE 5: Kullanıcı Deneyimi Bilgilendirme Metni */}
      {sonucMesaji && (
        <div className="search-info-text">
          {sonucMesaji}
        </div>
      )}
    </div>
  );
}

export default Arama;