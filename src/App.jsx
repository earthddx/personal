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
                      <span className="star-count">
                        ★ {repo.stargazerCount}
                      </span>
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

        </main>
      </div>
    </div>
  );
}

export default App;
