import { useEffect, useRef } from "react";
import profileImg from "/src/assets/images/danial-profile.jpg";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import Heading from "../ui/Heading";

export default function About() {
  const profile = useRef(null);
  const aboutSection = useRef(null);
  const heading = useRef(null);
  const body = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: aboutSection.current,
        start: "top 400px",
        animation: gsap
          .timeline()
          .to(heading.current, { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 }, 0)
          .to(body.current, { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 }, 0.2),
        toggleActions: "play none none none",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={aboutSection} aria-label="about me">
      <Heading title="about me" />
      <div className="mt-10 flex flex-col items-start gap-8 md:flex-row lg:gap-10">
        <div className="top-28 overflow-hidden rounded-md md:sticky md:w-1/2">
          <img
            ref={profile}
            loading="lazy"
            className="aspect-square h-auto w-full rounded-md object-cover object-center md:aspect-auto"
            src={profileImg}
            width="600"
            height="800"
            alt="Portrait of Danial Zaree, Front-End Developer"
          />
        </div>
        <div className="top-20 sm:sticky md:top-28 lg:top-32 md:w-1/2">
          <div className="w-full space-y-4 2xl:space-y-10">
            <h3
              ref={heading}
              className="translate-y-10 text-heading-3 2xl:text-7xl font-semibold leading-tight opacity-0"
            >
              A brief intro, who am I?
            </h3>
            <p ref={body} className="translate-y-10 text-body-1 2xl:text-4xl opacity-0">
              I am a front-end developer based in Hamedan, Iran, with four years of professional experience building web applications.
              <br></br>
              <br></br>
              I specialize in building robust, scalable, and user-friendly web applications. Driven by a commitment to clean code and effective problem-solving, I excel at translating complex ideas into elegant digital solutions.
              <br></br>
              <br></br>
              My focus is always on crafting efficient applications that deliver an exceptional user experience. Explore my open-source projects on{" "}
              <a
                className="underline duration-300 ease-in-out hover:text-secondary-700"
                href="https://github.com/DanialZaree"
                target="_blank"
                rel="noreferrer"
              >
                GitHub 💻
              </a>{" "}
              or connect with me on{" "}
              <a
                className="underline duration-300 ease-in-out hover:text-secondary-700"
                href="https://t.me/Danialzaree0"
                target="_blank"
                rel="noreferrer"
              >
                Telegram ✈️
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
