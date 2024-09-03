'use client';

import { useState } from 'react';
import { IconInputX } from '@tabler/icons-react';
import { evaluate } from 'mathjs';
import { Stack, Table, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MatrixAlgorithmInput } from '@/components/MatrixAlgorithmInput';
import { MatrixInput } from '@/components/MatrixInput';
import { jacobi } from './jacobi';

export default function Jacobi() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      A: [[]],
      b: [[]],
      x0: [[]],
      tol: 0.0001,
      n: 12,
    },
  });

  const [data, setData] = useState<number[][]>([]);
  const [x0, setX0] = useState<number[][]>([]);

  form.watch('x0', ({ value }) => setX0(value as any));

  return (
    <Stack
      style={{
        maxWidth: '100%',
      }}
    >
      <MatrixAlgorithmInput
        form={form}
        onSubmit={({ n, tol, A, b, x0 }) => {
          const data = jacobi(
            {
              A: A.map((row) => row.map((col) => evaluate(col))),
              b: b.map((row) => row.map((col) => evaluate(col))),
              x0: x0.map((row) => row.map((col) => evaluate(col))),
            },
            {
              n,
              tol,
            }
          );

          setData(data);
        }}
      >
        <>
          <MatrixInput
            label={
              <Text component="span" fw={800}>
                x<sup>0</sup>
              </Text>
            }
            value={x0}
            description="The initial approximation of the root."
            key={form.key('x0')}
            {...form.getInputProps('x0')}
          />
        </>
      </MatrixAlgorithmInput>
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: 'pink', to: 'yellow', deg: 90 }}
      >
        Output
      </Text>
      {data.length ? (
        <Table.ScrollContainer minWidth={500}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Text fs="italic">n</Text>
                </Table.Th>
                {Array.from({ length: x0.length }, () => 0).map((_, i) => (
                  <Table.Th key={i}>
                    <Text fs="italic">
                      x<sub>{i + 1}</sub>
                    </Text>
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((items, i) => (
                <Table.Tr key={i}>
                  {items.map((item, j) => (
                    <Table.Td key={j}>{item}</Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      ) : null}
    </Stack>
  );
}
