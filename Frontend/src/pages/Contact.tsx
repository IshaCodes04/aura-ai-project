import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles, Twitter, Github, Disc as Discord, LifeBuoy, Users, Zap, ShieldCheck } from 'lucide-react';
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
    alert('Thank you! Aura will reach out to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* ─── LIQUID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="liquid-blob absolute opacity-20 dark:opacity-25" style={{ width: '60vw', height: '60vw', top: '-10%', left: '-10%', background: 'linear-gradient(135deg, #FF7A00 0%, #FF0066 100%)' }} />
        <div className="liquid-blob absolute opacity-10 dark:opacity-15" style={{ width: '40vw', height: '40vw', bottom: '10%', right: '5%', animationDelay: '-5s', background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)' }} />
      </div>

      <section className="relative z-10 pt-32 pb-20 px-4 md:px-8">
        
        {/* HERO */}
        <div className="max-w-4xl mx-auto w-full text-center mb-20 px-6">
          <div className="aura-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 backdrop-blur-xl border border-orange-500/20 bg-orange-500/5 text-orange-500 text-xs font-bold tracking-widest uppercase">
            <LifeBuoy className="w-3.5 h-3.5" />
            Human Connection
          </div>
          <h1 className="aura-fade-2 text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
            We're here to <br />
            <span className="shimmer-text">help you scale.</span>
          </h1>
          <p className="aura-fade-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Whether you have a technical hurdle or an enterprise inquiry, our team of architects is ready to assist.
          </p>
        </div>

        {/* INFO CARDS BAND */}
        <div className="max-w-6xl mx-auto mb-24">
           <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Mail, label: 'Email', val: 'hello@aura-ai.app', color: 'text-orange-500' },
                { icon: Phone, label: 'Phone', val: '+1 (555) 123-4567', color: 'text-blue-500' },
                { icon: MapPin, label: 'Office', val: 'San Francisco, CA', color: 'text-purple-500' },
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl flex items-center gap-5 hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-0.5">{item.label}</div>
                    <div className="text-lg font-bold">{item.val}</div>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* MAIN SECTION (Form & Socials) */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 mb-40 items-start">
           {/* Form */}
           <div className="p-10 md:p-14 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl relative">
              <h3 className="text-3xl font-black mb-10 tracking-tight">Send a <span className="text-orange-500 italic">Message</span></h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                     <input
                       type="text"
                       name="name"
                       value={formData.name}
                       onChange={handleChange}
                       className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-orange-500/50 transition-all"
                       placeholder="John Doe"
                       required
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Node</label>
                     <input
                       type="email"
                       name="email"
                       value={formData.email}
                       onChange={handleChange}
                       className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-orange-500/50 transition-all"
                       placeholder="john@aura.io"
                       required
                     />
                   </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-orange-500/50 transition-all"
                    placeholder="General Inquiry"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Message Payload</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-6 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-orange-500/50 transition-all resize-none"
                    placeholder="Tell us everything..."
                    rows={6}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full inline-flex items-center justify-center gap-3 py-5 text-xl font-black text-white rounded-[2rem] transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 15px 30px -10px rgba(255, 0, 102, 0.4)' }}
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
           </div>

           {/* Direct Access & Socials */}
           <div className="space-y-10">
              <div className="space-y-4">
                 <h2 className="text-4xl font-black tracking-tight">Direct Access.</h2>
                 <p className="text-lg text-muted-foreground font-medium">Connect with us across our global community hubs.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 {[
                   { icon: Twitter, t: 'Twitter', d: '@aura_ai', c: 'hover:bg-blue-500/10' },
                   { icon: Discord, t: 'Discord', d: 'aura-community', c: 'hover:bg-indigo-500/10' },
                   { icon: Github, t: 'GitHub', d: 'aura-intelligence', c: 'hover:bg-zinc-800/10' },
                   { icon: MessageSquare, t: 'Forum', d: 'Community Hub', c: 'hover:bg-green-500/10' },
                 ].map((s, i) => (
                   <div key={i} className={`p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-3xl transition-all ${s.c} cursor-pointer group`}>
                      <s.icon className="w-6 h-6 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                      <div className="font-black text-lg mb-1">{s.t}</div>
                      <div className="text-sm text-muted-foreground">{s.d}</div>
                   </div>
                 ))}
              </div>

              <div className="p-10 rounded-[2.5rem] border border-orange-500/20 bg-orange-500/5 backdrop-blur-3xl relative overflow-hidden">
                 <ShieldCheck className="absolute top-0 right-0 p-8 opacity-5 w-32 h-32 text-orange-500" />
                 <h4 className="text-lg font-bold mb-2">Priority Support</h4>
                 <p className="text-sm text-muted-foreground leading-relaxed">
                   Business and Pro users get access to our dedicated 24/7 Slack channel and prioritized ticketing.
                 </p>
              </div>
           </div>
        </div>

        {/* FINAL HELP BAND */}
        <div className="max-w-4xl mx-auto p-12 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-md text-center">
           <Zap className="w-10 h-10 text-orange-500 mx-auto mb-6" />
           <h3 className="text-2xl font-black mb-4">Looking for Documentation?</h3>
           <p className="text-muted-foreground mb-8">Our comprehensive guides and API references are ready for you.</p>
           <Link to="/" className="text-orange-500 font-black text-lg hover:underline transition-all">Explore Docs →</Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-16 text-center text-muted-foreground">
        <p className="text-xs font-bold tracking-[0.3em] uppercase opacity-30">Aura AI · Human Interface</p>
      </footer>
    </div>
  );
};

export default Contact;
