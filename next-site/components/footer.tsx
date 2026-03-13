'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="px-0 pb-0 pt-6 text-center font-sans text-[0.833rem] text-text-muted">
      <div className="mb-2 flex items-center justify-center gap-6 text-[1.25rem]">
        <a href="https://twitter.com/ArchydeB" className="text-black transition-colors hover:text-coral" aria-label="Twitter">
          <FontAwesomeIcon icon={faTwitter} className="h-5 w-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/archy-de-berker/"
          className="text-black transition-colors hover:text-coral"
          aria-label="LinkedIn"
        >
          <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
        </a>
        <a
          href="https://github.com/archydeberker"
          className="text-black transition-colors hover:text-coral"
          aria-label="GitHub"
        >
          <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
        </a>
        <a
          href="/rss.xml"
          className="font-sans text-[0.72rem] font-bold uppercase tracking-[0.18em] text-black transition-colors hover:text-coral"
          aria-label="RSS feed"
        >
          RSS
        </a>
      </div>
      <p className="m-0">
        © {new Date().getFullYear()}, Built with{' '}
        <a href="https://www.gatsbyjs.com" className="text-primary hover:text-coral">
          Gatsby
        </a>{' '}
      </p>
    </footer>
  );
}
