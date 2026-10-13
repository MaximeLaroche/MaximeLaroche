import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Theme = 'system' | 'light' | 'dark'
const STORAGE_KEY = 'ml-theme'

function detectInitialTheme(): Theme {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'system' || saved === 'light' || saved === 'dark') return saved
  } catch {
    /* storage unavailable */
  }
  return 'system'
}

function systemIsDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

interface ThemeContextValue {
  theme: Theme
  resolved: 'light' | 'dark'
  cycleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const ORDER: Theme[] = ['system', 'light', 'dark']

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(detectInitialTheme)
  const [resolved, setResolved] = useState<'light' | 'dark'>(() =>
    detectInitialTheme() === 'dark' || (detectInitialTheme() === 'system' && systemIsDark())
      ? 'dark'
      : 'light',
  )

  useEffect(() => {
    const apply = () => {
      const isDark = theme === 'dark' || (theme === 'system' && systemIsDark())
      document.documentElement.classList.toggle('dark', isDark)
      setResolved(isDark ? 'dark' : 'light')
    }
    apply()
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])

  const cycleTheme = () => {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]
    setTheme(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable */
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, resolved, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
