'use client';

import { useEffect, useRef, useState } from 'react';
import { 
  createChart, 
  ColorType, 
  CandlestickSeries, 
  createSeriesMarkers 
} from 'lightweight-charts';

export default function RealtimeTradingChart({ symbol = 'BTCUSDT' }) {
  const chartContainerRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const markersRef = useRef([]); // Holds all historical + live markers
  const [lastSignal, setLastSignal] = useState(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 1. Initialize Lightweight Chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#090d16' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: '#1e293b' },
        horzLines: { color: '#1e293b' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 440,
    });

    // 2. Add Candlestick Series (Lightweight Charts v5 Syntax)
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    candlestickSeriesRef.current = candlestickSeries;

    // 3. Initial Historical Candles
    const initialCandles = [
      { time: '2026-09-20', open: 93100, high: 93500, low: 93000, close: 93400 },
      { time: '2026-09-21', open: 93400, high: 93800, low: 93200, close: 93600 },
      { time: '2026-09-22', open: 93600, high: 94000, low: 93500, close: 93900 },
      { time: '2026-09-23', open: 93900, high: 94200, low: 93700, close: 94050 },
    ];
    candlestickSeries.setData(initialCandles);

    // Initial Historical Markers
    markersRef.current = [
      {
        time: '2026-09-21',
        position: 'belowBar',
        color: '#10b981',
        shape: 'arrowUp',
        text: 'BUY @ 93,600',
      },
    ];
    createSeriesMarkers(candlestickSeries, markersRef.current);

    // 4. Setup WebSocket Connection
    const ws = new WebSocket('ws://localhost:8000/ws/signals');

    ws.onopen = () => {
      console.log('Connected to Algo Signal WebSocket');
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data); 
        // Expected payload structure from FastAPI:
        // { type: "SIGNAL", symbol: "BTCUSDT", signal: "BUY" | "SELL", price: 94250, time: "2026-09-23" }

        if (payload.type === 'CANDLE_UPDATE' && payload.candle) {
          // Update live candle bar
          candlestickSeriesRef.current?.update(payload.candle);
        }

        if (payload.type === 'SIGNAL' && payload.signal) {
          const isBuy = payload.signal === 'BUY';

          const newMarker = {
            time: payload.time, // Unix timestamp in seconds or 'YYYY-MM-DD'
            position: isBuy ? 'belowBar' : 'aboveBar',
            color: isBuy ? '#10b981' : '#ef4444',
            shape: isBuy ? 'arrowUp' : 'arrowDown',
            text: `${payload.signal} @ ₹${payload.price}`,
          };

          // Append to markers array and refresh markers on chart
          markersRef.current = [...markersRef.current, newMarker];
          
          if (candlestickSeriesRef.current) {
            createSeriesMarkers(candlestickSeriesRef.current, markersRef.current);
          }

          setLastSignal(payload);
        }
      } catch (err) {
        console.error('WebSocket parsing error:', err);
      }
    };

    ws.onerror = (err) => console.error('WebSocket Error:', err);

    // Resize handler
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      ws.close();
      chart.remove();
    };
  }, [symbol]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-sm font-bold text-white font-mono">{symbol} Live Feed</h3>
        </div>

        {lastSignal && (
          <div className={`px-3 py-1 rounded-lg text-xs font-bold font-mono border ${
            lastSignal.signal === 'BUY'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
          }`}>
            Latest Signal: {lastSignal.signal} @ ₹{lastSignal.price}
          </div>
        )}
      </div>

      <div ref={chartContainerRef} className="w-full h-[440px] rounded-xl overflow-hidden" />
    </div>
  );
}