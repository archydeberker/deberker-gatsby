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
      animation: {
        'shell-gradient': 'shell-gradient 24s ease-in-out infinite',
      },
      backgroundImage: {
        'shell-gradient':
          'linear-gradient(305deg, hsl(8 100% 64%) 0%, hsl(28 98% 61%) 20%, hsl(29 63% 68%) 44%, hsl(220 69% 67%) 69%, hsl(203 100% 43%) 87%, hsl(192 100% 30%) 100%)',
      },
      colors: {
        primary: '#007a99',
        coral: '#ff6147',
        text: '#2e353f',
        'text-muted': '#4f5969',
        heading: '#1a202c',
        accent: '#d1dce5',
      },
      fontFamily: {
        sans: ['var(--font-source-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-domine)', 'ui-serif', 'Georgia', 'serif'],
      },
      keyframes: {
        'shell-gradient': {
          '0%': {
            backgroundPosition: '12% 38%',
            transform: 'translate3d(-4%, -3%, 0) scale(1.08) rotate(0deg)',
          },
          '25%': {
            backgroundPosition: '76% 18%',
            transform: 'translate3d(3%, -4%, 0) scale(1.14) rotate(3deg)',
          },
          '50%': {
            backgroundPosition: '92% 84%',
            transform: 'translate3d(5%, 2%, 0) scale(1.12) rotate(0deg)',
          },
          '75%': {
            backgroundPosition: '24% 96%',
            transform: 'translate3d(-3%, 4%, 0) scale(1.15) rotate(-3deg)',
          },
          '100%': {
            backgroundPosition: '12% 38%',
            transform: 'translate3d(-4%, -3%, 0) scale(1.08) rotate(0deg)',
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
