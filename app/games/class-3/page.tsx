'use client';

import { useRef } from 'react';
import GameInterface, { GameQuestion } from '@/components/games/GameInterface';

export default function Class3Game() {
  const usedQuestions = useRef<Set<string>>(new Set());

  const generateQuestion = (): GameQuestion => {
    let question = '';
    let instruction = 'Jawab soal dengan benar untuk merakit robot! 🤖';
    let correctAnswer = '';
    let isUnique = false;
    let options: string[] = [];

    // Reset memori soal jika sudah banyak agar tidak stuck saat bermain lagi
    if (usedQuestions.current.size >= 50) {
      usedQuestions.current.clear();
    }

    while (!isUnique) {
      const type = Math.floor(Math.random() * 3); // 0: Perkalian, 1: Pembagian, 2: Campuran
      const optionsSet = new Set<string>();

      if (type === 0) {
        // Perkalian (Tabel 2 - 10)
        const a = Math.floor(Math.random() * 9) + 2;
        const b = Math.floor(Math.random() * 9) + 2;
        const ans = a * b;
        question = `${a} × ${b} = ?`;
        correctAnswer = String(ans);

        optionsSet.add(correctAnswer);
        while (optionsSet.size < 4) {
          const wrong = ans + (Math.floor(Math.random() * 21) - 10);
          if (wrong > 0 && wrong !== ans) optionsSet.add(String(wrong));
        }
      } else if (type === 1) {
        // Pembagian (Pastikan pembagian bulat/tidak ada sisa)
        const b = Math.floor(Math.random() * 9) + 2; // Pembagi 2-10
        const ans = Math.floor(Math.random() * 9) + 2; // Hasil 2-10
        const a = b * ans; // Angka yang dibagi
        question = `${a} ÷ ${b} = ?`;
        correctAnswer = String(ans);

        optionsSet.add(correctAnswer);
        while (optionsSet.size < 4) {
          const wrong = ans + (Math.floor(Math.random() * 9) - 4);
          if (wrong > 0 && wrong !== ans) optionsSet.add(String(wrong));
        }
      } else {
        // Operasi hitung campuran (Misal: A x B + C atau A x B - C)
        const a = Math.floor(Math.random() * 5) + 2; // 2-6
        const b = Math.floor(Math.random() * 5) + 2; // 2-6
        const c = Math.floor(Math.random() * 10) + 1; // 1-10
        
        const isAddition = Math.random() > 0.5;
        let ans;
        if (isAddition) {
          ans = (a * b) + c;
          question = `${a} × ${b} + ${c} = ?`;
        } else {
          ans = (a * b) - c;
          // Jika hasil negatif, tukar menjadi penjumlahan saja
          if (ans < 0) {
            ans = (a * b) + c;
            question = `${a} × ${b} + ${c} = ?`;
          } else {
            question = `${a} × ${b} - ${c} = ?`;
          }
        }
        
        correctAnswer = String(ans);

        optionsSet.add(correctAnswer);
        while (optionsSet.size < 4) {
          const wrong = ans + (Math.floor(Math.random() * 15) - 7);
          if (wrong >= 0 && wrong !== ans) optionsSet.add(String(wrong));
        }
      }

      // Pastikan pertanyaan tidak berulang dalam satu sesi bermain
      if (!usedQuestions.current.has(question)) {
        usedQuestions.current.add(question);
        isUnique = true;
        options = Array.from(optionsSet).sort(() => Math.random() - 0.5);
      }
    }

    return { question, instruction, options, correct: correctAnswer };
  };

  return (
    <GameInterface
      classNumber={3}
      gameName="Merakit Robot Pintar 🤖"
      emoji="🤖"
      backgroundColor="from-slate-700 to-indigo-900"
      gameMode="robot-builder"
      fetchQuestion={generateQuestion}
    />
  );
}
