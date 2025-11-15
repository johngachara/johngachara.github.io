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
