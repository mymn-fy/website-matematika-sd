/**
 * Mock Data for Demo/Prototype without Database
 * This file simulates a backend without needing a database
 */

export interface MockUser {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'TEACHER' | 'PARENT';
  grade?: number;
  school?: string;
  totalStars: number;
  avatar: string;
}

export interface MockLeaderboardEntry {
  id: string;
  userId: string;
  username: string;
  grade: number;
  score: number;
  stars: number;
}

export interface MockGameQuestion {
  id: string;
  grade: number;
  class: string;
  material: string;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: number;
}

// Mock Students
export const mockStudents: MockUser[] = [
  {
    id: 'student1',
    email: 'budi@example.com',
    name: 'Budi Santoso',
    role: 'STUDENT',
    grade: 1,
    school: 'SDN 1 Jakarta',
    totalStars: 1250,
    avatar: '👨‍🎓',
  },
  {
    id: 'student2',
    email: 'siti@example.com',
    name: 'Siti Nurhaliza',
    role: 'STUDENT',
    grade: 1,
    school: 'SDN 1 Jakarta',
    totalStars: 1850,
    avatar: '👩‍🎓',
  },
  {
    id: 'student3',
    email: 'aji@example.com',
    name: 'Aji Pratama',
    role: 'STUDENT',
    grade: 2,
    school: 'SDN 2 Bandung',
    totalStars: 950,
    avatar: '👨‍🎓',
  },
  {
    id: 'student4',
    email: 'luna@example.com',
    name: 'Luna Wijaya',
    role: 'STUDENT',
    grade: 3,
    school: 'SDN 3 Surabaya',
    totalStars: 2100,
    avatar: '👩‍🎓',
  },
];

// Mock Teachers
export const mockTeachers: MockUser[] = [
  {
    id: 'teacher1',
    email: 'teacher@example.com',
    name: 'Ibu Siti Noor',
    role: 'TEACHER',
    avatar: '👩‍🏫',
    totalStars: 0,
  },
  {
    id: 'teacher2',
    email: 'pak.budi@example.com',
    name: 'Pak Budi Hartono',
    role: 'TEACHER',
    avatar: '👨‍🏫',
    totalStars: 0,
  },
];

// Mock Leaderboard Data
export const mockLeaderboard: MockLeaderboardEntry[] = [
  {
    id: 'lb1',
    userId: 'student4',
    username: 'Luna Wijaya',
    grade: 3,
    score: 2100,
    stars: 2100,
  },
  {
    id: 'lb2',
    userId: 'student2',
    username: 'Siti Nurhaliza',
    grade: 1,
    score: 1850,
    stars: 1850,
  },
  {
    id: 'lb3',
    userId: 'student1',
    username: 'Budi Santoso',
    grade: 1,
    score: 1250,
    stars: 1250,
  },
  {
    id: 'lb4',
    userId: 'student3',
    username: 'Aji Pratama',
    grade: 2,
    score: 950,
    stars: 950,
  },
];

// Mock Game Questions for Class 1
export const mockGameQuestionsClass1: MockGameQuestion[] = [
  {
    id: 'q1c1',
    grade: 1,
    class: 'Class1',
    material: 'addition',
    question: 'Berapa hasil dari 2 + 3?',
    options: ['4', '5', '6', '7'],
    correctAnswer: '5',
    difficulty: 1,
  },
  {
    id: 'q2c1',
    grade: 1,
    class: 'Class1',
    material: 'addition',
    question: 'Berapa hasil dari 4 + 4?',
    options: ['7', '8', '9', '10'],
    correctAnswer: '8',
    difficulty: 1,
  },
  {
    id: 'q3c1',
    grade: 1,
    class: 'Class1',
    material: 'subtraction',
    question: 'Berapa hasil dari 7 - 2?',
    options: ['4', '5', '6', '7'],
    correctAnswer: '5',
    difficulty: 1,
  },
  {
    id: 'q4c1',
    grade: 1,
    class: 'Class1',
    material: 'subtraction',
    question: 'Berapa hasil dari 10 - 3?',
    options: ['6', '7', '8', '9'],
    correctAnswer: '7',
    difficulty: 1,
  },
  {
    id: 'q5c1',
    grade: 1,
    class: 'Class1',
    material: 'counting',
    question: 'Berapa banyak bintang yang ada?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '5',
    difficulty: 1,
  },
];

