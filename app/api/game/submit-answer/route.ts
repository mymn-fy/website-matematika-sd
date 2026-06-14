import { NextResponse } from 'next/server';
import { mockLeaderboard } from '@/lib/mockData';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, grade, isCorrect, stars } = body;

    if (!userId || !grade) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Mock response - simulate student progress update
    const starsEarned = isCorrect ? (stars || 10) : 0;
    
    // Calculate total stars (simulated)
    const leaderboardEntry = mockLeaderboard.find(entry => entry.userId === userId);
    const totalStars = leaderboardEntry ? leaderboardEntry.stars + starsEarned : starsEarned;

    return NextResponse.json({
      success: true,
      message: isCorrect ? 'Jawaban benar! 🎉' : 'Jawaban salah, coba lagi! 💪',
      stars: starsEarned,
      totalStars: totalStars,
      isCorrect,
      celebration: isCorrect ? true : false,
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
