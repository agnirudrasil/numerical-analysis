import {
  IconAdjustmentsHorizontal,
  IconArrowIteration,
  IconMathFunction,
} from '@tabler/icons-react';
import { Button, NumberInput, Space, Stack, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

export const LinearAlgorithmInput = <T,>({
  children,
  form,
  onSubmit,
}: {
  children: React.ReactNode;
  form: UseFormReturnType<T>;
  onSubmit: (values: T) => void;
}) => {
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Text size="xl" fw={900}>
          Input
        </Text>
        <TextInput
          label={<Text>f(x)</Text>}
          description="Enter the function to run the algorithm on."
          leftSection={<IconMathFunction />}
          placeholder="x^2 - 4"
          key={form.key('f')}
          {...form.getInputProps('f')}
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
