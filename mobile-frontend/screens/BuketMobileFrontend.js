import React, { useMemo, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { products } from "../data/demoProducts";

export default function BuketMobileFrontend() {
  const [category, setCategory] = useState("Tümü");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const filteredProducts = useMemo(() => category === "Tümü" ? products : products.filter((p) => p.category === category), [category]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    Alert.alert("Sepete Eklendi", product.name);
  };

  const toggleFavorite = (product) => {
    setFavorites((prev) => prev.find((x) => x.id === product.id) ? prev.filter((x) => x.id !== product.id) : [...prev, product]);
  };

  const renderProduct = ({ item }) => {
    const isFavorite = favorites.find((p) => p.id === item.id);
    return (
      <View style={styles.productCard}>
        <View style={styles.productImage}><Text style={styles.productImageText}>RICH</Text></View>
        <View style={styles.productBody}>
          <Text style={styles.productMeta}>{item.category} · {item.color} · {item.size}</Text>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price} TL</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.primaryButton} onPress={() => addToCart(item)}><Text style={styles.primaryButtonText}>Sepete Ekle</Text></TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => toggleFavorite(item)}><Text style={styles.iconButtonText}>{isFavorite ? "♥" : "♡"}</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <View><Text style={styles.kicker}>BUKET / MOBILE FRONT-END</Text><Text style={styles.title}>Mobil Mağaza</Text></View>
        <View style={styles.statsBox}><Text style={styles.stat}>♡ {favorites.length}</Text><Text style={styles.stat}>🛒 {cart.length}</Text></View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryBar}>
        {["Tümü", "Kadın", "Erkek", "Bebek"].map((item) => (
          <TouchableOpacity key={item} style={[styles.categoryButton, category === item && styles.categoryButtonActive]} onPress={() => setCategory(item)}>
            <Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList data={filteredProducts} keyExtractor={(item) => item.id} renderItem={renderProduct} contentContainerStyle={styles.list} />
      <View style={styles.bottomPanel}><Text style={styles.bottomText}>Sepet: {cart.length} ürün</Text><Text style={styles.bottomText}>Toplam: {cart.reduce((s, i) => s + i.price, 0)} TL</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 20 },
  header: { paddingTop: 12, marginBottom: 18, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  kicker: { color: "#d7ad5b", fontSize: 11, letterSpacing: 2, marginBottom: 6 },
  title: { color: "#fff", fontSize: 30, fontWeight: "700" },
  statsBox: { backgroundColor: "#0d1b33", borderColor: "#243653", borderWidth: 1, borderRadius: 14, padding: 10, minWidth: 82 },
  stat: { color: "#fff", fontSize: 15, textAlign: "right", marginBottom: 4 },
  categoryBar: { marginBottom: 14, maxHeight: 42 },
  categoryButton: { borderColor: "#2b3f62", borderWidth: 1, borderRadius: 999, paddingVertical: 9, paddingHorizontal: 14, marginRight: 8, backgroundColor: "#091326" },
  categoryButtonActive: { backgroundColor: "#d7ad5b" },
  categoryText: { color: "#a7b4c7", fontWeight: "700" },
  categoryTextActive: { color: "#071122" },
  list: { paddingBottom: 110 },
  productCard: { backgroundColor: "#0d1b33", borderColor: "#243653", borderWidth: 1, borderRadius: 18, overflow: "hidden", marginBottom: 16 },
  productImage: { height: 135, backgroundColor: "#d7ad5b", justifyContent: "center", alignItems: "center" },
  productImageText: { color: "#071122", fontSize: 34, fontWeight: "700", letterSpacing: 8 },
  productBody: { padding: 16 },
  productMeta: { color: "#64748b", letterSpacing: 2, fontSize: 11, marginBottom: 7 },
  productName: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 8 },
  productPrice: { color: "#d7ad5b", fontSize: 18, marginBottom: 14 },
  row: { flexDirection: "row", gap: 10 },
  primaryButton: { backgroundColor: "#d7ad5b", paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, flex: 1, alignItems: "center" },
  primaryButtonText: { color: "#071122", fontWeight: "700" },
  iconButton: { borderColor: "#334155", borderWidth: 1, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10 },
  iconButtonText: { color: "#fff", fontSize: 18 },
  bottomPanel: { position: "absolute", left: 20, right: 20, bottom: 20, backgroundColor: "#0d1b33", borderColor: "#243653", borderWidth: 1, borderRadius: 16, padding: 14 },
  bottomText: { color: "#fff", fontWeight: "700", marginBottom: 2 },
});
