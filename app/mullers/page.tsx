'use client';

import { useState } from 'react';
import { IconInputX } from '@tabler/icons-react';
import { compile, derivative, evaluate } from 'mathjs';
import { NumberInput, Stack, Table, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { LinearAlgorithmInput } from '@/components/LinearAlgorithmInput';
import { mullers } from './mullers';

export default function Mullers() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      f: '',
      p0: '0',
      p1: '0',
      p2: '0',
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
        onSubmit={({ f, p0, p1, p2, n, tol }) => {
          const compiledF = compile(f);
          const output = mullers(
            (x) => compiledF.evaluate({ x }),
            { p0: evaluate(p0), p1: evaluate(p1), p2: evaluate(p2) },
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
          <TextInput
            label="p1"
            description="The second approximation of the root, p1."
            leftSection={<IconInputX />}
            placeholder="0"
            key={form.key('p1')}
            {...form.getInputProps('p1')}
          />
          <TextInput
            label="p2"
            description="The second approximation of the root, p2."
            leftSection={<IconInputX />}
            placeholder="0"
            key={form.key('p2')}
            {...form.getInputProps('p2')}
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
                    p<sub>i</sub>
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fs="italic">
                    f(p<sub>i</sub>)
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map(([n, p, f]) => (
                <Table.Tr key={n}>
                  <Table.Td>{n}</Table.Td>
                  <Table.Td>{p.toString()}</Table.Td>
                  <Table.Td>{f.toString()}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      ) : null}
    </Stack>
  );
}
