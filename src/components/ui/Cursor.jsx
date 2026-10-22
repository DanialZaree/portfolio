import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const curs = useRef(null);
  const svg = useRef(null);

  useEffect(() => {
    const el = curs.current;
    const svgEl = svg.current;
    if (!el || !svgEl) return;

    // Use quickTo for GPU-accelerated smooth cursor tracking without React re-renders
    const xTo = gsap.quickTo(el, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.1, ease: "power3" });

    const tl = gsap.timeline({ paused: true });
    tl.to(el, { height: "112px", width: "112px", ease: "expo.inout" })
      .to(svgEl, { opacity: 1, width: "96px", height: "96px" }, 0);

    const images = document.querySelectorAll(".img");
    const onEnter = () => tl.play();
    const onLeave = () => {
      tl.reverse();
      tl.eventCallback("onReverseComplete", () => {
        gsap.set(svgEl, { opacity: 0 });
        gsap.set(el, { height: "12px", width: "12px" });
      });
    };

    images.forEach((img) => {
      img.addEventListener("mouseenter", onEnter);
      img.addEventListener("mouseleave", onLeave);
    });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      images.forEach((img) => {
        img.removeEventListener("mouseenter", onEnter);
        img.removeEventListener("mouseleave", onLeave);
      });
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={curs}
      className="cursor pointer-events-none fixed left-0 top-0 z-[999] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-secondary-600 sm:flex"
    >
      <svg
        ref={svg}
        xmlns="http://www.w3.org/2000/svg"
        className="scale-50 opacity-0"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M6 19L19 6m0 0v12.48M19 6H6.52"
        />
      </svg>
    </div>
  );
}
