/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React 컴포넌트 경로
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
