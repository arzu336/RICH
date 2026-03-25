import React from 'react';

function Favoriler() {
  const favoriyeEkle = async (id) => {
    await fetch('https://senin-api-linkin.com/favorites', {
      method: 'POST',
      body: JSON.stringify({ productId: id })
    });
    alert("Favorilere eklendi! (Videoda DB'yi göster)");
  };

  return (
    <div style={{padding: '10px', borderBottom: '1px solid #444'}}>
      <h3>3. Favorilere Ekleme</h3>
      <button onClick={() => favoriyeEkle(101)}>Örnek Ürünü Favorile</button>
    </div>
  );
}
export default Favoriler;