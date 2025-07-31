/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: `fadeIn .25s ease-in`,
        SlideHeight: `SlideHeight .2 ease-in`
      },
      keyframes: () => ({
        fadeIn: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scroll: {
          '0%': { left: '0' },
          '100%': { left: '-100%' },
        },
        SlideHeight: { 
          'from': {
            gridTemplateRows: 0
          },
          'to': {
            gridTemplateRows: 1
          }
        }
      }),
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        fg: '#542b1c'
      }
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/aspect-ratio')
  ],
}
