'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function CopilotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/chat'
  });

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="lg"
              className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0 text-white hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] transition-all duration-300"
              onClick={() => setIsOpen(true)}
            >
              <Sparkles className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Vixluxia AI</h3>
                  <p className="text-[10px] text-zinc-400">Customize your components</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-zinc-400 hover:bg-white/10 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex h-[400px] flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center space-y-3 opacity-60">
                    <Sparkles className="h-8 w-8 text-purple-400" />
                    <p className="text-xs text-zinc-300">
                      Hi! I can help you customize this component. Try asking:<br/>
                      <span className="italic mt-2 block">"Change this button to red"</span>
                    </p>
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm ${
                          m.role === 'user'
                            ? 'bg-purple-600 text-white rounded-tr-sm'
                            : 'bg-white/10 text-zinc-100 rounded-tl-sm border border-white/5'
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-2 text-sm text-zinc-100 rounded-tl-sm border border-white/5">
                      <span className="flex space-x-1">
                        <span className="animate-bounce">•</span>
                        <span className="animate-bounce delay-100">•</span>
                        <span className="animate-bounce delay-200">•</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 bg-black/20 p-4">
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 pl-4"
                >
                  <input
                    className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask AI to customize..."
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="h-8 w-8 rounded-full bg-purple-600 p-0 text-white hover:bg-purple-500"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
