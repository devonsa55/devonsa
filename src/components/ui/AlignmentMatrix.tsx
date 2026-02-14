import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Cpu, ArrowRight, Zap } from 'lucide-react';

const AlignmentMatrix: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    const lineVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut", delay: 0.6 }
        }
    };

    return (
        <motion.div
            className="alignment-matrix-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
                width: '100%',
                maxWidth: '900px',
                margin: '4rem auto',
                padding: '4rem 2rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '40px',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div className="matrix-flex" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0',
                position: 'relative',
                zIndex: 2
            }}>
                {/* Inputs Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '230px' }}>
                    <MatrixNode
                        icon={<User size={18} />}
                        title="User Narrative"
                        subtitle="The Ideal"
                        color="var(--text-primary)"
                        variants={itemVariants}
                    />
                    <MatrixNode
                        icon={<Briefcase size={18} />}
                        title="Business Goals"
                        subtitle="The Requirement"
                        color="#F59E0B"
                        variants={itemVariants}
                    />
                    <MatrixNode
                        icon={<Cpu size={18} />}
                        title="Technical Rails"
                        subtitle="The Reality"
                        color="#10B981"
                        variants={itemVariants}
                    />
                </div>

                {/* Connection Lines 1 */}
                <div style={{ width: '80px', height: '230px', position: 'relative' }}>
                    <svg width="100%" height="100%" viewBox="0 0 80 230" preserveAspectRatio="none">
                        {/* 2.5 stroke weight to match arrow */}
                        <motion.path
                            d="M 2,42 Q 45,42 78,115"
                            stroke="var(--text-primary)"
                            strokeWidth="2.5"
                            fill="none"
                            variants={lineVariants}
                        />
                        <motion.path
                            d="M 2,115 L 78,115"
                            stroke="var(--text-primary)"
                            strokeWidth="2.5"
                            fill="none"
                            variants={lineVariants}
                        />
                        <motion.path
                            d="M 2,188 Q 45,188 78,115"
                            stroke="var(--text-primary)"
                            strokeWidth="2.5"
                            fill="none"
                            variants={lineVariants}
                        />

                        {/* Connection Dots */}
                        <motion.circle cx="2" cy="42" r="3" fill="var(--text-primary)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} />
                        <motion.circle cx="2" cy="115" r="3" fill="var(--text-primary)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} />
                        <motion.circle cx="2" cy="188" r="3" fill="var(--text-primary)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} />
                    </svg>
                </div>

                {/* Synthesis Box */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        width: '210px',
                        height: '210px',
                        backgroundColor: '#EDEEF0',
                        color: 'var(--text-primary)',
                        padding: '24px',
                        borderRadius: '48px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        border: '2px solid var(--border-subtle)',
                        zIndex: 3
                    }}
                >
                    <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', lineHeight: 1.15 }}>Feature Alignment Matrix</h4>
                    <p style={{ margin: '12px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>(Structured Synthesis)</p>
                </motion.div>

                {/* Connection Line 2 */}
                <div style={{ width: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        <ArrowRight size={32} strokeWidth={2.5} />
                    </motion.div>
                </div>

                {/* Outcome Box */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        width: '180px',
                        height: '180px',
                        backgroundColor: 'var(--bg-primary)',
                        border: '2px solid var(--text-primary)',
                        padding: '20px',
                        borderRadius: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        gap: '12px',
                    }}
                >
                    <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--hover-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Zap size={24} fill="var(--text-primary)" stroke="var(--text-primary)" />
                    </div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', lineHeight: 1.15 }}>Powerful Clarity</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>(The Outcome)</span>
                    </div>
                </motion.div>
            </div>

            {/* Background Texture Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(var(--dot-color) 1.5px, transparent 0)',
                backgroundSize: '24px 24px',
                opacity: 0.1,
                zIndex: 1
            }} />
        </motion.div>
    );
};

interface MatrixNodeProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    color: string;
    variants: any;
}

const MatrixNode: React.FC<MatrixNodeProps> = ({ icon, title, subtitle, color, variants }) => (
    <motion.div
        variants={variants}
        style={{
            backgroundColor: 'var(--bg-primary)',
            padding: '18px 22px',
            borderRadius: '20px',
            border: `1px solid var(--border-subtle)`,
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            height: '66px',
            boxSizing: 'border-box'
        }}
    >
        <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            backgroundColor: 'var(--hover-bg)',
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        }}>
            {icon}
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1 }}>{title}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1 }}>{subtitle}</div>
        </div>
    </motion.div>
);

export default AlignmentMatrix;
