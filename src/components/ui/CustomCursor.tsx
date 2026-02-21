import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });

            // Re-detect hover if necessary, though pointer-events: none usually handles it
            const target = e.target as HTMLElement;
            const isClickable = target.closest('a, button, .hover-trigger, [role="button"]');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Spring physics for smooth following
    const springX = useSpring(mousePos.x, { damping: 20, stiffness: 250 });
    const springY = useSpring(mousePos.y, { damping: 20, stiffness: 250 });

    return (
        <motion.div
            className="custom-cursor"
            style={{
                left: springX,
                top: springY,
                x: '-50%',
                y: '-50%',
                scale: isHovering ? 2.5 : 1,
            }}
        />
    );
};

export default CustomCursor;
