import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { products } from "../data/demoProducts";

const apiEndpoints = {
  products: { method: "GET", path: "/api/products", description: "Mobil uygulama için ürün listesini döner.", response: { success: true, count: products.length, data: products.slice(0, 4).map((p) => ({ id: p.id, name: p.name, price: p.price, category: p.category })) } },
  detail: { method: "GET", path: "/api/products/1", description: "Seçilen ürünün detay bilgisini döner.", response: { success: true, data: products[0] } },
  login: { method: "POST", path: "/api/auth/login", description: "Mobil kullanıcı giriş isteğini simüle eder.", response: { success: true, token: "mobile-demo-token", user: { id: 1, username: "mobile_user", role: "customer" } } },
  cart: { method: "POST", path: "/api/cart", description: "Mobil sepete ürün ekleme isteğini simüle eder.", response: { success: true, cartId: "RICH-CART-001", itemCount: 3 } },
  order: { method: "POST", path: "/api/orders", description: "Mobil sipariş oluşturma isteğini simüle eder.", response: { success: true, orderId: "RICH-MOB-2026-001", status: "created", total: 2920 } },
};

export default function RojdaMobileBackend() {
  const [selectedKey, setSelectedKey] = useState("products");
  const [testResult, setTestResult] = useState(null);
  const selected = apiEndpoints[selectedKey];
  const responseText = JSON.stringify(selected.response, null, 2);
  const runTest = () => setTestResult({ endpoint: selected.path, method: selected.method, status: 200, message: "API isteği başarıyla simüle edildi.", time: new Date().toLocaleTimeString("tr-TR") });

  return (
    <ScrollView style={styles.content} contentContainerStyle={styles.backendContent}>
      <View style={styles.header}><View><Text style={styles.kicker}>ROJDA / MOBILE BACK-END</Text><Text style={styles.title}>API Test Paneli</Text></View></View>
      <Text style={styles.sectionTitle}>Endpointler</Text>
      {Object.entries(apiEndpoints).map(([key, endpoint]) => (
        <TouchableOpacity key={key} style={[styles.endpointCard, selectedKey === key && styles.endpointCardActive]} onPress={() => setSelectedKey(key)}>
          <Text style={styles.endpointMethod}>{endpoint.method}</Text><Text style={styles.endpointPath}>{endpoint.path}</Text><Text style={styles.endpointDesc}>{endpoint.description}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.responseBox}>
        <Text style={styles.endpointMethod}>{selected.method}</Text><Text style={styles.responsePath}>{selected.path}</Text>
        <Text style={styles.jsonText}>{responseText}</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={runTest}><Text style={styles.primaryButtonText}>Test Çalıştır</Text></TouchableOpacity>
      </View>
      {testResult && <View style={styles.testResult}><Text style={styles.sectionTitle}>Son Test Sonucu</Text><Text style={styles.resultLine}>Endpoint: {testResult.endpoint}</Text><Text style={styles.resultLine}>Method: {testResult.method}</Text><Text style={styles.resultLine}>Status: {testResult.status}</Text><Text style={styles.resultLine}>Saat: {testResult.time}</Text><Text style={styles.successText}>{testResult.message}</Text></View>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 20 }, backendContent: { paddingBottom: 50 },
  header: { paddingTop: 12, marginBottom: 18, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  kicker: { color: "#d7ad5b", fontSize: 11, letterSpacing: 2, marginBottom: 6 }, title: { color: "#fff", fontSize: 30, fontWeight: "700" },
  sectionTitle: { color: "#d7ad5b", fontSize: 20, fontWeight: "700", marginBottom: 12 },
  endpointCard: { backgroundColor: "#0d1b33", borderColor: "#243653", borderWidth: 1, borderRadius: 16, padding: 14, marginBottom: 10 }, endpointCardActive: { borderColor: "#d7ad5b" },
  endpointMethod: { color: "#4ade80", fontWeight: "800", marginBottom: 4 }, endpointPath: { color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 4 }, endpointDesc: { color: "#a7b4c7", lineHeight: 19 },
  responseBox: { backgroundColor: "#0d1b33", borderColor: "#243653", borderWidth: 1, borderRadius: 16, padding: 16, marginTop: 10 }, responsePath: { color: "#fff", fontWeight: "700" },
  jsonText: { backgroundColor: "#050b16", borderColor: "#1f2f4a", borderWidth: 1, borderRadius: 12, color: "#b7e4c7", fontFamily: "monospace", padding: 14, lineHeight: 19 },
  primaryButton: { backgroundColor: "#d7ad5b", paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, alignItems: "center", marginTop: 10 }, primaryButtonText: { color: "#071122", fontWeight: "700" },
  testResult: { backgroundColor: "#0b1528", borderColor: "#243653", borderWidth: 1, borderRadius: 16, padding: 16, marginTop: 16 }, resultLine: { color: "#dbeafe", marginBottom: 6 }, successText: { color: "#4ade80", fontWeight: "700", marginTop: 8 },
});
