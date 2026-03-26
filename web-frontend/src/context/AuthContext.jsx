import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // REGISTER
  const register = (name, email, password) => {
    const newUser = { name, email, password };

    localStorage.setItem("user", JSON.stringify(newUser));
    alert("Kayıt başarılı!");

    setUser(newUser);
  };

  // LOGIN
  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      setUser(storedUser);
      alert("Giriş başarılı!");
    } else {
      alert("Email veya şifre yanlış!");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};