'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#87CEEB', '#98FF98', '#FFE5B4', '#FFB5A7'];

interface StudentData {
  id: string;
  name: string;
  grade: number;
  totalStars: number;
  correctAnswers: number;
  totalQuestions: number;
  averageScore: number;
}

const TeacherDashboard = () => {
  const studentsData: StudentData[] = [
    { id: '1', name: 'Budi Santoso', grade: 3, totalStars: 0, correctAnswers: 0, totalQuestions: 100, averageScore: 0 },
    { id: '2', name: 'Siti Nurhaliza', grade: 3, totalStars: 0, correctAnswers: 0, totalQuestions: 100, averageScore: 0 },
    { id: '3', name: 'Ahmad Rijali', grade: 3, totalStars: 0, correctAnswers: 0, totalQuestions: 100, averageScore: 0 },
    { id: '4', name: 'Dewi Lestari', grade: 3, totalStars: 0, correctAnswers: 0, totalQuestions: 100, averageScore: 0 },
  ];

  const progressData = [
    { week: 'Minggu 1', avgScore: 0 },
    { week: 'Minggu 2', avgScore: 0 },
    { week: 'Minggu 3', avgScore: 0 },
    { week: 'Minggu 4', avgScore: 0 },
  ];

  const classDistribution = [
    { name: 'Kelas 1', value: 12 },
    { name: 'Kelas 2', value: 15 },
    { name: 'Kelas 3', value: 18 },
    { name: 'Kelas 4', value: 14 },
    { name: 'Kelas 5', value: 16 },
    { name: 'Kelas 6', value: 13 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-sky-blue to-peach text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold mb-2">Dashboard Guru & Orang Tua 📊</h2>
              <p className="text-lg opacity-90">Monitor perkembangan belajar siswa Anda</p>
            </div>
            <div className="text-6xl">👨‍🏫</div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Siswa', value: '4', icon: '', color: 'from-sky-blue to-blue-400' },
          { label: 'Avg Score', value: '0%', icon: '📈', color: 'from-mint-green to-green-400' },
          { label: 'Soal Terjawab', value: '0/100', icon: '✅', color: 'from-soft-yellow to-yellow-400' },
          { label: 'Aktif Hari Ini', value: '0', icon: '🔥', color: 'from-peach to-orange-400' },
        ].map((stat, idx) => (
          <Card key={idx} className={`bg-gradient-to-br ${stat.color} text-white`}>
            <div className="text-4xl mb-2">{stat.icon}</div>
            <p className="text-sm opacity-75 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Over Time */}
        <Card>
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Progres Rata-rata Mingguan
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgScore" stroke="#87CEEB" strokeWidth={3} dot={{ fill: '#87CEEB', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Class Distribution */}
        <Card>
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Distribusi Siswa Per Kelas
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={classDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {classDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Student List */}
      <motion.div variants={itemVariants}>
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Daftar Siswa & Progres
            </h3>
            <Button variant="primary" size="sm">
              + Tambah Siswa
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Nama Siswa
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Kelas
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    ⭐ Bintang
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Jawaban Benar
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Nilai Rata-rata
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((student, idx) => (
                  <motion.tr
                    key={student.id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <td className="py-4 px-4 font-semibold text-gray-800 dark:text-white">
                      {student.name}
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                      Kelas {student.grade}
                    </td>
                    <td className="py-4 px-4 text-center text-sky-blue font-bold">
                      {student.totalStars}
                    </td>
                    <td className="py-4 px-4 text-center text-mint-green font-bold">
                      {student.correctAnswers}/{student.totalQuestions}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-sky-blue to-mint-green h-2 rounded-full"
                            style={{ width: `${student.averageScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                          {student.averageScore}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                  <Button variant="secondary" size="sm" href="/profile">
                        Lihat Detail
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Insights Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            📊 Insights & Rekomendasi
          </h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <p>Belum ada data aktivitas siswa yang cukup. Ajak siswa untuk mulai bermain!</p>
            </li>
          </ul>
        </Card>

        <Card>
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            📝 Catatan & Pesan
          </h3>
          <textarea
            className="w-full h-32 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-white resize-none focus:outline-none focus:border-sky-blue"
            placeholder="Tulis catatan untuk siswa atau orang tua..."
          />
          <Button variant="primary" className="mt-4 w-full">
            Simpan Catatan
          </Button>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TeacherDashboard;
