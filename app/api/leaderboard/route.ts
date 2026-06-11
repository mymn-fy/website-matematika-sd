import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const grade = searchParams.get('grade');

    if (!grade) {
      return NextResponse.json(
        { error: 'Grade parameter is required' },
        { status: 400 }
      );
    }

    const leaderboard = await prisma.leaderboard.findMany({
      where: {
        grade: parseInt(grade),
      },
      orderBy: [
        { stars: 'desc' },
        { score: 'desc' },
      ],
      take: 100,
    });

    return NextResponse.json({
      success: true,
      grade: parseInt(grade),
      leaderboard,
      totalEntries: leaderboard.length,
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
