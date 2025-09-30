# 🚀 Cara Upload Portfolio ke GitHub

## 📋 Langkah-langkah Upload ke GitHub

### 1. **Buat Repository di GitHub**
1. Buka [GitHub.com](https://github.com)
2. Login dengan akun `ryan73147@gmail.com`
3. Klik tombol **"New"** atau **"+"** → **"New repository"**
4. Isi detail repository:
   - **Repository name**: `portfolio-website`
   - **Description**: `Portfolio website pribadi untuk mahasiswa Teknik Informatika`
   - **Visibility**: Public ✅
   - **Initialize**: Jangan centang apapun
5. Klik **"Create repository"**

### 2. **Upload File ke GitHub**

#### **Opsi A: Upload via GitHub Web Interface**
1. Di halaman repository yang baru dibuat
2. Klik **"uploading an existing file"**
3. Drag & drop semua file dari folder `pemograman-web1/`:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `ryan.jpg`
   - `README.md`
   - `projects/` (folder beserta isinya)
4. Klik **"Commit changes"**

#### **Opsi B: Upload via Git Command Line**
```bash
# Buka terminal/command prompt di folder pemograman-web1
cd C:\All_Project_Kuliah\pemograman-web1

# Inisialisasi git
git init

# Tambahkan semua file
git add .

# Commit pertama
git commit -m "Initial commit: Portfolio website"

# Hubungkan dengan GitHub repository
git remote add origin https://github.com/ryan73147/portfolio-website.git

# Upload ke GitHub
git push -u origin main
```

### 3. **Aktifkan GitHub Pages**
1. Di repository GitHub, klik tab **"Settings"**
2. Scroll ke bagian **"Pages"** di sidebar kiri
3. Di **"Source"**, pilih **"Deploy from a branch"**
4. Pilih branch **"main"** dan folder **"/ (root)"**
5. Klik **"Save"**
6. Tunggu beberapa menit, lalu akses: `https://ryan73147.github.io/portfolio-website/`

## 📁 Struktur Repository yang Benar

```
portfolio-website/
├── index.html              # ✅ Halaman utama
├── styles.css              # ✅ Styling
├── script.js               # ✅ JavaScript
├── ryan.jpg                # ✅ Foto profil
├── README.md               # ✅ Dokumentasi
├── .gitignore              # ✅ Git ignore
├── GITHUB_SETUP.md         # ✅ Instruksi setup
└── projects/               # ✅ Folder proyek
    ├── kalkulator.html     # ✅ Kalkulator
    ├── todolist.html       # ✅ To-Do List
    ├── weather.html        # ⏳ Coming soon
    └── portfolio.html      # ⏳ Coming soon
```

## 🔗 Link Repository yang Akan Dibuat

- **Repository**: `https://github.com/ryan73147/portfolio-website`
- **Live Demo**: `https://ryan73147.github.io/portfolio-website/`
- **Email**: `ryan73147@gmail.com`

## 📝 Repository Terpisah untuk Setiap Proyek

### 1. **Kalkulator Web**
- **Repository**: `https://github.com/ryan73147/kalkulator-web`
- **File**: Copy `projects/kalkulator.html` ke repository baru

### 2. **To-Do List App**
- **Repository**: `https://github.com/ryan73147/todolist-app`
- **File**: Copy `projects/todolist.html` ke repository baru

### 3. **Weather App**
- **Repository**: `https://github.com/ryan73147/weather-app`
- **File**: Buat file `weather.html` di repository baru

### 4. **Portfolio Website**
- **Repository**: `https://github.com/ryan73147/portfolio-website` (sudah ada)
- **File**: Semua file portfolio

## ✅ Checklist Upload

- [ ] Repository `portfolio-website` dibuat
- [ ] Semua file diupload ke GitHub
- [ ] GitHub Pages diaktifkan
- [ ] Live demo berfungsi di `https://ryan73147.github.io/portfolio-website/`
- [ ] Repository terpisah dibuat untuk setiap proyek
- [ ] Link GitHub di portfolio sudah benar

## 🆘 Troubleshooting

### **Jika GitHub Pages tidak muncul:**
1. Tunggu 5-10 menit
2. Cek di **Settings** → **Pages** → **Source**
3. Pastikan branch `main` dipilih

### **Jika file tidak muncul:**
1. Pastikan file ada di root folder repository
2. Cek nama file (case sensitive)
3. Refresh halaman GitHub

### **Jika link tidak berfungsi:**
1. Pastikan URL repository benar
2. Cek apakah repository public
3. Pastikan file ada di repository

## 📞 Bantuan

Jika ada masalah, cek:
1. **GitHub Status**: [status.github.com](https://status.github.com)
2. **GitHub Docs**: [docs.github.com](https://docs.github.com)
3. **GitHub Community**: [github.community](https://github.community)

---

**Selamat! Portfolio Anda akan live di GitHub Pages! 🎉**
