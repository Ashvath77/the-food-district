"use client";
import { motion } from "framer-motion";
import { useCartStore } from "../../lib/store";

const BOXES = [
  { id: 101, name: "Mystery Mini", price: 99, hints: ["🌶 Spicy", "🥤 Beverage"], image: "https://images.unsplash.com/photo-1549462980-6a013f2960e6?q=80&w=800" },
  { id: 102, name: "Mystery Standard", price: 149, hints: ["🍕 Italian", "🍰 Dessert"], image: "https://images.unsplash.com/photo-1549462980-6a013f2960e6?q=80&w=800" },
  { id: 103, name: "Mystery Premium", price: 199, hints: ["🥩 Gourmet", "🍷 Premium Drink"], image: "https://images.unsplash.com/photo-1549462980-6a013f2960e6?q=80&w=800" },
];

export default function MysteryPage() {
  const addToCart = useCartStore((state: any) => state.addToCart);

  return (
    <div className="pt-40 pb-20 px-6 container mx-auto text-center">
      <h2 className="text-6xl font-black italic mb-12">THE MYSTERY</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {BOXES.map((box) => (
          <div key={box.id} className="glass p-8 rounded-[40px] border border-white/10">
            <div className="text-8xl mb-6">🎁</div>
            <h3 className="text-2xl font-bold mb-2">{box.name}</h3>
            <p className="text-[#FF6B35] text-3xl font-black mb-6">₹{box.price}</p>
            <button onClick={() => addToCart(box)} className="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-[#FF6B35] hover:text-white transition-all">
              ADD MYSTERY TO BAG
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}