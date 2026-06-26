import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/authOptions';
import { ShoppingCart, Cpu, Package, Zap } from 'lucide-react';
import Link from 'next/link';

const products = [
  {
    id: 'PRD-01',
    name: 'Synapse Core Dev Kit',
    price: 499,
    category: 'Hardware',
    icon: Cpu,
    color: '#00E5FF',
    desc: 'The official bare-metal development kit used internally at Synapse Lab. Features integrated AI telemetry.'
  },
  {
    id: 'PRD-02',
    name: 'Operative Hoodie',
    price: 89,
    category: 'Apparel',
    icon: Package,
    color: '#EC4899',
    desc: 'Heavyweight ultra-premium cotton blend hoodie with the embroidered Synapse Lab insignia.'
  },
  {
    id: 'PRD-03',
    name: 'Neural Network API Key',
    price: 199,
    category: 'Digital',
    icon: Zap,
    color: '#F7DF1E',
    desc: 'Enterprise-grade access to our proprietary computer vision and robotics API endpoints.'
  }
];

export default async function StorePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-[#030408] text-white pt-24 pb-12 px-8 md:px-12 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00E5FF]/10 via-[#030408] to-[#030408] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-2">
              The Supply Grid.
            </h1>
            <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
              Official Synapse Lab Hardware & Assets
            </p>
          </div>
          
          <div className="mt-8 md:mt-0 flex items-center gap-6">
            {!session ? (
              <Link href="/login" className="bg-white/5 border border-white/20 px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                Initialize Connection (Login)
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{session.user?.name || session.user?.email}</div>
                  <div className="text-xs font-mono text-[#00E5FF]">Clearance: {session.user?.role?.toUpperCase()}</div>
                </div>
                {session.user?.role === 'admin' && (
                  <Link href="/admin" className="bg-[#00E5FF]/20 border border-[#00E5FF]/50 text-[#00E5FF] px-4 py-2 rounded-lg font-mono text-xs hover:bg-[#00E5FF]/30 transition-colors">
                    Admin Matrix
                  </Link>
                )}
                <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-colors relative">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#EC4899] text-xs flex items-center justify-center rounded-full font-bold">0</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full" style={{ boxShadow: `0 0 0px ${product.color}00` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 20px 80px ${product.color}15`;
              e.currentTarget.style.borderColor = `${product.color}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0px ${product.color}00`;
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}>
              
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${product.color}15`, border: `1px solid ${product.color}40` }}>
                <product.icon color={product.color} size={32} />
              </div>
              
              <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: product.color }}>
                {product.category} // {product.id}
              </div>
              
              <h3 className="font-display text-3xl font-bold text-white mb-4">{product.name}</h3>
              
              <p className="text-slate-400 text-sm leading-relaxed flex-grow mb-8">
                {product.desc}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                <div className="font-display text-3xl font-bold text-white">
                  ${product.price}<span className="text-sm text-slate-500 ml-1">.00</span>
                </div>
                <button className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform" style={{ backgroundColor: product.color }}>
                  ACQUIRE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
