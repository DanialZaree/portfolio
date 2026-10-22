import bineti from "/src/assets/images/bineti-desktop.avif";
import orbi from "/src/assets/images/orbi-desktop.png";
import orbiVideo from "/src/assets/images/orbi-video.mp4";
import boblo from "/src/assets/images/boblo-desktop.png";
import pulseplay from "/src/assets/images/pulseplay-demo.png";
import Projects from "../ui/Projects";
import Heading from "../ui/Heading";

export default function Works({ forwardedRef }) {
  return (
    <section
      ref={forwardedRef}
      id="works"
      className="nav-change overflow-hidden my-[10%]"
    >
      <Heading title="Projects" />
      <div className="mt-10 grid grid-cols-1 gap-16 gap-y-10 md:grid-cols-12">
        {/* Project 1: ORBI AI (FIRST - Full Width Hero with demo video) */}
        <div className="col-span-1 md:col-span-12">
          <Projects
            link="https://chat.orbiai.ir"
            img={orbi}
            video={orbiVideo}
            alt="ORBI AI Conversational Assistant preview"
            name="ORBI AI Assistant"
            type="Conversational AI • Web Application"
            year="2025"
            tools="React • JavaScript • TailwindCSS • AI API"
          />
        </div>

        {/* Project 2: biNeti (Dual Column Left) */}
        <div className="col-span-1 pt-0 md:col-span-7 md:pt-16">
          <Projects
            link="https://bineti.ir"
            img={bineti}
            alt="biNeti Iranian web tools suite"
            name="biNeti — Web Suite"
            type="Web Application • Open Source Platform"
            year="2026"
            tools="Next.js • TypeScript • TailwindCSS • React"
          />
        </div>

        {/* Project 3: Tweeter (Boblo) (Dual Column Right - Desktop Screenshot) */}
        <div className="col-span-1 pt-0 md:col-span-5 md:pt-48">
          <Projects
            link="https://boblo.ir"
            img={boblo}
            alt="Tweeter Boblo social microblogging preview"
            name="Tweeter (Boblo)"
            type="Social Microblogging Platform"
            year="2026"
            tools="TypeScript • Next.js • Prisma • TailwindCSS"
          />
        </div>

        {/* Project 4: PulsePlay (Full Width Closing Showcase) */}
        <div className="col-span-1 md:col-span-12 pt-0 md:pt-16">
          <Projects
            link="https://github.com/DanialZaree/pulsePlay"
            img={pulseplay}
            alt="PulsePlay audio streaming desktop player"
            name="PulsePlay Music Player"
            type="Audio Streaming & Desktop App"
            year="2026"
            tools="TypeScript • React • Tauri • Audio API"
          />
        </div>
      </div>
    </section>
  );
}
