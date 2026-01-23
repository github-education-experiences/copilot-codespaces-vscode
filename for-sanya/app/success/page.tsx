'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import FloatingHearts from '@/components/FloatingHearts';

export default function SuccessPage() {
  const [showScreenshotButton, setShowScreenshotButton] = useState(false);

  useEffect(() => {
    // Track visit
    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 'success' }),
    }).catch(console.error);

    // Trigger confetti
    const duration = 5000;
    const end = Date.now() + duration;

    const colors = ['#ff6b9d', '#ffc0cb', '#ff69b4', '#ffb3d9'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Show screenshot button after animation
    setTimeout(() => {
      setShowScreenshotButton(true);
    }, 3000);
  }, []);

  const handleScreenshot = () => {
    alert('Take a screenshot now! 📸\n\nPress:\n- Windows: Win + Shift + S\n- Mac: Cmd + Shift + 4\n- Phone: Volume Down + Power');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.div
            className="text-8xl md:text-9xl mb-8"
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.2, 1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            🎉
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-pink-900"
            style={{ fontFamily: 'Pacifico, cursive' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            YAYYYY 😭💗
          </motion.h1>

          <motion.p
            className="text-2xl md:text-4xl mb-8 text-pink-800 font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            I'm the luckiest!!
          </motion.p>

          <motion.div
            className="glass rounded-3xl p-8 md:p-12 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-pink-900 mb-4"
              style={{ fontFamily: 'Pacifico, cursive' }}
            >
              Now you're officially my Valentine,
              <br />
              Sanya Tripathi 💍💕
            </h2>
            <p className="text-xl text-pink-700 mt-6">
              This is the best day ever! 🥺❤️
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/?text=${encodeURIComponent('I said YES! 💕')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
              >
                Send me a message 💬
              </a>

              {showScreenshotButton && (
                <motion.button
                  onClick={handleScreenshot}
                  className="btn-secondary text-lg px-8 py-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  Screenshot this moment 📸
                </motion.button>
              )}
            </div>

            <motion.p
              className="text-pink-600 italic mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Can't wait to celebrate with you this Valentine's Day! 🌹
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Floating hearts decoration */}
        <motion.div
          className="absolute top-20 left-10 text-6xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          💕
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-10 text-6xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1,
          }}
        >
          💖
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 text-6xl hidden md:block"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.5,
          }}
        >
          💝
        </motion.div>
      </div>
    </div>
  );
}
