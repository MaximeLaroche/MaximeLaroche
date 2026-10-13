const LOGOS: Record<string, { src: string; alt: string }> = {
  ms: { src: 'logos/ms.png', alt: 'Morgan Stanley' },
  nbc: { src: 'logos/nbc.png', alt: 'National Bank of Canada' },
  bombardier: { src: 'logos/bombardier.png', alt: 'Bombardier' },
  polymtl: { src: 'logos/polymtl.png', alt: 'Polytechnique Montréal' },
}

interface LogoTileProps {
  name: string
  className?: string
}

export function LogoTile({ name, className = '' }: LogoTileProps) {
  const logo = LOGOS[name]
  if (!logo) return null
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white p-1.5 ${className}`}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </div>
  )
}
