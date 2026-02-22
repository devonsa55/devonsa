import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageSquare, Video, Store, Shield, Fingerprint, GitMerge, TrendingUp } from 'lucide-react';
import { projects, ProjectCaseStudy } from '../data/projects';
import { strategyFrameworks } from '../data/strategy';
import SectionHeader from './ui/SectionHeader';
import SplitFlapBoard from './ui/SplitFlapBoard';

// Import Animated Components
import AnimatedConversationalInsights from './animated-icons/AnimatedConversationalInsights';
import AnimatedShopStream from './animated-icons/AnimatedShopStream';
import AnimatedMerchantComms from './animated-icons/AnimatedMerchantComms';
import AnimatedFamilySafety from './animated-icons/AnimatedFamilySafety';

// TOGGLE WIP MODE: Set to false to show work
const IS_UNDER_CONSTRUCTION = false;

const getIcon = (iconName?: string) => {
  switch (iconName) {
    // Work Icons
    case 'MessageSquare': return <MessageSquare size={120} />;
    case 'Video': return <Video size={120} />;
    case 'Store': return <Store size={120} />;
    case 'Shield': return <Shield size={120} />;
    // Strategy Icons
    case 'Fingerprint': return <Fingerprint size={120} />;
    case 'GitMerge': return <GitMerge size={120} />;
    case 'TrendingUp': return <TrendingUp size={120} />;
    default: return null;
  }
};

const Work = () => {
  useState<ProjectCaseStudy | null>(null);
  const isUnderConstruction = IS_UNDER_CONSTRUCTION;

  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty('--ben-hover-color');
    };
  }, []);


  const renderProjects = () => (
    <>
      <SectionHeader
        title="Core Initiatives"
        subtitle="Leading 0→1 product strategy and defining design systems at Google scale."
        className="work-header"
      />

      <div className={`work-grid ${isUnderConstruction ? 'is-under-construction' : ''}`}>
        {isUnderConstruction ? (
          <SplitFlapBoard />
        ) : (
          projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                y: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className={`project-card ${project.id === 'conversational-insights' ? 'span-2-col span-2-row' : ''} ${project.id === 'merchant-comms' ? 'span-2-row' : ''} ${project.id === 'family-safety-platforms' ? 'top-align' : ''}`}
            >
              <Link to={project.link} className="project-link">
                <div
                  className="project-image-container"
                  style={{ backgroundColor: project.cardImageBg || 'transparent' }}
                >
                  {project.animatedIcon === 'conversational-insights' && <AnimatedConversationalInsights className="project-card-image is-logo" />}
                  {project.animatedIcon === 'shopstream' && <AnimatedShopStream className="project-card-image is-logo" />}
                  {project.animatedIcon === 'merchant-comms' && <AnimatedMerchantComms className="project-card-image is-logo" />}
                  {project.animatedIcon === 'family-safety' && <AnimatedFamilySafety className="project-card-image is-logo" />}

                  {!project.animatedIcon && project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`project-card-image ${project.image.endsWith('.svg') ? 'is-logo' : ''}`}
                    />
                  )}

                  {!project.animatedIcon && !project.image && (
                    <div className="project-placeholder">
                      <div className="placeholder-content">
                        <div className="placeholder-icon">
                          {getIcon(project.iconName)}
                        </div>
                        <span className="placeholder-label">{project.title}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description || project.subtitle}</p>
                  <div className="read-more">
                    Read more <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </>
  );

  const renderStrategy = () => (
    <div className="strategy-section">
      <SectionHeader
        title="Strategy & Frameworks"
        subtitle="Methodologies I use to solve complex problems and build consensus."
      />

      <div className="strategy-grid">
        {strategyFrameworks.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              y: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="article-card-wrapper"
          >
            <Link to={item.link} className="article-card">
              <div
                className="article-thumbnail"
                style={{ backgroundColor: item.cardImageBg || 'var(--bg-secondary)' }}
              >
                {item.image ? (
                  <img src={item.image} alt={item.title} />
                ) : (
                  <div className="project-placeholder">
                    <div className="placeholder-content">
                      <div className="placeholder-icon">
                        {getIcon(item.iconName)}
                      </div>
                      <span className="placeholder-label">{item.title}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="article-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="read-more">
                  Read more <span>→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="work" className="work">
      <div className="container">
        {renderProjects()}
        {renderStrategy()}
      </div>
    </section>
  );
};

export default Work;
