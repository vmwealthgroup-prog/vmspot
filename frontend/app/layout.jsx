import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'VM Algo Research Lab | Professional Trading Platform',
  description: 'Real-time technical analysis, automated 5/20 EMA scanner, and quantitative trading engine.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}