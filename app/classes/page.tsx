'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
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
    theme: 'Merakit Robot Pintar 🤖',
    emoji: '🤖',
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

export default function ClassesPage() {
  const [classesData, setClassesData] = useState(initialClassesData);

  useEffect(() => {
    const clientSideData = initialClassesData.map((classItem) => ({
      ...classItem,
      starsEarned: Math.floor(Math.random() * 100),
    }));
    setClassesData(clientSideData);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 pb-16">
      <Header />
      <section className="container mx-auto px-4 pt-32">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white font-poppins">
          Pilih Kelasmu
        </h1>

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
    </main>
  );
}
