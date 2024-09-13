/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#554686",
        "primary-dark": "#8879B9",
        secondary: "#9AD4D6",
        "secondary-dark": "#296365",
        accent: "#101937",
        "accent-dark": "#C8D1EF",
        light: "#F0FDFF",
        dark: "#000D0F",
        text: "#040316",
        "text-dark": "#EAE9FC",
      },
    },
  },
  plugins: [],
}
