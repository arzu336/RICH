import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

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
      return true;
    } else {
      return false;
    }
  };

  const deleteAccount = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register , logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};