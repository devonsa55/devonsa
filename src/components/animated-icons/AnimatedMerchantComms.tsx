import { motion } from 'framer-motion';

const AnimatedMerchantComms = ({ className = '' }: { className?: string }) => {
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

    const popIn = {
        hidden: { scale: 0.5, opacity: 0 },
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
            {/* Central network lines */}
            <motion.g variants={drawLine} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <path d="M200 200C200 120 160 80 80 80" stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M200 200C280 200 320 160 320 80" stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M200 200C200 280 240 320 320 320" stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M200 200C120 200 80 240 80 320" stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>

            {/* Nodes - Pop in */}
            <motion.g>
                <motion.path custom={1} variants={popIn} d="M142 97C145.314 97 148 94.3137 148 91C148 87.6863 145.314 85 142 85C138.686 85 136 87.6863 136 91C136 94.3137 138.686 97 142 97Z" fill="#F5F5F7" stroke="#111111" strokeWidth="4" />
                <motion.path custom={2} variants={popIn} d="M305 155C308.314 155 311 152.314 311 149C311 145.686 308.314 143 305 143C301.686 143 299 145.686 299 149C299 152.314 301.686 155 305 155Z" fill="#F5F5F7" stroke="#111111" strokeWidth="4" />
                <motion.path custom={3} variants={popIn} d="M256 313C259.314 313 262 310.314 262 307C262 303.686 259.314 301 256 301C252.686 301 250 303.686 250 307C250 310.314 252.686 313 256 313Z" fill="#F5F5F7" stroke="#111111" strokeWidth="4" />
                <motion.path custom={4} variants={popIn} d="M90 266C93.3137 266 96 263.314 96 260C96 256.686 93.3137 254 90 254C86.6863 254 84 256.686 84 260C84 263.314 86.6863 266 90 266Z" fill="#F5F5F7" stroke="#111111" strokeWidth="4" />
            </motion.g>

            {/* Central Hub */}
            <motion.g custom={5} variants={popIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <path d="M200 280C244.183 280 280 244.183 280 200C280 155.817 244.183 120 200 120C155.817 120 120 155.817 120 200C120 244.183 155.817 280 200 280Z" fill="#F5F5F7" stroke="#111111" strokeWidth="4" />

                {/* Shop Icon */}
                <path d="M183 162H173V186H183V162Z" fill="#F2B53A" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
                <path d="M166 237L167 177L200 163L233 177L234 237H166Z" fill="#4886ED" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
                <path d="M154 198L166.778 177H233.222L246 198H154Z" fill="#239C5F" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
                <path d="M189.167 177L185 198M210.833 177L215 198" stroke="#111111" strokeWidth="4" strokeLinecap="round" />

                {/* Google "G" logo */}
                <motion.path
                    variants={drawDash}
                    d="M206.75 211.216C205.358 209.55 203.457 208.452 201.377 208.112C199.298 207.772 197.171 208.212 195.367 209.356C193.563 210.499 192.195 212.274 191.502 214.371C190.809 216.468 190.834 218.756 191.573 220.836C192.312 222.916 193.718 224.656 195.547 225.755C197.375 226.855 199.511 227.243 201.583 226.852C203.654 226.461 205.531 225.317 206.886 223.617C208.241 221.918 208.989 219.771 209 217.55L199.55 217.55"
                    stroke="#FFFFFF"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                />
            </motion.g>

            {/* External Chat Bubbles - Delayed pop */}
            <motion.g custom={6} variants={popIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <path d="M60 56H100C103.183 56 106.235 57.2643 108.485 59.5147C110.736 61.7652 112 64.8174 112 68V92C112 95.1826 110.736 98.2348 108.485 100.485C106.235 102.736 103.183 104 100 104H76L60 120V104C56.8174 104 53.7652 102.736 51.5147 100.485C49.2643 98.2348 48 95.1826 48 92V68C48 64.8174 49.2643 61.7652 51.5147 59.5147C53.7652 57.2643 56.8174 56 60 56Z" fill="#F5F5F7" stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M68 74H92M68 86H84" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
                <path d="M308 48H332C335.183 48 338.235 49.2643 340.485 51.5147C342.736 53.7652 344 56.8174 344 60V100C344 103.183 342.736 106.235 340.485 108.485C338.235 110.736 335.183 112 332 112H324V128L316 112H308C304.817 112 301.765 110.736 299.515 108.485C297.264 106.235 296 103.183 296 100V60C296 56.8174 297.264 53.7652 299.515 51.5147C301.765 49.2643 304.817 48 308 48Z" fill="#E8E8ED" stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M312 70H328M312 82H328M312 94H320" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
                <path d="M292 296H348C351.183 296 354.235 297.264 356.485 299.515C358.736 301.765 360 304.817 360 308V332C360 335.183 358.736 338.235 356.485 340.485C354.235 342.736 351.183 344 348 344H340V360L324 344H292C288.817 344 285.765 342.736 283.515 340.485C281.264 338.235 280 335.183 280 332V308C280 304.817 281.264 301.765 283.515 299.515C285.765 297.264 288.817 296 292 296Z" fill="#F5F5F7" stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M300 314H340M300 326H328" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
                <path d="M64 292H96C99.1826 292 102.235 293.264 104.485 295.515C106.736 297.765 108 300.817 108 304V336C108 339.183 106.736 342.235 104.485 344.485C102.235 346.736 99.1826 348 96 348H80L64 364V348C60.8174 348 57.7652 346.736 55.5147 344.485C53.2643 342.235 52 339.183 52 336V304C52 300.817 53.2643 297.765 55.5147 295.515C57.7652 293.264 60.8174 292 64 292Z" fill="#E8E8ED" stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M68 314H92M68 326H84" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
            </motion.g>

        </motion.svg>
    );
};

export default AnimatedMerchantComms;
