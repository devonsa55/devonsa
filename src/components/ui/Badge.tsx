import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/motion';

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => {
    return (
        <motion.div
            {...fadeInUp}
            className={`badge ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default Badge;
