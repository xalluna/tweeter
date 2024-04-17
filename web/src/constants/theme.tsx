import { MantineThemeOverride } from '@mantine/core';

export const defaultGap = '8px';
export const defaultPadding = '10px';

export const appTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  colors: {
    primaryColors: ['#3098dd', '#20618c', '#174563', '#0f2c40', '#45b5ff'],
    backgroundColor: ['#121212'],
    secondaryBackgroundColors: ['#242424', '#1e1e1e', '#181818'],
    red: [
      '#e60e00',
      '#ED2E21',
      '#FFC9C9',
      '#FFA8A8',
      '#FF8787',
      '#FF6B6B',
      '#FA5252',
      '#F03E3E',
      '#E03131',
      '#C92A2A',
    ],
  },
  white: '#fff',
  black: '#000000',
  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },
  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: '2rem' },
    },
  },
  loader: 'dots',
};
