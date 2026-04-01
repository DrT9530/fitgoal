# FITGOAL (Fuzzy Intelligent Target Goal Calorie Advisor)

FITGOAL adalah aplikasi web *expert system* (sistem pakar) yang dirancang untuk memberikan rekomendasi kebutuhan kalori harian yang sangat personal. Berbeda dengan kalkulator kalori biasa yang menggunakan rumus statis, FITGOAL digerakkan oleh **Mesin Logika Fuzzy Mamdani** murni.

Aplikasi ini memproses kondisi fisiologis dan target pengguna melalui evaluasi variabel derajat keanggotaan dan basis aturan (*rule base*) untuk menghasilkan panduan gaya hidup dan makronutrisi yang realistis, aman, dan terukur.

## 🚀 Fitur Utama

* **Mamdani Fuzzy Inference Engine:** Menghitung kebutuhan kalori harian menggunakan 12 aturan *fuzzy* (IF-THEN) yang secara dinamis mengevaluasi Indeks Massa Tubuh (IMT), Selisih Target Berat Badan, dan Durasi Pencapaian.
* **Integral-based Centroid Defuzzification:** Menggunakan perhitungan titik pusat gravitasi sejati pada domain `[800, 4000] kkal` untuk menghasilkan angka kalori presisi tinggi yang tidak terbatas secara matematis.
* **Dynamic Macronutrient Split:** Menghitung otomatis persentase Karbohidrat, Protein, dan Lemak harian secara *real-time* yang dapat disesuaikan pengguna.
* **Client-Side Processing:** Seluruh arsitektur perhitungan dieksekusi 100% di sisi klien (browser) untuk responsivitas instan tanpa jeda jaringan (*Zero Network Latency*).
* **No-Login Utility:** Fokus murni pada utilitas perhitungan tanpa hambatan registrasi/autentikasi.

## 🛠️ Teknologi yang Digunakan

* **Framework:** [Next.js](https://nextjs.org/) (React)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Bahasa:** TypeScript
* **Logika Inti:** Custom implementation of Mamdani Fuzzy Logic

## 💻 Cara Menjalankan Secara Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di mesin Anda sendiri:

1. **Clone repository ini**
```bash
git clone https://github.com/username-anda/fitgoal.git
```

2. **Masuk ke direktori proyek**
```bash
cd fitgoal
```

3. **Instal dependensi**

```bash
npm install
```

4. **Jalankan development server**

```bash
npm run dev
```

5. **Buka di Browser**

Buka `http://localhost:3000` di browser Anda untuk melihat aplikasi berjalan.

## 📐 Arsitektur Sistem Fuzzy (Ringkasan)
* **Input Variables:**
    * IMT (Kurus, Normal, Gemuk)
    * Selisih Berat (Kecil, Besar) - Absolute value
    * Jangka Waktu (Singkat, Lama) - Intersecting linear slopes
* **Output Variable:**
    * Kebutuhan Kalori (Sedikit, Normal, Banyak) dengan rentang 800 - 4000 kkal.
* **Knowledge Base:** 12 Aturan evaluasi komprehensif.