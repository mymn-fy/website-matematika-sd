'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface StudentProfileProps {
  name?: string;
  grade?: number;
  totalStars?: number;
  badges?: { name: string; icon: string }[];
  recentAchievements?: { title: string; date: string }[];
}

const StudentProfile: React.FC<StudentProfileProps> = ({
  name = 'Nama Siswa',
  grade = 1,
  totalStars = 0,
  badges = [],
  recentAchievements = [],
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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
      {/* Profile Header */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-sky-blue to-mint-green text-white">
          <div className="flex items-center gap-6">
            <motion.div
              className="text-8xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👨‍🎓
            </motion.div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-2">{name}</h2>
              <p className="text-xl opacity-90">Kelas {grade}</p>
              <div className="flex items-center gap-4 mt-4">
                <div>
                  <p className="text-sm opacity-75">Total Bintang</p>
                  <p className="text-3xl font-bold">⭐ {totalStars}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Progress Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Level', value: '1', icon: '📈' },
          { label: 'Pertanyaan Terjawab', value: '0/100', icon: '✅' },
          { label: 'Akurasi', value: '0%', icon: '🎯' },
        ].map((stat, idx) => (
          <Card key={idx} className="text-center">
            <div className="text-5xl mb-2">{stat.icon}</div>
            <p className="text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-sky-blue">{stat.value}</p>
          </Card>
        ))}
      </motion.div>

      {/* Class Progress */}
      <motion.div variants={itemVariants}>
        <Card>
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Progres Per Kelas
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((classNum) => {
              const progress = 0;
              return (
                <div key={classNum}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Kelas {classNum}
                    </span>
                    <span className="text-sm font-bold text-sky-blue">{progress}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-sky-blue to-mint-green h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, delay: classNum * 0.1 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Badges Section */}
      <motion.div variants={itemVariants}>
        <Card>
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Badge & Pencapaian 🏅
          </h3>
          {badges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {badges.map((badge, idx) => (
                <motion.div
                  key={idx}
                  className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:shadow-soft-lg transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-5xl mb-2">{badge.icon}</div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {badge.name}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Belum ada badge. Ayo mulai bermain dan kumpulkan pencapaianmu! 🌟</p>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Recent Achievements */}
      <motion.div variants={itemVariants}>
        <Card>
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Pencapaian Terbaru 🌟
          </h3>
          {recentAchievements.length > 0 ? (
            <div className="space-y-4">
              {recentAchievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-soft-yellow bg-opacity-20 rounded-2xl border-l-4 border-soft-yellow"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-3xl">🎉</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {achievement.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Belum ada pencapaian terbaru. Semangat belajarnya! 💪</p>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
        <Button variant="success" size="lg" href="/">
          👉 Lanjut Bermain
        </Button>
        <Button variant="primary" size="lg" href="/">
          🏠 Kembali Ke Rumah
        </Button>
        <Button variant="secondary" size="lg" href="/dashboard">
          📊 Lihat Statistik
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default StudentProfile;
