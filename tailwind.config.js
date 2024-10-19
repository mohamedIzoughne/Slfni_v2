/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F5",
        primary: "#2F5B84",
        "focused-primary": "#103557",
        "background-dark": "#212121",
      },
    },
  },
  plugins: [],
}
