import "./App.css";

const engineer = {
  name: "Artem Murzo",
  title: "Full-Stack Software Engineer",
  location: "Reston, VA",
  resumeUrl: "/resume.pdf",
  summary:
    "5+ years specializing in React, JS/TS,  and Node.js. Expert in frontend architecture and building secure, API-driven SaaS platforms.",
  stack: ["React", "JavaScript", "TypeScript", "Node.js", "React Native", "Next.js"],
  links: [
    { name: "GitHub", url: "https://github.com/earthddx", icon: "💻" },
    { name: "LinkedIn", url: "https://linkedin.com/in/artemmurzo", icon: "💼" },
    { name: "Twitter", url: "https://x.com/ArtemMurzo", icon: "🐦" },
    { name: "Email", url: "mailto:murzotom@rocketmail.com", icon: "✉️" },
  ],
};

function App() {
  return (
    <div className="container">
      <div className="card">
        <header>
          <div className="header-meta">
            <div className="badge">Reston, VA</div>
            <a href={engineer.resumeUrl} target="_blank" className="resume-tag">
              View Resume 📄
            </a>
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
              <span className="tech-tag">New</span>
            </div>
            <p>
              RAG chat application utilizing semantic document retrieval and
              vector embeddings.
            </p>
          </a>
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
