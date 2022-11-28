import { createStyles, Avatar, Text, Group } from "@mantine/core";
import { IconPhoneCall, IconAt } from "@tabler/icons";
import { useContext, useEffect, useState } from "react";
import API from "../../../api/api";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const DashboardHome = () => {
  const { classes } = useStyles();
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    document.title = "Dashboard - Book Velley";
    API()
      .get(`/users/email/${user.email}`)
      .then((res) => {
        setUserInfo(res.data.data.user);
      });
  }, []);
  return (
    <div>
      <Group
        noWrap
        sx={(theme) => ({
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[3]
          }`,
          width: "50%",
          padding: theme.spacing.md,
        })}
      >
        <Avatar src={user.photoURL} size={94} radius="md" />
        <div>
          <Text
            size="xs"
            sx={{ textTransform: "uppercase" }}
            weight={700}
            color="dimmed"
          >
            {userInfo.role}
          </Text>
          <Text size="lg" weight={500} className={classes.name}>
            {user.displayName}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <IconAt stroke={1.5} size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {user.email}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <IconPhoneCall stroke={1.5} size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              +990292920022
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
};

export default DashboardHome;
