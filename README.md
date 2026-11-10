# Cinematic Portfolio

## Menjalankan proyek

1. Install dependency: `npm install`
2. Build: `npm run build`
3. Preview folder hasil build: `npx serve .`

Build menghasilkan `Asset/dist/app.js` dan `Asset/dist/app.css`. Folder `node_modules` dan hasil build tidak disertakan agar ZIP lebih ringan; keduanya dapat dibuat ulang dengan langkah di atas.

## Catatan

- Layout, komponen, dan animasi sumber tidak diubah dalam paket pembersihan ini.
- Data, foto, sertifikat, dan identitas contoh yang masih merujuk Renando perlu diganti dengan materi milik pemilik portfolio sebelum dipublikasikan.
- `package.json` hanya menyediakan script `build`, karena file untuk script `dev`, `start`, dan `check` tidak ada di arsip yang diterima.
