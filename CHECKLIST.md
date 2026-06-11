# ✅ Getting Started Checklist - Math Adventure SD

Complete checklist to get Math Adventure SD up and running on your system.

## Phase 1: System Requirements (5 minutes)

- [ ] Have Node.js 18+ installed

  ```bash
  # Check version
  node --version  # Should be v18.0.0 or higher
  ```

- [ ] Have npm 9+ installed

  ```bash
  npm --version   # Should be v9.0.0 or higher
  ```

- [ ] Have Git installed (optional but recommended)

  ```bash
  git --version
  ```

- [ ] Have VS Code or preferred editor
- [ ] Have 500MB+ free disk space
- [ ] Have 2GB+ RAM available

## Phase 2: Project Setup (10 minutes)

- [ ] **Navigate to project folder**

  ```bash
  cd path/to/website-matematika-sd
  ```

- [ ] **Install dependencies**

  ```bash
  npm install
  ```

  ⏳ This may take 2-5 minutes depending on internet speed

- [ ] **Verify installation successful**
  ```bash
  npm --version
  ```

## Phase 3: Database Setup (5 minutes)

- [ ] **Initialize Prisma**

  ```bash
  npm run db:push
  ```

- [ ] **Seed test data (optional)**

  ```bash
  npm run db:seed
  ```

  This adds test students, teachers, and questions

- [ ] **Verify database created**
  - Check if `prisma/dev.db` file exists
  - Or run: `npm run db:studio` to open GUI

## Phase 4: Development Server (2 minutes)

- [ ] **Start development server**

  ```bash
  npm run dev
  ```

- [ ] **Verify server started**

  ```
  Ready in: ...ms
  ▲ Next.js ...
  - Local:        http://localhost:3000
  ```

- [ ] **Open in browser**
  - Visit http://localhost:3000
  - Should see home page with 6 classes

## Phase 5: Verify Features (10 minutes)

### Homepage

- [ ] Can see all 6 class cards
- [ ] Class cards show theme and materials
- [ ] Progress bars display correctly
- [ ] Hero section displays properly

### Navigation

- [ ] Dark mode toggle works
- [ ] Header is visible on all pages
- [ ] Can click class cards

### Games

- [ ] Can navigate to `/games/class-1`
- [ ] Game interface loads
- [ ] Questions display properly
- [ ] Can click answer buttons
- [ ] Feedback shows (correct/wrong)

### Dashboards

- [ ] Student profile (`/profile`) loads
- [ ] Shows stats and badges
- [ ] Teacher dashboard (`/dashboard`) loads
- [ ] Leaderboard (`/leaderboard`) displays
- [ ] Certificate (`/certificate`) renders

## Phase 6: Code Exploration (15 minutes)

- [ ] **Explore `/app` folder**
  - Understand page structure
  - Review game pages
  - Check API routes

- [ ] **Explore `/components` folder**
  - View UI components
  - Check game interface
  - Review dashboard components

- [ ] **Open Prisma Studio**
  ```bash
  npm run db:studio
  ```

  - View database at http://localhost:5555
  - See users and questions

## Phase 7: Customization (Optional - 20 minutes)

- [ ] **Change colors**
  - Edit `tailwind.config.ts`
  - Update color values
  - Refresh browser

- [ ] **Modify questions**
  - Edit `lib/gameUtils.ts`
  - Update question content
  - Test in games

- [ ] **Add new component**
  - Create new file in `components/`
  - Import and use
  - View in browser

## Phase 8: Documentation Review (10 minutes)

- [ ] **Read Quick Start**
  - Open `QUICK_START.md`
  - Understand basic setup

- [ ] **Review Project Structure**
  - Open `PROJECT_STRUCTURE.md`
  - Understand folder organization

- [ ] **Check API Documentation**
  - Open `API.md`
  - Review available endpoints

- [ ] **Read Development Guide**
  - Open `DEVELOPMENT.md`
  - Learn coding guidelines

## Phase 9: Testing & Verification (10 minutes)

- [ ] **Test responsive design**
  - Open DevTools (F12)
  - Toggle device toolbar
  - Test mobile view
  - Test tablet view
  - Test desktop

