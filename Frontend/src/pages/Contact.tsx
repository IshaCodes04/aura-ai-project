import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles, Twitter, Github, Disc as Discord, HelpCircle, LifeBuoy, Users } from 'lucide-react';
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
    console.log('Contact form submitted:', formData);
    alert('Thank you! Aura will reach out to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-20 dark:opacity-30" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 100%)' }} />
        <div className="liquid-blob absolute opacity-10 dark:opacity-20" style={{ width: '40vw', height: '40vw', bottom: '0%', right: '-5%', animationDelay: '-5s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)' }} />
      </div>

      <section className="relative z-10 pt-32 pb-20 px-4 md:px-8">
        {/* HERO */}
        <div className="max-w-4xl mx-auto w-full text-center mb-24">
          <div className="aura-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 backdrop-blur-xl border border-white/10 bg-white/5 text-orange-500 text-sm font-bold uppercase tracking-widest">
            <LifeBuoy className="w-4 h-4" />
            Human Support
          </div>
          <h1 className="aura-fade-2 text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
            We're here to <br />
            <span className="shimmer-text">help you scale.</span>
          </h1>
          <p className="aura-fade-3 text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Whether you're a solo creator or a global enterprise, our team is ready to assist you.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8 items-start mb-32">
          {/* Left Column: Direct Contact & Departments */}
          <div className="md:col-span-5 space-y-6 aura-fade-left">
            <div className="p-10 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-xl">
              <h3 className="text-2xl font-black mb-8">Direct Channels</h3>
              <div className="space-y-8">
                {[
                  { icon: Mail, label: 'General Inquiry', val: 'hello@aura-ai.app', color: 'text-orange-500' },
                  { icon: MessageSquare, label: 'Sales & Enterprise', val: 'sales@aura-ai.app', color: 'text-blue-500' },
                  { icon: LifeBuoy, label: 'Technical Support', val: 'support@aura-ai.app', color: 'text-purple-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 group">
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">{item.label}</div>
                      <div className="text-lg font-bold text-foreground">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Community */}
            <div className="p-10 rounded-[3rem] border border-white/10 bg-white/10 backdrop-blur-3xl relative overflow-hidden group">
               <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Users className="w-40 h-40 text-white" />
               </div>
               <h3 className="text-2xl font-black mb-6">Join Community</h3>
               <div className="flex gap-4">
                 {[
                   { icon: Twitter, color: 'hover:bg-blue-500', link: '#' },
                   { icon: Discord, color: 'hover:bg-indigo-500', link: '#' },
                   { icon: Github, color: 'hover:bg-zinc-800', link: '#' },
                 ].map((s, i) => (
                   <a key={i} href={s.link} className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 ${s.color} hover:border-transparent hover:-translate-y-2`}>
                     <s.icon className="w-6 h-6 text-white" />
                   </a>
                 ))}
               </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="md:col-span-7 aura-fade-right">
            <div className="p-10 md:p-14 rounded-[4rem] border border-white/10 bg-background/40 backdrop-blur-3xl shadow-2xl relative">
              <div className="absolute top-0 right-0 p-10 opacity-5">
                 <Send className="w-20 h-20 text-orange-500" />
              </div>
              
              <h3 className="text-3xl font-black mb-10">Send a <span className="text-orange-500">Message</span></h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                    placeholder="Enterprise Solution Inquiry"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Message Content</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
                    placeholder="Describe your vision or problem..."
                    rows={6}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full inline-flex items-center justify-center gap-4 py-6 text-xl font-black text-white rounded-3xl transition-all duration-300 hover:-translate-y-2"
                  style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 15px 40px -10px rgba(255, 122, 0, 0.5)' }}
                >
                  Initiate Sync
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* QUICK HELP / HELP CENTER LINK (Enhancement) */}
        <div className="max-w-4xl mx-auto p-12 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-md text-center aura-fade-up">
           <div className="flex justify-center gap-12 flex-wrap">
              {[
                { icon: HelpCircle, t: 'Help Center', l: 'Browse Docs' },
                { icon: MessageSquare, t: 'Live Chat', l: 'Start Now' },
                { icon: Users, t: 'Forum', l: 'Join Thread' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group cursor-pointer">
                   <item.icon className="w-5 h-5 text-orange-500 group-hover:scale-125 transition-transform" />
                   <div className="text-left">
                      <div className="text-xs font-black text-foreground uppercase tracking-widest">{item.t}</div>
                      <div className="text-sm text-muted-foreground group-hover:text-orange-500 transition-colors">{item.l}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/50 py-12 text-center text-muted-foreground">
        <p className="text-sm">© {new Date().getFullYear()} <span className="font-bold text-foreground">Aura AI</span>. Human intelligence behind the AI.</p>
      </footer>
    </div>
  );
};

export default Contact;
