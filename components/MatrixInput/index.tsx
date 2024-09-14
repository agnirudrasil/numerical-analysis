import { useEffect, useState } from 'react';
import { IconEdit, IconX } from '@tabler/icons-react';
import { compile, MathType, parse } from 'mathjs';
import Latex from 'react-latex-next';
import {
  ActionIcon,
  Button,
  Group,
  InputDescription,
  InputLabel,
  InputWrapper,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Matrix } from './matrix';

export const MatrixInput = ({
  onChange,
  value,
  label,
  description,
  fixedColumns,
  fixedRows,
}: {
  ButtonComponent?: any;
  onChange: (v: MathType[][]) => any;
  value?: MathType[][];
  label?: React.ReactNode;
  description?: React.ReactNode;
  fixedRows?: number;
  fixedColumns?: number;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [rows, setRows] = useState<number | string>(fixedRows || '');
  const [columns, setColumns] = useState<number | string>(fixedColumns || '');
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      matrix:
        typeof rows === 'number' && typeof columns === 'number'
          ? Array.from({ length: rows }, () =>
              Array.from({ length: columns }, () => '' as unknown as MathType)
            )
          : ([] as MathType[][]),
    },
  });

  useEffect(() => {
    if (typeof rows === 'number' && typeof columns === 'number') {
      form.setFieldValue(
        'matrix',
        Array.from({ length: rows }, () =>
          Array.from({ length: columns }, () => '' as unknown as MathType)
        )
      );
    }
  }, [rows, columns]);

  form.watch('matrix', ({ value }) => {
    if (value) {
      onChange(value);
    }
  });

  return (
    <>
      <Modal opened={opened} size="lg" onClose={close} title="Set Matrix" centered>
        <Stack>
          <Stack gap="xs">
            <InputLabel>Dimensions</InputLabel>
            <Group gap="xs">
              <NumberInput
                value={rows}
                step={1}
                min={1}
                onChange={(e) => setRows(typeof e === 'number' ? e : parseInt(e))}
                placeholder="Rows"
                readOnly={typeof fixedRows === 'number'}
              />
              <ThemeIcon variant="transparent" color="grey">
                <IconX style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
              <NumberInput
                placeholder="Columns"
                value={columns}
                step={1}
                min={1}
                onChange={(e) => setColumns(typeof e === 'number' ? e : parseInt(e))}
                readOnly={typeof fixedColumns === 'number'}
              />
            </Group>
          </Stack>
          {typeof rows !== 'string' && typeof columns !== 'string' && (
            <Matrix>
              {Array.from({ length: rows }, (_, i) => (
                <Group grow wrap="nowrap" key={i} gap="xs">
                  {Array.from({ length: columns }, (_, j) => (
                    <TextInput
                      key={form.key(`matrix.${i}.${j}`)}
                      {...form.getInputProps(`matrix.${i}.${j}`)}
                      placeholder="Enter Expression"
                    />
                  ))}
                </Group>
              ))}
            </Matrix>
          )}
          <Button
            onClick={() => {
              onChange(form.getValues().matrix);
              close();
            }}
            color="pink"
          >
            Done
          </Button>
        </Stack>
      </Modal>
      <InputWrapper>
        <InputLabel>{label}</InputLabel>
        <InputDescription>{description}</InputDescription>
        {value && value.length && value[0].length ? (
          <Group mt="sm" w="max-content">
            <Matrix>
              {value.map((row, i) => (
                <Group wrap="nowrap" key={i} gap="xs">
                  {row.map((el, j) => (
                    <Text key={`${i}.${j}`}>
                      <Latex>${parse(el as unknown as string).toTex()}$</Latex>
                    </Text>
                  ))}
                </Group>
              ))}
            </Matrix>
            <ActionIcon onClick={open} color="pink" variant="filled">
              <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Group>
        ) : (
          <Button mt="sm" color="pink" style={{ width: 'max-content' }} onClick={open}>
            Set Matrix
          </Button>
        )}
      </InputWrapper>
    </>
  );
};
