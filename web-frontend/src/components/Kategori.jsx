import React from 'react';

function Kategori() {
  const kategoriler = [
    { id: 1, ad: 'Yeni Gelenler', ikon: '✨' },
    { id: 2, ad: 'Kadın Giyim', ikon: '👗' },
    { id: 3, ad: 'Erkek Giyim', ikon: '👔' },
    { id: 4, ad: 'Aksesuar', ikon: '👜' },
    { id: 5, ad: 'Ayakkabı', ikon: '👟' },
    { id: 6, ad: 'Kozmetik', ikon: '💄' },
    { id: 7, ad: 'İndirim/Sale', ikon: '🏷️' }
  ];

  const kategoriSec = (api) => {
    setSelectedCategory(api);
  };

  return (
    <div className="category-section">
      <div className="category-container">
        {kategoriler.map((kat) => (
          <button 
            key={kat.id} 
            className="category-pill"
            onClick={() => kategoriSec(kat.api)}
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