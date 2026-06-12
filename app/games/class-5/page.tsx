'use client';

import { useRef } from 'react';
import GameInterface, { GameQuestion } from '@/components/games/GameInterface';

export default function Class5Game() {
  const usedQuestions = useRef<Set<string>>(new Set());

  const generateQuestion = (): GameQuestion => {
    let question = '';
    let instruction = 'Pecahkan soal ini untuk menemukan petunjuk! 🕵️';
    let correctAnswer = '';
    let isUnique = false;
    let options: string[] = [];

    // Reset memori soal jika sudah terlalu banyak (mencegah infinite loop/stuck)
    if (usedQuestions.current.size >= 50) {
      usedQuestions.current.clear();
    }

    while (!isUnique) {
      const type = Math.floor(Math.random() * 3); // 0: Pecahan campuran, 1: Desimal, 2: Persentase
      const optionsSet = new Set<string>();

      if (type === 0) {
        // Pecahan Campuran
        const subType = Math.floor(Math.random() * 2);
        
        if (subType === 0) {
          // Penjumlahan Pecahan Campuran berpenyebut sama
          const whole1 = Math.floor(Math.random() * 3) + 1;
          const whole2 = Math.floor(Math.random() * 3) + 1;
          const den = Math.floor(Math.random() * 4) + 3; // 3 to 6
          const num1 = Math.floor(Math.random() * (den - 1)) + 1;
          const num2 = Math.floor(Math.random() * (den - 1)) + 1;
          
          question = `${whole1} ${num1}/${den} + ${whole2} ${num2}/${den} = ...`;
          
          let totalWhole = whole1 + whole2;
          let totalNum = num1 + num2;
          if (totalNum >= den) {
            totalWhole += 1;
            totalNum -= den;
          }
          
          if (totalNum === 0) {
             correctAnswer = `${totalWhole}`;
          } else {
             correctAnswer = `${totalWhole} ${totalNum}/${den}`;
          }

          optionsSet.add(correctAnswer);
          while (optionsSet.size < 4) {
             let wWhole = totalWhole + Math.floor(Math.random() * 3) - 1;
             let wNum = totalNum + Math.floor(Math.random() * 3) - 1;
             if (wNum <= 0) wNum = 1;
             if (wNum >= den) wNum = den - 1;
             if (wWhole <= 0) wWhole = 1;
             const wrong = `${wWhole} ${wNum}/${den}`;
             if (wrong !== correctAnswer) optionsSet.add(wrong);
          }
        } else {
          // Mengubah pecahan campuran ke pecahan biasa
          const whole = Math.floor(Math.random() * 5) + 1;
          const den = Math.floor(Math.random() * 5) + 3; // 3 to 7
          const num = Math.floor(Math.random() * (den - 1)) + 1;
          
          question = `Bentuk pecahan biasa dari ${whole} ${num}/${den} adalah ...`;
          const finalNum = whole * den + num;
          correctAnswer = `${finalNum}/${den}`;
          
          optionsSet.add(correctAnswer);
          while(optionsSet.size < 4) {
             const wNum = finalNum + Math.floor(Math.random() * 7) - 3;
             const wrong = `${wNum > 0 ? wNum : 1}/${den}`;
             if (wrong !== correctAnswer) optionsSet.add(wrong);
          }
        }
      } else if (type === 1) {
        // Desimal
        const subType = Math.floor(Math.random() * 2);
        if (subType === 0) {
          // Penjumlahan desimal
          const a = (Math.random() * 10 + 1).toFixed(1);
          const b = (Math.random() * 5 + 1).toFixed(1);
          const ans = (parseFloat(a) + parseFloat(b)).toFixed(1);
          question = `${a} + ${b} = ...`;
          correctAnswer = ans;
          
          optionsSet.add(correctAnswer);
          while(optionsSet.size < 4) {
             const wrong = (parseFloat(ans) + (Math.floor(Math.random() * 11) - 5) * 0.1).toFixed(1);
             if (wrong !== correctAnswer && parseFloat(wrong) > 0) optionsSet.add(wrong);
          }
        } else {
          // Pengurangan desimal
          const a = (Math.random() * 10 + 5).toFixed(2);
          const b = (Math.random() * 4 + 1).toFixed(2);
          const ans = (parseFloat(a) - parseFloat(b)).toFixed(2);
          question = `${a} - ${b} = ...`;
          correctAnswer = ans;
          
          optionsSet.add(correctAnswer);
          while(optionsSet.size < 4) {
             const wrong = (parseFloat(ans) + (Math.floor(Math.random() * 11) - 5) * 0.1).toFixed(2);
             if (wrong !== correctAnswer && parseFloat(wrong) > 0) optionsSet.add(wrong);
          }
        }
      } else {
        // Persentase (e.g. 25% dari 200)
        const percentages = [10, 20, 25, 50, 75];
        const percent = percentages[Math.floor(Math.random() * percentages.length)];
        const baseValues = [100, 200, 300, 400, 500, 1000];
        const base = baseValues[Math.floor(Math.random() * baseValues.length)];
        
        const ans = (percent / 100) * base;
        question = `${percent}% dari ${base} = ...`;
        correctAnswer = String(ans);
        
        optionsSet.add(correctAnswer);
        while(optionsSet.size < 4) {
          const wrong = ans + (Math.floor(Math.random() * 11) - 5) * (base / 100);
          if (wrong > 0 && String(wrong) !== correctAnswer) optionsSet.add(String(wrong));
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
      classNumber={5}
      gameName="Math Detective 🔍"
      emoji="🕵️"
      backgroundColor="from-slate-500 to-slate-800"
      gameMode="math-detective"
      fetchQuestion={generateQuestion}
    />
  );
}