// This file seeds the database with initial questions and test data
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.gameQuestion.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.leaderboard.deleteMany({});

  // Create test users (students)
  const student1 = await prisma.user.create({
    data: {
      email: 'budi@example.com',
      password: 'hashedPassword123',
      name: 'Budi Santoso',
      role: 'STUDENT',
      grade: 3,
      school: 'SDN 1 Jakarta',
      totalStars: 1250,
      avatar: '👨‍🎓',
    },
  });

  const student2 = await prisma.user.create({
    data: {
      email: 'siti@example.com',
      password: 'hashedPassword123',
      name: 'Siti Nurhaliza',
      role: 'STUDENT',
      grade: 3,
      school: 'SDN 1 Jakarta',
      totalStars: 1850,
      avatar: '👩‍🎓',
    },
  });

  // Create test teacher
  const teacher = await prisma.user.create({
    data: {
      email: 'teacher@example.com',
      password: 'hashedPassword123',
      name: 'Ibu Siti Noor',
      role: 'TEACHER',
      avatar: '👩‍🏫',
    },
  });

  // Seed Game Questions for Class 1
  const class1Questions = [
    {
      grade: 1,
      class: 'Class1',
      material: 'addition',
      question: '2 + 3 = ?',
      options: ['4', '5', '6', '7'],
      correctAnswer: '5',
      difficulty: 1,
    },
    {
      grade: 1,
      class: 'Class1',
      material: 'addition',
      question: '1 + 1 = ?',
      options: ['1', '2', '3', '4'],
      correctAnswer: '2',
      difficulty: 1,
    },
    {
      grade: 1,
      class: 'Class1',
      material: 'subtraction',
      question: '5 - 2 = ?',
      options: ['2', '3', '4', '5'],
      correctAnswer: '3',
      difficulty: 1,
    },
    {
      grade: 1,
      class: 'Class1',
      material: 'subtraction',
      question: '6 - 1 = ?',
      options: ['4', '5', '6', '7'],
      correctAnswer: '5',
      difficulty: 1,
    },
    {
      grade: 1,
      class: 'Class1',
      material: 'addition',
      question: '3 + 4 = ?',
      options: ['6', '7', '8', '9'],
      correctAnswer: '7',
      difficulty: 2,
    },
  ];

  // Seed Game Questions for Class 2
  const class2Questions = [
    {
      grade: 2,
      class: 'Class2',
      material: 'addition',
      question: '7 + 5 = ?',
      options: ['10', '11', '12', '13'],
      correctAnswer: '12',
      difficulty: 2,
    },
    {
      grade: 2,
      class: 'Class2',
      material: 'subtraction',
      question: '15 - 7 = ?',
      options: ['6', '7', '8', '9'],
      correctAnswer: '8',
      difficulty: 2,
    },
    {
      grade: 2,
      class: 'Class2',
      material: 'comparison',
      question: '12 > ?',
      options: ['10', '12', '15', '20'],
      correctAnswer: '10',
      difficulty: 1,
    },
    {
      grade: 2,
      class: 'Class2',
      material: 'addition',
      question: '8 + 6 = ?',
      options: ['12', '13', '14', '15'],
      correctAnswer: '14',
      difficulty: 2,
    },
    {
      grade: 2,
      class: 'Class2',
      material: 'subtraction',
      question: '12 - 5 = ?',
      options: ['6', '7', '8', '9'],
      correctAnswer: '7',
      difficulty: 2,
    },
  ];

  // Seed Game Questions for Class 3
  const class3Questions = [
    {
      grade: 3,
      class: 'Class3',
      material: 'multiplication',
      question: '3 × 4 = ?',
      options: ['10', '11', '12', '13'],
      correctAnswer: '12',
      difficulty: 2,
    },
    {
      grade: 3,
      class: 'Class3',
      material: 'multiplication',
      question: '6 × 5 = ?',
      options: ['28', '29', '30', '31'],
      correctAnswer: '30',
      difficulty: 2,
    },
    {
      grade: 3,
      class: 'Class3',
      material: 'division',
      question: '12 ÷ 3 = ?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
      difficulty: 2,
    },
    {
      grade: 3,
      class: 'Class3',
      material: 'division',
      question: '20 ÷ 4 = ?',
      options: ['4', '5', '6', '7'],
      correctAnswer: '5',
      difficulty: 2,
    },
    {
      grade: 3,
      class: 'Class3',
      material: 'multiplication',
      question: '7 × 8 = ?',
      options: ['54', '55', '56', '57'],
      correctAnswer: '56',
      difficulty: 3,
    },
  ];

  // Insert all questions
  await prisma.gameQuestion.createMany({
    data: [...class1Questions, ...class2Questions, ...class3Questions],
  });

  // Create student progress
  await prisma.studentProgress.create({
    data: {
      userId: student1.id,
      grade: 3,
      class: 'Class3',
      questionsAnswered: 45,
      correctAnswers: 39,
      totalScore: 390,
      averageScore: 86.7,
      materialsCompleted: ['addition', 'subtraction', 'multiplication'],
      starsEarned: 1250,
    },
  });

  // Create leaderboard entries
  await prisma.leaderboard.create({
    data: {
      userId: student1.id,
      username: 'Budi Santoso',
      grade: 3,
      score: 867,
      stars: 1250,
    },
  });

  await prisma.leaderboard.create({
    data: {
      userId: student2.id,
      username: 'Siti Nurhaliza',
      grade: 3,
      score: 933,
      stars: 1850,
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('Test users created:');
  console.log('- Student 1:', student1.email, student1.name);
  console.log('- Student 2:', student2.email, student2.name);
  console.log('- Teacher:', teacher.email, teacher.name);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
