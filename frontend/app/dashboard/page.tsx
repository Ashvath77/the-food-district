"use client";
import { motion } from "framer-motion";
import { Wallet, Award, Clock } from "lucide-react";
import { useCartStore } from "../../lib/store";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  // 1. Local state to hold orders to avoid Next.js hydration errors
  const [persistedOrders, setPersistedOrders] = useState<any[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  
  const orders = useCartStore((state: any) => state.orders);

  // 2. This effect runs ONLY on the browser after refresh
  useEffect(() => {
    setPersistedOrders(orders);
    setIsHydrated(true);
  }, [orders]);

  // 3. Show nothing until we are sure the data is loaded from browser storage
  if (!isHydrated) {
    return <div className="min-h-screen bg-[#0F0F0F]" />;
  }

  const totalSpent = persistedOrders.reduce((acc: number, order: any) => acc + order.total, 0);
  const target = 2000; 
  const progress = Math.min((totalSpent / target) * 100, 100);

  return (
    <div className="pt-32 pb-20 px-6 container mx-auto max-w-6xl">
      <header className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-black mb-2 tracking-tighter italic"
        >
          MY ACCOUNT
        </motion.h1>
        <p className="text-gray-400 font-medium">Your order history and rewards are secured.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="glass p-8 rounded-[40px] border-[#FF6B35]/30">
          <Wallet className="text-[#FF6B35] mb-4" size={32} />
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Wallet Balance</p>
          <h2 className="text-4xl font-black">₹{(totalSpent * 0.05).toFixed(2)}</h2>
        </div>

        <div className="glass p-8 rounded-[40px]">
          <Award className="text-[#FFD166] mb-4" size={32} />
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Tier Status</p>
          <h2 className="text-4xl font-black uppercase tracking-tight">
            {totalSpent > 1000 ? 'Gold Member' : 'Bronze Member'}
          </h2>
        </div>

        <div className="glass p-8 rounded-[40px] flex flex-col justify-center">
          <div className="flex justify-between font-black text-[10px] mb-3 tracking-widest">
            <span>NEXT REWARD: SILVER BOX</span>
            <span className="text-[#FF6B35]">{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FFD166]"
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-4 uppercase font-bold">
            {progress < 100 ? `Spend ₹${target - totalSpent} more for reward` : "Silver Reward Ready!"}
          </p>
        </div>
      </div>

      <div className="glass rounded-[40px] overflow-hidden border border-white/5">
        <div className="p-8 border-b border-white/5">
          <h3 className="text-2xl font-black italic tracking-tighter uppercase">Order History</h3>
        </div>
        
        {persistedOrders.length === 0 ? (
          <div className="p-20 text-center text-gray-500 font-bold italic">
            No orders found. Start your first culinary journey!
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {persistedOrders.map((order: any, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 flex flex-col md:flex-row items-center gap-8 hover:bg-white/[0.02] transition-colors"
              >
                <div className="w-14 h-14 glass rounded-full flex items-center justify-center font-black text-[#FF6B35]">
                  #{order.id}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg leading-tight uppercase tracking-tight">{order.items}</h4>
                  <div className="flex gap-4 text-[10px] text-gray-500 mt-2 font-black uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Clock size={12}/> {order.date}</span>
                    <span className="text-green-500 italic">● {order.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-2xl text-white tracking-tighter font-mono">₹{order.total}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}