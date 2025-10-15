import tailwind from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const config = {
  plugins: [tailwind(), autoprefixer()],
};

export default config;
