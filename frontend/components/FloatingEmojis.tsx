"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const emojis = ["🍕", "🍔", "🍟", "🌭", "🥪", "🍗", "🍜", "🍝", "🥟", "🍣", "🍰", "🍩", "☕", "🥤", "🧋"];

export default function FloatingEmojis() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const newItems = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 10,
      size: Math.floor(Math.random() * (100 - 50 + 1) + 50),
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#0F0F0F]">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: item.duration, repeat: Infinity, delay: item.delay, ease: "linear" }}
          className="absolute select-none"
          style={{ left: item.left, fontSize: `${item.size}px` }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}