- [ ] **Check browser console**
  - Press F12
  - Go to Console tab
  - Should be no errors

- [ ] **Test dark mode**
  - Click moon icon in header
  - Colors should invert
  - Light mode still works

- [ ] **Test game flow**
  - Go to `/games/class-1`
  - Answer some questions
  - Check stars update
  - Check results screen

## Phase 10: Next Steps (Planning)

- [ ] **Plan customizations**
  - Identify what to change
  - Note custom content
  - Plan additional features

- [ ] **Setup version control** (if not already)

  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  ```

- [ ] **Plan deployment**
  - Review `SETUP.md` deployment section
  - Choose hosting (Vercel recommended)
  - Plan database (PostgreSQL for production)

- [ ] **Plan future features**
  - Authentication
  - Email notifications
  - More games
  - Analytics

## Troubleshooting During Setup

| Issue                      | Solution                                 |
| -------------------------- | ---------------------------------------- |
| `npm command not found`    | Reinstall Node.js with npm               |
| `Port 3000 already in use` | Kill process: `lsof -i :3000 \| kill -9` |
| `DATABASE_URL error`       | Check `.env.local` file exists           |
| `Module not found`         | Run `npm install` again                  |
| `Prisma error`             | Run `npm run db:push` again              |

## Common Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run lint            # Check code quality

# Database
npm run db:push         # Sync schema
npm run db:seed         # Add test data
npm run db:studio       # Open database GUI

# Build & Deploy
npm run build           # Build for production
npm start               # Start production server

# Cleanup
rm -rf node_modules     # Delete dependencies
npm install             # Reinstall fresh
npm cache clean --force # Clear npm cache
```

## Success Indicators

If you see all of these, you're ready to go! ✅

- [ ] Dev server running at http://localhost:3000
- [ ] Home page displays with 6 classes
- [ ] Can play games
- [ ] Can view dashboards
- [ ] No console errors
- [ ] Responsive design works
- [ ] Dark mode toggles
- [ ] Database is seeded

## Next: What to Do Now?

### Option 1: Learn & Explore

1. Read `QUICK_START.md`
2. Explore the code
3. Try customizations

### Option 2: Deploy

1. Review `SETUP.md` deployment
2. Choose hosting platform
3. Deploy your version

### Option 3: Extend Features

1. Review `DEVELOPMENT.md`
2. Plan new features
3. Start coding

### Option 4: Prepare for Production

1. Setup authentication
2. Use PostgreSQL database
3. Setup email system
4. Configure monitoring

## Getting Help

If you get stuck:

1. **Check Documentation**
   - `QUICK_START.md` - Quick answers
   - `SETUP.md` - Detailed setup
   - `README.md` - Full guide
   - `DEVELOPMENT.md` - Code guidelines

2. **Check Error Messages**
   - Read the error carefully
   - Search error message online
   - Check VS Code problems tab

3. **Review Examples**
   - Check existing components
   - Look at game interface
   - Study API routes

## Estimated Time

- Total Setup Time: **45-60 minutes**
- First Run: **10 minutes**
- Learning Codebase: **1-2 hours**
- Basic Customization: **1-2 hours**

## Hardware Recommendations

| Task        | Min RAM | Recommended |
| ----------- | ------- | ----------- |
| Development | 2GB     | 8GB+        |
| Build       | 2GB     | 4GB         |
| Database    | 512MB   | 2GB         |
| Full stack  | 4GB     | 16GB        |

## Pre-requisites Verification

Run this command to check everything:

```bash
# Check Node.js
node --version && npm --version && git --version

# Check disk space (macOS/Linux)
df -h | grep -E "/$"

# Check disk space (Windows)
Get-Volume

# Check RAM (macOS)
vm_stat

# Check RAM (Linux)
free -h

# Check RAM (Windows)
Get-ComputerInfo | Select-Object CsPhyicallyInstalledSystemMemory
```

---

**Ready to start?** Run this now:

```bash
cd website-matematika-sd
npm install
npm run db:push
npm run dev
```

Then open http://localhost:3000 and enjoy! 🎮✨
