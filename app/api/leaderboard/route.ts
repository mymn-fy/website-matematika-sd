import { NextResponse } from 'next/server';
import { mockLeaderboard } from '@/lib/mockData';

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

    const gradeNum = parseInt(grade);

    // Filter mock leaderboard by grade and sort
    const leaderboard = mockLeaderboard
      .filter(entry => entry.grade === gradeNum)
      .sort((a, b) => {
        // Sort by stars descending, then by score descending
        if (b.stars !== a.stars) return b.stars - a.stars;
        return b.score - a.score;
      });

    return NextResponse.json({
      success: true,
      grade: gradeNum,
      leaderboard,
      totalEntries: leaderboard.length,
      message: `Leaderboard for Grade ${gradeNum}`,
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
