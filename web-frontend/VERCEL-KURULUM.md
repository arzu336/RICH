# Vercel Kurulum (404 assets hatasi icin)

## Zorunlu ayarlar

Vercel → Project → **Settings** → **General**:

| Alan | Deger |
|------|--------|
| **Root Directory** | `web-frontend` |
| **Build Command** | `npm run build` (veya bos birak, vercel.json kullanilir) |
| **Output Directory** | `dist` |
| **Node.js Version** | 20.x |

**Root Directory bos veya repo kok (`RICH`) ise `/assets/index-xxx.js` 404 verir.**

## Environment Variables

| Key | Deger |
|-----|--------|
| `VITE_API_BASE_URL` | *(bos birak)* |

Bos birakinca uygulama `/api/auth` ve `/api/products` kullanir (Vercel serverless).

## Deploy sonrasi test

1. `https://PROJE.vercel.app/` ac
2. Build logda `dist/assets` icinde `.js` dosyasi gorunmeli
3. Tarayicida ac: `https://PROJE.vercel.app/assets/index-xxxxx.js` (index.html icindeki isim)

## Hala 404 ise

1. Deployments → son deploy → **Redeploy** (Clear cache ile)
2. Telefonda site verilerini sil / PWA kaldir
3. Chrome → Application → Service Workers → Unregister
