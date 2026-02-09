import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/motion';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    badge?: string;
    centered?: boolean;
    className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, badge, centered = false, className = '' }) => {
    return (
        <div className={`section-header ${centered ? 'text-center' : ''} ${className}`}>
            {badge && (
                <motion.div {...fadeInUp} className="badge">
                    {badge}
                </motion.div>
            )}
            <motion.h2
                {...fadeInUp}
                transition={{ delay: 0.1 }}
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    {...fadeInUp}
                    transition={{ delay: 0.2 }}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
};

export default SectionHeader;
