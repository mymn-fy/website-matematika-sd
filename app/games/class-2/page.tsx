'use client';

import { useRef } from 'react';
import GameInterface, { GameQuestion } from '@/components/games/GameInterface';

export default function Class2Game() {
  const usedQuestions = useRef<Set<string>>(new Set());

  const generateQuestion = (): GameQuestion => {
    let question = '';
    let instruction = '';
    let correctAnswer = '';
    let isUnique = false;
    let options: string[] = [];

    while (!isUnique) {
      const type = Math.floor(Math.random() * 3); // 0: Tambah, 1: Kurang, 2: Banding
      const optionsSet = new Set<string>();

      if (type === 0) {
        // Penjumlahan hingga 100
        const a = Math.floor(Math.random() * 50) + 10;
        const b = Math.floor(Math.random() * (100 - a)) + 1;
        const ans = a + b;
        question = `${a} + ${b} = ?`;
        instruction = 'Pecahkan balon dengan jawaban yang tepat!';
        correctAnswer = String(ans);

        optionsSet.add(correctAnswer);
        while (optionsSet.size < 4) {
          const wrong = ans + (Math.floor(Math.random() * 21) - 10);
          if (wrong > 0 && wrong !== ans) optionsSet.add(String(wrong));
        }
      } else if (type === 1) {
        // Pengurangan hingga 100
        const a = Math.floor(Math.random() * 80) + 20;
        const b = Math.floor(Math.random() * (a - 1)) + 1;
        const ans = a - b;
        question = `${a} - ${b} = ?`;
        instruction = 'Pecahkan balon dengan jawaban yang tepat!';
        correctAnswer = String(ans);

        optionsSet.add(correctAnswer);
        while (optionsSet.size < 4) {
          const wrong = ans + (Math.floor(Math.random() * 21) - 10);
          if (wrong > 0 && wrong !== ans) optionsSet.add(String(wrong));
        }
      } else {
        // Perbandingan angka
        const a = Math.floor(Math.random() * 90) + 10;
        let b = Math.floor(Math.random() * 90) + 10;
        while (a === b) b = Math.floor(Math.random() * 90) + 10;
        
        question = `${a} ... ${b}`;
        instruction = 'Pecahkan balon dengan tanda yang tepat!';
        correctAnswer = a > b ? '>' : '<';
        
        optionsSet.add('>');
        optionsSet.add('<');
        optionsSet.add('=');
      }

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
      classNumber={2}
      gameName="Balon Angka"
      emoji="🎈"
      backgroundColor="from-sky-300 to-white"
      gameMode="balloon-pop"
      rewards={{ balloonIcon: '🎈' }}
      fetchQuestion={generateQuestion}
    />
  );
}
