# Arzu KÜÇÜK REST API Metotları

**API Test Videosu:** [Link buraya eklenecek](https://example.com)

## 1. Kullanıcı Kayıt
- **Endpoint:** `POST /auth/register`
- **Request Body:** 
  ```json
  {
    "email": "kullanici@example.com",
    "password": "Guvenli123!",
    "firstName": "Ahmet",
    "lastName": "Yılmaz"
  }
  ```
- **Response:** 
`201 Created` - Kullanıcı başarıyla oluşturuldu
`400 Bad Request` - Geçersiz veri
`409 Conflict` - E-posta zaten kayıtlı



## 2. Kullanıcı Giriş Yapma
- **Endpoint:** `POST /auth/login`
  **Request Body:**
    ```json
  {
    "email": "kullanici@example.com",
    "password": "Guvenli123!"
  }
  ```
- **Response:** 
`200 OK` - Kullanıcı bilgileri başarıyla girildi
`401 Unauthorized` - Hatalı giriş bilgileri

## 3. Kullanıcı Çıkış Yapma
- **Endpoint:** `POST /auth/logout`
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Başarıyla çıkış yapıldı

## 4. Kullanıcı Hesap Silme
- **Endpoint:** `DELETE /users/{userId}`
- **Path Parameters:** 
  - `userId` (string, required) 
- **Authentication:** Bearer Token gerekli
- **Response:** 
`200 OK` - Kullanıcı silindi
`401 Unauthorized` - Yetkisiz erişim
`404 Not Found` - Kullanıcı bulunamadı

## 5. Kadın Ürünleri Listeleme
- **Endpoint:** `GET /products?category=kadin`
- **Response:** 
`200 OK` -Ürün listelendi
[
  {
    "id": "1",
    "name": "Elbise",
    "price": 499.99,
    "stock": 20,
    "imageUrl": "image_url"
  }
]

## 6. Erkek Ürünleri Listeleme
- **Endpoint:** `GET /products?category=erkek`
- **Response:** 
`200 OK` - Ürün listelendi 

## 7. Bebek Ürünleri Listeleme
- **Endpoint:** `GET /products?category=bebek`
- **Response:** 
`200 OK` - Ürün listelendi 

## 8. Aksesuar Ürünleri Listeleme
- **Endpoint:** `GET /products?category=aksesuar`
- **Response:** 
`200 OK` - Ürün listelendi 