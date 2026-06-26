import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/authOptions';
import { redirect } from 'next/navigation';
import { Activity, Users, Database, ShieldAlert, Terminal, Settings, Download, Plus, Home } from 'lucide-react';
import Link from 'next/link';
import SignOutButton from '../components/SignOutButton';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  if ((session?.user as any)?.role !== 'admin') {
    redirect('/store');
  }

  return (
    <div className="min-h-screen bg-[#030408] text-white p-6 md:p-12 relative overflow-hidden font-sans">
      {/* Background styling */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* TOP NAVBAR */}
        <nav className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-6">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white flex items-center gap-4 tracking-tight">
              <ShieldAlert className="text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]" size={40} />
              ADMIN MATRIX
            </h1>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm transition-colors border border-white/5">
              <Home size={16} /> Dashboard Home
            </Link>
            <SignOutButton />
          </div>
        </nav>

        {/* STATUS BAR */}
        <div className="flex flex-wrap items-center justify-between bg-white/5 rounded-xl border border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></div>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-300">Level 5 Clearance Verified</span>
          </div>
          <div className="font-mono text-xs text-slate-500">
            Current Operative: <span className="text-white font-bold">{session.user.name || session.user.email}</span>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center gap-2 bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-[#00E5FF] p-4 rounded-xl transition-all group">
            <Plus size={18} className="group-hover:scale-125 transition-transform" /> Add Operative
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white p-4 rounded-xl transition-all group">
            <Download size={18} className="group-hover:-translate-y-1 transition-transform" /> Export Logs
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white p-4 rounded-xl transition-all group">
            <Settings size={18} className="group-hover:rotate-90 transition-transform" /> Matrix Config
          </button>
          <button className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-xl transition-all group">
            <ShieldAlert size={18} className="group-hover:scale-110 transition-transform" /> Lockdown Protocol
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Stats */}
          <div className="col-span-1 md:col-span-2 bg-[#050505]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3 text-[#00E5FF]">
              <Activity size={24} /> Global Telemetry
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Active Nodes', value: '1,024', color: '#00E5FF' },
                { label: 'Operations/Sec', value: '45.2k', color: '#EC4899' },
                { label: 'Network Load', value: '88%', color: '#F7DF1E' },
                { label: 'Threat Level', value: 'Zero', color: '#10B981' }
              ].map((stat, i) => (
                <div key={i} className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-colors">
                  <div className="text-3xl font-display font-bold mb-2" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Fake Graph */}
            <div className="w-full h-48 mt-8 border-b border-l border-white/10 relative flex items-end justify-between px-2 pb-2">
              {[40, 60, 30, 80, 50, 90, 70, 100, 60, 85].map((h, i) => (
                <div key={i} className="w-[8%] bg-gradient-to-t from-[#00E5FF]/10 to-[#00E5FF]/40 hover:to-[#00E5FF]/80 transition-all rounded-t-md cursor-pointer" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>

          {/* User Management */}
          <div className="col-span-1 bg-[#050505]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold flex items-center gap-3 text-[#EC4899]">
                <Users size={24} /> Operatives
              </h2>
              <span className="bg-white/10 text-xs px-2 py-1 rounded-full font-mono">3 Active</span>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Dhanvanth L.P', role: 'Mega Admin', status: 'Online' },
                { name: 'Surya B', role: 'Editor', status: 'Idle' },
                { name: 'Hemanath', role: 'Social Mgr', status: 'Offline' }
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gradient-to-r from-white/5 to-transparent rounded-xl border border-white/5 hover:border-white/20 transition-all cursor-pointer">
                  <div>
                    <div className="text-sm font-bold text-white tracking-wide">{user.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase mt-1">{user.role}</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${user.status === 'Online' ? 'bg-[#10B981] text-[#10B981]' : user.status === 'Idle' ? 'bg-[#F7DF1E] text-[#F7DF1E]' : 'bg-slate-600 text-slate-600'}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Database Control */}
          <div className="col-span-1 md:col-span-3 bg-[#050505]/90 backdrop-blur-3xl border border-[#F7DF1E]/20 rounded-[2rem] p-8">
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3 text-[#F7DF1E]">
              <Database size={24} /> Database Operations Matrix
            </h2>
            <div className="bg-[#020202] rounded-2xl border border-white/10 p-6 font-mono text-sm shadow-inner overflow-x-auto">
              <div className="flex items-center gap-3 text-slate-500 mb-6 pb-4 border-b border-white/10">
                <Terminal size={18} /> <span className="uppercase tracking-widest text-xs">synapselab@root:~/db</span>
              </div>
              <p className="text-[#10B981] leading-relaxed">&gt; Connecting to production cluster...</p>
              <p className="text-[#10B981] leading-relaxed">&gt; Connection established securely.</p>
              <p className="text-[#00E5FF] mt-4 leading-relaxed">&gt; SELECT * FROM synapse_users WHERE role = 'admin'</p>
              <div className="mt-3 pl-4 border-l-2 border-white/10 text-slate-300">
                <pre className="text-xs leading-loose">{JSON.stringify({ 
                  id: "USR-001",
                  name: session.user.name || "Dhanvanth", 
                  email: session.user.email,
                  clearance: "Level 5 (MAX)",
                  status: "AUTHENTICATED"
                }, null, 2)}</pre>
              </div>
              <p className="text-[#F7DF1E] mt-6 flex items-center gap-2">
                <span className="w-2 h-4 bg-[#F7DF1E] animate-pulse inline-block"></span> Awaiting command override...
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
