'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'BTC Terminal', path: '/btc' },
    { name: 'NIFTY / BankNifty', path: '/indian-markets' },
    { name: 'EMA Scanner', path: '/scanner' },
    { name: 'Research Lab', path: '/research' },
  ];

  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shadow-amber-500/20">
            VM
          </div>
          <span className="font-extrabold text-lg text-white tracking-tight">
            ALGO <span className="text-amber-400">RESEARCH</span>
          </span>
        </Link>
        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700 font-mono">
          v2.4
        </span>
      </div>

      {/* Main Nav Links */}
      <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                isActive
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Engine Status & Execution Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Python Engine Active
        </div>
        <button className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md shadow-amber-500/20">
          Live Algo Signals
        </button>
      </div>
    </header>
  );
}