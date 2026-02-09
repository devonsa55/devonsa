import { motion } from 'framer-motion';
import { aboutData } from '../data/about';
import SectionHeader from './ui/SectionHeader';
import Timeline from './ui/Timeline';

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="about-page"
        >
            <section className="about roundy-style">
                <div className="container">
                    <div className="about-grid-layout">
                        <div className="about-header-section">
                            <div className="about-image-wrapper">
                                <img src={aboutData.profileImage} alt={aboutData.fullName} />
                            </div>
                            <SectionHeader
                                title="Hey, I'm Devon."
                                centered
                                className="about-header"
                            />

                            <p className="sub-headline">{aboutData.subHeadline}</p>
                        </div>

                        <div className="work-experience">
                            <Timeline />
                        </div>



                        <div className="offline-section">
                            <div className="section-title">
                                <p>Beyond Design</p>
                            </div>
                            <div className="new-hobbies-grid">
                                {aboutData.hobbies.map((hobby, index) => (
                                    <div
                                        key={index}
                                        className="new-hobby-card"
                                        style={{ backgroundImage: `url(${hobby.image})` }}
                                    >
                                        <div className="hobby-overlay"></div>
                                        <div className="hobby-info">
                                            <h4>{hobby.title}</h4>
                                            <p>{hobby.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default About;
