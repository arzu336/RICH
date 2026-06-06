import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = ({ setActiveTab }) => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = emailValid && password.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!emailValid) {
      setError("Geçerli bir email adresi girin.");
      return;
    }
    if (!password) {
      setError("Parola boş bırakılamaz.");
      return;
    }

    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        setActiveTab("hesabim");
      } else {
        setError("Email veya parola hatalı.");
      }
    } catch {
      setError("Sunucuya bağlanılamadı. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Logo */}
        <div style={styles.logoArea}>
          <div style={styles.logo}>RICH</div>
          <div style={styles.logoSub}>Premium E-Ticaret</div>
        </div>

        <h2 style={styles.title}>Giriş Yap</h2>
        <p style={styles.subtitle}>Hesabınıza erişmek için bilgilerinizi girin.</p>

        <form onSubmit={handleSubmit} noValidate style={styles.form}>

          {/* Email */}
          <div style={styles.field}>
            <label style={styles.label}>Email Adresi</label>
            <input
              type="email"
              placeholder="ornek@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              style={{
                ...styles.input,
                borderColor: error && !emailValid ? "#e57373" : "#1e2d4a",
              }}
            />
          </div>

          {/* Parola */}
          <div style={styles.field}>
            <label style={styles.label}>Parola</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              style={{
                ...styles.input,
                borderColor: error && !password ? "#e57373" : "#1e2d4a",
              }}
            />
          </div>

          {/* Hata mesajı */}
          {error && (
            <div style={styles.errorBox}>
              {error}
            </div>
          )}

          {/* Giriş Butonu */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            style={{
              ...styles.button,
              opacity: !isFormValid || loading ? 0.5 : 1,
              cursor: !isFormValid || loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        {/* Kayıt yönlendirme */}
        <div style={styles.divider} />
        <p style={styles.registerText}>
          Hesabınız yok mu?{" "}
          <span
            onClick={() => setActiveTab("register")}
            style={styles.link}
          >
            Kayıt Ol
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    background: "#0a0f1e",
  },
  card: {
    background: "#0d1526",
    border: "1px solid #1e2d4a",
    borderRadius: "12px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
  },
  logoArea: {
    textAlign: "center",
    marginBottom: "32px",
  },
  logo: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "28px",
    fontWeight: "400",
    letterSpacing: "10px",
    color: "#ffffff",
    textTransform: "uppercase",
  },
  logoSub: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "10px",
    letterSpacing: "3px",
    color: "#c8a96e",
    textTransform: "uppercase",
    marginTop: "6px",
  },
  title: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "22px",
    fontWeight: "400",
    color: "#f0f0f0",
    marginBottom: "8px",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "12px",
    color: "#4a5568",
    letterSpacing: "0.5px",
    textAlign: "center",
    marginBottom: "32px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "11px",
    fontWeight: "400",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#a0aec0",
  },
  input: {
    background: "#111f3a",
    border: "1px solid #1e2d4a",
    borderRadius: "4px",
    padding: "12px 16px",
    color: "#f0f0f0",
    fontFamily: "'Jost', sans-serif",
    fontSize: "13px",
    outline: "none",
    transition: "border-color 0.2s",
    width: "100%",
  },
  errorBox: {
    background: "rgba(229, 115, 115, 0.1)",
    border: "1px solid rgba(229, 115, 115, 0.3)",
    borderRadius: "4px",
    padding: "10px 14px",
    color: "#e57373",
    fontFamily: "'Jost', sans-serif",
    fontSize: "12px",
    letterSpacing: "0.5px",
  },
  button: {
    background: "#ffffff",
    color: "#0a0f1e",
    border: "none",
    borderRadius: "4px",
    padding: "14px",
    fontFamily: "'Jost', sans-serif",
    fontSize: "11px",
    fontWeight: "500",
    letterSpacing: "3px",
    textTransform: "uppercase",
    transition: "all 0.2s",
    marginTop: "4px",
    width: "100%",
  },
  divider: {
    borderTop: "1px solid #1e2d4a",
    margin: "28px 0",
  },
  registerText: {
    textAlign: "center",
    fontFamily: "'Jost', sans-serif",
    fontSize: "13px",
    color: "#4a5568",
  },
  link: {
    color: "#c8a96e",
    cursor: "pointer",
    letterSpacing: "0.5px",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },
};

export default Login;
