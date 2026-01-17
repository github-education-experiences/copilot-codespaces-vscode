'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FloatingHearts from '@/components/FloatingHearts';

export default function ProposalPage() {
  const router = useRouter();
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [noAttempts, setNoAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [showMessageInput, setShowMessageInput] = useState(false);

  const noButtonTexts = [
    "No 🙃",
    "Are you sure? 🥺",
    "Really? 😢",
    "Think again! 💔",
    "Pretty please? 🙏",
    "Last chance! 😭",
  ];

  useEffect(() => {
    // Track visit
    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 'proposal' }),
    }).catch(console.error);
  }, []);

  const handleNoHover = () => {
    const newAttempt = Math.min(noAttempts + 1, noButtonTexts.length - 1);
    setNoAttempts(newAttempt);

    // Move the button to a random position
    const randomX = Math.random() * (window.innerWidth - 200);
    const randomY = Math.random() * (window.innerHeight - 100);

    setNoButtonStyle({
      position: 'fixed',
      left: `${randomX}px`,
      top: `${randomY}px`,
      transition: 'all 0.3s ease',
    });

    // Make YES button bigger
    setYesButtonScale((prev) => Math.min(prev + 0.1, 2));
  };

  const handleYes = async () => {
    setShowMessageInput(true);
  };

  const handleSubmit = async () => {
    try {
      await fetch('/api/response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response: 'YES',
          message: message || 'No message provided',
        }),
      });

      router.push('/success');
    } catch (error) {
      console.error('Error submitting response:', error);
      // Still redirect even if there's an error
      router.push('/success');
    }
  };

  const handleNoClick = async () => {
    try {
      await fetch('/api/response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response: 'NO',
          message: 'She said no 💔',
        }),
      });
    } catch (error) {
      console.error('Error submitting response:', error);
    }
    
    // Move the button away instead
    handleNoHover();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-8 text-pink-900"
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
            Sanya Tripathi…
            <br />
            Will you be my Valentine? 💖🌸
          </motion.h1>

          {!showMessageInput ? (
            <motion.div
              className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={handleYes}
                className="btn-primary text-2xl px-12 py-6"
                animate={{ scale: yesButtonScale }}
                whileHover={{ scale: yesButtonScale * 1.1 }}
                whileTap={{ scale: yesButtonScale * 0.95 }}
              >
                YES 💘
              </motion.button>

              <motion.button
                onMouseEnter={handleNoHover}
                onClick={handleNoClick}
                className="btn-secondary text-xl px-8 py-4"
                style={noButtonStyle}
                whileHover={{ scale: 0.9 }}
              >
                {noButtonTexts[noAttempts]}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-8 mt-12 max-w-xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-pink-900 mb-4">
                Yay! 🎉 Want to send me a message?
              </h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write something sweet (optional)..."
                className="w-full p-4 rounded-2xl border-2 border-pink-300 focus:border-pink-500 focus:outline-none mb-4 min-h-32 text-pink-900"
                style={{ fontFamily: 'Quicksand, sans-serif' }}
              />
              <button
                onClick={handleSubmit}
                className="btn-primary text-xl px-8 py-4 w-full"
              >
                Send & Continue 💌
              </button>
              <button
                onClick={handleSubmit}
                className="mt-4 text-pink-600 underline"
              >
                Skip for now
              </button>
            </motion.div>
          )}

          {noAttempts > 0 && !showMessageInput && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-pink-700 text-lg italic"
            >
              The YES button is getting bigger... maybe that's a sign? 🥺
            </motion.p>
          )}
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-10 left-10 text-5xl"
          animate={{
            rotate: [0, 20, -20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          💝
        </motion.div>

        <motion.div
          className="absolute bottom-10 right-10 text-5xl"
          animate={{
            rotate: [0, -20, 20, 0],
            y: [0, -10, 0],
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
