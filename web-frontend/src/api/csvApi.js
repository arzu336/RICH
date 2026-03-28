import Papa from "papaparse";

// CSV OKUMA
export const getProductsFromCSV = async () => {
  const res = await fetch("/data/adidas_usa.csv");
  const text = await res.text();

  return new Promise((resolve) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
};

// KATEGORİ FİLTRE
export const filterProducts = (products, category) => {
  return products.filter((p) => {
    const cat = p.category?.toLowerCase() || "";

    if (category === "kadin") return cat.includes("women");
    if (category === "erkek") return cat.includes("men");
    if (category === "bebek")
      return cat.includes("kids") || cat.includes("baby");
    if (category === "aksesuar")
      return cat.includes("accessories") || cat.includes("bag");

    return false;
  });
};

// RESİM PARSE
export const getImage = (img) => {
  try {
    const parsed = JSON.parse(img);
    return parsed[0];
  } catch {
    return "https://via.placeholder.com/150";
  }
};