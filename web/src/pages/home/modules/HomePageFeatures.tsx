import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  Image,
  AspectRatio,
  Space,
  MantineTheme,
} from '@mantine/core';
import { Home2 } from './HomePageEnd';

const cardData = [
  {
    title: 'Magic: The Gathering',
    description:
      'Magic is a collectible trading card game of fun-filled, strategic games to play with friends old and new.',
    src: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg',
  },
  {
    title: 'Pokémon',
    description:
      'An original animated series that tells the inspiring story of one girl’s rise through competitive Pokémon Trading Card Game play.',
    src: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_759,h_1053/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA',
  },
  {
    title: 'Yu-Gi-Oh!',
    description:
      'Yu-Gi-Oh! is an exciting universe based on a card game played with Monsters, Spells, and Traps.',
    src: 'https://upload.wikimedia.org/wikipedia/en/2/2b/Yugioh_Card_Back.jpg',
  },
];

export function FeaturesCards() {
  const { classes } = useStyles();
  const features = cardData.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius={rem(12)}
      className={classes.card}
      padding="xl"
    >
      <AspectRatio ratio={16 / 9} h={445}>
        <Image src={feature.src} radius={20} height={445} />
      </AspectRatio>
      <Space h={rem(13)} />
      <div className={classes.cardInfo}>
        <Text
          fz="lg"
          fw={500}
          color="white"
          className={classes.cardTitle}
          mt="md"
        >
          {feature.title}
        </Text>
        <Text fz="md" c="white" mt="sm">
          {feature.description}
        </Text>
      </div>
    </Card>
  ));

  return (
    <>
      <div className={classes.wrapper}>
        <Container className={classes.containerSx} mb={rem(80)} size="xl">
          <Group position="center">
            <Badge className={classes.badge} variant="filled" size="xl">
              Trading Card Games
            </Badge>
          </Group>

          <Title order={2} className={classes.title} ta="center" mt="sm">
            Three classic trading card games.
          </Title>
          <Text className={classes.description} ta="center" mt="md">
            Gather your inventory and create decks for some of your favorite
            cards games all in one convenient spot!
          </Text>

          <SimpleGrid
            cols={3}
            spacing="xl"
            mt={50}
            breakpoints={[{ maxWidth: 'md', cols: 1 }]}
          >
            {features}
          </SimpleGrid>
        </Container>
        <Home2 />
      </div>
    </>
  );
}

const useStyles = createStyles((theme: MantineTheme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,
    color: theme.white,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  wrapper: {
    paddingTop: rem(200),
    background: 'rgba(49, 70, 82, .95)',
    backgroundImage:
      'linear-gradient(to bottom, rgba(0, 40, 115, 0.15) 0%,rgba(0, 40, 115, 0.15) 100%), linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%,rgba(0, 0, 0, 0.5) 100%), url(' +
      'https://images.unsplash.com/photo-1635431289101-ef85326518f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80' +
      ')',
    backgroundSize: 'cover',
    backgroundPositionY: 'center',
    backgroundRepeat: 'no-repeat',
  },

  badge: {
    background: theme.colors.secondaryBlueColors[4],
    color: theme.white,
    padding: '1.15rem',
  },

  description: {
    maxWidth: 600,
    margin: 'auto',
    color: theme.white,

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: 'blueviolet',
      width: rem(45),
      height: rem(2),
      marginTop: rem(13),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  containerSx: {
    padding: '50px 50px 100px 50px',
    backgroundColor: 'rgba(40, 14, 71,0.75)',
    borderRadius: '50px',
  },

  card: {
    backgroundSize: 'cover',
    backgroundPositionY: 'top',
    backgroundPositionX: 'right',
    backgroundRepeat: 'no-repeat',
    background: 'rgba(81, 42, 128, 0.5)',
    boxShadow: `7px 7px 5px 2px rgba(0, 0, 0, 0.25)`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: 'blueviolet',
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },

  cardInfo: {
    padding: '0.05rem 1rem 1rem 1rem',
    verticalAlign: 'bottom',
    backgroundColor: 'rgba(29, 9, 54, 0.9)',
    height: '12rem',
    color: 'white',
    borderRadius: '5px 30px 5px 30px',
    boxShadow: `0px 0px 5px 0.1rem ${theme.colors.primaryBlueColor[0]}`,
  },
}));
