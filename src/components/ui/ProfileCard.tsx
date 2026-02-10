import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ProfileCardProps {
    image?: string;
    icon?: React.ReactNode;
    text: string;
    subtext?: string;
    link: string;
    className?: string;
}

const ProfileCard = ({ image, icon, text, subtext, link, className = '' }: ProfileCardProps) => {
    return (
        <Link to={link} className={`profile-card ${className}`}>
            <div className="profile-card-content">
                <div className="profile-image-wrapper">
                    {icon ? (
                        <div className="profile-icon-display">
                            {icon}
                        </div>
                    ) : (
                        <img
                            src={image}
                            alt="Profile"
                            className="profile-image"
                        />
                    )}
                </div>
                <div className="profile-info">
                    <div className="profile-text-group">
                        <p className="profile-text">{text}</p>
                        {subtext && <span className="profile-subtext">{subtext}</span>}
                    </div>
                    <div className="profile-arrow">
                        <ArrowRight size={20} />
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .profile-card {
                    display: inline-block;
                    text-decoration: none;
                    position: relative;
                }

                .profile-card-content {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    padding: 0.75rem 1.5rem 0.75rem 0.75rem;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-subtle);
                    border-radius: 100px;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }

                /* Opaque hover state mimicking Contact cards */
                .profile-card:hover .profile-card-content {
                    background: var(--bg-primary); /* Solid opaque background */
                    border-color: var(--text-primary);
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-hover); /* Consistent shadow */
                }

                .profile-image-wrapper {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid var(--bg-primary);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-tertiary); /* Default background */
                }

                /* Remove background/border for icon display to let dots breathe */
                .profile-card:has(.profile-icon-display) .profile-image-wrapper {
                    background: transparent;
                    border: none;
                    box-shadow: none;
                }

                .profile-icon-display {
                    color: var(--text-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .profile-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .profile-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .profile-text-group {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }

                .profile-text {
                    margin: 0;
                    font-family: var(--font-heading);
                    font-weight: 600;
                    font-size: 1rem;
                    color: var(--text-primary);
                    line-height: 1.2;
                }

                .profile-subtext {
                    font-size: 0.8rem;
                    color: var(--text-secondary);
                    margin-top: 2px;
                }

                .profile-arrow {
                    color: var(--text-secondary);
                    transition: transform 0.3s ease;
                }

                .profile-card:hover .profile-arrow {
                    color: var(--text-primary);
                    transform: translateX(4px);
                }
                `
            }} />
        </Link>
    );
};

export default ProfileCard;
