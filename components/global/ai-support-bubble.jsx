'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@ai-sdk/react';
import { cn } from '@/lib/utils';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['900'] });

export function AiSupportBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/generate',
    body: { mode: 'support' },
    initialMessages: [
      { id: '1', role: 'assistant', content: 'Bonjour ! Je suis l\'IA de support VixLuxia. Comment puis-je t\'aider aujourd\'hui ?' }
    ]
  });

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 sm:w-96 rounded-3xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-violet-500/10 to-orange-400/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">Support IA</h3>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> En ligne
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setIsOpen(false)} aria-label="Close AI Support">
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/10">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm max-w-[85%] shadow-sm border border-border/50 ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-card rounded-bl-sm'}`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-card rounded-2xl rounded-bl-sm p-3 flex items-center gap-2 border border-border/50 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="p-3 bg-background border-t border-border/50 flex gap-2">
              <Input 
                value={input} 
                onChange={handleInputChange} 
                placeholder="Posez votre question..." 
                className="flex-1 rounded-full bg-muted/50 border-transparent focus-visible:ring-1 focus-visible:ring-primary/30 h-10 px-4 text-sm" 
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="rounded-full h-10 w-10 shrink-0 shadow-sm bg-gradient-to-r from-violet-500 to-orange-400 text-white border-none hover:opacity-90" aria-label="Send message">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl hover:shadow-primary/30 transition-all overflow-hidden"
        aria-label="Toggle AI Support"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-pink-500 to-orange-500" style={{ backgroundSize: '300% auto', animation: 'logo-shimmer 3s linear infinite' }} />
        <div className="absolute inset-0.5 rounded-full bg-background/20 backdrop-blur-sm" />
        <div className="relative z-10 text-white flex items-center justify-center">
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <span className={cn(outfit.className, "font-black text-xl tracking-tighter")}>VX</span>
          )}
        </div>
      </motion.button>
    </div>
  );
}
