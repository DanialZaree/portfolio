import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function NavBar({ sectionRefs }) {
  const navBar = useRef(null);
  const logo = useRef(null);
  const cta = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis();
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Initial entrance animation & triggers within gsap context
    const ctx = gsap.context(() => {
      gsap.to(navBar.current, {
        y: 0,
        duration: 3,
        delay: 0.5,
        ease: "power4.inOut",
      });

      // Section theme change animations
      if (sectionRefs && sectionRefs.length) {
        sectionRefs.forEach((section) => {
          if (!section) return;
          ScrollTrigger.create({
            trigger: section,
            start: "top 375px",
            end: "bottom 300px",
            animation: gsap
              .timeline()
              .to(navBar.current, { color: "#DDDDD5" })
              .to(cta.current, { backgroundColor: "#D1D1C7", color: "#0E0E0C" }, 0)
              .to(".bg-secondary-100", { backgroundColor: "#0E0E0C" }, 0),
            toggleActions: "restart reverse restart reverse",
          });
        });
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ctx.revert();
    };
  }, [sectionRefs]);

  return (
    <header
      ref={navBar}
      className="fixed top-0 z-50 flex w-full -translate-y-full items-center justify-between bg-secondary-100 px-5 py-3"
    >
      {/* logo */}
      <a href="#hero" aria-label="Danial Zaree" className="z-50 select-none group flex items-center space-x-2.5">
        <svg
          ref={logo}
          width="26"
          height="26"
          viewBox="0 0 200 200"
          fill="currentColor"
          className="transition-transform duration-300 ease-in-out group-hover:rotate-45"
        >
          <path
            d="M200 50V4.37114e-06L100 0V49.9803C99.9893 22.3751 77.6077 4.37114e-06 50 4.37114e-06H2.18557e-06V100H50C22.3858 100 -1.20706e-06 122.386 0 150L2.18557e-06 200H100V150C100 177.614 122.386 200 150 200H200V100H150.02C177.625 99.9893 200 77.6077 200 50Z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        <span
          className="text-xl md:text-2xl font-black tracking-tighter font-grotesk"
        >
          Danial<span className="text-secondary-600">.</span>Z
        </span>
      </a>
      <nav className="space-x-7 font-grotesk text-body-3 sm:block">
        <a href="#about" className="group relative hidden md:inline-block">
          <span>about</span>
          <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
        </a>
        <a href="#services" className="group relative hidden md:inline-block">
          <span>services</span>
          <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
        </a>
        <a href="#works" className="group relative hidden md:inline-block">
          <span>projects</span>
          <span className="absolute bottom-0 left-0 h-[0.125em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
        </a>
        <a
          ref={cta}
          className="button group relative hover:bg-transparent"
          href="#contact"
        >
          <span className="relative w-fit">
            <span className="absolute bottom-2 h-[0.15em] w-0 bg-secondary-700 opacity-90 duration-300 ease-out group-hover:w-full"></span>
            <span>Let&apos;s Talk.</span>
          </span>
        </a>
      </nav>
    </header>
  );
}
