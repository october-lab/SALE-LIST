/* eslint-disable no-undef */
// tailwind.config.js
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    // ...
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
}

// module.exports = {
//   content: [
//     // ...
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
//   ],
//   theme: {
//     extend: {},
//   },
//   darkMode: "class",
//   plugins: [
//     nextui({
//       defaultTheme: "dark",
//       themes: {
//         "purple-dark": {
//           extend: "dark", // <- inherit default values from dark theme
//           colors: {
//             background: "#0D001A",
//             foreground: "#ffffff",
//             primary: {
//               50: "#3B096C",
//               100: "#520F83",
//               200: "#7318A2",
//               300: "#9823C2",
//               400: "#c031e2",
//               500: "#DD62ED",
//               600: "#F182F6",
//               700: "#FCADF9",
//               800: "#FDD5F9",
//               900: "#FEECFE",
//               DEFAULT: "#DD62ED",
//               foreground: "#ffffff",
//             },
//             focus: "#F182F6",
//           },
//           layout: {
//             disabledOpacity: "0.3",
//             radius: {
//               small: "4px",
//               medium: "6px",
//               large: "8px",
//             },
//             borderWidth: {
//               small: "1px",
//               medium: "2px",
//               large: "3px",
//             },
//           },
//         },
//       },
//     }),
//   ],
// };