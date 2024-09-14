'use client';

import { useState } from 'react';
import Latex from 'react-latex-next';
import { Group, Stack, Table, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MatrixInput } from '@/components/MatrixInput';
import { NonLinearInput } from '@/components/NonLinearInput';
import { newtonsNonLinear } from './newtons-2';
import classes from './MatrixInput.module.css';

export default function Newtons2() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      F: [[]],
      x0: [[]],
      tol: 0.0001,
      n: 12,
    },
  });

  const [data, setData] = useState<number[][]>([]);
  const [x0, setX0] = useState<number[][]>([]);
  const [jacobian, setJacobian] = useState<number[][]>([]);

  form.watch('x0', ({ value }) => setX0(value as any));

  return (
    <Stack
      style={{
        maxWidth: '100%',
      }}
    >
      <NonLinearInput
        form={form}
        onSubmit={({ n, tol, F, x0 }) => {
          const { data, jacobian } = newtonsNonLinear(
            {
              F,
              x0,
            },
            {
              n,
              tol,
            }
          );

          setData(data);
          setJacobian(jacobian as any);
        }}
      >
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
      </NonLinearInput>
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: 'pink', to: 'yellow', deg: 90 }}
      >
        Output
      </Text>
      <Stack>
        {jacobian && jacobian.length ? (
          <Group>
            <Text fw={900}>J = </Text>
            <div
              className={classes.matrix}
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${jacobian.length}, 1fr)`,
                placeItems: 'center',
              }}
            >
              {jacobian.map((row, i) =>
                row.map((el, j) => (
                  <div key={`${i}.${j}`}>
                    <Latex>${(el as any).toTex()}$</Latex>
                  </div>
                ))
              )}
            </div>
          </Group>
        ) : null}
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
                        <sup>(k)</sup>
                      </Text>
                    </Table.Th>
                  ))}
                  <Table.Th>
                    <Text fw={800}>
                      ||x
                      <sup>(k)</sup>-x<sup>(k - 1)</sup>||
                    </Text>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.map((items, i) => (
                  <Table.Tr key={i}>
                    {items.map((item, j) => (
                      <Table.Td key={j}>{isNaN(item) ? '' : item}</Table.Td>
                    ))}
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        ) : null}
      </Stack>
    </Stack>
  );
}
