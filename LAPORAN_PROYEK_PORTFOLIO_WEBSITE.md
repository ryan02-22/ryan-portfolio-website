# LAPORAN PROYEK PORTFOLIO WEBSITE

**Mata Kuliah:** Pemrograman Web 1  
**Nama:** ADHA ADNAN FEBRYAN  
**NIM:** [NIM Mahasiswa]  
**Kelas:** [Kelas]  
**Dosen:** [Nama Dosen]  
**Tanggal:** [Tanggal Pengumpulan]  

---

## 1. PENDAHULUAN

### 1.1 Latar Belakang
Portfolio website adalah salah satu cara efektif untuk memamerkan kemampuan, proyek, dan pencapaian akademik seorang mahasiswa teknik informatika. Website ini dibuat sebagai tugas mata kuliah Pemrograman Web 1 dengan menggunakan teknologi web modern seperti HTML5, CSS3, dan JavaScript.

### 1.2 Tujuan
- Membuat website portfolio yang responsive dan modern
- Menerapkan konsep-konsep web development yang telah dipelajari
- Menampilkan informasi akademik, proyek, dan kontak pribadi
- Mengimplementasikan fitur-fitur interaktif seperti dark mode dan animasi

### 1.3 Manfaat
- Sebagai media promosi diri untuk mencari kesempatan magang atau kerja
- Meningkatkan portofolio digital mahasiswa
- Menerapkan ilmu yang telah dipelajari dalam mata kuliah

---

## 2. ANALISIS DAN PERANCANGAN

### 2.1 Analisis Kebutuhan
Website portfolio ini dirancang untuk menampilkan:
- Informasi pribadi dan akademik
- Jadwal mata kuliah semester ini
- Proyek-proyek yang telah dibuat
- Skills dan kemampuan teknis
- Informasi kontak

### 2.2 Perancangan Sistem
Website menggunakan arsitektur client-side dengan struktur sebagai berikut:

```
portfolio-website/
├── index.html              # Halaman utama
├── styles.css              # Styling CSS
├── script.js               # JavaScript functionality
├── ryan.jpg                # Foto profil
├── README.md               # Dokumentasi
└── projects/               # Folder proyek
    ├── kalkulator.html     # Proyek kalkulator
    └── todolist.html       # Proyek to-do list
```

### 2.3 Teknologi yang Digunakan
- **HTML5**: Struktur halaman web
- **CSS3**: Styling dan layout responsive
- **JavaScript (ES6+)**: Interaktivitas dan animasi
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Poppins)
- **Git & GitHub**: Version control dan hosting

---

## 3. IMPLEMENTASI

### 3.1 Struktur HTML
Website menggunakan HTML5 semantik dengan struktur:
- `<header>`: Navigation bar
- `<main>`: Konten utama
- `<section>`: Bagian-bagian konten
- `<footer>`: Informasi footer

### 3.2 Styling CSS
Menggunakan CSS3 dengan fitur:
- **CSS Grid & Flexbox**: Layout responsive
- **CSS Variables**: Custom properties untuk theming
- **Media Queries**: Responsive design
- **Animations & Transitions**: Efek visual
- **Gradient Backgrounds**: Desain modern

### 3.3 JavaScript Functionality
Implementasi JavaScript meliputi:
- **Dark Mode Toggle**: Switch tema gelap/terang
- **Smooth Scrolling**: Navigasi halus antar section
- **Mobile Navigation**: Hamburger menu untuk mobile
- **Form Validation**: Validasi form kontak
- **Animations**: Intersection Observer untuk animasi scroll
- **Profile Photo Upload**: Upload dan preview foto profil

### 3.4 Responsive Design
Website dirancang responsive untuk:
- **Desktop**: 1200px+ (Layout penuh)
- **Tablet**: 768px - 1199px (Layout 2 kolom)
- **Mobile**: 480px - 767px (Layout 1 kolom)
- **Small Mobile**: 360px - 479px (Layout compact)

---

## 4. FITUR-FITUR WEBSITE

### 4.1 Navigation
- **Fixed Navigation Bar**: Selalu terlihat saat scroll
- **Smooth Scrolling**: Animasi halus saat navigasi
- **Mobile Hamburger Menu**: Menu collapsible untuk mobile
- **Dark Mode Toggle**: Switch tema gelap/terang

### 4.2 Hero Section
- **Profile Photo**: Foto profil dengan overlay upload
- **Animated Text**: Typing animation untuk nama
- **Floating Elements**: Elemen dekoratif yang bergerak
- **Call-to-Action Buttons**: Tombol navigasi ke proyek dan kontak

### 4.3 About Section
- **Personal Information**: Deskripsi pribadi
- **Academic Statistics**: Statistik pencapaian
- **Timeline**: Riwayat pendidikan dan pengalaman kerja

