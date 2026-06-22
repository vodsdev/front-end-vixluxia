'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@ai-sdk/react';
import { cn } from '@/lib/utils';

export function AiSupportBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/generate',
    body: { mode: 'support' },
    initialMessages: [
      { id: '1', role: 'assistant', content: 'Bonjour ! Je suis l\'IA de support VixLuxia. Comment puis-je t\'aider aujourd\'hui ?' }
    ]
  });

  useEffect(() => {
    if (isOpen && mounted) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages, isOpen, mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4 w-80 sm:w-96 rounded-[32px] border border-border/40 bg-background/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-border/20 bg-gradient-to-r from-violet-500/10 to-orange-400/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-tight leading-none mb-1">Support IA</h3>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="h-80 overflow-y-auto p-5 space-y-4 bg-muted/5 scrollbar-hide">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}>
                  <div className={cn(
                    "px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed shadow-sm border",
                    msg.role === 'user' 
                      ? "bg-violet-600 text-white border-violet-500 rounded-br-none" 
                      : "bg-card border-border/40 rounded-bl-none"
                  )}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border/40 rounded-2xl rounded-bl-none p-4 flex items-center gap-1.5 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 bg-background border-t border-border/20 flex gap-3">
              <Input 
                value={input} 
                onChange={handleInputChange} 
                placeholder="Write a message..." 
                className="flex-1 rounded-2xl bg-muted/30 border-transparent focus-visible:ring-violet-500/30 h-12 px-5 text-sm font-medium" 
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="rounded-2xl h-12 w-12 shrink-0 bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-16 w-16 items-center justify-center rounded-[22px] shadow-2xl transition-all overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500" style={{ backgroundSize: '300% auto', animation: 'logo-shimmer 3s linear infinite' }} />
        <div className="absolute inset-0.5 rounded-[20px] bg-background/20 backdrop-blur-md" />
        <div className="relative z-10 text-white flex items-center justify-center">
          {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
        </div>
      </motion.button>
      <style jsx global>{`
        @keyframes logo-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: -300% center; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
