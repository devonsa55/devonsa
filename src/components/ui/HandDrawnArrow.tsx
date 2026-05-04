const HandDrawnArrow = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      width="250"
      height="140"
      viewBox="0 0 250 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block align-baseline h-[0.8em] w-auto mx-[0.2em] relative top-[-0.05em] ${className}`}
    >
      <path
        d="M12.0847 92.3224C62.1014 105.451 161.739 115.264 172.636 51.3395C180.076 7.69512 127.247 7.45893 120.969 55.5221C114.691 103.585 189.113 141.194 238.045 59.7759M238.045 59.7759L218.847 61.7058M238.045 59.7759L239.956 85.2599"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default HandDrawnArrow
