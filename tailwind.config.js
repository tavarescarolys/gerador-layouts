/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        deep: '#004f8f',
        cyan: '#0da1cc',
        ink: '#0a2740',
      },
      fontFamily: {
        display: ['"Agrandir Tight"', '"Arial Narrow"', 'sans-serif'],
        grand: ['"Agrandir Grand"', 'Agrandir', 'sans-serif'],
        body: ['Agrandir', 'system-ui', 'sans-serif'],
        label: ['"Agrandir Wide"', 'Agrandir', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
