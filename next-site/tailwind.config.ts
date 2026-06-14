import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Swiss-minimal redesign tokens (mirror app/redesign.css :root)
        paper: '#FAFCFC',
        ink: '#12181C',
        'ink-soft': '#313B3F',
        muted: '#656F72',
        faint: '#9CA6A9',
        faintest: '#C2CBCD',
        line: '#E2E8E8',
        'line-strong': '#CDD6D6',
        surface: '#F0F4F4',
        'surface-2': '#E9EEEE',
        accent: '#FF5A4D',
        // kept aliases for any incidental references
        coral: '#FF5A4D',
        text: '#313B3F',
        'text-muted': '#656F72',
        heading: '#12181C',
        primary: '#FF5A4D',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [typography],
};

export default config;
