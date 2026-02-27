import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FloatingElements from '@/components/FloatingElements';

// Contact page component
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
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElements />
      </div>

      <section className="relative z-10 min-h-screen flex items-center px-6 md:px-12 pt-32 pb-12">
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 text-center">
            Get in <span className="text-orange-500">Touch</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="auth-card p-6 flex items-start gap-4">
                <div className="p-3 rounded-lg gradient-orange shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-card-foreground">Email</h3>
                  <p className="text-muted-foreground mt-1">hello@auraai.com</p>
                </div>
              </div>

              <div className="auth-card p-6 flex items-start gap-4">
                <div className="p-3 rounded-lg gradient-orange shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-card-foreground">Phone</h3>
                  <p className="text-muted-foreground mt-1">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="auth-card p-6 flex items-start gap-4">
                <div className="p-3 rounded-lg gradient-orange shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-card-foreground">Location</h3>
                  <p className="text-muted-foreground mt-1">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="auth-card p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-card-foreground mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-card-foreground mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-card-foreground mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Subject"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-card-foreground mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field resize-none"
                    placeholder="Your message..."
                    rows={4}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
