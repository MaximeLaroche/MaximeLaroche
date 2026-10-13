import { ArrowDown, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useLanguage } from '@/lib/language'

export function Hero() {
  const { lang, t } = useLanguage()
  const reduce = useReducedMotion()

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  const cvHref = lang === 'fr' ? 'cv-maxime-laroche-fr.pdf' : 'cv-maxime-laroche-en.pdf'

  return (
    <section id="top" className="relative overflow-hidden">
      {/* subtle backdrop grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [background-size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />

      <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 pb-20 pt-16 md:grid-cols-[1fr_auto] md:items-center md:pt-24">
        <div>
          <motion.p
            {...fadeUp(0)}
            className="flex items-center gap-2 font-mono-alt text-xs uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400"
          >
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
            {t.hero.location}
          </motion.p>

          <motion.h1
            {...fadeUp(0.08)}
            className="mt-4 text-5xl font-semibold leading-[1.02] tracking-tighter md:text-6xl"
          >
            Maxime Laroche
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="mt-3 text-xl font-medium text-muted-foreground md:text-2xl">
            {t.hero.role}
          </motion.p>

          <motion.p {...fadeUp(0.24)} className="mt-5 max-w-[52ch] leading-relaxed text-muted-foreground">
            {t.hero.intro}
          </motion.p>

          <motion.div {...fadeUp(0.32)} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={cvHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-800 active:translate-y-[1px] dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
            >
              {t.hero.ctaPrimary}
              <ArrowDown className="h-4 w-4" strokeWidth={1.75} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center whitespace-nowrap rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-all hover:bg-secondary active:translate-y-[1px]"
            >
              {t.hero.ctaSecondary}
            </a>

            <div className="ml-1 flex items-center gap-1.5">
              <a
                href="https://www.linkedin.com/in/laroche-maxime/"
                target="_blank"
                rel="noreferrer"
                aria-label={t.socials.linkedin}
                title={t.socials.linkedin}
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-[0.97]"
              >
                <Linkedin className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </a>
              <a
                href="mailto:mlaroche2009@gmail.com"
                aria-label={t.socials.email}
                title={t.socials.email}
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-[0.97]"
              >
                <Mail className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </a>
              <a
                href="tel:+15143480345"
                aria-label={t.socials.phone}
                title={t.socials.phone}
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-[0.97]"
              >
                <Phone className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Profile photo */}
        <motion.div {...fadeUp(0.2)} className="flex md:block">
          <img
            src="photo.jpg"
            alt="Maxime Laroche"
            width={176}
            height={176}
            className="h-32 w-32 rounded-2xl border border-border object-cover shadow-xs md:h-44 md:w-44 md:rounded-3xl"
          />
        </motion.div>
      </div>
    </section>
  )
}
