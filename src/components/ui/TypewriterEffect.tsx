import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TypewriterEffectProps {
  words: string[];
  colors?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  cursorColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function TypewriterEffect({
  words,
  colors = [],
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDuration = 1500,
  cursorColor = "var(--text-primary)",
  className = "",
  style = {},
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const timeoutRef = useRef<number | null>(null);
  const currentWord = words.length > 0 ? words[wordIndex % words.length] : "";
  const currentColor = colors.length > 0 ? colors[wordIndex % colors.length] : "inherit";
  const nextColor = colors.length > 0 ? colors[(wordIndex + 1) % colors.length] : "inherit";
  const displayColor = (isDeleting && charIndex === 0) ? nextColor : currentColor;

  useEffect(() => {
    let delay = typingSpeed;

    if (!isDeleting && charIndex < currentWord.length) {
      delay = typingSpeed;
      timeoutRef.current = window.setTimeout(() => {
        setDisplayedText(currentWord.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, delay);
    } else if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseDuration;
      timeoutRef.current = window.setTimeout(() => {
        setIsDeleting(true);
      }, delay);
    } else if (isDeleting && charIndex > 0) {
      delay = deletingSpeed;
      timeoutRef.current = window.setTimeout(() => {
        setDisplayedText(currentWord.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, delay);
    } else if (isDeleting && charIndex === 0) {
      delay = pauseDuration / 3;
      timeoutRef.current = window.setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, delay);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIndex, isDeleting, wordIndex, currentWord, typingSpeed, deletingSpeed, pauseDuration, words.length]);

  // Reset char index when word index changes (safety net)
  useEffect(() => {
    if (!isDeleting) {
      setCharIndex(0);
    }
  }, [wordIndex, isDeleting]);

  return (
    <span 
      className={`inline-flex items-center ${className}`} 
      style={{ ...style, color: displayColor, fontStyle: 'italic', transition: 'color 0.3s ease' }}
    >
      <span>{displayedText || '\u200B'}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        style={{
          display: "inline-block",
          width: "0.08em",
          height: "1em",
          backgroundColor: colors.length > 0 ? displayColor : cursorColor,
          marginLeft: "0.25em",
          verticalAlign: "text-bottom",
          borderRadius: "2px"
        }}
      />
    </span>
  );
}
