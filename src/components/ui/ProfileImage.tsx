import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/motion';

interface ProfileImageProps {
    src: string;
    alt: string;
    className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt, className = "" }) => {
    return (
        <motion.div
            {...fadeInUp}
            className={`about-image-container ${className}`}
        >
            <div className="image-wrapper">
                <img
                    src={src}
                    alt={alt}
                    className="profile-photo"
                />
                <div className="image-decoration"></div>
            </div>
        </motion.div>
    );
};

export default ProfileImage;
