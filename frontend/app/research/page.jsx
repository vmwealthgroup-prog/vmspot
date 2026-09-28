'use client';

import { useState } from 'react';
import StockSearch from '@/components/StockSearch';
import TradingChart from '@/components/TradingChart';
import ScannerTable from '@/components/ScannerTable';

export default function ResearchPage() {
  const [activeSymbol, setActiveSymbol] = useState('BTCUSD');

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Market Research & Signal Dashboard
          </h1>
          <p className="text-sm text-slate-400">
            Real-time Technical Analysis, EMA Crossovers, and Charting Engine
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ● Live Feeds Connected
          </span>
        </div>
      </div>

      {/* Top Controls: Search Bar */}
      <StockSearch
        defaultSymbol={activeSymbol}
        onSelectSymbol={(symbol) => setActiveSymbol(symbol)}
      />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide on desktop): Chart Canvas */}
        <div className="lg:col-span-2 space-y-6">
          <TradingChart symbol={activeSymbol} />
        </div>

        {/* Right Column (1 Col wide on desktop): Active Scanner Table */}
        <div className="lg:col-span-1 space-y-6">
          <ScannerTable
            onSelectSymbol={(symbol) => setActiveSymbol(symbol)}
          />
        </div>
      </div>
    </main>
  );
}