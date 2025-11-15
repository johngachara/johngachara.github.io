import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projects = [
    {
      title: "CyberGuard",
      subtitle: "AI Security Ecosystem",
      tagline: "Real-time threat detection powered by two-tier AI intelligence",
      description: "Born from a zero-day attack that locked me out of my own system. I built CyberGuard to ensure that never happens again—to me or anyone else.",
      features: [
        {
          name: "Security Agent",
          details: "Docker-containerized monitoring engine with two-tier AI (Granite-4-Tiny-H 7B + Llama 3.3 70B)"
        },
        {
          name: "Visual Dashboard",
          details: "Real-time security visualization with AI reasoning transparency"
        },
        {
          name: "Chat Interface",
          details: "Natural language query system for instant security insights"
        }
      ],
      impact: [
        "90% of decisions handled locally = <$10/month costs",
        "Automated IP blocking with confidence-based scoring",
        "Full audit trail in Supabase for all security events"
      ],
      tech: ["Node.js", "Docker", "Ollama", "Cerebras Cloud", "Redis", "Supabase", "React", "Vite"],
      color: "from-primary to-secondary",
      glowColor: "rgba(0, 217, 255, 0.5)"
    },
    {
      title: "IT Support Assistant",
      subtitle: "AI-Powered Documentation",
      tagline: "Transforming hours of paperwork into minutes of intelligent reporting",
      description: "Technicians spend 4+ hours daily on paperwork. This system cuts report writing time by 50-60% while improving quality.",
      features: [
        {
          name: "Smart Report Generation",
          details: "AI-powered analysis with web search for latest solutions and best practices"
        },
        {
          name: "24/7 Technical Chatbot",
          details: "Real-time answers to technical questions with current web information"
        },
        {
          name: "Task Monitoring",
          details: "Convert all recommendations to trackable tasks with completion status"
        }
      ],
      impact: [
        "Report time: 25-30 min → 10-15 min (50-60% reduction)",
        "2-3 hours saved per technician per day",
        "Complete repair history for knowledge continuity"
      ],
      tech: ["Python", "Node.js", "GPT-4.1 Mini", "Web Search APIs", "PDF Generation", "React"],
      color: "from-success to-warning",
      glowColor: "rgba(0, 255, 136, 0.5)"
    },
      {
          title: "Crop Quality Assessment AI",
          subtitle: "AI-Powered Agricultural Analysis",
          tagline: "Intelligent produce quality evaluation for farming e-commerce platform",
          description: "A multimodal AI prototype that analyzes agricultural produce images to classify quality and generate ratings, designed to streamline quality control for farming e-commerce marketplaces.",
          features: [
              {
                  name: "Advanced Crop Analysis",
                  details: "Identifies crop types and provides comprehensive quality assessments with 100-point rating system"
              },
              {
                  name: "Multi-Criteria Evaluation",
                  details: "Analyzes appearance (25%), texture (20%), ripeness (25%), defects (20%), and commercial viability (10%)"
              },
              {
                  name: "Quality Classification",
                  details: "6-tier grading system from EXCELLENT (90-100) to BAD (0-19) with detailed feature analysis"
              },
              {
                  name: "Interactive Shell Interface",
                  details: "User-friendly CLI for continuous image analysis with real-time feedback and recommendations"
              }
          ],
          impact: [
              "Automated quality assessment replaces manual inspection",
              "Standardized grading system ensures marketplace consistency",
              "Detailed feature analysis (color, texture, ripeness, defects) guides pricing",
              "Commercial viability scoring indicates shelf life and market readiness"
          ],
          tech: ["Python", "OpenAI SDK", "GitHub Models API", "GPT-4 Mini", "Image Processing", "CLI"],
          color: "from-green-500 to-emerald-600",
          glowColor: "rgba(34, 197, 94, 0.5)"
      },
      {
          title: "Alltech MCP Integration",
          subtitle: "AI-Powered Business Intelligence",
          tagline: "Real-time database insights through natural language queries",
          description: "A Model Context Protocol integration that connects GPT-4.1 Mini directly to the business transactions database, enabling AI-powered analysis and automatic business health reports without manual intervention.",
          features: [
              {
                  name: "Direct Database Connection",
                  details: "GPT-4.1 Mini queries live transaction data to generate real-time business insights"
              },
              {
                  name: "Transaction Analytics",
                  details: "Automated daily and weekly summaries with sales patterns and stock analysis"
              },
              {
                  name: "Natural Language Queries",
                  details: "Ask questions in plain English - 'What products need restocking?' or 'Summarize today's revenue'"
              },
              {
                  name: "Smart Inventory Alerts",
                  details: "Identifies low-stock products based on recent sales patterns and velocity"
              }
          ],
          impact: [
              "Eliminates manual report generation for business health monitoring",
              "No expensive analytics dashboards or external platforms needed",
              "Real-time performance analysis with minimal server load",
              "Foundation for automated WhatsApp business reports"
          ],
          tech: ["GPT-4.1 Mini", "OpenAI SDK", "Model Context Protocol", "Database Integration", "Node.js", "SQL"],
          color: "from-blue-500 to-cyan-600",
          glowColor: "rgba(59, 130, 246, 0.5)"
      }
  ];

  return (
    <section className="min-h-screen py-20 relative" id="projects">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-5xl font-bold gradient-text mb-4">
            The Innovation Lab
          </h2>
          <p className="text-xl text-muted-foreground">
            Building intelligent systems that solve real-world challenges
          </p>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
