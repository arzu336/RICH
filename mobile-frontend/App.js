import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert, TouchableWithoutFeedback } from "react-native";
import { StatusBar } from "expo-status-bar";
import AuthScreen from "./screens/AuthScreen";
import BuketMobileFrontend from "./screens/BuketMobileFrontend";
import ArzuMobileFrontend from "./screens/ArzuMobileFrontend";

export default function App() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); 

  // Hesap Silme Akışı (Global listeden kalıcı olarak siler)
  const handleDeleteAccount = () => {
    setMenuOpen(false); 
    Alert.alert(
      "Hesabı Kalıcı Olarak Sil",
      "Hesabınızı sistemden tamamen silmek istediğinize emin misiniz?",
      [
        { text: "Vazgeç", style: "cancel" },
        { 
          text: "Evet, Sil", 
          style: "destructive",
          onPress: () => {
            if (window.GLOBAL_USERS) {
              // Kullanıcıyı e-posta adresine göre listeden bulup uçuruyoruz
              const index = window.GLOBAL_USERS.findIndex(u => u.email === user.email);
              if (index !== -1) {
                window.GLOBAL_USERS.splice(index, 1);
              }
            }
            Alert.alert("Başarılı", "Hesabınız veritabanından tamamen silindi.");
            setUser(null); // Oturumu kapatıp giriş ekranına fırlatır
          }
        }
      ]
    );
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.page}>
        <StatusBar style="light" />
        <AuthScreen onLogin={setUser} />
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => setMenuOpen(false)}>
      <SafeAreaView style={styles.page}>
        <StatusBar style="light" />
        
        {/* Üst Bar */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.logo}>RICH</Text>
            <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} activeOpacity={0.7} style={styles.profileClick}>
              <Text style={styles.userText}>
                {user.name} ▾ <Text style={styles.roleSub}>({user.role === "arzu" ? "Arzu FE" : "Buket FE"})</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Açılır Menü */}
        {menuOpen && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => { setUser(null); setMenuOpen(false); }}>
              <Text style={styles.logoutText}>🚪 Oturumu Kapat (Çıkış)</Text>
            </TouchableOpacity>
            
            {user.role === "arzu" && (
              <TouchableOpacity style={[styles.menuItem, styles.borderTop]} onPress={handleDeleteAccount}>
                <Text style={styles.deleteText}>🗑️ Hesabı Tamamen Sil</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* İçerik Ekranı */}
        <View style={{ flex: 1 }}>
          {user.role === "arzu" ? <ArzuMobileFrontend /> : <BuketMobileFrontend />}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#071122" },
  topBar: { paddingTop: 34, paddingHorizontal: 18, paddingBottom: 12, backgroundColor: "#071122", borderBottomColor: "#1e2d4a", borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  logo: { color: "#fff", fontSize: 24, letterSpacing: 9, fontWeight: "700" },
  profileClick: { marginTop: 4, paddingVertical: 2 },
  userText: { color: "#d7ad5b", fontSize: 13, fontWeight: "700" },
  roleSub: { color: "#8ea0ba", fontSize: 11, fontWeight: "400" },
  dropdownMenu: { position: "absolute", top: 85, left: 18, right: 18, backgroundColor: "#0b162b", borderColor: "#223452", borderWidth: 1, borderRadius: 12, zIndex: 999, padding: 4 },
  menuItem: { paddingVertical: 14, paddingHorizontal: 16 },
  borderTop: { borderTopColor: "#1e2d4a", borderTopWidth: 1 },
  logoutText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  deleteText: { color: "#ff4d4d", fontWeight: "600", fontSize: 13 }
});