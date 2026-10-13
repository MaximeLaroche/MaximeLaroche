export function FlagGB({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
      <clipPath id="gb-clip">
        <rect width="60" height="40" rx="4" />
      </clipPath>
      <g clipPath="url(#gb-clip)">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="3" />
        <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="13" />
        <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="7" />
      </g>
    </svg>
  )
}

export function FlagFR({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
      <clipPath id="fr-clip">
        <rect width="60" height="40" rx="4" />
      </clipPath>
      <g clipPath="url(#fr-clip)">
        <rect width="20" height="40" fill="#0055A4" />
        <rect x="20" width="20" height="40" fill="#fff" />
        <rect x="40" width="20" height="40" fill="#EF4135" />
      </g>
    </svg>
  )
}
