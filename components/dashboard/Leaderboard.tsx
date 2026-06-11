'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';

interface LeaderboardEntry {
  rank: number;
  name: string;
  grade: number;
  stars: number;
  badge: string;
}

interface LeaderboardProps {
  grade?: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ grade = 3 }) => {
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, name: 'Siti Nurhaliza', grade: 3, stars: 2850, badge: '👑' },
    { rank: 2, name: 'Budi Santoso', grade: 3, stars: 2650, badge: '🥈' },
    { rank: 3, name: 'Ahmad Rijali', grade: 3, stars: 2450, badge: '🥉' },
    { rank: 4, name: 'Dewi Lestari', grade: 3, stars: 2250, badge: '4️⃣' },
    { rank: 5, name: 'Rinto Harahap', grade: 3, stars: 2050, badge: '5️⃣' },
    { rank: 6, name: 'Maya Putri', grade: 3, stars: 1950, badge: '6️⃣' },
    { rank: 7, name: 'Fikri Rahman', grade: 3, stars: 1850, badge: '7️⃣' },
    { rank: 8, name: 'Zahra Mutia', grade: 3, stars: 1750, badge: '8️⃣' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="bg-gradient-to-r from-sky-blue to-mint-green text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">Leaderboard 🏆</h2>
            <p className="text-lg opacity-90">Peringkat siswa berdasarkan total bintang - Kelas {grade}</p>
          </div>
          <div className="text-7xl">🏆</div>
        </div>
      </Card>

      <motion.div variants={itemVariants}>
        <Card>
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {leaderboardData.slice(0, 3).map((entry, idx) => (
              <motion.div
                key={entry.rank}
                className={`text-center p-6 rounded-2xl ${
                  idx === 0
                    ? 'bg-gradient-to-b from-yellow-300 to-yellow-100'
                    : idx === 1
                      ? 'bg-gradient-to-b from-gray-300 to-gray-100'
                      : 'bg-gradient-to-b from-orange-300 to-orange-100'
                }`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <motion.div
                  className="text-6xl mb-3"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {entry.badge}
                </motion.div>
                <p className="text-3xl font-bold text-gray-800 mb-1">#{entry.rank}</p>
                <h3 className="font-bold text-gray-800 mb-2">{entry.name}</h3>
                <p className="text-2xl">⭐ {entry.stars}</p>
              </motion.div>
            ))}
          </div>

          {/* Full Leaderboard Table */}
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Daftar Lengkap
          </h3>
          <div className="space-y-2">
            {leaderboardData.map((entry, idx) => (
              <motion.div
                key={entry.rank}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-soft-lg transition-all"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-3xl font-bold text-sky-blue w-12 text-center">
                  {entry.rank === 1 ? '👑' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800 dark:text-white">{entry.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Kelas {entry.grade}</p>
                </div>
                <motion.div
                  className="text-right"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <p className="text-2xl font-bold text-sky-blue">⭐ {entry.stars}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Your Rank */}
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-sky-blue">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-1">Peringkatmu</p>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                #4 - Dewi Lestari
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Kamu 3 posisi di bawah juara! Terus semangat! 💪
              </p>
            </div>
            <motion.div
              className="text-6xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⭐
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Leaderboard;
