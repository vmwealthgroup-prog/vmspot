'use client';

import { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';

export default function StockSearch({ onSelectSymbol, defaultSymbol = 'BTCUSD' }) {
  const [query, setQuery] = useState(defaultSymbol);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() && onSelectSymbol) {
      onSelectSymbol(query.toUpperCase().trim());
    }
  };

  const quickSelects = ['BTCUSD', 'ETHUSD', 'SOLUSD', 'TATA.NS', 'RELIANCE.NS'];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-3">
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ticker (e.g. BTCUSD, TATA.NS)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono uppercase"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg transition-colors flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          Analyze
        </button>
      </form>

      {/* Quick Select Chips */}
      <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
        <span className="font-semibold text-slate-500">Popular:</span>
        {quickSelects.map((symbol) => (
          <button
            key={symbol}
            onClick={() => {
              setQuery(symbol);
              if (onSelectSymbol) onSelectSymbol(symbol);
            }}
            className="px-2.5 py-1 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-md text-slate-300 transition-colors font-mono"
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );
}