import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { fadeInUp } from '../utils/motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <section id="contact" className="contact roundy-style">
                <div className="container">
                    <div className="contact-content-stack">
                        <div className="contact-header">
                            <motion.h1 {...fadeInUp} transition={{ delay: 0.1 }}>
                                Let's build something <br /><em>meaningful</em> together.
                            </motion.h1>
                        </div>

                        <motion.div
                            {...fadeInUp}
                            transition={{ delay: 0.2 }}
                            className="contact-text"
                        >
                            <p className="intro-text">
                                Whether you have a specific project in mind or just want to chat about design, tools, or AI—I'd love to hear from you.
                            </p>

                            <div className="contact-methods">
                                <a href="https://github.com/devonsa" target="_blank" rel="noopener noreferrer" className="contact-method-card">
                                    <div className="method-icon">
                                        <Github size={24} />
                                    </div>
                                    <div className="method-info">
                                        <span>GitHub</span>
                                        <p>Check out my code</p>
                                    </div>
                                </a>

                                <a href="https://linkedin.com/in/devonsa" target="_blank" rel="noopener noreferrer" className="contact-method-card">
                                    <div className="method-icon">
                                        <Linkedin size={24} />
                                    </div>
                                    <div className="method-info">
                                        <span>LinkedIn</span>
                                        <p>Connect with me</p>
                                    </div>
                                </a>

                                <a href="https://twitter.com/devonsanderson" target="_blank" rel="noopener noreferrer" className="contact-method-card">
                                    <div className="method-icon">
                                        <Twitter size={24} />
                                    </div>
                                    <div className="method-info">
                                        <span>Twitter / X</span>
                                        <p>Follow the journey</p>
                                    </div>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Contact;
