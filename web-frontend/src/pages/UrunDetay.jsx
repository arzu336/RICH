import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { demoProducts } from "../data/demoProducts";

function UrunDetay({ selectedCategory }) {
  const { addToCart } = useContext(AuthContext);
  const [fRenk, setFRenk] = useState("");
  const [fBeden, setFBeden] = useState("");

  const urunler = useMemo(() => selectedCategory ? demoProducts.filter((u) => u.category === selectedCategory) : demoProducts, [selectedCategory]);
  const filtered = urunler.filter((u) => (fRenk ? u.renk === fRenk : true) && (fBeden ? u.beden === fBeden : true));
  const categoryLabel = { kadin: "KadÄ±n", erkek: "Erkek", bebek: "Bebek", aksesuar: "Aksesuar" };

  const favorite = (product) => {
    const favs = JSON.parse(localStorage.getItem("rich_favorites")) || [];
    if (!favs.find((f) => f.id === product.id)) {
      favs.push({ ...product, ad: product.name, fiyat: product.price, resim: product.image });
      localStorage.setItem("rich_favorites", JSON.stringify(favs));
    }
    alert(`${product.name} favorilere eklendi.`);
  };

  return (
    <div className="urun-page">
      <style>{css}</style>
      <div className="head">
        <h2>{selectedCategory ? categoryLabel[selectedCategory] || selectedCategory : "TÃ¼m ÃœrÃ¼nler"} <span>({filtered.length} Ã¼rÃ¼n)</span></h2>
        <div>
          <select value={fRenk} onChange={(e) => setFRenk(e.target.value)}><option value="">Renk</option>{[...new Set(urunler.map(u => u.renk).filter(Boolean))].map(r => <option key={r} value={r}>{r}</option>)}</select>
          <select value={fBeden} onChange={(e) => setFBeden(e.target.value)}><option value="">Beden</option>{[...new Set(urunler.map(u => u.beden).filter(Boolean))].map(b => <option key={b} value={b}>{b}</option>)}</select>
        </div>
      </div>
      <div className="grid">
        {filtered.map((urun) => (
          <article key={urun.id} className="card">
            <div className="img"><img src={urun.image} alt={urun.name} /><button onClick={() => favorite(urun)}>â™¡</button></div>
            <div className="body">
              <small>{urun.renk || "Renk Yok"} Â· {urun.beden || "Beden Yok"}</small>
              <h3>{urun.name}</h3>
              <p>{urun.price} TL</p>
              <button disabled={urun.stok <= 0} onClick={() => addToCart({ ...urun, ad: urun.name, fiyat: urun.price, resim: urun.image })}>{urun.stok <= 0 ? "Stokta Yok" : "Sepete Ekle"}</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

const css = `.urun-page{padding:32px 36px 60px;background:#071122;color:#f8fafc}.head{display:flex;justify-content:space-between;gap:20px;align-items:center;margin-bottom:26px}.head h2{font-family:Georgia,serif;font-size:30px;margin:0}.head span{font-size:13px;color:#64748b}.head select{background:#0d1b33;color:#dbeafe;border:1px solid #243653;border-radius:8px;padding:10px 14px;margin-left:10px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px}.card{background:#0d1b33;border:1px solid #243653;border-radius:14px;overflow:hidden}.img{position:relative;height:260px}.img img{width:100%;height:100%;object-fit:cover}.img button{position:absolute;right:12px;top:12px;border-radius:50%;width:34px;height:34px;background:#17233b;color:#fff;border:1px solid #243653}.body{padding:16px;text-align:center}.body small{color:#64748b;letter-spacing:2px}.body p{color:#d7ad5b}.body button{background:#fff;color:#071122;border:0;border-radius:8px;padding:12px 16px;font-weight:700;width:100%}`
export default UrunDetay;


