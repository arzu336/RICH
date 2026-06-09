import React, { useState, useEffect } from 'react';

function Favoriler() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. ADIM: Favorileri Görüntüleme (LocalStorage'dan Veri Çekme)
  useEffect(() => {
    const fetchFavorites = () => {
      setLoading(true);
      try {
        // Tarayıcı hafızasındaki anahtarlara bakıyoruz (Hem 'rich_favorites' hem 'favorites' kontrolü)
        const savedFavorites = JSON.parse(localStorage.getItem('rich_favorites')) || 
                               JSON.parse(localStorage.getItem('favorites')) || [];
        
        // Gerçekçi bir yükleme efekti (Shimmer Effect simülasyonu)
        setTimeout(() => {
          setFavorites(savedFavorites);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Favoriler çekilemedi:", error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // 2. ADIM: Favoriden Silme İşlemi
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    
    // Her iki olası anahtar adını da güncelliyoruz ki hata çıkmasın
    localStorage.setItem('rich_favorites', JSON.stringify(updatedFavorites));
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    setFavorites(updatedFavorites);
    alert("Ürün favorilerden kaldırıldı. 🗑️");
  };

  // Yükleme ekranı
  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status"></div>
        <div className="mt-2 text-muted">Favorileriniz Hazırlanıyor... (Shimmer Effect)</div>
      </div>
    );
  }

  return (
    <div className="favorites-container p-4" style={{ minHeight: '80vh' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">❤️ Favorilerim</h3>
        <span className="badge bg-primary">{favorites.length} Ürün</span>
      </div>
      
      <p className="text-muted small mb-4">RICH E-Commerce | Favori Yönetimi Modülü</p>

      {favorites.length === 0 ? (
        <div className="text-center py-5 shadow-sm rounded-4 bg-light">
          <h5 className="mt-3">Henüz favori ürününüz yok.</h5>
          <p className="text-muted">Beğendiğiniz ürünleri kalbe basarak buraya ekleyebilirsiniz.</p>
          <button 
            className="btn btn-primary px-4 mt-2" 
            onClick={() => window.location.href = "/"}
          >
            Alışverişe Başla
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {favorites.map((item) => (
            <div key={item.id} className="col-md-4 col-lg-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                <img 
                  src={item.resim} 
                  className="card-img-top" 
                  style={{ height: '220px', objectFit: 'cover' }} 
                  alt={item.ad} 
                />
                
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title fw-bold text-dark">{item.ad}</h6>
                  <p className="text-primary fw-bold mt-auto">{item.fiyat} TL</p>
                  
                  <button 
                    onClick={() => removeFavorite(item.id)} 
                    className="btn btn-outline-danger btn-sm w-100 mt-2 rounded-3"
                  >
                    🗑️ Listeden Kaldır
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoriler;