import React from 'react';
import { products } from '../data/products';
import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle } from 'lucide-react';
import CheckoutForm from './CheckoutForm';

export const dynamic = 'force-dynamic';

export default function CheckoutPage({ searchParams }: { searchParams: { id?: string } }) {
  const productId = searchParams.id;
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#030408] text-white flex flex-col items-center justify-center p-4">
        <AlertTriangle size={64} className="text-red-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-display font-bold mb-4">ASSET NOT FOUND</h1>
        <p className="text-slate-400 font-mono mb-8">The requested item does not exist in the Matrix.</p>
        <Link href="/" className="bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-xl font-mono text-sm transition-all">
          Return to Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030408] text-white p-4 md:p-12 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div 
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none opacity-20"
        style={{ backgroundColor: product.color }}
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <Link href="/#store" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowLeft size={18} />
            </div>
            <span className="font-mono text-sm tracking-widest uppercase">Abort Transaction</span>
          </Link>
          
          <div className="flex items-center gap-2 text-green-500 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <Shield size={16} />
            <span className="font-mono text-xs tracking-widest uppercase">256-Bit Encrypted</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Product Details Section */}
          <div className="flex flex-col">
            <div className="font-mono text-sm tracking-widest mb-4 border border-white/20 inline-block px-3 py-1 rounded-full w-max" style={{ color: product.color }}>
              ASSET: {product.id}
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              {product.name}
            </h1>
            
            <p className="text-xl text-slate-400 leading-relaxed mb-12">
              {product.desc}
            </p>

            <div className="mt-auto bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-md">
              <h3 className="font-mono text-slate-400 mb-6 uppercase tracking-widest text-sm">Order Summary</h3>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-300">Base Configuration</span>
                <span className="font-mono">{product.price}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-300">Network Telemetry Setup</span>
                <span className="font-mono text-green-400">Included</span>
              </div>
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
                <span className="text-slate-300">Global Routing Taxes</span>
                <span className="font-mono">$0.00</span>
              </div>
              
              <div className="flex justify-between items-end">
                <span className="font-display text-2xl text-white">Total Due</span>
                <span className="font-display text-5xl font-bold" style={{ color: product.color }}>
                  {product.price}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Checkout Form */}
          <div className="flex items-center justify-center">
             <CheckoutForm product={product} />
          </div>

        </div>
      </div>
    </div>
  );
}
