import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0d1117',
        'bg-card': '#161b22',
        'bg-elevated': '#1c2128',
        'border-default': '#30363d',
        'border-amber': 'rgba(200,149,108,0.15)',
        'text-primary': '#f0f6fc',
        'text-secondary': '#c9d1d9',
        'text-muted': '#8b949e',
        'text-faint': '#484f58',
        'amber': '#c8956c',
        'amber-dark': '#a07040',
        'amber-glow': 'rgba(200,149,108,0.08)',
      },
    },
  },
  plugins: [],
};
export default config;
