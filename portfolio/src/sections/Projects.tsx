import { Reveal } from '@/components/Reveal'
import { useLanguage } from '@/lib/language'

export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="scroll-mt-24 border-t border-border/60">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t.projects.title}</h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {t.projects.items.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-xs">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
                  <span className="font-mono-alt text-xs text-muted-foreground">{project.period}</span>
                </div>
                <ul className="mt-3 flex-1 space-y-1.5">
                  {project.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-border" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-secondary px-3 py-1 font-mono-alt text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
