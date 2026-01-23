'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FloatingHearts from '@/components/FloatingHearts';

interface Heart {
  id: number;
  x: number;
  y: number;
  caught: boolean;
}

export default function GamePage() {
  const router = useRouter();
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [caughtCount, setCaughtCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const TARGET_HEARTS = 5;

  useEffect(() => {
    // Track visit
    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 'game' }),
    }).catch(console.error);
  }, []);

  const startGame = () => {
    setGameStarted(true);
    generateHearts();
  };

  const generateHearts = () => {
    const newHearts: Heart[] = Array.from({ length: TARGET_HEARTS }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
      caught: false,
    }));
    setHearts(newHearts);
  };

  const catchHeart = (id: number) => {
    if (gameCompleted) return;

    setHearts((prev) =>
      prev.map((heart) => (heart.id === id ? { ...heart, caught: true } : heart))
    );

    const newCount = caughtCount + 1;
    setCaughtCount(newCount);

    if (newCount >= TARGET_HEARTS) {
      setGameCompleted(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {!gameStarted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 text-pink-900"
              style={{ fontFamily: 'Pacifico, cursive' }}
            >
              Let's Play a Game 🎮💕
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-pink-800">
              Catch 5 hearts to unlock something special!
            </p>
            <button onClick={startGame} className="btn-primary text-xl px-8 py-4">
              Start Game 💖
            </button>
          </motion.div>
        ) : !gameCompleted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-pink-900 mb-2">
                Catch the Hearts! 💗
              </h3>
              <p className="text-xl text-pink-700">
                {caughtCount} / {TARGET_HEARTS} hearts caught
              </p>
            </div>

            <div className="relative h-96 md:h-[500px] glass rounded-3xl overflow-hidden">
              {hearts.map((heart) => (
                <motion.button
                  key={heart.id}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: heart.caught ? 0 : 1,
                    opacity: heart.caught ? 0 : 1,
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  style={{
                    position: 'absolute',
                    left: `${heart.x}%`,
                    top: `${heart.y}%`,
                  }}
                  className={`text-5xl cursor-pointer ${
                    heart.caught ? 'pointer-events-none' : ''
                  }`}
                  onClick={() => catchHeart(heart.id)}
                  disabled={heart.caught}
                >
                  💖
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{ duration: 0.6 }}
              className="text-8xl mb-6"
            >
              🎉
            </motion.div>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 text-pink-900"
              style={{ fontFamily: 'Pacifico, cursive' }}
            >
              You Did It! 🎊
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-pink-800">
              Okay… you unlocked the secret 😳❤️
            </p>
            <button
              onClick={() => router.push('/letter')}
              className="btn-primary text-xl px-8 py-4"
            >
              See What's Next 💌
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
