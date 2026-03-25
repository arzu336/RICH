import React from 'react';

function Kategori() {
  const filtrele = async (kat) => {
    await fetch(`https://senin-api-linkin.com/products?category=${kat}`);
    alert(`${kat} kategorisindeki ürünler filtrelendi.`);
  };

  return (
    <div style={{padding: '10px', borderBottom: '1px solid #444'}}>
      <h3>7. Kategori Filtreleme</h3>
      <button onClick={() => filtrele('Elektronik')}>Elektronik</button>
      <button onClick={() => filtrele('Giyim')}>Giyim</button>
    </div>
  );
}
export default Kategori;