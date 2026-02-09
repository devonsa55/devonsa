import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  {
    question: "When will Bill be available?",
    answer: "We are currently in private beta. Bill is scheduled for a public release this summer. Join our waitlist to get early access and updates."
  },
  {
    question: "What countries will Bill be available in?",
    answer: "Bill will initially be available in Canada, supporting all major Canadian banking institutions. We plan to expand to other regions in late 2026."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use bank-level 256-bit encryption and are fully compliant with Canadian privacy regulations. Your data is always encrypted and we never sell your information."
  }
];

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span className={`faq-icon ${isOpen ? 'open' : ''}`}>+</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="faq-answer"
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="faq-content">
          <h2>Common Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .faq {
          padding: 100px 0;
          background: transparent;
        }
        .faq-content {
          max-width: 800px;
          margin: 0 auto;
        }
        .faq-content h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 4rem;
        }
        .faq-item {
          border-bottom: 1px solid var(--border-subtle);
        }
        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 0;
          font-size: 1.25rem;
          font-weight: 600;
          text-align: left;
          color: var(--text-primary);
        }
        .faq-icon {
          font-size: 1.5rem;
          transition: transform 0.3s ease;
          color: var(--accent-purple);
        }
        .faq-icon.open {
          transform: rotate(45deg);
        }
        .faq-answer {
          overflow: hidden;
        }
        .faq-answer p {
          padding-bottom: 2rem;
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1.1rem;
        }
      `}} />
    </section>
  );
};

export default FAQ;
