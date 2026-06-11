import type { Config } from 'tailwindcss'

const colors = {
  background: 'oklch(1 0 0)',
  foreground: 'oklch(0.148 0.004 228.8)',
  card: 'oklch(1 0 0)',
  'card-foreground': 'oklch(0.148 0.004 228.8)',
  popover: 'oklch(1 0 0)',
  'popover-foreground': 'oklch(0.148 0.004 228.8)',
  primary: 'oklch(0.52 0.105 223.128)',
  'primary-foreground': 'oklch(0.984 0.019 200.873)',
  secondary: 'oklch(0.967 0.001 286.375)',
  'secondary-foreground': 'oklch(0.21 0.006 285.885)',
  muted: 'oklch(0.963 0.002 197.1)',
  'muted-foreground': 'oklch(0.56 0.021 213.5)',
  accent: 'oklch(0.963 0.002 197.1)',
  'accent-foreground': 'oklch(0.218 0.008 223.9)',
  destructive: 'oklch(0.577 0.245 27.325)',
  border: 'oklch(0.925 0.005 214.3)',
  input: 'oklch(0.925 0.005 214.3)',
  ring: 'oklch(0.723 0.014 214.4)',
  'chart-1': 'oklch(0.872 0.007 219.6)',
  'chart-2': 'oklch(0.56 0.021 213.5)',
  'chart-3': 'oklch(0.45 0.017 213.2)',
  'chart-4': 'oklch(0.378 0.015 216)',
  'chart-5': 'oklch(0.275 0.011 216.9)',
  sidebar: 'oklch(0.987 0.002 197.1)',
  'sidebar-foreground': 'oklch(0.148 0.004 228.8)',
  'sidebar-primary': 'oklch(0.609 0.126 221.723)',
  'sidebar-primary-foreground': 'oklch(0.984 0.019 200.873)',
  'sidebar-accent': 'oklch(0.963 0.002 197.1)',
  'sidebar-accent-foreground': 'oklch(0.218 0.008 223.9)',
  'sidebar-border': 'oklch(0.925 0.005 214.3)',
  'sidebar-ring': 'oklch(0.723 0.014 214.4)',
}

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config
