import { motion } from 'framer-motion';
import { aboutData } from '../../data/about';
import '../../styles/components/Timeline.css';

interface Role {
    title: string;
    year: string;
    location?: string;
    description: string[];
}

interface TimelineItem {
    company: string;
    logo?: string;
    duration?: string;
    roles: Role[];
}

const Timeline = () => {
    const timelineData = (aboutData.timeline as any as TimelineItem[]);

    return (
        <div className="timeline-container">
            <div className="timeline-list">
                {timelineData.map((item, index) => (
                    <motion.div
                        key={index}
                        className="company-group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="company-header">
                            <div className="company-logo">
                                {item.logo ? (
                                    <img src={item.logo} alt={item.company} />
                                ) : (
                                    <div className="company-logo-placeholder">
                                        {item.company.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="company-meta">
                                <h4 className="company-name">{item.company}</h4>
                                {item.duration && <span className="company-duration">{item.duration}</span>}
                            </div>
                        </div>

                        <div className="roles-container">
                            {item.roles.map((role, rIndex) => (
                                <div key={rIndex} className="role-item">
                                    <div className="role-dot-connector">
                                        <div className="role-dot"></div>
                                        <div className="role-line"></div>
                                    </div>
                                    <div className="role-content">
                                        <h5 className="role-title">{role.title}</h5>
                                        <div className="role-meta">
                                            <span className="role-year">{role.year}</span>
                                            {role.location && <span className="role-location">{role.location}</span>}
                                        </div>
                                        <ul className="role-description">
                                            {role.description.map((desc, dIndex) => (
                                                <li key={dIndex} dangerouslySetInnerHTML={{
                                                    __html: desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                }} />
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
