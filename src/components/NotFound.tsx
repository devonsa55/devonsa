import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <section className="pt-[20vh] md:pt-[220px] pb-[40px] md:pb-[80px] min-h-[85vh] flex flex-col items-center justify-center text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container max-w-2xl"
      >
        <h1 className="text-[clamp(6rem,15vw,12rem)] font-extrabold text-text-primary leading-none mb-4 font-heading tracking-tight">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl text-text-secondary font-bold mb-8 font-heading">
          Page not found
        </h2>
        <p className="text-text-secondary mb-12 text-lg font-body">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-8 py-4 bg-text-primary text-bg-primary rounded-full font-bold transition-transform hover:scale-105 active:scale-95 font-mono uppercase tracking-widest text-sm"
        >
          Return Home
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFound;
