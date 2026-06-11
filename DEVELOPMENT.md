# 🛠️ Development Guidelines - Math Adventure SD

Best practices and guidelines for contributing to Math Adventure SD.

## Code Structure

### Component Organization

```
components/
├── ui/                      # Base reusable components
│   ├── Button.tsx          # Variants: primary, secondary, success, warning
│   └── Card.tsx            # Variants: default, hoverable
├── games/                  # Game-specific components
│   └── GameInterface.tsx    # Base game interface
├── dashboard/              # Dashboard components
│   ├── StudentProfile.tsx
│   ├── TeacherDashboard.tsx
│   ├── Leaderboard.tsx
│   └── DigitalCertificate.tsx
├── Header.tsx              # App header
└── ClassCard.tsx           # Class selection card
```

### Page Organization

```
app/
├── api/                    # API routes
│   ├── game/
│   ├── leaderboard/
│   └── student/
├── games/                  # Game routes
│   ├── class-1/
│   ├── class-2/
│   ...
│   └── class-6/
├── profile/               # Student profile
├── dashboard/             # Teacher dashboard
├── leaderboard/           # Public leaderboard
├── certificate/           # Digital certificates
├── page.tsx               # Home page
└── layout.tsx             # Root layout
```

## Naming Conventions

### TypeScript Files

- Components: `PascalCase.tsx` (e.g., `Button.tsx`)
- Types: `types.ts` or `[feature].types.ts`
- Utils: `camelCase.ts` (e.g., `gameUtils.ts`)

### Variables & Functions

- Constants: `UPPER_SNAKE_CASE`
- Variables: `camelCase`
- Functions: `camelCase` for regular, `PascalCase` for components
- Booleans: prefix with `is`, `has`, `should` (e.g., `isLoading`)

### CSS Classes

- BEM Methodology: `.block__element--modifier`
- Tailwind: Use utility classes primarily

## Code Style

### TypeScript Best Practices

```typescript
// ✅ DO: Use proper typing
interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
}

// ❌ DON'T: Use any type
const handleClick = (e: any) => {};

// ✅ DO: Use const for components
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {},
);

// ✅ DO: Add proper exports
export default Button;
```

### React Best Practices

```typescript
// ✅ DO: Use functional components with hooks
const MyComponent = () => {
  const [state, setState] = useState(false);

  useEffect(() => {
    // Side effects here
  }, []);

  return <div>{/* JSX */}</div>;
};

// ✅ DO: Memoize expensive components
const MemoizedComponent = React.memo(MyComponent);

// ❌ DON'T: Use class components
class OldComponent extends React.Component { }

// ✅ DO: Keep components small and focused
// ❌ DON'T: Put 500+ lines in one component
```

### Styling Guidelines

```typescript
// ✅ DO: Use Tailwind utilities
<div className="bg-sky-blue text-white rounded-2xl shadow-soft p-6">

// ✅ DO: Use custom utilities from tailwind.config.ts
<div className="rounded-xl shadow-soft-lg">

// ❌ DON'T: Write custom CSS in components
<style>{`
  .myClass { ... }
`}</style>
```

## Component Template

```typescript
'use client';  // Add if using client-side features

import React from 'react';

interface ComponentProps {
  // Props here
}

/**
 * ComponentName - Brief description
 * @param props - Component props
 */
const ComponentName = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ ...props }, ref) => {
    // Hooks
    const [state, setState] = React.useState(false);

    // Event handlers
    const handleEvent = () => {
      // Logic here
    };

    // Render
    return (
      <div ref={ref} {...props}>
        {/* JSX here */}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';

export default ComponentName;
```

## Testing

### Unit Tests

```bash
# Add test files alongside components
component/Button.tsx
component/Button.test.tsx

# Run tests
npm test
```

### Testing Pattern

```typescript
describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Performance Guidelines

### Image Optimization

```typescript
// ✅ DO: Use Next.js Image
import Image from 'next/image';

<Image
  src="/image.png"
  alt="Description"
  width={800}
  height={600}
  priority={false}
/>

