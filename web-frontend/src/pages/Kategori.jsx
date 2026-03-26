import React from 'react';

function Kategori() {
  // Profesyonel e-ticaret kategorileri
  const kategoriler = [
    { id: 1, ad: 'Yeni Gelenler', ikon: '✨' },
    { id: 2, ad: 'Kadın Giyim', ikon: '👗' },
    { id: 3, ad: 'Erkek Giyim', ikon: '👔' },
    { id: 4, ad: 'Aksesuar', ikon: '👜' },
    { id: 5, ad: 'Ayakkabı', ikon: '👟' },
    { id: 6, ad: 'Kozmetik', ikon: '💄' },
    { id: 7, ad: 'İndirim/Sale', ikon: '🏷️' }
  ];

  const kategoriSec = (ad) => {
    console.log(`${ad} kategorisi filtreleniyor...`);
    // Buraya ileride Backend'den o kategoriye ait ürünleri getiren fetch eklenebilir.
    alert(`${ad} kategorisi yakında listelenecek!`);
  };

  return (
    <div className="category-section">
      <div className="category-container">
        {kategoriler.map((kat) => (
          <button 
            key={kat.id} 
            className="category-pill"
            onClick={() => kategoriSec(kat.ad)}
          >
            <span className="cat-icon">{kat.ikon}</span>
            <span className="cat-name">{kat.ad}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Kategori;