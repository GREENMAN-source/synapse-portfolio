'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Shield, Mail, Lock, User as UserIcon, ArrowRight, Home, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          setError(res.error);
        } else {
          router.push('/admin');
          router.refresh();
        }
      } else {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Signup failed');
        } else {
          await signIn('credentials', { email, password, redirect: false });
          router.push('/store');
          router.refresh();
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/admin' });
  };

  return (
    <div className="min-h-screen bg-[#030408] flex items-center justify-center relative overflow-hidden p-4 font-sans">
      {/* Cinematic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none"></div>

      <Link href="/" className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors z-20 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-white/30">
        <Home size={18} />
        <span className="font-mono text-xs uppercase tracking-widest">Return to Matrix</span>
      </Link>

      <div className="w-[90%] sm:w-[450px] min-w-[320px] shrink-0 relative z-10 mx-auto">
        <div className="bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-[0_20px_100px_rgba(0,229,255,0.05)] w-full">
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
              <Shield className="text-[#00E5FF]" size={32} />
            </div>
            <h1 className="font-display text-3xl font-bold text-white text-center tracking-tight">
              {isLogin ? 'Secure Access' : 'Initialize Protocol'}
            </h1>
            <p className="text-slate-400 text-sm mt-2 text-center">
              Enter your credentials to proceed into the Synapse Network.
            </p>
          </div>

          {/* Tab Toggle for Usability */}
          <div className="flex bg-white/5 p-1 rounded-xl mb-8 border border-white/5">
            <button
              type="button"
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isLogin ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isLogin ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Request Access
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm mb-6 text-center flex items-center justify-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-mono uppercase tracking-widest text-slate-500 mb-2 ml-1">Operative Name</label>
                <div className="relative group">
                  <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00E5FF] transition-colors" size={22} />
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-lg text-white placeholder-slate-600 focus:outline-none focus:border-[#00E5FF]/50 focus:bg-white/10 transition-all shadow-inner"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-mono uppercase tracking-widest text-slate-500 mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00E5FF] transition-colors" size={22} />
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-lg text-white placeholder-slate-600 focus:outline-none focus:border-[#00E5FF]/50 focus:bg-white/10 transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-mono uppercase tracking-widest text-slate-500 mb-2 ml-1">Passcode</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00E5FF] transition-colors" size={22} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-lg text-white placeholder-slate-600 focus:outline-none focus:border-[#00E5FF]/50 focus:bg-white/10 transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-[#00E5FF] text-black font-bold text-lg py-4 rounded-2xl hover:bg-[#00E5FF]/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? <Loader2 size={22} className="animate-spin" /> : (isLogin ? 'AUTHENTICATE' : 'ESTABLISH LINK')}
              {!loading && <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-white/10"></div>
            <span className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">OR OVERRIDE VIA</span>
            <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full mt-6 bg-white/5 border border-white/10 text-white font-bold text-lg py-4 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
