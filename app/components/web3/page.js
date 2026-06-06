"use client";

import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowDownUp, 
  Settings, 
  ChevronDown, 
  Activity, 
  Info, 
  X,
  Shield,
  Zap,
  Globe,
  Coins,
  Copy,
  ExternalLink
} from 'lucide-react';

export default function Web3ComponentsPage() {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Web3 Components
            </h1>
            <p className="text-zinc-400 mt-2">Beautiful, customizable UI elements for decentralized applications.</p>
          </div>
          <button 
            onClick={() => setIsWalletOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-6 py-3 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
          >
            <Wallet size={18} />
            Connect Wallet
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Token Swap Component */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <ArrowDownUp className="text-purple-400" />
              Token Swap
            </h2>
            
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-purple-500/10 blur-[60px] pointer-events-none rounded-full transition-opacity opacity-50 group-hover:opacity-100"></div>
              
              <div className="flex justify-between items-center mb-6 relative">
                <h3 className="font-medium text-lg">Swap</h3>
                <button className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-full">
                  <Settings size={20} />
                </button>
              </div>

              {/* Pay Section */}
              <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                <p className="text-sm text-zinc-400 mb-2">You pay</p>
                <div className="flex justify-between items-center gap-4">
                  <input 
                    type="number" 
                    placeholder="0.0"
                    value={amountIn}
                    onChange={(e) => setAmountIn(e.target.value)}
                    className="bg-transparent text-3xl font-medium outline-none w-full text-white placeholder:text-zinc-600"
                  />
                  <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs">E</div>
                    ETH
                    <ChevronDown size={16} className="text-zinc-400" />
                  </button>
                </div>
                <p className="text-xs text-zinc-500 mt-2">$0.00</p>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center -my-3 relative z-10">
                <button className="bg-zinc-800 border-4 border-zinc-900 hover:bg-zinc-700 p-2 rounded-xl transition-colors group/btn">
                  <ArrowDownUp size={16} className="text-zinc-300 group-hover/btn:rotate-180 transition-transform duration-300" />
                </button>
              </div>

              {/* Receive Section */}
              <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                <p className="text-sm text-zinc-400 mb-2">You receive</p>
                <div className="flex justify-between items-center gap-4">
                  <input 
                    type="number" 
                    placeholder="0.0"
                    value={amountOut}
                    onChange={(e) => setAmountOut(e.target.value)}
                    className="bg-transparent text-3xl font-medium outline-none w-full text-white placeholder:text-zinc-600"
                  />
                  <button className="flex items-center gap-2 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap border border-purple-500/30">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs text-white">U</div>
                    UNI
                    <ChevronDown size={16} className="text-purple-300" />
                  </button>
                </div>
                <p className="text-xs text-zinc-500 mt-2">$0.00</p>
              </div>

              {/* Swap Details */}
              <div className="mt-6 space-y-3 px-2">
                <div className="flex justify-between text-sm text-zinc-400">
                  <span className="flex items-center gap-1">Exchange rate <Info size={14} /></span>
                  <span>1 ETH = 1,245.3 UNI</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-400">
                  <span className="flex items-center gap-1">Network fee <Activity size={14} /></span>
                  <span className="text-zinc-300">~$4.20</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 py-4 rounded-xl font-medium transition-colors cursor-not-allowed">
                Connect Wallet to Swap
              </button>
            </div>
          </div>

          {/* Portfolio / Assets Component */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Coins className="text-blue-400" />
              Portfolio Stats
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors"></div>
                <p className="text-sm text-zinc-400 mb-1">Total Balance</p>
                <p className="text-3xl font-bold tracking-tight">$12,450.00</p>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="text-emerald-400 flex items-center bg-emerald-400/10 px-2 py-0.5 rounded-full">
                    +5.2%
                  </span>
                  <span className="text-zinc-500">24h</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
                <p className="text-sm text-zinc-400 mb-1">Network</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-xl font-bold">Ethereum</span>
                </div>
                <p className="mt-4 text-xs text-zinc-500 flex items-center gap-1">
                  <Zap size={12} className="text-yellow-400" /> 12 Gwei
                </p>
              </div>
            </div>

            {/* Asset List */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-2 backdrop-blur-xl">
              <div className="p-4 flex justify-between items-center border-b border-zinc-800">
                <h3 className="font-medium text-lg">Your Assets</h3>
                <button className="text-sm text-purple-400 hover:text-purple-300">View All</button>
              </div>
              
              <div className="flex flex-col">
                {[
                  { name: 'Ethereum', symbol: 'ETH', balance: '2.45', usd: '$8,450.20', icon: 'E', color: 'bg-blue-500' },
                  { name: 'USDC Coin', symbol: 'USDC', balance: '2,500.00', usd: '$2,500.00', icon: '$', color: 'bg-blue-400' },
                  { name: 'Uniswap', symbol: 'UNI', balance: '145.5', usd: '$1,500.00', icon: 'U', color: 'bg-purple-500' },
                ].map((asset, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors rounded-2xl group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${asset.color} rounded-full flex items-center justify-center font-bold text-white shadow-lg`}>
                        {asset.icon}
                      </div>
                      <div>
                        <p className="font-medium">{asset.name}</p>
                        <p className="text-sm text-zinc-500">{asset.balance} {asset.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{asset.usd}</p>
                      <p className="text-sm text-zinc-500 group-hover:text-purple-400 transition-colors">Trade</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Connect Modal Overlay */}
      {isWalletOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-xl font-bold">Connect Wallet</h2>
              <button 
                onClick={() => setIsWalletOpen(false)}
                className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {[
                { name: 'MetaMask', icon: '🦊', recommended: true },
                { name: 'WalletConnect', icon: '🔗' },
                { name: 'Coinbase Wallet', icon: '🛡️' },
                { name: 'Phantom', icon: '👻' },
              ].map((wallet, i) => (
                <button 
                  key={i}
                  className="w-full flex items-center justify-between p-4 rounded-2xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      {wallet.icon}
                    </div>
                    <span className="font-medium text-lg">{wallet.name}</span>
                  </div>
                  {wallet.recommended && (
                    <span className="text-xs font-medium px-2.5 py-1 bg-purple-500/20 text-purple-400 rounded-lg border border-purple-500/20">
                      Popular
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="p-6 bg-zinc-950/50 text-center text-sm text-zinc-500 border-t border-zinc-800">
              New to Ethereum? <a href="#" className="text-purple-400 hover:text-purple-300">Learn about wallets</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
