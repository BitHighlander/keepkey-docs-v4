'use client';

import type { IconButtonProps } from '@chakra-ui/react';
import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react';
import { ThemeProvider, useTheme, type ThemeProviderProps } from 'next-themes';
import { forwardRef } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

export function ColorModeProvider(props: ThemeProviderProps) {
  // Force dark mode by setting both defaultTheme and forcedTheme to 'dark'
  return (
    <ThemeProvider 
      attribute="class" 
      disableTransitionOnChange 
      defaultTheme="dark" 
      forcedTheme="dark" 
      {...props} 
    />
  );
}

export function useColorMode() {
  // Always return dark mode regardless of actual theme
  const { resolvedTheme, setTheme } = useTheme();
  
  // Toggle function is a no-op since we're forcing dark mode
  const toggleColorMode = () => {
    // This will have no visible effect since we're forcing dark mode
    // But we keep it for API compatibility
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };
  
  return {
    colorMode: 'dark', // Always return dark mode
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === 'light' ? light : dark;
}

export function ColorModeIcon() {
  // Always show the sun icon since we're forcing dark mode
  // In dark mode, the sun icon is shown to indicate you can switch to light mode
  return <LuSun />;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ColorModeButtonProps extends Omit<IconButtonProps, 'aria-label'> {}

export const ColorModeButton = forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
        css={{
          _icon: {
            width: '5',
            height: '5',
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
});
