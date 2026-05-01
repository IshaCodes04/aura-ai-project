import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles } from 'lucide-react';
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
        <div className="max-w-4xl mx-auto w-full text-center mb-20">
          <div className="aura-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 backdrop-blur-xl border border-white/10 bg-white/5 text-orange-500 text-sm font-bold uppercase tracking-widest">
            <MessageSquare className="w-4 h-4" />
            Connect with us
          </div>
          <h1 className="aura-fade-2 text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
            Let's start a <br />
            <span className="shimmer-text">conversation.</span>
          </h1>
          <p className="aura-fade-3 text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Have questions or want to collaborate? Aura's human team is just a message away.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8 items-start mb-20">
          {/* Contact Details */}
          <div className="md:col-span-2 space-y-6 aura-fade-left">
            {[
              { icon: Mail, title: 'Email Us', detail: 'hello@aura-ai.app', color: 'bg-orange-500/10 text-orange-500' },
              { icon: Phone, title: 'Call Us', detail: '+1 (555) 123-4567', color: 'bg-blue-500/10 text-blue-500' },
              { icon: MapPin, title: 'Visit Us', detail: 'San Francisco, CA', color: 'bg-purple-500/10 text-purple-500' },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-3xl hover:bg-white/10 transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-muted-foreground font-medium">{item.detail}</p>
              </div>
            ))}

            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-orange-500/10 to-rose-500/10 border border-orange-500/20 backdrop-blur-3xl">
              <Sparkles className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-foreground">Support Hours</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mon - Fri: 9:00 AM - 6:00 PM (PST)<br />
                Weekend: Priority Support only.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3 aura-fade-right">
            <div className="p-8 md:p-12 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Your Name</label>
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
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Email Address</label>
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

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
                    placeholder="Tell us about your project..."
                    rows={5}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full inline-flex items-center justify-center gap-3 py-5 text-lg font-bold text-white rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'linear-gradient(135deg, #FF7A00, #FF0066)', boxShadow: '0 10px 30px -10px rgba(255, 122, 0, 0.5)' }}
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/50 py-12 text-center text-muted-foreground">
        <p className="text-sm">© {new Date().getFullYear()} <span className="font-bold text-foreground">Aura AI</span>. Built with ❤️ for human connection.</p>
      </footer>
    </div>
  );
};

export default Contact;
