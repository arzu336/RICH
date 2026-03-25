import React, { useState } from 'react'

function Odeme() {
  const [isim, setIsim] = useState('')

  const odemeYap = async () => {
    // BURASI API BAĞLANTISI: Kendi API linkini buraya yazacaksın
    const response = await fetch('https://senin-api-linkin.com/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kullanici: isim, tutar: 100 })
    })
    
    if(response.ok) alert("Ödeme başarıyla veritabanına kaydedildi!")
  }

  return (
    <div style={{padding: '20px'}}>
      <h2>1. Ödeme Yapma Sayfası</h2>
      <input 
        placeholder="Kart Sahibinin Adı" 
        onChange={(e) => setIsim(e.target.value)} 
      />
      <button onClick={odemeYap}>Ödemeyi Tamamla</button>
    </div>
  )
}

export default Odeme