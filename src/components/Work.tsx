import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Video, Store, Shield, Fingerprint, GitMerge, TrendingUp } from 'lucide-react';
import { projects, ProjectCaseStudy } from '../data/projects';
import { strategyFrameworks } from '../data/strategy';
import SectionHeader from './ui/SectionHeader';
import SplitFlapBoard from './ui/SplitFlapBoard';

// TOGGLE WIP MODE HERE
const IS_UNDER_CONSTRUCTION = false;

const Work = () => {
  useState<ProjectCaseStudy | null>(null);
  const isUnderConstruction = IS_UNDER_CONSTRUCTION;

  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty('--ben-hover-color');
    };
  }, []);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      // Work Icons
      case 'MessageSquare': return <MessageSquare size={48} />;
      case 'Video': return <Video size={48} />;
      case 'Store': return <Store size={48} />;
      case 'Shield': return <Shield size={48} />;
      // Strategy Icons
      case 'Fingerprint': return <Fingerprint size={48} />;
      case 'GitMerge': return <GitMerge size={48} />;
      case 'TrendingUp': return <TrendingUp size={48} />;
      default: return null;
    }
  };


  const renderProjects = () => (
    <>
      <SectionHeader
        title="Selected Work"
        subtitle="A collection of products I've helped build over the years."
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
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`project-card ${project.id === 'conversational-insights' ? 'span-2-col span-2-row' : ''} ${project.id === 'merchant-comms' ? 'span-2-row' : ''}`}
            >
              <Link to={project.link} className="project-link">
                <div className="project-image-container">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`project-card-image ${project.image.endsWith('.svg') ? 'is-logo' : ''}`}
                    />
                  ) : (
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
                  <div className="project-tags">
                    {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
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
        {strategyFrameworks.map((item) => (
          <Link key={item.id} to={item.link} className="article-card">
            <div className="article-thumbnail">
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
                Read more <span><ArrowRight size={16} /></span>
              </div>
            </div>
          </Link>
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
