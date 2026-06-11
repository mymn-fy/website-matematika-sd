# 🚀 Setup & Installation Guide - Math Adventure SD

## System Requirements

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or yarn v1.22.0+)
- **Git**: Latest version
- **PostgreSQL**: v13+ (for production)
- **RAM**: Minimum 2GB (4GB recommended)
- **Disk Space**: 500MB

## Prerequisites Installation

### Windows

#### Option 1: Using Chocolatey (Recommended)

```powershell
# Install Chocolatey (run as Administrator)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Node.js
choco install nodejs

# Verify installation
node --version
npm --version
```

#### Option 2: Direct Download

1. Visit [nodejs.org](https://nodejs.org/)
2. Download LTS version
3. Run installer and follow prompts
4. Restart terminal and verify:
   ```bash
   node --version
   npm --version
   ```

### macOS

```bash
# Using Homebrew
brew install node

# Or using NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
```

### Linux (Ubuntu/Debian)

```bash
# Update package manager
sudo apt update

# Install Node.js
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

## Project Setup

### 1. Clone or Navigate to Project

```bash
# If cloning from Git
git clone <repository-url>
cd website-matematika-sd

# Or if already in the directory
cd c:\Users\MyBook\ Hype\Desktop\website-matematika-sd
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

This will install:

- Next.js 14
- React 18
- TailwindCSS
- Framer Motion
- Prisma
- And all other dependencies listed in `package.json`

### 3. Setup Environment Variables

```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local (you'll need to set DATABASE_URL)
# For development with SQLite (already configured):
# DATABASE_URL="file:./prisma/dev.db"

# For PostgreSQL (production):
# DATABASE_URL="postgresql://user:password@localhost:5432/math_adventure_sd"
```

### 4. Initialize Database

```bash
# Generate Prisma Client
npm run db:push

# Optional: Seed database with test data
npm run db:seed

# Optional: Open Prisma Studio (Visual database manager)
npm run db:studio
# Open browser to http://localhost:5555
```

### 5. Run Development Server

```bash
npm run dev
```

Server will start at: **http://localhost:3000**

#### Available Commands

| Command              | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start development server with hot reload |
| `npm run build`      | Build for production                     |
| `npm start`          | Start production server                  |
| `npm run lint`       | Check code quality                       |
| `npm run db:push`    | Sync Prisma schema with database         |
| `npm run db:migrate` | Create and run migrations                |
| `npm run db:seed`    | Seed database with test data             |
| `npm run db:studio`  | Open Prisma Studio GUI                   |

## Docker Setup (Alternative)

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

### Installation

1. **Install Docker**
   - [Windows](https://docs.docker.com/desktop/install/windows-install/)
   - [macOS](https://docs.docker.com/desktop/install/mac-install/)
   - [Linux](https://docs.docker.com/engine/install/)

2. **Run with Docker Compose**

```bash
# Navigate to project directory
cd website-matematika-sd

# Start services
docker-compose up -d

# Check services are running
docker-compose ps

# View logs
docker-compose logs -f app
```

Services available:

- **App**: http://localhost:3000
- **Database**: localhost:5432
- **Prisma Studio**: http://localhost:5555

### Docker Useful Commands

```bash
# Stop all services
docker-compose down

# Rebuild images
docker-compose build

# Reset database
docker-compose down -v

# Execute command in container
docker-compose exec app npm run db:seed
```

## Production Deployment

### Vercel (Recommended for Next.js)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository

2. **Configure Environment**
   - Set environment variables in Vercel dashboard
   - Add `DATABASE_URL` for production database

3. **Deploy**
   ```bash
   npm install -g vercel
   vercel
   ```

### Self-Hosted (VPS/Dedicated Server)

```bash
# 1. SSH into server
ssh user@your-server.com

# 2. Clone repository
git clone <repo-url>
cd website-matematika-sd

# 3. Install dependencies
npm install

# 4. Setup environment
cp .env.example .env
# Edit .env with production values

# 5. Build
npm run build

# 6. Setup reverse proxy (Nginx example)
sudo cp nginx.conf /etc/nginx/sites-available/math-adventure
sudo ln -s /etc/nginx/sites-available/math-adventure /etc/nginx/sites-enabled/
sudo systemctl restart nginx

# 7. Setup PM2 for process management
npm install -g pm2
pm2 start npm --name "math-adventure" -- start
pm2 startup
pm2 save
```

### PostgreSQL Setup for Production

```bash
# 1. Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# 2. Create database and user
sudo -u postgres psql
CREATE DATABASE math_adventure_sd;
CREATE USER mathuser WITH PASSWORD 'strong_password';
ALTER ROLE mathuser SET client_encoding TO 'utf8';
ALTER ROLE mathuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE mathuser SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE math_adventure_sd TO mathuser;
\q

# 3. Update .env
DATABASE_URL="postgresql://mathuser:strong_password@localhost:5432/math_adventure_sd"

# 4. Run migrations
npm run db:push
```

## Development Workflow

### Creating New Components

```bash
# 1. Create component file
touch components/ui/NewComponent.tsx

# 2. Write component with TypeScript
# 3. Export from parent index if using barrel exports
```

### Creating New Pages

```bash
# 1. Create page directory
mkdir -p app/new-page

# 2. Create page.tsx
touch app/new-page/page.tsx

# 3. Access at /new-page
```

### Creating Database Migrations

```bash
# After modifying schema.prisma
npm run db:migrate

# Follow prompts to name migration
# Migration files created in prisma/migrations/
```

## Troubleshooting

### Port Already in Use

```bash
# Windows - Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Database Connection Errors

```bash
# Verify DATABASE_URL in .env.local
# For SQLite: ensure prisma/dev.db has write permissions
chmod 666 prisma/dev.db

# For PostgreSQL: verify credentials and connection
psql -U mathuser -d math_adventure_sd -h localhost
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Failures

```bash
# Clean build cache
rm -rf .next
npm run build
```

## Performance Optimization

### Development

- Use browser DevTools for component profiling
- Monitor Next.js build time: `npm run build`
- Check Lighthouse scores: DevTools → Lighthouse

### Production

- Enable image optimization
- Setup CDN for static assets
- Use database connection pooling
- Enable caching headers
- Monitor with New Relic or similar

## IDE Setup Recommendations

### VS Code Extensions

```json
{
  "extensions": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-playwright.playwright",
    "prisma.prisma"
  ]
}
```

### VS Code Settings (.vscode/settings.json)

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Setup database: `npm run db:push`
3. ✅ Seed test data: `npm run db:seed`
4. ✅ Start dev server: `npm run dev`
5. ✅ Visit http://localhost:3000
6. 📚 Read documentation
7. 🚀 Start developing!

## Support & Documentation

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **TailwindCSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion

---

For issues or questions, please check the README.md or contact support.
