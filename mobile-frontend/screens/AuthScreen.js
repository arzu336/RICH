import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

// Uygulama açık olduğu sürece globalde yaşayacak kullanıcı listesi
if (!window.GLOBAL_USERS) {
  window.GLOBAL_USERS = [
    { id: 1, name: "Arzu KÜÇÜK", email: "arzu@rich.com", password: "123456", role: "arzu" },
    { id: 2, name: "Buket KARACALI", email: "buket@rich.com", password: "123456", role: "buket" }
  ];
}

export default function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [selectedUser, setSelectedUser] = useState("arzu"); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    if (!email || !password) {
      return Alert.alert("Eksik Bilgi", "E-posta ve şifre zorunludur.");
    }

    if (mode === "register") {
      if (!name) return Alert.alert("Eksik Bilgi", "Ad Soyad zorunludur.");
      
      // Yeni kayıt ekleme
      const newUser = {
        id: window.GLOBAL_USERS.length + 1,
        name,
        email,
        password,
        role: selectedUser
      };
      window.GLOBAL_USERS.push(newUser); 
      
      Alert.alert("Başarılı", "Hesabınız başarıyla oluşturuldu! Şimdi giriş yapabilirsiniz.");
      setMode("login"); 
      setPassword("");  
    } else {
      // Giriş kontrolü global listeden yapılıyor
      const foundUser = window.GLOBAL_USERS.find(u => u.email === email && u.password === password && u.role === selectedUser);
      
      if (foundUser) {
        onLogin(foundUser); 
      } else {
        Alert.alert("Hata", "E-posta, şifre veya seçilen modül hatalı ya da hesap silinmiş!");
      }
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <Text style={styles.logo}>RICH</Text>
        
        <View style={styles.moduleSelector}>
          <TouchableOpacity 
            style={[styles.moduleBtn, selectedUser === "arzu" && styles.activeModuleBtn]} 
            onPress={() => { setSelectedUser("arzu"); setEmail("arzu@rich.com"); }}
          >
            <Text style={[styles.moduleBtnText, selectedUser === "arzu" && styles.activeModuleText]}>ARZU MODÜLÜ</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.moduleBtn, selectedUser === "buket" && styles.activeModuleBtn]} 
            onPress={() => { setSelectedUser("buket"); setEmail("buket@rich.com"); }}
          >
            <Text style={[styles.moduleBtnText, selectedUser === "buket" && styles.activeModuleText]}>BUKET MODÜLÜ</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{mode === "login" ? "Giriş Yap" : "Kayıt Ol"}</Text>

        {mode === "register" && (
          <TextInput style={styles.input} placeholder="Ad Soyad" placeholderTextColor="#60718d" value={name} onChangeText={setName} />
        )}
        <TextInput style={styles.input} placeholder="E-posta" placeholderTextColor="#60718d" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Şifre" placeholderTextColor="#60718d" value={password} onChangeText={setPassword} secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>{mode === "login" ? "Giriş Yap" : "Kayıt Ol"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setMode(mode === "login" ? "register" : "login"); setName(""); }}>
          <Text style={styles.switchText}>{mode === "login" ? "Hesabın yok mu? Kayıt ol" : "Hesabın var mı? Giriş yap"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#071122", justifyContent: "center", padding: 18 },
  card: { backgroundColor: "#0b162b", borderColor: "#223452", borderWidth: 1, borderRadius: 22, padding: 20 },
  logo: { color: "#fff", fontSize: 38, letterSpacing: 13, textAlign: "center", marginBottom: 12, fontWeight: "700" },
  title: { color: "#fff", fontSize: 25, fontWeight: "700", textAlign: "center", marginBottom: 18 },
  input: { backgroundColor: "#101f39", borderColor: "#2b4064", borderWidth: 1, color: "#fff", borderRadius: 12, padding: 14, marginBottom: 10 },
  button: { backgroundColor: "#d7ad5b", borderRadius: 12, padding: 14, alignItems: "center", marginTop: 4 },
  buttonText: { color: "#071122", fontWeight: "800" },
  switchText: { color: "#d7ad5b", textAlign: "center", marginTop: 15, fontWeight: "700" },
  moduleSelector: { flexDirection: "row", backgroundColor: "#101f39", borderRadius: 10, padding: 4, marginBottom: 15, borderColor: "#2b4064", borderWidth: 1 },
  moduleBtn: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 8 },
  activeModuleBtn: { backgroundColor: "#2b4064" },
  moduleBtnText: { color: "#60718d", fontSize: 10, fontWeight: "700" },
  activeModuleText: { color: "#d7ad5b" }
});