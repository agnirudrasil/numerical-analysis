'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import {
  Anchor,
  AppShell,
  Burger,
  Group,
  NavLink,
  Skeleton,
  Space,
  Stack,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { Title as Logo } from '@/components/Title';

const ALGORITHMS = [
  {
    title: 'Bisection',
    route: '/bisection',
    segment: 'bisection',
  },
  {
    title: 'Secant',
    route: '/secant',
    segment: 'secant',
  },
  {
    title: 'False Position',
    route: '/false-position',
    segment: 'false-position',
  },
  {
    title: "Newton's Method",
    route: '/newtons',
    segment: 'newtons',
  },
  {
    title: "Müller's Method",
    route: '/mullers',
    segment: 'mullers',
  },
];

export const Shell = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const layoutSegment = useSelectedLayoutSegment();

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Group justify="center" align="stretch" px="md">
          <Burger
            style={{
              flexShrink: 0,
            }}
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Anchor component={Link} href="/" c="pink">
            <Title
              component="span"
              style={{
                fontWeight: 'bold',
                display: 'inline-block',
                fontSize: '1.5rem',
                maxWidth: '250px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <Logo />
            </Title>
          </Anchor>
        </Group>
        <ColorSchemeToggle />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {ALGORITHMS.map(({ title, route, segment }) => (
          <NavLink
            key={segment}
            active={segment === layoutSegment}
            label={title}
            component={Link}
            href={route}
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
