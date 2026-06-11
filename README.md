# 🎮 Math Adventure SD - Platform Pembelajaran Matematika Interaktif

![Math Adventure SD](https://img.shields.io/badge/Version-0.1.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Development-yellow)

Website edukasi matematika interaktif yang dirancang khusus untuk siswa Sekolah Dasar kelas 1-6. Platform ini menggabungkan pembelajaran berbasis game dengan sistem reward yang menarik untuk membuat belajar matematika menjadi lebih seru dan menyenangkan.

## ✨ Fitur Utama

### 🎯 Platform Pembelajaran

- **6 Level Kelas** dengan tema petualangan berbeda
- **Game Interaktif** untuk setiap topik matematika
- **Sistem Reward** komprehensif (⭐ Bintang, 🏅 Badge, 👑 Medali)
- **Progress Tracking** real-time untuk monitoring perkembangan

### 📊 Dashboard & Monitoring

- **Student Profile** dengan statistik lengkap
- **Teacher Dashboard** untuk monitoring siswa
- **Parent Portal** untuk tracking perkembangan anak
- **Leaderboard** untuk kompetisi sehat antar siswa

### 🎁 Reward System

- ⭐ Bintang untuk setiap jawaban benar
- 🏅 Badge untuk pencapaian khusus
- 👑 Class Champion untuk juara kelas
- 🎖️ Achievement Medals untuk milestone tertentu
- 📜 Digital Certificate setelah menyelesaikan level

### 🎨 User Experience

- 🌈 **Modern & Aesthetic Design** dengan palet warna pastel cerah
- 📱 **Fully Responsive** untuk desktop, tablet, dan smartphone
- 🎬 **Smooth Animations** menggunakan Framer Motion
- 🌙 **Dark Mode** untuk kenyamanan mata
- 🔊 **Sound Effects** dengan toggle option

## 🏫 Kelas & Materi

### Kelas 1: Petualangan Mencari Buah 🍎

- Mengenal angka
- Penjumlahan sederhana
- Pengurangan sederhana

### Kelas 2: Balon Angka 🎈

- Penjumlahan
- Pengurangan
- Membandingkan angka

### Kelas 3: Harta Karun Bajak Laut 🏴‍☠️

- Perkalian
- Pembagian

### Kelas 4: Kota Matematika 🏘️

- Pecahan
- Faktor
- Kelipatan

### Kelas 5: Math Detective 🔍

- Desimal
- Pecahan campuran
- Persentase

### Kelas 6: Space Math Adventure 🚀

- Skala
- Perbandingan
- Debit
- Operasi hitung campuran

## 🚀 Teknologi yang Digunakan

```
Frontend & UI
├── Next.js 14+
├── React 18+
├── TypeScript
├── TailwindCSS
└── Framer Motion

State Management
├── Zustand
└── React Hook Form

Visualisasi Data
├── Recharts
└── D3.js (optional)

Database
├── SQLite (Development)
└── PostgreSQL (Production)

ORM & Database Tools
└── Prisma

Development Tools
├── ESLint
└── TypeScript
```

## 📦 Instalasi & Setup

### Prerequisites

- Node.js 18+
- npm atau yarn
- PostgreSQL (untuk production)

### Steps

1. **Clone Repository**

```bash
git clone <repository-url>
cd website-matematika-sd
```

2. **Install Dependencies**

```bash
npm install
```

3. **Setup Environment Variables**

```bash
cp .env.example .env.local
# Edit .env.local dengan konfigurasi lokal Anda
```

4. **Setup Database**

```bash
# Generate Prisma Client
npm run db:push

# (Optional) Buka Prisma Studio untuk manage data
npm run db:studio
```

5. **Jalankan Development Server**

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📁 Struktur Folder

```
math-adventure-sd/
├── .github/                    # GitHub config & workflows
├── app/                        # Next.js App Directory
│   ├── api/                   # API Routes
│   ├── games/                 # Game pages per kelas
│   ├── profile/               # Student profile
│   ├── dashboard/             # Teacher dashboard
│   ├── leaderboard/           # Leaderboard
│   ├── certificate/           # Digital certificates
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/                # React Components
│   ├── ui/                    # Base components (Button, Card, etc.)
│   ├── games/                 # Game-specific components
│   └── dashboard/             # Dashboard components
├── lib/                       # Utilities & helpers
│   └── gameUtils.ts           # Game logic utilities
├── prisma/                    # Database schema & migrations
│   └── schema.prisma          # Prisma schema
├── public/                    # Static assets
├── styles/                    # Global styles
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.ts         # Tailwind config
├── next.config.js             # Next.js config
└── README.md                  # This file
```

## 🎮 Gameplay Features

### Game Interface

- **Interactive Questions** dengan multiple choice
- **Real-time Feedback** dengan animasi
- **Sound Effects** untuk correct/wrong answers
- **Progress Tracking** dengan visual progress bar
- **Reward Animation** untuk jawaban benar

### Scoring System

- Benar = +10 Bintang
- Salah = 0 Bintang
- Bonus Streak untuk jawaban benar berturut-turut
- Bonus Completion untuk selesai semua soal

## 📊 Dashboard Analytics

### Student Dashboard

- Total bintang & badges
- Progress per kelas
- Recent achievements
- Detailed statistics

### Teacher Dashboard

- Monitoring semua siswa
- Grafik progress over time
- Class distribution chart
- Student performance insights
- Notes & messaging system

## 🎨 Design System

### Color Palette

- **Sky Blue**: `#87CEEB` - Primary color
- **Soft Yellow**: `#FFE5B4` - Secondary action
- **Mint Green**: `#98FF98` - Success state
- **Peach**: `#FFB5A7` - Warning/Alert
- **White**: `#FFFFFF` - Background

### Typography

- **Poppins** - Primary font (Modern)
- **Fredoka** - Heading font (Playful)
- **Quicksand** - Display font (Child-friendly)

### Components

- **Rounded Corners**: 20-24px untuk soft aesthetic
- **Soft Shadows**: 0 4px 15px rgba(0, 0, 0, 0.1)
- **Animations**: Smooth transitions 0.3s

## 🔐 Security

- Password hashing dengan bcrypt
- JWT authentication
- CSRF protection
- XSS prevention dengan Next.js built-in
- SQL injection prevention dengan Prisma
- Environment variables untuk sensitive data

## 📱 Responsiveness

```
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: > 1024px
```

Semua komponen dioptimalkan untuk kecepatan dan aksesibilitas di semua ukuran layar.

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Linting
npm run lint
```

## 📈 Performance Optimization

- **Image Optimization** dengan Next.js Image component
- **Code Splitting** automatic
- **Lazy Loading** untuk components
- **Caching Strategy** untuk static assets
- **Database Indexing** untuk fast queries

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```bash
docker build -t math-adventure-sd .
docker run -p 3000:3000 math-adventure-sd
```

### Manual (VPS/Server)

```bash
npm run build
npm run start
```

## 🤝 Contributing

Kami menyambut kontribusi! Silakan:

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 👨‍💻 Developers

- **Frontend Development**: Next.js & React
- **Database Design**: Prisma & SQLite/PostgreSQL
- **UI/UX Design**: TailwindCSS & Framer Motion

## 📧 Contact & Support

- **Email**: support@mathAdventureSd.com
- **Website**: www.mathAdventureSd.com
- **Documentation**: docs.mathAdventureSd.com

## 🙏 Acknowledgments

- Icon dari emoji & web icon libraries
- Inspirasi dari platform edukasi terkemuka
- Dukungan dari komunitas developer Indonesia

---

**Math Adventure SD** - Membuat Belajar Matematika Menjadi Petualangan Seru! 🎮✨

Dibuat dengan ❤️ untuk pendidikan anak Indonesia
