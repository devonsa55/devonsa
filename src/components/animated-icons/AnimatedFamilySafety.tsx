import { motion } from 'framer-motion';

const AnimatedFamilySafety = ({ className = '' }: { className?: string }) => {
    const drawLine = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { pathLength: { type: "spring", duration: 1.5, bounce: 0 }, opacity: { duration: 0.1 } }
        }
    };

    const popIn = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: (custom: number) => ({
            scale: 1,
            opacity: 1,
            transition: { delay: custom * 0.15, type: "spring", damping: 15, stiffness: 200 }
        })
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
            {/* Background Frame - Draw outline */}
            <motion.path
                variants={drawLine}
                d="M328 40H72C54.3269 40 40 54.3269 40 72V328C40 345.673 54.3269 360 72 360H328C345.673 360 360 345.673 360 328V72C360 54.3269 345.673 40 328 40Z"
                fill="#F5F5F7"
                stroke="#111111"
                strokeWidth="4"
                strokeLinejoin="round"
            />

            {/* Grid Elements - Pop in */}
            <motion.g>
                <motion.path custom={1} variants={popIn} d="M188 64H80C71.1634 64 64 71.1634 64 80V128C64 136.837 71.1634 144 80 144H188C196.837 144 204 136.837 204 128V80C204 71.1634 196.837 64 188 64Z" fill="#E8E8ED" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
                <motion.path custom={2} variants={popIn} d="M320 64H252C243.163 64 236 71.1634 236 80V188C236 196.837 243.163 204 252 204H320C328.837 204 336 196.837 336 188V80C336 71.1634 328.837 64 320 64Z" fill="#E8E8ED" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
                <motion.path custom={3} variants={popIn} d="M188 176H80C71.1634 176 64 183.163 64 192V320C64 328.837 71.1634 336 80 336H188C196.837 336 204 328.837 204 320V192C204 183.163 196.837 176 188 176Z" fill="#E8E8ED" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
                <motion.path custom={4} variants={popIn} d="M320 236H252C243.163 236 236 243.163 236 252V320C236 328.837 243.163 336 252 336H320C328.837 336 336 328.837 336 320V252C336 243.163 328.837 236 320 236Z" fill="#E8E8ED" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
            </motion.g>

            {/* Battery / Status Icons - Delayed Draw */}
            <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }} viewport={{ once: true }}>
                <path d="M134 88V108" stroke="#FF383C" strokeWidth="4" strokeLinecap="round" />
                <path d="M134 118.5C135.933 118.5 137.5 120.067 137.5 122C137.5 123.933 135.933 125.5 134 125.5C132.067 125.5 130.5 123.933 130.5 122C130.5 120.067 132.067 118.5 134 118.5Z" fill="#FF383C" stroke="#FF383C" />

                <path d="M292 268H276C273.791 268 272 269.791 272 272V308C272 310.209 273.791 312 276 312H292C294.209 312 296 310.209 296 308V272C296 269.791 294.209 268 292 268Z" fill="#F5F5F7" stroke="#34C759" strokeWidth="4" />
                <path d="M280 304H288" stroke="#34C759" strokeWidth="4" strokeLinecap="round" />
            </motion.g>

            {/* Avatars / Users - Pop in sequence */}
            <motion.g custom={5} variants={popIn}>
                <path d="M134 306C118 280 102 266 102 250C102 241.513 105.371 233.374 111.373 227.373C117.374 221.371 125.513 218 134 218C142.487 218 150.626 221.371 156.627 227.373C162.629 233.374 166 241.513 166 250C166 266 150 280 134 306Z" fill="#4886ED" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
                <path d="M134 260C139.523 260 144 255.523 144 250C144 244.477 139.523 240 134 240C128.477 240 124 244.477 124 250C124 255.523 128.477 260 134 260Z" fill="#E8E8ED" stroke="#111111" strokeWidth="4" />
            </motion.g>

            <motion.g custom={6} variants={popIn}>
                <path d="M286 170C270 144 254 130 254 114C254 105.513 257.371 97.3737 263.373 91.3726C269.374 85.3714 277.513 82 286 82C294.487 82 302.626 85.3714 308.627 91.3726C314.629 97.3737 318 105.513 318 114C318 130 302 144 286 170Z" fill="#FFCC00" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
                <path d="M286 124C291.523 124 296 119.523 296 114C296 108.477 291.523 104 286 104C280.477 104 276 108.477 276 114C276 119.523 280.477 124 286 124Z" fill="#E8E8ED" stroke="#111111" strokeWidth="4" />
            </motion.g>

        </motion.svg>
    );
};

export default AnimatedFamilySafety;
