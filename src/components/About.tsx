import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { aboutData } from '../data/about';
import SectionHeader from './ui/SectionHeader';
import Timeline from './ui/Timeline';
import ProfileCard from './ui/ProfileCard';
import EnvelopeMatrix from './ui/EnvelopeMatrix';

interface GooglyEyeProps {
    mouseX: number;
    mouseY: number;
    offsetX: string;
    offsetY: string;
}

const GooglyEye = ({ mouseX, mouseY, offsetX, offsetY }: GooglyEyeProps) => {
    const eyeRef = useRef<HTMLDivElement>(null);
    const [irisPos, setIrisPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!eyeRef.current) return;
        const rect = eyeRef.current.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const dx = mouseX - eyeCenterX;
        const dy = mouseY - eyeCenterY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(Math.hypot(dx, dy) / 10, 8); // Scaled distance for iris travel

        setIrisPos({
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance
        });
    }, [mouseX, mouseY]);

    return (
        <div
            ref={eyeRef}
            className="googly-eye"
            style={{
                left: offsetX,
                top: offsetY
            }}
        >
            <div
                className="iris"
                style={{
                    transform: `translate(${irisPos.x}px, ${irisPos.y}px)`
                }}
            />
        </div>
    );
};

const About = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isGoogly, setIsGoogly] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        if (isGoogly) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isGoogly]);

    const toggleGoogly = () => setIsGoogly(!isGoogly);

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
            <section className="pt-[10rem] bg-bg-primary relative font-body bg-[radial-gradient(var(--dot-color-about)_calc(var(--dot-size)*var(--show-dot-grid-about)),transparent_0)] bg-[length:var(--dot-space)_var(--dot-space)] bg-[position:var(--grid-align-offset)]">
                <div className="container">
                    <div className="max-w-[800px] mx-auto flex flex-col gap-12 lg:gap-[5rem]">
                        <div className="flex flex-col gap-6 items-center text-left">
                            <div
                                className={`w-full text-center flex justify-center relative max-w-[300px] mx-auto select-none cursor-pointer ${isGoogly ? 'is-googly' : ''}`}
                                onClick={toggleGoogly}
                            >
                                <img src={aboutData.profileImage} alt={aboutData.fullName} className="w-full max-w-[300px] h-auto block mx-auto" />
                                <AnimatePresence>
                                    {isGoogly && (
                                        <motion.div
                                            className="eye-container"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                        >
                                            <GooglyEye mouseX={mousePos.x} mouseY={mousePos.y} offsetX="36%" offsetY="45%" />
                                            <GooglyEye mouseX={mousePos.x} mouseY={mousePos.y} offsetX="50%" offsetY="45%" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <SectionHeader
                                title="Hey, I'm Devon."
                                centered
                                className="mb-10 w-full text-center [&_h2]:text-[clamp(2.5rem,8vw,4.5rem)] [&_h2]:leading-[1.1] [&_h2]:font-heading [&_h2]:font-extrabold [&_h2]:tracking-[-0.02em] [&_h2]:mb-2 [&_h2]:w-full"
                            />

                            <p
                                className="text-[1.5rem] leading-[1.35] text-text-primary font-heading font-normal max-w-none text-left"
                                dangerouslySetInnerHTML={{
                                    __html: aboutData.subHeadline.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                }}
                            />
                        </div>

                        <div className="work-experience">
                            <Timeline />
                        </div>



                        <div className="flex flex-col py-2 mt-2">
                            <div className="mb-[60px]">
                                <p className="font-heading text-[2rem] font-extrabold text-text-primary leading-[1.2] tracking-[-0.01em]">Beyond Design</p>
                            </div>

                            <div className="relative w-full mt-0">
                                <button onClick={prevSlide} className="absolute left-[-28px] top-1/2 -translate-y-1/2 bg-bg-primary border-2 border-text-primary rounded-full w-[56px] h-[56px] flex items-center justify-center cursor-pointer z-10 transition-all duration-200 text-text-primary hover:-translate-y-1/2 hover:-translate-x-[2px] hover:shadow-[4px_4px_0_#d1d5db]" aria-label="Previous">
                                    <ChevronLeft size={32} />
                                </button>

                                <div className="w-full overflow-hidden relative">
                                    <motion.div
                                        key={currentIndex}
                                        className="relative w-full min-h-[500px] border-2 border-text-primary rounded-[32px] bg-[#e5e7eb] overflow-hidden"
                                    >
                                        <img
                                            src={aboutData.hobbies[currentIndex].image}
                                            alt={aboutData.hobbies[currentIndex].title}
                                            className="absolute top-0 left-0 w-full h-full object-cover"
                                            onError={() => {
                                                console.error('Failed to load image:', aboutData.hobbies[currentIndex].image);
                                            }}
                                        />
                                    </motion.div>
                                </div>

                                <button onClick={nextSlide} className="absolute right-[-28px] top-1/2 -translate-y-1/2 bg-bg-primary border-2 border-text-primary rounded-full w-[56px] h-[56px] flex items-center justify-center cursor-pointer z-10 transition-all duration-200 text-text-primary hover:-translate-y-1/2 hover:translate-x-[2px] hover:shadow-[4px_4px_0_#d1d5db]" aria-label="Next">
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
