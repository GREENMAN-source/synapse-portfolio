'use client';
import { useEffect, useState } from 'react';
import { Shield, CheckCircle2, XCircle, Clock, Trash2, Plus, Calendar, Type, FileText, Palette, Video, Link as LinkIcon, User } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'updates' | 'shorts'>('orders');
  
  const [orders, setOrders] = useState<any[]>([]);
  const [updates, setUpdates] = useState<any[]>([]);
  const [shorts, setShorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Forms states
  const [updateForm, setUpdateForm] = useState({ year: '', title: '', description: '', color: '#00E5FF' });
  const [shortForm, setShortForm] = useState({ platform: 'YouTube', embedUrl: '', handle: '@synapselab' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Orders
      const resOrders = await fetch('/api/admin/orders');
      const dataOrders = await resOrders.json();
      if (dataOrders.success) setOrders(dataOrders.orders);

      // Fetch Updates
      const resUpdates = await fetch('/api/admin/updates');
      const dataUpdates = await resUpdates.json();
      if (dataUpdates.success) setUpdates(dataUpdates.updates);

      // Fetch Shorts
      const resShorts = await fetch('/api/admin/shorts');
      const dataShorts = await resShorts.json();
      if (dataShorts.success) setShorts(dataShorts.shorts);

    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
      }
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const createUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateForm)
      });
      const data = await res.json();
      if (data.success) {
        setUpdates([{ _id: data.id, ...updateForm }, ...updates]);
        setUpdateForm({ year: '', title: '', description: '', color: '#00E5FF' });
      }
    } catch (error) {
      console.error('Failed to create update:', error);
    }
  };

  const deleteUpdate = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/updates?id=${id}`, { method: 'DELETE' });
      if (res.ok) setUpdates(updates.filter(u => u._id !== id));
    } catch (error) {
      console.error('Failed to delete update:', error);
    }
  };

  const createShort = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/shorts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shortForm)
      });
      const data = await res.json();
      if (data.success) {
        setShorts([{ _id: data.id, ...shortForm }, ...shorts]);
        setShortForm({ platform: 'YouTube', embedUrl: '', handle: '@synapselab' });
      }
    } catch (error) {
      console.error('Failed to create short:', error);
    }
  };

  const deleteShort = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/shorts?id=${id}`, { method: 'DELETE' });
      if (res.ok) setShorts(shorts.filter(s => s._id !== id));
    } catch (error) {
      console.error('Failed to delete short:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#030408] text-white flex items-center justify-center font-mono">Loading CMS Network...</div>;
  }

  return (
    <main className="min-h-screen bg-[#030408] text-white font-mono flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#050505] border-r border-white/10 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-12">
          <Shield size={32} className="text-[#00E5FF]" />
          <h1 className="text-xl font-bold font-display uppercase tracking-wider leading-tight">Synapse<br/>CMS</h1>
        </div>
        
        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`text-left px-4 py-3 rounded uppercase text-sm font-bold tracking-widest transition-colors ${activeTab === 'orders' ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('updates')}
            className={`text-left px-4 py-3 rounded uppercase text-sm font-bold tracking-widest transition-colors ${activeTab === 'updates' ? 'bg-[#EC4899]/10 text-[#EC4899] border border-[#EC4899]/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            Timeline
          </button>
          <button 
            onClick={() => setActiveTab('shorts')}
            className={`text-left px-4 py-3 rounded uppercase text-sm font-bold tracking-widest transition-colors ${activeTab === 'shorts' ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            Shorts
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'orders' && (
          <div className="max-w-6xl">
            <h2 className="text-2xl font-display font-bold uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Payment & Order Verification</h2>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/50 border-b border-white/10 uppercase text-slate-400 text-xs">
                  <tr>
                    <th className="px-6 py-4">Target Asset</th>
                    <th className="px-6 py-4">Client Data</th>
                    <th className="px-6 py-4">FamApp Transaction ID</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">No orders found.</td></tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order._id} className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4">
                          <div className="font-bold text-[#00E5FF]">{order.serviceName || order.Target_Asset}</div>
                          <div className="text-slate-400 text-xs mt-1">{order.amount || order.Asset_Value}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-white font-medium">{order.name || order.Full_Name}</div>
                          <div className="text-slate-400 text-xs mt-1">{order.email || order.Email_Address}</div>
                          <div className="text-slate-500 text-xs mt-0.5">{order.phone || order.Phone_Number}</div>
                        </td>
                        <td className="px-6 py-4">
                          {order.method === 'FamApp' || order.Payment_Method === 'FamApp Transfer' ? (
                            <div className="inline-flex items-center gap-2 bg-[#00E5FF]/10 text-[#00E5FF] px-3 py-1 rounded border border-[#00E5FF]/20 font-mono text-xs">
                              {order.transactionId || order.FamApp_Transaction_ID || 'N/A'}
                            </div>
                          ) : (
                            <div className="text-slate-500 text-xs uppercase tracking-widest">{order.method || order.Payment_Method}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {order.status === 'pending_verification' ? (
                            <span className="flex items-center gap-2 text-[#FFD814] text-xs font-bold uppercase tracking-wider"><Clock size={14} /> Pending</span>
                          ) : order.status === 'verified' ? (
                            <span className="flex items-center gap-2 text-[#10B981] text-xs font-bold uppercase tracking-wider"><CheckCircle2 size={14} /> Verified</span>
                          ) : order.status === 'rejected' ? (
                            <span className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider"><XCircle size={14} /> Rejected</span>
                          ) : (
                            <span className="text-slate-400 text-xs uppercase tracking-wider">{order.status || 'Processing'}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {order.status === 'pending_verification' && (
                              <>
                                <button onClick={() => updateOrderStatus(order._id, 'verified')} className="text-[#10B981] border border-[#10B981]/30 px-3 py-1.5 rounded text-xs font-bold uppercase">Verify</button>
                                <button onClick={() => updateOrderStatus(order._id, 'rejected')} className="text-red-500 border border-red-500/30 px-3 py-1.5 rounded text-xs font-bold uppercase">Reject</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'updates' && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-display font-bold uppercase tracking-widest mb-8 border-b border-white/10 pb-4 text-[#EC4899]">Timeline Updates</h2>
            
            <form onSubmit={createUpdate} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl mb-8 grid grid-cols-2 gap-4">
              <h3 className="col-span-2 text-sm text-slate-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-2"><Plus size={16}/> New Timeline Milestone</h3>
              <div>
                <label className="text-xs text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-1"><Calendar size={12}/> Year</label>
                <input required type="text" value={updateForm.year} onChange={e => setUpdateForm({...updateForm, year: e.target.value})} placeholder="e.g. 2026" className="w-full bg-black border border-white/10 p-2 text-sm text-white rounded outline-none focus:border-[#EC4899]" />
              </div>
              <div>
                <label className="text-xs text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-1"><Type size={12}/> Title</label>
                <input required type="text" value={updateForm.title} onChange={e => setUpdateForm({...updateForm, title: e.target.value})} placeholder="e.g. Offensive Security" className="w-full bg-black border border-white/10 p-2 text-sm text-white rounded outline-none focus:border-[#EC4899]" />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-1"><FileText size={12}/> Description</label>
                <textarea required value={updateForm.description} onChange={e => setUpdateForm({...updateForm, description: e.target.value})} placeholder="Entered the world of ethical hacking..." rows={2} className="w-full bg-black border border-white/10 p-2 text-sm text-white rounded outline-none focus:border-[#EC4899]"></textarea>
              </div>
              <div className="col-span-2 flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-500 uppercase tracking-widest flex items-center gap-2"><Palette size={12}/> Color Accent:</label>
                  <select value={updateForm.color} onChange={e => setUpdateForm({...updateForm, color: e.target.value})} className="bg-black border border-white/10 p-1.5 text-xs text-white rounded outline-none">
                    <option value="#00E5FF">Cyan (#00E5FF)</option>
                    <option value="#EC4899">Pink (#EC4899)</option>
                    <option value="#10B981">Green (#10B981)</option>
                    <option value="#F7DF1E">Yellow (#F7DF1E)</option>
                  </select>
                </div>
                <button type="submit" className="bg-[#EC4899] hover:bg-[#EC4899]/80 text-black px-6 py-2 rounded text-sm font-bold uppercase tracking-wider">Publish Milestone</button>
              </div>
            </form>

            <div className="space-y-4">
              {updates.map(update => (
                <div key={update._id} className="bg-[#050505] border border-white/5 p-4 rounded-lg flex items-center justify-between group">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-3 h-3 rounded-full" style={{ backgroundColor: update.color || '#00E5FF' }}></div>
                    <div>
                      <div className="text-xs font-bold tracking-widest mb-1" style={{ color: update.color || '#00E5FF' }}>{update.year}</div>
                      <h4 className="font-bold text-white text-lg">{update.title}</h4>
                      <p className="text-slate-400 text-sm mt-1">{update.description}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteUpdate(update._id)} className="text-red-500/50 hover:text-red-500 transition-colors p-2"><Trash2 size={18} /></button>
                </div>
              ))}
              {updates.length === 0 && <p className="text-slate-500">No updates found.</p>}
            </div>
          </div>
        )}

        {activeTab === 'shorts' && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-display font-bold uppercase tracking-widest mb-8 border-b border-white/10 pb-4 text-[#10B981]">Shorts Showcase</h2>
            
            <form onSubmit={createShort} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-xl mb-8 grid grid-cols-2 gap-4">
              <h3 className="col-span-2 text-sm text-slate-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-2"><Plus size={16}/> Embed New Media</h3>
              <div>
                <label className="text-xs text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-1"><Video size={12}/> Platform</label>
                <select value={shortForm.platform} onChange={e => setShortForm({...shortForm, platform: e.target.value})} className="w-full bg-black border border-white/10 p-2 text-sm text-white rounded outline-none focus:border-[#10B981]">
                  <option value="YouTube">YouTube Short</option>
                  <option value="Instagram">Instagram Reel</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-1"><User size={12}/> Display Handle</label>
                <input required type="text" value={shortForm.handle} onChange={e => setShortForm({...shortForm, handle: e.target.value})} placeholder="@username" className="w-full bg-black border border-white/10 p-2 text-sm text-white rounded outline-none focus:border-[#10B981]" />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-1"><LinkIcon size={12}/> Embed URL</label>
                <input required type="url" value={shortForm.embedUrl} onChange={e => setShortForm({...shortForm, embedUrl: e.target.value})} placeholder="e.g. https://www.youtube.com/embed/..." className="w-full bg-black border border-white/10 p-2 text-sm text-white rounded outline-none focus:border-[#10B981]" />
                <p className="text-[10px] text-slate-500 mt-1">Make sure to provide the actual embed URL (like /embed/video_id), not the regular watch URL.</p>
              </div>
              <div className="col-span-2 flex justify-end mt-2">
                <button type="submit" className="bg-[#10B981] hover:bg-[#10B981]/80 text-black px-6 py-2 rounded text-sm font-bold uppercase tracking-wider">Embed Short</button>
              </div>
            </form>

            <div className="grid grid-cols-2 gap-4">
              {shorts.map(short => (
                <div key={short._id} className="bg-[#050505] border border-white/5 rounded-lg overflow-hidden group relative">
                  <div className="aspect-[9/16] relative bg-black">
                    <iframe src={short.embedUrl} title="Embed" className="absolute inset-0 w-full h-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
                    <button onClick={() => deleteShort(short._id)} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 size={16} /></button>
                  </div>
                  <div className="p-3 bg-[#0a0a0a] border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase text-slate-400">{short.platform}</span>
                    <span className="text-xs font-mono text-white">{short.handle}</span>
                  </div>
                </div>
              ))}
              {shorts.length === 0 && <p className="text-slate-500 col-span-2">No shorts embedded.</p>}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
