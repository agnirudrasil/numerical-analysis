import { Stack } from '@mantine/core';
import classes from './MatrixInput.module.css';

export const Matrix = ({ children }: { children: React.ReactNode }) => (
  <Stack className={classes.matrix} gap="xs" p="xs">
    {children}
  </Stack>
);
