'use client';

import { Suspense } from 'react';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { ActionIcon, Menu, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon m="md" color="pink">
          <Suspense>
            {colorScheme === 'light' ? (
              <IconSun style={{ width: '70%', height: '70%' }} stroke={1.5} />
            ) : (
              <IconMoon style={{ width: '70%', height: '70%' }} stroke={1.5} />
            )}
          </Suspense>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={() => setColorScheme('light')}>Light</Menu.Item>
        <Menu.Item onClick={() => setColorScheme('dark')}>Dark</Menu.Item>
        <Menu.Item onClick={() => setColorScheme('auto')}>System</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
