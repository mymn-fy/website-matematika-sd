'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';

export default function Home() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hoverAudio = useRef<HTMLAudioElement | null>(null);
  const clickAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/music/cheerful-theme.mp3');
    audioRef.current.loop = true;
    hoverAudio.current = new Audio('/music/hover.mp3'); // Tambahkan file suara pendek di folder public/music/
    clickAudio.current = new Audio('/music/click.mp3'); // Tambahkan file suara klik di folder public/music/
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const playHover = () => hoverAudio.current?.play().catch(() => {});
  const playClick = () => clickAudio.current?.play().catch(() => {});

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-[#bbf7d0] pb-32 overflow-x-hidden relative font-poppins">
      {/* Floating Math Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
         <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-20 left-10 md:left-20 text-5xl md:text-7xl text-white font-black drop-shadow-md">➕</motion.div>
         <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-40 right-10 md:right-32 text-6xl md:text-8xl text-white font-black drop-shadow-md">✖️</motion.div>
         <motion.div animate={{ y: [0, -30, 0], rotate: [0, 20, -20, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-80 left-16 md:left-40 text-7xl md:text-9xl text-white font-black drop-shadow-md">➗</motion.div>
         <motion.div animate={{ y: [0, 30, 0], rotate: [0, -20, 20, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute bottom-60 right-16 md:right-24 text-6xl md:text-8xl text-white font-black drop-shadow-md">➖</motion.div>
         <motion.div animate={{ y: [0, -15, 0], rotate: [0, 15, -15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/2 left-1/4 text-5xl md:text-6xl text-white font-black drop-shadow-md">⭐</motion.div>
         <motion.div animate={{ y: [0, 25, 0], rotate: [0, -15, 15, 0] }} transition={{ duration: 9, repeat: Infinity }} className="absolute top-1/3 right-1/4 text-5xl md:text-7xl text-white font-black drop-shadow-md">🧩</motion.div>
         <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-32 left-1/3 text-4xl md:text-6xl text-white font-black drop-shadow-md">🔢</motion.div>
      </div>

      <Header />

      <section className="container mx-auto px-4 pt-20 md:pt-28 text-center relative z-10 max-w-6xl">
        
        {/* Mascot Section */}
        <div className="flex flex-col md:flex-row justify-center items-end gap-2 md:gap-6 mb-8 md:mb-12">
          <motion.div 
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: [0, -10, 0] }}
            transition={{ scale: { type: 'spring', bounce: 0.5, duration: 0.8 }, y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } }}
            className="text-[7rem] md:text-[9rem] drop-shadow-2xl z-20"
          >
            🦊
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -20, scale: 0.8 }} 
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
            className="bg-white p-4 md:p-6 rounded-[2rem] rounded-bl-none md:rounded-bl-none shadow-[0_8px_0_rgba(0,0,0,0.1)] border-4 border-sky-300 max-w-[280px] md:max-w-sm text-left relative z-10 mb-4 md:mb-12 mx-auto md:mx-0"
          >
            <p className="text-xl md:text-2xl font-black text-sky-600 mb-1">Halo teman-teman! 👋</p>
            <p className="text-md md:text-lg text-gray-600 font-bold leading-snug">Ayo belajar matematika sambil bermain di dunia petualangan bersamaku!</p>
          </motion.div>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 mb-8 drop-shadow-sm filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
        >
          Math Adventure<br className="md:hidden" /> SD
        </motion.h1>

        {/* Main Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center items-center mt-4 mb-16 relative"
        >
          <motion.a
            href="/classes"
            onMouseEnter={playHover}
            onClick={playClick}
            className="group relative px-10 md:px-14 py-5 md:py-6 bg-yellow-400 hover:bg-yellow-300 text-orange-600 text-2xl md:text-4xl font-black rounded-[3rem] border-4 border-white transition-all transform active:translate-y-2 z-20"
            style={{ boxShadow: '0 12px 0 #d97706, 0 20px 25px rgba(0,0,0,0.2)' }}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95, boxShadow: '0 0px 0 #d97706, 0 5px 10px rgba(0,0,0,0.2)' }}
          >
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-[3rem] transition-opacity duration-300"></span>
            🎮 Mulai Petualangan!
          </motion.a>
        </motion.div>

        {/* Fun Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 px-4">
          {[
            { icon: '⭐', title: '500+ Soal', desc: 'Matematika Seru', color: 'from-amber-300 to-orange-400', shadow: 'shadow-[0_8px_0_#d97706]' },
            { icon: '🎮', title: '6 Level', desc: 'Dunia Petualangan', color: 'from-sky-300 to-blue-500', shadow: 'shadow-[0_8px_0_#2563eb]' },
            { icon: '🎁', title: 'Banyak Hadiah', desc: 'Misterius & Menarik', color: 'from-pink-300 to-rose-500', shadow: 'shadow-[0_8px_0_#e11d48]' },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (idx * 0.2) }}
              className={`bg-gradient-to-b ${stat.color} p-6 rounded-3xl ${stat.shadow} border-4 border-white text-white flex flex-col items-center transform transition-transform hover:-translate-y-2`}
            >
              <div className="text-5xl md:text-6xl mb-3 drop-shadow-md">{stat.icon}</div>
              <h3 className="text-2xl md:text-3xl font-black drop-shadow-sm">{stat.title}</h3>
              <p className="text-lg font-bold opacity-90">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Level Previews */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-sky-600 mb-8 drop-shadow-sm">Peta Petualangan Kita! 🗺️</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { lvl: '1', title: 'Mengenal Angka', icon: '🍎', bg: 'bg-red-50', text: 'text-red-600' },
              { lvl: '2', title: 'Balon Angka', icon: '🎈', bg: 'bg-sky-50', text: 'text-sky-600' },
              { lvl: '3', title: 'Merakit Robot', icon: '🤖', bg: 'bg-indigo-50', text: 'text-indigo-600' },
              { lvl: '4', title: 'Bangun Kota', icon: '🏘️', bg: 'bg-emerald-50', text: 'text-emerald-600' },
              { lvl: '5', title: 'Misi Detektif', icon: '🕵️', bg: 'bg-slate-100', text: 'text-slate-600' },
              { lvl: '6', title: 'Penjelajah Galaksi', icon: '🚀', bg: 'bg-purple-50', text: 'text-purple-600' },
            ].map((level, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + (idx * 0.1) }}
                className={`${level.bg} p-4 md:p-6 rounded-3xl border-4 border-white shadow-[0_6px_0_rgba(0,0,0,0.1)] flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform`}
                onClick={() => window.location.href = "/classes"}
                onMouseEnter={playHover}
              >
                <div className="text-4xl md:text-5xl mb-2 drop-shadow-md">{level.icon}</div>
                <div className="bg-white/80 px-3 py-1 rounded-full text-sm font-black mb-2 shadow-sm">Kelas {level.lvl}</div>
                <p className={`text-sm md:text-lg font-bold ${level.text} leading-tight`}>{level.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Adventure World (Footer Horizon) */}
      <div className="absolute bottom-0 w-full h-40 md:h-48 flex justify-between items-end px-2 md:px-12 text-5xl md:text-7xl overflow-hidden opacity-100 z-10 pointer-events-none">
         <motion.div animate={{ rotate: [-2, 2, -2], y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="pb-8">🏠</motion.div>
         <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity }} className="pb-6 text-6xl md:text-8xl">🌳</motion.div>
         <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="pb-10 text-6xl md:text-8xl origin-center">🎡</motion.div>
         <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="pb-8 hidden md:block">🏫</motion.div>
         <motion.div animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 4.5, repeat: Infinity }} className="pb-7">🏰</motion.div>
         <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="pb-12 text-6xl md:text-8xl drop-shadow-xl hidden sm:block">🚀</motion.div>
         <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 3.5, repeat: Infinity }} className="pb-6 text-6xl md:text-8xl hidden lg:block">🌲</motion.div>
      </div>
      {/* Ground Base */}
      <div className="absolute bottom-0 w-full h-8 md:h-12 bg-green-400 border-t-8 border-green-300 z-20"></div>

      <button 
        onClick={toggleMusic}
        className="fixed bottom-16 md:bottom-20 right-4 md:right-8 bg-white p-4 rounded-full shadow-[0_6px_0_rgba(0,0,0,0.1)] border-4 border-sky-300 text-2xl z-50 hover:scale-110 active:translate-y-2 transition-all"
        title="Putar/Matikan Musik"
      >
        {isMusicPlaying ? '🔊' : '🔇'}
      </button>
    </main>
  );
}