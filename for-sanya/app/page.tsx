'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import FloatingHearts from '@/components/FloatingHearts';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Track visit
    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 'landing' }),
    }).catch(console.error);
  }, []);

  const handleStart = () => {
    router.push('/compliments');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: 'Pacifico, cursive' }}
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-pink-400 bg-clip-text text-transparent">
              Hey Sanya Tripathi 🥺💗
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-pink-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            I made something special for you…
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <button
              onClick={handleStart}
              className="btn-primary text-lg md:text-xl px-8 py-4 inline-flex items-center gap-2"
            >
              Open Your Surprise 🎁
            </button>
          </motion.div>

          <motion.div
            className="mt-12 text-sm text-pink-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="italic">Made with 💖 just for you</p>
          </motion.div>
        </motion.div>

        {/* Decorative hearts */}
        <motion.div
          className="absolute -top-10 -left-10 text-6xl opacity-20"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          💕
        </motion.div>

        <motion.div
          className="absolute -bottom-10 -right-10 text-6xl opacity-20"
          animate={{
            rotate: [0, -10, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1,
          }}
        >
          💖
        </motion.div>
      </div>
    </div>
  );
}

