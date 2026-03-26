import React, { useState } from 'react';

function Siparislerim() {
  const [siparisler, setSiparisler] = useState([]);

  const gecmisiGetir = async () => {
    const res = await fetch('https://senin-api-linkin.com/orders/user/1');
    const data = await res.json();
    setSiparisler(data);
  };

  return (
    <div style={{padding: '10px', borderBottom: '1px solid #444'}}>
      <h3>8. Sipariş Geçmişi</h3>
      <button onClick={gecmisiGetir}>Geçmişi Listele (GET)</button>
      <ul>
        {siparisler.map((s, i) => <li key={i}>Sipariş ID: {s.id} - Tutar: {s.total}TL</li>)}
      </ul>
    </div>
  );
}
export default Siparislerim;