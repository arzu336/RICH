import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from "react";

function UrunDetay({ selectedCategory }) {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "http://localhost:5227/api/products";

        if (selectedCategory) {
          url += `?category=${selectedCategory}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setUrunler(data);
      } catch (err) {
        console.error("Ürün çekme hatası:", err);
      }
    };

  fetchProducts();
}, [selectedCategory]);
  const { addToCart } = useContext(AuthContext);
  
  // Ürün Listesi (Stok, Renk ve Beden bilgileriyle birlikte)
  const [urunler, setUrunler] = useState([]);

  // Senin Gereksinimlerin: Ekleme ve Filtreleme State'leri
  const [yeni, setYeni] = useState({ ad: '', fiyat: '', resim: '', kategori: 'kadin', renk: '', beden: '' });
  const [fRenk, setFRenk] = useState('');
  const [fBeden, setFBeden] = useState('');

  // Senin Gereksinimin: Ürün Ekleme (Madde 1 & 2)
  const urunEkle = (e) => {
    e.preventDefault();
    setUrunler([...urunler, { ...yeni, id: Date.now(), fiyat: Number(yeni.fiyat), stok: 10 }]);
    setYeni({ ad: '', fiyat: '', resim: '', kategori: 'kadin', renk: '', beden: '' });
    alert("Yeni ürün başarıyla eklendi! ✅");
  };

  // Senin Gereksinimin: Ürün Silme (Madde 5)
  const urunSil = (id) => {
    if(window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      setUrunler(urunler.filter(u => u.id !== id));
    }
  };

  // Arkadaşının Gereksinimi: Fiyata Göre Sıralama (Madde 8)
  const handleSort = (type) => {
    let sortedData = [...urunler];
    if (type === 'asc') sortedData.sort((a, b) => a.fiyat - b.fiyat);
    else if (type === 'desc') sortedData.sort((a, b) => b.fiyat - a.fiyat);
    setUrunler(sortedData);
  };

  // Arkadaşının Gereksinimi: Favorilere Ekleme (Madde 3)
  const handleAddToFavorite = (product) => {
    alert(`${product.ad} favorilere eklendi! ❤️`);
    let currentFavorites = JSON.parse(localStorage.getItem('rich_favorites')) || [];
    if (!currentFavorites.find(item => item.id === product.id)) {
      currentFavorites.push(product);
      localStorage.setItem('rich_favorites', JSON.stringify(currentFavorites));
    }
  };

  const filtered = urunler.filter(u => {
  const kategori = u.kategori || u.category;

  const katMatch = selectedCategory
    ? kategori?.toLowerCase() === selectedCategory.toLowerCase()
    : true;

  return katMatch;
});

  return (
    <div style={{ padding: '20px' }}>
      
      {/* SENİN GEREKSİNİMİN: ÜRÜN YÜKLEME FORMU (ADMIN) */}
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h4 style={{marginBottom: '15px'}}>📦 Ürün & Fotoğraf Yükle (Admin)</h4>
        <form onSubmit={urunEkle} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input className="form-control w-auto" placeholder="Ad" value={yeni.ad} onChange={e => setYeni({...yeni, ad: e.target.value})} required />
          <input className="form-control w-auto" placeholder="Fiyat" type="number" value={yeni.fiyat} onChange={e => setYeni({...yeni, fiyat: e.target.value})} required />
          <input className="form-control w-auto" placeholder="Foto URL" value={yeni.resim} onChange={e => setYeni({...yeni, resim: e.target.value})} required />
          <input className="form-control w-auto" placeholder="Renk" value={yeni.renk} onChange={e => setYeni({...yeni, renk: e.target.value})} />
          <input className="form-control w-auto" placeholder="Beden" value={yeni.beden} onChange={e => setYeni({...yeni, beden: e.target.value})} />
          <button type="submit" className="btn btn-success">Yayınla</button>
        </form>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        
        {/* SENİN GEREKSİNİMİN: RENK VE BEDEN FİLTRELERİ */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <select className="form-select w-auto" onChange={e => setFRenk(e.target.value)}>
            <option value="">Renk Filtrele</option>
            <option value="Lacivert">Lacivert</option>
            <option value="Siyah">Siyah</option>
            <option value="Gri">Gri</option>
            <option value="Beyaz">Beyaz</option>
          </select>
          <select className="form-select w-auto" onChange={e => setFBeden(e.target.value)}>
            <option value="">Beden Filtrele</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="0-3 Ay">0-3 Ay</option>
          </select>
        </div>

        {/* ARKADAŞININ GEREKSİNİMİ: SIRALAMA DROPDOWN */}
        <select 
          className="form-select w-auto" 
          onChange={(e) => handleSort(e.target.value)}
          style={{ cursor: 'pointer' }}
        >
          <option value="">Sırala: Varsayılan</option>
          <option value="asc">Fiyat: En Düşük</option>
          <option value="desc">Fiyat: En Yüksek</option>
        </select>
      </div>

      {/* ÜRÜN LİSTESİ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {filtered.map(u => (
          <div key={u.id} className="modern-product-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '12px', background: 'white', position: 'relative' }}>
            
            {/* ARKADAŞININ GEREKSİNİMİ: FOTOĞRAF FİLTRESİ VE STOK UYARILARI */}
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden', borderRadius: '8px' }}>
              <img 
                src={u.resim || u.image} 
                alt={u.ad || u.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: u.stok === 0 ? 'grayscale(100%)' : 'none' }} 
              />
              
              {/* Arkadaşının Favori Butonu */}
              <button 
                onClick={() => handleAddToFavorite(u)}
                style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', border: 'none', borderRadius: '50%', padding: '5px 8px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}
              >
                ❤️
              </button>

              {/* Arkadaşının Stok Bilgileri */}
              {u.stok === 0 && <span style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'red', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>TÜKENDİ</span>}
              {u.stok > 0 && u.stok <= 3 && <span style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'orange', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>SON {u.stok} ÜRÜN!</span>}
            </div>

            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <h5 style={{ fontSize: '16px', margin: '5px 0' }}>{u.ad || u.name}</h5>
              <p style={{ fontSize: '14px', color: '#666' }}>{u.renk || u.color} | {u.beden || u.size}</p>
              <p style={{ fontWeight: 'bold', color: '#1e3a8a' }}>{(u.fiyat || u.price)?.toLocaleString('tr-TR')} TL</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <button 
                  onClick={() => addToCart(u)} 
                  disabled={u.stok === 0}
                  className="btn btn-primary btn-sm"
                  style={{ backgroundColor: u.stok === 0 ? '#ccc' : '#1e3a8a' }}
                >
                  {u.stok === 0 ? 'Stokta Yok' : 'Sepete Ekle'}
                </button>
                
                {/* SENİN GEREKSİNİMİN: SİLME BUTONU */}
                <button onClick={() => urunSil(u.id)} className="btn btn-outline-danger btn-sm">Ürünü Sil 🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UrunDetay;