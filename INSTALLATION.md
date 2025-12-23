# 📦 INSTALLATION GUIDE

## Arya Portfolio - Complete Setup

> Panduan lengkap untuk menginstall dan menjalankan project Arya Portfolio dari awal.

---

## 📋 Table of Contents

1. [Prerequisites](#-prerequisites)
2. [Quick Start](#-quick-start)
3. [Detailed Installation](#-detailed-installation)
4. [Database Setup (Supabase)](#-database-setup-supabase)
5. [Firebase Setup](#-firebase-setup)
6. [Authentication Setup](#-authentication-setup)
7. [API Keys Configuration](#-api-keys-configuration)
8. [Email Configuration](#-email-configuration)
9. [Environment Variables](#-environment-variables)
10. [Running the Project](#-running-the-project)
11. [Troubleshooting](#-troubleshooting)

---

## 🔧 Prerequisites

Pastikan Anda sudah menginstall:

| Software | Version | Download |
|----------|---------|----------|
| **Node.js** | v18.17+ | [nodejs.org](https://nodejs.org/) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |
| **Bun** (recommended) | v1.0+ | [bun.sh](https://bun.sh/) |

### Check Versions
```bash
node --version    # Should be >= 18.17
git --version     # Any recent version
bun --version     # v1.0+ (optional, can use npm)
```

---

## ⚡ Quick Start

Untuk yang ingin langsung menjalankan tanpa konfigurasi lengkap:

```bash
# 1. Clone repository
git clone https://github.com/atsiilaarya/arya-portfolio.git
cd arya-portfolio

# 2. Install dependencies
bun install
# atau
npm install

# 3. Copy environment example
cp .env.example .env

# 4. Run development server
bun dev
# atau
npm run dev
```

> ⚠️ **Note**: Beberapa fitur tidak akan berfungsi tanpa konfigurasi API keys.

---

## 📥 Detailed Installation

### Step 1: Clone Repository

```bash
git clone https://github.com/atsiilaarya/arya-portfolio.git
cd arya-portfolio
```

### Step 2: Install Dependencies

**Menggunakan Bun (Recommended - Lebih cepat):**
```bash
bun install
```

**Menggunakan NPM:**
```bash
npm install
```

**Menggunakan Yarn:**
```bash
yarn install
```

### Step 3: Create Environment File

```bash
# Copy template
cp .env.example .env

# Buka dengan editor
code .env  # VS Code
# atau
notepad .env  # Windows
```

---

## 🗄️ Database Setup (Supabase)

### Step 1: Create Supabase Account

1. Buka [supabase.com](https://supabase.com/)
2. Klik **Start your project**
3. Login dengan GitHub atau email

### Step 2: Create New Project

1. Klik **New Project**
2. Isi detail:
   - **Name**: `arya-portfolio`
   - **Database Password**: (simpan password ini!)
   - **Region**: Pilih terdekat (Singapore)
3. Klik **Create new project**
4. Tunggu sampai project ready (~2 menit)

### Step 3: Get API Keys

1. Buka **Project Settings** → **API**
2. Copy nilai berikut:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 4: Get Database Connection String

1. Buka **Project Settings** → **Database**
2. Scroll ke **Connection string**
3. Copy **URI** dengan mode:
   - **Transaction** → `POSTGRES_URL`
   - **Session** → `POSTGRES_URL_NON_POOLING`

### Step 5: Create Tables

Buka **SQL Editor** di Supabase dan jalankan:

```sql
-- Projects Table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image VARCHAR(500),
  link_demo VARCHAR(500),
  link_github VARCHAR(500),
  stacks TEXT[], -- Array of technology names
  content TEXT, -- Markdown content for project details
  is_featured BOOLEAN DEFAULT false,
  is_show BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Achievements Table
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  issuing_organization VARCHAR(255),
  issue_date DATE,
  expiration_date DATE,
  credential_id VARCHAR(255),
  description TEXT,
  url_credential VARCHAR(500),
  image VARCHAR(500),
  slug VARCHAR(255),
  category VARCHAR(100),
  is_show BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_achievements_category ON achievements(category);
```

### Step 6: Enable Row Level Security (Optional)

```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON achievements FOR SELECT USING (true);
```

### Step 7: Insert Sample Data

```sql
-- Sample Project
INSERT INTO projects (title, slug, description, stacks, is_featured, content)
VALUES (
  'Portfolio Website',
  'portfolio-website',
  'Personal portfolio built with Next.js and Tailwind CSS',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  true,
  'This is a detailed description of the portfolio project written in Markdown.'
);

-- Sample Achievement
INSERT INTO achievements (name, issuing_organization, issue_date, category, url_credential)
VALUES (
  'Web Development Certificate',
  'Google',
  '2024-01-15',
  'Certificate',
  'https://example.com/credential-link'
);
```

---

## 🔥 Firebase Setup

Firebase digunakan untuk fitur **Chat Realtime**.

### Step 1: Create Firebase Project

1. Buka [console.firebase.google.com](https://console.firebase.google.com/)
2. Klik **Add project**
3. Nama project: `arya-portfolio`
4. Disable Google Analytics (optional)
5. Klik **Create project**

### Step 2: Enable Realtime Database

1. Di sidebar, pilih **Build** → **Realtime Database**
2. Klik **Create Database**
3. Pilih region terdekat
4. Start in **test mode** (untuk development)
5. Klik **Enable**

### Step 3: Get Configuration

1. Klik ⚙️ **Project settings**
2. Scroll ke **Your apps**
3. Klik icon **Web** (`</>`)
4. Register app dengan nama `arya-portfolio-web`
5. Copy konfigurasi:

```javascript
const firebaseConfig = {
  apiKey: "xxxxx",           // → NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "xxxxx",       // → NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  projectId: "xxxxx",        // → NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: "xxxxx",    // → NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "xxxxx", // → NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: "xxxxx"             // → NEXT_PUBLIC_FIREBASE_APP_ID
};
```

### Step 4: Set Database URL

1. Buka **Realtime Database**
2. Copy URL database (format: `https://xxxxx.firebaseio.com`)
3. Set ke `NEXT_PUBLIC_FIREBASE_DB_URL`

### Step 5: Database Rules (Production)

Di **Realtime Database** → **Rules**:

```json
{
  "rules": {
    "messages": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

---

## 🔐 Authentication Setup

### Google OAuth

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat/Pilih project
3. Buka **APIs & Services** → **Credentials**
4. Klik **Create Credentials** → **OAuth client ID**
5. Application type: **Web application**
6. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
7. Copy **Client ID** dan **Client Secret**

### GitHub OAuth

1. Buka [GitHub Developer Settings](https://github.com/settings/developers)
2. Klik **New OAuth App**
3. Isi:
   - Application name: `Arya Portfolio`
   - Homepage URL: `http://localhost:3000`
   - Callback URL: `http://localhost:3000/api/auth/callback/github`
4. Klik **Register application**
5. Generate **Client Secret**
6. Copy **Client ID** dan **Client Secret**

### NextAuth Secret

Generate secret key:
```bash
openssl rand -base64 32
# atau
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🔑 API Keys Configuration

### GitHub Personal Access Token

1. Buka [GitHub Settings → Developer Settings → Personal access tokens](https://github.com/settings/tokens)
2. Klik **Generate new token (classic)**
3. Pilih scopes:
   - `read:user`
   - `repo` (untuk contributions)
4. Copy token → `GITHUB_READ_USER_TOKEN_PERSONAL`

### Wakatime API Key

1. Login ke [wakatime.com](https://wakatime.com/)
2. Buka **Settings** → **API Key**
3. Copy API Key → `WAKATIME_API_KEY`

### Codewars Username

1. Login ke [codewars.com](https://www.codewars.com/)
2. Buka profile
3. Copy username → `CODEWARS_USER_ID`

### Monkeytype API Key

1. Login ke [monkeytype.com](https://monkeytype.com/)
2. Buka **Settings** → **Account**
3. Generate API Key → `MONKEYTYPE_API_KEY`

### Gemini AI API Key

1. Buka [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Klik **Create API Key**
3. Copy key → `GEMINI_API_KEY`

### Umami Analytics (Optional)

1. Self-host Umami atau gunakan [Umami Cloud](https://umami.is/)
2. Buat website di Umami
3. Copy:
   - API Key → `UMAMI_API_KEY`
   - Website ID → `UMAMI_WEBSITE_ID_SITE`

---

## 📧 Email Configuration

### Gmail App Password

1. Buka [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Buka [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate password untuk "Mail"
5. Copy password (16 characters) → `NODEMAILER_PW`

---

## 🌐 Environment Variables

Buat file `.env` di root folder:

```env
# ===========================================
# 🔐 AUTHENTICATION
# ===========================================

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secret

# ===========================================
# 📊 ANALYTICS & STATS
# ===========================================

# GitHub Personal Access Token
GITHUB_READ_USER_TOKEN_PERSONAL=ghp_xxxxxxxxxxxxxxxxxxxx

# Wakatime
WAKATIME_API_ID=your_wakatime_user_id
WAKATIME_API_KEY=your_wakatime_api_key

# Codewars
CODEWARS_USER_ID=your_codewars_username

# Monkeytype
MONKEYTYPE_API_KEY=your_monkeytype_api_key

# Umami Analytics
UMAMI_API_KEY=your_umami_api_key
UMAMI_WEBSITE_ID_SITE=your_website_id

# ===========================================
# 🗄️ DATABASE (SUPABASE)
# ===========================================

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx

# PostgreSQL Connection Strings
POSTGRES_URL=postgres://postgres:password@db.xxxxx.supabase.co:5432/postgres
POSTGRES_URL_NON_POOLING=postgres://postgres:password@db.xxxxx.supabase.co:5432/postgres

# ===========================================
# 🔥 FIREBASE
# ===========================================

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:xxxxx
NEXT_PUBLIC_FIREBASE_DB_URL=https://your-project-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_CHAT_DB=messages

# ===========================================
# 🤖 AI & INTEGRATIONS
# ===========================================

# Gemini AI
GEMINI_API_KEY=AIzaxxxxxxxxxxxxxxxx

# ===========================================
# 📧 EMAIL
# ===========================================

NODEMAILER_PW=your_16_char_app_password
NODEMAILER_EMAIL=your_email@gmail.com

# ===========================================
# 🌐 MISC
# ===========================================

DOMAIN=http://localhost:3000
NEXT_PUBLIC_AUTHOR_EMAIL=your_email@example.com
```

---

## 🚀 Running the Project

### Development Mode

```bash
# Dengan Bun
bun dev

# Dengan NPM
npm run dev

# Dengan Yarn
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build
bun run build

# Start production server
bun start
```

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `bun dev` | Start development server |
| `build` | `bun run build` | Build for production |
| `start` | `bun start` | Start production server |
| `lint` | `bun run lint` | Run ESLint |

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
rm -rf .next
bun install
```

#### 2. Environment variables not loading
- Pastikan file `.env` ada di root folder
- Restart development server setelah mengubah `.env`
- Variable dengan `NEXT_PUBLIC_` bisa diakses di client

#### 3. Supabase connection error
- Cek `NEXT_PUBLIC_SUPABASE_URL` format (harus `https://`)
- Pastikan project Supabase aktif
- Cek API key yang benar (anon key, bukan service key)

#### 4. Firebase realtime tidak bekerja
- Pastikan Database Rules mengizinkan read/write
- Cek URL database (harus diakhiri `.firebaseio.com`)
- Pastikan project Firebase tidak di-pause

#### 5. Authentication error
- Cek callback URL di Google/GitHub console
- Pastikan `NEXTAUTH_URL` sesuai dengan URL aktual
- Generate ulang `NEXTAUTH_SECRET`

#### 6. Email tidak terkirim
- Pastikan 2-Step Verification aktif di Google
- Gunakan App Password, bukan password biasa
- Cek email pengirim valid

#### 7. Turbopack errors
```bash
# Gunakan webpack sebagai gantinya
npm run dev -- --turbo=false
```

### Debug Mode

Tambahkan di `.env`:
```env
DEBUG=true
```

### Clear Cache

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules cache
rm -rf node_modules/.cache

# Full clean install
rm -rf node_modules .next bun.lockb
bun install
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)

---

## 🆘 Need Help?

Jika mengalami masalah:

1. Cek [Issues](https://github.com/atsiilaarya/arya-portfolio/issues)
2. Buat issue baru dengan detail error
3. Contact: [your_email@example.com](mailto:your_email@example.com)

---

> 📅 Last Updated: December 2024
