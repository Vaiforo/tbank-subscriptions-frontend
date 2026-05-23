/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bankYellow: '#FFD429',
        bankYellowDark: '#F2BD00',
        ink: '#202124',
        mutedInk: '#858B98',
        soft: '#F4F5F7'
      },
      boxShadow: {
        soft: '0 18px 55px rgba(25, 27, 31, 0.10)',
        card: '0 12px 32px rgba(25, 27, 31, 0.08)'
      }
    }
  },
  plugins: []
}
