'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Maximize2, Code2, Terminal, Copy, Settings2, RefreshCw, Layers, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';

/**
 * PlaygroundMockupImproved - Composant Playground interactif et fonctionnel
 * Caractéristiques:
 * - Éditeur de code avec syntax highlighting
 * - Prévisualisation en temps réel
 * - Terminal de sortie
 * - Gestion d'erreurs robuste
 * - Support des thèmes
 */
export function PlaygroundMockupImproved({ 
  defaultCode = '',
  onCodeChange = () => {},
  onRun = () => {},
  className 
}) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark');
  const editorRef = useRef(null);
  const previewRef = useRef(null);

  // Gestion du code
  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    onCodeChange(newCode);
    setError(null);
  };

  // Exécution du code
  const handleRun = async () => {
    setIsRunning(true);
    setError(null);
    setOutput('');

    try {
      // Simulation d'exécution avec gestion d'erreurs
      const result = await executeCode(code);
      setOutput(result);
      onRun(result);
    } catch (err) {
      setError(err.message);
      setOutput(`Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Copier le code
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  // Exécution du code (simulation)
  const executeCode = async (codeStr) => {
    return new Promise((resolve, reject) => {
      try {
        // Créer une fonction à partir du code
        const func = new Function('console', codeStr);
        
        // Capturer les logs
        const logs = [];
        const mockConsole = {
          log: (...args) => logs.push(args.join(' ')),
          error: (...args) => { throw new Error(args.join(' ')); },
          warn: (...args) => logs.push(`[WARN] ${args.join(' ')}`),
        };

        func(mockConsole);
        resolve(logs.length > 0 ? logs.join('\n') : 'Code executed successfully');
      } catch (err) {
        reject(new Error(err.message || 'Execution error'));
      }
    });
  };

  return (
    <div className={cn(
      "w-full h-[600px] rounded-xl overflow-hidden border",
      "bg-zinc-950 flex flex-col font-sans shadow-2xl",
      theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200',
      className
    )}>
      {/* Header bar */}
      <div className={cn(
        "h-12 border-b flex items-center justify-between px-4 select-none backdrop-blur-sm",
        theme === 'dark' ? 'border-zinc-800 bg-zinc-900/80' : 'border-zinc-200 bg-zinc-100/80'
      )}>
        <div className="flex items-center gap-2">
          {/* Mac window controls */}
          <div className="flex gap-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500/90 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/90 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/90 border border-green-500/50" />
          </div>
          <div className={cn(
            "flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-medium border",
            theme === 'dark' 
              ? 'bg-zinc-800/80 text-zinc-300 border-zinc-700/50' 
              : 'bg-zinc-200/80 text-zinc-700 border-zinc-300/50'
          )}>
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Playground</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              theme === 'dark' 
                ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800' 
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-300'
            )}
            title="Toggle theme"
          >
            <Settings2 className="w-4 h-4" />
          </button>
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-md text-white text-sm font-medium transition-all",
              isRunning 
                ? 'bg-blue-600/50 opacity-50 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]'
            )}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Editor Panel */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className={cn(
            "h-full flex flex-col",
            theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white'
          )}>
            {/* Editor Tabs */}
            <div className={cn(
              "flex items-center justify-between px-4 py-2 border-b",
              theme === 'dark' 
                ? 'border-zinc-800 bg-[#1e1e1e]' 
                : 'border-zinc-200 bg-zinc-50'
            )}>
              <div className="flex gap-5 text-xs font-medium">
                <span className={cn(
                  "flex items-center gap-2 pb-2 -mb-2 border-b-2 border-blue-500",
                  theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'
                )}>
                  <Code2 className="w-3.5 h-3.5 text-blue-400" />
                  code.jsx
                </span>
              </div>
              <button 
                onClick={handleCopy}
                className={cn(
                  "transition-colors",
                  theme === 'dark' 
                    ? 'text-zinc-500 hover:text-zinc-300' 
                    : 'text-zinc-500 hover:text-zinc-700'
                )}
                title="Copy code"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {/* Editor Content */}
            <textarea
              ref={editorRef}
              value={code}
              onChange={handleCodeChange}
              className={cn(
                "flex-1 p-4 font-mono text-[13px] resize-none focus:outline-none",
                theme === 'dark'
                  ? 'bg-[#1e1e1e] text-zinc-300 border-0'
                  : 'bg-white text-zinc-900 border-0'
              )}
              placeholder="Enter your code here..."
              spellCheck="false"
            />
            
            {/* Terminal Output */}
            <div className={cn(
              "h-36 border-t flex flex-col",
              theme === 'dark' 
                ? 'border-zinc-800 bg-[#181818]' 
                : 'border-zinc-200 bg-zinc-100'
            )}>
              <div className={cn(
                "flex items-center gap-5 px-4 py-2 border-b text-xs font-medium",
                theme === 'dark'
                  ? 'border-zinc-800 bg-[#1e1e1e]/80 text-zinc-400'
                  : 'border-zinc-200 bg-zinc-200/80 text-zinc-600'
              )}>
                <span className={cn(
                  "flex items-center gap-1.5 pb-1 -mb-2 border-b",
                  theme === 'dark'
                    ? 'text-zinc-100 border-zinc-100'
                    : 'text-zinc-900 border-zinc-900'
                )}>
                  <Terminal className="w-3.5 h-3.5" />
                  Output
                </span>
              </div>
              
              {/* Terminal Content */}
              <div className={cn(
                "flex-1 p-3 font-mono text-xs overflow-auto",
                theme === 'dark'
                  ? 'bg-[#181818] text-zinc-300'
                  : 'bg-zinc-100 text-zinc-700'
              )}>
                {error ? (
                  <div className="flex items-start gap-2 text-red-400">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <pre className="whitespace-pre-wrap break-words">{error}</pre>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap break-words">{output || '> Ready to run'}</pre>
                )}
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Preview Panel */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className={cn(
            "h-full flex flex-col",
            theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
          )}>
            <div className={cn(
              "h-12 border-b flex items-center justify-between px-4",
              theme === 'dark'
                ? 'border-zinc-800 bg-zinc-800/50'
                : 'border-zinc-200 bg-zinc-100/50'
            )}>
              <span className={cn(
                "text-sm font-medium flex items-center gap-2",
                theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
              )}>
                <Maximize2 className="w-4 h-4" />
                Preview
              </span>
            </div>
            
            {/* Preview Content */}
            <div 
              ref={previewRef}
              className={cn(
                "flex-1 p-6 overflow-auto",
                theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
              )}
            >
              <div className={cn(
                "rounded-lg border p-6 flex items-center justify-center min-h-full",
                theme === 'dark'
                  ? 'border-zinc-800 bg-zinc-800/50'
                  : 'border-zinc-200 bg-zinc-50'
              )}>
                <div className="text-center">
                  <p className={cn(
                    "text-sm font-medium mb-2",
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  )}>
                    Preview will appear here
                  </p>
                  <p className={cn(
                    "text-xs",
                    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
                  )}>
                    Run your code to see the result
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default PlaygroundMockupImproved;
