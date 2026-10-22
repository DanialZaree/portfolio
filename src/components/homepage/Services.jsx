import ServiceUi from "../ui/ServiceUi";
import Heading from "../ui/Heading";

export default function Services() {
  const expertiseItems = [
    "Frontend Development",
    "Web Applications",
    "UI/UX Architecture",
    "Responsive Design",
    "State Management",
    "Performance Optimization",
  ];

  const toolBoxItems = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "TailwindCSS",
    "Zustand",
    "HTML5 / CSS3",
    "GSAP",
    "REST APIs & WebSockets",
  ];

  return (
    <section id="services" className="my-[10%]" aria-label="services">
      <Heading title="services" />
      <div className="space-y-14">
        <ServiceUi
          title="my expertises."
          description="I specialize in building robust, performant web applications and intuitive interfaces. With each project, my goal is to deliver clean code, solid engineering, and an elevated digital experience."
          items={expertiseItems}
        />
        <ServiceUi
          title="my digital tool box."
          description="These are my go-to technologies and frameworks to bring ambitious ideas to reality. I continuously explore modern tools, architecture patterns, and best practices to expand my engineering craft."
          items={toolBoxItems}
        />
      </div>
    </section>
  );
}
