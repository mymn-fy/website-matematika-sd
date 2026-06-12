// Game utilities and constants
export const GAME_THEMES = {
  class1: {
    name: 'Petualangan Mencari Buah',
    emoji: '🍎',
    color: 'from-orange-300 to-red-300',
  },
  class2: {
    name: 'Balon Angka',
    emoji: '🎈',
    color: 'from-purple-300 to-pink-300',
  },
  class3: {
    name: 'Merakit Robot Pintar',
    emoji: '🤖',
    color: 'from-slate-500 to-indigo-500',
  },
  class4: {
    name: 'Kota Matematika',
    emoji: '🏘️',
    color: 'from-green-300 to-blue-300',
  },
  class5: {
    name: 'Math Detective',
    emoji: '🔍',
    color: 'from-indigo-400 to-purple-400',
  },
  class6: {
    name: 'Space Math Adventure',
    emoji: '🚀',
    color: 'from-sky-300 to-blue-500',
  },
};

export const playSound = (type: 'correct' | 'wrong' | 'level-up') => {
  // In a real application, you would load actual sound files
  // For now, we'll just use the Web Audio API with basic tones
  if (typeof window === 'undefined') return;

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  if (type === 'correct') {
    oscillator.frequency.value = 800;
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } else if (type === 'wrong') {
    oscillator.frequency.value = 300;
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }
};

export const getRandomQuestion = (classNum: number) => {
  const questions: { [key: number]: any[] } = {
    1: [
      { question: '2 + 3 = ?', options: ['4', '5', '6', '7'], correct: '5' },
      { question: '5 - 2 = ?', options: ['2', '3', '4', '5'], correct: '3' },
      { question: '1 + 1 = ?', options: ['1', '2', '3', '4'], correct: '2' },
      { question: '6 - 1 = ?', options: ['4', '5', '6', '7'], correct: '5' },
      { question: '3 + 4 = ?', options: ['6', '7', '8', '9'], correct: '7' },
    ],
    2: [
      { question: '7 + 5 = ?', options: ['10', '11', '12', '13'], correct: '12' },
      { question: '15 - 7 = ?', options: ['6', '7', '8', '9'], correct: '8' },
      { question: '8 + 6 = ?', options: ['12', '13', '14', '15'], correct: '14' },
      { question: '12 - 5 = ?', options: ['6', '7', '8', '9'], correct: '7' },
    ],
    3: [
      { question: '3 × 4 = ?', options: ['10', '11', '12', '13'], correct: '12' },
      { question: '6 × 5 = ?', options: ['28', '29', '30', '31'], correct: '30' },
      { question: '12 ÷ 3 = ?', options: ['3', '4', '5', '6'], correct: '4' },
      { question: '20 ÷ 4 = ?', options: ['4', '5', '6', '7'], correct: '5' },
    ],
  };

  const classQuestions = questions[classNum] || questions[1];
  return classQuestions[Math.floor(Math.random() * classQuestions.length)];
};

export const calculateScore = (correct: number, total: number): number => {
  return Math.round((correct / total) * 100);
};
