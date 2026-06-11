import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sky-blue': '#87CEEB',
        'soft-yellow': '#FFE5B4',
        'mint-green': '#98FF98',
        'peach': '#FFB5A7',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'fredoka': ['Fredoka', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
      },
      borderRadius: {
        'xl': '20px',
        '2xl': '24px',
      },
      boxShadow: {
        'soft': '0 4px 15px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 8px 25px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
export default config
