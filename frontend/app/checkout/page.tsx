"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../lib/store';

export default function CheckoutPage() {
  const [method, setMethod] = useState<'UPI' | 'COD'>('UPI');
  const [loading, setLoading] = useState(false);
  const { cart, completeOrder } = useCartStore() as any;
  const router = useRouter();

  const subtotal = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

  const handleOrder = () => {
    if (cart.length === 0) return;
    setLoading(true);

    const newOrder = {
      id: Math.floor(1000 + Math.random() * 9000),
      items: cart.map((i: any) => i.name).join(", "),
      total: subtotal + 40,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: "Delivered"
    };

    setTimeout(() => {
      completeOrder(newOrder); // Saves to store
      router.push('/order-confirmed');
    }, 2000);
  };

  return (
    <div className="pt-40 pb-20 px-6 container mx-auto max-w-2xl">
      <h2 className="text-5xl font-black italic mb-10 text-center">CHECKOUT</h2>
      <div className="glass p-10 rounded-[40px] border border-[#FF6B35]/20">
        <div className="grid grid-cols-2 gap-4 mb-10">
          <button onClick={() => setMethod('UPI')} className={`py-4 rounded-2xl font-bold transition-all ${method === 'UPI' ? 'bg-[#FF6B35] text-white' : 'glass text-gray-500'}`}>UPI PAY</button>
          <button onClick={() => setMethod('COD')} className={`py-4 rounded-2xl font-bold transition-all ${method === 'COD' ? 'bg-[#FF6B35] text-white' : 'glass text-gray-500'}`}>CASH ON DELIVERY</button>
        </div>

        {method === 'UPI' ? (
          <div className="space-y-6 text-center">
            <div className="glass p-6 rounded-3xl flex flex-col items-center gap-4">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TheFoodDistrict" alt="QR" className="rounded-xl grayscale" />
              <p className="text-gray-400 text-sm font-bold">Scan to Pay ₹{subtotal + 40}</p>
            </div>
          </div>
        ) : (
          <div className="glass p-8 rounded-3xl text-center">
            <p className="text-xl font-bold italic">Pay ₹{subtotal + 40} on arrival.</p>
          </div>
        )}

        <button onClick={handleOrder} disabled={loading} className="w-full py-5 bg-white text-black font-black rounded-2xl mt-10">
          {loading ? "PROCESSING..." : "CONFIRM ORDER"}
        </button>
      </div>
    </div>
  );
}