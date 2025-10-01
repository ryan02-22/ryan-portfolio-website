# Panduan Setup SEO & Analytics

## 🚀 Setup Google Analytics

### 1. Buat Akun Google Analytics
1. Kunjungi [Google Analytics](https://analytics.google.com/)
2. Klik "Start measuring"
3. Buat property baru untuk website Anda
4. Dapatkan Measurement ID (format: G-XXXXXXXXXX)

### 2. Update Measurement ID
1. Buka file `analytics-config.js`
2. Ganti `GA_MEASUREMENT_ID` dengan ID Anda:
```javascript
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Ganti dengan ID Anda
```

3. Update semua file HTML:
   - `index.html`
   - `articles.html`
   - `write-article.html`
   - `article-detail.html`

Ganti `GA_MEASUREMENT_ID` dengan ID yang sebenarnya di semua file.

## 🔍 Setup Google Search Console

### 1. Verifikasi Website
1. Kunjungi [Google Search Console](https://search.google.com/search-console/)
2. Tambahkan property website Anda
3. Pilih metode verifikasi (HTML file atau meta tag)

### 2. Submit Sitemap
1. Di Google Search Console, pilih property Anda
2. Klik "Sitemaps" di menu kiri
3. Tambahkan sitemap: `https://your-domain.com/sitemap.xml`
4. Klik "Submit"

### 3. Monitor Performance
- Pantau indexing status
- Periksa Core Web Vitals
- Analisis search queries
- Monitor crawl errors

## 📄 File SEO yang Sudah Dibuat

### 1. `sitemap.xml`
- Daftar semua halaman website
- Prioritas dan frekuensi update
- Last modified dates

### 2. `robots.txt`
- Instruksi untuk search engine crawlers
- Allow/disallow specific paths
- Sitemap location

### 3. Meta Tags (di semua halaman)
- Description dan keywords
- Open Graph untuk social media
- Twitter Card tags
- Canonical URLs
- Geo-location tags

## 🎯 Optimasi SEO yang Sudah Diterapkan

### 1. Technical SEO
- ✅ Semantic HTML5
- ✅ Meta tags lengkap
- ✅ Canonical URLs
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Structured data (JSON-LD)

### 2. Content SEO
- ✅ Title tags yang descriptive
- ✅ Meta descriptions yang menarik
- ✅ Heading hierarchy (H1, H2, H3)
- ✅ Alt text untuk images
- ✅ Internal linking

### 3. Performance SEO
- ✅ Fast loading (vanilla HTML/CSS/JS)
- ✅ Mobile responsive
- ✅ Clean code structure
- ✅ Optimized images

## 📊 Tracking Events

### Custom Events yang Tersedia
```javascript
// Track article views
trackArticleView(articleId, articleTitle, category);

// Track form submissions
trackFormSubmission('contact_form');

// Track button clicks
trackButtonClick('view_projects', 'homepage');

// Track search queries
trackSearch('web development', 5);
```

### Implementasi di Website
Tambahkan tracking events di JavaScript:
```javascript
// Contoh: Track ketika user melihat artikel
document.addEventListener('DOMContentLoaded', function() {
    // Track page view
    trackPageView(window.location.pathname, document.title);
    
    // Track button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            trackButtonClick(this.textContent, 'homepage');
        });
    });
});
```

## 🔧 Maintenance SEO

### 1. Update Sitemap
- Update `sitemap.xml` ketika menambah halaman baru
- Update lastmod dates
- Tambahkan artikel baru ke sitemap

### 2. Monitor Analytics
- Pantau traffic dari Google Analytics
- Analisis user behavior
- Optimasi berdasarkan data

### 3. Content Updates
- Update meta descriptions secara berkala
- Tambahkan keywords baru
- Optimasi konten berdasarkan search queries

## 📈 Tips Optimasi Lanjutan

### 1. Core Web Vitals
- Monitor LCP (Largest Contentful Paint)
- Optimasi CLS (Cumulative Layout Shift)
- Perbaiki FID (First Input Delay)

### 2. Content Strategy
- Tulis konten berkualitas tinggi
- Update artikel secara berkala
- Gunakan keywords yang relevan

### 3. Link Building
- Dapatkan backlinks dari website berkualitas
- Share di social media
- Submit ke direktori portfolio

## 🚨 Checklist Setup

- [ ] Ganti `GA_MEASUREMENT_ID` di semua file
- [ ] Update domain di `sitemap.xml` dan `robots.txt`
- [ ] Verifikasi website di Google Search Console
- [ ] Submit sitemap ke Google Search Console
- [ ] Test website di Google PageSpeed Insights
- [ ] Monitor Google Analytics untuk data traffic

## 📞 Support

Jika ada pertanyaan tentang setup SEO, silakan konsultasi dengan:
- Google Analytics Help Center
- Google Search Console Help
- Web.dev untuk best practices

---

**Catatan**: Ganti `your-domain.com` dengan domain website Anda yang sebenarnya di semua file.
