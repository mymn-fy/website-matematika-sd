import Header from '@/components/Header';
import StudentProfile from '@/components/dashboard/StudentProfile';

export default function StudentProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <StudentProfile
          name="Budi Santoso"
          grade={3}
          totalStars={1250}
        />
      </div>
    </main>
  );
}
