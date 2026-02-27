import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FloatingElements from '@/components/FloatingElements';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElements />
      </div>

      {/* Content Section */}
      <section className="relative z-10 min-h-screen flex items-center px-6 md:px-12 pt-32 pb-12">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            About <span className="text-orange-500">Aura AI</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            Aura AI is a next-generation AI platform designed to transform how you work. Built with cutting-edge technology and a focus on user experience, we're here to simplify complexity and boost productivity.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="auth-card p-8">
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower individuals and organizations with intelligent AI tools that adapt to their needs and unlock their full potential.
              </p>
            </div>

            <div className="auth-card p-8">
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A future where AI works seamlessly with human creativity, making everyone more capable and productive.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
