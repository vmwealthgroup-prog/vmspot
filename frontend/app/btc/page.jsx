'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const TradingChart = dynamic(() => import('@/components/TradingChart'), { ssr: false });

export default function AdvancedBtcTerminal() {
  const [botActive, setBotActive] = useState(true);
  const [orderType, setOrderType] = useState('LIMIT');
  const [amount, setAmount] = useState('0.25');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center font-bold text-amber-400 text-lg">
            ₿
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white">BTC/USDT Strategy Lab</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                WebSocket Online
              </span>
            </div>
            <p className="text-xs text-slate-400">VM Algo Research Lab • Quantitative Execution Module</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono">
            <span className="text-slate-500">ENGINE:</span>
            <span className="text-amber-400 font-bold">5/20 EMA CROSS</span>
          </div>
          <button
            onClick={() => setBotActive(!botActive)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg ${
              botActive
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20'
            }`}
          >
            {botActive ? '● Bot Running' : '⏸ Bot Paused'}
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Analytics (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Live Index Price</div>
            <div className="text-3xl font-black text-white mt-1">$94,250.80</div>
            <div className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
              ▲ +3.42% <span className="text-slate-500 font-normal">(24h High: $94,500)</span>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl space-y-2">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Technical Indicators</div>
            <div className="flex justify-between text-xs py-1 border-b border-slate-800">
              <span className="text-slate-400">5 EMA</span>
              <span className="font-mono text-emerald-400">$94,180.00</span>
            </div>
            <div className="flex justify-between text-xs py-1 border-b border-slate-800">
              <span className="text-slate-400">20 EMA</span>
              <span className="font-mono text-amber-400">$93,850.00</span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-slate-400">RSI (14)</span>
              <span className="font-mono text-slate-200">62.4 (Bullish)</span>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Position</div>
            <div className="mt-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div className="flex justify-between items-center text-xs font-bold text-emerald-400">
                <span>LONG 0.25 BTC</span>
                <span>+$350.20 PnL</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Entry: $92,850.00 | Stop: $92,100.00</div>
            </div>
          </div>
        </div>

        {/* Center Chart (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Real-Time Canvas</h2>
            <div className="flex gap-1.5">
              <button className="px-2.5 py-1 text-xs bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30 rounded-lg">1m</button>
              <button className="px-2.5 py-1 text-xs bg-slate-800 text-slate-400 hover:text-white rounded-lg">5m</button>
              <button className="px-2.5 py-1 text-xs bg-slate-800 text-slate-400 hover:text-white rounded-lg">15m</button>
            </div>
          </div>

          <div className="my-3">
            <TradingChart />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500 pt-2 border-t border-slate-800">
            <span>Latency: <strong className="text-emerald-400">12ms</strong></span>
            <span>Feed: <strong className="text-slate-300">Binance Direct Stream</strong></span>
          </div>
        </div>

        {/* Right Order Execution Panel (3 cols) */}
        <div className="lg:col-span-3 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl space-y-4">
          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Manual Trade Execution</div>

          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            {['LIMIT', 'MARKET'].map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  orderType === type ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-[11px] text-slate-400 font-medium">Order Quantity (BTC)</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button className="py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all">
              BUY / LONG
            </button>
            <button className="py-3 bg-rose-500 hover:bg-rose-400 text-white font-black text-xs rounded-xl shadow-lg shadow-rose-500/20 transition-all">
              SELL / SHORT
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="text-[11px] text-slate-400 font-semibold">Live System Logs</div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-[10px] space-y-1 text-slate-400 h-28 overflow-y-auto">
              <div>[16:45:01] 5 EMA crossed 20 EMA UP</div>
              <div>[16:45:02] Order filled: 0.25 BTC @ 92,850</div>
              <div>[16:45:05] Trailing SL set to 92,100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}