import { motion } from "framer-motion";
import { Card } from "./ui/card";

const Skills = () => {
  const skillCategories = [
    {
      name: "AI & Machine Learning",
      skills: ["LLM Integration (GPT-4.1, Llama, Granite)", "Prompt Engineering", "Model Optimization", "Agentic AI Systems"],
      color: "from-accent to-primary"
    },
    {
      name: "Languages",
      skills: ["Python", "JavaScript", "TypeScript"],
      color: "from-primary to-secondary"
    },
    {
      name: "Frontend",
      skills: ["React", "Vite", "Chakra UI", "Three.js", "HTML/CSS", "Zustand", "Redux"],
      color: "from-secondary to-success"
    },
    {
      name: "Backend",
      skills: ["Django", "Express.js", "Celery", "Gunicorn", "RESTful APIs"],
      color: "from-success to-warning"
    },
    {
      name: "Databases",
      skills: ["PostgreSQL", "Firestore", "MeiliSearch", "Supabase", "Redis"],
      color: "from-warning to-accent"
    },
    {
      name: "Cloud & DevOps",
      skills: ["Docker", "AWS", "Firebase", "Nginx", "VPS", "GitHub Actions", "Grafana"],
      color: "from-accent to-primary"
    },
    {
      name: "Security",
      skills: ["ModSecurity WAF", "CrowdSec", "Snort 3 IPS", "WebAuthn", "JWT", "OAuth", "iptables", "Cloudflare"],
      color: "from-primary to-destructive"
    }
  ];

  return (
    <section className="min-h-screen py-20 relative" id="skills">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-5xl font-bold gradient-text mb-4">
            The Arsenal
          </h2>
          <p className="text-xl text-muted-foreground">
            Technologies and tools I use to build intelligent systems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="glass p-6 h-full hover:glow-border transition-all">
                <div className={`inline-block bg-gradient-to-r ${category.color} p-0.5 rounded-lg mb-4`}>
                  <div className="bg-card px-4 py-2 rounded-lg">
                    <h3 className="font-orbitron text-lg font-bold">{category.name}</h3>
                  </div>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-start">
                      <span className="text-primary mr-2 mt-1">▸</span>
                      <span className="text-sm text-muted-foreground">{skill}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
