import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Github, Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section className="min-h-screen py-20 relative flex items-center" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-5xl font-bold gradient-text mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground">
            Interested in AI security or intelligent automation? Let's build something together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="glass p-8 glow-border">
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center justify-center space-x-4 p-4 glass rounded-lg hover:glow-border transition-all">
                <Mail className="w-6 h-6 text-primary" />
                <a
                  href="mailto:johngachara29@gmail.com"
                  className="text-lg text-foreground hover:text-primary transition-colors"
                >
                  johngachara29@gmail.com
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center justify-center space-x-4 p-4 glass rounded-lg">
                <MapPin className="w-6 h-6 text-secondary" />
                <span className="text-lg text-foreground">Nairobi, Kenya</span>
              </div>

              {/* GitHub Button */}
              <div className="flex justify-center pt-4">
                <Button
                  size="lg"
                  className="gradient-primary text-primary-foreground font-orbitron glow-border hover:scale-105 transition-transform"
                  onClick={() => window.open('https://github.com/johngachara', '_blank')}
                >
                  <Github className="w-5 h-5 mr-2" />
                  View GitHub Profile
                </Button>
              </div>

              {/* Call to Action */}
              <div className="text-center pt-6 border-t border-border">
                <p className="text-muted-foreground italic">
                  "Building intelligent systems that make the digital world safer, one line of code at a time."
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground text-sm">
            © 2025 John Gachara
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