// ❌ DON'T: Use HTML img tag
<img src="/image.png" alt="Description" />
```

### Component Splitting

```typescript
// ✅ DO: Split large components
// Before: 500 lines in one component
// After: Multiple small components

// ❌ DON'T: Keep everything in one component
```

### Lazy Loading

```typescript
// ✅ DO: Lazy load non-critical components
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { loading: () => <div>Loading...</div> }
);
```

## Security Guidelines

### Data Validation

```typescript
// ✅ DO: Validate user input
const sanitizedInput = input.trim().slice(0, 100);

// ✅ DO: Use environment variables for secrets
const dbUrl = process.env.DATABASE_URL;

// ❌ DON'T: Expose secrets in client-side code
const apiKey = "sk_live_xxxxx"; // NEVER!
```

### Authentication

```typescript
// ✅ DO: Protect API routes
export async function POST(request: Request) {
  const token = request.headers.get("authorization");
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // ...
}

// ❌ DON'T: Skip authentication checks
```

## Documentation

### Component Documentation

```typescript
/**
 * Renders a reusable button component
 *
 * @example
 * <Button variant="primary" size="lg">
 *   Click me
 * </Button>
 *
 * @param props - Button properties
 * @param props.variant - Button style variant
 * @param props.size - Button size
 * @param props.children - Button content
 */
export const Button = (props: ButtonProps) => {};
```

### API Documentation

- Document all endpoints in [API.md](./API.md)
- Include request/response examples
- List error codes and meanings

## Git Workflow

### Commit Messages

```
Conventional Commits format:

feat: Add new feature
fix: Fix a bug
docs: Update documentation
style: Format/lint changes
refactor: Refactor code
test: Add/update tests
chore: Update dependencies

Example:
feat(games): Add Class 2 game interface
```

### Branch Naming

```
feature/feature-name
bugfix/bug-description
docs/documentation-update
```

## Environment Setup

### .env.local Variables

```
DATABASE_URL=file:./prisma/dev.db
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Required for Production

```
DATABASE_URL=postgresql://user:pass@host/db
JWT_SECRET=your-secret-key
NEXT_PUBLIC_API_URL=https://production-url.com
```

## File Size Guidelines

| Type      | Max Size  | Reason          |
| --------- | --------- | --------------- |
| Component | 500 lines | Maintainability |
| Page      | 300 lines | Readability     |
| API Route | 200 lines | Simplicity      |
| Image     | 500KB     | Performance     |
| Bundle    | 500KB     | Loading time    |

## Performance Targets

- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 2.0s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 500KB

## Accessibility

### WCAG 2.1 Compliance

```typescript
// ✅ DO: Use semantic HTML
<button onClick={handleClick}>
  Click me
</button>

// ✅ DO: Add aria labels
<button aria-label="Close menu" onClick={handleClose}>
  ✕
</button>

// ✅ DO: Use proper heading hierarchy
<h1>Main Title</h1>
<h2>Section Title</h2>

// ❌ DON'T: Use divs for buttons
<div onClick={handleClick}>Click me</div>
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Tab order should be logical
- Focus indicators must be visible

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: iOS 12+
- Android Chrome: Latest

## Review Checklist

Before submitting code:

- [ ] Code follows naming conventions
- [ ] TypeScript types are complete
- [ ] No `any` types used
- [ ] Components are responsive
- [ ] Accessibility checked
- [ ] No console errors/warnings
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Performance optimized
- [ ] Security validated

## Common Patterns

### Loading State

```typescript
const [isLoading, setIsLoading] = useState(false);

return (
  <button disabled={isLoading}>
    {isLoading ? 'Loading...' : 'Submit'}
  </button>
);
```

### Error Handling

```typescript
const [error, setError] = useState<string | null>(null);

try {
  // Code
} catch (err) {
  setError(err instanceof Error ? err.message : "Unknown error");
}
```

### Form Validation

```typescript
const [errors, setErrors] = useState<Record<string, string>>({});

const validate = () => {
  const newErrors: Record<string, string> = {};
  if (!name) newErrors.name = "Name is required";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

## Resources

- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)

---

Questions? Check the README or create an issue in the repository.
