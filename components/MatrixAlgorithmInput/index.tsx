import { useState } from 'react';
import {
  IconAdjustmentsHorizontal,
  IconArrowIteration,
  IconMathFunction,
} from '@tabler/icons-react';
import { Button, NumberInput, Space, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { MatrixInput } from '../MatrixInput';

export const MatrixAlgorithmInput = <T,>({
  children,
  form,
  onSubmit,
}: {
  children: React.ReactNode;
  form: UseFormReturnType<T>;
  onSubmit: (values: T) => void;
}) => {
  const [a, setA] = useState<number[][]>([]);
  const [b, setB] = useState<number[][]>([]);

  form.watch('A', ({ value }) => setA(value as any));
  form.watch('b', ({ value }) => setB(value as any));

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Text size="xl" fw={900}>
          Input
        </Text>
        <MatrixInput
          label={
            <Text component="span" fw={800}>
              A
            </Text>
          }
          description="Enter the coefficient matrix A."
          value={a}
          key={form.key('A')}
          onChange={(v) => form.setFieldValue('A', v as any)}
        />
        <MatrixInput
          label={
            <Text component="span" fw={800}>
              b
            </Text>
          }
          key={form.key('b')}
          description="Enter the result matrix A."
          value={b}
          onChange={(v) => form.setFieldValue('b', v as any)}
        />
        <Space />
        {children}
        <Space />
        <NumberInput
          label="Tolerance"
          leftSection={<IconAdjustmentsHorizontal />}
          placeholder="0.0001"
          key={form.key('tol')}
          {...form.getInputProps('tol')}
        />
        <NumberInput
          label="Iterations"
          description="Enter the maximum number of iterations."
          leftSection={<IconArrowIteration />}
          placeholder="12"
          key={form.key('n')}
          {...form.getInputProps('n')}
        />
        <Button color="pink" type="submit">
          Solve
        </Button>
      </Stack>
    </form>
  );
};
