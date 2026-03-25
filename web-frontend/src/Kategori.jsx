import React from 'react';

function Kategori() {
  const kategoriler = [
    { ad: 'Tümü', ikon: '🏠' },
    { ad: 'Elektronik', ikon: '💻' },
    { ad: 'Moda', ikon: '👕' },
    { ad: 'Ev & Yaşam', ikon: '🛋️' },
    { ad: 'Kozmetik', ikon: '💄' },
    { ad: 'Spor', ikon: '⚽' },
    { ad: 'Kitap', ikon: '📚' }
  ];

  const filtrele = async (kat) => {
    console.log(`${kat} seçildi`);
    // API bağlantın buraya gelecek
  };

  return (
    <div className="category-bar">
      {kategoriler.map((kat, index) => (
        <button key={index} className="category-item" onClick={() => filtrele(kat.ad)}>
          <span className="cat-icon">{kat.ikon}</span>
          <span className="cat-name">{kat.ad}</span>
        </button>
      ))}
    </div>
  );
}
export default Kategori;