### 4.4 Skills Section
- **Progress Bars**: Visualisasi kemampuan dengan animasi
- **Categories**: Pengelompokan skills berdasarkan kategori
- **Hover Effects**: Efek interaktif saat hover

### 4.5 Projects Section
- **Project Cards**: Tampilan proyek dengan gambar dan deskripsi
- **Filter System**: Filter proyek berdasarkan kategori
- **Live Links**: Link ke demo dan source code GitHub
- **Technology Tags**: Tag teknologi yang digunakan

### 4.6 Schedule Section
- **Academic Schedule**: Tabel jadwal mata kuliah
- **Statistics**: Statistik akademik (IPK, jumlah mata kuliah)
- **Current Semester**: Informasi semester aktif

### 4.7 Contact Section
- **Contact Form**: Form kontak dengan validasi
- **Contact Information**: Informasi kontak lengkap
- **Social Media Links**: Link ke media sosial

---

## 5. PROYEK SAMPEL

### 5.1 Kalkulator Web
- **File**: `projects/kalkulator.html`
- **Teknologi**: HTML, CSS, JavaScript
- **Fitur**: Operasi matematika dasar, keyboard support, error handling
- **Design**: Modern gradient design dengan animasi

### 5.2 To-Do List App
- **File**: `projects/todolist.html`
- **Teknologi**: HTML, CSS, JavaScript, Local Storage
- **Fitur**: CRUD operations, filter, statistik, responsive design
- **Design**: Colorful design dengan smooth animations

---

## 6. TESTING DAN EVALUASI

### 6.1 Cross-Browser Testing
Website telah ditest di berbagai browser:
- ✅ Google Chrome (Latest)
- ✅ Mozilla Firefox (Latest)
- ✅ Microsoft Edge (Latest)
- ✅ Safari (Latest)

### 6.2 Responsive Testing
Website telah ditest di berbagai ukuran layar:
- ✅ Desktop (1920x1080, 1366x768)
- ✅ Tablet (768x1024, 1024x768)
- ✅ Mobile (375x667, 414x896, 360x640)

### 6.3 Performance Testing
- ✅ **Page Load Speed**: < 3 detik
- ✅ **Mobile Performance**: Optimized untuk mobile
- ✅ **SEO Friendly**: Meta tags dan struktur yang baik

---

## 7. DEPLOYMENT

### 7.1 Version Control
Proyek menggunakan Git untuk version control:
- **Repository**: `https://github.com/ryan02-22/ryan-portfolio-website`
- **Branch**: `main`
- **Commits**: 3+ commits dengan pesan yang deskriptif

### 7.2 Hosting
Website dihosting menggunakan GitHub Pages:
- **URL**: `https://ryan02-22.github.io/ryan-portfolio-website/`
- **SSL**: Enabled (HTTPS)
- **CDN**: Global content delivery

---

## 8. KESIMPULAN

### 8.1 Pencapaian
- ✅ Berhasil membuat website portfolio yang modern dan responsive
- ✅ Mengimplementasikan semua fitur yang direncanakan
- ✅ Website compatible di semua device dan browser
- ✅ Menggunakan teknologi web modern (HTML5, CSS3, JavaScript)
- ✅ Berhasil deploy ke GitHub Pages

### 8.2 Pembelajaran
- Mempelajari konsep responsive design
- Menguasai CSS Grid dan Flexbox
- Memahami JavaScript ES6+ dan DOM manipulation
- Belajar Git dan GitHub untuk version control
- Mengimplementasikan best practices dalam web development

### 8.3 Pengembangan Selanjutnya
- Menambahkan backend untuk form kontak
- Mengimplementasikan CMS untuk update konten
- Menambahkan blog section
- Optimasi SEO lebih lanjut
- Menambahkan lebih banyak proyek

---

## 9. REFERENSI

1. MDN Web Docs - HTML, CSS, JavaScript Documentation
2. W3Schools - Web Development Tutorials
3. CSS-Tricks - CSS Tips and Tricks
4. GitHub - Version Control Documentation
5. Google Fonts - Typography Resources

---

## 10. LAMPIRAN

### 10.1 Screenshot Website
[Screenshot dapat dilihat di repository GitHub]

### 10.2 Source Code
[Source code tersedia di: https://github.com/ryan02-22/ryan-portfolio-website]

### 10.3 Live Demo
[Live website: https://ryan02-22.github.io/ryan-portfolio-website/]

---

**Laporan ini dibuat dengan sebenar-benarnya untuk memenuhi tugas mata kuliah Pemrograman Web 1.**

**Hormat saya,**
**ADHA ADNAN FEBRYAN**
