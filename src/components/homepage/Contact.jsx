import { Icon } from "@iconify/react";
import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import Heading from "../ui/Heading";

// --------------------------------------------------------------------------
// Formspree Integration Setup
// 1. Create a free form at https://formspree.io
// 2. Paste your form ID below (e.g. "xpwzvepq") or set VITE_FORMSPREE_ID in .env
// --------------------------------------------------------------------------
const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_ID || "mgaaeggp";

export default function Contact() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Tehran" })
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'
  const [errorMessage, setErrorMessage] = useState("");

  const heading = useRef(null);
  const body = useRef(null);
  const contactSection = useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: contactSection.current,
      start: "180px bottom",
      animation: gsap
        .timeline()
        .to(heading.current, { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 }, 0)
        .to(body.current, { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 }, 0.2),
      toggleActions: "play none none none",
    });
    ScrollTrigger.refresh();
  }, [contactSection]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Tehran" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const isPlaceholder =
      !FORMSPREE_FORM_ID ||
      FORMSPREE_FORM_ID === "YOUR_FORMSPREE_ID" ||
      FORMSPREE_FORM_ID.trim() === "";

    if (isPlaceholder) {
      setStatus("unconfigured");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio message from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json().catch(() => null);
        const serverError =
          data?.errors?.map((err) => err.message).join(", ") ||
          "Failed to deliver message. Please try again or email directly.";
        setErrorMessage(serverError);
        setStatus("error");
      }
    } catch {
      setErrorMessage(
        "Network connection error. Please check your internet connection or email directly."
      );
      setStatus("error");
    }
  };

  const mailtoHref = `mailto:danialzaree0@gmail.com?subject=${encodeURIComponent(
    `Portfolio inquiry from ${formData.name || "Visitor"}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section
      id="contact"
      className="my-[10%] overflow-hidden"
      aria-label="contact me"
    >
      <Heading title="Contact" />
      <div ref={contactSection} className="mt-10 flex flex-col gap-20 md:grid md:grid-cols-6 md:px-12">
        <div className="col-span-4">
          <h3 ref={heading} className="max-w-lg 2xl:max-w-3xl text-heading-3 2xl:text-7xl font-semibold leading-tight translate-y-10 opacity-0">
            Have an awesome idea? Let&apos;s bring it to life.
          </h3>
          <p ref={body} className="mt-4 max-w-md 2xl:max-w-2xl text-body-2 2xl:text-4xl text-accent-100 translate-y-10 opacity-0">
            I am available for frontend engineering roles, scalable web projects, and exciting collaborations. Let&apos;s build something remarkable together.
          </p>

          {status === "success" ? (
            <div className="mt-10 rounded-2xl border border-secondary-400 bg-secondary-300/40 p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-3 text-secondary-700">
                <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-xl font-semibold text-accent-400">Message Delivered!</h4>
              </div>
              <p className="mt-3 text-body-2 text-accent-200">
                Thank you for getting in touch. Your message has been sent directly to Danial. You will receive a response shortly.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="button mt-6 border duration-200 hover:border-accent-400 hover:bg-transparent"
              >
                <span>Send Another Message</span>
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="mt-10 font-grotesk"
            >
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2">
                <div className="relative z-0">
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 text-accent-400 focus:outline-none focus:ring-0 disabled:opacity-50"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 2xl:text-body-2 text-secondary-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                  >
                    Your name
                  </label>
                </div>
                <div className="relative z-0">
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 text-accent-400 focus:outline-none focus:ring-0 disabled:opacity-50"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 2xl:text-body-2 text-secondary-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                  >
                    Your email
                  </label>
                </div>
                <div className="relative z-0 sm:col-span-2">
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 text-accent-400 focus:outline-none focus:ring-0 disabled:opacity-50"
                    placeholder=" "
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 2xl:text-body-2 text-secondary-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75"
                  >
                    Your message
                  </label>
                </div>
              </div>

              {status === "unconfigured" && (
                <div className="mt-6 rounded-xl border border-amber-600/30 bg-amber-500/10 p-5 text-accent-300">
                  <div className="flex items-start gap-3">
                    <svg className="h-6 w-6 flex-shrink-0 text-amber-700 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="space-y-3">
                      <p className="text-body-3 font-semibold text-accent-400">
                        Formspree Form ID is not configured yet.
                      </p>
                      <p className="text-body-3 text-accent-200">
                        To receive submissions directly to your inbox, create a free form at{" "}
                        <a href="https://formspree.io" target="_blank" rel="noreferrer" className="text-accent-400 underline font-medium">
                          formspree.io
                        </a>{" "}
                        and paste your Form ID in <code className="rounded bg-secondary-300 px-1.5 py-0.5 text-xs text-accent-400 font-mono">src/components/homepage/Contact.jsx</code> or in <code className="rounded bg-secondary-300 px-1.5 py-0.5 text-xs text-accent-400 font-mono">.env</code>.
                      </p>
                      <div className="flex flex-wrap gap-3 pt-1">
                        <a
                          href={mailtoHref}
                          className="inline-flex items-center gap-2 rounded-full bg-accent-400 px-5 py-2 text-sm font-medium text-secondary-100 hover:bg-accent-300 transition-colors"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>Open in Email App Instead</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setStatus("idle")}
                          className="rounded-full border border-secondary-600 px-4 py-2 text-sm text-accent-300 hover:border-accent-400 hover:text-accent-400 transition-colors"
                        >
                          Edit Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-accent-300">
                  <div className="flex items-start gap-2.5">
                    <svg className="h-5 w-5 flex-shrink-0 text-red-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="space-y-2">
                      <p className="text-body-3 text-red-800 font-medium">{errorMessage}</p>
                      <a
                        href={mailtoHref}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 underline underline-offset-4 hover:text-accent-200"
                      >
                        Click here to send directly via danialzaree0@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="button group mt-10 border duration-200 hover:border-accent-400 hover:bg-transparent disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="relative flex items-center justify-center gap-2">
                  {status === "submitting" ? (
                    <>
                      <svg className="h-4 w-4 animate-spin text-secondary-200" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span className="absolute bottom-2 h-1 w-0 bg-secondary-700 opacity-90 duration-300 ease-out group-hover:w-full"></span>
                      <span className="group-hover:text-accent-400">
                        Send Message
                      </span>
                    </>
                  )}
                </span>
              </button>
            </form>
          )}
        </div>
        <div className="col-span-2 grid grid-cols-1 gap-x-4 gap-y-8 text-accent-300 sm:grid-cols-2 sm:gap-y-0 md:grid-cols-1">
          <div className="space-y-3 ">
            <h4 className="text-body-1 2xl:text-4xl font-semibold">Contact Details</h4>
            <div className="flex flex-col space-y-3 text-body-2 2xl:text-3xl">
              <a
                href="mailto:danialzaree0@gmail.com"
                className="group relative w-fit cursor-pointer"
                target="_blank"
                rel="noreferrer"
              >
                <span>danialzaree0@gmail.com</span>
                <span className="absolute bottom-0 left-0 h-[0.12em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
              </a>
            </div>
          </div>
          <div className="space-y-3 ">
            <h4 className="text-body-1 2xl:text-4xl font-semibold">My Digital Spaces</h4>
            <div className="space-y-3 text-body-2 2xl:text-3xl">
              <a
                href="https://github.com/DanialZaree"
                className="group flex items-center space-x-2"
                target="_blank"
                rel="noreferrer"
              >
                <Icon icon="mdi:github" color="#666" />
                <div className="relative">
                  <span>GitHub</span>
                  <span className="absolute bottom-0 left-0 h-[0.10em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/DanialZaree"
                className="group flex items-center space-x-2"
                target="_blank"
                rel="noreferrer"
              >
                <Icon icon="mdi:linkedin" color="#666" />
                <div className="relative">
                  <span>LinkedIn</span>
                  <span className="absolute bottom-0 left-0 h-[0.12em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
                </div>
              </a>
              <a
                href="https://t.me/Danialzaree0"
                className="group flex items-center space-x-2"
                target="_blank"
                rel="noreferrer"
              >
                <Icon icon="ic:baseline-telegram" color="#666" />
                <div className="relative">
                  <span>Telegram</span>
                  <span className="absolute bottom-0 left-0 h-[0.10em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
                </div>
              </a>
              <a
                href="https://www.instagram.com/danialzaree_/"
                className="group flex items-center space-x-2"
                target="_blank"
                rel="noreferrer"
              >
                <Icon icon="mdi:instagram" color="#666" />
                <div className="relative">
                  <span>Instagram</span>
                  <span className="absolute bottom-0 left-0 h-[0.10em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
                </div>
              </a>
            </div>
          </div>
          <div className="space-y-3 ">
            <h4 className="text-body-1 font-semibold 2xl:text-4xl">Location</h4>
            <div className="space-y-2 text-body-2 2xl:text-3xl">
              <p>
                Hamedan, Iran <br></br>
                {time}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
