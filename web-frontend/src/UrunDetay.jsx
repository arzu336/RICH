import React, { useState } from 'react';

function UrunDetay() {
  const [detay, setDetay] = useState(null);

  const detayGetir = async () => {
    const res = await fetch('https://senin-api-linkin.com/products/101');
    const data = await res.json();
    setDetay(data);
  };

  return (
    <div style={{padding: '10px', borderBottom: '1px solid #444'}}>
      <h3>5. Ürün Detay Sayfası</h3>
      <button onClick={detayGetir}>Ürün Detaylarını Çek (GET)</button>
      {detay && <p>Ürün Adı: {detay.name} - Stok: {detay.stock}</p>}
    </div>
  );
}
export default UrunDetay;