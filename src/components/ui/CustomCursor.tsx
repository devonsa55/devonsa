import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isIdle, setIsIdle] = useState(false);

    useEffect(() => {
        let idleTimer: ReturnType<typeof setTimeout>;

        const resetIdleTimer = () => {
            setIsIdle(false);
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                setIsIdle(true);
            }, 3000);
        };

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
            resetIdleTimer();
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => {
            setIsVisible(true);
            resetIdleTimer();
        };

        const handleLinkHover = () => setIsHovering(true);
        const handleLinkLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mousedown', resetIdleTimer);
        window.addEventListener('keydown', resetIdleTimer);
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

        // Start the timer initially
        resetIdleTimer();

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mousedown', resetIdleTimer);
            window.removeEventListener('keydown', resetIdleTimer);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            observer.disconnect();
            clearTimeout(idleTimer);

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

    return (
        <motion.div
            className="custom-cursor"
            initial={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: 1.2,
                opacity: 0
            }}
            animate={{
                x: mousePosition.x - (isHovering || isIdle ? 24 : 16),
                y: mousePosition.y - (isHovering || isIdle ? 24 : 16),
                scale: isHovering || isIdle ? 1.5 : 1,
                opacity: isVisible ? 1 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 1000,
                damping: 60,
                mass: 0.2
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: isHovering || isIdle ? '48px' : '32px',
                height: isHovering || isIdle ? '48px' : '32px',
                backgroundColor: isIdle ? 'transparent' : '#FFF',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: isIdle ? 'normal' : 'difference',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                border: 'none',
                boxShadow: 'none',
            }}
        >
            <AnimatePresence>
                {isIdle && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.25 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.25 }}
                        style={{
                            width: '150%',
                            height: '150%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <svg width="100%" height="100%" viewBox="0 0 119 119" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                            <path d="M108.263 29.1709C110.757 33.2759 105.518 40.7219 106.806 45.1219C108.139 49.6749 116.528 53.1429 116.627 57.7779C116.728 62.4799 108.476 66.3159 107.368 70.8549C106.26 75.3939 111.816 82.6009 109.56 86.7269C107.336 90.7949 98.2939 90.0069 95.0129 93.4339C91.8419 96.7459 93.0619 105.769 88.9569 108.263C84.8519 110.757 77.4059 105.518 73.0059 106.806C68.4529 108.139 64.9849 116.528 60.3499 116.627C55.6479 116.728 51.8119 108.476 47.2729 107.368C42.7339 106.26 35.5269 111.816 31.4009 109.56C27.3329 107.336 28.1209 98.2939 24.6939 95.0129C21.3819 91.8419 12.3589 93.0619 9.8649 88.9569C7.3709 84.8519 12.6109 77.4059 11.3219 73.0059C9.9889 68.4529 1.59992 64.9849 1.50092 60.3499C1.39992 55.6479 9.65192 51.8119 10.7599 47.2729C11.8679 42.7339 6.31191 35.5269 8.56791 31.4009C10.7919 27.3329 19.8349 28.1209 23.1149 24.6939C26.2859 21.3819 25.0659 12.3589 29.1709 9.86493C33.2759 7.37093 40.7219 12.6109 45.1219 11.3219C49.6749 9.98893 53.1429 1.59992 57.7779 1.50092C62.4799 1.39992 66.3159 9.65192 70.8549 10.7599C75.3939 11.8679 82.6009 6.31194 86.7269 8.56794C90.7949 10.7919 90.0069 19.8349 93.4339 23.1149C96.7469 26.2859 105.769 25.0669 108.263 29.1709Z" fill="#FFC31A" />
                            <path d="M108.263 29.1709C110.757 33.2759 105.518 40.7219 106.806 45.1219C108.139 49.6749 116.528 53.1429 116.627 57.7779C116.728 62.4799 108.476 66.3159 107.368 70.8549C106.26 75.3939 111.816 82.6009 109.56 86.7269C107.336 90.7949 98.2939 90.0069 95.0129 93.4339C91.8419 96.7459 93.0619 105.769 88.9569 108.263C84.8519 110.757 77.4059 105.518 73.0059 106.806C68.4529 108.139 64.9849 116.528 60.3499 116.627C55.6479 116.728 51.8119 108.476 47.2729 107.368C42.7339 106.26 35.5269 111.816 31.4009 109.56C27.3329 107.336 28.1209 98.2939 24.6939 95.0129C21.3819 91.8419 12.3589 93.0619 9.8649 88.9569C7.3709 84.8519 12.6109 77.4059 11.3219 73.0059C9.9889 68.4529 1.59992 64.9849 1.50092 60.3499C1.39992 55.6479 9.65192 51.8119 10.7599 47.2729C11.8679 42.7339 6.31191 35.5269 8.56791 31.4009C10.7919 27.3329 19.8349 28.1209 23.1149 24.6939C26.2859 21.3819 25.0659 12.3589 29.1709 9.86493C33.2759 7.37093 40.7219 12.6109 45.1219 11.3219C49.6749 9.98893 53.1429 1.59992 57.7779 1.50092C62.4799 1.39992 66.3159 9.65192 70.8549 10.7599C75.3939 11.8679 82.6009 6.31194 86.7269 8.56794C90.7949 10.7919 90.0069 19.8349 93.4339 23.1149C96.7469 26.2859 105.769 25.0669 108.263 29.1709Z" stroke="#1C1C26" stroke-width="3" stroke-miterlimit="10" />
                            <path d="M34.7549 57.6988C37.8919 53.0548 47.6939 49.2228 54.8129 57.6988" stroke="#1C1C26" stroke-width="3" stroke-miterlimit="10" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M72.038 38.6659C68.806 38.6659 66.187 44.5069 66.187 51.7119C66.187 58.9169 68.807 64.7579 72.038 64.7579C75.27 64.7579 77.889 58.9169 77.889 51.7119C77.89 44.5069 75.27 38.6659 72.038 38.6659Z" fill="#1C1C26" />
                            <path d="M22.855 66.6569C23.693 70.6539 25.213 74.5799 27.455 78.2689C38.062 95.7269 60.813 101.28 78.27 90.6729C86.999 85.3689 92.752 77.0299 94.996 67.8339" stroke="#1C1C26" stroke-width="3" stroke-miterlimit="10" />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CustomCursor;

