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

// Fungsi untuk memformat teks pecahan menjadi bentuk vertikal matematika yang rapi
export const renderMathText = (text: string) => {
  if (typeof text !== 'string') return text;
  
  // Mendeteksi pecahan biasa (misal: 8/5) maupun pecahan campuran (misal: 1 3/5)
  const fractionRegex = /(?:(\d+)\s+)?(\d+)\/(\d+)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = fractionRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const textPart = text.slice(lastIndex, match.index);
      textPart.split(' ').filter(Boolean).forEach((word, idx) => {
        parts.push(<span key={`text-${lastIndex}-${idx}`} className="whitespace-nowrap">{word}</span>);
      });
    }

    const whole = match[1];
    const num = match[2];
    const den = match[3];

    parts.push(
      <span key={`frac-${match.index}`} className="inline-flex items-center justify-center align-middle whitespace-nowrap">
        {whole && <span className="mr-1.5 md:mr-2">{whole}</span>}
        <span className="flex flex-col items-center justify-center text-[0.9em]">
          <span className="border-b-[0.12em] border-current px-1 min-w-[1.2em] text-center leading-[1.1] pb-[0.1em]">{num}</span>
          <span className="px-1 min-w-[1.2em] text-center leading-[1.1] pt-[0.1em]">{den}</span>
        </span>
      </span>
    );

    lastIndex = fractionRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    const textPart = text.slice(lastIndex);
    textPart.split(' ').filter(Boolean).forEach((word, idx) => {
      parts.push(<span key={`text-end-${lastIndex}-${idx}`} className="whitespace-nowrap">{word}</span>);
    });
  }

  return parts.length > 0 ? (
    <span className="inline-flex flex-wrap items-center justify-center gap-x-2 md:gap-x-3 gap-y-2 w-full">
      {parts}
    </span>
  ) : text;
};

// Komponen Vektor (SVG) Perpustakaan Kustom yang Berwarna dan Memiliki Tanda "PERPUS"
const LibraryIcon = ({ className = "w-[1em] h-[1em]" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`inline-block drop-shadow-sm ${className}`} xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="98" rx="45" ry="5" fill="rgba(0,0,0,0.15)" />
    <rect x="15" y="45" width="70" height="55" fill="#FDE68A" rx="4" />
    <rect x="15" y="95" width="70" height="5" fill="#D97706" />
    <path d="M5 45 L50 22 L95 45 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="4" strokeLinejoin="round" />
    <rect x="22" y="45" width="12" height="50" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
    <rect x="66" y="45" width="12" height="50" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
    <path d="M40 100 L40 70 A 10 10 0 0 1 60 70 L60 100" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2" />
    <circle cx="47" cy="85" r="1.5" fill="#FCD34D" />
    <circle cx="53" cy="85" r="1.5" fill="#FCD34D" />
    <circle cx="50" cy="55" r="7" fill="#93C5FD" stroke="#2563EB" strokeWidth="2" />
    <text x="50" y="18" fontSize="16" textAnchor="middle">📚</text>
  </svg>
);

const MYSTERY_GIFTS = [
  { emoji: '🏆', title: 'Piala Detektif Hebat', message: 'Selamat! Kamu berhasil menyelesaikan seluruh misi dan mendapatkan hadiah spesial.' },
  { emoji: '🕵️', title: 'Lencana Detektif Cerdas', message: 'Keahlian matematikamu sangat tajam layaknya detektif sungguhan!' },
  { emoji: '👑', title: 'Mahkota Juara Matematika', message: 'Kamu adalah raja matematika hari ini!' },
  { emoji: '⭐', title: 'Bintang Prestasi', message: 'Cahayamu bersinar terang karena berhasil memecahkan semua soal!' },
  { emoji: '💎', title: 'Permata Pengetahuan', message: 'Pengetahuanmu lebih berharga dari permata ini.' },
  { emoji: '🎖️', title: 'Medali Juara', message: 'Usahamu membuahkan hasil, kamu pantas mendapatkan medali ini!' },
  { emoji: '📚', title: 'Buku Pintar', message: 'Teruslah membaca dan belajar, pengetahuanmu tak terbatas!' },
  { emoji: '🔍', title: 'Kaca Pembesar Emas', message: 'Kamu adalah detektif matematika yang hebat!' },
  { emoji: '🤖', title: 'Robot Pintar', message: 'Kecerdasanmu hampir menyamai robot super canggih ini.' },
  { emoji: '🚀', title: 'Roket Juara', message: 'Kecepatan berpikirmu melesat bagai roket ke luar angkasa!' },
];

interface GameInterfaceProps {
  classNumber: number;
  gameName: string;
  emoji: string;
  backgroundColor: string;
  gameMode?: 'multiple-choice' | 'balloon-pop' | 'treasure-hunt' | 'robot-builder' | 'city-builder' | 'math-detective' | 'space-mission';
  rewards?: {
    fruitIcon?: string;
    balloonIcon?: string;
    coinIcon?: string;
    mapIcon?: string;
  };
  fetchQuestion?: (level?: number) => GameQuestion;
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

  // State khusus mode treasure-hunt
  const [treasureLevel, setTreasureLevel] = useState(1);
  const [keysCollected, setKeysCollected] = useState(0);
  const [isChestReady, setIsChestReady] = useState(false);
  const [chestOpened, setChestOpened] = useState(false);

  // State khusus mode robot-builder
  const [robotPartsCollected, setRobotPartsCollected] = useState(0);
  const [isRobotReady, setIsRobotReady] = useState(false);
  const [robotActivated, setRobotActivated] = useState(false);

  // State khusus mode city-builder
  const [showBuildingAnimation, setShowBuildingAnimation] = useState(false);
  const [buildingsCollected, setBuildingsCollected] = useState(0);
  const [isCityReady, setIsCityReady] = useState(false);
  const [cityActivated, setCityActivated] = useState(false);

  // State khusus mode math-detective
  const [cluesCollected, setCluesCollected] = useState(0);
  const [showClueAnimation, setShowClueAnimation] = useState(false);
  const [isCaseSolved, setIsCaseSolved] = useState(false);
  const [caseActivated, setCaseActivated] = useState(false);
  const [mysteryGift, setMysteryGift] = useState<{ emoji: string; title: string; message: string; } | null>(null);
  const [giftOpened, setGiftOpened] = useState(false);

  // State khusus mode space-mission
  const [planetsCollected, setPlanetsCollected] = useState(0);
  const [showPlanetAnimation, setShowPlanetAnimation] = useState(false);
  const [isGalaxyReady, setIsGalaxyReady] = useState(false);
  const [galaxyActivated, setGalaxyActivated] = useState(false);

  const rainbowControls = useAnimation();

  useEffect(() => {
    loadNextQuestion();
  }, []);

  const getTargetKeys = (lvl: number) => lvl === 1 ? 5 : lvl === 2 ? 7 : 10;

  const loadNextQuestion = (forcedLevel?: number) => {
    const currentLvl = forcedLevel || treasureLevel;
    const question = fetchQuestion ? fetchQuestion(gameMode === 'treasure-hunt' ? currentLvl : undefined) : getRandomQuestion(classNumber);
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setShowResult(false);
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
      rainbowControls.start({
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.05, 1],
        transition: { duration: 1.5, ease: 'easeInOut' },
      });
      if (enableSound) playSound('correct');

      setTotalQuestions(totalQuestions + 1);

