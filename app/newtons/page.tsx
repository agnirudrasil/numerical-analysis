'use client';

import { useState } from 'react';
import { IconInputX } from '@tabler/icons-react';
import { compile, derivative, evaluate } from 'mathjs';
import { NumberInput, Stack, Table, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { LinearAlgorithmInput } from '@/components/LinearAlgorithmInput';
import { newtons } from './newtons';

export default function Newtons() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      f: '',
      p0: '0',
      fprime: '',
      tol: 0.0001,
      n: 12,
    },
  });

  const [data, setData] = useState<number[][]>([]);

  return (
    <Stack
      style={{
        maxWidth: '100%',
      }}
    >
      <LinearAlgorithmInput
        form={form}
        onSubmit={({ f, p0, n, tol }) => {
          const compiledF = compile(f);
          const output = newtons(
            (x) => compiledF.evaluate({ x }),
            { p0: evaluate(p0), fprime: (x) => derivative(f, 'x').evaluate({ x }) },
            { n, tol }
          );
          setData(output);
        }}
      >
        <>
          <TextInput
            label="p0"
            description="The initial approximation of the root, p0."
            leftSection={<IconInputX />}
            placeholder="0"
            key={form.key('p0')}
            {...form.getInputProps('p0')}
          />
        </>
      </LinearAlgorithmInput>
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
                <Table.Th>
                  <Text fs="italic">
                    p<sub>n</sub>
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map(([n, p]) => (
                <Table.Tr key={n}>
                  <Table.Td>{n}</Table.Td>
                  <Table.Td>{p}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      ) : null}
    </Stack>
  );
}
