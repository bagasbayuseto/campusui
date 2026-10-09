# CampusUI

CampusUI adalah dashboard admin modern untuk sistem informasi akademik kampus yang dibuat dengan HTML5, CSS3, dan JavaScript murni. Aplikasi ini dirancang agar mudah dibuka melalui VS Code dengan Live Server dan dapat dikembangkan lebih lanjut ke Laravel 12 + MySQL.

## Fitur utama

- Dashboard akademik modern dengan card statistik dan grafik.
- CRUD demo untuk mahasiswa, kelas, semester, dan dosen.
- Sidebar responsif dengan mode mini dan mobile drawer.
- Dark mode dan light mode dengan localStorage.
- Search bar header dengan shortcut Ctrl + K.
- Modal profiling, logout, tambah/edit/detail/hapus data.
- Notifikasi toast, ekspor CSV, dan tabel interaktif.

## Struktur folder

```text
campusui/
├── index.html
├── README.md
├── assets/
│   └── images/
│       └── campusui-logo.svg
├── css/
│   ├── style.css
│   ├── layout.css
│   ├── components.css
│   ├── dashboard.css
│   ├── tables.css
│   ├── forms.css
│   ├── modals.css
│   ├── dropdowns.css
│   ├── sidebar.css
│   ├── toggles.css
│   ├── semester.css
│   ├── profile.css
│   ├── responsive.css
│   └── dark-mode.css
└── js/
    ├── app.js
    ├── navigation.js
    ├── sidebar.js
    ├── ui-toggles.js
    ├── theme.js
    ├── search.js
    ├── dashboard.js
    ├── datatables.js
    ├── mahasiswa.js
    ├── kelas.js
    ├── semester.js
    ├── dosen.js
    ├── modals.js
    ├── profile-menu.js
    ├── notifications.js
    └── export.js
```

## Cara menjalankan

1. Buka folder proyek di VS Code.
2. Pastikan ekstensi Live Server sudah terinstall.
3. Klik kanan `index.html` lalu pilih "Open with Live Server".
4. Browser akan otomatis membuka halaman dashboard.

## Library eksternal yang digunakan

- Font Awesome 6 untuk ikon.
- Google Fonts: Inter.
- Chart.js untuk grafik dashboard.
- Bootstrap 5 untuk komponen dasar standar.
- DataTables jQuery untuk interaksi tabel (demo client-side).

## Catatan penting

- Semua data demo disimpan di `localStorage` agar tetap ada saat browser di-refresh.
- Fitur CRUD bersifat demo client-side dan belum terhubung ke backend.
- Untuk produksi, sesuaikan dengan backend Laravel 12 dan MySQL menggunakan API, model, dan Yajra DataTables.

## Keterbatasan

Aplikasi ini masih client-side dan bukan sistem autentikasi asli. Fungsionalitas login, logout, dan akses data hanya bersifat simulasi UI untuk demo.

## Kontribusi dan pengembangan lanjutan

Untuk versi produksi, integrasikan:

- API Laravel 12 untuk mahasiswa, kelas, semester, dan dosen.
- Database MySQL dan migrasi.
- Autentikasi admin menggunakan Laravel Breeze atau Jetstream.
- Server-side DataTables dengan Yajra.

