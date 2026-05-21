import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Sepet() {
  const { cart, removeFromCart } = useContext(AuthContext); // Madde 6 & 8
  const toplam = cart.reduce((acc, item) => acc + item.fiyat, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h3>🛒 Sepetim ({cart.length} Ürün)</h3>
      {cart.length === 0 ? <p>Sepetiniz boş.</p> : (
        <>
          {cart.map(item => (
            <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
              <span>{item.ad} - {item.fiyat} TL</span>
              <button onClick={() => removeFromCart(item.cartId)} style={{ color: 'red', cursor: 'pointer' }}>Sil 🗑️</button>
            </div>
          ))}
          <h4 style={{ textAlign: 'right', marginTop: '20px' }}>Toplam: {toplam} TL</h4>
        </>
      )}
    </div>
  );
}

export default Sepet;