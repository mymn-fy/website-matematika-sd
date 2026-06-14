import { NextResponse } from 'next/server';
import { mockStudents } from '@/lib/mockData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'UserId parameter is required' },
        { status: 400 }
      );
    }

    const student = mockStudents.find(s => s.id === userId);

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Mock student data with progress
    const studentData = {
      ...student,
      studentProgress: [
        {
          id: `progress-${userId}-${student.grade}`,
          userId,
          grade: student.grade || 1,
          class: `Class${student.grade || 1}`,
          questionsAnswered: Math.floor(Math.random() * 100),
          correctAnswers: Math.floor(Math.random() * 80),
          totalScore: student.totalStars,
          averageScore: Math.floor(student.totalStars / 10),
          materialsCompleted: [],
          currentMaterial: 'addition',
          starsEarned: student.totalStars,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      badges: [
        {
          id: 'badge1',
          userId,
          badgeType: 'first_correct',
          badgeName: 'First Correct',
          description: 'Answered first question correctly',
          icon: '🎯',
          earnedAt: new Date(),
        },
        {
          id: 'badge2',
          userId,
          badgeType: 'streak_10',
          badgeName: '10 Streak',
          description: 'Got 10 correct answers in a row',
          icon: '🔥',
          earnedAt: new Date(),
        },
      ],
      achievements: [
        {
          id: 'ach1',
          userId,
          title: 'Math Champion',
          description: 'Reached top 5 in leaderboard',
          icon: '👑',
          grade: student.grade,
          unlockedAt: new Date(),
        },
      ],
    };

    return NextResponse.json({
      success: true,
      student: studentData,
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
