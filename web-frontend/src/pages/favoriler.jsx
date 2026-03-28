import React, { useState, useEffect } from 'react';

function Favoriler() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // MADDE 2: Listeleme (GET /favorites)
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const data = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(data);
      } catch (error) {
        console.error("Favoriler çekilemedi:", error);
        // Test için boş bırakabiliriz
      } finally {
        setLoading(false); // Shimmer/Skeleton etkisi için loading state
      }
    };
    fetchFavorites();
  }, []);

  // MADDE 4: Favoriden Silme (DELETE /favorites/{productId})
  const removeFavorite = async (id) => {
    try {
      const updatedFavorites = favorites.filter(item => item.id !== id);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert("Ürün favorilerden kaldırıldı 🗑️");

      if (response.ok) {
        // Optimistic UI Update: API'den cevap gelince yerel listeden hemen sil (Animasyon hissi verir)
        setFavorites(favorites.filter(item => item.id !== id));
        alert("Ürün favorilerden kaldırıldı. 🗑️");
      }
    } catch (error) {
      alert("Silme işlemi başarısız.");
    }
  };

  const addToFavorites = (product) => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];

    const isExist = existing.find(item => item.id === product.id);

    if (!isExist) {
      const updated = [...existing, product];
      localStorage.setItem("favorites", JSON.stringify(updated));
      alert("Favorilere eklendi ❤️");
    }
  };

  if (loading) return <div className="text-center p-5">Favoriler Yükleniyor... (Shimmer Effect)</div>;

  return (
    <div className="favorites-container p-4">
      <h3 className="mb-4">❤️ Favorilerim</h3>
      <p className="text-muted small">Madde 2, 3 & 4: Favori Yönetimi Entegrasyonu</p>

      {favorites.length === 0 ? (
        // MADDE 2: Liste boşsa uyarı mesajı
        <div className="alert alert-info text-center">
          Henüz favori ürününüz yok. Alışverişe devam edin!
        </div>
      ) : (
        <div className="row g-3">
          {favorites.map((item) => (
            <div key={item.id} className="col-md-4 product-card-fade">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <img src={item.resim} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} alt={item.ad} />
                <div className="card-body">
                  <h6 className="card-title">{item.ad}</h6>
                  <p className="text-primary fw-bold">{item.fiyat}</p>
                  
                  {/* MADDE 4: Silme Butonu */}
                  <button 
                    onClick={() => removeFavorite(item.id)} 
                    className="btn btn-outline-danger btn-sm w-100 mt-2"
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