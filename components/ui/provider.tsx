'use client';

import { ChakraProvider } from '@chakra-ui/react';

import customTheme from '../../styles/theme';

import { ColorModeProvider } from './color-mode';
import { PioneerProvider } from '../../context/PioneerContext';

export function Provider(props: React.PropsWithChildren) {
  return (
    <ChakraProvider value={customTheme}>
      <ColorModeProvider>
        <PioneerProvider>
          {props.children}
        </PioneerProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
