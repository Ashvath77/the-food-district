"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-[90vh] w-full flex flex-col items-center justify-center text-center px-6">
      
      {/* Cinematic Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B35]/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10"
      >
        <span className="inline-block px-6 py-2 mb-10 text-[12px] font-black tracking-[0.6em] uppercase border border-white/10 rounded-full text-[#FFD166] bg-white/5 backdrop-blur-md">
          The Food District Premium
        </span>
        
        <h1 className="text-7xl md:text-[150px] font-black text-white mb-8 tracking-tighter leading-[0.85] italic">
        THE <br />
        <span className="text-[#FF6B35] not-italic uppercase">FOOD DISTRICT</span>
        </h1>

        <p className="text-gray-400 text-xl md:text-3xl max-w-3xl mx-auto mb-16 font-light leading-relaxed">
          The elite destination for flavors. <br/> 
          Experience a cinematic culinary journey.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link href="/menu">
            <button className="px-14 py-7 bg-[#FF6B35] text-white rounded-full font-black text-2xl hover:scale-110 hover:shadow-[0_20px_60px_rgba(255,107,53,0.5)] transition-all duration-500">
              EXPLORE MENU
            </button>
          </Link>
          <Link href="/mystery">
            <button className="px-14 py-7 glass text-white rounded-full font-black text-2xl hover:bg-white/10 transition-all border border-white/20">
              MYSTERY BOX
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Luxury Texture Overlay */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-50"></div>
    </div>
  );
}