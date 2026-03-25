import React, { useState } from 'react'
import './App.css'
import Odeme from './odeme'
import Adres from './adres'
import Arama from './arama'
import Favoriler from './favoriler'
import Sepet from './sepet'
import UrunDetay from './UrunDetay'
import Yorumlar from './Yorumlar'
import Siparislerim from './Siparislerim'

function App() {
  const [activeTab, setActiveTab] = useState('magaza');

  return (
    <div className="rich-shop-layout">
      <nav className="navbar-modern">
        <div className="logo-section">💎 RICH</div>
        <div className="nav-links-modern">
          <button onClick={() => setActiveTab('magaza')}>MAĞAZA</button>
          <div className="dropdown-modern">
            <button className="dropbtn-modern">KATEGORİLER ▾</button>
            <div className="dropdown-content-modern">
              <a href="#">KADIN</a> <a href="#">ERKEK</a> <a href="#">AKSESUAR</a>
            </div>
          </div>
          <button onClick={() => setActiveTab('favoriler')}>FAVORİLER</button>
          <button onClick={() => setActiveTab('hesabim')}>HESABIM</button>
        </div>
        <div className="nav-right">
          <Arama />
          <button className="cart-icon-btn" onClick={() => setActiveTab('sepet')}>🛒</button>
        </div>
      </nav>

      <main className="content-modern">
        {activeTab === 'magaza' && <UrunDetay />}
        {activeTab === 'favoriler' && <Favoriler />}
        {activeTab === 'sepet' && <div className="checkout-layout"><Sepet /><Odeme /></div>}
       {activeTab === 'hesabim' && <div className="profile-layout"><Adres /><Siparislerim /><Yorumlar /></div>}
      </main>

      <footer className="footer-modern">
        <p>© 2026 RICH E-Commerce | SDÜ Bilgisayar Mühendisliği</p>
      </footer>
    </div>
  )
}
export default App