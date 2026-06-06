"use client";

import React, { useState } from 'react';
import { 
  ShoppingCart, 
  CreditCard, 
  Star, 
  Minus, 
  Plus, 
  Heart, 
  Trash2, 
  ShoppingBag, 
  Truck,
  ShieldCheck,
  X
} from 'lucide-react';

export default function EcommerceComponentsPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans selection:bg-rose-500/30">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-orange-500">
              E-Commerce Components
            </h1>
            <p className="text-zinc-400 mt-2">Premium UI components for modern digital storefronts.</p>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-6 py-3 rounded-xl font-medium transition-all"
          >
            <ShoppingCart size={18} />
            View Cart
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
              3
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Product Gallery & Details Component (takes 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <ShoppingBag className="text-rose-400" />
              Product Display
            </h2>
            
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[80px] pointer-events-none rounded-full"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="aspect-square bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-center overflow-hidden relative group">
                    {/* Placeholder for main product image */}
                    <div className="w-48 h-64 bg-zinc-800 rounded-lg shadow-2xl transform group-hover:scale-105 transition-transform duration-500"></div>
                    <button className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-zinc-400 hover:text-rose-400 transition-colors">
                      <Heart size={20} />
                    </button>
                  </div>
                  <div className="flex gap-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className={`aspect-square w-full bg-zinc-950 rounded-xl border ${item === 1 ? 'border-rose-500' : 'border-zinc-800'} flex items-center justify-center cursor-pointer hover:border-zinc-700 transition-colors`}>
                        <div className="w-10 h-14 bg-zinc-800 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                  <div className="mb-2 flex items-center gap-2 text-sm text-rose-400 font-medium">
                    <span>New Arrival</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Midnight Tech Jacket</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />)}
                    </div>
                    <span className="text-sm text-zinc-400">(128 reviews)</span>
                  </div>
                  
                  <div className="text-2xl font-bold mb-6">$249.99</div>

                  {/* Colors */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-zinc-400 mb-3">Color: <span className="text-white capitalize">{selectedColor}</span></h4>
                    <div className="flex gap-3">
                      {['black', 'zinc', 'rose'].map((color) => (
                        <button 
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${selectedColor === color ? 'border-white' : 'border-transparent'}`}
                        >
                          <span className={`w-8 h-8 rounded-full ${color === 'black' ? 'bg-black border border-zinc-800' : color === 'zinc' ? 'bg-zinc-600' : 'bg-rose-900'}`}></span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-medium text-zinc-400">Size</h4>
                      <button className="text-sm text-rose-400 hover:text-rose-300">Size Guide</button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <button 
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 rounded-xl font-medium border transition-colors ${selectedSize === size ? 'bg-white text-black border-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto space-y-4">
                    <div className="flex gap-4">
                      <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl px-2">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2 text-zinc-400 hover:text-white transition-colors"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="w-8 text-center font-medium">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-2 text-zinc-400 hover:text-white transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                      <button className="flex-1 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] transition-all flex items-center justify-center gap-2">
                        <ShoppingCart size={20} />
                        Add to Cart
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800/50">
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Truck size={16} className="text-zinc-300" />
                        Free Shipping
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <ShieldCheck size={16} className="text-zinc-300" />
                        Lifetime Warranty
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout / Order Summary Component */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <CreditCard className="text-orange-400" />
              Order Summary
            </h2>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
              
              <div className="space-y-6 relative z-10">
                {/* Items */}
                <div className="space-y-4">
                  {[
                    { name: 'Midnight Tech Jacket', price: 249.99, qty: 1, img: 'bg-zinc-800' },
                    { name: 'Urban Cargo Pants', price: 129.50, qty: 2, img: 'bg-zinc-800' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className={`w-16 h-16 ${item.img} rounded-xl border border-zinc-700/50 flex-shrink-0`}></div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                        <div className="text-xs text-zinc-500 mt-1">Qty: {item.qty}</div>
                        <div className="font-semibold text-sm mt-1">${item.price.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-800 pt-4 space-y-3">
                  <div className="flex justify-between text-zinc-400 text-sm">
                    <span>Subtotal</span>
                    <span>$508.99</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-sm">
                    <span>Shipping</span>
                    <span className="text-emerald-400">Free</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-sm">
                    <span>Taxes</span>
                    <span>$40.72</span>
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-4 flex justify-between items-end">
                  <div>
                    <div className="text-sm text-zinc-400 mb-1">Total</div>
                    <div className="text-3xl font-bold">$549.71</div>
                  </div>
                </div>

                <button className="w-full bg-white text-black hover:bg-zinc-200 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                  <CreditCard size={20} />
                  Checkout Securely
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out Cart Modal Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-zinc-950 border-l border-zinc-800 w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingCart size={20} />
                Your Cart <span className="bg-zinc-800 text-xs px-2 py-1 rounded-md">3</span>
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {[
                { name: 'Midnight Tech Jacket', price: 249.99, size: 'M', color: 'Black' },
                { name: 'Urban Cargo Pants', price: 129.50, size: 'L', color: 'Olive' },
                { name: 'Essential Tee', price: 35.00, size: 'M', color: 'White' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-20 h-24 bg-zinc-800 rounded-xl border border-zinc-700/50 flex-shrink-0"></div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-zinc-100">{item.name}</h4>
                      <button className="text-zinc-600 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">{item.color} | Size {item.size}</div>
                    <div className="mt-auto flex justify-between items-end">
                      <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg px-2">
                        <button className="p-1 text-zinc-400 hover:text-white"><Minus size={14} /></button>
                        <span className="w-6 text-center text-sm">1</span>
                        <button className="p-1 text-zinc-400 hover:text-white"><Plus size={14} /></button>
                      </div>
                      <div className="font-semibold">${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-zinc-900/50 border-t border-zinc-800 space-y-4">
              <div className="flex justify-between text-zinc-300">
                <span>Subtotal</span>
                <span className="font-bold text-white">$543.99</span>
              </div>
              <p className="text-xs text-zinc-500 text-center">Shipping and taxes calculated at checkout.</p>
              <button className="w-full bg-rose-600 hover:bg-rose-500 text-white py-4 rounded-xl font-bold transition-colors shadow-lg shadow-rose-900/20">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
