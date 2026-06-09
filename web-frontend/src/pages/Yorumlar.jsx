import React, { useState } from 'react';

function Yorumlar() {
  const [yorum, setYorum] = useState('');

  const yorumYap = async () => {
    await fetch('https://senin-api-linkin.com/comments', {
      method: 'POST',
      body: JSON.stringify({ text: yorum, date: new Date().toISOString() })
    });
    alert("Yorum kaydedildi! MongoDB'de 'Comments' kısmını göster.");
  };

  return (
    <div style={{padding: '10px', borderBottom: '1px solid #444'}}>
      <h3>6. Yorum ve Değerlendirme</h3>
      <textarea placeholder="Yorumunuz..." onChange={(e) => setYorum(e.target.value)} />
      <button onClick={yorumYap}>Gönder</button>
    </div>
  );
}
export default Yorumlar;