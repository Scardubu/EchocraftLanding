import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight,
  Code,
  Brain,
  Shield,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  Menu,
  X,
  Database,
  Cloud,
  GitBranch,
  Play,
  Pause,
  RotateCw,
} from 'lucide-react';

const EchocraftLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [particleCount] = useState(50);
  const heroRef = useRef(null);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = e => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll & parallax
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      if (heroRef.current) {
        heroRef.current
          .querySelectorAll('.parallax-element')
          .forEach((el, i) => {
            const speed = (i + 1) * 0.1;
            el.style.transform = `translateY(${scrollY * speed}px)`;
          });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing animation
  useEffect(() => {
    const timer = setTimeout(() => setIsTypingComplete(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Rotate testimonials
  const testimonials = [
    {
      quote:
        'Echocraft turned our chaotic scrapers and dashboards into a single automated pipeline—cut our reporting time by 80% and supercharged our betting accuracy.',
      author: 'Lead Engineer, Sports Analytics Startup',
      rating: 5,
      company: 'TechSport Analytics',
    },
    {
      quote:
        'The AI models they built for us are incredibly accurate. Our conversion rates improved by 150% within the first month of deployment.',
      author: 'CTO, E-commerce Platform',
      rating: 5,
      company: 'ShopFlow',
    },
    {
      quote:
        'Their blockchain expertise is unmatched. They delivered a complex DeFi protocol ahead of schedule and under budget.',
      author: 'Founder, DeFi Protocol',
      rating: 5,
      company: 'DecentraFi',
    },
  ];
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTestimonial(i => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Particle system
  const ParticleSystem = () => {
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-cyan-400 animate-bounce"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: `${p.id * 0.1}s`,
              animationDuration: `${4 + p.speed * 2}s`,
            }}
          />
        ))}
      </div>
    );
  };

  // Floating shapes
  const FloatingShapes = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 left-10 w-20 h-20 border-2 border-purple-400/20 rotate-45 animate-spin" />
      <div className="absolute top-1/3 right-20 w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-16 h-16 border-2 border-cyan-400/20 rounded-full animate-bounce" />
      <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 transform rotate-45 animate-pulse" />
    </div>
  );

  // Typing effect
  const TypingEffect = ({ text, className, delay = 0 }) => {
    const [displayText, setDisplayText] = useState('');
    const [idx, setIdx] = useState(0);
    useEffect(() => {
      const t = setTimeout(() => {
        if (idx < text.length) {
          setDisplayText(dt => dt + text[idx]);
          setIdx(i => i + 1);
        }
      }, delay + idx * 50);
      return () => clearTimeout(t);
    }, [idx, text, delay]);
    return (
      <span className={className}>
        {displayText}
        <span className="animate-pulse text-cyan-400">|</span>
      </span>
    );
  };

  const services = [
    {
      icon: Code,
      title: 'Technical Solutions Architecture',
      description:
        'Holistic system design and roadmaps to align your tech stack with your business goals.',
      features: ['System Design', 'Technical Roadmaps', 'Stack Optimization', 'Performance Audits'],
      color: 'from-blue-500 to-cyan-500',
      demo: 'API Integration Demo',
    },
    {
      icon: Brain,
      title: 'AI & Data Automation',
      description:
        'Predictive pipelines, real-time dashboards, and reproducible ML workflows.',
      features: ['ML Pipelines', 'Real-time Analytics', 'Predictive Models', 'Data Visualization'],
      color: 'from-purple-500 to-pink-500',
      demo: 'ML Pipeline Demo',
    },
    {
      icon: Shield,
      title: 'Blockchain & Smart Contracts',
      description:
        'Secure, gas-optimized contract development, audits, and full integration.',
      features: ['Smart Contracts', 'Security Audits', 'Gas Optimization', 'DeFi Integration'],
      color: 'from-green-500 to-emerald-500',
      demo: 'Smart Contract Demo',
    },
    {
      icon: Zap,
      title: 'DevOps & Continuous Deployment',
      description:
        'CI/CD pipelines, infrastructure as code, and 24/7 monitoring for zero-downtime releases.',
      features: ['CI/CD Pipelines', 'Infrastructure as Code', '24/7 Monitoring', 'Auto-scaling'],
      color: 'from-yellow-500 to-orange-500',
      demo: 'DevOps Pipeline Demo',
    },
  ];

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'Python', icon: '🐍' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Kubernetes', icon: '⚓' },
    { name: 'TensorFlow', icon: '🧠' },
    { name: 'Solidity', icon: '💎' },
  ];

  const steps = [
    {
      number: '01',
      title: 'Discovery Call',
      description: 'We map out your vision, pain points, and success metrics.',
      icon: '🔍',
    },
    {
      number: '02',
      title: 'Technical Audit & Proposal',
      description:
        'Actionable blueprint with timelines, milestones, and transparent pricing.',
      icon: '📋',
    },
    {
      number: '03',
      title: 'Build & Automate',
      description:
        'Rapid iteration, rigorous testing, and hands-on collaboration.',
      icon: '🛠️',
    },
    {
      number: '04',
      title: 'Launch & Scale',
      description:
        'Handoff detailed documentation, training, and optional retainer support.',
      icon: '🚀',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      <ParticleSystem />
      <FloatingShapes />

      {/* Background Overlays & Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
              Echocraft
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'Process', 'About', 'Tech Stack'].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  {item}
                </a>
              ))}
              <button className="bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-2 rounded-full text-white font-medium hover:from-cyan-600 hover:to-purple-600 transition-transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
                Get Started
              </button>
            </div>

            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(o => !o)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Services', 'Process', 'About', 'Tech Stack'].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="block px-3 py-2 text-gray-300 hover:text-white"
                >
                  {item}
                </a>
              ))}
              <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 rounded-full text-white font-medium mt-2">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="parallax-element">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-transparent">
                  Crafting
                </span>
                <br />
                <TypingEffect
                  text="Intelligent Systems"
                  className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                  delay={500}
                />
              </h1>
            </div>
            <div className="parallax-element">
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                That <span className="text-cyan-400 font-semibold">Echo Your Vision</span>
              </p>
              <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
                From AI-driven analytics to blockchain-powered workflows, we architect and
                automate your entire stack—so you can focus on growth, not glue code.
              </p>
            </div>
            <div className="parallax-element flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 rounded-full text-white font-semibold text-lg hover:from-cyan-600 hover:to-purple-600 transition-transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-cyan-500/25">
                Get Your Free Technical Audit
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-full border-2 border-gray-600 text-gray-300 font-semibold text-lg hover:border-cyan-400 hover:text-cyan-400 transition-shadow">
                View Case Studies
              </button>
            </div>
          </div>

          <div className="parallax-element flex justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                  <Code size={32} className="text-white" />
                </div>
              </div>
              {[
                { icon: Brain, angle: 0, delay: 0 },
                { icon: Shield, angle: 90, delay: 1000 },
                { icon: Database, angle: 180, delay: 2000 },
                { icon: Cloud, angle: 270, delay: 3000 },
              ].map((it, i) => {
                const Icon = it.icon;
                return (
                  <div
                    key={i}
                    className="absolute w-12 h-12 bg-slate-800 border-2 border-cyan-400 rounded-full flex items-center justify-center animate-spin"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${it.angle}deg) translateX(120px) rotate(-${it.angle}deg)`,
                      animationDuration: '10s',
                      animationDelay: `${it.delay}ms`,
                    }}
                  >
                    <Icon size={20} className="text-cyan-400" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Our Signature Services
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive solutions for modern digital challenges
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                onClick={() => setActiveService(i)}
                className={`group bg-slate-800/50 backdrop-blur-sm border rounded-2xl p-8 cursor-pointer transition-transform duration-500 ${
                  activeService === i
                    ? 'border-cyan-400 bg-slate-700/50 shadow-2xl shadow-cyan-500/25'
                    : 'border-slate-700 hover:border-cyan-400/50 hover:scale-105'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`bg-gradient-to-r ${s.color} p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                  </div>
                  <button className="px-4 py-2 bg-slate-700 rounded-full text-sm text-gray-300 hover:bg-slate-600 transition-colors">
                    {s.demo}
                  </button>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{s.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {s.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-cyan-400" />
                      <span className="text-gray-300 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <div className={`mt-6 h-1 bg-gradient-to-r ${s.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              </div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Our Process
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A proven methodology for delivering exceptional results
          </p>
        </div>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transform -translate-y-1/2 hidden lg:block" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((st, i) => (
              <div key={i} className="text-center group relative">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-125 transition-transform">
                  <span className="text-white font-bold text-xl">{st.number}</span>
                </div>
                <div className="text-3xl mb-4 group-hover:scale-125 transition-transform">{st.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-white">{st.title}</h3>
                <p className="text-gray-300 leading-relaxed">{st.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech-stack" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Our Tech Arsenal
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Cutting-edge technologies that power your success
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {techStack.map((t, i) => (
            <div
              key={i}
              className="group bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-2xl p-6 hover:border-cyan-400/50 transition-transform hover:scale-110 cursor-pointer"
            >
              <div className="text-3xl mb-2 group-hover:scale-125 transition-transform">{t.icon}</div>
              <p className="text-white font-medium">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Client Success Stories
          </h2>
        </div>
        <div className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-12 transition-transform duration-500">
          <div className="flex justify-center mb-6">
            {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
              <Star key={i} size={20} className="text-yellow-400" />
            ))}
          </div>
          <blockquote className="text-xl md:text-2xl text-gray-300 text-center mb-8 leading-relaxed">
            "{testimonials[currentTestimonial].quote}"
          </blockquote>
          <p className="text-cyan-400 font-semibold text-center">
            — {testimonials[currentTestimonial].author},{' '}
            <span className="text-gray-400">{testimonials[currentTestimonial].company}</span>
          </p>
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentTestimonial(i)}
              className={`w-3 h-3 rounded-full transition-transform ${
                i === currentTestimonial ? 'bg-cyan-400 scale-125' : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Ready to Amplify Your Tech?
          </h2>
          <p className="text-xl text-gray-300">
            Build resilient systems, ship faster releases, and automate the hustle—so you can lead your market.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 rounded-full text-white font-semibold hover:from-cyan-600 hover:to-purple-600 transition-transform hover:scale-105">
              Get Your Free Technical Audit
            </button>
            <button className="border-2 border-cyan-400 px-8 py-4 rounded-full text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-white transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EchocraftLanding;
