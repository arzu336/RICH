# Buket Karaçalı'nın Web Frontend Görevleri

**Front-end Test Videosu:** [https://youtube.com/shorts/K-TmMS0YWvU?si=hFgkEy0zl7LwvijJ]

---

## 1. Ürün Yönetimi (Yükleme ve Fotoğraf)
* **API Endpoints:** `POST /products` ve `POST /products/upload-image`
* **Görev:** Yeni ürünlerin sisteme girilmesi ve görsellerinin yüklenmesi için admin arayüzü.
* **UI Bileşenleri:**
    * Ürün adı, fiyatı ve açıklaması için metin girişleri.
    * Ürün fotoğrafı için dosya seçme (upload) alanı.
    * "Ürünü Kaydet" butonu.

## 2. Ürün Filtreleme (Beden ve Renk)
* **API Endpoint:** `GET /products?size=...&color=...`
* **Görev:** Kullanıcının aradığı ürüne hızlıca ulaşabilmesi için dinamik listeleme.
* **UI Bileşenleri:**
    * Beden seçenekleri (S, M, L, XL) için Checkbox veya Dropdown menü.
    * Renk seçenekleri için görsel renk paleti veya liste.
    * "Filtreleri Temizle" seçeneği.

## 3. Ürün Silme İşlemi
* **API Endpoint:** `DELETE /products/:id`
* **Görev:** Satışı durdurulan veya stoğu biten ürünlerin mağazadan kaldırılması.
* **UI Bileşenleri:**
    * Her ürün kartının üzerinde "Sil" (Çöp kutusu ikonlu) butonu.
    * Yanlışlıkla silmeyi önlemek için "Emin misiniz?" onay kutusu (Modal).

## 4. Sepet Yönetimi (Görüntüleme, Ekleme, Silme)
* **API Endpoints:** `GET /cart`, `POST /cart`, `DELETE /cart/:id`
* **Görev:** Kullanıcının satın almak istediği ürünleri toplu halde yönetebilmesi.
* **UI Bileşenleri:**
    * Ürün kartlarında "Sepete Ekle" butonu.
    * Sağ üst köşede sepet ikonu ve ürün sayısı göstergesi.
    * Sepet sayfasında ürünlerin listesi, adet bilgisi ve "Sepetten Çıkar" butonu.
    ## 5. Ürün Silme İşlemi 
* **API Endpoint:** `DELETE /products/:id`
* **Görev:** Satışı biten ürünün sistemden tamamen kaldırılması.
* **UI Bileşenleri:** Her ürünün yanındaki "Sil" (Çöp Kutusu) butonu ve onay penceresi.

## 6. Sepeti Görüntüleme 
* **API Endpoint:** `GET /cart`
* **Görev:** Kullanıcının alacağı ürünlerin toplu listesini görmesi.
* **UI Bileşenleri:** Sepet sayfası/paneli ve eklenen ürünlerin görselleriyle beraber listelenmesi.

## 7. Sepete Ürün Ekleme 
* **API Endpoint:** `POST /cart`
* **Görev:** Seçilen bir ürünün sepete dahil edilmesi.
* **UI Bileşenleri:** Ürün kartlarının altında bulunan "Sepete Ekle" butonu.

## 8. Sepetten Ürün Silme 
* **API Endpoint:** `DELETE /cart/:id`
* **Görev:** Vazgeçilen ürünün sepet listesinden çıkarılması.
* **UI Bileşenleri:** Sepet listesindeki her ürünün yanındaki "Kaldır" butonu.