import { motion } from 'framer-motion';

const Waitlist = () => {
  return (
    <section className="waitlist" id="waitlist">
      <div className="container waitlist-content">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="waitlist-card"
        >
          <div className="coming-badge">🌞 Coming This Summer</div>
          <h2>Get Early Access</h2>
          <p>Join the waitlist to be among the first to experience the future of money management.</p>

          <div className="waitlist-form">
            <input type="email" placeholder="Your email..." />
            <button className="btn-primary">Join Waitlist</button>
          </div>

          <div className="decorative-arrows">
            <span>↑</span>
            <span>↑</span>
            <span>↑</span>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .waitlist {
          padding: 120px 0;
          background: var(--bg-secondary);
          overflow: hidden;
        }
        .waitlist-card {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 2rem;
          background: white;
          border-radius: 40px;
          border: 1px solid var(--border-subtle);
          box-shadow: 0 40px 100px rgba(0,0,0,0.03);
          position: relative;
        }
        .coming-badge {
          display: inline-block;
          padding: 8px 16px;
          background: var(--bg-secondary);
          border-radius: 100px;
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }
        .waitlist-card h2 {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
        }
        .waitlist-card p {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 3rem;
        }
        .waitlist-form {
          display: flex;
          gap: 1rem;
          max-width: 500px;
          margin: 0 auto;
          background: var(--bg-secondary);
          padding: 0.5rem;
          border-radius: 100px;
          border: 1px solid var(--border-subtle);
        }
        .waitlist-form input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 0 1.5rem;
          font-size: 1.05rem;
          outline: none;
          font-family: var(--font-body);
        }
        .decorative-arrows {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 3rem;
          font-size: 2rem;
          color: var(--text-primary);
          opacity: 0.8;
        }

        @media (max-width: 640px) {
          .waitlist-card h2 { font-size: 2.5rem; }
          .waitlist-form { flex-direction: column; border-radius: 20px; padding: 1rem; }
          .waitlist-form input { margin-bottom: 1rem; }
        }
      `}} />
    </section>
  );
};

export default Waitlist;
