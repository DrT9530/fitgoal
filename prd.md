Halo, DrT. Berikut adalah pembaruan *Product Requirements Document* (PRD) untuk sistem FITGOAL yang telah disusun ulang secara komprehensif sesuai dengan struktur, deskripsi, dan spesifikasi desain yang telah ditentukan:

---

# PRODUCT REQUIREMENTS DOCUMENT (PRD)
**Project Name:** FITGOAL (Fuzzy Intelligent Target Goal Calorie Advisor & Lifestyle)
**Methodology:** Fuzzy Mamdani Logic
**Platform:** Web-Based Application

---

### 1. Overview
FITGOAL adalah sistem cerdas berbasis web yang dirancang untuk memberikan rekomendasi kebutuhan kalori harian yang sangat personal. Dengan menggabungkan data kondisi fisik saat ini dan target kesehatan masa depan, sistem ini menjembatani celah antara keinginan pengguna dan perhitungan ilmiah yang realistis melalui pendekatan logika fuzzy metode Mamdani.

**Tujuan Utama:**
* Mengimplementasikan perhitungan kebutuhan kalori yang akurat berdasarkan variabel fisiologis.
* Menghasilkan *rule base* yang komprehensif untuk merepresentasikan kondisi unik setiap pengguna.
* Menjamin sinkronisasi antara kalkulasi manual metode Mamdani dengan sistem digital.

---

### 2. Requirement
**Fungsional:**
* Sistem harus mampu menghitung Indeks Massa Tubuh (IMT) secara otomatis.
* Sistem harus mampu memproses 12 aturan (*rule base*) fuzzy secara *real-time*.
* Sistem harus menampilkan hasil akhir dalam satuan kilokalori (kkal) dengan tingkat presisi tinggi.

**Non-Fungsional:**
* **Akurasi:** Hasil defuzzifikasi sistem harus memiliki kesesuaian penuh dengan perhitungan manual Mamdani.
* **Responsivitas:** Antarmuka web harus optimal diakses melalui berbagai perangkat.
* **Usability:** Desain antarmuka harus mengikuti pedoman visual yang telah ditentukan untuk kenyamanan pengguna.

---

### 3. Core Features
* **Input Data Fisik & Target:** Form masukan untuk berat badan (kg), tinggi badan (cm), target berat badan impian (kg), dan jangka waktu pencapaian (bulan).
* **Mamdani Fuzzy Engine:** Mesin inferensi yang mengolah variabel IMT, Selisih Berat Badan, dan Jangka Waktu.
* **Dynamic Result Dashboard:** Tampilan hasil prediksi kalori (Sedikit, Normal, atau Banyak) yang disertai dengan angka pasti hasil defuzzifikasi.
* **Lifestyle Advisor:** Penjelasan ringkas mengenai rekomendasi kalori yang dihasilkan untuk mendukung pola hidup sehat.

---

###4. User Flow
Pendaratan (Landing): Pengguna mengakses halaman utama FITGOAL. Terdapat opsi Login / Registrasi (Opsional) bagi pengguna yang ingin membuat akun agar dapat melacak riwayat target dan rekomendasi kalori mereka dari waktu ke waktu.

Input Data Fisik & Target: Pengguna (baik sebagai tamu maupun pengguna yang sudah login) memasukkan data Berat Badan (BB) saat ini, Tinggi Badan (TB), Target BB impian (kg), dan estimasi Durasi Waktu pencapaian (bulan).

Proses Inferensi Sistem: Sistem secara otomatis menghitung selisih berat badan dan nilai IMT dari data masukan, kemudian meneruskannya ke mesin inferensi fuzzy.

Fuzzifikasi & Evaluasi Aturan: Sistem memetakan nilai tegas ke dalam derajat keanggotaan fuzzy dan mengevaluasinya berdasarkan 12 basis aturan (rule base) Mamdani secara real-time.

Output Rekomendasi: Layar menampilkan dashboard hasil akhir yang berisi prediksi angka kebutuhan kalori harian (kkal) beserta panduan gaya hidup (lifestyle advisor).

Penyimpanan Riwayat Data (Opsional):

Bagi Pengguna Terdaftar (Logged In): Hasil perhitungan dan target otomatis tersimpan ke dalam database dan dapat diakses melalui halaman History/Dashboard profil pengguna.

Bagi Pengguna Tamu (Guest): Sistem menampilkan prompt atau pop-up opsional di layar hasil (misalnya: "Simpan riwayat ini? Login atau Daftar sekarang") untuk memberikan kesempatan kepada tamu menyimpan data mereka.

---

### 5. Architecture
Arsitektur logika sistem dibagi menjadi empat tahap utama metode Mamdani:


1.  **Fuzzifikasi:** Mengubah input tegas (IMT, Selisih BB, Jangka Waktu) menjadi nilai linguistik menggunakan fungsi keanggotaan trapesium dan segitiga.
2.  **Basis Aturan (Rule Base):** Mengaplikasikan 12 aturan IF-AND-THEN (Contoh: R1 - Jika IMT Kurus AND Selisih Kecil AND Waktu Singkat, maka Kalori Normal).
3.  **Mekanisme Inferensi:** Menggunakan fungsi implikasi (MIN) untuk setiap aturan dan agregasi (MAX) untuk mendapatkan output fuzzy.
4.  **Defuzzifikasi:** Mengubah nilai fuzzy kembali menjadi nilai tegas (Kebutuhan Kalori dalam kkal) menggunakan metode Centroid atau Mean of Maximum.

---

### 6. Design & Technical Constraint
**Visual Design:**
* **Typography:** Merriweather (Google Fonts).
* **Color Palette:**
    * `#111111` (Primary Text/Dark Background): Digunakan untuk teks utama dan latar belakang panel bawah.
    * `#4AD5CA` (Accent/Primary Button): Digunakan untuk penekanan (accent) dan tombol aksi utama.
    * `#F3F3F3` (Secondary Button/Element Background): Digunakan untuk latar belakang elemen sekunder.
    * `#FFFFFF` (Main Panel Background): Digunakan sebagai warna latar belakang kartu konten utama.

**Technical Constraints:**
* Sistem harus berbasis web.
* Variabel input terbatas pada IMT, Selisih BB, dan Jangka Waktu.
* Batas nilai fungsi keanggotaan harus sesuai dengan standar kesehatan yang ditetapkan dalam tabel variabel (contoh: ambang batas IMT normal 17-25).
* Output kalori dibatasi dalam rentang hasil fuzzy (Sedikit: <1100, Normal: 1000-1800, Banyak: >1600).

---

Semoga struktur ini membantu memperjelas pengembangan sistem FITGOAL Anda. Ada bagian lain yang ingin Anda pertajam?