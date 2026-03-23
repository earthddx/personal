import { useState, useEffect } from "react";
import "./App.css";
import pinnedRepos from "./data/pinnedRepos.json";
import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";

const engineer = {
  name: "Artem Murzo",
  title: "Software Engineer",
  location: "Reston, VA",
  available: true,
  resumeUrl: "https://earthddx.github.io/personal/resume.pdf",
  summary:
    "5+ years in the JS/TS ecosystem. I build full-stack products from database schemas and API design to polished UIs. Lately focused on AI-powered apps and cross-platform mobile.",
  stack: [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "React Native",
    "Next.js",
  ],
  links: [
    { name: "GitHub", url: "https://github.com/earthddx", icon: FaGithub },
    { name: "LinkedIn", url: "https://linkedin.com/in/artemmurzo", icon: FaLinkedin },
    { name: "Twitter", url: "https://x.com/ArtemMurzo", icon: FaXTwitter },
    { name: "Email", url: "mailto:murzotom@rocketmail.com", icon: FaEnvelope },
  ],
};

const experience = [
  {
    role: "Software Engineer",
    company: "Pantheon Inc.",
    location: "Reston, VA",
    period: "Sep 2020 – Present",
    bullets: [
      "Drove core feature architecture for Odyssey Studio, leading the transition from a legacy system to a scalable no-code platform adopted by 30+ client organizations.",
      "Owned frontend architecture and implemented lazy loading, code splitting, and rendering optimizations — contributing to a 25% reduction in page load times.",
      "Co-led frontend modernization: refactored large monolithic modules into a feature-focused structure with reusable components and isolated business logic.",
      "Architected a hybrid mobile app with React Native and WebView, supporting offline PWA functionality and secure QR-based auth on iOS and Android.",
      "Built the frontend foundation for an AI-assisted code generation tool for dynamic, conversational creation of configurable UI components.",
    ],
  },
  {
    role: "Computer Engineer",
    company: "Computer Information Center",
    location: "Baikonur Cosmodrome, Kazakhstan",
    period: "Sep 2013 – Nov 2014",
    bullets: [
      "Developed and optimized 5+ math-intensive applications for real-time rocket telemetry calculations using Delphi and C++.",
      "Enhanced telemetry software with advanced algorithms for trajectory analysis and flight data processing.",
      "Collaborated with senior engineers to document technical processes and create troubleshooting guides.",
    ],
  },
];

const stack = [
  { category: "Languages",           color: "#8b5cf6", items: ["TypeScript", "JavaScript", "HTML5", "CSS3", "SCSS"] },
  { category: "Frontend",            color: "#2563eb", items: ["React", "Next.js", "Tailwind CSS", "NativeWind", "Material UI"] },
  { category: "Mobile",              color: "#06b6d4", items: ["React Native", "Expo", "PWA", "WebView"] },
  { category: "State",               color: "#f59e0b", items: ["Zustand", "Recoil", "Jotai", "Context API", "TanStack Query"] },
  { category: "Backend & Data",      color: "#10b981", items: ["Node.js", "Express.js", "GraphQL", "MongoDB", "PostgreSQL", "Firebase", "Appwrite"] },
  { category: "Visualization & Maps",color: "#ec4899", items: ["D3.js", "Recharts", "Chart.js", "Google Maps", "Leaflet"] },
  { category: "Tooling",             color: "#6b7280", items: ["Git", "Vercel", "Vite", "Webpack", "Jest", "Storybook", "CI/CD", "Zod", "React Hook Form"] },
  { category: "AI",                  color: "#6366f1", items: ["Vercel AI SDK", "RAG", "pgvector"] },
];

