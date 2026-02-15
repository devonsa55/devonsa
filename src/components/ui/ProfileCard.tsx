import { Link } from 'react-router-dom';


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
                {icon && (
                    <div className="profile-outer-icon" style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

                <div className="profile-text-group">
                    <p className="profile-text">{text}</p>
                    {subtext && <span className="profile-subtext">{subtext}</span>}
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
                    padding: 0.75rem 2.25rem 0.75rem 1.75rem;
                    background: var(--bg-secondary);
                    border: 2px solid var(--border-subtle);
                    border-radius: 100px;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    min-height: 64px; /* Consistent height */
                    box-shadow: none;
                }

                /* Contextual padding for icon vs image */
                .profile-card:has(.profile-outer-icon) .profile-card-content {
                    padding: 0.75rem 2.25rem 0.75rem 1.5rem;
                    gap: 1rem;
                }

                .profile-card:has(.profile-image-wrapper) .profile-card-content {
                    padding: 0.6rem 2.25rem 0.6rem 0.6rem;
                    gap: 1.25rem;
                }

                .profile-card:hover .profile-card-content {
                    border-color: var(--text-primary);
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-hover);
                }

                .profile-image-wrapper {
                    width: 48px;
                    height: 48px;
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
        </Link>
    );
};

export default ProfileCard;
