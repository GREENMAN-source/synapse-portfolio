'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-slate-300 hover:text-red-400 px-4 py-2 rounded-lg text-sm font-mono transition-all group"
    >
      <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
      TERMINATE SESSION
    </button>
  );
}
