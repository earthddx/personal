import { useState, useEffect } from "react";
import "./App.css";

const engineer = {
  name: "Artem Murzo",
  title: "Software Engineer",
  location: "Reston, VA",
  available: true,
  resumeUrl: "https://earthddx.github.io/personal/resume.pdf",
  summary:
    "5+ years in React, React Native, TypeScript, and Next.js. I build frontend systems — from architecture to auth to AI integrations.",
  stack: [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "React Native",
    "Next.js",
  ],
  links: [
    { name: "GitHub", url: "https://github.com/earthddx", icon: "💻" },
    { name: "LinkedIn", url: "https://linkedin.com/in/artemmurzo", icon: "💼" },
    { name: "Twitter", url: "https://x.com/ArtemMurzo", icon: "🐦" },
    { name: "Email", url: "mailto:murzotom@rocketmail.com", icon: "✉️" },
  ],
};

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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="container">
      <div className="card">
        <header>
          <div className="header-meta">
            <div className="badge-group">
              <div className="badge">{engineer.location}</div>
              {engineer.available && (
                <div className="badge avail">Open to work</div>
              )}
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
          <h1>{engineer.name}</h1>
          <p className="title">{engineer.title}</p>
        </header>

        <section className="about">
          <p>{engineer.summary}</p>
        </section>

        <div className="now-playing">
          <span className="dot"></span>
          <p>
            <strong>Currently:</strong> Building <code>next-rag</code> with
            Next.js 16 & AI SDK
          </p>
        </div>

        <div className="work-highlight">
          <div className="section-label">Featured Project</div>
          <a
            href="https://github.com/earthddx/next-rag"
            target="_blank"
            rel="noreferrer"
            className="project-box featured"
          >
            <div className="project-header">
              <strong>next-rag</strong>
              <div className="tag-group">
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag secondary-tag">AI SDK</span>
              </div>
            </div>
            <p>
              RAG chat application utilizing semantic document retrieval and
              vector embeddings.
            </p>
          </a>
        </div>

        <div className="work-highlight">
          <div className="section-label">Native Mobile Project</div>
          <a
            href="https://github.com/earthddx/instaclone"
            target="_blank"
            rel="noreferrer"
            className="project-box featured"
          >
            <div className="project-header">
              <strong>instaclone</strong>
              <div className="tag-group">
                <span className="tech-tag">React Native</span>
                <span className="tech-tag secondary-tag">Expo</span>
              </div>
            </div>
            <p>
              Cross-platform social application built with React Native and
              Expo. Features native image picking, secure authentication, and a
              highly responsive mobile-first UI.
            </p>
          </a>
        </div>

        <div className="pipeline-section">
          <div className="section-label">{pipeline[0].status}</div>
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
              <span>{link.icon}</span>
              {link.name}
              <span className="arrow">↗</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default App;
