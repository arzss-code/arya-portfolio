# 📁 PROJECT DOCUMENTATION

## Arya Portfolio - Personal Website

> 🔥 Website personal yang dibangun dari scratch menggunakan **Next.js**, **TypeScript**, **Tailwind CSS**, **Supabase**, dan teknologi modern lainnya.

---

## 📋 Daftar Isi

1. [Introduction](#-introduction)
2. [Tech Stack](#-tech-stack)
3. [Project Structure](#-project-structure)
4. [Features](#-features)
5. [Pages & Routes](#-pages--routes)
6. [API Endpoints](#-api-endpoints)
7. [Services](#-services)
8. [Components](#-components)
9. [State Management](#-state-management)
10. [Styling](#-styling)
11. [Environment Variables](#-environment-variables)
12. [Installation](#-installation)
13. [Scripts](#-scripts)
14. [Deployment](#-deployment)
15. [License](#-license)

---

## 📘 Introduction

Website portfolio personal yang dibangun sejak Februari 2024 menggunakan teknologi modern. Website ini berfungsi sebagai platform untuk menampilkan:

- **Projects** - Showcase proyek-proyek yang pernah dikerjakan
- **Achievements** - Pencapaian dan sertifikat
- **Dashboard** - Statistik developer (GitHub, Wakatime, Codewars, dst.)
- **Blog/Insights** - Berbagi insights dan resources
- **Contact** - Formulir kontak
- **Chat** - Fitur chat terintegrasi dengan AI

---

## 🛠 Tech Stack

### **Core Framework**
| Technology | Version | Description |
|------------|---------|-------------|
| ⚛️ Next.js | ^16.1.1 | React framework dengan App Router |
| 🔰 TypeScript | 5.7.2 | Type-safe JavaScript |
| ⚛️ React | ^19.2.3 | UI Library |

### **Styling**
| Technology | Version | Description |
|------------|---------|-------------|
| 💠 Tailwind CSS | ^3.3.0 | Utility-first CSS framework |
| 🎨 Emotion | ^11.11.3 | CSS-in-JS library |

### **State Management**
| Technology | Version | Description |
|------------|---------|-------------|
| 🦫 Zustand | ^4.5.1 | Lightweight state management |
| 〰️ SWR | ^2.2.5 | Data fetching & caching |

### **Animation**
| Technology | Version | Description |
|------------|---------|-------------|
| ➰ Framer Motion | ^11.3.21 | Animation library |
| 🎬 GSAP | ^3.13.0 | Professional animations |
| 📜 AOS | ^2.3.4 | Animate on scroll |
| 🌊 Lenis | ^1.3.8 | Smooth scrolling |

### **Backend & Database**
| Technology | Version | Description |
|------------|---------|-------------|
| 🟢 Supabase | ^0.4.0 | PostgreSQL database |
| 🔥 Firebase | ^10.12.3 | Realtime database & auth |
| 📧 Nodemailer | ^6.9.10 | Email service |

### **Authentication**
| Technology | Version | Description |
|------------|---------|-------------|
| 🔐 NextAuth | ^4.24.13 | Authentication solution |

### **Internationalization**
| Technology | Version | Description |
|------------|---------|-------------|
| 🌐 Next-Intl | ^4.6.1 | i18n support |

### **Analytics**
| Technology | Version | Description |
|------------|---------|-------------|
| 📊 Vercel Analytics | ^1.3.1 | Website analytics |
| 📈 Chart.js | ^4.5.0 | Data visualization |

### **Content**
| Technology | Version | Description |
|------------|---------|-------------|
| 📝 React Markdown | ^10.1.0 | Markdown rendering |
| 🎨 React Syntax Highlighter | ^15.5.0 | Code syntax highlighting |
| 📄 Gray Matter | ^4.0.3 | YAML front matter parser |

### **Other**
| Technology | Version | Description |
|------------|---------|-------------|
| 💢 React Icons | ^5.0.1 | Icon library |
| 📋 React Hook Form | ^7.50.1 | Form handling |
| 🖼️ Sharp | ^0.34.3 | Image processing |
| ☁️ Cloudinary | ^2.0.1 | Image hosting |
| 📅 date-fns | 2.30.0 | Date utilities |

---

## 📂 Project Structure

```
arya-portfolio/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 about/              # Halaman About
│   ├── 📁 achievements/       # Halaman Achievements
│   ├── 📁 api/                # API Routes
│   │   ├── 📁 achievements/   # Achievements API
│   │   ├── 📁 auth/           # NextAuth API
│   │   ├── 📁 chat/           # Chat API (Gemini)
│   │   ├── 📁 codewars/       # Codewars stats API
│   │   ├── 📁 email/          # Email API
│   │   ├── 📁 github/         # GitHub stats API
│   │   ├── 📁 monkeytype/     # Monkeytype stats API
│   │   ├── 📁 projects/       # Projects API
│   │   ├── 📁 read-stats/     # Reading stats API
│   │   └── 📁 umami/          # Analytics API
│   ├── 📁 chat/               # Halaman Chat
│   ├── 📁 contact/            # Halaman Contact
│   ├── 📁 dashboard/          # Halaman Dashboard
│   ├── 📁 projects/           # Halaman Projects
│   ├── 📁 smart-talk/         # Smart Talk feature
│   ├── 📄 favicon.ico         # Favicon
│   ├── 📄 globals.css         # Global styles
│   ├── 📄 layout.tsx          # Root layout
│   ├── 📄 not-found.tsx       # 404 page
│   └── 📄 page.tsx            # Homepage
│
├── 📁 common/                 # Shared resources
│   ├── 📁 components/         # Reusable UI components (54+ components)
│   ├── 📁 config/             # Configuration files
│   ├── 📁 constants/          # Constants & static data
│   ├── 📁 helpers/            # Helper functions
│   ├── 📁 libs/               # Third-party library configs
│   ├── 📁 stores/             # Zustand stores
│   ├── 📁 styles/             # Additional styles
│   ├── 📁 types/              # TypeScript type definitions
│   └── 📁 utils/              # Utility functions
│
├── 📁 contents/               # Content files (MDX/Markdown)
│
├── 📁 hooks/                  # Custom React hooks
│
├── 📁 messages/               # i18n translation files
│
├── 📁 modules/                # Feature modules
│   ├── 📁 about/              # About page module
│   ├── 📁 achievements/       # Achievements module
│   ├── 📁 chat/               # Chat module
│   ├── 📁 contact/            # Contact module
│   ├── 📁 dashboard/          # Dashboard module
│   ├── 📁 home/               # Home page module
│   ├── 📁 projects/           # Projects module
│   └── 📁 smarttalk/          # Smart Talk module
│
├── 📁 public/                 # Static assets
│
├── 📁 services/               # API service functions
│   ├── 📄 achievements.ts     # Achievements service
│   ├── 📄 codewars.ts         # Codewars API service
│   ├── 📄 fetcher.ts          # Generic fetcher
│   ├── 📄 github.ts           # GitHub API service
│   ├── 📄 locale.ts           # Locale service
│   ├── 📄 monkeytype.ts       # Monkeytype API service
│   ├── 📄 projects.ts         # Projects service
│   ├── 📄 umami.ts            # Umami analytics service
│   └── 📄 wakatime.ts         # Wakatime API service
│
├── 📄 .eslintrc.json          # ESLint configuration
├── 📄 .gitignore              # Git ignore rules
├── 📄 config.ts               # App configuration
├── 📄 i18n.ts                 # i18n setup
├── 📄 next.config.mjs         # Next.js configuration
├── 📄 package.json            # Dependencies & scripts
├── 📄 postcss.config.js       # PostCSS configuration
├── 📄 prettier.config.js      # Prettier configuration
├── 📄 tailwind.config.ts      # Tailwind CSS configuration
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 SessionProvider.tsx     # Auth session provider
├── 📄 INSTALLATION.md         # Installation guide
├── 📄 README.md               # Project readme
└── 📄 PROJECT.md              # This documentation
```

---

## ✨ Features

### 🏠 **Homepage**
- Hero section dengan animasi
- Intro section
- Skills showcase
- Featured projects carousel
- Smooth scrolling dengan Lenis

### 👤 **About Page**
- Personal bio
- Education & career timeline
- Tech stack showcase
- Skills overview

### 🗳 **Projects Showcase**
- Project listing dengan filtering
- Individual project detail pages
- Data dari Supabase PostgreSQL
- ISR (Incremental Static Regeneration)

### 🏆 **Achievements**
- Sertifikat & pencapaian
- Image gallery
- Kategori achievements

### 📊 **Developer Dashboard**
Interactive dashboard yang menampilkan:
- **GitHub Contributions** - Commit history & stats
- **Wakatime Stats** - Coding activity
- **Codewars Progress** - Challenge rankings
- **Monkeytype Stats** - Typing speed statistics
- **Reading Stats** - Reading activity

### 💬 **AI Chat (Smart Talk)**
- Chat interface dengan Gemini AI
- Firebase realtime database
- User authentication required

### 📧 **Contact Form**
- Form validation dengan React Hook Form
- Email sending via Nodemailer
- Success/error handling

### 🌍 **Internationalization**
- Multi-language support (ID, EN)
- Easy locale switching
- Menggunakan next-intl

### 🎨 **Modern UI/UX**
- Glassmorphism design
- Dark mode support
- Responsive layout
- Micro-animations
- Smooth transitions

---

## 🛣 Pages & Routes

| Route | Description | Module |
|-------|-------------|--------|
| `/` | Homepage | `modules/home` |
| `/about` | About page | `modules/about` |
| `/projects` | Projects listing | `modules/projects` |
| `/projects/[slug]` | Project detail | `modules/projects` |
| `/achievements` | Achievements | `modules/achievements` |
| `/dashboard` | Developer dashboard | `modules/dashboard` |
| `/contact` | Contact form | `modules/contact` |
| `/chat` | AI Chat | `modules/chat` |
| `/smart-talk` | Smart Talk feature | `modules/smarttalk` |

---

## 🔌 API Endpoints

### External API Integrations

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/github` | GET | GitHub contributions & stats |
| `/api/wakatime` | GET | Wakatime coding activity |
| `/api/codewars` | GET | Codewars statistics |
| `/api/monkeytype` | GET | Monkeytype typing stats |
| `/api/umami` | GET | Website analytics |

### Internal APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | * | NextAuth authentication |
| `/api/email` | POST | Send contact email |
| `/api/projects` | GET | Get all projects |
| `/api/projects/[slug]` | GET | Get project by slug |
| `/api/achievements` | GET | Get achievements |
| `/api/chat` | POST | Gemini AI chat |
| `/api/read-stats` | GET | Reading statistics |

---

## ⚙️ Services

### `services/github.ts`
Mengambil data dari GitHub API:
- Contributions graph
- Repository statistics
- Profile information

### `services/wakatime.ts`
Mengambil coding statistics:
- Daily/weekly coding time
- Languages used
- Projects worked on

### `services/codewars.ts`
Mengambil challenge stats:
- Rank & honor points
- Completed challenges
- Language rankings

### `services/monkeytype.ts`
Mengambil typing statistics:
- Words per minute (WPM)
- Accuracy
- Tests completed

### `services/umami.ts`
Analytics dashboard:
- Page views
- Visitors count
- Traffic sources

### `services/projects.ts`
Database operations:
- Fetch all projects
- Fetch project by slug
- Data dari Supabase

### `services/achievements.ts`
Achievements management:
- Fetch achievements
- Categories filtering

---

## 🧩 Components

### Core Components (`common/components/`)

#### Layout
- `Sidebar` - Navigasi sidebar
- `Header` - Page header
- `Footer` - Page footer
- `Container` - Content wrapper
- `PageWrapper` - Page layout wrapper

#### UI Elements
- `Button` - Custom button variants
- `Card` - Card component dengan glassmorphism
- `Badge` - Status badges
- `Avatar` - User avatar
- `Tooltip` - Hover tooltips
- `Modal` - Modal dialogs
- `Skeleton` - Loading skeletons

#### Interactive
- `ThemeToggle` - Dark/light mode switch
- `LocaleSwitch` - Language switcher
- `ScrollProgress` - Scroll indicator
- `BackToTop` - Scroll to top button

#### Animation
- `AnimatedSection` - Section dengan AOS
- `MarqueeText` - Scrolling text
- `ParticleBackground` - Particle effects

---

## 🗃️ State Management

### Zustand Stores (`common/stores/`)

```typescript
// Contoh store structure
stores/
├── useThemeStore.ts    # Theme (dark/light) state
├── useSidebarStore.ts  # Sidebar open/close state
├── useModalStore.ts    # Modal visibility state
└── useMenuStore.ts     # Menu state
```

### SWR untuk Data Fetching
```typescript
// Contoh penggunaan SWR
const { data, error, isLoading } = useSWR('/api/github', fetcher);
```

---

## 🎨 Styling

### Tailwind CSS Configuration
File: `tailwind.config.ts`

Custom configurations:
- **Colors** - Custom color palette
- **Typography** - Font families
- **Animations** - Custom keyframes
- **Plugins** - Custom utilities

### Global Styles
File: `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom base styles */
/* Glassmorphism utilities */
/* Animation classes */
```

### Design System
- **Typography**: Inter, Roboto, custom fonts
- **Colors**: Custom palette dengan dark mode variants
- **Spacing**: Consistent spacing scale
- **Shadows**: Glassmorphism shadows
- **Borders**: Subtle glass borders

---

## 🔐 Environment Variables

Buat file `.env` di root folder dengan variabel berikut:

```env
# ===========================================
# 🔐 AUTHENTICATION
# ===========================================

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_ID=your_github_app_id
GITHUB_SECRET=your_github_app_secret

# ===========================================
# 📊 ANALYTICS & STATS
# ===========================================

# GitHub Personal Access Token
GITHUB_READ_USER_TOKEN_PERSONAL=ghp_xxxxxxxxxxxx

# Wakatime
WAKATIME_API_ID=your_wakatime_id
WAKATIME_API_KEY=your_wakatime_api_key

# Codewars
CODEWARS_USER_ID=your_codewars_username

# Monkeytype
MONKEYTYPE_API_KEY=your_monkeytype_api_key

# Umami Analytics
UMAMI_API_KEY=your_umami_api_key
UMAMI_WEBSITE_ID_SITE=your_site_id
UMAMI_WEBSITE_ID_MYID=your_myid_id

# ===========================================
# 🗄️ DATABASE
# ===========================================

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx

# PostgreSQL (via Supabase)
POSTGRES_URL=postgres://xxxxx
POSTGRES_PRISMA_URL=postgres://xxxxx
POSTGRES_URL_NO_SSL=postgres://xxxxx
POSTGRES_URL_NON_POOLING=postgres://xxxxx
POSTGRES_USER=postgres
POSTGRES_HOST=db.xxxxx.supabase.co
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=postgres

# ===========================================
# 🔥 FIREBASE
# ===========================================

NEXT_PUBLIC_FIREBASE_API_KEY=xxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxxx
NEXT_PUBLIC_FIREBASE_DB_URL=https://xxxxx.firebaseio.com
NEXT_PUBLIC_FIREBASE_CHAT_DB=messages

# ===========================================
# 🤖 AI & INTEGRATIONS
# ===========================================

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# ===========================================
# 📧 EMAIL
# ===========================================

NODEMAILER_PW=your_email_app_password
NODEMAILER_EMAIL=your_email@gmail.com

# ===========================================
# 🌐 MISC
# ===========================================

DOMAIN=https://yourdomain.com
NEXT_PUBLIC_AUTHOR_EMAIL=your_email@example.com
```

---

## 💻 Installation

### Prerequisites
- Node.js v18.17+
- Git
- Bun (recommended) or NPM

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/atsiilaarya/atsiilaarya.my.id
cd atsiilaarya.my.id

# 2. Install dependencies
bun install
# atau
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env dengan kredensial Anda

# 4. Run development server
bun dev
# atau
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

### Panduan Lengkap
Lihat [INSTALLATION.md](./INSTALLATION.md) untuk panduan detail.

---

## 📜 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `bun dev` / `npm run dev` | Start development server |
| `build` | `bun run build` / `npm run build` | Build for production |
| `start` | `bun start` / `npm start` | Start production server |
| `lint` | `bun run lint` / `npm run lint` | Run ESLint |

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push repository ke GitHub
2. Connect dengan Vercel
3. Set environment variables di Vercel dashboard
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/atsiilaarya/atsiilaarya.my.id)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/atsiilaarya/atsiilaarya.my.id)

### Docker (Optional)

```dockerfile
FROM oven/bun:1 as base
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

EXPOSE 3000
CMD ["bun", "start"]
```

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 Arya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

**Arya**

- Website: [atsiilaarya.my.id](https://atsiilaarya.my.id)
- GitHub: [@atsiilaarya](https://github.com/atsiilaarya)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Vercel](https://vercel.com/) - Deployment Platform
- [Framer Motion](https://www.framer.com/motion/) - Animation Library

---

> 📅 Last Updated: December 2024

