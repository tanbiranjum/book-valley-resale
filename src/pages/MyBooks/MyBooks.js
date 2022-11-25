import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Menu,
  ScrollArea,
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

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);

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
        <Text size="sm">{item.email}</Text>
        <Text size="xs" color="dimmed">
          Email
        </Text>
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
              <Menu.Item icon={<IconMessages size={16} stroke={1.5} />}>
                Send message
              </Menu.Item>
              <Menu.Item icon={<IconNote size={16} stroke={1.5} />}>
                Add note
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
