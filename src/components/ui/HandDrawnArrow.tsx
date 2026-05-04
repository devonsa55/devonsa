const HandDrawnArrow = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      width="237"
      height="106"
      viewBox="0 0 237 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block align-baseline h-[0.7em] w-auto mx-[0.2em] relative top-[-0.02em] ${className}`}
    >
      <path
        d="M6.99659 70.8319C50.2561 95.8302 124.915 82.3674 144.053 48.1745C163.192 13.9815 121.999 -4.39624 104.915 40.658C87.8304 85.7122 130.35 90.6719 218.119 66.4182M218.119 66.4182L203.68 54.4172M218.119 66.4182L202.449 86.0201"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default HandDrawnArrow
