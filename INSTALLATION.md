# 📦 Panduan Instalasi

Dokumen ini menjelaskan cara menginstal dan menjalankan proyek ini di komputer lokal Anda.

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

*   **Node.js**: Versi 18.17 atau lebih baru (disarankan versi LTS terbaru).
*   **Git**: Untuk meng-clone repository.
*   **Code Editor**: VS Code (disarankan).

## 🛠️ Pilihan Package Manager: Bun vs NPM

**Pertanyaan:** *Apakah harus pakai Bun atau bisa pakai NPM?*

**Jawaban:**
Meskipun proyek ini dikonfigurasi menggunakan **Bun** (terlihat dari adanya file `bun.lockb`), Anda **BISA** menggunakan **NPM** (atau Yarn/PNPM).

Namun, ada beberapa catatan:
1.  **Rekomendasi**: **Bun** sangat disarankan karena lebih cepat dan proyek ini sudah memiliki lockfile `bun.lockb`.
2.  **Jika menggunakan NPM**:
    *   NPM akan mengabaikan `bun.lockb` dan membuat file `package-lock.json` baru.
    *   Pastikan versi Node.js Anda kompatibel.
    *   Instalasi mungkin sedikit lebih lambat dibandingkan Bun.

---

## 🚀 Langkah-langkah Instalasi

### 1. Clone Repository

Buka terminal dan jalankan perintah berikut:

```bash
git clone https://github.com/satriabahari/satriabahari.my.id
cd satriabahari.my.id
```

### 2. Instal Dependencies

Pilih salah satu metode di bawah ini:

#### 👉 Opsi A: Menggunakan Bun (Disarankan)

Jika belum punya Bun, instal dulu (Mac/Linux/WSL):
```bash
curl -fsSL https://bun.sh/install | bash
```
*Untuk Windows, gunakan:* `powershell -c "irm bun.sh/install.ps1 | iex"`

Lalu instal dependencies:
```bash
bun install
```

#### 👉 Opsi B: Menggunakan NPM

Jika Anda lebih memilih NPM:
```bash
npm install
```
*(Abaikan peringatan tentang `bun.lockb` jika ada)*

### 3. Konfigurasi Environment Variables

Duplikat file `.env.example` (jika ada) atau buat file baru bernama `.env` di root folder.
Isi dengan variabel yang diperlukan (lihat detail lengkap di `PROJECT.md`):

```env
# Contoh konfigurasi minimal (sesuaikan dengan kredensial Anda)
DOMAIN=http://localhost:3000
NEXT_PUBLIC_AUTHOR_EMAIL=email@anda.com

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=rahasia_random_string

# Database (Supabase/Firebase) - Wajib diisi agar fitur berjalan
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### 4. Jalankan Server Development

#### Menggunakan Bun:
```bash
bun dev
```

#### Menggunakan NPM:
```bash
npm run dev
```

Buka browser dan akses [http://localhost:3000](http://localhost:3000).

---

## ⚠️ Troubleshooting

*   **Error saat `npm install`**: Jika terjadi konflik dependensi, coba gunakan `npm install --legacy-peer-deps`.
*   **Masalah Type/TypeScript**: Jalankan `bun run lint` atau `npm run lint` untuk mengecek error.
*   **Database Error**: Pastikan variabel environment untuk Supabase/Firebase sudah benar, karena halaman seperti Projects atau Guestbook mengambil data dari sana.
