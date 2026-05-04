const HandDrawnArrow = ({
  className = '',
  strokeWidth = 10,
}: {
  className?: string
  strokeWidth?: number
}) => {
  return (
    <svg
      width="237"
      height="72"
      viewBox="0 0 237 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block align-middle h-[0.6em] w-auto ml-[0.2em] mr-[0.1em] relative top-[-0.12em] ${className}`}
    >
      <path
        d="M8.32264 43.8319C51.5821 68.8302 130.951 58.1649 144.379 34.1745C157.807 10.184 118.448 -8.17056 105.241 26.658C84.1942 82.1613 131.676 63.6719 219.445 39.4182M219.445 39.4182L205.006 27.4172M219.445 39.4182L203.775 59.0201"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}

export default HandDrawnArrow
