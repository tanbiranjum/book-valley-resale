import React from "react";
import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Menu,
  ScrollArea,
  Badge,
  Button,
} from "@mantine/core";
import {
  IconPencil,
  IconMessages,
  IconNote,
  IconMicrophone,
  IconTrash,
  IconDots,
} from "@tabler/icons";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import formatDistance from "date-fns/formatDistance";

const Rows = ({ item }) => {
  return (
    <tr key={item._id}>
      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {item.bookId.title}
            </Text>
            <Text color="dimmed" size="xs">
              {item.bookId.category.name}
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
        <Badge
          sx={{ padding: "8px" }}
          color={item.status === "pending" ? "yellow" : "green"}
        >
          {item.status}
        </Badge>
      </td>
      <td>
        <Text size="sm">$ {item.bookId.sellingPrice}</Text>
        <Text size="xs" color="dimmed">
          Rate
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <Button>Pay Now</Button>
        </Group>
      </td>
    </tr>
  );
};

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { data: books, isLoading } = useQuery(["myOrders"], () => {
    return fetch(`${process.env.REACT_APP_API_URL}/carts?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => data.data.carts);
  });

  const rows = books?.map((item) => <Rows key={item._id} item={item} />);

  return (
    <ScrollArea sx={{ height: "100%" }} type="never">
      <Table sx={{ minWidth: 800 }} verticalSpacing="md">
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default MyOrders;
