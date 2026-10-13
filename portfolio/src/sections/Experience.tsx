import { Reveal } from '@/components/Reveal'
import { LogoTile } from '@/components/LogoTile'
import { useLanguage } from '@/lib/language'

export function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="scroll-mt-24 border-t border-border/60">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t.experience.title}</h2>
        </Reveal>

        <div className="mt-10 space-y-0">
          {t.experience.items.map((item, i) => (
            <Reveal key={`${item.company}-${item.period}`} delay={Math.min(i * 0.05, 0.2)}>
              <article className="relative grid grid-cols-[auto_1fr] gap-x-5 border-l border-border pb-10 pl-6 last:pb-0 md:gap-x-7 md:pl-8">
                {/* timeline dot */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400"
                />
                <LogoTile name={item.logo} className="mt-1 h-12 w-12 md:h-14 md:w-14" />
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold tracking-tight">{item.role}</h3>
                    <span className="font-mono-alt text-xs text-muted-foreground">{item.period}</span>
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                    {item.company}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-border" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
