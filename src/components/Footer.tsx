import { Link } from 'react-router-dom';
import { getAssetPath } from '../utils/assets';
import { aboutData } from '../data/about';
import { projects } from '../data/projects';

const Footer = () => {
  return (
    <footer className="pt-20 pb-16 border-t border-border-subtle bg-bg-primary relative z-10">
      <div className="container flex flex-col min-[968px]:flex-row justify-between items-start gap-[3rem] min-[968px]:gap-10 max-w-[800px] mx-auto pb-0">
        <div className="footer-brand">
          <Link to="/" className="block transition-transform duration-300 ease hover:scale-105 hover:-rotate-2">
            <img
              src={getAssetPath('/original_avatar.png')}
              alt="Devon Anderson"
              className="w-[80px] h-auto rounded-2xl block"
            />
          </Link>
        </div>
        <div className="flex flex-col min-[480px]:flex-row min-[968px]:justify-end justify-between flex-1 gap-8 min-[480px]:gap-4 min-[968px]:gap-16 w-full max-w-full">
          <div className="min-w-[120px]">
            <h4 className="mb-6 text-xs uppercase tracking-[0.15em] text-text-primary font-extrabold opacity-50">Navigation</h4>
            <Link to="/#work" className="block mb-3 text-text-secondary text-base transition-all duration-300 whitespace-nowrap font-medium hover:text-text-primary hover:translate-x-1">Work</Link>
            <Link to="/about" className="block mb-3 text-text-secondary text-base transition-all duration-300 whitespace-nowrap font-medium hover:text-text-primary hover:translate-x-1">About Me</Link>
            <Link to="/contact" className="block mb-3 text-text-secondary text-base transition-all duration-300 whitespace-nowrap font-medium hover:text-text-primary hover:translate-x-1">Contact Me</Link>
          </div>
          <div className="min-w-[120px]">
            <h4 className="mb-6 text-xs uppercase tracking-[0.15em] text-text-primary font-extrabold opacity-50">Case Studies</h4>
            {projects.map(project => (
              <Link key={project.id} to={project.link} className="block mb-3 text-text-secondary text-base transition-all duration-300 whitespace-nowrap font-medium hover:text-text-primary hover:translate-x-1">{project.title}</Link>
            ))}
          </div>
          <div className="min-w-[120px]">
            <h4 className="mb-6 text-xs uppercase tracking-[0.15em] text-text-primary font-extrabold opacity-50">Social</h4>
            <a href="https://linkedin.com/in/devonsa" target="_blank" rel="noopener noreferrer" className="block mb-3 text-text-secondary text-base transition-all duration-300 whitespace-nowrap font-medium hover:text-text-primary hover:translate-x-1">LinkedIn</a>
            <a href="https://twitter.com/devonsanderson" target="_blank" rel="noopener noreferrer" className="block mb-3 text-text-secondary text-base transition-all duration-300 whitespace-nowrap font-medium hover:text-text-primary hover:translate-x-1">Twitter / X</a>
            <a href={aboutData.resumeUrl} target="_blank" rel="noopener noreferrer" className="block mb-3 text-text-secondary text-base transition-all duration-300 whitespace-nowrap font-medium hover:text-text-primary hover:translate-x-1">Resumé</a>
          </div>
        </div>
      </div>
      
      {/* Explicit structural spacer block to prevent complex CSS margin collapses between grids */}
      <div style={{ height: '80px', width: '100%' }} aria-hidden="true" />
      
      <div className="container flex flex-col min-[480px]:flex-row justify-between min-[480px]:items-center pt-10 max-w-[800px] mx-auto text-text-secondary text-[0.9rem] border-t border-border-subtle gap-6 min-[480px]:gap-0 text-center min-[480px]:text-left">
        <p>&copy; {new Date().getFullYear()} Devon Anderson. Designed & Built with Love.</p>
        <div className="cursor-pointer flex items-center justify-center min-[480px]:justify-start gap-2 font-bold text-text-primary transition-all duration-300 hover:text-text-primary hover:-translate-y-[2px]" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to Top <span className="text-[1.2rem]">↑</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
