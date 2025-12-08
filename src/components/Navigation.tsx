import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Download, Menu, X } from "lucide-react";
import {jsPDF} from 'jspdf';


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
        // Initialize jsPDF instance
            const doc = new jsPDF();

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            const maxWidth = pageWidth - 2 * margin;
            let yPos = margin;

            // Helper function to add new page if needed
            const checkPageBreak = (requiredSpace) => {
                if (yPos + requiredSpace > pageHeight - margin) {
                    doc.addPage();
                    yPos = margin;
                    return true;
                }
                return false;
            };

            // Helper to add text with word wrap
            const addText = (text, fontSize, isBold = false, color = [0, 0, 0]) => {
                doc.setFontSize(fontSize);
                doc.setFont('helvetica', isBold ? 'bold' : 'normal');
                doc.setTextColor(...color);
                const lines = doc.splitTextToSize(text, maxWidth);

                lines.forEach((line) => {
                    checkPageBreak(fontSize * 0.5);
                    doc.text(line, margin, yPos);
                    yPos += fontSize * 0.5;
                });
            };

            // Header
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 102, 204);
            doc.text('JOHN GACHARA', pageWidth / 2, yPos, { align: 'center' });
            yPos += 8;

            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            doc.text('Software Engineer | AI Enthusiast', pageWidth / 2, yPos, { align: 'center' });
            yPos += 10;

            // Contact Information
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text('Nairobi, Kenya  •  johngachara29@gmail.com  •  github.com/johngachara', pageWidth / 2, yPos, { align: 'center' });
            yPos += 10;

            // Horizontal line
            doc.setDrawColor(0, 102, 204);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 8;

            // Technical Skills
            addText('TECHNICAL SKILLS', 14, true, [0, 102, 204]);
            yPos += 2;

            const skills = {
                'AI & Machine Learning': 'LLM Integration (GPT-4.1, Llama, Granite), Prompt Engineering, Model Optimization, Agentic AI Systems',
                'Programming Languages': 'Python, JavaScript',
                'Frontend Development': 'React, Vite, HTML, CSS, JavaScript, Chakra UI, Zustand, Redux',
                'Backend Development': 'Django, Express.js, Celery, Gunicorn, RESTful API Design',
                'Databases': 'PostgreSQL, Firestore, MeiliSearch, Supabase, Redis',
                'Cloud & DevOps': 'AWS, Firebase, Docker, Nginx, VPS, GitHub Actions (CI/CD), Grafana',
                'Security & Networking': 'ModSecurity WAF, CrowdSec, Snort 3 IPS, WebAuthn, JWT, OAuth, Fail2ban, firewalld, Cloudflare, iptables, Azure Firewall'
            };

            Object.entries(skills).forEach(([category, items]) => {
                addText(category + ':', 10, true);
                addText(items, 9);
                yPos += 1;
            });
            yPos += 4;

            // Professional Experience
            addText('PROFESSIONAL EXPERIENCE', 14, true, [0, 102, 204]);
            yPos += 2;

            addText('Computer Revolution Africa – Innovations Intern', 11, true);
            addText('May 2025 – Present', 9, false, [100, 100, 100]);
            yPos += 1;

            const experience = [
                'Developed CyberGuard, an intelligent real-time log monitoring and automated threat response ecosystem, deployed on production servers for security testing',
                'Designed a hybrid two-tier AI security pipeline combining local model (Granite-4-Tiny-H 7B) with cloud model (Llama 3.3 70B) for scalable, cost-efficient threat analysis (under $10/month operational costs)',
                'Implemented automated defensive actions using iptables and Azure Firewall integrations with confidence-based blocking',
                'Integrated external threat intelligence sources (AbuseIPDB, VirusTotal) and Redis short-term memory system for pattern correlation',
                'Built IT Support Assistant system, reducing technician report writing time by 50-60% (from 25-30 minutes to 10-15 minutes per machine)'
            ];

            experience.forEach(item => {
                addText('• ' + item, 9);
                yPos += 1;
            });
            yPos += 4;

            // Key Projects
            addText('KEY PROJECTS', 14, true, [0, 102, 204]);
            yPos += 2;

            // CyberGuard Project
            addText('CyberGuard - AI Security Ecosystem', 11, true);
            addText('May 2025 – Present', 9, false, [100, 100, 100]);
            yPos += 1;
            addText('Real-time threat detection and response system powered by two-tier AI intelligence', 9, false, [60, 60, 60]);
            yPos += 2;

            const cyberguardFeatures = [
                'Docker-containerized log monitoring system that analyzes application logs in real-time',
                'Two-tier AI architecture: Primary model (Granite-4-Tiny-H 7B) handles 90% of decisions locally via Ollama, while secondary model (Llama 3.3 70B) handles complex escalations',
                'Pattern matching engine detecting OWASP Top 10+ attacks combined with contextual AI analysis',
                'Redis-based short-term memory system that correlates suspicious activity over time',
                'Real-time security visualization interface built with React, Vite, and Supabase Auth',
                'Natural language query system for security data analysis'
            ];

            cyberguardFeatures.forEach(item => {
                addText('• ' + item, 9);
                yPos += 1;
            });

            addText('Technologies: Node.js, Docker, Ollama, Cerebras Cloud, Tailscale, Supabase, Upstash Redis, React, Vite, Chakra UI', 8, false, [80, 80, 80]);
            yPos += 4;

            // IT Support Assistant
            addText('IT Support Assistant - AI-Powered Technical Documentation', 11, true);
            addText('June 2025 – Present', 9, false, [100, 100, 100]);
            yPos += 1;

            const itSupportFeatures = [
                'AI-powered repair reporting system that reduces documentation time from 25-30 minutes to 10-15 minutes per machine',
                'Automated report generation with web search integration for latest solutions, driver updates, and best practices',
                'Professional PDF and Word export with consistent formatting',
                '24/7 technical chatbot providing instant answers to common IT support questions with real-time web search',
                'Complete repair history tracking for every machine, ensuring knowledge continuity during staff rotations'
            ];

            itSupportFeatures.forEach(item => {
                addText('• ' + item, 9);
                yPos += 1;
            });

            addText('Technologies: Python, Node.js, OpenAI GPT-4.1 Mini, Web Search APIs, PDF Generation, React', 8, false, [80, 80, 80]);
            yPos += 4;

            // Alltech Project
            addText('Alltech Integrated Business Management System', 11, true);
            addText('2023 – Present', 9, false, [100, 100, 100]);
            yPos += 1;
            addText('Comprehensive business management platform combining POS, analytics, and automated reporting', 9, false, [60, 60, 60]);
            yPos += 2;

            const alltechFeatures = [
                'Microservices-based architecture using Django and Express.js separating core business domains',
                'POS interface built with React, Vite, and Chakra UI optimized for fast retail workflows',
                'AI-powered business intelligence using GPT-4.1 Mini for automated transactional analysis',
                'WhatsApp bot for scheduled delivery of business reports and analytics using node-cron',
                'Hardened platform with WebAuthn passkeys, JWT authentication, and role-based access control',
                'CI/CD pipeline with GitHub Actions for automated testing, vulnerability scanning, and deployment'
            ];

            alltechFeatures.forEach(item => {
                addText('• ' + item, 9);
                yPos += 1;
            });

            addText('Technologies: Django, Node.js, React, Chakra UI, MeiliSearch, Redis, Supabase, OpenAI SDK, WebAuthn, Nginx, GitHub Actions', 8, false, [80, 80, 80]);
            yPos += 4;

            // Education
            addText('EDUCATION', 14, true, [0, 102, 204]);
            yPos += 2;
            addText('Bachelor of Science in Information and Communication Technology (BSc ICT)', 10, true);
            addText('KCA University, Nairobi, Kenya', 9);
            addText('Expected Graduation: November 2025', 9, false, [100, 100, 100]);

            // Save the PDF
            doc.save('John_Gachara_CV.pdf');
        }
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'glass glow-border' : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-3 sm:px-4">
                <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
                    {/* Logo */}
                    <a href="#home" className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold gradient-text flex-shrink-0">
                        JG
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-foreground hover:text-primary transition-colors font-inter whitespace-nowrap"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Download CV Button - Desktop */}
                    <div className="hidden md:block flex-shrink-0">
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
                        className="md:hidden text-foreground p-2 flex-shrink-0"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden pb-4 pt-2"
                    >
                        <div className="flex flex-col space-y-3">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-foreground hover:text-primary transition-colors font-inter py-2"
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
                                className="font-orbitron border-primary text-primary w-full text-sm"
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