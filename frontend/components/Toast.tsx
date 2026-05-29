"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../lib/store";

export default function Toast() {
  const message = useCartStore((state: any) => state.toastMessage);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-[#FF6B35] text-white px-8 py-4 rounded-full font-black shadow-2xl flex items-center gap-3 border-2 border-white/20"
        >
          <span className="text-xl">🔥</span> {message.toUpperCase()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}