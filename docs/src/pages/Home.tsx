import { Nav } from '@/sections/Nav'
import { Hero } from '@/sections/Hero'
import { Experience } from '@/sections/Experience'
import { Education } from '@/sections/Education'
import { Projects } from '@/sections/Projects'
import { Footer } from '@/sections/Footer'

export default function Home() {
  return (
    <div className="min-h-[100dvh]">
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Education />
        <Projects />
      </main>
      <Footer />
    </div>
  )
}
