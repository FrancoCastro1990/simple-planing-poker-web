/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-bg': '#fdfdfd',
        'light-text': '#1c1c1c',
        'light-green': '#427b58',
        'light-blue': '#076678',
        'light-yellow': '#b57614',
        'light-red': '#9d0006',
        'light-magenta': '#8f3f71',
        'dark-bg': '#0d0d0d',
        'dark-text': '#eaeaea',
        'dark-green': '#8ec07c',
        'dark-blue': '#83a598',
        'dark-yellow': '#fabd2f',
        'dark-red': '#fb4934',
        'dark-magenta': '#d3869b',
      },
      fontFamily: {
        mono: ['Fira Code','JetBrains Mono','Monaco','Consolas','monospace'],
        sans: ['Inter','system-ui','sans-serif']
      },
      animation: { 'fade-in': 'fadeIn 0.6s ease-out forwards', 'slide-up': 'slideUp 0.6s ease-out forwards', 'cursor-blink': 'cursorBlink 1s infinite', 'float': 'float 3s ease-in-out infinite' },
      keyframes: {
        fadeIn: {'0%': {opacity:'0'}, '100%': {opacity:'1'}},
        slideUp: {'0%': {opacity:'0', transform:'translateY(20px)'}, '100%': {opacity:'1', transform:'translateY(0)'}},
        cursorBlink: {'0%,50%': {opacity:'1'}, '51%,100%': {opacity:'0'}},
        float: {'0%,100%': {transform:'translateY(0px)'}, '50%': {transform:'translateY(-10px)'}}
      }
    }
  },
  plugins: [],
};