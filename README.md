# Dashboard Visualisasi Data Taksi

Aplikasi berbasis **ReactJS** ini menampilkan data perjalanan taksi NYC dalam bentuk dashboard interaktif. Dashboard ini memungkinkan pengguna untuk memfilter data perjalanan, melihat jalur rute di peta, dan menganalisis data menggunakan grafik serta statistik terperinci.

![Home Screen](public/assets/images/homescreen.png)

## Fitur Utama

- **Peta Interaktif**: Menampilkan titik jemput dan antar dengan garis rute.
- **Panel Filter**: Filter data berdasarkan tanggal, tipe pembayaran, tarif, dan jarak perjalanan.
- **Statistik Dashboard**: Menampilkan grafik dan statistik terkait data perjalanan taksi.

## Cara Penggunaan

### 1. Clone repository

```bash
git clone https://github.com/muhfarhan13/yellow-taxi.git
cd yello-taxi
```

### 2. Install dependensi

```bash
npm install
```

### 3. Jalankan aplikasi

```bash
npm start
```

### 4. Akses aplikasi
Akses aplikasi di browser pada http://localhost:3000.

## Teknologi yang Digunakan

- ReactJS: Untuk membangun antarmuka pengguna.
- Leaflet: Visualisasi peta dan jalur rute.
- Material UI: Component React dan Membuat grafik (scatter plot dan donat chart).
- CSS/SCSS: Untuk styling.
- Custom Hooks:
  - useTaxiData: Mengelola data perjalanan taksi.
  - useDataFilters: Memfilter data perjalanan.

## Struktur Folder

```
src/
├── components/
│   ├── Filters/
│   │   ├── FilterPanel.js
│   ├── MapView/
│   │   ├── MapView.js
│   ├── DashboardStats.js
├── hooks/
│   ├── useDataFilters.js
│   ├── useTaxiData.js
├── redux/
│   ├── actions/
│   │   ├── taxiAction.js
│   ├── reducer/
│   │   ├── taxiReducer.js
│   ├── store/
│   │   ├── taxiStore.js
├── screens/
│   ├── HomeScreens.js
├── utils/
│   ├── dataProcessing.js
```