import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from './supabaseClient';

// 1. Define the TypeScript types for the Store
interface CartStoreState {
  cart: any[];
  orders: any[];
  toastMessage: string | null;
  addToCart: (item: any) => void;
  completeOrder: (orderData: any) => Promise<void>;
  updateQuantity: (id: number, type: 'inc' | 'dec') => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

// 2. Pass the <CartStoreState> type definition to create()
export const useCartStore = create<CartStoreState>()(
  persist(
    (set) => ({
      cart: [],
      orders: [],
      toastMessage: null,
      
      addToCart: (item: any) => set((state: any) => {
        setTimeout(() => set({ toastMessage: null }), 3000);
        const existing = state.cart.find((i: any) => i.id === item.id);
        if (existing) {
          return { 
            toastMessage: `🔥 1 item added to cart`, 
            cart: state.cart.map((i: any) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) 
          };
        }
        return { 
          toastMessage: `🔥 1 item added to cart`, 
          cart: [...state.cart, { ...item, quantity: 1 }] 
        };
      }),

      completeOrder: async (orderData: any) => {
        // 1. Save to Cloud Database
        const { error } = await supabase.from('orders').insert([{
          id: orderData.id,
          items: orderData.items,
          total: orderData.total,
          order_date: orderData.date
        }]);

        if (error) console.error("DB Error:", error);

        // 2. Save to local state (for speed)
        set((state: any) => ({
          orders: [orderData, ...state.orders],
          cart: []
        }));
      },

      updateQuantity: (id: number, type: 'inc' | 'dec') => set((state: any) => ({
        cart: state.cart.map((i: any) => {
          if (i.id === id) {
            const newQty = type === 'inc' ? i.quantity + 1 : i.quantity - 1;
            return { ...i, quantity: Math.max(1, newQty) };
          }
          return i;
        })
      })),

      removeFromCart: (id: number) => set((state: any) => ({
        cart: state.cart.filter((i: any) => i.id !== id)
      })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'food-district-data', // The unique key for storage
    }
  )
);