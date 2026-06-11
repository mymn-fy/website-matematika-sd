'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Button from '@/components/ui/Button';
import { playSound, getRandomQuestion, calculateScore } from '@/lib/gameUtils';

export interface GameQuestion {
  question: string;
  instruction?: string;
  options: string[];
  correct: string;
}

interface GameInterfaceProps {
  classNumber: number;
  gameName: string;
  emoji: string;
  backgroundColor: string;
  gameMode?: 'multiple-choice' | 'balloon-pop';
  rewards?: {
    fruitIcon?: string;
    balloonIcon?: string;
    coinIcon?: string;
  };
  fetchQuestion?: () => GameQuestion;
}

const GameInterface: React.FC<GameInterfaceProps> = ({
  classNumber,
  gameName,
  emoji,
  backgroundColor,
  gameMode = 'multiple-choice',
  rewards = {},
  fetchQuestion,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [rewardsEarned, setRewardsEarned] = useState(0);
  const [specialRewardsEarned, setSpecialRewardsEarned] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [enableSound, setEnableSound] = useState(true);
  const [mascotMessage, setMascotMessage] = useState('Ayo cari jawaban yang benar!');
  const rainbowControls = useAnimation();

  useEffect(() => {
    loadNextQuestion();
  }, []);

  const loadNextQuestion = () => {
    const question = fetchQuestion ? fetchQuestion() : getRandomQuestion(classNumber);
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setShowResult(false);
    setMascotMessage('Ayo cari jawaban yang benar!');
  };

  const handleAnswerClick = (answer: string) => {
    if (showResult || !currentQuestion) return;

    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correct;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + 1);
      setRewardsEarned(rewardsEarned + 10);
      setSpecialRewardsEarned(specialRewardsEarned + 1);
      setMascotMessage(Math.random() > 0.5 ? 'Hebat! Kamu berhasil!' : 'Pintar sekali!');
      rainbowControls.start({
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.05, 1],
        transition: { duration: 1.5, ease: 'easeInOut' },
      });
      if (enableSound) playSound('correct');

      setTotalQuestions(totalQuestions + 1);

      // Move to next question after 1.5 seconds
      setTimeout(() => {
        if (totalQuestions + 1 >= 100) {
          setGameOver(true);
        } else {
          loadNextQuestion();
        }
      }, 1500);
    } else {
      if (enableSound) playSound('wrong');
      setMistakes(mistakes + 1);
      setMascotMessage('Yuk coba lagi!');
      // Beri petunjuk dan biarkan mencoba lagi
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswer(null);
      }, 2000);
    }
  };

  const handlePlayAgain = () => {
    setScore(0);
    setTotalQuestions(0);
    setRewardsEarned(0);
    setSpecialRewardsEarned(0);
    setMistakes(0);
    setGameOver(false);
    loadNextQuestion();
  };

  if (!currentQuestion && !gameOver) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-300 to-white pt-4 pb-8 overflow-hidden font-poppins">
      {/* Animated Background */}
      {classNumber === 2 ? <SkyBalloonAdventureBackground /> : <MagicalLearningGardenBackground />}

      {gameMode === 'balloon-pop' && (
        <BalloonField 
          options={currentQuestion?.options || []}
          onPop={(ans) => handleAnswerClick(ans)} 
          disabled={showResult || gameOver} 
        />
      )}

      <div className="relative z-10 container mx-auto px-4 pointer-events-none">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pointer-events-auto">
          <Button 
            variant="secondary" 
            size="sm" 
            href="/" 
            className="bg-white/60 backdrop-blur-md border-2 border-white/70 hover:bg-white/90 text-gray-700 shadow-sm rounded-full px-5 py-2 font-bold flex items-center gap-2"
          >
            🏠 <span className="hidden md:inline">Kembali</span>
          </Button>
          <button
            onClick={() => setEnableSound(!enableSound)}
            className="text-3xl hover:scale-110 transition-transform"
          >
            {enableSound ? '🔊' : '🔇'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!gameOver ? (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Question Card */}
              <motion.div
                className="pt-12 md:pt-16 pb-4 md:pb-8 px-4 md:px-8 text-center relative"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
              >
                <div className="relative z-10">
                  <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
                    {currentQuestion?.question.split(' ').filter(Boolean).map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_15px_rgba(255,182,193,0.25)] border-2 border-white p-3 md:p-4 text-4xl md:text-5xl flex items-center justify-center min-w-[60px] min-h-[60px]"
                        initial={{ scale: 0, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.08, type: "spring", bounce: 0.5 }}
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>

                  {currentQuestion?.instruction && (
                    <div className="inline-block bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border-4 border-white shadow-sm mb-8">
                      <p className="text-xl md:text-2xl text-blue-500 font-bold">
                        {currentQuestion.instruction}
                      </p>
                    </div>
                  )}

                  {gameMode === 'balloon-pop' ? (
                    <div className="mb-6 flex flex-col items-center">
                      <p className="text-xl md:text-2xl text-gray-500 font-bold mb-4 animate-pulse">
                        Tunggu balon jawaban muncul dan pecahkan! 🎈
                      </p>
                    </div>
                  ) : (
                    <div className={`grid gap-3 md:gap-4 mx-auto pointer-events-auto ${currentQuestion?.options && currentQuestion.options.length > 4 ? 'grid-cols-5 max-w-3xl' : 'grid-cols-2 max-w-md'}`}>
                      {currentQuestion?.options.map((option, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => handleAnswerClick(option)}
                          disabled={showResult}
                          className={`
                            p-3 md:p-4 rounded-2xl md:rounded-3xl text-xl md:text-2xl font-bold transition-all duration-300
                            ${
                              selectedAnswer === option
                                ? isCorrect
                                  ? 'bg-gradient-to-r from-[#86EFAC] to-[#34D399] text-white shadow-[0_0_20px_rgba(52,211,153,0.5)] scale-105 border-4 border-white'
                                  : 'bg-gradient-to-r from-[#FDA4AF] to-[#FB7185] text-white shadow-[0_0_20px_rgba(251,113,133,0.5)] scale-105 border-4 border-white'
                                : showResult && option === currentQuestion?.correct
                                  ? 'bg-gradient-to-r from-[#86EFAC] to-[#34D399] text-white border-4 border-white'
                                  : 'bg-gradient-to-br from-white to-blue-50 text-[#87CEEB] hover:from-blue-50 hover:to-indigo-50 hover:text-indigo-500 border-4 border-sky-300 shadow-soft-lg hover:shadow-[0_0_20px_rgba(167,139,250,0.4)]'
                            }
                            ${showResult ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                          `}
                          whileHover={!showResult ? { scale: 1.05 } : {}}
                          whileTap={!showResult ? { scale: 0.95 } : {}}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Rewards Display */}
              <div className="flex justify-center w-full relative z-20 pb-32">
                {showResult && isCorrect && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border-4 border-sky-300"
                  >
                    <motion.div
                      animate={{ y: [-20, 0, -20] }}
                      transition={{ duration: 0.6, repeat: 2 }}
                      className="text-6xl mb-4 flex justify-center gap-4"
                    >
                    <span>🎉</span>
                      <span>⭐</span>
                      {rewards.fruitIcon && <span>{rewards.fruitIcon}</span>}
                      {rewards.balloonIcon && <span>{rewards.balloonIcon}</span>}
                    </motion.div>
                    <p className="text-sky-600 text-xl md:text-2xl font-bold drop-shadow-sm">
                      Jawaban Benar!
                    </p>
                  </motion.div>
                )}

                {showResult && !isCorrect && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border-4 border-red-300"
                  >
                    <p className="text-red-500 text-2xl font-bold drop-shadow-sm mb-2">Coba Lagi! 💪</p>
                    <p className="text-lg font-medium text-gray-700">
                      {gameMode === 'balloon-pop' 
                        ? '💡 Petunjuk: Hitung perlahan dan pecahkan balon dengan tepat ya!' 
                        : '💡 Petunjuk: Hitung pelan-pelan ya.'}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_15px_40px_rgba(255,182,193,0.3)] border-8 border-white/70 p-12 text-center max-w-2xl mx-auto relative overflow-hidden pointer-events-auto"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-8 inline-block"
              >
                🏆
              </motion.div>

              <h3 className="text-4xl font-bold text-gray-800 mb-4">Permainan Selesai!</h3>

              <div className="grid grid-cols-3 gap-4 my-8">
                <div className="bg-sky-blue bg-opacity-20 rounded-2xl p-4">
                  <p className="text-gray-600">Benar</p>
                  <p className="text-3xl font-bold text-sky-blue">{score}</p>
                </div>
                <div className="bg-red-400 bg-opacity-20 rounded-2xl p-4">
                  <p className="text-gray-600">Salah</p>
                  <p className="text-3xl font-bold text-red-400">
                    {mistakes}
                  </p>
                </div>
                <div className="bg-mint-green bg-opacity-20 rounded-2xl p-4">
                  <p className="text-gray-600">Nilai</p>
                  <p className="text-3xl font-bold text-mint-green">
                    {calculateScore(score, score + mistakes)}%
                  </p>
                </div>
              </div>

              <div className="bg-yellow-400 bg-opacity-30 backdrop-blur-sm rounded-2xl p-6 mb-8">
                <p className="text-2xl font-bold text-gray-800 mb-2">
                  Total Bintang Terkumpul: ⭐ {rewardsEarned}
                </p>
                {rewards.fruitIcon && (
                  <p className="text-2xl font-bold text-gray-800 mb-2">
                    Buah Terkumpul: {rewards.fruitIcon} {specialRewardsEarned}
                  </p>
                )}
                {rewards.balloonIcon && (
                  <p className="text-2xl font-bold text-gray-800 mb-2">
                    Balon Terkumpul: {rewards.balloonIcon} {specialRewardsEarned}
                  </p>
                )}
                <p className="text-gray-700">Lanjutkan bermain untuk lebih banyak hadiah!</p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="success" size="lg" onClick={handlePlayAgain}>
                  Bermain Lagi
                </Button>
              <Button variant="primary" size="lg" href="/">
                  Kembali Ke Rumah
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {classNumber === 2 && <BoboMascot message={mascotMessage} />}
    </div>
  );
};

const MagicalLearningGardenBackground = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
    {/* Magical Garden Base */}
    <div className="absolute bottom-0 w-full h-[25vh] min-h-[150px] flex justify-center items-end">
      <div className="absolute bottom-0 w-[150%] md:w-[120%] h-[200px] bg-gradient-to-t from-[#A7F3D0] to-[#E8FFF3] rounded-[100%] translate-y-1/2 opacity-90 blur-[2px]"></div>
      <div className="absolute bottom-0 w-[120%] md:w-[100%] h-[150px] bg-gradient-to-t from-[#6EE7B7] to-[#A7F3D0] rounded-[100%] translate-y-[35%] shadow-inner"></div>
    </div>

    <div className="absolute bottom-4 w-full flex justify-around px-2 md:px-20 text-3xl md:text-5xl z-10 drop-shadow-md">
      <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 3.1, repeat: Infinity }}>🌸</motion.span>
      <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 4.2, repeat: Infinity }}>🍄</motion.span>
      <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>🌷</motion.span>
      <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>🌼</motion.span>
      <motion.span animate={{ y: [0, -7, 0] }} transition={{ duration: 3.8, repeat: Infinity }}>🍄</motion.span>
      <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 4.1, repeat: Infinity }}>🌺</motion.span>
    </div>
  </div>
);

