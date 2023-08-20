/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'blanka': ['Blanka']
    },
    extend: {
      keyframes: {
        'progress': {
          '0%': {
            'max-width': '0%'
          },
          '100%': {
            'max-width': '100%'
          }
        }
      },
      animation: {
        'progress': 'progress 1.5s ease-out'
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  darkMode: 'media'
}
