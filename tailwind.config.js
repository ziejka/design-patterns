/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-200',
    'hover:bg-red-300',
    'bg-orange-200',
    'hover:bg-orange-300',
    'bg-green-200',
    'hover:bg-green-300',
    'border-red-400',
    'hover:border-red-500',
    'border-orange-400',
    'hover:border-orange-500',
    'border-green-400',
    'hover:border-green-500',
  ]
}
