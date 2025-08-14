import type { Config } from 'tailwindcss';

const config: Config = {
  // Lista de arquivos onde o Tailwind irá procurar por classes
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Sua configuração de fontes
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        kaushan: ['Kaushan', 'sans-serif']
      },
      // Sua configuração de cores
      colors: {
        primary: 'var(--primary)',
        'text-secondary': 'var(--text-secondary)',
        neutral: 'var(--neutral)',
      },
    },
  },
  plugins: [],
};

export default config;