const pipeline = [
  {
    title: "GenAI Fundamentals",
    provider: "Kaggle",
    status: "Coming up",
    link: "https://www.kaggle.com/learn-guide/5-day-genai",
  },
];

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [activeSection, setActiveSection] = useState("projects");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const sections = ["projects", "experience", "stack"];
    let cooldown = false;
    const handleWheel = (e) => {
      if (window.innerWidth <= 640) return;
      if (cooldown) return;
      cooldown = true;
      setTimeout(() => { cooldown = false; }, 700);
      setActiveSection((prev) => {
        const idx = sections.indexOf(prev);
        if (e.deltaY > 0 && idx < sections.length - 1) return sections[idx + 1];
        if (e.deltaY < 0 && idx > 0) return sections[idx - 1];
        return prev;
      });
    };
    const handleResize = () => {
      if (window.innerWidth <= 640) setActiveSection("projects");

    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="container">
      <div className="card">
        <div className="card-topbar">
          <div className="badge-group">
            {engineer.available && (
              <div className="badge avail">Open to work</div>
            )}
            <div className="badge">{engineer.location}</div>
          </div>
          <div className="header-actions">
            <a
              href={engineer.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="resume-tag"
            >
              View Resume 📄
            </a>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        <aside className="sidebar">
          <h1>{engineer.name}</h1>
          <p className="title">{engineer.title}</p>
          <section className="about">
            <p>{engineer.summary}</p>
          </section>
          <div className="skills-pill-container">
            {engineer.stack.map((skill) => (
              <span key={skill} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
          <nav className="link-list">
            {engineer.links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <link.icon size={16} />
                {link.name}
                <span className="arrow">↗</span>
              </a>
            ))}
          </nav>
        </aside>

        <main className="main-content">
          {activeSection === "projects" && (
            <div className="section-view">
              <div className="now-playing">
                <span className="dot"></span>
                <p>
                  <strong>Currently:</strong> Building <code>next-rag</code> with
                  Next.js 16 & AI SDK
                </p>
              </div>

              <div className="work-highlight">
                <div className="section-label">Pinned Projects</div>
                <div className="project-grid">
                  {pinnedRepos.map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="project-box featured"
                    >
                      <div className="project-header">
                        <strong>{repo.name}</strong>
                        {repo.stargazerCount > 0 && (
                          <span className="star-count">★ {repo.stargazerCount}</span>
                        )}
                      </div>
                      {repo.description && <p>{repo.description}</p>}
                      {repo.repositoryTopics.nodes.length > 0 && (
                        <div className="topic-list">
                          {repo.repositoryTopics.nodes.map(({ topic }) => (
                            <span key={topic.name} className="topic-tag">
                              {topic.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pipeline-section">
                {pipeline[0]?.status && (
                  <div className="section-label">{pipeline[0].status}</div>
                )}
                {pipeline.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="pipeline-card"
                  >
                    <div className="pipeline-info">
                      <span className="pipeline-title">{item.title}</span>
                      <span className="pipeline-meta">{item.provider}</span>
                    </div>
                    <span className="status-tag">Plan</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {activeSection === "experience" && (
            <div className="section-view">
              <div className="section-label">Experience</div>
              {experience.map((job, i) => (
                <div key={i} className="experience-card">
                  <div className="experience-header">
                    <strong>{job.role}</strong>
                    <span className="experience-period">{job.period}</span>
                  </div>
                  <span className="experience-company">{job.company} · {job.location}</span>
                  <ul className="experience-bullets">
                    {job.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {activeSection === "stack" && (
            <div className="section-view">
              <div className="section-label">Stack</div>
              <div className="stack-groups">
                {stack.map(({ category, color, items }) => (
                  <div key={category} className="stack-group" style={{ "--category-color": color }}>
                    <span className="stack-category">{category}</span>
                    <div className="stack-pills">
                      {items.map((item) => (
                        <span key={item} className="skill-pill">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <nav className="timeline-nav">
        <div className="timeline-line">
          {[
            { id: "projects", label: "Projects" },
            { id: "experience", label: "Experience" },
            { id: "stack", label: "Stack" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`timeline-dot${activeSection === id ? " active" : ""}`}
              aria-label={label}
            >
              <span className="timeline-dot-label">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default App;
