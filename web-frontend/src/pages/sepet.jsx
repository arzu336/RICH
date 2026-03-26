import React from 'react';

function Sepet() {
  const sepetiOnayla = async () => {
    // API'ye sepet verilerini gönderir
    await fetch('https://senin-api-linkin.com/cart/checkout', {
      method: 'POST',
      body: JSON.stringify({ userId: 1, items: [101, 102] })
    });
    alert("Sepet onaylandı! Veritabanında 'Orders' tablosuna bak.");
  };

  return (
    <div style={{padding: '10px', borderBottom: '1px solid #444'}}>
      <h3>4. Sepet İşlemleri</h3>
      <button onClick={sepetiOnayla}>Sepeti Onayla</button>
    </div>
  );
}
export default Sepet;