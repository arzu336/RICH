# Rojda YILDIZ REST API Metotları

**API Test Videosu:** [Link buraya eklenecek](https://example.com)

## 1. Ödeme Yapma 
- **Endpoint:** `POST /payments/checkout`
- **Authentication:**  Bearer Token gerekli
- **Request Body:** 
  ```json
  {
    "cardHolderName": "Rojda Yıldız",
    "cardNumber": "4444 5555 6666 7777",
    "expireDate": "12/27",
    "cvv": "123",
    "amount": 1250.50
  }
  ```
- **Response:** 
`200 0K` - Ödeme Başarılı
`400 Bad Request` - Yetersiz Bakiye
`409 Payment  Required` - Ödeme Reddedildi



## 2. Favorilere Ürün Ekleme
- **Endpoint:** `POST /favorites`
  **Request Body:**
    ```json
  {
   "productId": "prod_8821",
   "addedDate": "2026-03-24"
  }
  ```
- **Response:** 
`201 Created` - Ürün favorilere eklendi
`40p Conflict` - Ürün zaten favorilerde

## 3. Favori Ürünleri Lİsteleme
- **Endpoint:** `GET /favorites`
- **Response:** `200 OK` - Favori listesi getirildi [ { "id": "1", "name": "Elbise", "price": 499.99 } ]

## 4. Favorilerden Ürün Silme
- **Endpoint:** `DELETE /favorites/{productId}`
- **Path Parameters:** 
  - `productId` (string, required) 
- **Response:** 
`204 No Content` - Ürün Favorilerden Silindi
`404 Not Found` - Ürün bulunamadı

## 5.Kategoriye Göre Ürün Arama ve Filtreleme
- **Endpoint:** `GET /products/search`
- **Query Parameters:**
    - **q(string):Aranan Kelime**
    - **category (string): Ürün kategorisi**
    -**sort: price_asc (artan), price_desc (azalan)**
- **Response:** 
`200 OK` -Ürün listelendi


## 6. Adres Yönetimi (Yeni Adres Ekleme)
- **Endpoint:** `POST /addresses`
```json
  {
   "addressTitle": "Ev Adresim",
  "city": "Isparta",
  "district": "Merkez",
  "fullAddress": "Bahçelievler Mah. 123. Sokak No:5"
  }
  ```

- **Response:** 
`201 Created`-Adres kaydedildi

## 7.Stok Bilgisi Sorgulama
- **Endpoint:** `GET /products/{productId}/stock`
- **Response:** 
`200 OK` - { "productId": "1", "inStock": true, "quantity": 15 }

## 8.Fiyata Göre Sıralama
- **Endpoint:** `GET /products?sortBy=price&order=asc`
- **Response:** 
`200 OK` - Ürünler artan fiyatla sıralandı