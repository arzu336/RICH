import React, { useState } from 'react'
import './App.css'
import Odeme from './pages/odeme'
import Adres from './pages/adres'
import Arama from './components/arama'
import Favoriler from './pages/favoriler'
import Sepet from './pages/sepet'
import UrunDetay from './pages/UrunDetay'
import Yorumlar from './pages/Yorumlar'
import Siparislerim from './pages/Siparislerim'
import Login from './pages/Login'
import Register from './pages/Register'

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
          <button onClick={() => setActiveTab('login')}>GİRİŞ</button>
          <button onClick={() => setActiveTab('register')}>KAYIT</button>
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
        {activeTab === 'login' && <Login />}
        {activeTab === 'register' && <Register setActiveTab={setActiveTab} />}

        
      </main>

      <footer className="footer-modern">
        <p>© 2026 RICH E-Commerce | SDÜ Bilgisayar Mühendisliği</p>
      </footer>
    </div>
  )
}
export default App