import { motion } from 'framer-motion';

const AnimatedShopStream = ({ className = '' }: { className?: string }) => {
    const drawLine = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { pathLength: { type: "spring", duration: 1.5, bounce: 0 }, opacity: { duration: 0.1 } }
        }
    };

    const drawDash = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { pathLength: { type: "spring", duration: 2, bounce: 0 }, opacity: { duration: 0.1 } }
        }
    };

    const fadeUp = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', damping: 20, stiffness: 100, duration: 0.8 }
        }
    };

    return (
        <motion.svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            <defs>
                <linearGradient id="paint0_linear_1059_3091" x1="263.75" y1="153.75" x2="286.25" y2="176.25" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EA4335" />
                    <stop offset="0.25" stopColor="#FBBC04" />
                    <stop offset="0.5" stopColor="#34A853" />
                    <stop offset="0.75" stopColor="#4285F4" />
                    <stop offset="1" stopColor="#9B72CB" />
                </linearGradient>
                <linearGradient id="paint1_linear_1059_3091" x1="203.332" y1="70.5073" x2="213.955" y2="95.8314" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#19FF30" />
                    <stop offset="1" stopColor="#05AEE3" />
                </linearGradient>
                <linearGradient id="paint2_linear_1059_3091" x1="114" y1="44" x2="146" y2="76" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4285F4" />
                    <stop offset="0.5" stopColor="#9B72CB" />
                    <stop offset="1" stopColor="#D96570" />
                </linearGradient>
            </defs>

            {/* Main Base shapes - Fade up */}
            <motion.g variants={fadeUp}>
                <path d="M164 110H66C57.1634 110 50 117.163 50 126V274C50 282.837 57.1634 290 66 290H164C172.837 290 180 282.837 180 274V126C180 117.163 172.837 110 164 110Z" fill="#E8E8ED" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
                <path d="M100 171C108.837 171 116 163.837 116 155C116 146.163 108.837 139 100 139C91.1634 139 84 146.163 84 155C84 163.837 91.1634 171 100 171Z" fill="#F5F5F7" stroke="#111111" strokeWidth="4" />
                <path d="M344 180H156C147.163 180 140 187.163 140 196V304C140 312.837 147.163 320 156 320H344C352.837 320 360 312.837 360 304V196C360 187.163 352.837 180 344 180Z" fill="#F5F5F7" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
                <path d="M230 225L270 250L230 275V225Z" fill="#E8E8ED" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
                <path d="M165 295H335" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
                <path d="M210 301C213.314 301 216 298.314 216 295C216 291.686 213.314 289 210 289C206.686 289 204 291.686 204 295C204 298.314 206.686 301 210 301Z" fill="#F5F5F7" stroke="#111111" strokeWidth="4" />
            </motion.g>

            {/* Decorative Lines - Draw in */}
            <motion.path variants={drawLine} d="M50 250L95 190L130 235" stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <motion.path variants={drawLine} d="M110 215L140 175L180 225" stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <motion.path variants={drawDash} d="M115 110C130 50 210 50 260 150" stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 8" />

            {/* Floating accent elements - Delayed scale/fade */}
            <motion.g
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
            >
                <path d="M275 127.5C275 150 290 165 312.5 165C290 165 275 180 275 202.5C275 180 260 165 237.5 165C260 165 275 150 275 127.5Z" fill="url(#paint0_linear_1059_3091)" stroke="#111111" strokeWidth="6" strokeLinejoin="round" />
                <path d="M211 62C211 76 221 86 235 86C221 86 211 96 211 110C211 96 201 86 187 86C201 86 211 76 211 62Z" fill="url(#paint1_linear_1059_3091)" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
                <path d="M130 44C130 52 138 60 146 60C138 60 130 68 130 76C130 68 122 60 114 60C122 60 130 52 130 44Z" fill="url(#paint2_linear_1059_3091)" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
            </motion.g>
        </motion.svg>
    );
};

export default AnimatedShopStream;
