'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Button from '@/components/ui/Button';
import ClassCard from '@/components/ClassCard';

const initialClassesData = [
  {
    number: 1,
    theme: 'Petualangan Mencari Buah 🍎🍌',
    emoji: '🍎🍌',
    materials: ['Mengenal Angka 1-20', 'Penjumlahan Sederhana', 'Pengurangan Sederhana'],
    starsEarned: 0,
  },
  {
    number: 2,
    theme: 'Balon Angka 🎈',
    emoji: '🎈',
    materials: ['Penjumlahan', 'Pengurangan', 'Perbandingan'],
    starsEarned: 0,
  },
  {
    number: 3,
    theme: 'Harta Karun Bajak Laut 🏴‍☠️',
    emoji: '🏴',
    materials: ['Perkalian', 'Pembagian'],
    starsEarned: 0,
  },
  {
    number: 4,
    theme: 'Kota Matematika 🏘️',
    emoji: '🏘️',
    materials: ['Pecahan', 'Faktor', 'Kelipatan'],
    starsEarned: 0,
  },
  {
    number: 5,
    theme: 'Math Detective 🔍',
    emoji: '🔍',
    materials: ['Desimal', 'Pecahan Campuran', 'Persentase'],
    starsEarned: 0,
  },
  {
    number: 6,
    theme: 'Space Math Adventure 🚀',
    emoji: '🚀',
    materials: ['Skala', 'Perbandingan', 'Debit', 'Operasi Hitung'],
    starsEarned: 0,
  },
];

