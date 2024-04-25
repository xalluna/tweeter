import { FC, ReactNode, useMemo } from 'react';
import {
  Button,
  Container,
  createStyles,
  CSSObject,
  Divider,
  Grid,
  Loader,
  Text,
  Tooltip,
} from '@mantine/core';
import { useUserContext } from './users/useUserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from './routes';
import { IconHelp, IconMessagePlus } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';

export const BasicPage: FC<{
  children: ReactNode;
  title: string;
  hideAddTopic?: boolean;
  isHomePage?: boolean;
  loading?: boolean;
}> = ({ children, title, hideAddTopic, isHomePage, loading }) => {
  const { classes } = useStyles();
  const { user } = useUserContext();
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const showAddTopic = useMemo(
    () => !hideAddTopic && user && !loading,
    [hideAddTopic, loading, user]
  );

  return (
    <Container className={classes.pageContainer}>
      <Grid align="end" justify="flex-end">
        <Grid.Col span={10}>
          <h1>
            {title}
            {isHomePage && (
              <Tooltip label="Consists of all subscribed topics with the most recent two posts from each topic.">
                <NavLink
                  onClick={() =>
                    window.open('https://youtu.be/zkjETTa5w1I?si=NnVhPZSHkPfT9kTN&t=29', '_blank')
                  }
                  to={location}
                  className={classes.infoButton}
                >
                  <IconHelp />
                </NavLink>
              </Tooltip>
            )}
          </h1>
        </Grid.Col>
        <Grid.Col span={2} className={classes.addTopics}>
          {showAddTopic && (
            <Button onClick={() => navigate(routes.topicCreate)}>
              <IconMessagePlus className={classes.iconMargin} />
              Add Topic
            </Button>
          )}
        </Grid.Col>
      </Grid>
      {loading ? (
        <Container pt={250}>
          <Loader sx={loaderStyle} size="150px" color="#45b5ff" />
        </Container>
      ) : (
        <>
          {children}
          <Divider mt="1.25rem" />
          {!hideAddTopic && (
            <Text c="dimmed" className={classes.theEnd}>
              ✨ The End ✨
            </Text>
          )}
        </>
      )}
    </Container>
  );
};

function loaderStyle(): CSSObject {
  return {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 'auto',
  };
}

const useStyles = createStyles(() => ({
  pageContainer: {
    color: '#e6e6e6',
    paddingBottom: 25,
  },

  infoButton: {
    color: 'white',
    backgroundColor: 'transparent',
    cursor: 'default',
    marginLeft: 5,

    ':hover': {
      backgroundColor: 'transparent',
      cursor: 'default',
    },
  },

  iconMargin: {
    marginRight: 5,
  },

  addTopics: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },

  theEnd: {
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    fontSize: 16,
    paddingTop: 25,
  },
}));
