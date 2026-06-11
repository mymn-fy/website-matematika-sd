# 📚 API Documentation - Math Adventure SD

Complete API reference for Math Adventure SD

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://math-adventure.com/api`

## Authentication

Currently, APIs don't require authentication for development. Production setup should include JWT tokens.

## Endpoints

### Game Management

#### Submit Answer

Submit a game answer and update progress.

```
POST /api/game/submit-answer
```

**Request Body:**

```json
{
  "userId": "user_id_string",
  "grade": 1,
  "questionId": "question_id",
  "answer": "5",
  "isCorrect": true,
  "stars": 10
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Jawaban benar!",
  "stars": 10,
  "totalStars": 1250
}
```

**Response (Error):**

```json
{
  "error": "Missing required fields"
}
```

---

### Student Management

#### Get Student Profile

Retrieve complete student information and progress.

```
GET /api/student?userId={userId}
```

**Query Parameters:**

- `userId` (required): Student's user ID

**Response:**

```json
{
  "success": true,
  "student": {
    "id": "user_id",
    "name": "Budi Santoso",
    "email": "budi@example.com",
    "grade": 3,
    "school": "SDN 1 Jakarta",
    "totalStars": 1250,
    "avatar": "👨‍🎓",
    "studentProgress": [
      {
        "grade": 3,
        "questionsAnswered": 45,
        "correctAnswers": 39,
        "starsEarned": 1250,
        "averageScore": 86.7
      }
    ],
    "badges": [
      {
        "name": "First Step",
        "icon": "👣"
      }
    ],
    "achievements": [
      {
        "title": "Completed Class 1",
        "unlockedAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

### Leaderboard

#### Get Leaderboard

Retrieve leaderboard for a specific grade.

```
GET /api/leaderboard?grade={grade}
```

**Query Parameters:**

- `grade` (required): Grade number (1-6)

**Response:**

```json
{
  "success": true,
  "grade": 3,
  "leaderboard": [
    {
      "rank": 1,
      "id": "user_id",
      "username": "Siti Nurhaliza",
      "stars": 2850,
      "score": 933
    },
    {
      "rank": 2,
      "id": "user_id",
      "username": "Budi Santoso",
      "stars": 2650,
      "score": 867
    }
  ],
  "totalEntries": 45
}
```

---

## Database Schema

### User Model

```typescript
model User {
  id           String
  email        String (unique)
  password     String
  name         String
  role         Role (STUDENT | TEACHER | PARENT)
  grade        Int (1-6, for students)
  school       String
  totalStars   Int
  avatar       String

  // Relations
  studentProgress  StudentProgress[]
  badges          Badge[]
  achievements    Achievement[]
}
```

### StudentProgress Model

```typescript
model StudentProgress {
  id               String
  userId           String
  grade            Int
  class            String

  // Stats
  questionsAnswered   Int
  correctAnswers      Int
  totalScore          Int
  averageScore        Float

  // Materials
  materialsCompleted  String[]
  currentMaterial     String
  starsEarned         Int
}
```

### GameQuestion Model

```typescript
model GameQuestion {
  id          String
  grade       Int (1-6)
  class       String
  material    String

  question    String
  options     String[]
  correctAnswer String
  difficulty  Int (1-5)
}
```

### Leaderboard Model

```typescript
model Leaderboard {
  id       String
  userId   String
  username String
  grade    Int
  score    Int
  stars    Int
}
```

---

## Error Handling

All errors follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### Common Error Codes

| Status | Error                   | Meaning                       |
| ------ | ----------------------- | ----------------------------- |
| 400    | Missing required fields | Check request body parameters |
| 404    | Not found               | Resource doesn't exist        |
| 500    | Internal server error   | Server-side issue             |

---

## Rate Limiting

Currently no rate limiting. Production should implement:

- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Data Types

### Grade

```
1: Kelas 1 - Petualangan Mencari Buah
2: Kelas 2 - Balon Angka
3: Kelas 3 - Harta Karun Bajak Laut
4: Kelas 4 - Kota Matematika
5: Kelas 5 - Math Detective
6: Kelas 6 - Space Math Adventure
```

### Role

```
STUDENT: Student account
TEACHER: Teacher monitoring account
PARENT: Parent monitoring account
```

### Material (by Grade)

```
Grade 1: numbers, addition, subtraction
Grade 2: addition, subtraction, comparison
Grade 3: multiplication, division
Grade 4: fractions, factors, multiples
Grade 5: decimals, mixed_fractions, percentages
Grade 6: scale, ratios, flow_rate, mixed_operations
```

---

## Examples

### Example 1: Submit Game Answer

```bash
curl -X POST http://localhost:3000/api/game/submit-answer \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "grade": 1,
    "questionId": "q1",
    "answer": "5",
    "isCorrect": true,
    "stars": 10
  }'
```

### Example 2: Get Student Progress

```bash
curl http://localhost:3000/api/student?userId=user123
```

### Example 3: Get Leaderboard

```bash
curl http://localhost:3000/api/leaderboard?grade=3
```

---

## Future API Endpoints (Planned)

```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login user
GET    /api/user/profile         # Get user profile
PUT    /api/user/profile         # Update profile
GET    /api/game/questions       # Get questions for a grade
GET    /api/badges               # Get all badges
GET    /api/achievements         # Get achievements
POST   /api/certificates/generate # Generate certificate
GET    /api/teacher/students     # Get teacher's students
GET    /api/analytics/progress   # Get progress analytics
```

---

## Testing with Postman

1. Import these endpoints into Postman
2. Set base URL: `http://localhost:3000/api`
3. Create requests for each endpoint
4. Test with different parameters

---

## WebSocket Events (Future)

Planned real-time features:

- Live leaderboard updates
- Achievement notifications
- Chat between students
- Teacher notifications

---

## Rate Limit Headers (Future)

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1637500400
```

---

For more information, see [README.md](./README.md) and [SETUP.md](./SETUP.md)
