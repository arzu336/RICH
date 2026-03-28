import React from 'react';

function Kategori({ setSelectedCategory }) {
  const kategoriler = [
    { id: 1, ad: 'Kadın Giyim', ikon: '👗', api: 'kadin' },
    { id: 2, ad: 'Erkek Giyim', ikon: '👔', api: 'erkek' },
    { id: 3, ad: 'Bebek', ikon: '🍼', api: 'bebek' },
    { id: 4, ad: 'Aksesuar', ikon: '👜', api: 'aksesuar' }
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