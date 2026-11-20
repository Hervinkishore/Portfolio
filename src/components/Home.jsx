import ParticleScene from "./ParticleScene";
import "./Home.css";

const projects = [
  {
    title: "Michael London",
    year: "2026",
    tagline: "Beautify the world, one interior at a time",
    stack: ["WordPress (custom theme)", "ACF", "SCSS", "GSAP", "Lenis", "Barba.js", "Glide.js"],
    href: "https://michaellondon.com/",
  },
  {
    title: "Fratelli Simonetti",
    year: "2025",
    tagline: "Furniture, bath and wellness - under one roof",
    stack: ["WordPress (custom theme)", "SCSS", "GSAP", "Lenis", "Barba.js", "Rellax", "Glide.js", "Isotope"],
    href: "https://www.fratellisimonetti.com/",
  },
  {
    title: "Stephen Young",
    year: "2024",
    tagline: "Bespoke interiors, built for the way you live",
    stack: ["WordPress (custom theme)", "SCSS", "GSAP", "Lenis", "Barba.js", "Parallax scrolling", "Custom player"],
    href: "https://stephenyoungdesign.com/",
  },
  {
    title: "Lea Winery",
    year: "2025",
    tagline: "132 hectares, one philosophy: patience",
    stack: ["WordPress (custom theme)", "SCSS", "GSAP", "Lenis", "Barba.js", "Rellax", "Glide.js", "Google Maps API"],
    href: "https://leawinery.com/",
  },
];

export default function Home() {
  return (
    <>
      {/* Ambient background noise layer */}
      <div aria-hidden="true" className="noise-layer" />

      {/* Fixed Full-Screen 3D Particle Scene */}
      <ParticleScene formationDuration={4.0} cameraDistance={3.0} />

      {/* Main Content Layout matching Daniel Ingrassia */}
      <main className="content">
        {/* 1. HERO */}
        <section className="hero">
          <div className="hero-copy">
            <h1 className="label t-30 blur-anim" data-delay="1.6">
              Hervin Kishore
            </h1>
            <p className="label t-30 blur-anim" data-delay="2">
              Creative Frontend Developer
            </p>
          </div>
        </section>

        {/* 2. STATEMENT */}
        <section className="statement">
          <div className="statement-copy">
            <p className="label t-30">
              I turn ambitious designs into fast, interactive web experiences.
              Frontend, motion, performance - as a technical partner for agencies,
              designers and creative teams.
            </p>
          </div>
        </section>

        {/* 3. WORLD / GLOBE RING */}
        <section className="world">
          <svg className="world-ring" viewBox="0 0 200 200" aria-hidden="true">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="4 8"
            />
          </svg>
        </section>

        {/* 4. LOCATION */}
        <section className="italy">
          <p className="label t-30 italy-label">Based in India</p>
        </section>

        {/* 5. HOW I WORK */}
        <section className="how-i-work">
          <div className="how-i-work-content">
            <p className="label t-30 how-i-work-line">
              I don’t just execute what’s handed to me - I bring my own creative instinct
              into the mix, pushing interactions, animation and visual ideas wherever
              they’d genuinely elevate the work.
            </p>
          </div>
        </section>

        {/* 6. PLAYGROUND / SELECTED WORKS */}
        <section className="playground">
          <div className="playground-kicker">
            <p className="playground-kicker-label t-16">Some Selected Works</p>
          </div>

          <div className="playground-projects-list">
            {projects.map((proj) => (
              <a
                key={proj.title}
                href={proj.href}
                target="_blank"
                rel="noreferrer"
                className="project-card"
                data-cursor
              >
                <div>
                  <span className="project-year">{proj.year}</span>
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-tagline">{proj.tagline}</p>
                </div>
                <div className="project-stack">
                  {proj.stack.map((item) => (
                    <span key={item} className="project-stack-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <div className="playground-closing-wrap">
            <p className="playground-closing-line t-30">
              And still working on plenty more.
            </p>
          </div>
        </section>

        {/* 7. CONTACTS */}
        <div className="contacts-wrap">
          <section className="contacts">
            <div className="contacts-copy">
              <p className="label t-16 muted blur-anim contacts-kicker">
                Get in touch
              </p>

              <a
                href="mailto:hello@hervinkishore.dev"
                className="contacts-email-shell"
                data-cursor
              >
                <span className="contacts-email t-85">
                  hello@hervinkishore.dev
                </span>
              </a>

              <p className="label t-20 muted">
                or reach out on{" "}
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="linkedin-link"
                  data-cursor
                >
                  LinkedIn
                </a>
              </p>
            </div>
          </section>

          {/* 8. FOOTER */}
          <footer className="footer">
            <div className="monogram-wrap" data-cursor>
              <svg viewBox="0 0 686 850" aria-hidden="true" className="monogram-icon">
                <path
                  fill="currentColor"
                  d="M127.2,267.7c4.5-4.7,9.1-9.2,14-13.5c1.1-1,2.2-2,3.3-2.9c1.5-1.3,3-2.6,4.6-3.8c3.3-2.7,6.8-5.3,10.3-7.9c3.2-2.3,6.4-4.6,9.8-6.7c4.8-3.1,9.7-6.1,14.7-8.8c9.5-5.2,19.4-9.8,29.6-13.8c1.4-0.5,2.8-1.1,4.2-1.6c11.9-4.3,24.1-7.6,36.8-9.9c13.9-2.6,28.3-3.9,43-3.9c130,0,235.4,105.4,235.4,235.4c0,126.7-100,230-225.4,235.2l-12.7,0.2V352.1H183.9v405.4c4.2,1.5,8.4,2.8,12.7,4.1c31.9,9.7,65.8,14.9,100.9,14.9c3.3,0,6.7,0,10-0.1c186.6-5.3,336.3-158.3,336.3-346.2c0-191.3-155.1-346.3-346.3-346.3c-32.8,0-64.6,4.6-94.7,13.1c-12.7,3.6-25,7.9-37.1,12.8c-8.4,3.4-16.6,7.2-24.6,11.3c-9.6,4.9-19,10.2-28.1,15.9c-0.5,0.3-1.1,0.7-1.6,1c-0.7,0.5-1.4,0.9-2.1,1.4c-12,7.8-23.4,16.2-34.3,25.4c-1.6,1.3-3.2,2.7-4.8,4.1L127.2,267.7z"
                />
              </svg>
              <p className="footer-line t-16">
                Hervin Kishore - © 2026
              </p>
            </div>

            <a className="footer-link" href="#privacy" data-cursor>
              <span className="footer-line t-16">
                This website doesn’t use cookies. Wanna know more?
              </span>
            </a>
          </footer>
        </div>
      </main>
    </>
  );
}
