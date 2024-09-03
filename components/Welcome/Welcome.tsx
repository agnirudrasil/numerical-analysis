import { Anchor, Text, Title } from '@mantine/core';
import { Title as Logo } from '../Title';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to <Logo />
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Built with ❤️ by Agnirudra Sil. Source code can be found on{' '}
        <Anchor href="https://github.com/agnirudrasil/numerical-analysis" size="lg">
          github
        </Anchor>
        . Please find the available numerical analysis algorithms in the sidebar.
      </Text>
    </>
  );
}
