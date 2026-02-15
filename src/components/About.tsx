import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { aboutData } from '../data/about';
import SectionHeader from './ui/SectionHeader';
import Timeline from './ui/Timeline';
import ProfileCard from './ui/ProfileCard';
import EnvelopeMatrix from './ui/EnvelopeMatrix';

const About = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % aboutData.hobbies.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + aboutData.hobbies.length) % aboutData.hobbies.length);
    };

    // Auto-play carousel
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, []);

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

                            <p
                                className="sub-headline"
                                dangerouslySetInnerHTML={{
                                    __html: aboutData.subHeadline.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                }}
                            />
                        </div>

                        <div className="work-experience">
                            <Timeline />
                        </div>



                        <div className="offline-section">
                            <div className="section-title">
                                <p>Beyond Design</p>
                            </div>

                            <div className="hobby-carousel">
                                <button onClick={prevSlide} className="carousel-arrow carousel-arrow-left" aria-label="Previous">
                                    <ChevronLeft size={32} />
                                </button>

                                <div className="carousel-track-container">
                                    <motion.div
                                        key={currentIndex}
                                        className="hobby-card"
                                    >
                                        <img
                                            src={aboutData.hobbies[currentIndex].image}
                                            alt={aboutData.hobbies[currentIndex].title}
                                            className="hobby-card-image"
                                            onError={() => {
                                                console.error('Failed to load image:', aboutData.hobbies[currentIndex].image);
                                            }}
                                        />
                                    </motion.div>
                                </div>

                                <button onClick={nextSlide} className="carousel-arrow carousel-arrow-right" aria-label="Next">
                                    <ChevronRight size={32} />
                                </button>

                                <div className="carousel-indicators">
                                    {aboutData.hobbies.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentIndex(idx)}
                                            className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                                            aria-label={`Go to slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="about-cta" style={{ display: 'flex', justifyContent: 'center', marginTop: '7rem', marginBottom: '12rem' }}>
                            <ProfileCard
                                icon={<EnvelopeMatrix />}
                                text="Ready to start a project?"
                                subtext="Let's build something meaningful"
                                link="/contact"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default About;
