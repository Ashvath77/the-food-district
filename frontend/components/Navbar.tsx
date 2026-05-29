"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, User, UtensilsCrossed } from 'lucide-react';
import { useCartStore } from '../lib/store'; // Correct relative path

export default function Navbar() {
  // This line gets the real cart from our store
  const cart = useCartStore((state: any) => state.cart);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center p-6"
    >
      <div className="w-full max-w-6xl glass px-8 py-4 rounded-3xl flex items-center justify-between border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl">
        <Link href="/" className="text-xl font-black tracking-tighter flex items-center gap-2 group">
          <UtensilsCrossed className="text-[#FF6B35] group-hover:rotate-12 transition-transform" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            THE FOOD DISTRICT
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10 font-bold text-[11px] uppercase tracking-[0.2em] text-gray-400">
          <Link href="/menu" className="hover:text-[#FF6B35] transition-colors">Menu</Link>
          <Link href="/mystery" className="hover:text-[#FF6B35] transition-colors">Mystery Box</Link>
          <Link href="/dashboard" className="hover:text-[#FF6B35] transition-colors">Rewards</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative group">
            <ShoppingCart size={22} className="group-hover:text-[#FF6B35] transition-colors" />
            {/* THIS IS NOW DYNAMIC */}
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF6B35] text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black animate-pulse">
                {cart.length}
              </span>
            )}
          </Link>
          <Link href="/dashboard">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#FF6B35] transition-colors">
              <User size={20} />
            </div>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}