// Mock Game Questions for Class 2
export const mockGameQuestionsClass2: MockGameQuestion[] = [
  {
    id: 'q1c2',
    grade: 2,
    class: 'Class2',
    material: 'addition',
    question: 'Berapa hasil dari 15 + 20?',
    options: ['30', '35', '40', '45'],
    correctAnswer: '35',
    difficulty: 2,
  },
  {
    id: 'q2c2',
    grade: 2,
    class: 'Class2',
    material: 'subtraction',
    question: 'Berapa hasil dari 50 - 15?',
    options: ['30', '35', '40', '45'],
    correctAnswer: '35',
    difficulty: 2,
  },
  {
    id: 'q3c2',
    grade: 2,
    class: 'Class2',
    material: 'comparison',
    question: 'Mana yang lebih besar, 25 atau 52?',
    options: ['25', '52', 'sama', 'tidak tahu'],
    correctAnswer: '52',
    difficulty: 2,
  },
  {
    id: 'q4c2',
    grade: 2,
    class: 'Class2',
    material: 'multiplication',
    question: 'Berapa hasil dari 3 × 4?',
    options: ['10', '11', '12', '13'],
    correctAnswer: '12',
    difficulty: 2,
  },
];

// Mock Game Questions for Class 3
export const mockGameQuestionsClass3: MockGameQuestion[] = [
  {
    id: 'q1c3',
    grade: 3,
    class: 'Class3',
    material: 'multiplication',
    question: 'Berapa hasil dari 6 × 7?',
    options: ['42', '43', '44', '45'],
    correctAnswer: '42',
    difficulty: 3,
  },
  {
    id: 'q2c3',
    grade: 3,
    class: 'Class3',
    material: 'division',
    question: 'Berapa hasil dari 20 ÷ 4?',
    options: ['4', '5', '6', '7'],
    correctAnswer: '5',
    difficulty: 3,
  },
  {
    id: 'q3c3',
    grade: 3,
    class: 'Class3',
    material: 'multiplication',
    question: 'Berapa hasil dari 8 × 9?',
    options: ['70', '71', '72', '73'],
    correctAnswer: '72',
    difficulty: 3,
  },
];

// Mock Game Questions for Class 4
export const mockGameQuestionsClass4: MockGameQuestion[] = [
  {
    id: 'q1c4',
    grade: 4,
    class: 'Class4',
    material: 'fractions',
    question: 'Berapa nilai dari 1/2 + 1/4?',
    options: ['1/4', '1/2', '3/4', '1'],
    correctAnswer: '3/4',
    difficulty: 4,
  },
  {
    id: 'q2c4',
    grade: 4,
    class: 'Class4',
    material: 'factors',
    question: 'Faktor dari 12 adalah?',
    options: ['1,2,3,4,6,12', '1,2,3,6', '1,2,4,12', '2,3,4,6'],
    correctAnswer: '1,2,3,4,6,12',
    difficulty: 4,
  },
];

// Mock Game Questions for Class 5
export const mockGameQuestionsClass5: MockGameQuestion[] = [
  {
    id: 'q1c5',
    grade: 5,
    class: 'Class5',
    material: 'decimals',
    question: 'Berapa nilai dari 0.5 + 0.25?',
    options: ['0.75', '0.8', '0.85', '0.9'],
    correctAnswer: '0.75',
    difficulty: 5,
  },
  {
    id: 'q2c5',
    grade: 5,
    class: 'Class5',
    material: 'percentages',
    question: 'Berapa 50% dari 100?',
    options: ['25', '50', '75', '100'],
    correctAnswer: '50',
    difficulty: 5,
  },
];

// Mock Game Questions for Class 6
export const mockGameQuestionsClass6: MockGameQuestion[] = [
  {
    id: 'q1c6',
    grade: 6,
    class: 'Class6',
    material: 'ratios',
    question: 'Jika perbandingan A:B = 2:3 dan A = 4, berapa B?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '6',
    difficulty: 6,
  },
  {
    id: 'q2c6',
    grade: 6,
    class: 'Class6',
    material: 'scale',
    question: 'Skala 1:100 berarti?',
    options: [
      '1 cm di peta = 100 km',
      '1 cm di peta = 100 m',
      '1 cm di peta = 100 cm',
      '1 cm di peta = 1 km',
    ],
    correctAnswer: '1 cm di peta = 100 m',
    difficulty: 6,
  },
];

// Get questions by grade
export function getQuestionsByGrade(grade: number): MockGameQuestion[] {
  switch (grade) {
    case 1:
      return mockGameQuestionsClass1;
    case 2:
      return mockGameQuestionsClass2;
    case 3:
      return mockGameQuestionsClass3;
    case 4:
      return mockGameQuestionsClass4;
    case 5:
      return mockGameQuestionsClass5;
    case 6:
      return mockGameQuestionsClass6;
    default:
      return mockGameQuestionsClass1;
  }
}

// Get random question
export function getRandomQuestion(grade: number): MockGameQuestion {
  const questions = getQuestionsByGrade(grade);
  return questions[Math.floor(Math.random() * questions.length)];
}

// Simulate student progress (stored in browser localStorage)
export function saveStudentProgress(userId: string, grade: number, data: any) {
  const key = `student-progress-${userId}-${grade}`;
  localStorage.setItem(key, JSON.stringify(data));
}

export function getStudentProgress(userId: string, grade: number) {
  const key = `student-progress-${userId}-${grade}`;
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null;
}