const SkyBalloonAdventureBackground = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
    {/* Soft Blue Sky Background */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#E0F4FF] to-[#F0F8FF] opacity-90" />

    {/* Clouds */}
    <motion.div className="absolute top-[5%] text-6xl md:text-8xl opacity-80 drop-shadow-sm" initial={{ x: '-15vw' }} animate={{ x: '115vw' }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>☁️</motion.div>
    <motion.div className="absolute top-[15%] text-7xl md:text-9xl opacity-60 drop-shadow-sm" initial={{ x: '115vw' }} animate={{ x: '-25vw' }} transition={{ duration: 70, repeat: Infinity, ease: 'linear', delay: 5 }}>☁️</motion.div>
    <motion.div className="absolute top-[25%] text-5xl md:text-7xl opacity-70 drop-shadow-sm" initial={{ x: '-10vw' }} animate={{ x: '115vw' }} transition={{ duration: 40, repeat: Infinity, ease: 'linear', delay: 15 }}>☁️</motion.div>

    {/* Tiny Rainbow */}
    <div className="absolute top-[10%] right-[10%] text-5xl md:text-6xl opacity-70 drop-shadow-md">🌈</div>

    {/* Twinkling Stars & Sparkles */}
    <motion.div className="absolute top-[12%] left-[25%] text-2xl text-yellow-400" animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 3, repeat: Infinity }}>✨</motion.div>
    <motion.div className="absolute top-[28%] right-[30%] text-xl text-yellow-400" animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}>✨</motion.div>
    <motion.div className="absolute top-[20%] left-[10%] text-3xl text-yellow-400" animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}>⭐</motion.div>

    {/* Small Kite */}
    <motion.div className="absolute top-[20%] left-[15%] text-4xl drop-shadow-md" animate={{ y: [-10, 10, -10], x: [-5, 5, -5], rotate: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>🪁</motion.div>

    {/* Cartoon Birds */}
    <motion.div className="absolute top-[18%] text-3xl opacity-80 drop-shadow-md" initial={{ x: '-10vw' }} animate={{ x: '115vw', y: [0, -15, 10, -5, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>🐦</motion.div>
    <motion.div className="absolute top-[25%] text-2xl opacity-70 drop-shadow-md" initial={{ x: '115vw', scaleX: -1 }} animate={{ x: '-15vw', y: [0, 15, -10, 5, 0], scaleX: -1 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay: 5 }}>🐦</motion.div>

    {/* Green Hills Base */}
    <div className="absolute bottom-0 w-full h-[25vh] min-h-[150px] flex justify-center items-end">
      <div className="absolute bottom-0 w-[150%] md:w-[120%] h-[200px] bg-gradient-to-t from-[#86EFAC] to-[#D1FAE5] rounded-[100%] translate-y-1/2 opacity-90 blur-[1px]"></div>
      <div className="absolute bottom-0 w-[120%] md:w-[100%] h-[150px] bg-gradient-to-t from-[#34D399] to-[#6EE7B7] rounded-[100%] translate-y-[35%] shadow-inner"></div>
    </div>

    {/* Grass and Flowers */}
    <div className="absolute bottom-4 w-full flex justify-around px-2 md:px-20 text-2xl md:text-4xl z-10 drop-shadow-sm">
      <motion.span animate={{ y: [0, -3, 0], rotate: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity }}>🌼</motion.span>
      <motion.span animate={{ y: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity }}>🌱</motion.span>
      <motion.span animate={{ y: [0, -4, 0], rotate: [2, -2, 2] }} transition={{ duration: 3.5, repeat: Infinity }}>🌼</motion.span>
      <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>🌱</motion.span>
      <motion.span animate={{ y: [0, -4, 0], rotate: [-2, 2, -2] }} transition={{ duration: 3.8, repeat: Infinity }}>🌼</motion.span>
      <motion.span animate={{ y: [0, -2, 0] }} transition={{ duration: 4.1, repeat: Infinity }}>🌱</motion.span>
    </div>
  </div>
);

const BALLOON_COLORS = [
  { bg: 'from-red-400 to-red-500', tie: 'border-b-red-500' },
  { bg: 'from-blue-400 to-blue-500', tie: 'border-b-blue-500' },
  { bg: 'from-green-400 to-green-500', tie: 'border-b-green-500' },
  { bg: 'from-yellow-300 to-yellow-400', tie: 'border-b-yellow-400' },
  { bg: 'from-purple-400 to-purple-500', tie: 'border-b-purple-500' },
  { bg: 'from-orange-400 to-orange-500', tie: 'border-b-orange-500' },
];

const BalloonField = ({ options, onPop, disabled }: { options: string[]; onPop: (val: string) => void; disabled: boolean }) => {
  const [balloons, setBalloons] = useState<{ id: number; left: number; speed: number; color: typeof BALLOON_COLORS[0]; text: string }[]>([]);

  useEffect(() => {
    if (disabled || !options || options.length === 0) {
      setBalloons([]);
      return;
    }
    const interval = setInterval(() => {
      setBalloons(prev => {
        if (prev.length > 8) return prev; // Maksimal 8 balon agar tidak terlalu penuh
        const randomOption = options[Math.floor(Math.random() * options.length)];
        return [...prev, {
          id: Date.now() + Math.random(),
          left: Math.random() * 80 + 10,
          speed: Math.random() * 5 + 7, // Kecepatan melayang (7-12 detik)
          color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
          text: randomOption
        }];
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [disabled, options]);

  const handlePop = (id: number, text: string) => {
    if (disabled) return;
    onPop(text);
    setBalloons(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      <AnimatePresence>
        {balloons.map(b => (
          <motion.div
            key={b.id}
            initial={{ y: '110vh', x: '-50%', scale: 1 }}
            animate={{ y: '-20vh', scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ y: { duration: b.speed, ease: 'linear' }, exit: { duration: 0.15 } }}
            className="absolute pointer-events-auto cursor-crosshair drop-shadow-md select-none touch-none"
            style={{ left: `${b.left}%` }}
            onMouseDown={() => handlePop(b.id, b.text)}
            onTouchStart={(e) => { e.preventDefault(); handlePop(b.id, b.text); }}
            onAnimationComplete={() => {
              setBalloons(prev => prev.filter(balloon => balloon.id !== b.id));
            }}
          >
            <div className={`relative flex items-center justify-center w-20 h-28 md:w-24 md:h-32 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-lg bg-gradient-to-br ${b.color.bg}`}>
              <div className="absolute top-2 left-3 w-5 h-7 md:w-6 md:h-8 bg-white/40 rounded-full rotate-[-45deg]"></div>
              <div className={`absolute -bottom-3 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-transparent ${b.color.tie}`}></div>
              <span className="text-3xl md:text-4xl font-black text-white drop-shadow-md">{b.text}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const BoboMascot = ({ message }: { message: string }) => (
  <div className="fixed bottom-4 left-4 z-20 flex items-end gap-4 pointer-events-none">
    <motion.div 
      className="relative"
      whileHover={{ scale: 1.05 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Bobo si Balon Pintar */}
      <div className="relative flex items-center justify-center w-20 h-28 md:w-24 md:h-32 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-lg bg-gradient-to-br from-blue-400 to-blue-500">
        {/* Highlight */}
        <div className="absolute top-2 left-3 w-5 h-7 md:w-6 md:h-8 bg-white/40 rounded-full rotate-[-45deg]"></div>
        {/* Cute Face */}
        <div className="absolute flex flex-col items-center top-10 md:top-12">
          <div className="flex gap-3 mb-1">
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gray-800 rounded-full"></div>
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gray-800 rounded-full"></div>
          </div>
          <div className="w-3 h-1.5 md:w-4 md:h-2 border-b-2 md:border-b-[3px] border-gray-800 rounded-full"></div>
        </div>
        {/* Hat */}
        <div className="absolute -top-4 md:-top-5 text-3xl md:text-4xl rotate-12">🧢</div>
        {/* Tie */}
        <div className="absolute -bottom-3 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-transparent border-b-blue-500"></div>
      </div>
    </motion.div>
    
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          key={message}
          initial={{ opacity: 0, x: -10, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl rounded-bl-none px-4 py-3 shadow-soft-lg mb-8 border-2 border-blue-200 max-w-[200px]"
        >
          <p className="font-bold text-sky-600 text-sm md:text-base leading-snug">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default GameInterface;
