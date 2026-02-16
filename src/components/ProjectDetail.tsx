import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ArrowLeft, CheckCircle2, Home, Monitor, TrendingUp, Cpu, Wrench, Youtube, MessageSquare, Store, Shield, Video, Zap, Share2, Smartphone, GitMerge, Users, RefreshCcw, CircleAlert, Map, LayoutGrid, Palette, Star } from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';
import ProfileCard from './ui/ProfileCard';
import { fadeInUp, fadeIn } from '../utils/motion';



const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find(p => p.id === projectId);

  const iconMap: Record<string, React.ReactNode> = {
    Monitor: <Monitor size={48} />,
    TrendingUp: <TrendingUp size={48} />,
    Cpu: <Cpu size={48} />,
    Wrench: <Wrench size={48} />,
    Youtube: <Youtube size={48} />,
    MessageSquare: <MessageSquare size={48} />,
    Store: <Store size={48} />,
    Shield: <Shield size={48} />,
    Video: <Video size={48} />,
    Zap: <Zap size={48} />,
    Share2: <Share2 size={48} />,
    Smartphone: <Smartphone size={48} />,
    GitMerge: <GitMerge size={48} />,
    Users: <Users size={48} />,
    RefreshCcw: <RefreshCcw size={48} />,
    CircleAlert: <CircleAlert size={48} />,
    Map: <Map size={48} />,
    LayoutGrid: <LayoutGrid size={48} />,
    Palette: <Palette size={48} />,
    Star: <Star size={48} />
  };

  const renderPlaceholder = (iconName?: string, title?: string) => {
    const IconComponent = iconName ? iconMap[iconName] : null;
    return (
      <div className="placeholder-media" data-icon={iconName}>
        <div className="placeholder-icon">
          {IconComponent || <Video size={48} />}
        </div>
        {title && <span className="placeholder-label">{title}</span>}
      </div>
    );
  };


  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the very top
      if (currentScrollY < 50) {
        setIsVisible(true);
      }
      // Scrolling down - hide
      else if (currentScrollY > lastScrollY.current + 5) {
        setIsVisible(false);
      }
      // Scrolling up - show
      else if (currentScrollY < lastScrollY.current - 5) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="section container">
        <h1>Project not found</h1>
        <Button to="/">Back to Home</Button>
      </div>
    );
  }

  if (project.template === 'slack') {
    return (
      <motion.div {...fadeIn} className="project-detail slack-template">
        <div className="container">
          <motion.nav
            initial={false}
            animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="sticky-nav-wrapper"
          >
            <div className="nav-container">
              <Link to="/" className="back-link">
                <ArrowLeft size={18} />
                <span>Back to Work</span>
              </Link>
            </div>
          </motion.nav>

          <header className="slack-header">
            <motion.h1 {...fadeInUp}>{project.title}</motion.h1>
            <motion.p className="slack-intro-text" {...fadeInUp} transition={{ delay: 0.1 }}>
              {project.problem}
            </motion.p>
          </header>

          <div className="slack-metadata-bar">
            <div className="meta-col">
              <span className="meta-label">Role</span>
              <span className="meta-value">{project.role}</span>
            </div>
            <div className="meta-col">
              <span className="meta-label">Team</span>
              <span className="meta-value">{project.team}</span>
            </div>
            <div className="meta-col">
              <span className="meta-label">Scale</span>
              <span className="meta-value">{project.result || '18M+ Merchants'}</span>
            </div>
            <div className="meta-col">
              <span className="meta-label">Impact</span>
              <span className="meta-value">{project.impact || 'Global Scale'}</span>
            </div>
          </div>

          <div className="slack-visual-scroll">
            {project.sections?.map((section, idx) => (
              <div key={idx} className="slack-section">
                <div className="slack-visual">
                  {section.image ? (
                    <img src={section.image} alt={section.title} />
                  ) : (
                    renderPlaceholder(section.icon, section.title)
                  )}
                </div>
                <div className="slack-annotation">
                  <h3>{section.title}</h3>
                  <p>{section.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="project-footer slack-footer">
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
  }

  return (
    <motion.div
      {...fadeIn}
      className="project-detail project-visual-root"
    >
      <div className="container">
        <motion.nav
          initial={false}
          animate={{
            y: isVisible ? 0 : -100,
            opacity: isVisible ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="sticky-nav-wrapper"
        >
          <div className="nav-container">
            <Link to="/" className="back-link">
              <ArrowLeft size={18} />
              <span>Back to Work</span>
            </Link>
          </div>
        </motion.nav>

        <header className="project-header">
          <Badge className="project-badge">
            {project.tags[0]} Case Study
          </Badge>
          <motion.h1
            {...fadeInUp}
            transition={{ delay: 0.1 }}
          >
            {project.title}
          </motion.h1>
          <motion.p
            className="subtitle"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {project.subtitle}
          </motion.p>
        </header>

        {(project.heroVideo || project.heroImage || project.heroIcon) && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="project-hero-media"
          >
            {project.heroVideo ? (
              <div className="video-container">
                <iframe
                  src={project.heroVideo}
                  title={`${project.title} Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            ) : project.heroImage ? (
              <img src={project.heroImage} alt={project.title} className="hero-image" />
            ) : (
              renderPlaceholder(project.heroIcon, 'Project Hero')
            )}
          </motion.div>
        )}

        <div className="project-meta-grid">
          <div className="meta-item">
            <h3>Role</h3>
            <p>{project.role}</p>
          </div>
          <div className="meta-item">
            <h3>Team</h3>
            <p>{project.team}</p>
          </div>
          <div className="meta-item">
            <h3>Timeline</h3>
            <p>{project.timeline}</p>
          </div>
          {project.result && (
            <div className="meta-item">
              <h3>{project.resultLabel || 'Result'}</h3>
              <p>{project.result}</p>
            </div>
          )}
        </div>

        <section className="project-section intro-section">
          <div className="section-content">
            <h2 className="section-label">The Challenge</h2>
            <p className="large-text">{project.problem}</p>
          </div>
          {project.solution && (
            <div className="section-content solution-content" style={{ marginTop: '4rem' }}>
              <h2 className="section-label">The Solution</h2>
              <p className="large-text">{project.solution}</p>
            </div>
          )}
        </section>

        {project.sections?.map((section, index) => (
          <section key={index} className={`project-section ${section.layout || 'side-by-side'}`}>
            <div className="section-text">
              {section.title && <h2>{section.title}</h2>}
              <div className="section-content">
                {Array.isArray(section.content) ? (
                  <ul className="content-list">
                    {section.content.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                ) : (
                  <p>{section.content}</p>
                )}
              </div>
            </div>
            {(section.image || section.video || section.icon) && (
              <div className="section-media">
                {section.video ? (
                  <div className="video-container">
                    <iframe
                      src={section.video}
                      title={section.title}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : section.image ? (
                  <img src={section.image} alt={section.title || 'Project Visual'} className="project-image" />
                ) : (
                  renderPlaceholder(section.icon, section.title)
                )}
              </div>
            )}
          </section>
        ))}

        {project.outcomes && (
          <section className="project-section outcomes">
            <h2 className="section-label">Results & Outcomes</h2>
            <div className="outcomes-grid">
              {project.outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="outcome-card"
                >
                  <CheckCircle2 size={24} className="check-icon" />
                  <p>{outcome}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {project.challenge && (
          <section className="project-section challenge">
            <div className="challenge-card-premium">
              <div className="challenge-content">
                <span className="challenge-label">The Toughest Challenge</span>
                <h2>Turning complexity into simplicity</h2>
                <p>{project.challenge}</p>
              </div>
            </div>
          </section>
        )}

        <div className="project-footer" style={{ display: 'flex', justifyContent: 'center', paddingBottom: '8rem' }}>
          <ProfileCard
            icon={<Home size={20} />}
            text="Back to Home"
            subtext="See more of my work"
            link="/"
          />
        </div>
      </div>
    </motion.div >
  );
};

export default ProjectDetail;
