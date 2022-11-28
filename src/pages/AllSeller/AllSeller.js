import React from "react";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Menu,
  Loader,
} from "@mantine/core";
import {
  IconCircleCheck,
  IconMessage,
  IconPencil,
  IconTrash,
} from "@tabler/icons";
import { useState } from "react";
import DeleteUserDialogue from "../../components/Dialogue/DeleteUserDialogue/DeleteUserDialogue";
import useFetchUsers from "../../hooks/UseAllUser/useFetchUsers";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import API from "../../api/api";
import { getTokenFromLocalStorage } from "../../utils/utils";

const jobColors = {
  admin: "blue",
  seller: "cyan",
  buyer: "pink",
};

const MenuBar = ({ user }) => {
  const queryClient = useQueryClient();

  const makeSellerVerified = () => {
    return API(getTokenFromLocalStorage()).patch(`/users/${user._id}`, {
      isVerified: true,
    });
  };

  const makeSellerVerifiedMutation = useMutation(makeSellerVerified, {
    onSuccess: () => {
      queryClient.invalidateQueries("allUsers");
      showNotification({
        title: "Verified!",
        message: "Seller has been verified",
        color: "green",
        icon: <IconCircleCheck size={24} />,
      });
    },
  });

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon>
          <IconPencil size={16} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Actions</Menu.Label>
        <Menu.Item icon={<IconMessage size={14} />}>Message</Menu.Item>
        <Menu.Item
          color="cyan"
          icon={<IconCircleCheck size={14} />}
          disabled={user.isVerified}
          onClick={() => {
            makeSellerVerifiedMutation.mutate();
          }}
        >
          {user.isVerified ? "Verified" : "Make Verified"}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const AllSeller = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [users, isLoading] = useFetchUsers(true);

  const rows = users?.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.photoURL} radius={30} />
          <Text size="sm" weight={500}>
            {item.displayName}
          </Text>
        </Group>
      </td>

      <td>
        {item.isVerified ? (
          <Badge color="green">verified</Badge>
        ) : (
          <Badge color="red">not verified</Badge>
        )}
      </td>

      <td>
        <Badge
          color={jobColors[item.role.toLowerCase()]}
          variant={theme.colorScheme === "dark" ? "light" : "outline"}
        >
          {item.role}
        </Badge>
      </td>
      <td>
        <Anchor size="sm" href="#" onClick={(event) => event.preventDefault()}>
          {item.email}
        </Anchor>
      </td>
      {/* <td>
        <Text size="sm" color="dimmed">
          {item.phone}
        </Text>
      </td> */}
      <td>
        <Group spacing={0} position="right">
          <MenuBar user={item} />
          <ActionIcon color="red" onClick={() => setOpened(true)}>
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
          <DeleteUserDialogue
            opened={opened}
            setOpened={setOpened}
            userId={item._id}
          />
        </Group>
      </td>
    </tr>
  ));
  return (
    <ScrollArea sx={{ height: "100%" }}>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        {isLoading && <Loader />}
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Role</th>
            <th>Email</th>
            {/* <th>Phone</th> */}
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default AllSeller;
