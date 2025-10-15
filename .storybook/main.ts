import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../packages/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async config => {
    config.resolve = {
      alias: [
        {
          find: /^@reacto-kit\/(.*)$/,
          replacement: path.resolve(__dirname, '../packages') + '/$1/src',
        },
        {
          find: '@reacto-kit',
          replacement: path.resolve(__dirname, '../packages'),
        },
      ],
    };
    return config;
  },
};
export default config;
