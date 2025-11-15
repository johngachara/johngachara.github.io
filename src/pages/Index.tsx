import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import StarField from "@/components/StarField";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* 3D Star Field Background */}
      <StarField />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </div>
    </div>
  );
};

export default Index;
