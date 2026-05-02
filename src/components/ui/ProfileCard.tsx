import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

interface ProfileCardProps {
    image?: string;
    icon?: React.ReactNode;
    text: string;
    subtext?: string;
    link: string;
    className?: string;
    variant?: 'default' | 'primary';
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const ProfileCard = ({ image, icon, text, subtext, link, className = '', variant = 'default', onClick }: ProfileCardProps) => {
    return (
        <MotionLink 
            to={link} 
            className={`profile-card ${className} variant-${variant}`} 
            onClick={onClick}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            <div className="profile-card-content">
                <div className="profile-text-group">
                    <p className="profile-text">{text}</p>
                    {subtext && <span className="profile-subtext">{subtext}</span>}
                </div>

                {icon && (
                    <div className="profile-outer-icon" style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        {icon}
                    </div>
                )}

                {image && !icon && (
                    <div className="profile-image-wrapper">
                        <img
                            src={image}
                            alt="Profile"
                            className="profile-image"
                        />
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .profile-card {
                    display: inline-block;
                    text-decoration: none;
                    position: relative;
                    background: var(--bg-secondary);
                    border: 2px solid var(--border-subtle);
                    border-radius: 100px;
                    height: 54px;
                    box-sizing: border-box;
                    transition: background 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                                border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                                box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .profile-card-content {
                    display: flex;
                    align-items: center;
                    height: 100%;
                }

                /* Contextual padding for icon vs image */
                .profile-card:has(.profile-outer-icon) .profile-card-content {
                    padding: 0 1rem 0 1.5rem;
                    gap: 1.25rem;
                }

                .profile-card:has(.profile-image-wrapper) .profile-card-content {
                    padding: 0 0.5rem 0 1.5rem;
                    gap: 1.25rem;
                }

                .profile-card:hover {
                    border-color: var(--text-primary);
                    box-shadow: var(--shadow-hover);
                }

                /* Primary Variant (High Contrast) */
                .profile-card.variant-primary {
                    background: var(--text-primary);
                    border-color: var(--text-primary);
                }

                .profile-card.variant-primary .profile-text {
                    color: var(--bg-primary);
                }

                .profile-card.variant-primary .profile-subtext {
                    color: var(--bg-primary);
                    opacity: 0.7;
                }

                .profile-card.variant-primary .profile-outer-icon {
                    color: var(--bg-primary) !important;
                }

                .profile-card.variant-primary:hover {
                    background: var(--text-primary);
                    border-color: var(--text-primary);
                    box-shadow: var(--shadow-hover);
                }

                .profile-image-wrapper {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid var(--bg-primary);
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-tertiary);
                }

                .profile-text-group {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    gap: 0px !important; /* Force zero gap */
                }

                .profile-text {
                    margin: 0 !important;
                    padding: 0 !important;
                    font-family: var(--font-heading);
                    font-weight: 800;
                    font-size: 1.15rem;
                    color: var(--text-primary);
                    line-height: 1.1;
                }

                .profile-subtext {
                    margin: 0 !important;
                    padding: 0 !important;
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    line-height: 1.1;
                    opacity: 0.8;
                }

                `
            }} />
        </MotionLink>
    );
};

export default ProfileCard;
