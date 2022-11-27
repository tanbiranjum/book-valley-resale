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
} from "@mantine/core";
import {
  IconPencil,
  IconCircleCheck,
  IconMicrophone,
  IconTrash,
  IconDots,
} from "@tabler/icons";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import formatDistance from "date-fns/formatDistance";
import { showNotification } from "@mantine/notifications";

const ProductRow = ({ item }) => {
  const queryClient = useQueryClient();

  const handleAdvertise = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAdvertise: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  };

  const changeAdvertiseStatus = useMutation(handleAdvertise, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["myBooks"],
      });

      showNotification({
        title: "Success",
        message: "Book advertised successfully",
        color: "green",
        icon: <IconCircleCheck />,
      });
    },
  });
  return (
    <tr key={item._id}>
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
        <Badge
          sx={{ padding: "8px" }}
          color={item.status === "available" ? "green" : "red"}
        >
          {item.status}
        </Badge>
      </td>
      <td>
        <Badge
          sx={{ padding: "8px" }}
          color={item.isAdvertise ? "blue" : "orange"}
        >
          {item.isAdvertise ? "Advertised" : "Not Advertised"}
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
            <IconPencil size={16} stroke={1.5} color="red" />
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
                disabled={item.status === "sold"}
                onClick={() => changeAdvertiseStatus.mutate(item._id)}
              >
                {item.isAdvertise ? "Remove from advertise" : "Advertise"}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  );
};

export default ProductRow;
