import { Monitor, Moon, Sun } from 'lucide-react'
import { useLanguage, type Lang } from '@/lib/language'
import { useTheme } from '@/lib/theme'
import { FlagFR, FlagGB } from '@/components/Flags'

const LANGS: { id: Lang; label: string; Flag: typeof FlagGB }[] = [
  { id: 'en', label: 'EN', Flag: FlagGB },
  { id: 'fr', label: 'FR', Flag: FlagFR },
]

export function Nav() {
  const { lang, setLang, t } = useLanguage()
  const { theme, cycleTheme } = useTheme()

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor
  const themeLabel =
    theme === 'system' ? 'Theme: System' : theme === 'light' ? 'Theme: Light' : 'Theme: Dark'

  const links = [
    { href: '#experience', label: t.nav.experience },
    { href: '#education', label: t.nav.education },
    { href: '#projects', label: t.nav.projects },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          Maxime Laroche
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-border bg-card p-1">
            {LANGS.map(({ id, label, Flag }) => (
              <button
                key={id}
                onClick={() => setLang(id)}
                aria-pressed={lang === id}
                aria-label={id === 'en' ? 'English' : 'Français'}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all active:scale-[0.97] ${
                  lang === id
                    ? 'bg-secondary text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Flag className="h-3.5 w-5 rounded-[2px] ring-1 ring-black/10" />
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={cycleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:text-foreground active:scale-[0.97]"
          >
            <ThemeIcon className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </header>
  )
}
