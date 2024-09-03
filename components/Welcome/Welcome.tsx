import { Anchor, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Numerical Analysis
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Built with ❤️ by Agnirudra Sil. Source code can be found on{' '}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          github
        </Anchor>
        . Please find the available numerical analysis algorithms in the sidebar.
      </Text>
    </>
  );
}
