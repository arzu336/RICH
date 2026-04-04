import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function UrunDetay({ selectedCategory }) {
  const { addToCart } = useContext(AuthContext);
  
  const [urunler, setUrunler] = useState([
    { id: 101, ad: 'Elegant Lacivert Elbise', fiyat: 1250, resim: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b', stok: 5, kategori: 'kadin', renk: 'Lacivert', beden: 'M' },
    { id: 102, ad: 'Klasik Siyah Deri Ceket', fiyat: 2800, resim: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504', stok: 2, kategori: 'erkek', renk: 'Siyah', beden: 'L' },
    { id: 103, ad: 'Siyah Şık El Çantası', fiyat: 950, resim: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3', stok: 0, kategori: 'aksesuar', renk: 'Siyah', beden: 'Standart' },
    { id: 104, ad: 'Modern Kesim Erkek Takım', fiyat: 3500, resim: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35', stok: 10, kategori: 'erkek', renk: 'Gri', beden: 'XL' },
    { id: 105, ad: 'Pamuklu Bebek Tulum Seti', fiyat: 450, resim: 'https://images.unsplash.com/photo-1522771935878-3a0373d4fe84', stok: 12, kategori: 'bebek', renk: 'Beyaz', beden: '0-3 Ay' },
  ]);

  const [yeni, setYeni] = useState({ ad: '', fiyat: '', resim: '', kategori: 'kadin', renk: '', beden: '' });
  const [fRenk, setFRenk] = useState('');
  const [fBeden, setFBeden] = useState('');

  const urunEkle = (e) => {
    e.preventDefault();
    setUrunler([...urunler, { ...yeni, id: Date.now(), fiyat: Number(yeni.fiyat) }]);
    setYeni({ ad: '', fiyat: '', resim: '', kategori: 'kadin', renk: '', beden: '' });
  };

  const urunSil = (id) => setUrunler(urunler.filter(u => u.id !== id));

  const filtered = urunler.filter(u => {
    return (selectedCategory ? u.kategori === selectedCategory : true) &&
           (fRenk ? u.renk === fRenk : true) &&
           (fBeden ? u.beden === fBeden : true);
  });

  return (
    <div style={{ padding: '20px' }}>
      {/* Maddeler 1 & 2: Yükleme Formu */}
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
        <h4>📦 Ürün & Fotoğraf Yükle (Admin)</h4>
        <form onSubmit={urunEkle} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input placeholder="Ad" value={yeni.ad} onChange={e => setYeni({...yeni, ad: e.target.value})} required />
          <input placeholder="Fiyat" type="number" value={yeni.fiyat} onChange={e => setYeni({...yeni, fiyat: e.target.value})} required />
          <input placeholder="Foto URL" value={yeni.resim} onChange={e => setYeni({...yeni, resim: e.target.value})} required />
          <input placeholder="Renk" value={yeni.renk} onChange={e => setYeni({...yeni, renk: e.target.value})} />
          <input placeholder="Beden" value={yeni.beden} onChange={e => setYeni({...yeni, beden: e.target.value})} />
          <button type="submit" style={{ background: 'green', color: 'white' }}>Yayınla</button>
        </form>
      </div>

      {/* Maddeler 3 & 4: Filtreleme */}
      <div style={{ marginBottom: '20px' }}>
        <select onChange={e => setFRenk(e.target.value)}>
          <option value="">Renk Filtrele</option>
          <option value="Lacivert">Lacivert</option>
          <option value="Siyah">Siyah</option>
          <option value="Gri">Gri</option>
        </select>
        <select onChange={e => setFBeden(e.target.value)} style={{ marginLeft: '10px' }}>
          <option value="">Beden Filtrele</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {filtered.map(u => (
          <div key={u.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '12px' }}>
            <img src={u.resim} alt={u.ad} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <h5>{u.ad}</h5>
            <p>{u.fiyat} TL</p>
            <button onClick={() => addToCart(u)} style={{ width: '100%', background: '#1e3a8a', color: 'white' }}>Sepete Ekle</button>
            <button onClick={() => urunSil(u.id)} style={{ width: '100%', background: 'red', color: 'white', marginTop: '5px' }}>Ürünü Sil (Madde 5)</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UrunDetay;