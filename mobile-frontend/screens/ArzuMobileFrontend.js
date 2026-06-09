import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";

export default function ArzuMobileFrontend() {
  const [currentCategory, setCurrentCategory] = useState("kadin");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // C# Web API, Docker, Redis ve RabbitMQ Bağlantılı Gerçek Fonksiyon
  const loadProducts = async (category) => {
    setLoading(true);
    try {
      // Bilgisayarının IP adresi ve Docker dosyasındaki backend portu (5227)
      const response = await fetch(`http://172.20.10.3:5227/api/Products?category=${category}`);
      
      if (!response.ok) {
        throw new Error("Docker backend veri göndermeyi reddetti.");
      }
      
      const data = await response.json();
      setProducts(data); // Docker'daki C# API'sinden gelen canlı veriler ekrana akıyor!
    } catch (error) {
      console.error("Veri çekme hatası:", error);
      Alert.alert(
        "Bağlantı Hatası", 
        "Docker üzerindeki API'ye ulaşılamadı! Bilgisayarda Docker'ın ayağa kalktığından ve telefonunla aynı Wi-Fi ağına bağlı olduğundan emin ol kanka."
      );
    } finally {
      setLoading(false);
    }
  };

  // Uygulama ilk açıldığında varsayılan olarak KADIN kategorisini yükler
  useEffect(() => {
    loadProducts("kadin");
  }, []);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    loadProducts(category); // Butona basıldığı an canlı API isteği fırlatır
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      {/* API'den gelen resim URL'ini basıyoruz */}
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDetails}>Renk: {item.renk} | Beden: {item.beden}</Text>
        <View style={styles.cardBottom}>
          <Text style={styles.productPrice}>{item.price} TL</Text>
          {/* C# modelindeki büyük 'Stok' alanı JSON olarak küçük 'stok' gelir */}
          <Text style={[styles.stockText, item.stok === 0 && styles.noStock]}>
            {item.stok > 0 ? `Stok: ${item.stok}` : "Tükendi"}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Kategoriler Barı */}
      <View style={styles.categoryBar}>
        {["kadin", "erkek", "bebek", "aksesuar"].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catButton, currentCategory === cat && styles.activeCatButton]}
            onPress={() => handleCategoryChange(cat)}
          >
            <Text style={[styles.catButtonText, currentCategory === cat && styles.activeCatText]}>
              {cat.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Ürün Listeleme Alanı */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#d7ad5b" />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductItem}
          contentContainerStyle={styles.listPadding}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071122" },
  categoryBar: { flexDirection: "row", backgroundColor: "#0b162b", paddingVertical: 10, borderBottomColor: "#1e2d4a", borderBottomWidth: 1 },
  catButton: { flex: 1, alignItems: "center", paddingVertical: 8, marginHorizontal: 4, borderRadius: 8 },
  activeCatButton: { backgroundColor: "#101f39", borderColor: "#2b4064", borderWidth: 1 },
  catButtonText: { color: "#60718d", fontSize: 11, fontWeight: "700" },
  activeCatText: { color: "#d7ad5b" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  listPadding: { padding: 14 },
  productCard: { flexDirection: "row", backgroundColor: "#0b162b", borderColor: "#223452", borderWidth: 1, borderRadius: 16, padding: 12, marginBottom: 12 },
  productImage: { width: 85, height: 85, borderRadius: 12, backgroundColor: "#101f39" },
  productInfo: { flex: 1, marginLeft: 14, justifyContent: "space-between" },
  productName: { color: "#fff", fontSize: 15, fontWeight: "700" },
  productDetails: { color: "#60718d", fontSize: 11, marginTop: 2 },
  cardBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  productPrice: { color: "#d7ad5b", fontSize: 16, fontWeight: "800" },
  stockText: { color: "#27ae60", fontSize: 12, fontWeight: "600", backgroundColor: "rgba(39, 174, 96, 0.1)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  noStock: { color: "#ff4d4d", backgroundColor: "rgba(255, 77, 77, 0.1)" }
});