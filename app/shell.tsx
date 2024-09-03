'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { AppShell, Burger, Group, NavLink, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

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
  console.log(layoutSegment);

  return (
    <AppShell
      header={{ height: { base: 40, md: 50, lg: 60 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {ALGORITHMS.map(({ title, route, segment }) => (
          <NavLink active={segment === layoutSegment} label={title} component={Link} href={route} />
        ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
