import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <section id="contact" className="py-[30vh] bg-bg-primary relative bg-[radial-gradient(var(--dot-color-contact)_calc(var(--dot-size)*var(--show-dot-grid-contact)),transparent_0)] bg-[length:var(--dot-space)_var(--dot-space)] bg-[position:var(--grid-align-offset)]">
                <div className="container">
                    <div className="max-w-[800px] mx-auto flex flex-col gap-8">
                        <div className="text-left mb-0">
                            <motion.h1 {...fadeInUp} transition={{ delay: 0.1 }} className="text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.1] text-text-primary font-heading max-w-none">
                                Let's build something <br /><em className="font-['Newsreader',serif] italic font-medium pr-[0.4ch]">meaningful</em> together.
                            </motion.h1>
                        </div>

                        <motion.div
                            {...fadeInUp}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col gap-[6rem]"
                        >
                            <p className="text-[1.8rem] leading-[1.35] text-text-primary font-medium font-heading text-left">
                                Whether you have a specific project in mind or just want to chat about design, tools, or AI—I'd love to hear from you.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
                                <a href="https://github.com/devonsa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-8 bg-bg-primary border-2 border-text-primary rounded-[var(--radius-card)] no-underline text-text-primary transition-all duration-300 hover:shadow-hover hover:-translate-y-[2px]">
                                    <div className="text-text-primary flex items-center justify-center">
                                        <Github size={28} />
                                    </div>
                                    <div className="method-info">
                                        <span className="block text-xs uppercase tracking-[0.1em] opacity-50 mb-1">GitHub</span>
                                        <p className="text-[1.2rem] font-semibold m-0 tracking-tight">Check out my code</p>
                                    </div>
                                </a>

                                <a href="https://linkedin.com/in/devonsa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-8 bg-bg-primary border-2 border-text-primary rounded-[var(--radius-card)] no-underline text-text-primary transition-all duration-300 hover:shadow-hover hover:-translate-y-[2px]">
                                    <div className="text-text-primary flex items-center justify-center">
                                        <Linkedin size={28} />
                                    </div>
                                    <div className="method-info">
                                        <span className="block text-xs uppercase tracking-[0.1em] opacity-50 mb-1">LinkedIn</span>
                                        <p className="text-[1.2rem] font-semibold m-0 tracking-tight">Connect with me</p>
                                    </div>
                                </a>

                                <a href="https://twitter.com/devonsanderson" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-8 bg-bg-primary border-2 border-text-primary rounded-[var(--radius-card)] no-underline text-text-primary transition-all duration-300 hover:shadow-hover hover:-translate-y-[2px]">
                                    <div className="text-text-primary flex items-center justify-center">
                                        <Twitter size={28} />
                                    </div>
                                    <div className="method-info">
                                        <span className="block text-xs uppercase tracking-[0.1em] opacity-50 mb-1">Twitter / X</span>
                                        <p className="text-[1.2rem] font-semibold m-0 tracking-tight">Follow the journey</p>
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
