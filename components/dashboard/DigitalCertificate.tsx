'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface CertificateProps {
  studentName?: string;
  grade?: number;
  completionDate?: string;
}

const DigitalCertificate: React.FC<CertificateProps> = ({
  studentName = 'Budi Santoso',
  grade = 3,
  completionDate = '15 November 2024',
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-2xl"
        initial={{ scale: 0.8, rotateX: 90 }}
        animate={{ scale: 1, rotateX: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ perspective: '1000px' }}
      >
        <Card className="border-4 border-sky-blue bg-gradient-to-br from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-soft-lg">
          {/* Certificate Header */}
          <div className="text-center mb-8 pb-8 border-b-2 border-sky-blue">
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              🎖️
            </motion.div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-blue to-mint-green mb-2">
              Sertifikat Penghargaan
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Pemerintah Membanggakan Anda
            </p>
          </div>

          {/* Certificate Content */}
          <div className="text-center space-y-6 mb-8">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Dengan ini kami persembahkan kepada
            </p>

            {/* Student Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-5xl font-bold text-sky-blue mb-2">
                {studentName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Siswa Kelas {grade}</p>
            </motion.div>

            {/* Achievement */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-soft-yellow to-peach bg-opacity-20 rounded-2xl p-6"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                Telah berhasil menyelesaikan semua materi pembelajaran Kelas {grade}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                dengan pencapaian luar biasa dan dedikasi penuh
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 my-8"
            >
              <div>
                <p className="text-3xl font-bold text-mint-green">2,500+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bintang</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-sky-blue">98%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Akurasi</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-peach">425</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Soal Terjawab</p>
              </div>
            </motion.div>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-8 border-t-2 border-gray-300 dark:border-gray-700"
            >
              <p className="text-gray-700 dark:text-gray-300">
                Diberikan pada hari ini,
                <br />
                <span className="font-bold text-lg text-sky-blue">{completionDate}</span>
              </p>
            </motion.div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 my-8 px-8">
            <div className="text-center">
              <div className="text-5xl mb-2">👨‍🏫</div>
              <p className="border-t-2 border-gray-800 dark:border-gray-200 pt-2 font-semibold">
                Kepala Sekolah
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">🦉</div>
              <p className="border-t-2 border-gray-800 dark:border-gray-200 pt-2 font-semibold">
                Math Adventure Platform
              </p>
            </div>
          </div>

          {/* Certificate ID */}
          <div className="text-center mt-8 pt-8 border-t-2 border-gray-300 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              ID Sertifikat
            </p>
            <p className="text-lg font-mono font-bold text-sky-blue">
              MA-2024-{Math.random().toString(36).substring(7).toUpperCase()}
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex gap-4 mt-12 flex-wrap justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Button variant="success" size="lg">
          🖨️ Cetak Sertifikat
        </Button>
        <Button variant="primary" size="lg">
          ⬇️ Download PDF
        </Button>
        <Button variant="secondary" size="lg">
          📤 Bagikan
        </Button>
        <Button variant="warning" size="lg" href="/">
          🏠 Kembali ke Rumah
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default DigitalCertificate;
