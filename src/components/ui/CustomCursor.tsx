import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleLinkHover = () => setIsHovering(true);
        const handleLinkLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        // Attach hover listeners to all interactive elements
        const attachListeners = () => {
            const interactiveElements = document.querySelectorAll(
                'a, button, .hover-trigger, .read-more, .tag, input, textarea, select'
            );
            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', handleLinkHover);
                el.addEventListener('mouseleave', handleLinkLeave);
            });
        };

        // Attach initially and set up a mutation observer for dynamically added elements
        attachListeners();

        const observer = new MutationObserver((mutations) => {
            let shouldReattach = false;
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    shouldReattach = true;
                }
            });
            if (shouldReattach) attachListeners();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            observer.disconnect();

            // Clean up old listeners
            const interactiveElements = document.querySelectorAll(
                'a, button, .hover-trigger, .read-more, .tag, input, textarea, select'
            );
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleLinkHover);
                el.removeEventListener('mouseleave', handleLinkLeave);
            });
        };
    }, [isVisible]);

    if (!isVisible) return null;

    // Use a spring animation to smoothly track the cursor position
    return (
        <motion.div
            className="custom-cursor"
            initial={{
                x: mousePosition.x - (isHovering ? 24 : 16),
                y: mousePosition.y - (isHovering ? 24 : 16),
                scale: 1.2,
                opacity: 0
            }}
            animate={{
                x: mousePosition.x - (isHovering ? 24 : 16),
                y: mousePosition.y - (isHovering ? 24 : 16),
                scale: isHovering ? 1.5 : 1,
                opacity: isVisible ? 1 : 0
            }}
            transition={{
                type: "spring",
                stiffness: 800,
                damping: 50,
                mass: 0.5
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: isHovering ? '48px' : '32px',
                height: isHovering ? '48px' : '32px',
                backgroundColor: '#FFF',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'difference'
            }}
        />
    );
};

export default CustomCursor;
