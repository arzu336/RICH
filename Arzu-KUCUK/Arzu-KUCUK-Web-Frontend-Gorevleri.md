# Arzu KÜÇÜK Web Frontend Görevleri

**Front-end Test Videosu:** [https://www.youtube.com/watch?v=qQwCbQdRRjw]

## 1. Kullanıcı Kayıt Sayfası
- **API Endpoint:** `POST /auth/register`
- **Görev:** Yeni kullanıcıların siteye kayıt olabilmesi.
- **UI Bileşenleri:**
  - Email, Parola, İsim ve Soyisim alanları.
  - "Kayıt Ol" butonu.
- **Form Validasyonu:**
  - Email format kontrolü.
  - Parola minimum 8 karakter, büyük-küçük harf ve sayı içermeli.
  - Tüm alanlar dolmadan buton pasif.
- **Kullanıcı Deneyimi:**
  - Başarılı kayıt: "Kayıt işlemi başarılı" mesajı.
  - Hata: "E-posta zaten kayıtlı" veya "Geçersiz veri" uyarıları.
- **Teknik Detaylar:**
  - React State yönetimi, POST isteği, form hataları için kullanıcı dostu uyarı.

---

## 2. Kullanıcı Giriş Sayfası
- **API Endpoint:** `POST /auth/login`
- **Görev:** Mevcut kullanıcıların giriş yapması.
- **UI Bileşenleri:**
  - Email ve Parola alanları.
  - "Giriş Yap" butonu.
- **Form Validasyonu:**
  - Email format kontrolü.
  - Parola boş bırakılamaz.
- **Kullanıcı Deneyimi:**
  - Başarılı giriş: Kullanıcı dashboard sayfasına yönlendirilir.
  - Hatalı giriş: "Email veya parola hatalı" uyarısı.
- **Teknik Detaylar:**
  - Bearer token saklama (localStorage veya cookie), POST isteği.

---

## 3. Kullanıcı Çıkış İşlemi
- **API Endpoint:** `POST /auth/logout`
- **Görev:** Kullanıcının güvenli şekilde çıkış yapması.
- **UI Bileşenleri:**
  - "Çıkış Yap" butonu.
- **Kullanıcı Deneyimi:**
  - Başarılı çıkış: Giriş sayfasına yönlendirme ve token temizleme.
- **Teknik Detaylar:**
  - Auth header ile POST isteği, state temizliği.

---

## 4. Kullanıcı Hesap Silme
- **API Endpoint:** `DELETE /users/{userId}`
- **Görev:** Kullanıcıların hesaplarını silebilmesi.
- **UI Bileşenleri:**
  - "Hesabı Sil" butonu (onay modalı ile).
- **Kullanıcı Deneyimi:**
  - Başarılı silme: "Hesabınız silindi" mesajı ve logout.
  - Hatalı işlem: "Yetkisiz erişim" veya "Kullanıcı bulunamadı".
- **Teknik Detaylar:**
  - Auth header ile DELETE isteği, state güncelleme, yönlendirme.

---

## 5. Kadın Ürünleri Listeleme
- **API Endpoint:** `GET /products?category=kadin`
- **Görev:** Kullanıcının kadın ürünlerini listeleyebilmesi.
- **UI Bileşenleri:**
  - Grid/list görünümü ürün kartları (resim, isim, fiyat, stok durumu).
  - "Favorilere Ekle" ve "Sepete Ekle" butonları.
- **Kullanıcı Deneyimi:**
  - Liste boşsa: "Kadın ürünleri bulunamadı" mesajı.
  - Sayfa yüklenirken Shimmer/Skeleton efekti.
- **Teknik Detaylar:**
  - `useEffect` ile GET isteği, map ile listeleme.

---

## 6. Erkek Ürünleri Listeleme
- **API Endpoint:** `GET /products?category=erkek`
- **Görev:** Erkek ürünlerini listeleme.
- **UI Bileşenleri:** Kadın ürünleri ile aynı tasarım.
- **Kullanıcı Deneyimi:** Boş liste mesajı ve yükleme efekti.
- **Teknik Detaylar:** GET isteği, conditional render.

---

## 7. Bebek Ürünleri Listeleme
- **API Endpoint:** `GET /products?category=bebek`
- **Görev:** Bebek ürünlerini listeleme.
- **UI Bileşenleri:** Ürün kartları, favorilere ekleme butonu.
- **Kullanıcı Deneyimi:** Liste boşsa bilgilendirme mesajı.
- **Teknik Detaylar:** State yönetimi, loading animasyonu.

---

## 8. Aksesuar Ürünleri Listeleme
- **API Endpoint:** `GET /products?category=aksesuar`
- **Görev:** Aksesuar ürünlerini listeleme.
- **UI Bileşenleri:** Grid görünümü, ürün bilgileri, favori/sepet butonları.
- **Kullanıcı Deneyimi:** Yükleme animasyonu ve boş liste mesajı.
- **Teknik Detaylar:** GET isteği, map ile render.