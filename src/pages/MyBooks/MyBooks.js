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
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ProductRow from "../../components/ProductRow/ProductRow";
import {
  getTokenFromLocalStorage,
  getUserIdFromLocalStorage,
} from "../../utils/utils";
import API from "./../../api/api";

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const { data: books, isLoading } = useQuery(["myBooks"], () => {
    return API(getTokenFromLocalStorage())
      .get(`/books/seller/${getUserIdFromLocalStorage()}`)
      .then((res) => res.data.data.books);
  });

  const rows = books?.map((item) => <ProductRow key={item._id} item={item} />);

  return (
    <ScrollArea sx={{ height: "100%" }} type="never">
      <Table sx={{ minWidth: 800 }} verticalSpacing="md">
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default MyBooks;
