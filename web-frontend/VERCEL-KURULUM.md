# Vercel 404 - Panel erisimi olmadan cozum

## Kirmizi isaret ne demek?

- `<!doctype html>` kirmizi → Sayfa **bozuk** (kritik JS yuklenemedi), HTML hatasi degil.
- `index-DAutKWGW.js` kirmizi → Bu dosya Vercel sunucusunda **yok** (404).

## Panel acamiyorsan

Repo kokune `vercel.json` eklendi. **GitHub'a push** edince Vercel otomatik dogru build etmeli:

```powershell
cd D:\RICH
git add vercel.json web-frontend/vite.config.js web-frontend/package.json web-frontend/vercel.json
git commit -m "fix: Vercel build output web-frontend/dist"
git push
```

## Kendi Vercel projen (en garantisi)

1. https://vercel.com → ucretsiz hesap
2. **Add New Project** → `arzu336/RICH` sec
3. Root Directory: `web-frontend`
4. Deploy

Boylece Rojda'nin yanlis ayarli projesine bagli kalmazsin.

## Push sonrasi test

Gizli sekmede:
- `https://SITE.vercel.app/deploy-check.txt`
- `https://SITE.vercel.app/assets/index-DAutKWGW.js` (veya View Source'taki yeni isim)

## Lokal

```powershell
cd D:\RICH\web-frontend
npm run build
npm run preview
```

`http://localhost:4173` acilir.
