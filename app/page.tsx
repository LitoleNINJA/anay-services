import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Stats } from "@/components/sections/Stats";
import { Contact } from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Marquee />
      <Services />
      <Projects />
      <Process />
      <Stats />
      <Contact />
    </>
  );
}
