import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects, ProjectCaseStudy } from '../data/projects';
import SectionHeader from './ui/SectionHeader';

import ConstructionTape from './ui/ConstructionTape';

// TOGGLE WIP MODE HERE
const IS_UNDER_CONSTRUCTION = true;

const Work = () => {
  useState<ProjectCaseStudy | null>(null);
  const isUnderConstruction = IS_UNDER_CONSTRUCTION;

  // No-op useEffect to clear ben-specific styles if they were set
  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty('--ben-hover-color');
    };
  }, []);

  return (
    <section id="work" className="work">
      <div className="container">
        <SectionHeader
          title="Selected Work"
          subtitle="A collection of products I've helped build over the years."
          className="work-header"
        />

        <div className={`work-grid ${isUnderConstruction ? 'is-under-construction' : ''}`} style={{ position: 'relative' }}>
          {isUnderConstruction && <ConstructionTape />}
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="project-card"
            >
              <Link to={project.link} className="project-link">
                <div className="project-image-container">
                  <img src={project.image} alt={project.title} className={`project-card-image ${project.image.endsWith('.svg') ? 'is-logo' : ''}`} />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
