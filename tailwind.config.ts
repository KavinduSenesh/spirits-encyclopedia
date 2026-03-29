import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'rgb(var(--color-bg-primary) / <alpha-value>)',
        'bg-card': 'rgb(var(--color-bg-card) / <alpha-value>)',
        'bg-elevated': 'rgb(var(--color-bg-elevated) / <alpha-value>)',
        'border-default': 'rgb(var(--color-border-default) / <alpha-value>)',
        'border-amber': 'var(--color-border-amber)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        'text-faint': 'rgb(var(--color-text-faint) / <alpha-value>)',
        'amber': 'rgb(var(--color-amber) / <alpha-value>)',
        'amber-dark': 'rgb(var(--color-amber-dark) / <alpha-value>)',
        'amber-glow': 'var(--color-amber-glow)',
      },
    },
  },
  plugins: [],
};
export default config;
