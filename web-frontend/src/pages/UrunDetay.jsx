import React, { useState } from 'react';

function UrunDetay() {
  // MADDE 7: Stok Bilgisi Kontrolü (Örnek Veri Seti)
  const [urunler, setUrunler] = useState([
    { id: 101, ad: 'Elegant Lacivert Elbise', fiyat: 1250, resim: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop', stok: 5 },
    { id: 102, ad: 'Klasik Siyah Deri Ceket', fiyat: 2800, resim: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=400&auto=format&fit=crop', stok: 2 },
    { id: 103, ad: 'Siyah Şık El Çantası', fiyat: 950, resim: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop', stok: 0 },
    { id: 104, ad: 'Modern Kesim Erkek Takım', fiyat: 3500, resim: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=400&auto=format&fit=crop', stok: 10 },
  ]);

  // MADDE 8: Fiyata Göre Sıralama (Dropdown Menü Fonksiyonu)
  const handleSort = (type) => {
    let sortedData = [...urunler];
    if (type === 'asc') {
      sortedData.sort((a, b) => a.fiyat - b.fiyat); // En Düşük Fiyat
    } else if (type === 'desc') {
      sortedData.sort((a, b) => b.fiyat - a.fiyat); // En Yüksek Fiyat
    }
    setUrunler(sortedData);
  };

  // MADDE 3: Favorilere Ürün Ekleme (Toast Mesajlı)
  const addToFavorites = (ad) => {
    alert(`❤️ ${ad} Favorilere Eklendi! (Madde 3 Tamamlandı)`);
  };

  return (
    <div className="product-showcase">
      {/* MADDE 8: Sıralama Dropdown Menüsü (Sağ Üst Köşe) */}
      <div className="sort-container mb-4" style={{ textAlign: 'right' }}>
        <select 
          className="form-select d-inline-block w-auto" 
          onChange={(e) => handleSort(e.target.value)}
          style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
        >
          <option value="">Sırala: Varsayılan</option>
          <option value="asc">Fiyat: En Düşük</option>
          <option value="desc">Fiyat: En Yüksek</option>
        </select>
      </div>

      <div className="product-grid">
        {urunler.map((urun) => (
          <div key={urun.id} className="modern-product-card">
            <div className="card-image-wrapper">
              {/* MADDE 7: Stok bittiyse resim siyah-beyaz olur */}
              <img 
                src={urun.resim} 
                alt={urun.ad} 
                style={{ filter: urun.stok === 0 ? 'grayscale(100%)' : 'none' }} 
              />
              
              {/* MADDE 3: Kalp Butonu */}
              <button className="wishlist-btn" onClick={() => addToFavorites(urun.ad)}>❤️</button>
              
              {/* MADDE 7: Stok Rozetleri (Tükendi / Son X Ürün) */}
              {urun.stok === 0 && <span className="stock-badge out-of-stock">TÜKENDİ</span>}
              {urun.stok > 0 && urun.stok <= 3 && <span className="stock-badge low-stock">SON {urun.stok} ÜRÜN!</span>}
            </div>

            <div className="card-info">
              <h3>{urun.ad}</h3>
              {/* Fiyat Formatlama (1.250 TL şeklinde) */}
              <p className="price">{urun.fiyat.toLocaleString('tr-TR')} TL</p>
              
              {/* MADDE 7: Stok bittiyse buton pasif olur */}
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