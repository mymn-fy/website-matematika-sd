import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, grade, questionId, answer, isCorrect, stars } = body;

    if (!userId || !grade) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update student progress
    const progress = await prisma.studentProgress.upsert({
      where: {
        userId_grade: {
          userId,
          grade,
        },
      },
      update: {
        questionsAnswered: {
          increment: 1,
        },
        correctAnswers: isCorrect ? { increment: 1 } : undefined,
        starsEarned: { increment: stars || 0 },
      },
      create: {
        userId,
        grade,
        class: `Class${grade}`,
        questionsAnswered: 1,
        correctAnswers: isCorrect ? 1 : 0,
        starsEarned: stars || 0,
        materialsCompleted: [],
        totalScore: isCorrect ? (stars || 0) : 0,
      },
    });

    // Update user's total stars
    if (isCorrect) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          totalStars: {
            increment: stars || 0,
          },
        },
      });
    }

    // Update leaderboard
    await prisma.leaderboard.upsert({
      where: {
        userId_grade: {
          userId,
          grade,
        },
      },
      update: {
        stars: {
          increment: stars || 0,
        },
      },
      create: {
        userId,
        username: 'Player', // This would be updated with actual user name
        grade,
        score: progress.totalScore,
        stars: progress.starsEarned,
      },
    });

    return NextResponse.json({
      success: true,
      message: isCorrect ? 'Jawaban benar!' : 'Jawaban salah',
      stars: stars || 0,
      totalStars: progress.starsEarned,
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
