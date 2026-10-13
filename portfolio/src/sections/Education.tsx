import { Reveal } from '@/components/Reveal'
import { LogoTile } from '@/components/LogoTile'
import { useLanguage } from '@/lib/language'

export function Education() {
  const { t } = useLanguage()

  return (
    <section id="education" className="scroll-mt-24 border-t border-border/60">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t.education.title}</h2>
        </Reveal>

        <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-card shadow-xs">
          {t.education.items.map((item, i) => (
            <Reveal key={item.degree} delay={i * 0.08}>
              <article className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
                <LogoTile name="polymtl" className="h-11 w-28" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold tracking-tight">{item.degree}</h3>
                  <p className="mt-0.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                    {item.school}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
                <span className="shrink-0 font-mono-alt text-xs text-muted-foreground sm:self-start sm:pt-1">
                  {item.period}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
