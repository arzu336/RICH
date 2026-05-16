# Arzu KUCUK Mobil Backend Gorevleri

**Mobil Front-end ile Back-end Baglanmis Test Videosu:** [Link buraya eklenecek](https://example.com)

**Tamamlanan Gereksinim Sayisi:** 8 / 8

**Mobil Calisma Sekli:** Mobil kanit videosunda uygulama telefon uzerinden PWA olarak acilir ve REST API istekleri Vercel API endpointleri uzerinden gosterilir.

## 1. Kullanici Kayit Servisi
- **API Endpoint:** `POST /api/auth/register`
- **Gorev:** Mobil uygulamadaki kayit formundan gelen kullanici bilgilerini REST API'ye gondermek.
- **Request Body:**
  ```json
  {
    "fullName": "Arzu Kucuk",
    "email": "arzu@example.com",
    "password": "Guvenli123"
  }
  ```
- **Basarili Sonuc:** Kullanici olusturulur ve basarili kayit mesaji doner.
- **Kanit Videosunda Gosterilecek:** Mobil uygulamadan kayit istegi gonderilir, API cevabi alinir ve ekranda basarili sonuc gosterilir.

## 2. Kullanici Giris Servisi
- **API Endpoint:** `POST /api/auth/login`
- **Gorev:** Mobil uygulamadaki giris formundan gelen email ve parola bilgilerini REST API'ye gondermek.
- **Request Body:**
  ```json
  {
    "email": "arzu@example.com",
    "password": "Guvenli123"
  }
  ```
- **Basarili Sonuc:** Kullanici bilgileri doner ve oturum acilir.
- **Kanit Videosunda Gosterilecek:** Mobil uygulamadan giris istegi gonderilir, API cevabi alinir ve kullanici hesabina gecis yapilir.

## 3. Kullanici Cikis Servisi
- **API Endpoint:** `POST /api/auth/logout`
- **Gorev:** Mobil uygulamadaki oturumu kapatma islemini REST API ile gerceklestirmek.
- **Basarili Sonuc:** Cikis basarili mesaji doner ve oturum bilgisi temizlenir.
- **Kanit Videosunda Gosterilecek:** Cikis istegi gonderilir, kullanici oturumu kapatilir ve giris ekranina donulur.

## 4. Kullanici Hesap Silme Servisi
- **API Endpoint:** `DELETE /api/auth/delete/{id}`
- **Gorev:** Mobil uygulamadan kullanici hesabini silme istegini REST API'ye gondermek.
- **Path Parametresi:**
  - `id`: Silinecek kullanicinin ID degeri
- **Basarili Sonuc:** Kullanici hesabi silinir ve oturum bilgisi temizlenir.
- **Kanit Videosunda Gosterilecek:** Hesap silme onayi verilir, DELETE istegi gonderilir ve islemin tamamlandigi gosterilir.

## 5. Kadin Urunleri Listeleme Servisi
- **API Endpoint:** `GET /api/products?category=kadin`
- **Gorev:** Kadin kategorisindeki urunleri REST API'den cekmek.
- **Basarili Sonuc:** Kadin urunleri JSON olarak doner ve mobil arayuzde listelenir.
- **Kanit Videosunda Gosterilecek:** Kadin kategorisi secilir, API istegi gider ve gelen urunler ekranda listelenir.

## 6. Erkek Urunleri Listeleme Servisi
- **API Endpoint:** `GET /api/products?category=erkek`
- **Gorev:** Erkek kategorisindeki urunleri REST API'den cekmek.
- **Basarili Sonuc:** Erkek urunleri JSON olarak doner ve mobil arayuzde listelenir.
- **Kanit Videosunda Gosterilecek:** Erkek kategorisi secilir, API istegi gider ve gelen urunler ekranda listelenir.

## 7. Bebek Urunleri Listeleme Servisi
- **API Endpoint:** `GET /api/products?category=bebek`
- **Gorev:** Bebek kategorisindeki urunleri REST API'den cekmek.
- **Basarili Sonuc:** Bebek urunleri JSON olarak doner ve mobil arayuzde listelenir.
- **Kanit Videosunda Gosterilecek:** Bebek kategorisi secilir, API istegi gider ve gelen urunler ekranda listelenir.

## 8. Aksesuar Urunleri Listeleme Servisi
- **API Endpoint:** `GET /api/products?category=aksesuar`
- **Gorev:** Aksesuar kategorisindeki urunleri REST API'den cekmek.
- **Basarili Sonuc:** Aksesuar urunleri JSON olarak doner ve mobil arayuzde listelenir.
- **Kanit Videosunda Gosterilecek:** Aksesuar kategorisi secilir, API istegi gider ve gelen urunler ekranda listelenir.

