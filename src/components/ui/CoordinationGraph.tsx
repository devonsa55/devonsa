import React from 'react';
import { motion } from 'framer-motion';

const CoordinationGraph: React.FC = () => {
    // Generate points for the exponential decay curve
    // y = 100 * e^(-k*x)
    const points: [number, number][] = [];
    const width = 800;
    const height = 300;
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    for (let x = 0; x <= 20; x += 0.5) {
        const xPos = padding + (x / 20) * chartWidth;
        // Exponential decay curve: y starts high, drops fast, then levels out
        const yVal = 100 * Math.pow(0.85, x);
        const yPos = (height - padding) - (yVal / 100) * chartHeight;
        points.push([xPos, yPos]);
    }

    const pathData = `M ${points[0][0]},${points[0][1]} ` +
        points.slice(1).map(p => `L ${p[0]},${p[1]}`).join(' ');

    const headwindPoint = {
        x: padding + (15 / 20) * chartWidth,
        y: (height - padding) - (100 * Math.pow(0.85, 15) / 100) * chartHeight
    };

    return (
        <div className="coordination-graph-wrapper" style={{ width: '100%', margin: '2rem 0' }}>
            <svg
                viewBox={`0 0 ${width} ${height}`}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                className="coordination-svg"
            >
                {/* Background Grid Lines (Optional, subtle) */}
                {[0, 25, 50, 75, 100].map(val => {
                    const y = (height - padding) - (val / 100) * chartHeight;
                    return (
                        <line
                            key={val}
                            x1={padding}
                            y1={y}
                            x2={width - padding}
                            y2={y}
                            stroke="var(--border-subtle)"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                            opacity="0.3"
                        />
                    );
                })}

                {/* Axes */}
                <line
                    x1={padding} y1={height - padding}
                    x2={width - padding} y2={height - padding}
                    stroke="var(--text-primary)"
                    strokeWidth="2"
                />
                <line
                    x1={padding} y1={padding}
                    x2={padding} y2={height - padding}
                    stroke="var(--text-primary)"
                    strokeWidth="2"
                />

                {/* X-Axis Labels */}
                {[0, 5, 10, 15, 20].map(val => (
                    <text
                        key={val}
                        x={padding + (val / 20) * chartWidth}
                        y={height - padding + 25}
                        textAnchor="middle"
                        fontSize="12"
                        fontFamily="var(--font-mono)"
                        fill="var(--text-secondary)"
                    >
                        {val === 20 ? '20+' : val}
                    </text>
                ))}
                <text
                    x={width / 2}
                    y={height - 10}
                    textAnchor="middle"
                    fontSize="14"
                    fontFamily="var(--font-heading)"
                    fontWeight="600"
                    fill="var(--text-primary)"
                >
                    Number of Collaborators
                </text>

                {/* Y-Axis Labels */}
                {[0, 50, 100].map(val => (
                    <text
                        key={val}
                        x={padding - 15}
                        y={(height - padding) - (val / 100) * chartHeight}
                        textAnchor="end"
                        alignmentBaseline="middle"
                        fontSize="12"
                        fontFamily="var(--font-mono)"
                        fill="var(--text-secondary)"
                    >
                        {val}%
                    </text>
                ))}
                <text
                    x={-height / 2}
                    y={15}
                    transform="rotate(-90)"
                    textAnchor="middle"
                    fontSize="14"
                    fontFamily="var(--font-heading)"
                    fontWeight="600"
                    fill="var(--text-primary)"
                >
                    Success Probability
                </text>

                {/* The Curve */}
                <motion.path
                    d={pathData}
                    fill="none"
                    stroke="var(--accent-purple)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                />

                {/* Headwind Point & Label */}
                <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                >
                    <circle
                        cx={headwindPoint.x}
                        cy={headwindPoint.y}
                        r="6"
                        fill="var(--accent-purple)"
                        stroke="white"
                        strokeWidth="2"
                    />
                    <circle
                        cx={headwindPoint.x}
                        cy={headwindPoint.y}
                        r="12"
                        fill="var(--accent-purple)"
                        opacity="0.2"
                    >
                        <animate attributeName="r" from="8" to="16" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" />
                    </circle>

                    <text
                        x={headwindPoint.x + 15}
                        y={headwindPoint.y - 10}
                        fontSize="14"
                        fontWeight="700"
                        fontFamily="var(--font-heading)"
                        fill="var(--accent-purple)"
                    >
                        Coordination Headwind
                    </text>
                </motion.g>
            </svg>

            <style dangerouslySetInnerHTML={{
                __html: `
        .coordination-svg {
            overflow: visible;
        }
        [data-mode='dark'] .coordination-svg text {
            fill: #a1a1aa;
        }
        [data-mode='dark'] .coordination-svg line {
            stroke: #3f3f46;
        }
      `}} />
        </div>
    );
};

export default CoordinationGraph;
