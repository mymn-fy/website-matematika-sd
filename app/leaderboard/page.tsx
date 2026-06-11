import Header from '@/components/Header';
import Leaderboard from '@/components/dashboard/Leaderboard';

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Leaderboard grade={3} />
      </div>
    </main>
  );
}
