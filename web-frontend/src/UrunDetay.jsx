import React from 'react';

function UrunDetay() {
  const urunler = [
    { id: 101, ad: 'Elegant Lacivert Elbise', fiyat: '1.250,00 TL', resim: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop' },
    { id: 102, ad: 'Klasik Siyah Deri Ceket', fiyat: '2.800,00 TL', resim: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=400&auto=format&fit=crop' },
    { id: 103, ad: 'Siyah Şık El Çantası', fiyat: '950,00 TL', resim: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop' },
    { id: 104, ad: 'Modern Kesim Erkek Takım', fiyat: '3.500,00 TL', resim: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=400&auto=format&fit=crop' },
  ];

  return (
    <div className="product-showcase">
      <h2 className="section-title">Yeni Koleksiyon</h2>
      <div className="product-grid">
        {urunler.map((urun) => (
          <div key={urun.id} className="modern-product-card">
            <div className="card-image-wrapper">
              <img src={urun.resim} alt={urun.ad} />
              <button className="wishlist-btn">🤍</button>
            </div>
            <div className="card-info">
              <h3>{urun.ad}</h3>
              <p className="price">{urun.fiyat}</p>
              <button className="add-to-cart-btn">Sepete Ekle</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default UrunDetay;