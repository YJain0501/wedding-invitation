/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        royal: {
          burgundy: '#35080F',
          burgundyDark: '#24050A',
          wine: '#4A1018',
          gold: '#C69A52',
          goldLight: '#F4D99A',
          cream: '#FFF0D5',
          ivory: '#FFF3E5',
          text: '#2A1110',
        },
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        royal: '0 20px 40px rgba(36, 5, 10, 0.35)',
        gold: '0 0 30px rgba(198, 154, 82, 0.45)',
      },
      backgroundImage: {
        'royal-gradient':
          'radial-gradient(circle at 20% 20%, rgba(198, 154, 82, 0.14), transparent 42%), radial-gradient(circle at 80% 0%, rgba(198, 154, 82, 0.2), transparent 36%), linear-gradient(145deg, #24050A 0%, #35080F 45%, #4A1018 100%)',
      },
      letterSpacing: {
        invitation: '0.18em',
      },
      borderRadius: {
        royal: '1.75rem',
      },
    },
  },
  plugins: [],
}
