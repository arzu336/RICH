import React, { useEffect, useState } from "react";
import {
  getProductsFromCSV,
  filterProducts,
  getImage,
} from "../api/csvApi";

const kategoriler = [
  { key: "kadin", label: "Kadın" },
  { key: "erkek", label: "Erkek" },
  { key: "bebek", label: "Bebek" },
  { key: "aksesuar", label: "Aksesuar" },
];

const Products = ({ selectedCategory }) => {
  const [tumUrunler, setTumUrunler] = useState([]);
  const [urunler, setUrunler] = useState([]);
  const [kategori, setKategori] = useState("kadin");

  useEffect(() => {
    getProductsFromCSV().then((data) => {
      setTumUrunler(data);
    });
  }, []);

  useEffect(() => {
    const filtered = filterProducts(tumUrunler, selectedCategory);
    setUrunler(filtered);
  }, [selectedCategory, tumUrunler]);

  return (
    <div>
      <h2>Ürünler</h2>

      {/* KATEGORİ BUTONLARI */}
      <div>
        {kategoriler.map((k) => (
          <button key={k.key} onClick={() => setKategori(k.key)}>
            {k.label}
          </button>
        ))}
      </div>

      {/* ÜRÜNLER */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {urunler.map((p, i) => (
          <div key={i} style={{ margin: "10px" }}>
            <img src={getImage(p.images)} width="150" />
            <h4>{p.name}</h4>
            <p>{p.selling_price} {p.currency}</p>
            <p>{p.brand}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
