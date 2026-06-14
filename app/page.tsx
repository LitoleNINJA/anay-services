import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Stats } from "@/components/sections/Stats";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      {/* Server-rendered, keyword-rich H1 for SEO; the visual hero headline
          below is intentionally a styled paragraph so there is exactly one H1. */}
      <h1 className="sr-only">
        Anay Interior — Flooring &amp; Fit-Out Contractor in Dubai &amp; the UAE
      </h1>
      <Hero />
      <About />
      <Marquee />
      <Services />
      <Projects />
      <Process />
      <Stats />
      <FAQ />
      <Contact />
    </>
  );
}
