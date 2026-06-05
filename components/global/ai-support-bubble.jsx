'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AiSupportBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([{ role: 'assistant', content: 'Bonjour ! Comment puis-je t\'aider sur VixLuxia aujourd\'hui ?' }]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChat([...chat, { role: 'user', content: message }, { role: 'assistant', content: 'L\'IA de support est en cours d\'activation finale sur le serveur. Nous vous répondrons très vite !' }]);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 rounded-2xl border border-border/50 bg-background shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
              <div className="flex items-center gap-2 font-bold">
                <Bot className="w-5 h-5" />
                Support VixLuxia IA
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="h-72 overflow-y-auto p-4 space-y-4 bg-muted/10">
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-3 py-2 rounded-xl text-sm max-w-[85%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted rounded-bl-sm'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSend} className="p-3 bg-background border-t border-border/50 flex gap-2">
              <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Écrivez un message..." className="flex-1 rounded-full bg-muted/50" />
              <Button type="submit" size="icon" className="rounded-full h-10 w-10 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-orange-400 text-white shadow-xl hover:shadow-primary/25 transition-shadow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
