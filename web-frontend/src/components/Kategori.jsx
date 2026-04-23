import React from "react";

function Kategori({ setSelectedCategory }) {
  const kategoriler = [
    { id: 1, ad: "Kadın Giyim", api: "kadin" },
    { id: 2, ad: "Erkek Giyim", api: "erkek" },
    { id: 3, ad: "Bebek", api: "bebek" },
    { id: 4, ad: "Aksesuar", api: "aksesuar" },
  ];

  return (
    <div className="kategori-container">
      {kategoriler.map((kat) => (
        <button
          key={kat.id}
          className="kategori-button"
          onClick={() => setSelectedCategory(kat.api)}
        >
          {kat.ad}
        </button>
      ))}
    </div>
  );
}

export default Kategori;