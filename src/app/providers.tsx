'use client';

import { SessionProvider } from 'next-auth/react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme, localStorageManager, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {},
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <CacheProvider>
        <ChakraProvider theme={theme} colorModeManager={localStorageManager}>
          {children}
        </ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  );
};
