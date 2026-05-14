# Arzu KUCUK Mobil Frontend Gorevleri

**Mobile Front-end Demo Videosu:** [Link buraya eklenecek](https://example.com)

Bu sayfada Arzu KUCUK tarafindan mobil frontend icin gelistirilen ekranlar ve kanit videosunda gosterilecek gereksinimler yer almaktadir.

**Tamamlanan Gereksinim Sayisi:** 8 / 8

**Mobil Calisma Sekli:** Uygulama Vercel uzerinden telefonda acilabilir PWA olarak calisir. Telefon tarayicisindan uygulama linki acilip ana ekrana eklenerek mobil uygulama gibi gosterilebilir.

## 1. Kullanici Kayit Ekrani
- **API Endpoint:** `POST /auth/register`
- **Gorev:** Yeni kullanicinin mobil uygulama uzerinden kayit olabilmesi.
- **UI Bilesenleri:**
  - Ad soyad alani
  - Email alani
  - Parola alani
  - Kayit ol butonu
  - Basarili/hata durum mesajlari
- **Kanit Videosunda Gosterilecek:** Kayit formu doldurulur, kayit ol butonuna basilir ve basarili kayit mesaji gosterilir.

## 2. Kullanici Giris Ekrani
- **API Endpoint:** `POST /auth/login`
- **Gorev:** Kayitli kullanicinin mobil uygulamaya giris yapabilmesi.
- **UI Bilesenleri:**
  - Email alani
  - Parola alani
  - Giris yap butonu
  - Hatali giris uyarisi
- **Kanit Videosunda Gosterilecek:** Kullanici bilgileri girilir, giris islemi yapilir ve kullanici hesabina yonlendirilir.

## 3. Kullanici Cikis Islemi
- **API Endpoint:** `POST /auth/logout`
- **Gorev:** Kullanici oturumunun mobil arayuzden kapatilmasi.
- **UI Bilesenleri:**
  - Cikis yap butonu
  - Oturum kapandiktan sonra giris/kayit ekranina donus
- **Kanit Videosunda Gosterilecek:** Kullanici cikis yapar ve oturum bilgisinin temizlendigi gosterilir.

## 4. Kullanici Hesap Silme Akisi
- **API Endpoint:** `DELETE /users/{userId}`
- **Gorev:** Kullanici hesabinin mobil arayuzden silinebilmesi.
- **UI Bilesenleri:**
  - Hesabi sil butonu
  - Onay penceresi
  - Basarili/hata durum mesaji
- **Kanit Videosunda Gosterilecek:** Hesap silme onayi verilir, islem tamamlanir ve kullanici oturumu kapatilir.

## 5. Kadin Urunleri Listeleme Ekrani
- **API Endpoint:** `GET /products?category=kadin`
- **Gorev:** Kadin kategorisindeki urunlerin mobil arayuzde listelenmesi.
- **UI Bilesenleri:**
  - Urun kartlari
  - Urun adi, fiyat, stok ve gorsel bilgisi
  - Bos liste/hata/yukleniyor durumlari
- **Kanit Videosunda Gosterilecek:** Kadin kategorisi secilir ve urunlerin listelendigi gosterilir.

## 6. Erkek Urunleri Listeleme Ekrani
- **API Endpoint:** `GET /products?category=erkek`
- **Gorev:** Erkek kategorisindeki urunlerin mobil arayuzde listelenmesi.
- **UI Bilesenleri:**
  - Urun kartlari
  - Urun adi, fiyat, stok ve gorsel bilgisi
  - Bos liste/hata/yukleniyor durumlari
- **Kanit Videosunda Gosterilecek:** Erkek kategorisi secilir ve urunlerin listelendigi gosterilir.

## 7. Bebek Urunleri Listeleme Ekrani
- **API Endpoint:** `GET /products?category=bebek`
- **Gorev:** Bebek kategorisindeki urunlerin mobil arayuzde listelenmesi.
- **UI Bilesenleri:**
  - Urun kartlari
  - Urun adi, fiyat, stok ve gorsel bilgisi
  - Bos liste/hata/yukleniyor durumlari
- **Kanit Videosunda Gosterilecek:** Bebek kategorisi secilir ve urunlerin listelendigi gosterilir.

## 8. Aksesuar Urunleri Listeleme Ekrani
- **API Endpoint:** `GET /products?category=aksesuar`
- **Gorev:** Aksesuar kategorisindeki urunlerin mobil arayuzde listelenmesi.
- **UI Bilesenleri:**
  - Urun kartlari
  - Urun adi, fiyat, stok ve gorsel bilgisi
  - Bos liste/hata/yukleniyor durumlari
- **Kanit Videosunda Gosterilecek:** Aksesuar kategorisi secilir ve urunlerin listelendigi gosterilir.

