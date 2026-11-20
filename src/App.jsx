import { useState } from 'react';
import CustomCursor from './components/cursor/CustomCursor';
import Navbar from './components/navbar/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import SkillsEducation from './components/sections/SkillsEducation';
import Footer from './components/sections/Footer';
import ProjectModal from './components/modals/ProjectModal';
import ContactModal from './components/modals/ContactModal';

export default function App() {
  const [darkSectionsOnly, setDarkSectionsOnly] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070B09] text-[#E5EFEA] font-sans selection:bg-[#00FF41] selection:text-[#050807] overflow-x-hidden">
      {/* Background-Switchable Dynamic Custom Cursor */}
      <CustomCursor />

      {/* Top Navbar with Sizzle + Terminal Blink Hover Effect */}
      <Navbar
        darkSectionsOnly={darkSectionsOnly}
        setDarkSectionsOnly={setDarkSectionsOnly}
      />

      {/* Hero Section (Terminal CMD - Strict Horizontal 2-Column with 40x40 Avatar) */}
      <Hero onOpenContact={() => setContactOpen(true)} />

      {/* 01. About Me (Adaptive Light/Hybrid or CMD Dark) */}
      <About darkSectionsOnly={darkSectionsOnly} />

      {/* 02. Selected Work (Dark CMD) */}
      <Projects onSelectProject={(project) => setSelectedProject(project)} />

      {/* 03. Skills & 04. Education (Adaptive Light/Hybrid or CMD Dark) */}
      <SkillsEducation darkSectionsOnly={darkSectionsOnly} />

      {/* 05. Let's Connect & Footer (Dark CMD) */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* Interactive Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Quick Contact Terminal Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
