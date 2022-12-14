import React, { useState } from "react";
import {
  Dialog,
  Group,
  Button,
  TextInput,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IconCircleCheck } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import API from "../../../api/api";
import { getTokenFromLocalStorage } from "../../../utils/utils";

const DeleteUserDialogue = ({ opened, setOpened, userId }) => {
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);

  const handleDelete = (id) => {
    setVisible(true);
    return API(getTokenFromLocalStorage()).delete(`/users/${id}`);
  };

  const deleteUser = useMutation(handleDelete, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["allUsers"],
      });

      setVisible(false);

      showNotification({
        title: "Success",
        message: "User deleted successfully",
        color: "green",
        icon: <IconCircleCheck />,
      });
    },
  });
  return (
    <Dialog
      opened={opened}
      withCloseButton
      onClose={() => setOpened(false)}
      size="lg"
      radius="md"
    >
      <LoadingOverlay visible={visible} />
      <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
        Are you sure you want to delete this user?
      </Text>

      <Group align="center">
        <Button
          color="red"
          onClick={() => {
            deleteUser.mutate(userId);
          }}
        >
          Delete
        </Button>
        <Button onClick={() => setOpened(false)}>Cancel</Button>
      </Group>
    </Dialog>
  );
};

export default DeleteUserDialogue;
