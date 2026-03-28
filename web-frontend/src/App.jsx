import React, { useState, useContext } from 'react'
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
import { AuthContext } from './context/AuthContext'
import Kategori from './components/Kategori' 


function App() {
  const [activeTab, setActiveTab] = useState('magaza');
  const [selectedCategory, setSelectedCategory] = useState("women's clothing");
  const { user, logout } = useContext(AuthContext)
  const { deleteAccount } = useContext(AuthContext);
  

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
          {user ? (
            <>
              <span>👤 Hoşgeldin {user.name || user.email}</span>
              <button onClick={() => {
                logout();
                setActiveTab("magaza");
              }}>
                ÇIKIŞ
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setActiveTab('login')}>GİRİŞ</button>
              <button onClick={() => setActiveTab('register')}>KAYIT</button>
            </>
          )}
          
        </div>
        <div className="nav-right">
          <Arama />
          <button className="cart-icon-btn" onClick={() => setActiveTab('sepet')}>🛒</button>
        </div>
      </nav>

      <main className="content-modern">
        {activeTab === 'magaza' && (
          <>
            <Kategori setSelectedCategory={setSelectedCategory} />
            <UrunDetay category={selectedCategory} />
          </>
        )}
        {activeTab === 'kadin' && <UrunDetay category="Kadın" />}
        {activeTab === 'erkek' && <UrunDetay category="Erkek" />}
        {activeTab === 'aksesuar' && <UrunDetay category="Aksesuar" />}
        {activeTab === 'favoriler' && <Favoriler />}
        {activeTab === 'sepet' && <div className="checkout-layout"><Sepet /><Odeme /></div>}
        {activeTab === 'hesabim' && <div className="profile-layout"><Adres /><Siparislerim /><Yorumlar />
        <button
        style={{background:"red", color:"white",marginTop:"20px"}}
        onClick={() => {
          const confirmDelete = window.confirm("Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.");
          if (confirmDelete) {
            deleteAccount();
            setActiveTab("magaza");
          }
        }}
      >
        HESABI SİL</button>
        </div>}
        {activeTab === 'login' && <Login setActiveTab={setActiveTab} />}
        {activeTab === 'register' && <Register setActiveTab={setActiveTab} />}

        
      </main>

      <footer className="footer-modern">
        <p>© 2026 RICH E-Commerce | SDÜ Bilgisayar Mühendisliği</p>
      </footer>
    </div>
  )
}
export default App