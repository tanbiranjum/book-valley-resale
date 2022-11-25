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
import { useEffect, useState } from "react";

const jobColors = {
  engineer: "blue",
  manager: "cyan",
  designer: "pink",
};

const data = [
  {
    name: "John Doe",
    job: "Buyer",
    email: "johndoe@gmail.com",
    phone: "01703248482",
  },
  {
    name: "John Doe",
    job: "Buyer",
    email: "johndoe@gmail.com",
    phone: "01703248482",
  },
];

const AllUser = () => {
  const theme = useMantineTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.data.users);
      });
  }, []);

  const rows = data?.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
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
          <ActionIcon color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
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
