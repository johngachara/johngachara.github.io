import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Download, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleDownloadCV = () => {
    // Create CV content
    const cvContent = `
JOHN GACHARA
Software Engineer | AI Enthusiast
📍 Nairobi, Kenya
📧 johngachara29@gmail.com
💻 github.com/johngachara

TECHNICAL SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AI & Machine Learning: LLM Integration (GPT-4.1, Llama, Granite), Prompt Engineering, Model Optimization, Agentic AI Systems
Languages: Python, JavaScript
Frontend: React, Vite, HTML, CSS, Chakra UI, Zustand, Redux
Backend: Django, Express.js, Celery, Gunicorn, RESTful APIs
Databases: PostgreSQL, Firestore, MeiliSearch, Supabase, Redis
Cloud & DevOps: AWS, Firebase, Docker, Nginx, VPS, GitHub Actions, Grafana
Security: ModSecurity WAF, CrowdSec, Snort 3 IPS, WebAuthn, JWT, OAuth, iptables, Azure Firewall

PROFESSIONAL EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Computer Revolution Africa – Innovations Intern (May 2025 – Present)
• Developed CyberGuard, an intelligent real-time log monitoring and automated threat response ecosystem
• Designed hybrid two-tier AI security pipeline (Granite-4-Tiny-H 7B + Llama 3.3 70B) for cost-efficient threat analysis (<$10/month)
• Implemented automated defensive actions using iptables and Azure Firewall
• Built IT Support Assistant reducing technician report writing time by 50-60%

KEY PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CyberGuard - AI Security Ecosystem (May 2025 – Present)
Real-time threat detection powered by two-tier AI intelligence
• Docker-containerized log monitoring with pattern matching for OWASP Top 10+ attacks
• Redis-based short-term memory system for pattern correlation
• Automated IP blocking with confidence-based scoring
• Real-time visualization dashboard with AI reasoning transparency
• Natural language query system for security data analysis
Technologies: Node.js, Docker, Ollama, Cerebras Cloud, Supabase, Redis, React, Vite

IT Support Assistant (June 2025 – Present)
AI-powered technical documentation system
• Reduced report writing time from 25-30 minutes to 10-15 minutes per machine
• Automated report generation with web search integration
• Task monitoring system with completion tracking
• 24/7 technical chatbot with real-time web search
Technologies: Python, Node.js, OpenAI GPT-4.1 Mini, React

EDUCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bachelor of Science in Information and Communication Technology (BSc ICT)
KCA University, Nairobi, Kenya
Expected Graduation: November 2025
`;

    // Create blob and download
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'John_Gachara_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass glow-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="font-orbitron text-xl md:text-2xl font-bold gradient-text">
            JG
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-inter"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Download CV Button */}
          <div className="hidden md:block">
            <Button
              onClick={handleDownloadCV}
              variant="outline"
              className="font-orbitron border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors font-inter"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button
                onClick={() => {
                  handleDownloadCV();
                  setIsMobileMenuOpen(false);
                }}
                variant="outline"
                className="font-orbitron border-primary text-primary"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;
