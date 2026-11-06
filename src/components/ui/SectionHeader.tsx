import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../utils/motion'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  centered?: boolean
  className?: string
  // Page titles pass 1; every other header stays an h2
  level?: 1 | 2
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  centered = false,
  className = '',
  level = 2,
}) => {
  const Heading = level === 1 ? motion.h1 : motion.h2
  return (
    <div className={`section-header ${centered ? 'text-center' : ''} ${className}`}>
      {badge && (
        <motion.div {...fadeInUp} className="badge">
          {badge}
        </motion.div>
      )}
      <Heading {...fadeInUp} transition={{ delay: 0.1 }}>
        {title}
      </Heading>
      {subtitle && (
        <motion.p {...fadeInUp} transition={{ delay: 0.2 }}>
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default SectionHeader