export default function Home() {
  const [classesData, setClassesData] = useState(initialClassesData);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Generate random progress only on the client-side after initial render
    const clientSideData = initialClassesData.map((classItem) => ({
      ...classItem,
      starsEarned: Math.floor(Math.random() * 100),
    }));
    setClassesData(clientSideData);

    // Setup Background Music (Tempatkan file audio di public/music/cheerful-theme.mp3)
    audioRef.current = new Audio('/music/cheerful-theme.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch(e => {
          console.error('Audio gagal diputar:', e);
          alert('File musik tidak ditemukan! 🎵\n\nSilakan:\n1. Buka folder "public" di proyek Anda\n2. Buat folder baru bernama "music"\n3. Masukkan file lagu MP3 ke dalamnya\n4. Ubah nama filenya menjadi "cheerful-theme.mp3"');
          setIsMusicPlaying(false);
        });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      {/* Landing Page / Hero Section Animasi */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#7DD3FC] via-[#E0F2FE] to-[#DCFCE7] min-h-[85vh] flex flex-col justify-center items-center pb-20">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* CSS Hills */}
          <div className="absolute bottom-0 w-full h-[30vh] min-h-[200px] flex justify-center items-end">
            <div className="absolute bottom-0 w-[150%] md:w-[120%] h-[250px] bg-gradient-to-t from-[#86EFAC] to-[#BBF7D0] rounded-[100%] translate-y-1/2 opacity-60 blur-[2px]"></div>
            <div className="absolute bottom-0 w-[120%] md:w-[100%] h-[200px] bg-gradient-to-t from-[#4ADE80] to-[#86EFAC] rounded-[100%] translate-y-[35%] shadow-inner"></div>
          </div>

          {/* Rainbow */}
          <div className="absolute top-[12%] left-[8%] md:left-[15%] text-[7rem] md:text-[10rem] opacity-50 mix-blend-overlay">🌈</div>
          
          {/* Clouds */}
          <motion.div
            className="absolute top-[15%] text-6xl opacity-90 drop-shadow-md"
            initial={{ x: '-10%' }} animate={{ x: '110vw' }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >☁️</motion.div>
          
          <motion.div
            className="absolute top-[35%] text-8xl opacity-60 drop-shadow-sm blur-[1px]"
            initial={{ x: '-20%' }} animate={{ x: '110vw' }}
            transition={{ duration: 55, repeat: Infinity, ease: 'linear', delay: 10 }}
          >☁️</motion.div>
          
          <motion.div
            className="absolute top-[25%] text-5xl opacity-80 drop-shadow-md"
            initial={{ x: '-30%' }} animate={{ x: '110vw' }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay: 20 }}
          >☁️</motion.div>
          
          {/* Birds */}
          <motion.div
            className="absolute top-[28%] text-3xl opacity-80"
            initial={{ x: '110vw', y: 0 }} animate={{ x: '-10vw', y: [0, -15, 0, 15, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >🕊️ 🕊️</motion.div>
          
          {/* Layered Flowers along the hill edge */}
          <div className="absolute bottom-6 md:bottom-10 w-full flex justify-around px-4 md:px-20 text-3xl md:text-5xl opacity-95">
            <motion.span animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }}>🌸</motion.span>
            <motion.span animate={{ rotate: [5, -5, 5] }} transition={{ duration: 3, repeat: Infinity }} className="mb-4">🌱</motion.span>
            <motion.span animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity }}>🌻</motion.span>
            <motion.span animate={{ rotate: [5, -5, 5] }} transition={{ duration: 4, repeat: Infinity }} className="mb-8">🌷</motion.span>
            <motion.span animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 3.5, repeat: Infinity }}>🌼</motion.span>
            <motion.span animate={{ rotate: [5, -5, 5] }} transition={{ duration: 4.5, repeat: Infinity }} className="mb-5">🌱</motion.span>
            <motion.span animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }}>🌺</motion.span>
            <motion.span animate={{ rotate: [5, -5, 5] }} transition={{ duration: 5, repeat: Infinity }} className="mb-2">🌸</motion.span>
          </div>
        </div>

        {/* Main Content */}
        <div className="z-10 container mx-auto px-4 text-center mt-12">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-12 font-poppins tracking-wide leading-tight" style={{ textShadow: '3px 4px 0px rgba(0, 0, 0, 0.15)' }}>
              Selamat Datang di <br className="hidden md:block"/> 
              <motion.span 
                className="inline-block text-pink-400 mt-2"
                animate={{ scale: [1, 1.03, 1], rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ textShadow: '4px 6px 0px #D32F2F' }}
              >
                Math Adventure SD!
              </motion.span>
            </h1>
          </motion.div>

          {/* Tombol Utama */}
          <motion.div 
            className="flex justify-center gap-4 md:gap-6 flex-wrap"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.a
              href="#classes"
              className="px-8 py-4 bg-white hover:bg-gray-50 text-pink-400 text-xl md:text-2xl font-bold rounded-full shadow-soft-lg border-4 border-pink-400 transition-colors"
              whileHover={{ scale: 1.05, rotate: 2 }} whileTap={{ scale: 0.95 }}
            >
              🎮 Mulai Bermain
            </motion.a>
            <motion.a
              href="#classes"
              className="px-8 py-4 bg-white hover:bg-gray-50 text-pink-400 text-xl md:text-2xl font-bold rounded-full shadow-soft-lg border-4 border-pink-400 transition-colors"
              whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.95 }}
            >
              📚 Pilih Kelas
            </motion.a>
            <motion.a
              href="/profile"
              className="px-8 py-4 bg-white hover:bg-gray-50 text-pink-400 text-xl md:text-2xl font-bold rounded-full shadow-soft-lg border-4 border-pink-400 transition-colors"
              whileHover={{ scale: 1.05, rotate: 2 }} whileTap={{ scale: 0.95 }}
            >
              🏆 Lihat Prestasi
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Class Selection Section */}
    <section id="classes" className="container mx-auto px-4 py-12">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white font-poppins">
          Pilih Kelasmu
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classesData.map((classItem) => (
            <ClassCard
              key={classItem.number}
              classNumber={classItem.number}
              theme={classItem.theme}
              emoji={classItem.emoji}
              materials={classItem.materials}
              starsEarned={classItem.starsEarned}
              totalStars={100}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white font-poppins">
          Fitur Spesial 🌟
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '🎮', title: 'Game Interaktif', desc: 'Belajar sambil bermain' },
            { icon: '⭐', title: 'Sistem Reward', desc: 'Kumpulkan bintang & badge' },
            { icon: '📊', title: 'Tracking Progress', desc: 'Monitor perkembangan belajar' },
            { icon: '🏆', title: 'Leaderboard', desc: 'Kompetisi sehat antar siswa' },
          ].map((feature, idx) => (
            <div key={idx} className="text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 py-8 mt-16 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 Math Adventure SD. Dibuat dengan ❤️ untuk pembelajaran matematika anak Indonesia.</p>
        </div>
      </footer>

      {/* Music Toggle Floating Button */}
      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-white px-4 py-3 rounded-full shadow-soft-lg border-4 border-[#FFD93D] text-lg font-bold text-gray-700 flex items-center gap-2 hover:bg-yellow-50 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMusicPlaying ? '🔊 Musik ON' : '🔇 Musik OFF'}
      </motion.button>
    </main>
  );
}
