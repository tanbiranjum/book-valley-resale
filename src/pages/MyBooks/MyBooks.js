import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Menu,
  ScrollArea,
  Badge,
} from "@mantine/core";
import {
  IconPencil,
  IconMessages,
  IconNote,
  IconMicrophone,
  IconTrash,
  IconDots,
} from "@tabler/icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import formatDistance from "date-fns/formatDistance";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);

  const handleAdvertise = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAdvertise: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/books/seller/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.data.books);
        console.log(data.data.books);
      });
  }, []);

  const rows = books?.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {item.title}
            </Text>
            <Text color="dimmed" size="xs">
              {item.category.name}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text size="sm">
          {formatDistance(new Date(item.createdAt), new Date())}
        </Text>
        <Text size="xs" color="dimmed">
          Time
        </Text>
      </td>
      <td>
        <Badge sx={{ padding: "8px" }} color="green">
          {item.status}
        </Badge>
      </td>
      <td>
        <Text size="sm">$ {item.sellingPrice}</Text>
        <Text size="xs" color="dimmed">
          Rate
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <Menu transition="pop" withArrow position="bottom-end">
            <Menu.Target>
              <ActionIcon>
                <IconDots size={16} stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<IconTrash size={16} stroke={1.5} />}
                color="red"
              >
                Delete
              </Menu.Item>
              <Menu.Item
                icon={<IconMicrophone size={16} stroke={1.5} />}
                color="red"
              >
                Advertise off
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea sx={{ height: "100%" }}>
      <Table sx={{ minWidth: 800 }} verticalSpacing="md">
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default MyBooks;
