import { Link } from 'react-router-dom';
import { getAssetPath } from '../utils/assets';
import { aboutData } from '../data/about';
import { projects } from '../data/projects';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <img
              src={getAssetPath('/original_avatar.png')}
              alt="Devon Anderson"
              className="footer-avatar"
              style={{
                width: '80px',
                height: 'auto',
                borderRadius: '16px',
                display: 'block'
              }}
            />
          </Link>
        </div>
        <div className="footer-nav">
          <div className="nav-column">
            <h4>Navigation</h4>
            <Link to="/#work">Work</Link>
            <Link to="/about">About Me</Link>
            <Link to="/contact">Contact Me</Link>
          </div>
          <div className="nav-column">
            <h4>Case Studies</h4>
            {projects.map(project => (
              <Link key={project.id} to={project.link}>{project.title}</Link>
            ))}
          </div>
          <div className="nav-column">
            <h4>Social</h4>
            <a href="https://linkedin.com/in/devonsa" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com/devonsanderson" target="_blank" rel="noopener noreferrer">Twitter / X</a>
            <a href={aboutData.resumeUrl} target="_blank" rel="noopener noreferrer">Resumé</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} Devon Anderson. Designed & Built with Love.</p>
        <div className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to Top <span>↑</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .footer {
          padding: 80px 0 40px;
          border-top: 1px solid var(--border-subtle);
          background: var(--bg-primary);
          position: relative;
          z-index: 10;
        }
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 50px;
          gap: 40px;
          max-width: 800px;
          margin: 0 auto 50px auto;
        }
        .footer-brand .logo {
          display: block;
          transition: transform 0.3s ease;
        }
        .footer-brand .logo:hover {
          transform: scale(1.05) rotate(-2deg);
        }
        .footer-avatar {
          border-radius: 16px !important;
          display: block;
        }
        .footer-nav {
          display: flex;
          flex: 1;
          justify-content: flex-end;
          gap: 4rem;
          max-width: 100%;
        }
        .nav-column {
          min-width: 120px;
        }
        .nav-column h4 {
          margin-bottom: 1.5rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-primary);
          font-weight: 800;
          opacity: 0.5;
        }
        .nav-column a {
          display: block;
          margin-bottom: 0.75rem;
          color: var(--text-secondary);
          font-size: 1rem;
          transition: var(--transition-smooth);
          white-space: nowrap;
          font-weight: 500;
        }
        .nav-column a:hover {
          color: var(--text-primary);
          transform: translateX(4px);
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 30px;
          max-width: 800px;
          margin: 0 auto;
          color: var(--text-secondary);
          font-size: 0.9rem;
          border-top: 1px solid var(--border-subtle);
        }
        .scroll-top {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          color: var(--text-primary);
          transition: var(--transition-smooth);
        }
        .scroll-top:hover {
          color: var(--text-primary);
          transform: translateY(-2px);
        }
        .scroll-top span {
          font-size: 1.2rem;
        }

        @media (max-width: 968px) {
          .footer-content { 
            flex-direction: column; 
            gap: 3rem; 
          }
          .footer-nav { 
            width: 100%;
            justify-content: space-between;
            gap: 1rem;
          }
        }
        @media (max-width: 480px) {
          .footer-nav { 
            flex-direction: column; 
            gap: 2rem; 
          }
          .footer-bottom { flex-direction: column; gap: 1.5rem; text-align: center; }
        }
      `}} />
    </footer>
  );
};

export default Footer;
