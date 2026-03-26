import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = ({ setActiveTab }) => { 
  const { register } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password); // test için
    register(name, email, password);
    setActiveTab('login'); // Kayıt sonrası otomatik olarak giriş sayfasına yönlendir
  };

  return (
    <div className="login-page">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ad Soyad"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register;