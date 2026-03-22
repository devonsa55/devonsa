import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { aiProjects } from '../data/ai-projects';
import { ArrowLeft, Home } from 'lucide-react';
import { Badge } from './ui/badge';
import ProfileCard from './ui/ProfileCard';
import MDViewer from './ui/MDViewer';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

const AIProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = aiProjects.find(p => p.id === projectId);

  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) setIsVisible(true);
      else if (currentScrollY > lastScrollY.current + 5) setIsVisible(false);
      else if (currentScrollY < lastScrollY.current - 5) setIsVisible(true);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="section container mt-32 text-center">
        <h1>AI Project not found</h1>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  return (
    <motion.div {...fadeIn} className="project-detail project-visual-root">
      <div className="container pb-32">
        <motion.nav
          initial={false}
          animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="sticky-nav-wrapper z-50 bg-background/80 backdrop-blur-md"
        >
          <div className="nav-container py-4">
            <Link to="/" className="back-link flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={18} />
              <span>Back to Work</span>
            </Link>
          </div>
        </motion.nav>

        <header className="block mt-[10vh] mb-12">
          {project.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="mb-4 mr-2 bg-muted text-muted-foreground">
              {tag}
            </Badge>
          ))}
          <motion.h1
            className="font-heading text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] mb-6 break-words tracking-tight"
            {...fadeInUp}
            transition={{ delay: 0.1 }}
          >
            {project.title}
          </motion.h1>
          <motion.p
            className="text-[clamp(1.2rem,2.5vw,1.5rem)] text-muted-foreground max-w-[800px] leading-relaxed"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {project.subtitle}
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-y border-border-subtle my-[60px]">
          <div className="meta-item">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Role</h3>
            <p className="font-medium">{project.role}</p>
          </div>
          <div className="meta-item">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Timeline</h3>
            <p className="font-medium">{project.timeline}</p>
          </div>
        </div>

        <section className="project-section intro-section grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-[100px]">
          <div className="section-content">
            <h2 className="text-2xl font-semibold mb-4 section-label">The Problem</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{project.problem}</p>
          </div>
          {project.solution && (
            <div className="section-content solution-content">
              <h2 className="text-2xl font-semibold mb-4 section-label">The Solution Workflow</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{project.solution}</p>
            </div>
          )}
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-heading mb-8">Resources & Instructions</h2>
          <div className="p-0.5 rounded-sm bg-border-subtle">
            <div className="bg-background rounded-sm overflow-hidden shadow-2xl">
              <MDViewer instructions={project.instructions} />
            </div>
          </div>
        </section>

        <div className="project-footer mt-[120px] mb-8" style={{ display: 'flex', justifyContent: 'center' }}>
          <ProfileCard
            icon={<Home size={20} />}
            text="Back to Home"
            subtext="See more of my work"
            link="/"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AIProjectDetail;
