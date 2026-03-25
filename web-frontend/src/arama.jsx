import React, { useState } from 'react';

function Arama() {
  const [term, setTerm] = useState('');
  const [sonuc, setSonuc] = useState([]);

  const ara = async () => {
    const res = await fetch(`https://senin-api-linkin.com/products/search?q=${term}`);
    const data = await res.json();
    setSonuc(data);
  };

  return (
    <div style={{padding: '10px', borderBottom: '1px solid #444'}}>
      <h3>2. Ürün Arama</h3>
      <input placeholder="Ürün adı..." onChange={(e) => setTerm(e.target.value)} />
      <button onClick={ara}>Ara</button>
    </div>
  );
}
export default Arama;