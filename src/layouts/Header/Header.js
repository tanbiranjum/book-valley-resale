import React, { useContext } from "react";
import {
  createStyles,
  Header as MantineHeader,
  Group,
  Button,
  UnstyledButton,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Avatar,
  Menu,
  Text,
  Flex,
  Container,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings, IconLogout } from "@tabler/icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import Logo from "../../assets/book-logo.png";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    background: "linear-gradient(pink, yellow)",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 700,
    fontSize: theme.fontSizes.md,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
      }}
    >
      <Container size="xl">
        <MantineHeader
          height={60}
          sx={{
            backgroundColor: "transparent",
            borderBottom: "0",
          }}
        >
          <Group position="apart" sx={{ height: "100%" }}>
            <Flex>
              <Link to="/" className={classes.link} style={{ padding: 0 }}>
                <Avatar src={Logo} mr="sm"></Avatar>
                <Text weight="bold">Book Valley</Text>
              </Link>
            </Flex>
            <Group
              sx={{ height: "100%" }}
              spacing={0}
              className={classes.hiddenMobile}
            >
              <Link to="/" className={classes.link}>
                Home
              </Link>
              <Link to="/blog" className={classes.link}>
                Blog
              </Link>
              {user?.displayName && (
                <Link to="/dashboard" className={classes.link}>
                  Dashboard
                </Link>
              )}
            </Group>
            <Group className={classes.hiddenMobile}>
              {!user?.displayName && (
                <Button
                  variant="default"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log in
                </Button>
              )}
              {user?.displayName && (
                <Menu width={260} position="bottom-start">
                  <Menu.Target>
                    <UnstyledButton
                      sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      <Avatar src={user.photoURL} radius="xl" size={30} />
                      <Text
                        weight={500}
                        size="md"
                        sx={{ lineHeight: 1 }}
                        mr={3}
                        variant="gradient"
                        gradient={{ from: "pink", to: "yellow" }}
                      >
                        {user.displayName}
                      </Text>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Great Day!</Menu.Label>
                    <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
                      Account settings
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      onClick={handleLogout}
                      icon={<IconLogout size={14} stroke={1.5} />}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
              {!user?.displayName && (
                <Button
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </Button>
              )}
            </Group>
            <Burger
              ml="auto"
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
              bg="yellow"
              color="white"
            />
          </Group>
        </MantineHeader>
      </Container>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Link to="/" className={classes.link} onClick={closeDrawer}>
            Home
          </Link>
          <Link to="/blog" className={classes.link} onClick={closeDrawer}>
            Blog
          </Link>
          {user?.displayName && (
            <Link
              to="/dashboard"
              className={classes.link}
              onClick={closeDrawer}
            >
              Dashboard
            </Link>
          )}

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            {!user?.displayName && (
              <Button
                variant="default"
                onClick={() => {
                  toggleDrawer();
                  navigate("/login");
                }}
              >
                Log in
              </Button>
            )}
            {user?.displayName && (
              <Menu width={260} position="bottom-start">
                <Menu.Target>
                  <UnstyledButton
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Avatar src={user.photoURL} radius="xl" size={30} />
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                      {user.displayName}
                    </Text>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Great Day!</Menu.Label>
                  <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
                    Account settings
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    onClick={handleLogout}
                    icon={<IconLogout size={14} stroke={1.5} />}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
            {!user?.displayName && (
              <Button
                onClick={() => {
                  toggleDrawer();
                  navigate("/register");
                }}
              >
                Register
              </Button>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Header;
