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
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  darkMode: ["class", "class"],
  plugins: [require("daisyui"), require("tailwindcss-animate")],
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