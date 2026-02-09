import { motion } from 'framer-motion';

const features = [
  { icon: '📅', title: 'Schedule all your tasks', color: '#ff7eb3' },
  { icon: '📊', title: 'Deliverables overview', color: '#818be4' },
  { icon: '💡', title: 'Planning insights', color: '#ffd080' },
  { icon: '🧩', title: 'Investment outcomes', color: '#85e0bc' },
  { icon: '🛡️', title: 'Ad-patent pending', color: '#ed8181' },
  { icon: '🏦', title: 'Personal accounts', color: '#818be4' },
  { icon: '💰', title: 'Visualize your money', color: '#ff7eb3' },
  { icon: '🔍', title: 'Follow up on rows', color: '#818be4' },
];

const Features = () => {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="features-header">
          <h2>Everything you need at a glance</h2>
          <p>Bill allows you to manage everything related to your finances and goals in a single, beautiful dashboard.</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="feature-card"
            >
              <div className="feature-icon" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .features {
          padding: 100px 0;
          background: transparent;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }
        .features-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 60px;
        }
        .features-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .features-header p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        .feature-card {
          background: white;
          padding: 2.5rem 2rem;
          border-radius: 24px;
          text-align: center;
          transition: var(--transition-smooth);
          border: 1px solid var(--border-subtle);
        }
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .feature-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          margin: 0 auto 1.5rem;
        }
        .feature-card h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .features-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </section>
  );
};

export default Features;
