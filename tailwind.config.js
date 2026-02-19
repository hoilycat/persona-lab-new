/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // apps 폴더 안의 파일들까지 다 읽게 해줘!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}