function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0" style={{ color: 'var(--lavender)' }}>
        <li>
          <a
            className="flex items-center transition-all hover:opacity-80"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/manansh_shukla"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">X</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:opacity-80"
            rel="noopener noreferrer"
            target="_blank"
            href="https://warpcast.com/manansh"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">farcaster</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:opacity-80"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/manansh11"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">github</p>
          </a>
        </li>
      </ul>
    </footer>
  )
}
