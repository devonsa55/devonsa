import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    children: React.ReactNode;
    to?: string;
    href?: string;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'link';
    target?: string;
    rel?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    to,
    href,
    onClick,
    className = "",
    variant = 'primary',
    target,
    rel
}) => {
    const baseClass = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'btn-link';
    const combinedClass = `${baseClass} ${className}`;

    if (to) {
        return <Link to={to} className={combinedClass}>{children}</Link>;
    }

    if (href) {
        return <a href={href} className={combinedClass} target={target} rel={rel}>{children}</a>;
    }

    return (
        <button onClick={onClick} className={combinedClass}>
            {children}
        </button>
    );
};

export default Button;
