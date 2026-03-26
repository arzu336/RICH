# Rojda Yıldız'ın Web Frontend Görevleri
**Front-end Test Videosu:** [Link buraya eklenecek](https://example.com)

## 1.Ödeme Yapma Sayfası
- **API Endpoint:** `POST /payments/checkout`
- **Görev:** Kullanıcının sepetindeki ürünleri satın alabilmesi için güvenli ödeme arayüzü tasarımı.
- **UI Bileşenleri:**
  - Kredi kartı bilgi formu (Kart No, SKT, CVV, İsim).
  - Sepet özeti ve ödenecek toplam tutar göstergesi.
  - "Ödemeyi Tamamla" butonu (Yükleniyor animasyonu ile).
  
- **Form Validasyonu:**
  - Kart numarası 16 hane ve rakam kontrolü.
  - SKT (Ay/Yıl) gelecek tarih kontrolü.
  - Tüm alanlar doldurulmadan butonun disabled (pasif) kalması.
  
- **Kullanıcı Deneyimi:**
  - Başarılı işlem sonrası "Siparişiniz Alındı" mesajı.
  - Hata durumunda (Yetersiz bakiye vb.) kullanıcı dostu uyarılar.
  
- **Teknik Detaylar:**
  - React State yönetimi, HTTPS güvenliği, POST isteği yönetimi.
  

## 2. Favoriler (Listeleme) Sayfası
- **API Endpoint:** `GET /favorites`
- **Görev:** Kullanıcının beğendiği ürünleri tek bir merkezden görüntüleyebilmesi.
- **UI Bileşenleri:**
  - Favori ürünlerin kart (Grid) yapısında listelenmesi.
  - Ürün görselleri, isimleri ve fiyat bilgileri.
  - Listeden çıkarma (Çöp kutusu ikonu) butonu.
  
- **Kullanıcı Deneyimi:**
  - Liste boşsa "Henüz favori ürününüz yok" uyarısı.
  - Sayfa yüklendiğinde Shimmer/Skeleton efektli yükleme ekranı.
  
- **Teknik Detaylar:**
  - useEffect ile veri çekme, dinamik mapleme.
  

## 3. Favorilere Ürün Ekleme (Aksiyon) Sayfası
- **API Endpoint:** `POST /favorites`
- **Görev:** Ürünlerin hızlıca kişisel listeye kaydedilmesi.
- **UI Bileşenleri:**
  - Ürün kartları ve detay sayfasındaki "Kalp" ikonu.
  - İkonun seçili olma durumuna göre renk değişimi (Kırmızı dolgu).
  
- **Form Validasyonu:**
  - Giriş yapmamış kullanıcının Login sayfasına yönlendirilmesi.
  
- **Kullanıcı Deneyimi:**
  - Tıklandığında sağ üstte "Ürün Favorilere Eklendi" Toast mesajı.
  
- **Teknik Detaylar:**
  - Optimistic UI update (Hızlı tepki için arayüzün anlık güncellenmesi).
  

## 4.Favorilerden Ürün Silme
- **API Endpoint:** `DELETE /favorites/{productId}`
- **Görev:** Favori listesinin güncel tutulması ve istenmeyen ürünlerin kaldırılması.
- **UI Bileşenleri:**
  - Favoriler sayfasındaki ürünlerin üzerinde "Kaldır" butonu.

  
- **Kullanıcı Deneyimi:**
  - Silme işlemi sonrası ürünün sayfadan kaybolma animasyonu.
  

- **Teknik Detaylar:**
  - Silme isteği sonrası Local State'in filtrelenerek güncellenmesi.


  ## 5.Kategoriye Göre Ürün Arama
- **API Endpoint:** `GET /products?category={category}&search={query}`
- **Görev:** Kullanıcının binlerce ürün arasından aradığını saniyeler içinde bulması.
- **UI Bileşenleri:**
  - Arama çubuğu (Search bar) ve Kategori filtreleme menüsü.

  - **Form Validasyonu:**
  - En az 2 karakter girilmeden aramanın başlamaması.
  
- **Kullanıcı Deneyimi:**
  - "X kategorisinde Y sonucu bulundu" bilgilendirme metni.
  

- **Teknik Detaylar:**
  -Debounce (kullanıcı yazmayı bitirene kadar bekleme) mekanizması.
  

  ## 6.Adres Yönetimi
- **API Endpoint:** `POST /user/address`
- **Görev:** Teslimat sürecinin yönetilmesi için adres kaydı.
- **UI Bileşenleri:**
  - Şehir, ilçe ve tam adres metin alanları.
  - Kayıtlı adreslerin kart şeklinde listelenmesi.

  - **Form Validasyonu:**
  - Boş alan bırakılmaması kontrolü. 
  
- **Teknik Detaylar:**
  - localStorage veya veritabanı ile senkronizasyon.


   ## 7.Stok Bilgisi Kontrolü
- **API Endpoint:** `GET /products/{id}/stock`
- **Görev:** Kullanıcıyı satın alamayacağı ürün için hayal kırıklığına uğratmamak.
- **UI Bileşenleri:**
  - "Stokta Var", "Son 3 Ürün" veya "Tükendi" rozetleri.

  - **Kullanıcı Deneyimi:**
    - Stok bittiyse "Sepete Ekle" butonunun pasif hale gelmesi.
  
- **Teknik Detaylar:**
  - Koşullu render (Conditional Rendering).


   ## 8.Fiyata Göre Sıralama
- **API Endpoint:** `GET /products?sort={asc|desc}`
- **Görev:** Bütçeye göre ürün keşfini kolaylaştırmak.
- **UI Bileşenleri:**
  - "En Düşük Fiyat", "En Yüksek Fiyat" seçeneklerini içeren Dropdown menü.

  - **Kullanıcı Deneyimi:**
    - Sıralama değiştiğinde listenin pürüzsüzce yeniden düzenlenmesi.
  
- **Teknik Detaylar:**
  - URL Query string parametreleri ile filtreleme.