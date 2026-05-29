"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingBasket, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../../lib/store';

const FOOD_ITEMS = [
  // INDIAN
  { id: 1, name: "Hyderabadi Biryani", price: 399, rating: 4.9, category: "Indian", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800", desc: "Premium long-grain basmati rice with marinated chicken and saffron." },
  { id: 2, name: "Masala Dosa", price: 149, rating: 4.8, category: "Indian", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800", desc: "Extra crispy crepe served with spiced potato bhaji and coconut chutney." },
  { id: 3, name: "Steamed Idli Sambar", price: 120, rating: 4.7, category: "Indian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800", desc: "Soft and fluffy steamed rice cakes with traditional lentil sambar." },
  { id: 4, name: "Paneer Tikka", price: 320, rating: 4.8, category: "Indian", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800", desc: "Charcoal grilled cottage cheese with bell peppers." },

  // CHINESE
  { id: 5, name: "Hakka Noodles", price: 220, rating: 4.6, category: "Chinese", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800", desc: "Wok-tossed noodles with fresh Asian greens." },
  { id: 6, name: "Dim Sum Basket", price: 280, rating: 4.7, category: "Chinese", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=800", desc: "Assorted handmade steamed dumplings." },

  // PIZZA, BURGER & SANDWICH (MAINS)
  { id: 7, name: "Truffle Pizza", price: 599, rating: 4.9, category: "Mains", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800", desc: "Wild mushrooms and white truffle oil." },
  { id: 8, name: "District Burger", price: 349, rating: 4.8, category: "Mains", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800", desc: "Aged cheddar and caramelized onions." },
  { id: 16, name: "Club Veg Sandwich", price: 199, rating: 4.7, category: "Mains", image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=800", desc: "Triple layered toasted bread with fresh garden veggies and herb mayo." },

  // BEVERAGES (UPDATED LIST)
  { id: 15, name: "Lemon Mojito", price: 140, rating: 4.6, category: "Drinks", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800", desc: "Refreshing zesty lime and fresh mint cooler." },
  { id: 17, name: "Masala Chai", price: 80, rating: 4.9, category: "Drinks", image: "https://media.istockphoto.com/id/1336601313/photo/top-view-of-indian-herbal-masala-chai-or-traditional-beverage-tea-with-milk-and-spices-kerala.webp?a=1&b=1&s=612x612&w=0&k=20&c=MbKwu6EcL6HdYiE-yVYC6th6VW1p48fXxnun13yQw6E=", desc: "Classic hot brewed tea with hand-crushed ginger and aromatic spices." },
  { id: 18, name: "Gourmet Coffee", price: 120, rating: 4.8, category: "Drinks", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800", desc: "Freshly roasted arabica beans brewed to perfection." },

  // CAKES & DESSERTS
  { id: 12, name: "Red Velvet Slice", price: 240, rating: 4.9, category: "Cakes", image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=800", desc: "Silky crimson cake with cream cheese frosting." },
  { id: 13, name: "NY Cheesecake", price: 290, rating: 4.9, category: "Cakes", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800", desc: "Creamy vanilla bean cheesecake on a graham cracker base." },
  { id: 14, name: "Lava Cake", price: 210, rating: 4.8, category: "Cakes", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800", desc: "Molten Belgian chocolate center." },
];

const CATEGORIES = ["All", "Indian", "Chinese", "Mains", "Drinks", "Cakes"];

export default function MenuPage() {
  const [tab, setTab] = useState("All");
  const { cart, addToCart, updateQuantity, removeFromCart } = useCartStore() as any;

  const filtered = tab === "All" ? FOOD_ITEMS : FOOD_ITEMS.filter(i => i.category === tab);

  return (
    <div className="pt-40 pb-20 px-6 container mx-auto">
      {/* Header & Categories */}
      <div className="flex flex-col md:flex-row justify-between mb-12 gap-6 items-end">
        <div>
          <h2 className="text-6xl font-black italic tracking-tighter">THE MENU</h2>
          <p className="text-gray-500 font-medium mt-2">Global flavors, locally crafted.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-full pb-2">
          {CATEGORIES.map(c => (
            <button 
              key={c} 
              onClick={() => setTab(c)} 
              className={`px-8 py-3 rounded-full text-[10px] font-black tracking-widest transition-all duration-300 ${tab === c ? 'bg-[#FF6B35] text-white shadow-[0_10px_20px_rgba(255,107,53,0.3)]' : 'glass text-gray-500 hover:text-white'}`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map(item => {
          const cartItem = cart.find((i: any) => i.id === item.id);

          return (
            <motion.div 
              key={item.id} 
              layout
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              whileHover={{ y: -10 }} 
              className="glass rounded-[40px] overflow-hidden border border-white/5 flex flex-col h-full shadow-xl"
            >
              <div className="h-64 overflow-hidden relative">
                <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold">
                   <Star size={12} className="text-[#FFD166] fill-[#FFD166]" /> {item.rating}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black tracking-tight">{item.name}</h3>
                  <span className="text-[#FF6B35] font-black text-xl">₹{item.price}</span>
                </div>
                <p className="text-gray-400 text-sm mb-8 line-clamp-2 leading-relaxed">{item.desc}</p>
                
                {/* DYNAMIC BUTTON LOGIC */}
                <div className="mt-auto">
                  {!cartItem ? (
                    <button 
                      onClick={() => addToCart(item)} 
                      className="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-[#FF6B35] hover:text-white transition-all flex items-center justify-center gap-2 group active:scale-95"
                    >
                      <ShoppingBasket size={18} className="group-hover:rotate-12 transition-transform" /> ADD TO BAG
                    </button>
                  ) : (
                    <div className="flex items-center justify-between w-full bg-[#FF6B35] rounded-2xl p-1 overflow-hidden shadow-lg">
                      <button 
                        onClick={() => {
                          if (cartItem.quantity === 1) removeFromCart(item.id);
                          else updateQuantity(item.id, 'dec');
                        }}
                        className="p-3 hover:bg-black/10 transition-colors rounded-xl text-white"
                      >
                        <Minus size={20} />
                      </button>
                      
                      <span className="font-black text-white text-lg">{cartItem.quantity}</span>
                      
                      <button 
                        onClick={() => updateQuantity(item.id, 'inc')}
                        className="p-3 hover:bg-black/10 transition-colors rounded-xl text-white"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}