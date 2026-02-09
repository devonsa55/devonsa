import { motion } from 'framer-motion';

const infoItems = [
  {
    title: 'Connected',
    description: 'We prioritize your financial safety. Bill connects with over 100+ banking institutions in Canada, ensuring you always have a real-time view of your money across all your accounts.',
  },
  {
    title: 'Friendly',
    description: 'A friendly and intuitive experience is at the heart of Bill. We make managing your money feel as easy as talking with a friend. No complex jargon, just clear and helpful insights.',
  },
  {
    title: 'Canadian',
    description: 'Built by Canadians, for Canadians. We understand the unique financial landscape of Canada and have built Bill to meet all local privacy and security requirements.',
  },
  {
    title: 'Secure',
    description: 'Security is our top priority. We use industry-standard encryption and security protocols to ensure your data stays private and secure at all times. 256-bit SSL encryption.',
  }
];

const InfoGrid = () => {
  return (
    <section className="info-grid">
      <div className="container grid-container">
        {infoItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="info-item"
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </motion.div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .info-grid {
          padding: 120px 0;
          background: transparent;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          column-gap: 6rem;
          row-gap: 4rem;
        }
        .info-item h3 {
          font-size: 1.75rem;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }
        .info-item p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .grid-container { grid-template-columns: 1fr; gap: 3rem; }
        }
      `}} />
    </section>
  );
};

export default InfoGrid;
