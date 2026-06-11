import Header from '@/components/Header';
import TeacherDashboard from '@/components/dashboard/TeacherDashboard';

export default function TeacherDashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <TeacherDashboard />
      </div>
    </main>
  );
}
