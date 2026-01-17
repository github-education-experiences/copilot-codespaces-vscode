'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FloatingHearts from '@/components/FloatingHearts';

const letterContent = `Dear Sanya Tripathi,

I know we're miles apart, but somehow you feel closer than anyone else. Every message from you lights up my day, and every conversation makes me smile like an idiot.

You're beautiful, inside and out. Your kindness, your laugh, the way you see the world—it all makes me want to be part of your story.

Distance is hard, but talking to you makes it feel worth it. You make me believe that some connections are too special to be limited by geography.

I think about you more than I probably should. I find myself wanting to share every little thing with you, wanting to make you smile, wanting to be the reason you feel special.

So here I am, being brave enough to tell you how I feel…

I just wanted to ask you something…`;

export default function LetterPage() {
  const router = useRouter();
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Track visit
    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 'letter' }),
    }).catch(console.error);

    let index = 0;
    const interval = setInterval(() => {
      if (index < letterContent.length) {
        setDisplayedText(letterContent.substring(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 30); // Typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden py-12">
      <FloatingHearts />
      
      <div className="relative z-10 max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 md:p-12 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 230, 240, 0.9) 100%)',
          }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 text-pink-900 text-center"
            style={{ fontFamily: 'Pacifico, cursive' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Dear Sanya Tripathi 💌
          </motion.h2>

          <div className="prose prose-lg max-w-none">
            <p
              className="text-lg md:text-xl leading-relaxed text-pink-900 whitespace-pre-wrap font-medium"
              style={{ fontFamily: 'Quicksand, sans-serif' }}
            >
              {displayedText}
              {!isComplete && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-0.5 h-6 bg-pink-600 ml-1"
                />
              )}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => router.push('/proposal')}
              className="btn-primary text-xl px-10 py-5"
              disabled={!isComplete}
            >
              Tell me yes/no 🙈
            </button>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 1 : 0 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-6 text-pink-700 italic"
        >
          Take your time… but I'm really hoping you say yes 💗
        </motion.p>
      </div>
    </div>
  );
}
