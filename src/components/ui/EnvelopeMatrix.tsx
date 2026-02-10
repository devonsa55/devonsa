import { useState, useEffect } from 'react';

const EnvelopeMatrix = () => {
    // 9x9 Dot Matrix Hand Wave Animation
    const frame1 = [
        "000000000",
        "000110000", // Fingers straight up
        "000111000",
        "000111100",
        "000111110", // Thumb
        "000111110", // Palm
        "000011000", // Wrist
        "000011000",
        "000000000"
    ];

    const frame2 = [
        "000000000",
        "000011000", // Tilted Right
        "000011100",
        "000001110",
        "000011111",
        "000011110",
        "000001100",
        "000001100",
        "000000000"
    ];

    const frame3 = [
        "000000000",
        "001100000", // Tilted Left
        "001110000",
        "001111000",
        "011111000",
        "011111000",
        "000110000",
        "000110000",
        "000000000"
    ];

    // Animation sequence: Center -> Right -> Center -> Left
    const frames = [frame1, frame2, frame1, frame3];

    const [frameIndex, setFrameIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval: any;
        if (isHovered) {
            interval = setInterval(() => {
                setFrameIndex((prev) => (prev + 1) % frames.length);
            }, 150); // Speed of wave
        } else {
            setFrameIndex(0); // Reset to center
        }
        return () => clearInterval(interval);
    }, [isHovered]);

    const renderDots = () => {
        const dots = [];
        const currentFrame = frames[frameIndex];

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const val = currentFrame[r][c];
                const isActive = val !== '0';

                dots.push(
                    <div
                        key={`${r}-${c}`}
                        className={`envelope-dot ${isActive ? 'is-icon-shape' : ''}`}
                    />
                );
            }
        }
        return dots;
    };

    return (
        <div
            className="envelope-matrix"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="envelope-screen">
                {renderDots()}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .envelope-matrix {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px;
                    /* Extend hit area to parent card size essentially via profile-icon-display */
                    width: 100%;
                    height: 100%;
                }

                .envelope-screen {
                    display: grid;
                    grid-template-columns: repeat(9, 1fr);
                    gap: 3px;
                }

                .envelope-dot {
                    width: 3px;
                    height: 3px;
                    background-color: var(--border-subtle);
                    border-radius: 50%;
                    transition: background-color 0.1s, transform 0.1s, opacity 0.3s; /* Fast transition for animation */
                    opacity: 1;
                }

                /* Reveal on hover */
                .profile-card:hover .envelope-dot.is-icon-shape {
                    background-color: var(--amethyst);
                    transform: scale(1.3);
                    box-shadow: 0 0 4px var(--amethyst-light);
                }
                
                /* Dim non-active dots */
                 .profile-card:hover .envelope-dot:not(.is-icon-shape) {
                    opacity: 0.2;
                    transform: scale(0.8);
                 }
                `
            }} />
        </div>
    );
};

export default EnvelopeMatrix;
