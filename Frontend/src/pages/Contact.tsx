import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles, Twitter, Github, Disc as Discord, LifeBuoy, Users, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Synchronization complete. Aura will reach out to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <Navbar />

      {/* ─── INTENSE LIQUID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-30 dark:opacity-50" style={{ width: '80vw', height: '80vw', top: '-15%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 50%, #9333ea 100%)' }} />
        <div className="liquid-blob absolute opacity-20 dark:opacity-30" style={{ width: '60vw', height: '60vw', bottom: '-10%', right: '-5%', animationDelay: '-5s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)' }} />
      </div>

      <section className="relative z-10 pt-40 pb-20 px-4 md:px-8">
        {/* HERO */}
        <div className="max-w-5xl mx-auto w-full text-center mb-32">
          <div className="aura-fade-1 inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8 backdrop-blur-3xl border border-white/20 bg-white/5 shadow-xl">
            <Zap className="w-4 h-4 text-orange-500 animate-pulse" />
            <span className="text-xs font-black text-foreground/90 tracking-[0.3em] uppercase">Human Interface</span>
          </div>
          <h1 className="aura-fade-2 text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.95]">
            Let's build the <br />
            <span className="shimmer-text italic">next dimension.</span>
          </h1>
          <p className="aura-fade-3 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Ready to integrate Aura into your workflow? Our human architects are waiting to connect with you.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-start mb-40">
          {/* Left Column: Glowing Info Cards */}
          <div className="lg:col-span-5 space-y-8 aura-fade-left">
            <div className="relative group p-[1px] rounded-[3.5rem] overflow-hidden transition-all duration-700">
               <div className="absolute inset-0 bg-gradient-to-br from-orange-500/50 via-rose-500/50 to-purple-600/50 opacity-20 group-hover:opacity-100 transition-opacity duration-700"></div>
               <div className="relative p-12 rounded-[3.4rem] bg-background/80 backdrop-blur-3xl border border-white/5">
                 <h3 className="text-3xl font-black mb-10">Direct Sync</h3>
                 <div className="space-y-10">
                    {[
                      { icon: Mail, label: 'General Inquiry', val: 'hello@aura-ai.app', color: 'text-orange-500' },
                      { icon: MessageSquare, label: 'Enterprise & Sales', val: 'sales@aura-ai.app', color: 'text-blue-500' },
                      { icon: LifeBuoy, label: 'Tech Support', val: 'support@aura-ai.app', color: 'text-purple-500' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-6 group/item cursor-pointer">
                        <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover/item:scale-110 group-hover/item:border-orange-500/50`}>
                          <item.icon className={`w-7 h-7 ${item.color}`} />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground mb-1.5">{item.label}</div>
                          <div className="text-xl font-bold text-foreground group-hover/item:text-orange-500 transition-colors">{item.val}</div>
                        </div>
                      </div>
                    ))}
                 </div>
               </div>
            </div>

            {/* Social Hub */}
            <div className="relative group p-[1px] rounded-[3.5rem] overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-cyan-500/40 opacity-20 group-hover:opacity-100 transition-opacity duration-700"></div>
               <div className="relative p-12 rounded-[3.4rem] bg-background/80 backdrop-blur-3xl border border-white/5">
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                    <Users className="w-6 h-6 text-blue-500" />
                    Global Community
                  </h3>
                  <div className="flex gap-5">
                    {[
                      { icon: Twitter, color: 'hover:bg-blue-500', link: '#' },
                      { icon: Discord, color: 'hover:bg-indigo-600', link: '#' },
                      { icon: Github, color: 'hover:bg-zinc-800', link: '#' },
                    ].map((s, i) => (
                      <a key={i} href={s.link} className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 ${s.color} hover:-translate-y-3 shadow-xl`}>
                        <s.icon className="w-7 h-7 text-white" />
                      </a>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Contact Form (Glow Form) */}
          <div className="lg:col-span-7 aura-fade-right">
             <div className="relative group p-[1px] rounded-[4rem] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-rose-500 to-purple-600 opacity-10 group-hover:opacity-30 transition-opacity duration-700"></div>
                <div className="relative p-12 md:p-16 rounded-[3.9rem] bg-background/60 backdrop-blur-3xl border border-white/10">
                   <div className="absolute top-0 right-0 p-12 opacity-5">
                      <Send className="w-24 h-24 text-orange-500" />
                   </div>
                   
                   <h3 className="text-4xl font-black mb-12 tracking-tight">Initiate <span className="gradient-text-orange">Contact.</span></h3>
                   
                   <form onSubmit={handleSubmit} className="space-y-8">
                     <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                         <label className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2">Full Identity</label>
                         <input
                           type="text"
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all duration-500"
                           placeholder="John Doe"
                           required
                         />
                       </div>
                       <div className="space-y-3">
                         <label className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2">Email Node</label>
                         <input
                           type="email"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                           className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all duration-500"
                           placeholder="john@future.io"
                           required
                         />
                       </div>
                     </div>

                     <div className="space-y-3">
                       <label className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2">Message Topic</label>
                       <input
                         type="text"
                         name="subject"
                         value={formData.subject}
                         onChange={handleChange}
                         className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all duration-500"
                         placeholder="Aura for Enterprise"
                         required
                       />
                     </div>

                     <div className="space-y-3">
                       <label className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2">Data Payload</label>
                       <textarea
                         name="message"
                         value={formData.message}
                         onChange={handleChange}
                         className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] px-8 py-6 text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all duration-500 resize-none"
                         placeholder="What's on your mind?"
                         rows={5}
                         required
                       />
                     </div>

                     <button 
                       type="submit" 
                       className="group w-full inline-flex items-center justify-center gap-4 py-6 text-2xl font-black text-white rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2"
                       style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 20px 50px -10px rgba(255, 0, 102, 0.5)' }}
                     >
                       Transmit Message
                       <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                     </button>
                   </form>
                </div>
             </div>
          </div>
        </div>

        {/* QUICK ACCESS GRID */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 aura-fade-up">
           {[
             { icon: HelpCircle, t: 'Docs', d: 'Read API' },
             { icon: MessageSquare, t: 'Chat', d: 'Live Sync' },
             { icon: Twitter, t: 'News', d: 'Latest Intel' },
             { icon: Github, t: 'Source', d: 'Open Core' },
           ].map((item, i) => (
             <div key={i} className="p-8 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-3xl text-center group hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                <item.icon className="w-8 h-8 text-orange-500 mx-auto mb-4 group-hover:scale-125 transition-transform" />
                <div className="text-xs font-black uppercase tracking-[0.2em] text-foreground mb-1">{item.t}</div>
                <div className="text-[10px] font-bold text-muted-foreground">{item.d}</div>
             </div>
           ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-20 text-center text-muted-foreground">
        <p className="text-xs font-black tracking-[0.4em] uppercase opacity-30">Aura AI · Human Architecture</p>
      </footer>
    </div>
  );
};

export default Contact;
