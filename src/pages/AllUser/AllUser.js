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
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DeleteUserDialogue from "../../components/Dialogue/DeleteUserDialogue/DeleteUserDialogue";
import useFetchUsers from "../../hooks/UseAllUser/useFetchUsers";

const jobColors = {
  admin: "blue",
  seller: "cyan",
  buyer: "pink",
};

const AllUser = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [users, isLoading] = useFetchUsers();

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
          <ActionIcon>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
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
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Name</th>
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

export default AllUser;
