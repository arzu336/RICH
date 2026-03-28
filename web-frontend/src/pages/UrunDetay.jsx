import React, { useEffect, useState } from 'react';

function UrunDetay({ category = "women's clothing" }) {
  const [urunler, setUrunler] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
      .then(res => res.json())
      .then(data => {
        // Stok eklemek istiyorsan rastgele ekleyebiliriz
        const dataWithStock = data.map(u => ({ ...u, stok: Math.floor(Math.random() * 10) + 1 }));
        setUrunler(dataWithStock);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [category]);

  const addToFavorites = (ad) => {
    alert(`❤️ ${ad} favorilere eklendi!`);
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="product-showcase">
      <div className="product-grid">
        {urunler.map((urun) => (
          <div key={urun.id} className="modern-product-card">
            <div className="card-image-wrapper">
              <img 
                src={urun.image} 
                alt={urun.title} 
                style={{ filter: urun.stok === 0 ? 'grayscale(100%)' : 'none' }} 
              />
              <button className="wishlist-btn" onClick={() => addToFavorites(urun.title)}>❤️</button>
              {urun.stok === 0 && <span className="stock-badge out-of-stock">TÜKENDİ</span>}
              {urun.stok > 0 && urun.stok <= 3 && <span className="stock-badge low-stock">SON {urun.stok} ÜRÜN!</span>}
            </div>
            <div className="card-info">
              <h3>{urun.title}</h3>
              <p className="price">{urun.price.toLocaleString('tr-TR')} $</p>
              <button 
                className="add-to-cart-btn" 
                disabled={urun.stok === 0}
                style={{ backgroundColor: urun.stok === 0 ? '#ccc' : '#1e3a8a' }}
              >
                {urun.stok === 0 ? 'Stokta Yok' : 'Sepete Ekle'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UrunDetay;