/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Poppins'], // Add your custom font
        inter: ['Inter'],
        contrail: ['Contrail One'],
        frag : ['PP Fragment'],
        ppFragmentBold: ['PPFragment-GlareExtraBold', 'sans-serif'], // your font
      },
      keyframes: {
        scrollHorizontalLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        scrollHorizontalRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        scrollHorizontalLeft: 'scrollHorizontalLeft 20s linear infinite',
        scrollFastLeft: 'scrollHorizontalLeft 5s linear infinite',
        scrollHorizontalRight: 'scrollHorizontalRight 20s linear infinite',
        scrollFastRight: 'scrollHorizontalRight 5s linear infinite',
      },
    },
  },
  plugins: [],
}
