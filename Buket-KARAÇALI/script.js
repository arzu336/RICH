const API_URL = "https://api-linkin.vercel.app"; // Kendi API linkini buraya yaz

// 1. Ürünleri Getir ve Filtrele (Gereksinim 3, 4)
async function getProducts() {
    const size = document.getElementById('sizeFilter').value;
    const color = document.getElementById('colorFilter').value;
    
    const response = await fetch(`${API_URL}/products?size=${size}&color=${color}`);
    const products = await response.json();
    displayProducts(products);
}

// 2. Ürün Silme (Gereksinim 5)
async function deleteProduct(id) {
    await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
    getProducts(); // Listeyi güncelle
}

// 3. Sepete Ekle (Gereksinim 7)
async function addToCart(product) {
    await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    getCart(); // Sepeti güncelle
}

// 4. Sepetten Sil (Gereksinim 8)
async function removeFromCart(id) {
    await fetch(`${API_URL}/cart/${id}`, { method: 'DELETE' });
    getCart();
}

// 5. Ürün Yükleme (Gereksinim 1 ve 2)
async function addProduct() {
    const name = document.getElementById('pName').value;
    const price = document.getElementById('pPrice').value;
    const image = document.getElementById('pImage').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    await fetch(`${API_URL}/products`, {
        method: 'POST',
        body: formData // Fotoğraf olduğu için FormData kullanılır
    });
    getProducts();
}