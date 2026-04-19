import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useMemo } from 'react';

interface AnimatedUnderlineProps {
  children: React.ReactNode;
  color?: string;
  strokeWidth?: number;
}

const squiggleVariants = [
  "M5 20.9999C26.7762 16.2245 49.5532 11.5572 71.7979 14.6666C84.9553 16.5057 97.0392 21.8432 109.987 24.3888C116.413 25.6523 123.012 25.5143 129.042 22.6388C135.981 19.3303 142.586 15.1422 150.092 13.3333C156.799 11.7168 161.702 14.6225 167.887 16.8333C181.562 21.7212 194.975 22.6234 209.252 21.3888C224.678 20.0548 239.912 17.991 255.42 18.3055C272.027 18.6422 288.409 18.867 305 17.9999",
  "M5 24.2592C26.233 20.2879 47.7083 16.9968 69.135 13.8421C98.0469 9.5853 128.407 4.02322 158.059 5.14674C172.583 5.69708 187.686 8.66104 201.598 11.9696C207.232 13.3093 215.437 14.9471 220.137 18.3619C224.401 21.4596 220.737 25.6575 217.184 27.6168C208.309 32.5097 197.199 34.281 186.698 34.8486C183.159 35.0399 147.197 36.2657 155.105 26.5837C158.11 22.9053 162.993 20.6229 167.764 18.7924C178.386 14.7164 190.115 12.1115 201.624 10.3984C218.367 7.90626 235.528 7.06127 252.521 7.49276C258.455 7.64343 264.389 7.92791 270.295 8.41825C280.321 9.25056 296 10.8932 305 13.0242",
  "M5 29.8857C52.3147 26.9322 99.4329 21.6611 146.503 17.1765C151.753 16.6763 157.115 15.9505 162.415 15.6551C163.28 15.6069 165.074 15.4123 164.383 16.4275C161.704 20.3627 157.134 23.7551 153.95 27.4983C153.209 28.3702 148.194 33.4751 150.669 34.6605C153.638 36.0819 163.621 32.6063 165.039 32.2029C178.55 28.3608 191.49 23.5968 204.869 19.5404C231.903 11.3436 259.347 5.83254 288.793 5.12258C294.094 4.99476 299.722 4.82265 305 5.45025"
];

export const AnimatedUnderline = ({ 
  children, 
  color = 'currentColor', 
  strokeWidth = 6 
}: AnimatedUnderlineProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);

  const handleHoverStart = useCallback(() => {
    setVariantIndex(Math.floor(Math.random() * squiggleVariants.length));
    setIsHovered(true);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
  }, []);

  const pathVariants = useMemo(() => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 0.4, 
        ease: "easeInOut" 
      } 
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 } 
    }
  }), []);

  return (
    <motion.span
      className="relative inline-block cursor-pointer"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute left-0 bottom-[-8px] w-full h-[12px] pointer-events-none overflow-visible">
        <AnimatePresence>
          {isHovered && (
            <motion.svg
              key={variantIndex}
              viewBox="0 0 310 40"
              preserveAspectRatio="none"
              className="w-full h-full"
              style={{ color }}
            >
              <motion.path
                d={squiggleVariants[variantIndex]}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
    </motion.span>
  );
};

export default AnimatedUnderline;
