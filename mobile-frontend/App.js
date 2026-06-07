import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import AuthScreen from "./screens/AuthScreen";
import BuketMobileFrontend from "./screens/BuketMobileFrontend";
import RojdaMobileBackend from "./screens/RojdaMobileBackend";

export default function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("home");

  if (!user) {
    return <SafeAreaView style={styles.page}><StatusBar style="light" /><AuthScreen onLogin={setUser} /></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar style="light" />
      {screen !== "home" && <TouchableOpacity style={styles.backButton} onPress={() => setScreen("home")}><Text style={styles.backText}>← Geri</Text></TouchableOpacity>}
      {screen === "home" && <View style={styles.home}>
        <Text style={styles.logo}>RICH</Text><Text style={styles.welcome}>Hoş geldin, {user.name}</Text><Text style={styles.title}>Mobil Görev Ekranları</Text><Text style={styles.desc}>Buket ve Rojda için ayrı mobil görev sayfaları.</Text>
        <TouchableOpacity style={styles.card} onPress={() => setScreen("buket")}><Text style={styles.kicker}>BUKET</Text><Text style={styles.cardTitle}>Mobile Front-End</Text><Text style={styles.cardDesc}>Ürün listeleme, kategori, favori ve sepet.</Text></TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => setScreen("rojda")}><Text style={styles.kicker}>ROJDA</Text><Text style={styles.cardTitle}>Mobile Back-End</Text><Text style={styles.cardDesc}>Endpoint, JSON response ve test simülasyonu.</Text></TouchableOpacity>
        <TouchableOpacity style={styles.logout} onPress={() => setUser(null)}><Text style={styles.logoutText}>Çıkış Yap</Text></TouchableOpacity>
      </View>}
      {screen === "buket" && <BuketMobileFrontend />}
      {screen === "rojda" && <RojdaMobileBackend />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#071122" }, home: { flex: 1, paddingHorizontal: 24, paddingTop: 64 },
  logo: { color: "#fff", fontSize: 44, letterSpacing: 14, textAlign: "center", marginBottom: 18, fontWeight: "700" }, welcome: { color: "#a7b4c7", textAlign: "center", marginBottom: 26 },
  title: { color: "#d7ad5b", fontSize: 30, fontWeight: "700", marginBottom: 10 }, desc: { color: "#a7b4c7", fontSize: 15, lineHeight: 22, marginBottom: 24 },
  card: { backgroundColor: "#0d1b33", borderColor: "#243653", borderWidth: 1, borderRadius: 18, padding: 20, marginBottom: 16 }, kicker: { color: "#d7ad5b", fontSize: 12, letterSpacing: 2, marginBottom: 8 },
  cardTitle: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 8 }, cardDesc: { color: "#a7b4c7", lineHeight: 20 },
  backButton: { marginTop: 42, marginLeft: 20, marginBottom: 8 }, backText: { color: "#d7ad5b", fontSize: 16, fontWeight: "700" },
  logout: { borderColor: "#334155", borderWidth: 1, borderRadius: 12, padding: 14, marginTop: 10, alignItems: "center" }, logoutText: { color: "#fff", fontWeight: "700" },
});
