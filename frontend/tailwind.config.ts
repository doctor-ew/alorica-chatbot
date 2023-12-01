import type { Config } from 'tailwindcss';
import { Spinner } from "next/components";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aloricaBlue: '#00a9e0', // Custom blue color used in Alorica branding
        aloricaGray: '#464646', // Custom gray color
        aloricaLightGray: '#f4f4f4', // Custom light gray color
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Add any additional theme extensions here
    },
  },
  plugins: [],
};

export default config;
