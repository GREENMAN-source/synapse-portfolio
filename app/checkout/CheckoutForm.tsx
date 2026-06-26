'use client';

import React, { useState } from 'react';
import { CreditCard, Wallet, Fingerprint, Loader2, CheckCircle2, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutForm({ product }: { product: any }) {
  const [method, setMethod] = useState<'card' | 'crypto'>('card');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleAcquire = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Mock processing delay
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      
      // Auto redirect after success
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }, 2500);
  };

  if (success) {
    return (
      <div className="w-full bg-[#0a0a0a]/90 backdrop-blur-3xl border border-green-500/30 rounded-[2.5rem] p-12 shadow-[0_0_100px_rgba(34,197,94,0.15)] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 rounded-full border-4 border-green-500 animate-ping opacity-20"></div>
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h2 className="font-display text-4xl font-bold text-white mb-4">TRANSACTION<br/>VERIFIED</h2>
        <p className="text-slate-400 font-mono mb-8">Access codes and physical tracking data have been dispatched to your secure comms channel.</p>
        <div className="text-sm font-mono text-slate-500 flex items-center gap-2">
          <Loader2 size={14} className="animate-spin" /> Routing back to Matrix...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_100px_rgba(0,0,0,0.5)]">
      
      {/* Payment Method Tabs */}
      <div className="flex bg-white/5 p-1 rounded-2xl mb-10 border border-white/5">
        <button
          type="button"
          onClick={() => setMethod('card')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${method === 'card' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <CreditCard size={18} /> FIAT CARD
        </button>
        <button
          type="button"
          onClick={() => setMethod('crypto')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${method === 'crypto' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Wallet size={18} /> CRYPTO WALLET
        </button>
      </div>

      <form onSubmit={handleAcquire} className="space-y-6">
        
        {method === 'card' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 ml-1">Cardholder Name</label>
              <input
                type="text"
                placeholder="JOHN DOE"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-lg text-white placeholder-slate-600 focus:outline-none focus:border-white/30 transition-all font-mono uppercase"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 ml-1">Card Number</label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-lg text-white placeholder-slate-600 focus:outline-none focus:border-white/30 transition-all font-mono tracking-widest"
                required
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 ml-1">Valid Thru</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-lg text-white placeholder-slate-600 focus:outline-none focus:border-white/30 transition-all font-mono tracking-widest text-center"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 ml-1">CVV</label>
                <input
                  type="password"
                  placeholder="•••"
                  maxLength={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-lg text-white placeholder-slate-600 focus:outline-none focus:border-white/30 transition-all font-mono tracking-widest text-center"
                  required
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-500/20 rounded-full flex items-center justify-center">
                 <Wallet size={24} className="text-orange-500" />
              </div>
              <h4 className="font-display text-white text-xl mb-2">Connect Web3 Wallet</h4>
              <p className="text-slate-400 text-sm mb-6">Metamask, Phantom, or WalletConnect supported on the Synapse network.</p>
              <button type="button" className="bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl font-bold transition-all w-full border border-white/10">
                LINK WALLET
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={processing}
          className="w-full mt-8 text-black font-bold text-lg py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-70 disabled:hover:scale-100 relative overflow-hidden group"
          style={{ backgroundColor: product.color, boxShadow: `0 10px 40px ${product.color}40` }}
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative z-10 flex items-center gap-2">
            {processing ? (
              <>
                <Loader2 size={24} className="animate-spin" /> ESTABLISHING SECURE HANDSHAKE...
              </>
            ) : (
              <>
                <Fingerprint size={24} /> CONFIRM ACQUISITION
              </>
            )}
          </span>
        </button>

      </form>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-slate-500 text-xs font-mono uppercase tracking-widest">
        <Shield size={14} /> Synapse Lab Encrypted Gateway
      </div>
    </div>
  );
}
