# 🚀 Vercel Deployment Guide - Math Adventure SD (Demo/Prototype Mode)

## Project Mode

This is a **Frontend-Only Demo** version with:

- ✅ No database required
- ✅ Mock API responses
- ✅ Data stored in browser (localStorage)
- ✅ Perfect for prototyping and demos
- ⚠️ Data will reset on page refresh

## Pre-Deployment Checklist

### ✅ What's Done:

- [x] Removed database dependencies
- [x] Created mock API endpoints
- [x] Simplified configuration
- [x] Mock student, leaderboard, and game data

### Setup Time: ~5 minutes

---

## Quick Start - Local Testing

```bash
# 1. Install dependencies (Prisma removed, much faster!)
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# http://localhost:3000
```

### Test Features

- 📚 View classes: `/classes`
- 🎮 Play games: `/games/class-1`
- 🏆 Leaderboard: `/leaderboard`
- 👤 Profile: `/profile`
- 🎓 Certificates: `/certificate`

---

## Deploy to Vercel - 3 Easy Steps

### Step 1: Push to GitHub

```bash
git add .
git commit -m "chore: setup for Vercel deployment - demo mode without database"
git push origin main
```

### Step 2: Connect to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Click "Import"
5. Vercel auto-detects Next.js ✅

**No environment variables needed** (unlike database version)

### Step 3: Deploy

Vercel auto-deploys when you push to GitHub

```
✅ Build: Usually 30-60 seconds
✅ Deploy: Instant
✅ URL: https://your-project.vercel.app
```

---

## After Deployment - Verification

### ✅ Test Your Live Site

```bash
# Test home page
curl https://your-domain.vercel.app/

# Test API endpoints
curl https://your-domain.vercel.app/api/leaderboard?grade=1
curl https://your-domain.vercel.app/api/student?userId=student1
```

### 🧪 Manual Testing Checklist

- [ ] Open home page
- [ ] Navigate to classes (`/classes`)
- [ ] Play a game (`/games/class-1`)
- [ ] Submit an answer
- [ ] Check leaderboard (`/leaderboard`)
- [ ] View profile (`/profile`)
- [ ] Dark mode toggle works

### 📊 Monitor in Vercel Dashboard

- **Analytics**: View page performance
- **Logs**: Check for errors
- **Functions**: View API routes execution

---

## Feature Overview

### ✅ What Works

- Home page with class selection
- Game interface for each class
- Mock questions and answers
- Leaderboard display
- Student profile view
- Digital certificates
- Responsive design
- Dark/Light mode toggle

### ⚠️ Limitations (No Database)

- Student progress **not persisted** (localStorage only)
- Leaderboard is **hardcoded** (mock data)
- Cannot add new students
- Cannot track long-term progress
- Data resets on page refresh

### 🔄 Migration Path

When ready to add a database:

1. Add PostgreSQL (Vercel Postgres recommended)
2. Set `DATABASE_URL` environment variable
3. Restore Prisma in `package.json`
4. Update API routes to use Prisma instead of mock data
5. Deploy

---

## File Structure - Mock Data

```
lib/
├── mockData.ts          ← All mock data defined here
│   ├── mockStudents     ← Sample students
│   ├── mockTeachers     ← Sample teachers
│   ├── mockLeaderboard  ← Mock rankings
│   └── mockGameQuestions*  ← Questions for each class

app/api/
├── game/submit-answer/
│   └── route.ts         ← Uses mock data
├── leaderboard/
│   └── route.ts         ← Returns mock leaderboard
└── student/
    └── route.ts         ← Returns mock student data
```

### Adding More Mock Data

Edit `lib/mockData.ts`:

```typescript
export const mockStudents = [
  { id: 'student5', name: 'Your Student Name', ... }
];
```

Changes apply immediately with Next.js Hot Reload!

---

## Troubleshooting

### ❌ Page shows "Not Found"

**Solution**: Check that you're accessing correct routes:

- Home: `/`
- Classes: `/classes`
- Game: `/games/class-1` (class-1 to class-6)
- Leaderboard: `/leaderboard`

### ❌ API returns 400 error

**Check**:

- `grade` parameter is provided (1-6)
- `userId` parameter exists in mockData
- Query format: `/api/leaderboard?grade=1`

### ❌ Mock data not updating

**Note**: Data stored in localStorage persists within browser session

- Clear browser cache to reset
- Restarting dev server doesn't clear localStorage

---

## Next Steps - Adding Database

When you're ready for real data persistence:

1. **Add PostgreSQL**:

   ```bash
   # Use Vercel Postgres (easiest)
   # Or: Supabase, Railway, etc.
   ```

2. **Restore Prisma**:

   ```bash
   npm install @prisma/client
   npm install -D prisma ts-node
   ```

3. **Update schemas**:
   - Use previous `schema.prisma` with PostgreSQL
   - Run migrations

4. **Update APIs**:
   - Replace mock responses with Prisma queries
   - Keep same endpoint signatures

5. **Deploy**:
   - Set `DATABASE_URL` in Vercel
   - Push code
   - Vercel auto-deploys

---

## Support & Documentation

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **This Project**: Check `/components` and `/app` for implementation

---

## Summary

| Aspect                    | Details                         |
| ------------------------- | ------------------------------- |
| **Setup Time**            | ~5 minutes                      |
| **Deploy Time**           | <2 minutes                      |
| **Database Needed**       | ❌ No                           |
| **Environment Variables** | ✅ None required                |
| **Cost**                  | 🆓 Free (Vercel hobby tier)     |
| **Live URL**              | https://your-project.vercel.app |

---

**Ready to deploy?** 🚀

```bash
git push origin main
# Then visit https://vercel.com to see your app live!
```

**Last Updated**: 2026-06-14
**Mode**: Demo/Prototype (No Database)
