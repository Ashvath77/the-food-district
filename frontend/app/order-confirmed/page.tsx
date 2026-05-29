"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ConfirmedPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-primaryAccent rounded-full flex items-center justify-center mb-8">
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
      </motion.div>
      <h2 className="text-6xl font-black italic mb-4">ORDER CONFIRMED</h2>
      <p className="text-gray-400 text-xl mb-12">Your flavors are being prepared with cinematic precision.</p>
      <Link href="/menu" className="px-10 py-4 glass rounded-full font-bold hover:bg-primaryAccent transition-all uppercase tracking-widest text-sm">Return to District</Link>
    </div>
  );
}