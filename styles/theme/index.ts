import { createSystem, defaultConfig } from '@chakra-ui/react';
import { fonts } from './fonts';

// Simple theme configuration that works with this version of Chakra UI
// Only include the fonts token which is properly typed
const customTheme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts,
    },
  },
});

export default customTheme;
