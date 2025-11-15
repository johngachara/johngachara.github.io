import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface ProjectCardProps {
  project: {
    title: string;
    subtitle: string;
    tagline: string;
    description: string;
    features: Array<{ name: string; details: string }>;
    impact: string[];
    tech: string[];
    color: string;
    glowColor: string;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <Card className="glass p-8 glow-border hover:shadow-2xl transition-all">
        {/* Header */}
        <div className="mb-6">
          <div className={`inline-block bg-gradient-to-r ${project.color} p-0.5 rounded-lg mb-4`}>
            <div className="bg-card px-4 py-2 rounded-lg">
              <h3 className="font-orbitron text-3xl font-bold">{project.title}</h3>
            </div>
          </div>
          <p className="text-xl text-secondary font-semibold mb-2">{project.subtitle}</p>
          <p className="text-lg text-accent italic">"{project.tagline}"</p>
        </div>

        {/* Origin Story */}
        <div className="mb-6 p-4 glass rounded-lg border-l-4 border-primary">
          <p className="text-muted-foreground italic">{project.description}</p>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-orbitron text-xl font-semibold mb-4 text-primary">Key Components</h4>
          <div className="grid md:grid-cols-3 gap-4">
            {project.features.map((feature) => (
              <div key={feature.name} className="glass p-4 rounded-lg hover:glow-border transition-all">
                <h5 className="font-bold text-secondary mb-2">{feature.name}</h5>
                <p className="text-sm text-muted-foreground">{feature.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className="mb-6">
          <h4 className="font-orbitron text-xl font-semibold mb-4 text-success">Real-World Impact</h4>
          <ul className="space-y-2">
            {project.impact.map((item) => (
              <li key={item} className="flex items-start">
                <span className="text-success mr-2">▸</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div>
          <h4 className="font-orbitron text-sm font-semibold mb-3 text-muted-foreground">TECH STACK</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="outline" className="font-mono text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
