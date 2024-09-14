import { useState } from 'react';
import { IconAdjustmentsHorizontal, IconArrowIteration } from '@tabler/icons-react';
import { MathType } from 'mathjs';
import { Button, NumberInput, Space, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { MatrixInput } from '../MatrixInput';

export const NonLinearInput = <T,>({
  children,
  form,
  onSubmit,
}: {
  children: React.ReactNode;
  form: UseFormReturnType<T>;
  onSubmit: (values: T) => void;
}) => {
  const [F, setF] = useState<MathType[][]>([]);

  form.watch('F', ({ value }) => setF(value as any));

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Text size="xl" fw={900}>
          Input
        </Text>
        <MatrixInput
          label={
            <Text component="span" fw={800}>
              <strong>F(x)</strong>
            </Text>
          }
          description="Enter the system of equations."
          value={F}
          key={form.key('F')}
          onChange={(v) => form.setFieldValue('F', v as any)}
          fixedColumns={1}
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