      if (gameMode === 'treasure-hunt') {
        const newKeys = keysCollected + 1;
        setKeysCollected(newKeys);
        const target = getTargetKeys(treasureLevel);
        
        setTimeout(() => {
          if (newKeys >= target) {
            setIsChestReady(true);
          } else {
            loadNextQuestion();
          }
        }, 1500);
      } else if (gameMode === 'robot-builder') {
        const newParts = robotPartsCollected + 1;
        setRobotPartsCollected(newParts);
        const target = 4; // 4 parts to collect
        
        setTimeout(() => {
          if (newParts >= target) {
            setIsRobotReady(true);
          } else {
            loadNextQuestion();
          }
        }, 1500);
      } else if (gameMode === 'city-builder') {
        const newBuildings = buildingsCollected + 1;
        setBuildingsCollected(newBuildings);
        const target = 10; // 10 buildings to collect
        
        setTimeout(() => {
          setShowBuildingAnimation(true);
          setShowResult(false);
        }, 1500);
      } else if (gameMode === 'math-detective') {
        const newClues = cluesCollected + 1;
        setCluesCollected(newClues);
        const target = 5; // 5 clues to find
        
        setTimeout(() => {
          setShowClueAnimation(true);
          setShowResult(false);
        }, 1500);
      } else if (gameMode === 'space-mission') {
        const newPlanets = planetsCollected + 1;
        setPlanetsCollected(newPlanets);
        const target = 8; // 8 planets to collect
        
        setTimeout(() => {
          setShowPlanetAnimation(true);
          setShowResult(false);
        }, 1500);
      } else {
        // Move to next question after 1.5 seconds
        setTimeout(() => {
          if (totalQuestions + 1 >= 100) {
            setGameOver(true);
          } else {
            loadNextQuestion();
          }
        }, 1500);
      }
    } else {
      if (enableSound) playSound('wrong');
      setMistakes(mistakes + 1);
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
    setTreasureLevel(1);
    setKeysCollected(0);
    setIsChestReady(false);
    setChestOpened(false);
    setRobotPartsCollected(0);
    setIsRobotReady(false);
    setRobotActivated(false);
    setBuildingsCollected(0);
    setIsCityReady(false);
    setCityActivated(false);
    setShowBuildingAnimation(false);
    setCluesCollected(0);
    setShowClueAnimation(false);
    setIsCaseSolved(false);
    setCaseActivated(false);
    setMysteryGift(null);
    setGiftOpened(false);
    setPlanetsCollected(0);
    setShowPlanetAnimation(false);
    setIsGalaxyReady(false);
    setGalaxyActivated(false);
    loadNextQuestion(1);
  };

  const handleNextTreasureLevel = () => {
    if (treasureLevel < 3) {
      const nextLvl = treasureLevel + 1;
      setTreasureLevel(nextLvl);
      setKeysCollected(0);
      setIsChestReady(false);
      setChestOpened(false);
      setRewardsEarned(prev => prev + 50); // Bonus level
      setSpecialRewardsEarned(prev => prev + 5);
      loadNextQuestion(nextLvl);
    } else {
      setRewardsEarned(prev => prev + 100); // Bonus akhir
      setSpecialRewardsEarned(prev => prev + 10);
      setGameOver(true);
      setIsChestReady(false);
    }
  };

  if (!currentQuestion && !gameOver) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className={`relative min-h-screen bg-gradient-to-b ${backgroundColor} pt-4 pb-8 overflow-hidden font-poppins`}>
      {/* Animated Background */}
      {classNumber === 2 ? <SkyBalloonAdventureBackground /> : classNumber === 3 ? <RobotFactoryBackground /> : classNumber === 4 ? <CityAdventureBackground isCityReady={cityActivated || gameOver} /> : classNumber === 5 ? <DetectiveBackground /> : classNumber === 6 ? <SpaceAdventureBackground isGalaxyReady={galaxyActivated || gameOver} planetsCollected={planetsCollected} /> : <MagicalLearningGardenBackground />}

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
            isChestReady || isRobotReady || isCityReady || showBuildingAnimation || isCaseSolved || showClueAnimation || showPlanetAnimation || isGalaxyReady ? (
              <motion.div
                key={isChestReady ? "chest" : isRobotReady ? "robot" : showBuildingAnimation ? "building-anim" : isCityReady ? "city" : showClueAnimation ? "clue-anim" : isCaseSolved ? "case" : showPlanetAnimation ? "planet-anim" : "galaxy"}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className={`bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border-8 ${isRobotReady ? 'border-indigo-300' : (isCityReady || showBuildingAnimation) ? 'border-emerald-300' : (isCaseSolved || showClueAnimation) ? 'border-slate-400' : (showPlanetAnimation || isGalaxyReady) ? 'border-purple-400' : 'border-amber-300'} p-8 md:p-12 text-center max-w-2xl mx-auto relative overflow-hidden pointer-events-auto mt-8`}
              >
                {isChestReady && (
                  !chestOpened ? (
                  <>
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-8xl mb-6"
                    >
                      🔒📦
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
                      Kunci Terkumpul Penuh!
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 font-medium">
                      Kamu berhasil mengumpulkan {keysCollected} kunci. Saatnya membuka harta karun!
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        if (enableSound) playSound('correct');
                        setChestOpened(true);
                      }}
                      className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 border-none shadow-xl text-white text-2xl px-8 py-4 w-full md:w-auto transform hover:scale-105 transition-all"
                    >
                      🔓 Buka Peti Harta Karun
                    </Button>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", bounce: 0.5, duration: 1 }}
                      className="text-8xl mb-6 relative"
                    >
                      <div className="absolute inset-0 bg-yellow-300 blur-3xl opacity-50 rounded-full animate-pulse"></div>
                      <span className="relative z-10">📦✨</span>
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: -20, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="absolute top-[-40px] left-1/2 -translate-x-1/2 text-6xl whitespace-nowrap z-20"
                      >
                        {treasureLevel === 1 ? '🏅 ⭐ 💎' : treasureLevel === 2 ? '👑 🦜 🪙' : '🏴 💎 🏆'}
                      </motion.div>
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-black text-amber-600 mb-4 drop-shadow-sm mt-8">
                      Luar Biasa!
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 font-medium">
                      {treasureLevel === 1 
                        ? 'Kamu mendapatkan Badge Bajak Laut Pintar, Bintang, dan Permata!' 
                        : treasureLevel === 2 
                        ? 'Kamu mendapatkan Mahkota Petualang, Burung Beo, dan Koin Emas!' 
                        : 'Kamu mendapatkan Bendera Bajak Laut, Permata Legendaris, dan Piala!'}
                    </p>
                    <Button
                      variant="success"
                      size="lg"
                      onClick={handleNextTreasureLevel}
                      className="text-xl px-8 py-4 w-full md:w-auto shadow-lg transform hover:scale-105 transition-all"
                    >
                      {treasureLevel < 3 ? '🗺️ Lanjut ke Level ' + (treasureLevel + 1) : '🏆 Selesaikan Petualangan!'}
                    </Button>
                  </>
                  )
                )}

                {isRobotReady && (
                  !robotActivated ? (
                    <>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                        className="text-8xl mb-6"
                      >
                        ⚙️🔧
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
                        Komponen Lengkap!
                      </h2>
                      <p className="text-xl text-gray-600 mb-8 font-medium">
                        Kamu berhasil mengumpulkan semua bagian. Saatnya mengaktifkan robot!
                      </p>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => {
                          if (enableSound) playSound('correct');
                          setRobotActivated(true);
                        }}
                        className="bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 border-none shadow-xl text-white text-2xl px-8 py-4 w-full md:w-auto transform hover:scale-105 transition-all"
                      >
                        ⚡ Aktifkan Robot
                      </Button>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ scale: 0, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: "spring", bounce: 0.5, duration: 1 }}
                        className="relative z-10 flex flex-col items-center justify-center mb-8"
                      >
                        <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-50 rounded-full animate-pulse"></div>
                        <motion.div
                          animate={{ y: [-5, 5, -5] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="relative z-10"
                        >
                          <div className="text-7xl md:text-8xl text-center z-30 relative drop-shadow-lg bottom-2 md:bottom-4">🤖</div>
                          <div className="flex text-7xl md:text-8xl justify-center items-center -mt-2 md:-mt-4 z-20 relative drop-shadow-lg">
                            <motion.div animate={{ rotate: [0, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="origin-bottom-right text-6xl md:text-7xl -mr-8 md:-mr-10 z-10 relative bottom-4 md:bottom-6">🦾</motion.div>
                            <div className="z-20 relative">🎛️</div>
                            <motion.div animate={{ rotate: [0, 15, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="origin-bottom-left text-6xl md:text-7xl -ml-8 md:-ml-10 z-10 relative bottom-4 md:bottom-6">
                              <div className="transform -scale-x-100">🦾</div>
                            </motion.div>
                          </div>
                          <div className="flex text-7xl md:text-8xl justify-center gap-2 -mt-4 md:-mt-6 z-10 relative drop-shadow-lg">
                            <div className="transform -scale-x-100">🦿</div>
                            <div>🦿</div>
                          </div>
                        </motion.div>
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-black text-indigo-600 mb-4 drop-shadow-sm mt-2 md:mt-8">
                        Robot Aktif!
                      </h2>
                      <p className="text-xl text-gray-600 mb-8 font-medium">
                        Bagus sekali! Robot siap membantumu di petualangan matematika selanjutnya.
                      </p>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => {
                          setRewardsEarned(prev => prev + 100);
                          setSpecialRewardsEarned(prev => prev + 10);
                          setGameOver(true);
                          setIsRobotReady(false);
                        }}
                        className="text-xl px-8 py-4 w-full md:w-auto shadow-lg transform hover:scale-105 transition-all"
                      >
                        🏆 Selesaikan Misi!
                      </Button>
                    </>
                  )
                )}

                {showBuildingAnimation && (
                  <>
                    <p className="text-xl md:text-2xl font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Pembangunan Selesai!
                    </p>
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-[8rem] md:text-[10rem] my-8 flex justify-center"
                    >
                      <div className="relative">
                        <motion.div 
                          animate={{ rotate: [-20, 20, -20] }} 
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="absolute -top-4 -right-12 text-6xl z-20 origin-bottom-left"
                        >
                          🔨
                        </motion.div>
                        <motion.div
                          initial={{ y: 100, scale: 0.2, opacity: 0 }}
                          animate={{ y: 0, scale: 1, opacity: 1 }}
                          transition={{ duration: 1.2, type: "spring", bounce: 0.6 }}
                          className="z-10 relative drop-shadow-2xl"
                        >
                          {['🏠', <LibraryIcon key="lib" />, '🏪', '🏫', '🏥', '🏦', '🏭', '🏨', '🏟️', '🏙️'][buildingsCollected - 1]}
                        </motion.div>
                      </div>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-emerald-600 mb-8 uppercase drop-shadow-sm tracking-wider">
                      {['RUMAH', 'PERPUSTAKAAN', 'TOKO', 'SEKOLAH', 'RUMAH SAKIT', 'BANK', 'PABRIK', 'HOTEL', 'STADION', 'GEDUNG PENCAKAR LANGIT'][buildingsCollected - 1] || 'BANGUNAN'}
                    </h2>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        setShowBuildingAnimation(false);
                        if (buildingsCollected >= 10) {
                          setIsCityReady(true);
                        } else {
                          loadNextQuestion();
                        }
                      }}
                      className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 border-none shadow-xl text-white text-2xl px-8 py-4 w-full md:w-auto transform hover:scale-105 transition-all"
                    >
                      🚧 Lanjutkan Misi
                    </Button>
                  </>
                )}

                {isCityReady && (
                  !cityActivated ? (
                    <>
                      <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-8xl mb-6"
                      >
                        🏗️🏘️
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
                        Pembangunan Selesai!
                      </h2>
                      <p className="text-xl text-gray-600 mb-8 font-medium">
                        Kamu berhasil menjawab {score} soal! Saatnya meresmikan Kota Matematika!
                      </p>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => {
                          if (enableSound) playSound('correct');
                          setCityActivated(true);
                        }}
                        className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 border-none shadow-xl text-white text-2xl px-8 py-4 w-full md:w-auto transform hover:scale-105 transition-all"
                      >
                        🎉 Resmikan Kota
                      </Button>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ scale: 0, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: "spring", bounce: 0.5, duration: 1 }}
                        className="relative z-10 flex flex-col items-center justify-center mb-8"
                      >
                        <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-50 rounded-full animate-pulse"></div>
                        <motion.div
                          animate={{ y: [-5, 5, -5] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="relative z-10 flex text-6xl md:text-7xl justify-center items-end gap-1 drop-shadow-lg"
                        >
                          <div className="transform scale-90">🏦</div>
                          <div className="transform scale-110 pb-4">🏙️</div>
                          <div className="transform scale-100">🏫</div>
                        </motion.div>
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-black text-emerald-600 mb-4 drop-shadow-sm mt-2 md:mt-8">
                        Kota Berkembang!
                      </h2>
                      <p className="text-xl text-gray-600 mb-8 font-medium">
                        Luar biasa! Kotamu sudah ramai dengan bangunan berkat jawaban benarmu!
                      </p>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => {
                          setRewardsEarned(prev => prev + 100);
                          setSpecialRewardsEarned(prev => prev + 10);
                          setGameOver(true);
                          setIsCityReady(false);
                        }}
                        className="text-xl px-8 py-4 w-full md:w-auto shadow-lg transform hover:scale-105 transition-all"
                      >
                        🏆 Selesaikan Misi!
                      </Button>
                    </>
                  )
                )}

                {showClueAnimation && (
                  <>
                    <p className="text-xl md:text-2xl font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Petunjuk Ditemukan!
                    </p>
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-[8rem] md:text-[10rem] my-8 flex justify-center"
                    >
                      <div className="relative">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", bounce: 0.6, duration: 1 }}
                          className="z-10 relative drop-shadow-2xl"
                        >
                          {['📜', '🔑', '👣', '💼', '🔍'][cluesCollected - 1] || '🧩'}
                        </motion.div>
                      </div>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-600 mb-8 uppercase drop-shadow-sm tracking-wider">
                      {['SURAT MISTERIUS', 'KUNCI EMAS', 'JEJAK SEPATU', 'KOPER RAHASIA', 'KACA PEMBESAR'][cluesCollected - 1] || 'PETUNJUK'}
                    </h2>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        setShowClueAnimation(false);
                        if (cluesCollected >= 5) {
                          setIsCaseSolved(true);
                        } else {
                          loadNextQuestion();
                        }
                      }}
                      className="bg-gradient-to-r from-slate-500 to-gray-700 hover:from-slate-600 hover:to-gray-800 border-none shadow-xl text-white text-2xl px-8 py-4 w-full md:w-auto transform hover:scale-105 transition-all"
                    >
                      🕵️ Lanjutkan Investigasi
                    </Button>
                  </>
                )}

                {isCaseSolved && (
                  !caseActivated ? (
                    <>
                      <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-8xl mb-6"
                      >
                        🕵️‍♂️✨
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
                        Kasus Terpecahkan!
                      </h2>
                      <p className="text-xl text-gray-600 mb-8 font-medium">
                        Kamu berhasil mengumpulkan semua petunjuk dan memecahkan misteri ini!
                      </p>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => {
                          if (enableSound) playSound('correct');
                          setCaseActivated(true);
                        }}
                        className="bg-gradient-to-r from-slate-600 to-gray-800 hover:from-slate-700 hover:to-gray-900 border-none shadow-xl text-white text-2xl px-8 py-4 w-full md:w-auto transform hover:scale-105 transition-all"
                      >
                        🎉 Ungkap Kebenaran
                      </Button>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ scale: 0, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: "spring", bounce: 0.5, duration: 1 }}
                        className="relative z-10 flex flex-col items-center justify-center mb-8"
                      >
                        <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-50 rounded-full animate-pulse"></div>
                        <motion.div
                          animate={{ y: [-5, 5, -5] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="relative z-10 flex text-6xl md:text-7xl justify-center items-end gap-2 drop-shadow-lg"
                        >
                          <div className="transform scale-110">🏆</div>
                          <div className="transform scale-125 mb-4">🕵️‍♀️</div>
                        </motion.div>
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-black text-slate-700 mb-4 drop-shadow-sm mt-2 md:mt-8">
                        Detektif Hebat!
                      </h2>
                      <p className="text-xl text-gray-600 mb-8 font-medium">
                        Keahlian matematikamu berhasil mengungkap kebenaran. Luar biasa!
                      </p>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => {
                          setRewardsEarned(prev => prev + 100);
                          setSpecialRewardsEarned(prev => prev + 10);
                          const randomGift = MYSTERY_GIFTS[Math.floor(Math.random() * MYSTERY_GIFTS.length)];
                          setMysteryGift(randomGift);
                          setGameOver(true);
                          setIsCaseSolved(false);
                        }}
                        className="text-xl px-8 py-4 w-full md:w-auto shadow-lg transform hover:scale-105 transition-all"
                      >
                        🏆 Selesaikan Misi!
                      </Button>
                    </>
                  )
                )}

                {showPlanetAnimation && (
                  <>
                    <p className="text-xl md:text-2xl font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Planet Ditemukan!
                    </p>
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="text-[8rem] md:text-[10rem] my-8 flex justify-center"
                    >
                      <div className="relative">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", bounce: 0.6, duration: 1.5 }}
                          className="z-10 relative drop-shadow-2xl"
                        >
                          {['🌑', '🌕', '🌍', '🔴', '🟠', '🪐', '🧊', '🔵'][planetsCollected - 1] || '🪐'}
                        </motion.div>
                      </div>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-indigo-600 mb-8 uppercase drop-shadow-sm tracking-wider">
                      {['MERKURIUS', 'VENUS', 'BUMI', 'MARS', 'YUPITER', 'SATURNUS', 'URANUS', 'NEPTUNUS'][planetsCollected - 1] || 'PLANET'}
                    </h2>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        setShowPlanetAnimation(false);
                        if (planetsCollected >= 8) {
                          setIsGalaxyReady(true);
                        } else {
                          loadNextQuestion();
                        }
                      }}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-none shadow-xl text-white text-2xl px-8 py-4 w-full md:w-auto transform hover:scale-105 transition-all"
                    >
                      🚀 Lanjutkan Eksplorasi
                    </Button>
                  </>
                )}

                {isGalaxyReady && (
                  !galaxyActivated ? (
                    <>
                      <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-8xl mb-6"
                      >
                        🌌🚀
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
                        Tata Surya Terkumpul!
                      </h2>
                      <p className="text-xl text-gray-600 mb-8 font-medium">
                        Kamu berhasil menemukan seluruh planet di tata surya ini!
                      </p>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => {
                          if (enableSound) playSound('correct');
                          setGalaxyActivated(true);
                        }}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-none shadow-xl text-white text-2xl px-8 py-4 w-full md:w-auto transform hover:scale-105 transition-all"
                      >
                        🎉 Jelajahi Galaksi
                      </Button>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ scale: 0, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: "spring", bounce: 0.5, duration: 1 }}
                        className="relative z-10 flex flex-col items-center justify-center mb-8"
                      >
                        <div className="absolute inset-0 bg-indigo-400 blur-3xl opacity-50 rounded-full animate-pulse"></div>
                        <motion.div
                          animate={{ y: [-5, 5, -5] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="relative z-10 flex text-6xl md:text-7xl justify-center items-end gap-2 drop-shadow-lg"
                        >
                          <div className="transform scale-90">🚀</div>
                          <div className="transform scale-110 pb-4">🌍</div>
                          <div className="transform scale-100">🪐</div>
                        </motion.div>
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-black text-indigo-600 mb-4 drop-shadow-sm mt-2 md:mt-8">
                        Astronot Hebat!
                      </h2>
                      <p className="text-xl text-gray-600 mb-8 font-medium">
                        Luar biasa! Pengetahuan matematikamu membawamu menjelajahi tata surya!
                      </p>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => {
                          setRewardsEarned(prev => prev + 100);
                          setSpecialRewardsEarned(prev => prev + 10);
                          setGameOver(true);
                          setIsGalaxyReady(false);
                        }}
                        className="text-xl px-8 py-4 w-full md:w-auto shadow-lg transform hover:scale-105 transition-all"
                      >
                        🏆 Selesaikan Misi!
                      </Button>
                    </>
                  )
                )}
              </motion.div>
            ) : (
              <motion.div
                key="game"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Status UI untuk Treasure Hunt */}
                {gameMode === 'treasure-hunt' && (
                  <div className="max-w-4xl mx-auto mb-6 bg-white/80 backdrop-blur-md rounded-3xl p-4 shadow-sm border-4 border-white flex flex-col md:flex-row justify-between items-center gap-4 pointer-events-auto">
                    <div className="flex items-center gap-4">
                      <div className="bg-amber-100 p-3 rounded-2xl">
                        <span className="text-3xl">🗝️</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Kunci Terkumpul</p>
                        <p className="text-2xl font-black text-amber-500">{keysCollected} <span className="text-lg text-gray-400">/ {getTargetKeys(treasureLevel)}</span></p>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center">
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Peta Petualangan Level {treasureLevel}</p>
                      <div className="text-lg md:text-xl tracking-widest bg-blue-50 px-4 py-2 rounded-xl shadow-inner border border-blue-100 whitespace-nowrap overflow-hidden text-center w-full max-w-[280px] md:max-w-full">
                        🗺️ {Array.from({length: getTargetKeys(treasureLevel)}).map((_, i) => i < keysCollected ? '🏝️' : '⬛').join('')}
                      </div>
                    </div>
  
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Peti Harta</p>
                        <p className="text-lg font-bold text-gray-700">{keysCollected >= getTargetKeys(treasureLevel) ? 'Siap Dibuka!' : 'Terkunci'}</p>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-2xl">
                      <span className="text-3xl">{keysCollected >= getTargetKeys(treasureLevel) ? '🔓' : '🔒📦'}</span>
                      </div>
                    </div>
                  </div>
                )}
  
                {/* Status UI untuk Robot Builder */}
                {gameMode === 'robot-builder' && (
                  <div className="max-w-4xl mx-auto mb-6 bg-white/80 backdrop-blur-md rounded-3xl p-4 shadow-sm border-4 border-white flex flex-col md:flex-row justify-between items-center gap-4 pointer-events-auto">
                    <div className="flex items-center gap-4">
                      <div className="bg-indigo-100 p-3 rounded-2xl">
                        <span className="text-3xl">🤖</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Komponen Terkumpul</p>
                        <p className="text-2xl font-black text-indigo-500">{robotPartsCollected} <span className="text-lg text-gray-400">/ 4</span></p>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center">
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Progress Perakitan</p>
                      <div className="text-lg md:text-xl tracking-widest bg-blue-50 px-4 py-2 rounded-xl shadow-inner border border-blue-100 flex gap-2">
                        <span className={robotPartsCollected > 0 ? "opacity-100" : "opacity-30 grayscale"}>🦿</span>
                        <span className={robotPartsCollected > 1 ? "opacity-100" : "opacity-30 grayscale"}>🎛️</span>
                        <span className={robotPartsCollected > 2 ? "opacity-100" : "opacity-30 grayscale"}>🦾</span>
                        <span className={robotPartsCollected > 3 ? "opacity-100" : "opacity-30 grayscale"}>🤖</span>
                      </div>
                    </div>
  
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Status Robot</p>
                        <p className="text-lg font-bold text-gray-700">{robotPartsCollected >= 4 ? 'Siap Aktif!' : 'Merakit...'}</p>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-2xl">
                        <span className="text-3xl">{robotPartsCollected >= 4 ? '⚡' : '🔧'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Status UI untuk Math Detective */}
                {gameMode === 'math-detective' && (
                  <div className="max-w-4xl mx-auto mb-6 bg-white/80 backdrop-blur-md rounded-3xl p-4 shadow-sm border-4 border-white flex flex-col md:flex-row justify-between items-center gap-4 pointer-events-auto">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-200 p-3 rounded-2xl">
                        <span className="text-3xl">🔍</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Petunjuk</p>
                        <p className="text-2xl font-black text-slate-600">{cluesCollected} <span className="text-lg text-gray-400">/ 5</span></p>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center px-4 w-full">
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Penyelidikan</p>
                      <div className="w-full bg-slate-200/50 rounded-full h-4 shadow-inner overflow-hidden border border-slate-300">
                        <div className="bg-gradient-to-r from-slate-400 to-slate-600 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${(cluesCollected / 5) * 100}%` }}></div>
                      </div>
                    </div>
  
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Status Kasus</p>
                        <p className="text-lg font-bold text-gray-700">{cluesCollected >= 5 ? 'Terpecahkan!' : 'Menyelidiki...'}</p>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-2xl">
                        <span className="text-3xl">{cluesCollected >= 5 ? '✨' : '🕵️'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Status UI untuk City Builder */}
                {gameMode === 'city-builder' && (
                  <div className="max-w-4xl mx-auto mb-6 bg-white/80 backdrop-blur-md rounded-3xl p-4 shadow-sm border-4 border-white flex flex-col md:flex-row justify-between items-center gap-4 pointer-events-auto">
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-100 p-3 rounded-2xl">
                        <span className="text-3xl">🏘️</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Bangunan</p>
                        <p className="text-2xl font-black text-emerald-500">{buildingsCollected} <span className="text-lg text-gray-400">/ 10</span></p>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center px-4 w-full">
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Pekerjaan</p>
                      <div className="w-full bg-emerald-100/50 rounded-full h-4 shadow-inner overflow-hidden border border-emerald-200">
                        <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${(buildingsCollected / 10) * 100}%` }}></div>
                      </div>
                    </div>
  
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Status Kota</p>
                        <p className="text-lg font-bold text-gray-700">{buildingsCollected >= 10 ? 'Selesai!' : 'Membangun...'}</p>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-2xl">
                        <span className="text-3xl">{buildingsCollected >= 10 ? '🎉' : '🏘️'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Status UI untuk Space Mission */}
                {gameMode === 'space-mission' && (
                  <div className="max-w-4xl mx-auto mb-6 bg-white/80 backdrop-blur-md rounded-3xl p-4 shadow-sm border-4 border-white flex flex-col md:flex-row justify-between items-center gap-4 pointer-events-auto">
                    <div className="flex items-center gap-4">
                      <div className="bg-indigo-100 p-3 rounded-2xl">
                        <span className="text-3xl">🪐</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Planet</p>
                        <p className="text-2xl font-black text-indigo-600">{planetsCollected} <span className="text-lg text-gray-400">/ 8</span></p>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center px-4 w-full">
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Eksplorasi Galaksi</p>
                      <div className="w-full bg-indigo-100/50 rounded-full h-4 shadow-inner overflow-hidden border border-indigo-200">
                        <div className="bg-gradient-to-r from-indigo-400 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${(planetsCollected / 8) * 100}%` }}></div>
                      </div>
                    </div>
  
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Status Misi</p>
                        <p className="text-lg font-bold text-gray-700">{planetsCollected >= 8 ? 'Selesai!' : 'Menjelajah...'}</p>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-2xl">
                        <span className="text-3xl">{planetsCollected >= 8 ? '✨' : '🚀'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Question Card */}
                <motion.div
                  className={`pb-4 md:pb-8 px-4 md:px-8 text-center relative ${gameMode === 'treasure-hunt' ? 'mt-0 pt-2' : 'pt-4 md:pt-6'}`}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                >
                  <div className="relative z-10">
                    <div className="flex justify-center mb-4 md:mb-6">
                      <motion.div
                        className="bg-gradient-to-b from-white to-sky-100 backdrop-blur-md rounded-2xl md:rounded-[1.5rem] shadow-[0_6px_0_#93C5FD,0_10px_15px_rgba(0,0,0,0.1)] border-4 border-white p-4 md:p-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-sky-600 flex items-center justify-center w-full max-w-4xl"
                        initial={{ scale: 0, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ duration: 0.4, type: "spring", bounce: 0.5 }}
                      >
                        {currentQuestion ? renderMathText(currentQuestion.question) : null}
                      </motion.div>
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
                    <div className="flex flex-row flex-wrap justify-center gap-3 md:gap-4 mx-auto pointer-events-auto w-full max-w-5xl">
                      {currentQuestion?.options.map((option, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => handleAnswerClick(option)}
                          disabled={showResult}
                          className={`
                            flex-1 min-w-[140px] p-2 md:p-4 rounded-2xl md:rounded-[2rem] text-xl md:text-2xl font-black transition-all duration-300
                            ${
                              selectedAnswer === option
                                ? isCorrect
                                  ? 'bg-gradient-to-b from-[#86EFAC] to-[#10B981] text-white shadow-[0_8px_0_#059669] scale-105 border-4 border-white -translate-y-1'
                                  : 'bg-gradient-to-b from-[#FDA4AF] to-[#F43F5E] text-white shadow-[0_8px_0_#E11D48] scale-105 border-4 border-white -translate-y-1'
                                  : 'bg-gradient-to-b from-white to-sky-50 text-sky-500 hover:from-sky-50 hover:to-indigo-50 hover:text-indigo-600 border-4 border-white shadow-[0_8px_0_#BAE6FD] hover:shadow-[0_8px_0_#93C5FD] active:translate-y-2 active:shadow-none'
                            }
                            ${showResult ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                          `}
                          whileHover={!showResult ? { scale: 1.05 } : {}}
                          whileTap={!showResult ? { scale: 0.95 } : {}}
                        >
                          {renderMathText(option)}
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
                      {rewards.coinIcon && <span>{rewards.coinIcon}</span>}
                      {rewards.mapIcon && <span>{rewards.mapIcon}</span>}
                      {gameMode === 'robot-builder' && <span>{['🦿', '🎛️', '🦾', '🤖'][robotPartsCollected - 1] || '🤖'}</span>}
                      {gameMode === 'city-builder' && <span>{['🏠', <LibraryIcon key="lib" />, '🏪', '🏫', '🏥', '🏦', '🏭', '🏨', '🏟️', '🏙️'][buildingsCollected - 1] || '🏗️'}</span>}
                      {gameMode === 'math-detective' && <span>{['📜', '🔑', '👣', '💼', '🔍'][cluesCollected - 1] || '🕵️'}</span>}
                      {gameMode === 'space-mission' && <span>{['🌑', '🌕', '🌍', '🔴', '🟠', '🪐', '🧊', '🔵'][planetsCollected - 1] || '🚀'}</span>}
                    </motion.div>
                    <p className="text-sky-600 text-xl md:text-2xl font-bold drop-shadow-sm">
                      {gameMode === 'treasure-hunt' && 'Hebat! Kamu menemukan satu kunci! 🗝️'}
                      {gameMode === 'robot-builder' && <>Hebat! Kamu mendapatkan {['🦿 Kaki Robot', '🎛️ Badan Robot', '🦾 Tangan Robot', '🤖 Kepala Robot'][robotPartsCollected - 1] || 'Komponen'}!</>}
                      {gameMode === 'city-builder' && <>Hebat! Kamu akan membangun {['🏠 Rumah', '🏛️ Perpustakaan', '🏪 Toko', '🏫 Sekolah', '🏥 Rumah Sakit', '🏦 Bank', '🏭 Pabrik', '🏨 Hotel', '🏟️ Stadion', '🏙️ Gedung Pencakar Langit'][buildingsCollected - 1] || 'Bangunan'}!</>}
                      {gameMode === 'math-detective' && <>Hebat! Kamu menemukan petunjuk {['📜 Surat Misterius', '🔑 Kunci Emas', '👣 Jejak Sepatu', '💼 Koper Rahasia', '🔍 Kaca Pembesar'][cluesCollected - 1] || 'Baru'}!</>}
                      {gameMode === 'space-mission' && <>Hebat! Kamu menemukan planet {['🌑 Merkurius', '🌕 Venus', '🌍 Bumi', '🔴 Mars', '🟠 Yupiter', '🪐 Saturnus', '🧊 Uranus', '🔵 Neptunus'][planetsCollected - 1] || 'Baru'}!</>}
                      {!['treasure-hunt', 'robot-builder', 'city-builder', 'math-detective', 'space-mission'].includes(gameMode) && 'Jawaban Benar!'}
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
                      {gameMode === 'treasure-hunt'
                        ? '💡 Petunjuk: Ups! Kuncinya belum ditemukan. Ayo coba lagi!'
                        : gameMode === 'balloon-pop' 
                        ? '💡 Petunjuk: Hitung perlahan dan pecahkan balon dengan tepat ya!' 
                        : gameMode === 'robot-builder'
                        ? '💡 Petunjuk: Ayo coba lagi agar bisa merakit robot!'
                        : gameMode === 'city-builder'
                        ? '💡 Petunjuk: Ayo coba lagi agar bangunan kotamu bisa didirikan!'
                        : gameMode === 'math-detective'
                        ? '💡 Petunjuk: Detektif, periksa lagi perhitunganmu dengan teliti!'
                        : gameMode === 'space-mission'
                        ? '💡 Petunjuk: Astronot, periksa lagi perhitunganmu dengan teliti!'
                        : '💡 Petunjuk: Hitung pelan-pelan ya.'}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_15px_40px_rgba(255,182,193,0.3)] border-8 border-white/70 p-12 text-center max-w-2xl mx-auto relative overflow-hidden pointer-events-auto"
            >
              {gameMode === 'math-detective' && mysteryGift && !giftOpened ? (
                <>
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-10 left-10 text-4xl z-0">🎉</motion.div>
                  <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-20 right-10 text-5xl z-0">✨</motion.div>
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute bottom-20 left-20 text-5xl z-0">✨</motion.div>
                  <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 3.5, repeat: Infinity }} className="absolute bottom-10 right-20 text-4xl z-0">🎉</motion.div>

                  <motion.div
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-8xl md:text-9xl mb-6 relative inline-block z-10"
                  >
                    <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-50 rounded-full animate-pulse"></div>
                    <span className="relative z-10 drop-shadow-2xl">🎁</span>
                  </motion.div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 drop-shadow-sm mt-4 relative z-10">
                    🎉 Selamat!
                  </h2>
                  <p className="text-xl text-gray-600 mb-8 font-medium relative z-10">
                    Kamu berhasil menyelesaikan seluruh misi detektif.<br/><br/>
                    Sebagai hadiah, kamu mendapatkan Hadiah Misterius!
                  </p>
                  
                  <div className="relative z-10">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        if (enableSound) playSound('correct');
                        setGiftOpened(true);
                      }}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 border-none shadow-xl text-white text-2xl px-8 py-4 w-full md:w-auto transform hover:scale-105 transition-all"
                    >
                      🎁 Buka Hadiah
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <motion.div
                    animate={gameMode === 'treasure-hunt' || gameMode === 'robot-builder' || gameMode === 'city-builder' || gameMode === 'math-detective' || gameMode === 'space-mission' ? { y: [-10, 10, -10] } : { rotate: 360 }}
                    transition={gameMode === 'treasure-hunt' || gameMode === 'robot-builder' || gameMode === 'city-builder' || gameMode === 'math-detective' || gameMode === 'space-mission' ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : { duration: 2, repeat: Infinity }}
                    className="text-8xl mt-8 mb-12 inline-block relative"
                  >
                {gameMode === 'treasure-hunt' ? (
                  <>
                    <div className="absolute inset-0 bg-yellow-300 blur-3xl opacity-50 rounded-full animate-pulse"></div>
                    <span className="relative z-10 drop-shadow-xl">📦✨</span>
                    <motion.div
                      initial={{ y: 30, opacity: 0, scale: 0.5 }}
                      animate={{ y: -60, opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.6 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl md:text-6xl whitespace-nowrap z-20 flex gap-2 drop-shadow-lg"
                    >
                      <motion.span animate={{ y: [-10, 10, -10], rotate: [-10, 10, -10] }} transition={{ duration: 2.5, repeat: Infinity }}>💎</motion.span>
                      <motion.span animate={{ y: [5, -15, 5], scale: [1, 1.1, 1] }} transition={{ duration: 2.2, repeat: Infinity }}>👑</motion.span>
                      <motion.span animate={{ y: [-15, 5, -15], rotate: [10, -10, 10] }} transition={{ duration: 2.8, repeat: Infinity }}>🪙</motion.span>
                      <motion.span animate={{ y: [10, -10, 10], scale: [1, 1.2, 1] }} transition={{ duration: 2.4, repeat: Infinity }}>🏆</motion.span>
                    </motion.div>
                  </>
                ) : gameMode === 'robot-builder' ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-50 rounded-full animate-pulse"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="text-7xl md:text-8xl text-center z-30 relative drop-shadow-lg bottom-2 md:bottom-4">🤖</div>
                      <div className="flex text-7xl md:text-8xl justify-center items-center -mt-2 md:-mt-4 z-20 relative drop-shadow-lg">
                        <motion.div animate={{ rotate: [0, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="origin-bottom-right text-6xl md:text-7xl -mr-8 md:-mr-10 z-10 relative bottom-4 md:bottom-6">🦾</motion.div>
                        <div className="z-20 relative">🎛️</div>
                        <motion.div animate={{ rotate: [0, 15, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="origin-bottom-left text-6xl md:text-7xl -ml-8 md:-ml-10 z-10 relative bottom-4 md:bottom-6">
                          <div className="transform -scale-x-100">🦾</div>
                        </motion.div>
                      </div>
                      <div className="flex text-7xl md:text-8xl justify-center gap-2 -mt-4 md:-mt-6 z-10 relative drop-shadow-lg">
                        <div className="transform -scale-x-100">🦿</div>
                        <div>🦿</div>
                      </div>
                    </div>
                  </div>
                ) : gameMode === 'city-builder' ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-50 rounded-full animate-pulse"></div>
                    <div className="relative z-10 flex text-7xl md:text-8xl justify-center items-end gap-2 drop-shadow-lg">
                      <div className="transform scale-90">🏠</div>
                      <div className="transform scale-110 pb-4">🏙️</div>
                      <div className="transform scale-100">🏫</div>
                    </div>
                  </div>
                ) : gameMode === 'math-detective' && mysteryGift && giftOpened ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-50 rounded-full animate-pulse"></div>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", bounce: 0.6, duration: 1 }}
                      className="relative z-10 flex justify-center items-center drop-shadow-2xl text-[8rem] md:text-[10rem]"
                    >
                      {mysteryGift.emoji}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, y: [-10, 10, -10] }}
                      transition={{ opacity: { delay: 0.5, duration: 1 }, y: { duration: 3, repeat: Infinity } }}
                      className="absolute -top-10 -right-10 text-6xl"
                    >
                      ✨
                    </motion.div>
                  </div>
                ) : gameMode === 'math-detective' ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-50 rounded-full animate-pulse"></div>
                    <div className="relative z-10 flex text-7xl md:text-8xl justify-center items-end gap-2 drop-shadow-lg">
                      <div className="transform scale-90">🏆</div>
                      <div className="transform scale-110 pb-4">🕵️‍♂️</div>
                    </div>
                  </div>
                ) : gameMode === 'space-mission' ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-400 blur-3xl opacity-50 rounded-full animate-pulse"></div>
                    <div className="relative z-10 flex text-7xl md:text-8xl justify-center items-end gap-2 drop-shadow-lg">
                      <div className="transform scale-90">🏆</div>
                      <div className="transform scale-110 pb-4">👨‍🚀</div>
                    </div>
                  </div>
                ) : '🏆'}
              </motion.div>

              {gameMode === 'math-detective' && mysteryGift && giftOpened ? (
                <>
                  <h3 className="text-4xl md:text-5xl font-black mb-4 text-slate-800 drop-shadow-md">
                    {mysteryGift.title}
                  </h3>
                  <p className="text-lg md:text-xl text-slate-700 font-medium mb-8 bg-slate-100/80 px-6 py-4 rounded-2xl shadow-inner border border-slate-200 inline-block">
                    {mysteryGift.message}
                  </p>
                </>
              ) : (
                <h3 className={`text-4xl font-bold mb-4 ${gameMode === 'robot-builder' || gameMode === 'city-builder' || gameMode === 'math-detective' || gameMode === 'space-mission' ? 'text-white drop-shadow-md' : 'text-gray-800'}`}>
                  {gameMode === 'treasure-hunt' ? 'Semua Harta Karun Ditemukan! 🏴‍☠️' :
                   gameMode === 'robot-builder' ? 'Robot Berhasil Diaktifkan!' : 
                   gameMode === 'city-builder' ? 'Kota Berhasil Dibangun! 🏘️' : 
                   gameMode === 'math-detective' ? 'Kasus Terpecahkan! 🕵️' : 
                   gameMode === 'space-mission' ? 'Misi Luar Angkasa Selesai! 🚀' : 'Permainan Selesai!'}
                </h3>
              )}

              <div className="grid grid-cols-3 gap-4 my-8">
                <div className="bg-white border-2 border-blue-400 rounded-2xl p-4 shadow-sm">
                  <p className="text-blue-600">Benar</p>
                  <p className="text-3xl font-bold text-sky-blue">{score}</p>
                </div>
                <div className="bg-white border-2 border-blue-400 rounded-2xl p-4 shadow-sm">
                  <p className="text-blue-600">Salah</p>
                  <p className="text-3xl font-bold text-sky-blue">
                    {mistakes}
                  </p>
                </div>
                <div className="bg-white border-2 border-blue-400 rounded-2xl p-4 shadow-sm">
                  <p className="text-blue-600">Nilai</p>
                  <p className="text-3xl font-bold text-sky-blue">
                    {calculateScore(score, score + mistakes)}%
                  </p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="primary" size="lg" onClick={handlePlayAgain}>
                  {gameMode === 'math-detective' && giftOpened ? '🔄 Main Lagi' : 'Bermain Lagi'}
                </Button>
              <Button variant="primary" size="lg" href="/">
                  {gameMode === 'math-detective' && giftOpened ? '🏠 Kembali ke Beranda' : 'Kembali Ke Rumah'}
                </Button>
              </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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

    {/* Grass Decorations */}
    <div className="absolute bottom-2 md:bottom-4 w-full flex justify-around px-4 md:px-24 text-2xl md:text-3xl z-10 drop-shadow-sm opacity-90 pointer-events-none">
      <motion.span animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>🌱</motion.span>
      <motion.span animate={{ rotate: [5, -5, 5], y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>🌼</motion.span>
      <motion.span animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>🌱</motion.span>
      <motion.span animate={{ rotate: [5, -5, 5], y: [0, -3, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>🌷</motion.span>
      <motion.span animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>🌱</motion.span>
      <motion.span animate={{ rotate: [5, -5, 5], y: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>🌼</motion.span>
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

    {/* Green Hills Base */}
    <div className="absolute bottom-0 w-full h-[25vh] min-h-[150px] flex justify-center items-end">
      <div className="absolute bottom-0 w-[150%] md:w-[120%] h-[200px] bg-gradient-to-t from-[#86EFAC] to-[#D1FAE5] rounded-[100%] translate-y-1/2 opacity-90 blur-[1px]"></div>
      <div className="absolute bottom-0 w-[120%] md:w-[100%] h-[150px] bg-gradient-to-t from-[#34D399] to-[#6EE7B7] rounded-[100%] translate-y-[35%] shadow-inner"></div>
    </div>

    {/* Grass Decorations */}
    <div className="absolute bottom-2 md:bottom-4 w-full flex justify-around px-4 md:px-24 text-2xl md:text-3xl z-10 drop-shadow-sm opacity-90 pointer-events-none">
      <motion.span animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>🌱</motion.span>
      <motion.span animate={{ rotate: [5, -5, 5], y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>🌼</motion.span>
      <motion.span animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>🌱</motion.span>
      <motion.span animate={{ rotate: [5, -5, 5], y: [0, -3, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>🌷</motion.span>
      <motion.span animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>🌱</motion.span>
      <motion.span animate={{ rotate: [5, -5, 5], y: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>🌼</motion.span>
    </div>
  </div>
);

const RobotFactoryBackground = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-slate-800 via-indigo-900 to-slate-900">
    {/* Factory Elements */}
    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    
    {/* Gears */}
    <div className="absolute top-20 left-10 text-7xl md:text-8xl opacity-40 z-10 drop-shadow-lg pointer-events-none">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>⚙️</motion.div>
    </div>
    <div className="absolute top-40 left-32 text-5xl md:text-6xl opacity-30 z-10 drop-shadow-lg pointer-events-none">
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>⚙️</motion.div>
    </div>
    
    <div className="absolute bottom-40 right-20 text-6xl md:text-7xl opacity-40 z-10 drop-shadow-lg pointer-events-none">
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>🔧</motion.div>
    </div>

    {/* Conveyor Belt Base */}
    <div className="absolute bottom-0 w-full h-[25vh] min-h-[150px] flex justify-center items-end opacity-90">
      <div className="absolute bottom-0 w-[150%] md:w-[120%] h-[200px] bg-gradient-to-t from-slate-900 to-slate-700 rounded-[100%] translate-y-1/2 opacity-90 blur-[1px]"></div>
      <div className="absolute bottom-0 w-[120%] md:w-[100%] h-[150px] bg-gradient-to-t from-slate-800 to-slate-600 rounded-[100%] translate-y-[35%] shadow-inner border-t-8 border-slate-500 border-dashed"></div>
    </div>
  </div>
);

const CityAdventureBackground = ({ isCityReady = false }: { isCityReady?: boolean }) => {
  const buildings = ['🏠', <LibraryIcon key="lib" className="w-[1em] h-[1em] drop-shadow-md" />, '🏪', '🏫', '🏥', '🏦', '🏭', '🏨', '🏟️', '🏙️'];
  
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500">
      {/* Clouds */}
      <motion.div className="absolute top-[10%] text-6xl md:text-8xl opacity-80 drop-shadow-sm" initial={{ x: '-15vw' }} animate={{ x: '115vw' }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>☁️</motion.div>
      <motion.div className="absolute top-[20%] text-7xl md:text-9xl opacity-60 drop-shadow-sm" initial={{ x: '115vw' }} animate={{ x: '-25vw' }} transition={{ duration: 60, repeat: Infinity, ease: 'linear', delay: 2 }}>☁️</motion.div>

      {/* Sun */}
      <div className="absolute top-10 right-10 text-8xl md:text-9xl opacity-90 z-10 drop-shadow-lg pointer-events-none">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }}>☀️</motion.div>
      </div>

      {/* City Base */}
      <div className="absolute bottom-0 w-full h-[30vh] min-h-[150px] flex justify-center items-end opacity-100">
        <div className="absolute bottom-0 w-[150%] md:w-[120%] h-[200px] bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-[100%] translate-y-1/2 opacity-90 blur-[1px]"></div>
        
        {/* Jalan Utama Sederhana */}
        <div className="absolute bottom-0 w-full h-[50px] md:h-[70px] bg-gray-600 border-t-4 border-gray-400 flex items-center justify-between z-20">
          <div className="w-full h-2 border-t-4 border-dashed border-yellow-400 opacity-70"></div>
          {/* Mobil yang lewat */}
          <motion.div className="absolute text-3xl md:text-4xl" initial={{ x: '-10vw' }} animate={{ x: '110vw' }} transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 2 }}>🚗</motion.div>
          <motion.div className="absolute text-3xl md:text-4xl transform -scale-x-100" initial={{ x: '110vw' }} animate={{ x: '-10vw' }} transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 5 }}>🚙</motion.div>
        </div>

        {/* Lahan & Bangunan */}
        <div className="absolute bottom-[45px] md:bottom-[65px] w-full max-w-[1200px] flex justify-between items-end px-2 md:px-8 z-10">
          <div className="text-5xl md:text-7xl mb-2">🌳</div>
          
          <div className="flex-1 flex justify-around items-end px-1 md:px-4 pb-1">
            {isCityReady && buildings.map((building, idx) => (
              <div key={idx} className="w-6 h-10 md:w-16 md:h-20 flex items-end justify-center relative">
                <AnimatePresence>
                  <motion.div initial={{ y: 50, opacity: 0, scale: 0.2 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: "spring", bounce: 0.6, duration: 1, delay: idx * 0.2 }} className="text-4xl sm:text-5xl md:text-7xl drop-shadow-xl z-20 absolute bottom-0">
                    {building}
                  </motion.div>
                </AnimatePresence>
              </div>
            ))}
            {!isCityReady && (
              <div className="w-full flex justify-around opacity-40">
                {buildings.map((_, idx) => (
                  <div key={idx} className="w-8 h-3 md:w-12 border-2 border-dashed border-emerald-800 rounded-full bg-emerald-900/10 mb-2"></div>
                ))}
              </div>
            )}
          </div>
          <div className="text-5xl md:text-7xl mb-2">🌳</div>
        </div>

        <div className="absolute bottom-0 w-[120%] md:w-[100%] h-[150px] bg-gradient-to-t from-emerald-600 to-emerald-500 rounded-[100%] translate-y-[35%] shadow-inner border-t-4 border-emerald-300 z-0"></div>
      </div>
    </div>
  );
};

const DetectiveBackground = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900">
    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-400 via-transparent to-transparent bg-[length:30px_30px]"></div>
    
    <div className="absolute top-20 left-10 text-7xl md:text-8xl opacity-30 z-10 drop-shadow-lg pointer-events-none">
      <motion.div animate={{ rotate: [-10, 10, -10], x: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}>🔍</motion.div>
    </div>
    <div className="absolute top-40 right-20 text-6xl md:text-7xl opacity-20 z-10 drop-shadow-lg pointer-events-none">
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>🕵️</motion.div>
    </div>
    <div className="absolute bottom-32 left-1/4 text-5xl md:text-6xl opacity-20 z-10 drop-shadow-lg pointer-events-none">
      <motion.div animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>👣</motion.div>
    </div>
    <div className="absolute bottom-40 right-1/3 text-5xl md:text-6xl opacity-20 z-10 drop-shadow-lg pointer-events-none">
      <motion.div animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}>👣</motion.div>
    </div>

    <div className="absolute bottom-0 w-full h-[25vh] min-h-[150px] flex justify-center items-end opacity-90">
      <div className="absolute bottom-0 w-[150%] md:w-[120%] h-[200px] bg-gradient-to-t from-slate-900 to-slate-800 rounded-[100%] translate-y-1/2 opacity-90 blur-[1px]"></div>
      <div className="absolute bottom-0 w-[120%] md:w-[100%] h-[150px] bg-gradient-to-t from-slate-800 to-slate-700 rounded-[100%] translate-y-[35%] shadow-inner border-t-4 border-slate-600"></div>
    </div>
  </div>
);

const SpaceAdventureBackground = ({ isGalaxyReady = false, planetsCollected = 0 }: { isGalaxyReady?: boolean, planetsCollected?: number }) => {
  const planets = ['🌑', '🌕', '🌍', '🔴', '🟠', '🪐', '🧊', '🔵'];
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-gray-900 via-indigo-900 to-purple-900">
      {/* Stars */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent bg-[length:20px_20px]"></div>

      {/* Dynamic Planets */}
      <div className="absolute inset-0 flex flex-wrap justify-around items-start pt-10 px-4 md:px-10 z-10 pointer-events-none">
        {planets.map((planet, idx) => (
          <AnimatePresence key={idx}>
            {(planetsCollected > idx || isGalaxyReady) && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }} 
                animate={{ scale: 1, opacity: 0.9, y: [0, -15, 0] }} 
                transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: idx * 0.2, ease: "easeInOut" }}
                className="text-4xl md:text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] absolute"
                style={{
                  left: `${10 + (idx * 11)}%`,
                  top: `${10 + (idx % 2) * 15}%`
                }}
              >
                {planet}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Space Elements */}
      <div className="absolute top-10 right-10 text-8xl md:text-9xl opacity-80 z-10 drop-shadow-lg pointer-events-none">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>☀️</motion.div>
      </div>

      <div className="absolute bottom-24 left-10 text-6xl md:text-7xl opacity-80 z-10 drop-shadow-lg pointer-events-none">
        <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>👨‍🚀</motion.div>
      </div>

      <div className="absolute top-40 left-20 text-5xl md:text-6xl opacity-60 z-10 drop-shadow-lg pointer-events-none">
        <motion.div animate={{ x: [0, 200, 0], y: [0, 50, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}>☄️</motion.div>
      </div>
      
      <div className="absolute bottom-40 right-20 text-5xl md:text-6xl opacity-70 z-10 drop-shadow-lg pointer-events-none">
        <motion.div animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>🛸</motion.div>
      </div>

      {/* Planet Surface Base */}
      <div className="absolute bottom-0 w-full h-[25vh] min-h-[150px] flex justify-center items-end opacity-90">
        <div className="absolute bottom-0 w-[150%] md:w-[120%] h-[200px] bg-gradient-to-t from-gray-800 to-gray-600 rounded-[100%] translate-y-1/2 opacity-90 blur-[1px]"></div>
        <div className="absolute bottom-0 w-[120%] md:w-[100%] h-[150px] bg-gradient-to-t from-gray-700 to-gray-500 rounded-[100%] translate-y-[35%] shadow-inner border-t-4 border-gray-600"></div>
      </div>
    </div>
  );
};

const BALLOON_COLORS = [
  { bg: 'from-rose-300 to-rose-400', tie: 'border-b-rose-400' },
  { bg: 'from-sky-300 to-sky-400', tie: 'border-b-sky-400' },
  { bg: 'from-emerald-300 to-emerald-400', tie: 'border-b-emerald-400' },
  { bg: 'from-amber-200 to-amber-300', tie: 'border-b-amber-300' },
  { bg: 'from-purple-300 to-purple-400', tie: 'border-b-purple-400' },
  { bg: 'from-orange-300 to-orange-400', tie: 'border-b-orange-400' },
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
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
              <span className="text-xl md:text-2xl font-black text-white drop-shadow-md">{renderMathText(b.text)}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GameInterface;
