import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = ({ setActiveTab }) => { 
  const { register } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => { // Buraya "async" eklemeyi unutma
  e.preventDefault();
  
  // SENİN MEVCUT KODLARIN (Bunlara dokunmuyoruz)
  console.log(name, email, password); 
  register(name, email, password);

  // --- YENİ EKLEYECEĞİMİZ KISIM (Veritabanına Gönderim) ---
  try {
    await fetch('http://localhost:8080/kaydet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        isim: name, 
        email: email 
      }),
    });
  } catch (error) {
    console.log("DB Baglanti Hatasi:", error);
  }
  // -------------------------------------------------------

  setActiveTab('login'); // Mevcut yönlendirmen duruyor
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