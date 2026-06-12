'use client';

import { useRef } from 'react';
import GameInterface, { GameQuestion } from '@/components/games/GameInterface';

export default function Class4Game() {
  const usedQuestions = useRef<Set<string>>(new Set());

  const generateQuestion = (): GameQuestion => {
    let question = '';
    let instruction = 'Jawab soal dengan benar untuk membangun kota! 🏘️';
    let correctAnswer = '';
    let isUnique = false;
    let options: string[] = [];

    // Reset memori soal jika sudah terlalu banyak (mencegah infinite loop/stuck)
    if (usedQuestions.current.size >= 50) {
      usedQuestions.current.clear();
    }

    while (!isUnique) {
      const type = Math.floor(Math.random() * 3); // 0: Pecahan, 1: Kelipatan, 2: Faktor
      const optionsSet = new Set<string>();

      if (type === 0) {
        // Pecahan senilai
        const num = Math.floor(Math.random() * 9) + 1; // Angka 1 sampai 9
        const den = num + Math.floor(Math.random() * 5) + 1; // Pastikan penyebut lebih besar
        
        const multiplier = Math.floor(Math.random() * 4) + 2; // 2, 3, 4, atau 5
        
        question = `Pecahan yang senilai dengan ${num}/${den} adalah ...`;
        correctAnswer = `${num * multiplier}/${den * multiplier}`;
        
        optionsSet.add(correctAnswer);
        while(optionsSet.size < 4) {
          const wNum = num * (Math.floor(Math.random() * 4) + 1);
          const wDen = den * (Math.floor(Math.random() * 4) + 1) + Math.floor(Math.random() * 3);
          const wrong = `${wNum}/${wDen}`;
          // Pastikan pilihan salah benar-benar bernilai beda dari jawaban aslinya
          if (wrong !== correctAnswer && wNum/wDen !== num/den) {
            optionsSet.add(wrong);
          }
        }
      } else if (type === 1) {
        // Kelipatan
        const base = Math.floor(Math.random() * 11) + 2; // Angka 2 sampai 12
        question = `Tiga kelipatan pertama dari ${base} adalah ...`;
        correctAnswer = `${base}, ${base*2}, ${base*3}`;
        
        optionsSet.add(correctAnswer);
        while(optionsSet.size < 4) {
          const wrongBase = base + Math.floor(Math.random() * 3) - 1;
          const w1 = wrongBase > 0 ? wrongBase : base;
          const w2 = w1 + (wrongBase > 0 ? wrongBase : base) + (Math.random() > 0.5 ? 1 : -1);
          const w3 = w2 + (wrongBase > 0 ? wrongBase : base);
          const wrong = `${w1}, ${w2}, ${w3}`;
          if (wrong !== correctAnswer) optionsSet.add(wrong);
        }
      } else {
        // Faktor
        const nums = [12, 15, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 50, 60];
        const target = nums[Math.floor(Math.random() * nums.length)];
        
        const getFactors = (n: number) => {
          const factors = [];
          for (let i = 1; i <= n; i++) {
            if (n % i === 0) factors.push(i);
          }
          return factors;
        }
        
        const factors = getFactors(target);
        question = `Faktor dari angka ${target} adalah ...`;
        correctAnswer = factors.join(', ');
        
        optionsSet.add(correctAnswer);
        while(optionsSet.size < 4) {
          const wrongFactors = [...factors];
          // Menghapus 1 faktor asli dan memasukkan 1 angka pengacoh
          const removeIdx = Math.floor(Math.random() * (wrongFactors.length - 2)) + 1;
          wrongFactors.splice(removeIdx, 1);
          const addFake = target - Math.floor(Math.random() * 3) - 1;
          if(!wrongFactors.includes(addFake)) wrongFactors.push(addFake);
          wrongFactors.sort((a,b) => a - b);
          
          const wrong = Array.from(new Set(wrongFactors)).join(', ');
          if (wrong !== correctAnswer) optionsSet.add(wrong);
        }
      }

      // Mencegah duplikasi soal yang persis sama di satu sesi permainan
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
      classNumber={4}
      gameName="Kota Matematika 🏘️"
      emoji="🏘️"
      backgroundColor="from-blue-400 to-emerald-500"
      gameMode="city-builder"
      fetchQuestion={generateQuestion}
    />
  );
}