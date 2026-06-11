# ⚡ Quick Start Guide - Math Adventure SD

Get your Math Adventure SD platform running in 5 minutes!

## 🎯 Prerequisites

Before starting, ensure you have:

- **Node.js 18+** ([Download](https://nodejs.org/))
- **npm 9+** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

Verify installation:

```bash
node --version  # Should be v18+
npm --version   # Should be v9+
```

## 🚀 5-Minute Setup

### Step 1: Get the Code (1 min)

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project
cd website-matematika-sd
```

### Step 2: Install Dependencies (2 min)

```bash
npm install
```

### Step 3: Setup Database (1 min)

```bash
# Initialize database
npm run db:push

# (Optional) Add test data
npm run db:seed
```

### Step 4: Start Development Server (1 min)

```bash
npm run dev
```

### Step 5: Open in Browser

🎉 **Done!** Open [http://localhost:3000](http://localhost:3000)

## 📱 What You Can Do Now

### Home Page (`/`)

- ✅ View all 6 math classes
- ✅ See class themes and materials
- ✅ Check progress bars
- ✅ Toggle dark mode

### Game Pages

- ✅ Play games for each class
- ✅ Answer multiple choice questions
- ✅ Earn stars and badges
- ✅ Get instant feedback

### Student Profile (`/profile`)

- ✅ View progress statistics
- ✅ See badges and achievements
- ✅ Track learning progress

### Teacher Dashboard (`/dashboard`)

- ✅ Monitor student progress
- ✅ View analytics and charts
- ✅ Track completion rates

### Leaderboard (`/leaderboard`)

- ✅ See top performers
- ✅ View your rank
- ✅ Competitive stats

### Certificate (`/certificate`)

- ✅ View digital certificates
- ✅ Download as PDF
- ✅ Print certificates

## 📚 Directory Structure

```
website-matematika-sd/
├── app/                 # All pages and routes
├── components/          # Reusable React components
├── lib/                 # Utilities and helpers
├── prisma/             # Database schema
├── styles/             # Global CSS
├── public/             # Static assets
└── package.json        # Dependencies
```

## 🎮 Key Features Implemented

### ✨ UI/UX

- 🎨 Beautiful pastel color scheme
- 🌙 Dark mode support
- 📱 Fully responsive design
- ✨ Smooth Framer Motion animations
- 🔔 Interactive components

### 🎯 Game Features

- 6️⃣ Six math class levels
- 📊 Real-time progress tracking
- ⭐ Star reward system
- 🏅 Badge achievements
- 🏆 Leaderboard system
- 📜 Digital certificates

### 📈 Analytics

- 📊 Student progress charts
- 🎯 Performance metrics
- 👥 Class distribution
- 📈 Trend analysis

### 🔧 Backend

- 🗄️ SQLite database (dev)
- 🔐 Prisma ORM
- 🚀 Next.js API routes
- 📝 TypeScript support

## 📖 Useful Commands

| Command             | What it does                       |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start dev server (with hot reload) |
| `npm run build`     | Build for production               |
| `npm start`         | Start production server            |
| `npm run lint`      | Check code quality                 |
| `npm run db:studio` | Open database GUI                  |
| `npm run db:seed`   | Add test data                      |

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  'sky-blue': '#87CEEB',      // Change these
  'soft-yellow': '#FFE5B4',
  'mint-green': '#98FF98',
  'peach': '#FFB5A7',
}
```

### Add Questions

Edit `lib/gameUtils.ts` or use database:

```typescript
const questions = [
  {
    question: "5 + 5 = ?",
    options: ["8", "9", "10", "11"],
    correct: "10",
  },
];
```

### Add New Pages

Create new file in `app/` directory:

```typescript
// app/my-page/page.tsx
export default function MyPage() {
  return <div>Hello!</div>;
}
```

## 🐛 Troubleshooting

### Port 3000 already in use?

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Database issues?

```bash
# Reset database
rm prisma/dev.db

# Reinitialize
npm run db:push
npm run db:seed
```

### Dependencies not working?

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Learn More

### Documentation

- [SETUP.md](./SETUP.md) - Detailed setup guide
- [README.md](./README.md) - Project overview

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Guide](https://www.prisma.io/docs)
- [TailwindCSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

## 🚀 Next Steps

1. ✅ Get it running locally
2. 📝 Customize questions and materials
3. 🎨 Adjust colors and branding
4. 📊 Add more analytics
5. 🔐 Setup authentication
6. 🌐 Deploy to production
7. 📱 Test on mobile devices

## 💡 Tips

- **Dark Mode**: Click the moon icon in header
- **Sound Toggle**: Click speaker icon in games
- **Database GUI**: Run `npm run db:studio`
- **Hot Reload**: Changes auto-reload in dev mode
- **Responsive**: Works on phone, tablet, desktop

## 🆘 Need Help?

1. Check [SETUP.md](./SETUP.md) for detailed instructions
2. Review [README.md](./README.md) for complete docs
3. Check [Troubleshooting section](#-troubleshooting)
4. Review code comments in components

## 🎉 You're All Set!

Your Math Adventure SD platform is ready. Happy learning! 🚀

---

For detailed setup instructions and deployment guides, see [SETUP.md](./SETUP.md)
