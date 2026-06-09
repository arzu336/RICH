# BUKET KARAÇALI REST API Metotları

**API Test Videosu:** [Link buraya eklenecek](https://example.com)

## 1. Üye Olma
- **Endpoint:** `POST /products`
- **Request Body:** 
 
- **Response:** `201 Created` - Ürün başarıyla yüklendi
`400 Bad Request`-Eksik Bilgi
    

## 2. Ürüne Fotoğraf Ekleme
- **Endpoint:** `POST/products/{productID}/images`

- **Response:** `200 OK` - Görsel başarıyla eklendi
`413 Payload Too Large`-Dosya boyutu çok büyük


## 3.Ürün Bedenine Göre Filtreleme
- **Endpoint:** `GET /products?size={sizeValue}`
- **Path Parameters:** 
  - `sizeValue` (string) - S,M,L,XL,38,40 vb.


- **Response:** `200 OK` -Filtrelenen ürün listelendi

## 4.Ürün Rengine Göre Filtreleme
- **Endpoint:** `GET/pruducts?color={colorName}`

- **Path Parameters:** 
  - `colorName` (string) - Kırmızı,Mavi,Siyah vb.


- **Response:** `200 OK` - Filtrelenen ürün listelendi

## 5.Ürün Silme
- **Endpoint:** `DELETE /products/{pruductID}`

- **Authentication:** 
  - `Admin yetkisi gerekli`

- **Response:** `200 OK` - Ürün başarıyla silindi

  `404 Not Found`- Ürün bulunamadı
  ## 6.Sepeti Görüntüleme

- **Endpoint:** `GET /cart`

- **Authentication:** 
  - `Bearer Taken gerekli`

- **Response:** `200 OK` - Sepet içeriği listelendi,


## 7.Sepete Ürün Ekleme
- **Endpoint:** `POST /cart`
 **Request Body:** 

- **Response:** `201 Created` -Ürün sepete eklendi

 `400 Bad Request`-Stok yetersiz


## 8.Sepetten Ürün Silme
- **Endpoint:** `DELETE /cart/{productID}`


- **Response:** `200 OK` -Ürün sepetten kaldırıldı
