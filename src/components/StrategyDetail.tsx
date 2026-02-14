import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { strategyFrameworks } from '../data/strategy';
import { ArrowLeft, CheckCircle2, Home, ExternalLink } from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';
import ProfileCard from './ui/ProfileCard';
import { fadeInUp, fadeIn } from '../utils/motion';
import CoordinationGraph from './ui/CoordinationGraph';
import AlignmentMatrix from './ui/AlignmentMatrix';

const StrategyDetail: React.FC = () => {
    const { strategyId } = useParams<{ strategyId: string }>();
    const strategy = strategyFrameworks.find(s => s.id === strategyId);

    const [isVisible, setIsVisible] = React.useState(true);
    const lastScrollY = React.useRef(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < 50) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY.current + 5) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current - 5) {
                setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!strategy) {
        return (
            <div className="section container" style={{ paddingTop: '120px' }}>
                <h1>Strategy not found</h1>
                <Button to="/">Back to Home</Button>
            </div>
        );
    }

    const renderStickyNav = () => (
        <motion.nav
            initial={false}
            animate={{
                y: isVisible ? 0 : -100,
                opacity: isVisible ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="sticky-nav-wrapper"
        >
            <div className="nav-container">
                <Link to="/" className="back-link" style={{ textDecoration: 'none' }}>
                    <ArrowLeft size={18} />
                    <span>Back to Work</span>
                </Link>
            </div>
        </motion.nav>
    );

    const renderText = (content: string | string[]) => {
        if (Array.isArray(content)) {
            return content.map((para, i) => <p key={i}>{para}</p>);
        }
        return content.split('\n\n').map((para, i) => <p key={i}>{para}</p>);
    };

    // PAPER / ARTICLE LAYOUT
    if (strategy.layout === 'paper') {
        return (
            <motion.div {...fadeIn} className="project-detail project-visual-root">
                {renderStickyNav()}
                <div className="container" style={{ paddingTop: '80px' }}>
                    <article className="strategy-paper">
                        <header className="paper-header" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                            <Badge className="project-badge">White Paper / Framework</Badge>
                            <motion.h1 {...fadeInUp} transition={{ delay: 0.1 }}>
                                {strategy.subtitle || strategy.title}
                            </motion.h1>
                        </header>

                        {/* Hero Image - Wider than text */}
                        {strategy.heroImage && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                style={{ marginBottom: '4rem', borderRadius: '40px', overflow: 'hidden', position: 'relative' }}
                            >
                                <img
                                    src={strategy.heroImage}
                                    alt={strategy.title}
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                                {strategy.heroImageAttribution && (
                                    <div className="image-attribution" style={{
                                        position: 'absolute',
                                        bottom: '1.5rem',
                                        right: '1.5rem',
                                        fontSize: '0.7rem',
                                        background: 'var(--bg-primary)',
                                        padding: '6px 12px',
                                        borderRadius: '100px',
                                        color: 'var(--text-secondary)',
                                        border: '1.5px solid var(--border-subtle)',
                                        boxShadow: 'var(--shadow-sm)',
                                        fontWeight: '500'
                                    }}>
                                        Illustration by <a
                                            href={strategy.heroImageAttribution.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: 'inherit', textDecoration: 'underline' }}
                                        >@{strategy.heroImageAttribution.name}</a>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Deck Embed - Expanded Layout */}
                        {strategy.deckEmbed && (
                            <motion.div
                                {...fadeIn}
                                className="deck-container-expanded"
                            >
                                <iframe
                                    src={strategy.deckEmbed}
                                    frameBorder="0"
                                    width="100%"
                                    height="100%"
                                    allowFullScreen={true}
                                    title="Strategy Deck"
                                    style={{ display: 'block' }}
                                ></iframe>
                            </motion.div>
                        )}

                        {/* Process Link - if present */}
                        {strategy.processLink && (
                            <div className="paper-section" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                                <Button
                                    to={strategy.processLink.url}
                                    variant="secondary"
                                    className="process-button"
                                    style={{ padding: '0.8rem 2rem', borderRadius: '100px' }}
                                >
                                    <ExternalLink size={18} style={{ marginRight: '0.75rem' }} />
                                    {strategy.processLink.label}
                                </Button>
                            </div>
                        )}

                        {/* Section 1: The Hook (only if no deck) */}
                        {strategy.sections?.[0] && !strategy.deckEmbed && (
                            <div className="paper-section">
                                <motion.h2 {...fadeInUp}>{strategy.sections[0].title}</motion.h2>
                                {renderText(strategy.sections[0].content)}
                            </div>
                        )}

                        {/* Animated Coordination Graph - Specific to Managing Complexity */}
                        {strategy.id === 'managing-complexity' && (
                            <div className="diagram-container" style={{ margin: '4rem 0' }}>
                                <CoordinationGraph />
                            </div>
                        )}

                        {/* Section 2: The Solution */}
                        {strategy.sections?.[1] && (
                            <div className="paper-section">
                                <motion.h2 {...fadeInUp}>{strategy.sections[1].title}</motion.h2>
                                {renderText(strategy.sections[1].content)}
                            </div>
                        )}

                        {/* Key Insight Block - Specific to Managing Complexity */}
                        {strategy.id === 'managing-complexity' && (
                            <div className="insight-block">
                                <p>“The probability of success goes down exponentially with the number of collaborators.”</p>
                            </div>
                        )}

                        {/* Section 3: The Framework */}
                        {strategy.sections?.[2] && (
                            <>
                                <div className="paper-section">
                                    <motion.h2 {...fadeInUp}>{strategy.sections[2].title}</motion.h2>
                                </div>

                                {/* Animated Alignment Matrix - Specific to Managing Complexity */}
                                {strategy.id === 'managing-complexity' && <AlignmentMatrix />}

                                <div className="paper-section">
                                    {renderText(strategy.sections[2].content)}
                                </div>
                            </>
                        )}

                        {/* Section 4: Takeaway */}
                        {strategy.sections?.[3] && (
                            <div className="paper-section">
                                <motion.h2 {...fadeInUp}>{strategy.sections[3].title}</motion.h2>
                                {renderText(strategy.sections[3].content)}
                            </div>
                        )}

                        <div className="project-footer" style={{ marginTop: '8rem', paddingBottom: '8rem', display: 'flex', justifyContent: 'center' }}>
                            <ProfileCard
                                icon={<Home size={20} />}
                                text="Back to Home"
                                subtext="See more of my strategy work"
                                link="/"
                            />
                        </div>
                    </article>
                </div>
            </motion.div>
        );
    }

    // DEFAULT CASE STUDY LAYOUT
    return (
        <motion.div
            {...fadeIn}
            className="project-detail project-visual-root"
        >
            <div className="container">
                {renderStickyNav()}

                <header className="project-header">
                    <Badge className="project-badge">
                        Strategy & Framework
                    </Badge>
                    <motion.h1
                        {...fadeInUp}
                        transition={{ delay: 0.1 }}
                    >
                        {strategy.title}
                    </motion.h1>
                    <motion.p
                        className="subtitle"
                        {...fadeInUp}
                        transition={{ delay: 0.2 }}
                    >
                        {strategy.subtitle}
                    </motion.p>
                </header>

                {(strategy.heroVideo || strategy.heroImage) && (
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="project-hero-media"
                    >
                        {strategy.heroVideo ? (
                            <div className="video-container">
                                <iframe
                                    src={strategy.heroVideo}
                                    title={`${strategy.title} Video`}
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <img src={strategy.heroImage} alt={strategy.title} className="hero-image" />
                        )}
                    </motion.div>
                )}

                <div className="project-meta-grid">
                    <div className="meta-item">
                        <h3>Focus</h3>
                        <p>{strategy.role}</p>
                    </div>
                    <div className="meta-item">
                        <h3>Collaborators</h3>
                        <p>{strategy.team}</p>
                    </div>
                    <div className="meta-item">
                        <h3>Date Range</h3>
                        <p>{strategy.timeline}</p>
                    </div>
                </div>

                <section className="project-section intro-section">
                    <div className="section-content">
                        <h2 className="section-label">Core Hypothesis</h2>
                        <p className="large-text">{strategy.problem}</p>
                    </div>
                </section>

                {strategy.sections?.map((section, index) => (
                    <section key={index} className={`project-section ${section.layout || 'side-by-side'}`}>
                        <div className="section-text">
                            {section.title && <h2>{section.title}</h2>}
                            <div className="section-content">
                                {Array.isArray(section.content) ? (
                                    <ul className="content-list">
                                        {section.content.map((p, i) => <li key={i}>{p}</li>)}
                                    </ul>
                                ) : (
                                    <p>{section.content}</p>
                                )}
                            </div>
                        </div>
                        {(section.image || section.video) && (
                            <div className="section-media">
                                {section.video ? (
                                    <div className="video-container">
                                        <iframe
                                            src={section.video}
                                            title={section.title}
                                            frameBorder="0"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : (
                                    <img src={section.image} alt={section.title || 'Visual'} className="project-image" />
                                )}
                            </div>
                        )}
                    </section>
                ))}

                {strategy.outcomes && (
                    <section className="project-section outcomes">
                        <h2 className="section-label">Strategic Impact</h2>
                        <div className="outcomes-grid">
                            {strategy.outcomes.map((outcome, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="outcome-card"
                                >
                                    <CheckCircle2 size={24} className="check-icon" />
                                    <p>{outcome}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {strategy.challenge && (
                    <section className="project-section challenge">
                        <div className="challenge-card-premium">
                            <div className="challenge-content">
                                <span className="challenge-label">The Strategy Challenge</span>
                                <h2>Navigating Ambiguity</h2>
                                <p>{strategy.challenge}</p>
                            </div>
                        </div>
                    </section>
                )}

                <div className="project-footer" style={{ paddingBottom: '8rem', display: 'flex', justifyContent: 'center' }}>
                    <ProfileCard
                        icon={<Home size={20} />}
                        text="Back to Home"
                        subtext="See more of my strategy work"
                        link="/"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default StrategyDetail;
