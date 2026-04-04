import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // Madde 6: Sepet listesi

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      return true;
    }
    return false;
  };

  const register = (name, email, password) => {
    const newUser = { name, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => { setUser(null); localStorage.removeItem("user"); };

  // Madde 7: Sepete Ürün Ekleme
  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, cartId: Date.now() }]);
    alert(`${product.ad} sepete eklendi! 🛒`);
  };

  // Madde 8: Sepetten Ürün Silme
  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter(item => item.cartId !== cartId));
  };

  const deleteAccount = () => { localStorage.removeItem("user"); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, cart, addToCart, removeFromCart, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};