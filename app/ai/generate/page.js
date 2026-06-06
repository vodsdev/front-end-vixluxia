'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, Copy, Check } from 'lucide-react';

export default function GenerateComponentPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/generate',
    body: { mode: 'component' },
  });

  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Extract code block if AI returned markdown
  const extractCode = (content) => {
    if (!content) return '';
    const match = content.match(/```(?:jsx|tsx|javascript)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : content.trim();
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md px-6 py-4 flex items-center justify-between z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
            <Sparkles size={20} />
          </div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Prompt-to-Component
          </h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-8 custom-scrollbar pb-32">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-4 max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center border border-neutral-800 shadow-xl">
              <Sparkles size={32} className="text-indigo-400" />
            </div>
            <h2 className="text-2xl font-semibold text-neutral-200">What will you build today?</h2>
            <p className="text-sm">
              Describe the UI component you want, and the AI will generate strictly valid, production-ready React code styled with Tailwind CSS.
            </p>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-8">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role !== 'user' && (
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
                    <Sparkles size={14} />
                  </div>
                )}
                
                <div
                  className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                    m.role === 'user'
                      ? 'bg-neutral-800 text-neutral-100 rounded-br-none border border-neutral-700'
                      : 'bg-neutral-900 border border-neutral-800 rounded-tl-none w-full'
                  }`}
                >
                  {m.role === 'user' ? (
                    <p className="whitespace-pre-wrap text-sm">{m.content}</p>
                  ) : (
                    <div className="group relative">
                      <div className="flex items-center justify-between mb-3 border-b border-neutral-800 pb-2">
                        <span className="text-xs font-mono text-neutral-500">React Component</span>
                        <button
                          onClick={() => handleCopy(extractCode(m.content))}
                          className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors bg-neutral-800 px-2 py-1 rounded-md"
                        >
                          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                          {copied ? 'Copied!' : 'Copy Code'}
                        </button>
                      </div>
                      <pre className="overflow-x-auto text-sm font-mono text-emerald-400/90 custom-scrollbar p-2 rounded-lg bg-[#0d0d0d]">
                        <code>{extractCode(m.content)}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
                  <Sparkles size={14} />
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl rounded-tl-none p-4 flex items-center gap-3">
                  <Loader2 className="animate-spin text-indigo-400" size={16} />
                  <span className="text-sm text-neutral-400 animate-pulse">Generating component...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-end gap-2 bg-neutral-900 border border-neutral-700/50 rounded-2xl shadow-2xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50 transition-all"
          >
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="E.g., A modern pricing section with 3 tiers and a toggle for annual billing..."
              className="w-full max-h-48 min-h-[60px] bg-transparent text-neutral-100 placeholder:text-neutral-500 p-4 focus:outline-none resize-none custom-scrollbar"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (input?.trim()) handleSubmit(e);
                }
              }}
            />
            <div className="p-3">
              <button
                type="submit"
                disabled={isLoading || !input?.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white p-2.5 rounded-xl transition-colors flex items-center justify-center shadow-lg"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <span className="text-[11px] text-neutral-600">
              Press <kbd className="font-sans px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-400">Enter</kbd> to send, <kbd className="font-sans px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-400">Shift</kbd> + <kbd className="font-sans px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-400">Enter</kbd> for new line
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
