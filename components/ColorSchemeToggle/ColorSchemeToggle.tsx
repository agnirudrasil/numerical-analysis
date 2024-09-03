'use client';

import { IconMoon, IconSun } from '@tabler/icons-react';
import { ActionIcon, Button, Group, Menu, rem, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="default">
          {colorScheme === 'light' ? (
            <IconSun style={{ width: '70%', height: '70%' }} stroke={1.5} />
          ) : (
            <IconMoon style={{ width: '70%', height: '70%' }} stroke={1.5} />
          )}
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
