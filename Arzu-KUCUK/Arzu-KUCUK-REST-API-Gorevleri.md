# Arzu KÜÇÜK REST API Metotları

**API Test Videosu:** [Link buraya eklenecek](https://example.com)

**Base URL (lokal):** `http://localhost:5227`

**Postman Collection:** [postman_collection.json](./postman_collection.json)


---

## 1. Kullanıcı Kayıt
- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "fullName": "Arzu Kucuk",
    "email": "arzu.test@example.com",
    "password": "Guvenli123"
  }
  ```
- **Response:**
  - `200 OK` — Kayıt başarılı
  - `400 Bad Request` — E-posta zaten kayıtlı veya geçersiz veri

**Örnek başarılı cevap:**
```json
{
  "message": "Kayit basarili.",
  "userId": 1,
  "fullName": "Arzu Kucuk",
  "email": "arzu.test@example.com"
}
```

---

## 2. Kullanıcı Giriş Yapma
- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "arzu.test@example.com",
    "password": "Guvenli123"
  }
  ```
- **Response:**
  - `200 OK` — Giriş başarılı
  - `401 Unauthorized` — Hatalı giriş bilgileri

**Örnek başarılı cevap:**
```json
{
  "message": "Giris basarili.",
  "userId": 1,
  "fullName": "Arzu Kucuk",
  "email": "arzu.test@example.com"
}
```

---

## 3. Kullanıcı Çıkış Yapma
- **Endpoint:** `POST /api/auth/logout`
- **Authentication:** Gerekmez (Bearer token kullanılmaz)
- **Response:** `200 OK`
  ```json
  { "message": "Cikis basarili." }
  ```

---

## 4. Kullanıcı Hesap Silme
- **Endpoint:** `DELETE /api/auth/delete/{id}`
- **Path Parameters:**
  - `id` (int, required) — Silinecek kullanıcının ID değeri
- **Authentication:** Gerekmez
- **Response:**
  - `200 OK` — Kullanıcı silindi
  - `404 Not Found` — Kullanıcı bulunamadı

**Örnek başarılı cevap:**
```json
{ "message": "Hesap silindi." }
```

---

## 5. Kadın Ürünleri Listeleme
- **Endpoint:** `GET /api/products?category=kadin`
- **Response:** `200 OK` — Ürün listesi

**Örnek ürün alanları:**
```json
[
  {
    "id": 1,
    "name": "Elegant Lacivert Elbise",
    "price": 1250,
    "category": "kadin",
    "stok": 5,
    "image": "https://images.unsplash.com/...",
    "renk": "Lacivert",
    "beden": "M"
  }
]
```

---

## 6. Erkek Ürünleri Listeleme
- **Endpoint:** `GET /api/products?category=erkek`
- **Response:** `200 OK` — Ürün listesi

---

## 7. Bebek Ürünleri Listeleme
- **Endpoint:** `GET /api/products?category=bebek`
- **Response:** `200 OK` — Ürün listesi

---

## 8. Aksesuar Ürünleri Listeleme
- **Endpoint:** `GET /api/products?category=aksesuar`
- **Response:** `200 OK` — Ürün listesi

---

