import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';

const CHARACTERS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!?-&'.split('');

const SplitFlapChar = ({
    targetChar,
    isYellow = false,
    delay = 0,
    active = false,
    maxHunts = 12
}: {
    targetChar: string,
    isYellow?: boolean,
    delay?: number,
    active?: boolean,
    maxHunts?: number
}) => {
    const [currentChar, setCurrentChar] = useState(' ');
    const [nextChar, setNextChar] = useState(' ');
    const [isFlipping, setIsFlipping] = useState(false);
    const [canStart, setCanStart] = useState(false);
    const huntCount = useRef(0);

    const actualTarget = (active && canStart) ? targetChar : ' ';

    // Handle initial delay when board becomes active
    useEffect(() => {
        if (active) {
            const timer = setTimeout(() => {
                setCanStart(true);
                huntCount.current = 0;
            }, delay);
            return () => clearTimeout(timer);
        } else {
            setCanStart(false);
            huntCount.current = 0;
        }
    }, [active, delay]);

    useEffect(() => {
        if (!isFlipping && actualTarget !== currentChar) {
            let next;
            // Hunting logic: flip through random chars until we hit the target or reach max hunts
            if (huntCount.current < maxHunts) {
                // Pick a random character that isn't the current or the next (to ensure visual movement)
                let randIndex;
                do {
                    randIndex = Math.floor(Math.random() * CHARACTERS.length);
                } while (CHARACTERS[randIndex] === currentChar);

                next = CHARACTERS[randIndex];

                // If we luckily hit the target early, that's fine too
                if (next === actualTarget) {
                    huntCount.current = maxHunts;
                } else {
                    huntCount.current++;
                }
            } else {
                // Force target resolution
                next = actualTarget;
            }

            setNextChar(next);
            setIsFlipping(true);
        }
    }, [actualTarget, currentChar, isFlipping, maxHunts]);

    const handleFlipEnd = () => {
        setCurrentChar(nextChar);
        setIsFlipping(false);
    };

    return (
        <div className={`flap-container ${isYellow ? 'is-yellow' : ''}`}>
            <div className="flap-segment flap-top-next">
                <span>{nextChar}</span>
            </div>

            <div className="flap-segment flap-bottom-current">
                <span>{currentChar}</span>
            </div>

            <AnimatePresence mode="wait">
                {isFlipping && (
                    <motion.div
                        key={currentChar + nextChar}
                        className="flap-leaf"
                        initial={{ rotateX: 0 }}
                        animate={{ rotateX: -180 }}
                        onAnimationComplete={handleFlipEnd}
                        transition={{
                            duration: 0.08,
                            ease: "linear"
                        }}
                        style={{ transformOrigin: "bottom", zIndex: 10 }}
                    >
                        <div className="flap-leaf-front">
                            <span>{currentChar}</span>
                        </div>
                        <div className="flap-leaf-back">
                            <span>{nextChar}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flap-divider" />
        </div>
    );
};

const SplitFlapBoard: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    const displayTitles = useMemo(() => {
        return projects.slice(0, 4).map(p => p.title.toUpperCase());
    }, []);

    const COLS = 26;
    const ROWS = 6;

    const grid = useMemo(() => {
        const matrix = Array.from({ length: ROWS }, () => Array(COLS).fill(" "));

        // Row 0: PROJECTS: COMING SOON...
        const cs = "PROJECTS: COMING SOON...";
        for (let i = 0; i < cs.length; i++) {
            matrix[0][i + 1] = cs[i];
        }

        // Rows 2-5: Projects
        displayTitles.forEach((title, idx) => {
            const rowIdx = idx + 2;
            const startCol = 1;
            for (let i = 0; i < title.length && (startCol + i) < COLS; i++) {
                matrix[rowIdx][startCol + i] = title[i];
            }
        });

        return matrix;
    }, [displayTitles, COLS]);

    return (
        <div
            className="split-flap-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="split-flap-board">
                {grid.map((row, r) => (
                    <div key={r} className="flap-row">
                        {row.map((char, c) => (
                            <SplitFlapChar
                                key={`${r}-${c}`}
                                targetChar={char}
                                isYellow={r === 0}
                                // Coming Soon resolves with fewer hunts and no initial delay
                                delay={r === 0 ? 0 : 800}
                                maxHunts={r === 0 ? 16 : 30}
                                active={isHovered}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SplitFlapBoard;
