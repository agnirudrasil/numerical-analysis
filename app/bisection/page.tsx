'use client';

import { useState } from 'react';
import { IconInputX } from '@tabler/icons-react';
import { compile, evaluate } from 'mathjs';
import { NumberInput, Stack, Table, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { LinearAlgorithmInput } from '@/components/LinearAlgorithmInput';
import { bisection } from './bisection';

export default function BisectionMethod() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      f: '',
      a: '0',
      b: '1',
      tol: 0.0001,
      n: 12,
    },
    validate: {
      f: (value) => {
        try {
          compile(value).evaluate({ x: 0 });
          return null;
        } catch (error: any) {
          return error.toString();
        }
      },
      a: (value) => {
        try {
          evaluate(value);
          return null;
        } catch (error: any) {
          return error.toString();
        }
      },
      b: (value) => {
        try {
          evaluate(value);
          return null;
        } catch (error: any) {
          return error.toString();
        }
      },
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
        onSubmit={({ f, a, b, n, tol }) => {
          const compiledF = compile(f.toLowerCase());
          const output = bisection(
            (x) => compiledF.evaluate({ x }),
            { a: evaluate(a), b: evaluate(b) },
            { n, tol }
          );
          setData(output);
        }}
      >
        <>
          <TextInput
            label="a"
            description="The start endpoint of the interval."
            leftSection={<IconInputX />}
            placeholder="0"
            key={form.key('a')}
            {...form.getInputProps('a')}
          />
          <TextInput
            label="b"
            description="The end endpoint of the interval."
            leftSection={<IconInputX />}
            placeholder="1"
            key={form.key('b')}
            {...form.getInputProps('b')}
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
                    a<sub>n</sub>
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fs="italic">
                    b<sub>n</sub>
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fs="italic">
                    p<sub>n</sub>
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fs="italic">
                    f(p<sub>n</sub>)
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map(([n, a, b, p, fp]) => (
                <Table.Tr key={n}>
                  <Table.Td>{n}</Table.Td>
                  <Table.Td>{a}</Table.Td>
                  <Table.Td>{b}</Table.Td>
                  <Table.Td>{p}</Table.Td>
                  <Table.Td>{fp}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      ) : null}
    </Stack>
  );
}
