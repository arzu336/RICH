import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("Demo Kullanıcı");
  const [email, setEmail] = useState("demo@rich.com");
  const [password, setPassword] = useState("123456");

  const submit = () => {
    if (!email || !password) {
      Alert.alert("Eksik Bilgi", "E-posta ve şifre zorunludur.");
      return;
    }

    const user = { id: 1, name: name || "Demo Kullanıcı", email, token: "mobile-demo-token" };
    Alert.alert(mode === "login" ? "Giriş Başarılı" : "Kayıt Başarılı", `${user.email} ile devam ediliyor.`);
    onLogin(user);
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.logo}>RICH</Text>
      <Text style={styles.title}>{mode === "login" ? "Giriş Yap" : "Kayıt Ol"}</Text>
      <Text style={styles.desc}>Mobil uygulama videosu için demo kullanıcı sistemi.</Text>

      {mode === "register" && (
        <TextInput style={styles.input} placeholder="Ad Soyad" placeholderTextColor="#64748b" value={name} onChangeText={setName} />
      )}

      <TextInput style={styles.input} placeholder="E-posta" placeholderTextColor="#64748b" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Şifre" placeholderTextColor="#64748b" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>{mode === "login" ? "Giriş Yap" : "Kayıt Ol"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setMode(mode === "login" ? "register" : "login")}>
        <Text style={styles.switchText}>{mode === "login" ? "Hesabın yok mu? Kayıt ol" : "Hesabın var mı? Giriş yap"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#071122", paddingHorizontal: 24, paddingTop: 70 },
  logo: { color: "#fff", fontSize: 44, letterSpacing: 14, textAlign: "center", marginBottom: 34, fontWeight: "700" },
  title: { color: "#d7ad5b", fontSize: 30, fontWeight: "700", marginBottom: 10 },
  desc: { color: "#a7b4c7", fontSize: 15, lineHeight: 22, marginBottom: 24 },
  input: { backgroundColor: "#0d1b33", borderColor: "#243653", borderWidth: 1, color: "#fff", borderRadius: 12, padding: 14, marginBottom: 12 },
  button: { backgroundColor: "#d7ad5b", borderRadius: 12, padding: 15, alignItems: "center", marginTop: 6 },
  buttonText: { color: "#071122", fontWeight: "800" },
  switchText: { color: "#d7ad5b", textAlign: "center", marginTop: 18, fontWeight: "700" },
});
