import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = ({ setActiveTab }) => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);

    if (success) {
      setActiveTab("hesabim");
    } else {
      alert("Hatalı giriş");
    }
  };

  return (
    <div className="login-page">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Giriş</button>
      </form>
    </div>
  );
};

export default Login;