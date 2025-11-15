import { motion } from "framer-motion";
import { Card } from "./ui/card";

const About = () => {
  const values = [
    {
      title: "Security-First",
      description: "Every system I build prioritizes protection and resilience"
    },
    {
      title: "Intelligence Over Patterns",
      description: "AI that understands context, not just matches rules"
    },
    {
      title: "Cost-Conscious Design",
      description: "Smart architecture that scales without exploding budgets"
    },
    {
      title: "Real-World Testing",
      description: "All projects are deployed and battle-tested in production"
    }
  ];

  return (
    <section className="min-h-screen py-20 relative" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-5xl font-bold gradient-text mb-4">
            The Vision
          </h2>
          <p className="text-xl text-muted-foreground">
            Building the future of intelligent security systems
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main About Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass p-8 mb-8 glow-border">
              <h3 className="font-orbitron text-2xl font-bold text-primary mb-4">Who I Am</h3>
              <p className="text-lg text-foreground mb-6">
                I'm <span className="text-primary font-semibold">John Gachara</span>, a Software Engineer and AI Enthusiast based in Nairobi, Kenya. I build intelligent systems that solve real-world security and automation challenges.
              </p>

              <h3 className="font-orbitron text-2xl font-bold text-secondary mb-4">What Drives Me</h3>
              <p className="text-lg text-foreground mb-6">
                I believe AI should be practical, cost-effective, and accessible. My projects focus on creating intelligent solutions that real businesses can deploy without breaking the bank—like running enterprise-grade security for under $10/month.
              </p>

              <h3 className="font-orbitron text-2xl font-bold text-accent mb-4">Currently</h3>
              <ul className="space-y-2 mb-6">
                {[
                  "Innovations Intern at Computer Revolution Africa",
                  "Building the CyberGuard ecosystem",
                  "Researching model optimization for faster inference",
                  "Planning January 2026 open source releases"
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-primary mr-2">▸</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="font-orbitron text-2xl font-bold text-success mb-4">Education</h3>
              <p className="text-lg text-foreground">
                <span className="font-semibold">Bachelor of Science in Information and Communication Technology (BSc ICT)</span>
                <br />
                KCA University, Nairobi, Kenya | Expected Graduation: November 2025
              </p>
            </Card>
          </motion.div>

          {/* My Approach - Values Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-orbitron text-3xl font-bold text-center mb-8 gradient-text">My Approach</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="glass p-6 h-full hover:glow-border transition-all">
                    <h4 className="font-orbitron text-xl font-bold text-primary mb-3">
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground">{value.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
