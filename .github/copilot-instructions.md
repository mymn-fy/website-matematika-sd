<!-- Custom instructions for Math Adventure SD project -->

# Math Adventure SD - Project Setup & Development

## Project Overview

Interactive mathematics education website for Indonesian elementary school students (grades 1-6) with game-based learning, reward systems, and teacher/parent monitoring.

## Tech Stack

- **Framework**: Next.js 14+
- **UI Framework**: React 18+
- **Styling**: TailwindCSS with custom pastel colors
- **Animations**: Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Charts**: Recharts for statistics
- **State Management**: Zustand
- **Form Handling**: React Hook Form

## Color Palette

- Sky Blue: #87CEEB
- Soft Yellow: #FFE5B4
- Mint Green: #98FF98
- Peach: #FFB5A7
- White: #FFFFFF

## Project Structure

```
math-adventure-sd/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Main dashboard routes
│   ├── (games)/           # Game routes per class
│   ├── api/               # API routes
│   └── layout.tsx
├── components/            # Reusable React components
│   ├── ui/               # Basic UI components
│   ├── games/            # Game-specific components
│   └── dashboard/        # Dashboard components
├── lib/                   # Utilities and helpers
├── prisma/               # Database schema
├── public/               # Static assets
├── styles/               # Global styles
└── env.example           # Environment variables template
```

## Setup Checklist

- [ ] Initialize Next.js project with TypeScript
- [ ] Install and configure TailwindCSS
- [ ] Setup Prisma and database connection
- [ ] Create project directory structure
- [ ] Implement authentication system
- [ ] Create core components (Header, Navbar, etc.)
- [ ] Build home page with hero section
- [ ] Implement class selection system
- [ ] Create game components for each class
- [ ] Setup reward system
- [ ] Create student profile page
- [ ] Create teacher/parent dashboard
- [ ] Implement dark mode toggle
- [ ] Add sound effects system
- [ ] Create leaderboard functionality
- [ ] Implement digital certificate system
- [ ] Test responsiveness
- [ ] Deploy and document

## Development Guidelines

### Code Standards

- Use TypeScript for all new files
- Follow React component best practices
- Use functional components with hooks
- Implement proper error handling
- Add loading states for async operations

### Design Standards

- Large, rounded corners (20-24px)
- Soft shadows for depth
- Child-friendly fonts (Poppins, Fredoka, Quicksand)
- Pastel color scheme
- Responsive design (mobile-first approach)

### Game Features by Class

- **Class 1**: Fruit Hunting (Numbers, Basic Addition/Subtraction)
- **Class 2**: Balloon Popping (Addition, Subtraction, Comparison)
- **Class 3**: Pirate Treasure (Multiplication, Division)
- **Class 4**: Math City (Fractions, Factors, Multiples)
- **Class 5**: Math Detective (Decimals, Mixed Fractions, Percentages)
- **Class 6**: Space Math (Scale, Ratios, Flow Rate, Mixed Operations)

### Reward System

- Stars (⭐) for correct answers
- Badges (🏅) for achievements
- Class Champion (👑) ranking
- Achievement Medals (🎖️)
- Animated celebration effects

## Key Features to Implement

1. Home page with class selection
2. Individual game interfaces per class
3. Student profile with progress tracking
4. Teacher/parent monitoring dashboard
5. Leaderboard system
6. Progress bars and statistics
7. Digital certificates
8. Dark/Light mode toggle
9. Sound effects (toggle option)
10. Responsive design for all devices
