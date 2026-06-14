export default function Footer() {
  return (
    <footer className="foot">
      <span className="copy">© {new Date().getFullYear()} — Archy de Berker</span>
      <div className="foot-links">
        <a href="https://github.com/archydeberker" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/archy-de-berker/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="/rss.xml">RSS</a>
      </div>
    </footer>
  );
}
