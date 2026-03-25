import React from 'react'
import Odeme from './odeme'
import Arama from './arama'
import Favoriler from './favoriler'
import Sepet from './sepet'
import UrunDetay from './UrunDetay'
import Yorumlar from './Yorumlar'
import Kategori from './Kategori'
import Siparislerim from './Siparislerim'

function App() {
  return (
    <div style={{ backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Rojda Yıldız - Proje Paneli</h1>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Odeme />
        <Arama />
        <Favoriler />
        <Sepet />
        <UrunDetay />
        <Yorumlar />
        <Kategori />
        <Siparislerim />
      </div>
    </div>
  )
}

export default App