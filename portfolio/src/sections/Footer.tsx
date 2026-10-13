import { Linkedin, Mail, Phone } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { useLanguage } from '@/lib/language'

export function Footer() {
  const { lang, t } = useLanguage()

  const contacts = [
    {
      href: 'https://www.linkedin.com/in/laroche-maxime/',
      label: t.socials.linkedin,
      value: 'in/laroche-maxime',
      Icon: Linkedin,
      external: true,
    },
    {
      href: 'mailto:mlaroche2009@gmail.com',
      label: 'Email',
      value: t.socials.email,
      Icon: Mail,
      external: false,
    },
    {
      href: 'tel:+15143480345',
      label: lang === 'fr' ? 'Téléphone' : 'Phone',
      value: t.socials.phone,
      Icon: Phone,
      external: false,
    },
  ]

  const facts = [
    { label: t.about.strengthsLabel, value: t.about.strengths },
    { label: t.about.languagesLabel, value: t.about.languages },
  ]

  return (
    <footer id="contact" className="scroll-mt-24 border-t border-border/60">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t.footer.title}</h2>
          <p className="mt-3 max-w-[52ch] text-muted-foreground">{t.footer.text}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 rounded-xl border border-border bg-card p-6 shadow-xs sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono-alt text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm font-medium leading-relaxed">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {contacts.map(({ href, label, value, Icon, external }) => (
              <a
                key={href}
                href={href}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white dark:text-emerald-400 dark:group-hover:bg-emerald-500 dark:group-hover:text-emerald-950">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">{label}</span>
                  <span className="block truncate text-sm font-medium">{value}</span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-14 flex items-center justify-between border-t border-border/60 pt-6 text-xs text-muted-foreground">
            <span>{t.footer.rights}</span>
            <span className="font-mono-alt">ML · {lang.toUpperCase()}</span>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
