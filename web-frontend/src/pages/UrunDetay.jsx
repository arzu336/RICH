import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function UrunDetay({ selectedCategory }) {
  const { addToCart } = useContext(AuthContext);

  const [urunler, setUrunler] = useState([
    {
      id: 1,
      name: "Elegant Lacivert Elbise",
      price: 1250,
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
      category: "kadin",
      stok: 5,
      renk: "Lacivert",
      beden: "M",
    },
    {
      id: 2,
      name: "Klasik Siyah Deri Ceket",
      price: 2800,
      image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504",
      category: "erkek",
      stok: 3,
      renk: "Siyah",
      beden: "L",
    },
    {
      id: 3,
      name: "Pamuklu Bebek Tulum Seti",
      price: 450,
      image: "https://images.unsplash.com/photo-1522771935878-3a0373d4fe84",
      category: "bebek",
      stok: 10,
      renk: "Beyaz",
      beden: "0-3 Ay",
    },
    {
      id: 4,
      name: "Siyah Şık El Çantası",
      price: 950,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      category: "aksesuar",
      stok: 2,
      renk: "Siyah",
      beden: "Standart",
    },
  ]);

  const [yeni, setYeni] = useState({
    name: "",
    price: "",
    image: "",
    category: "kadin",
    renk: "",
    beden: "",
  });

  const [fRenk, setFRenk] = useState("");
  const [fBeden, setFBeden] = useState("");

  const urunEkle = (e) => {
    e.preventDefault();

    setUrunler([
      ...urunler,
      {
        ...yeni,
        id: Date.now(),
        price: Number(yeni.price),
        stok: 10,
      },
    ]);

    setYeni({
      name: "",
      price: "",
      image: "",
      category: "kadin",
      renk: "",
      beden: "",
    });

    alert("Yeni ürün başarıyla eklendi! ✅");
  };

  const urunSil = (id) => {
    if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      setUrunler(urunler.filter((u) => u.id !== id));
    }
  };

  const handleSort = (type) => {
    let sortedData = [...urunler];

    if (type === "asc") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (type === "desc") {
      sortedData.sort((a, b) => b.price - a.price);
    }

    setUrunler(sortedData);
  };

  const handleAddToFavorite = (product) => {
    alert(`${product.name} favorilere eklendi! ❤️`);

    let currentFavorites =
      JSON.parse(localStorage.getItem("rich_favorites")) || [];

    if (!currentFavorites.find((item) => item.id === product.id)) {
      currentFavorites.push({
        ...product,
        ad: product.name,
        fiyat: product.price,
        resim: product.image,
      });

      localStorage.setItem("rich_favorites", JSON.stringify(currentFavorites));
    }
  };

  const filtered = urunler.filter((u) => {
    const katMatch = selectedCategory
      ? u.category?.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    const renkMatch = fRenk ? u.renk === fRenk : true;
    const bedenMatch = fBeden ? u.beden === fBeden : true;

    return katMatch && renkMatch && bedenMatch;
  });

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          background: "#f8f9fa",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h4 style={{ marginBottom: "15px" }}>
          📦 Ürün & Fotoğraf Yükle (Admin)
        </h4>

        <form
          onSubmit={urunEkle}
          style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        >
          <input
            className="form-control w-auto"
            placeholder="Ad"
            value={yeni.name}
            onChange={(e) => setYeni({ ...yeni, name: e.target.value })}
            required
          />

          <input
            className="form-control w-auto"
            placeholder="Fiyat"
            type="number"
            value={yeni.price}
            onChange={(e) => setYeni({ ...yeni, price: e.target.value })}
            required
          />

          <input
            className="form-control w-auto"
            placeholder="Foto URL"
            value={yeni.image}
            onChange={(e) => setYeni({ ...yeni, image: e.target.value })}
            required
          />

          <input
            className="form-control w-auto"
            placeholder="Renk"
            value={yeni.renk}
            onChange={(e) => setYeni({ ...yeni, renk: e.target.value })}
          />

          <input
            className="form-control w-auto"
            placeholder="Beden"
            value={yeni.beden}
            onChange={(e) => setYeni({ ...yeni, beden: e.target.value })}
          />

          <select
            className="form-select w-auto"
            value={yeni.category}
            onChange={(e) => setYeni({ ...yeni, category: e.target.value })}
          >
            <option value="kadin">Kadın</option>
            <option value="erkek">Erkek</option>
            <option value="bebek">Bebek</option>
            <option value="aksesuar">Aksesuar</option>
          </select>

          <button type="submit" className="btn btn-success">
            Yayınla
          </button>
        </form>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <select
            className="form-select w-auto"
            value={fRenk}
            onChange={(e) => setFRenk(e.target.value)}
          >
            <option value="">Renk Filtrele</option>
            <option value="Lacivert">Lacivert</option>
            <option value="Siyah">Siyah</option>
            <option value="Gri">Gri</option>
            <option value="Beyaz">Beyaz</option>
          </select>

          <select
            className="form-select w-auto"
            value={fBeden}
            onChange={(e) => setFBeden(e.target.value)}
          >
            <option value="">Beden Filtrele</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="0-3 Ay">0-3 Ay</option>
            <option value="Standart">Standart</option>
          </select>
        </div>

        <select
          className="form-select w-auto"
          onChange={(e) => handleSort(e.target.value)}
          style={{ cursor: "pointer" }}
        >
          <option value="">Sırala: Varsayılan</option>
          <option value="asc">Fiyat: En Düşük</option>
          <option value="desc">Fiyat: En Yüksek</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filtered.map((u) => (
          <div
            key={u.id}
            className="modern-product-card"
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "12px",
              background: "white",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                height: "200px",
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <img
                src={u.image}
                alt={u.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: u.stok === 0 ? "grayscale(100%)" : "none",
                }}
              />

              <button
                onClick={() => handleAddToFavorite(u)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "white",
                  border: "none",
                  borderRadius: "50%",
                  padding: "5px 8px",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                }}
              >
                ❤️
              </button>

              {u.stok === 0 && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    background: "red",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  TÜKENDİ
                </span>
              )}

              {u.stok > 0 && u.stok <= 3 && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    background: "orange",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  SON {u.stok} ÜRÜN!
                </span>
              )}
            </div>

            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <h5 style={{ fontSize: "16px", margin: "5px 0" }}>
                {u.name}
              </h5>

              <p style={{ fontSize: "14px", color: "#666" }}>
                {u.renk} | {u.beden}
              </p>

              <p style={{ fontWeight: "bold", color: "#1e3a8a" }}>
                {u.price.toLocaleString("tr-TR")} TL
              </p>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <button
                  onClick={() =>
                    addToCart({
                      ...u,
                      ad: u.name,
                      fiyat: u.price,
                      resim: u.image,
                    })
                  }
                  disabled={u.stok === 0}
                  className="btn btn-primary btn-sm"
                  style={{
                    backgroundColor: u.stok === 0 ? "#ccc" : "#1e3a8a",
                  }}
                >
                  {u.stok === 0 ? "Stokta Yok" : "Sepete Ekle"}
                </button>

                <button
                  onClick={() => urunSil(u.id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  Ürünü Sil 🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UrunDetay;