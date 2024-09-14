import '@mantine/core/styles.css';
import 'katex/dist/katex.min.css';

import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { Shell } from './shell';

export const metadata = {
  title: 'Numerical Analysis',
  description: 'Website to help solve numerical analysis problems.',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Shell>{children}</Shell>
        </MantineProvider>
      </body>
    </html>
  );
}
