'use client';

import { useRef } from 'react';
import GameInterface, { GameQuestion } from '@/components/games/GameInterface';

export default function Class1Game() {
  const fruits = [
    { emoji: '🍎', name: 'apel' },
    { emoji: '🍌', name: 'pisang' },
    { emoji: '🍇', name: 'anggur' },
    { emoji: '🍓', name: 'stroberi' },
    { emoji: '🍊', name: 'jeruk' },
    { emoji: '🍉', name: 'semangka' },
    { emoji: '🍍', name: 'nanas' },
    { emoji: '🥭', name: 'mangga' },
    { emoji: '🍒', name: 'ceri' },
    { emoji: '🥝', name: 'kiwi' },
  ];
  const usedQuestions = useRef<Set<string>>(new Set());
  const lastFruitIdx = useRef<number>(-1);

  const generateQuestion = (): GameQuestion => {
    let question = '';
    let instruction = '';
    let correctAnswer = 0;
    let isUnique = false;
    let finalFruitIdx = -1;

    while (!isUnique) {
      // Format visual menghitung buah (angka 1-10)
      correctAnswer = Math.floor(Math.random() * 10) + 1;

      const fruitIdx = Math.floor(Math.random() * fruits.length);
      let newFruitIdx = fruitIdx;
      while (newFruitIdx === lastFruitIdx.current) {
        newFruitIdx = Math.floor(Math.random() * fruits.length);
      }

      const selectedFruit = fruits[newFruitIdx];

      question = Array(correctAnswer).fill(selectedFruit.emoji).join(' ');
      instruction = `Berapa jumlah ${selectedFruit.name}?`;

      // Mencegah duplikasi soal yang sama dalam satu sesi permainan
      if (!usedQuestions.current.has(question)) {
        usedQuestions.current.add(question);
        isUnique = true;
        finalFruitIdx = newFruitIdx;
      }
    }

    lastFruitIdx.current = finalFruitIdx;

    // Opsi jawaban selalu angka 1 sampai 10
    const options = Array.from({ length: 10 }, (_, i) => String(i + 1));

    const correctOption = String(correctAnswer);

    return { question, instruction, options, correct: correctOption };
  };

  return (
    <GameInterface
      classNumber={1}
      gameName="Kebun Buah Ceria"
      emoji="🍎🌳"
      backgroundColor="from-sky-300 to-green-200"
      rewards={{
        fruitIcon: '🍎',
      }}
      fetchQuestion={generateQuestion}
    />
  );
}
