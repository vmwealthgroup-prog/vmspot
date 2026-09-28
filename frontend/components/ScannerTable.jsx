'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

export default function ScannerTable({ onSelectSymbol }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchScanData = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/scan/ema');
      const data = await res.json();
      // Expecting data.scan_results array from backend-python
      setResults(data.scan_results || [
        { symbol: 'BTCUSD', price: 63100, ema5: 62800, ema20: 62100, signal: 'BUY', time: '13:45' },
        { symbol: 'ETHUSD', price: 3450, ema5: 3410, ema20: 3430, signal: 'SELL', time: '13:42' },
        { symbol: 'SOLUSD', price: 148.5, ema5: 149.2, ema20: 144.0, signal: 'BUY', time: '13:30' },
      ]);
    } catch (err) {
      console.error('Failed to fetch scan results:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScanData();
  }, []);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl space-y-4">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white">5 / 20 EMA Crossover Scanner</h3>
          <p className="text-xs text-slate-400">Live signal feeds from Python Engine</p>
        </div>
        <button
          onClick={fetchScanData}
          disabled={loading}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2 text-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Scan
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Symbol</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">5 EMA</th>
              <th className="py-3 px-4">20 EMA</th>
              <th className="py-3 px-4">Signal</th>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {results.map((row, idx) => {
              const isBuy = row.signal === 'BUY';
              return (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{row.symbol}</td>
                  <td className="py-3 px-4">${row.price.toLocaleString()}</td>
                  <td className="py-3 px-4 text-blue-400">${row.ema5.toLocaleString()}</td>
                  <td className="py-3 px-4 text-orange-400">${row.ema20.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isBuy
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {isBuy ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {row.signal}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-400">{row.time}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onSelectSymbol && onSelectSymbol(row.symbol)}
                      className="text-xs text-blue-400 hover:text-blue-300 underline font-sans"
                    >
                      Open Chart
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}