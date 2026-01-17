'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FloatingHearts from '@/components/FloatingHearts';

const compliments = [
  { text: "You're the prettiest part of my day 💕", emoji: "✨" },
  { text: "Your smile = my favorite notification 😭❤️", emoji: "😊" },
  { text: "You feel like peace and chaos together 😌✨", emoji: "🌸" },
  { text: "Talking to you is the highlight of my day 💗", emoji: "💬" },
  { text: "You make distance feel smaller 🥺", emoji: "🌍" },
  { text: "Your laugh is my favorite sound 🎵", emoji: "😄" },
  { text: "You're the reason I smile at my phone 📱💕", emoji: "📲" },
  { text: "Every conversation with you is a gift 🎁", emoji: "💝" },
];

export default function ComplimentsPage() {
  const router = useRouter();
  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    // Track visit
    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 'compliments' }),
    }).catch(console.error);

    // Show cards one by one
    const interval = setInterval(() => {
      setVisibleCards((prev) => {
        if (prev >= compliments.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-pink-900"
          style={{ fontFamily: 'Pacifico, cursive' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Some things I love about you, Sanya 💖
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {compliments.map((compliment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={
                visibleCards > index
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.8, y: 20 }
              }
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">{compliment.emoji}</span>
                <p className="text-lg text-pink-900 font-medium flex-1">
                  {compliment.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleCards >= compliments.length ? 1 : 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={() => router.push('/game')}
            className="btn-primary text-lg md:text-xl px-8 py-4"
            disabled={visibleCards < compliments.length}
          >
            One more thing 👉
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleCards >= compliments.length ? 1 : 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-6 text-pink-600 italic"
        >
          And there's so much more…
        </motion.p>
      </div>
    </div>
  );
}
