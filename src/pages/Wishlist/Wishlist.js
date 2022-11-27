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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import formatDistance from "date-fns/formatDistance";

const Rows = ({ item }) => {
  const queryClient = useQueryClient();
  const handleDeleteFromWishlist = () => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/wishlists/${item.bookId._id}`,
      {
        method: "DELETE",
      }
    );
  };

  const mutateDeleteWishlist = useMutation(handleDeleteFromWishlist, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myWishlist"],
      });
    },
  });
  return (
    <tr key={item._id}>
      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {item.bookId.title}
              {console.log(item.bookId)}
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
          color={item.bookId.status === "pending" ? "yellow" : "green"}
        >
          {item.bookId.condition}
        </Badge>
      </td>
      <td>
        <Badge
          sx={{ padding: "8px" }}
          color={item.bookId.status === "pending" ? "yellow" : "green"}
        >
          {`Book Used: ${item.bookId.useOfYears}`}
        </Badge>
      </td>
      <td>
        <Text size="sm">$ {item.bookId.sellingPrice}</Text>
        <Text size="xs" color="dimmed">
          Rate
        </Text>
      </td>
      <td>
        <ActionIcon
          onClick={() => {
            mutateDeleteWishlist.mutate();
          }}
        >
          <IconTrash color="red" />
        </ActionIcon>
      </td>
    </tr>
  );
};

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const { data: wishlists, isLoading } = useQuery(["myWishlist"], () => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/wishlists?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => data.data.wishlist);
  });

  const rows = wishlists?.map((item) => <Rows key={item._id} item={item} />);

  return (
    <ScrollArea sx={{ height: "100%" }} type="never">
      {console.log(wishlists)}
      <Table sx={{ minWidth: 800 }} verticalSpacing="md">
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default Wishlist;
