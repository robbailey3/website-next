module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Nunito Sans', 'sans-serif'],
      mono: ['Roboto Mono', 'monospace'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
