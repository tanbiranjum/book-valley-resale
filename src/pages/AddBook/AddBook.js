import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Select,
  Container,
  Group,
  Button,
  FileInput,
  Flex,
  LoadingOverlay,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { showNotification } from "@mantine/notifications";
import { IconCircleCheck, IconCross } from "@tabler/icons";
import { getUserIdFromLocalStorage } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [categories, setCategories] = useState([]);
  const [uploadImage, setUploadImage] = useState();
  const [visible, setVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
      author: "",
      description: "",
      location: "",
      category: "",
      condition: "",
      useOfYears: "",
      originalPrice: "",
      sellingPrice: "",
    },
  });

  const handleSubmit = (data) => {
    setVisible(true);
    const formValue = data;
    const formData = new FormData();
    formData.append("image", uploadImage);

    fetch(
      "https://api.imgbb.com/1/upload?key=084083c36347f187e5b7f184e97644bd",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const photo = data.data.display_url;
        formValue.photo = photo;
        formValue.seller = getUserIdFromLocalStorage();
        handleSaveBook(formValue);
        form.reset();
      });
  };

  const handleSaveBook = (data) => {
    fetch(`${process.env.REACT_APP_API_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        showNotification({
          title: "Book Added Successfully",
          message: "Your book has been added successfully",
          color: "green",
          icon: <IconCircleCheck />,
        });
        setVisible(false);
        navigate("/dashboard/my-books");
      })
      .catch((err) => {
        showNotification({
          title: "Oops!",
          message: "Something went wrong",
          color: "red",
          icon: <IconCross />,
        });
        setVisible(false);
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.categories);
        setCategories(data.data.categories);
      });
  }, []);

  return (
    <Container my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Fill out all the information!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoadingOverlay visible={visible} />
          <TextInput
            label="Title"
            placeholder="Book title"
            required
            {...form.getInputProps("title")}
          />
          <TextInput
            label="Author"
            placeholder="Author name"
            required
            mt="sm"
            {...form.getInputProps("author")}
          />
          <FileInput
            label="Upload Image"
            placeholder="Upload files"
            accept="image/png,image/jpeg"
            required
            mt="sm"
            onChange={(image) => {
              setUploadImage(image);
            }}
          />
          <TextInput
            label="Location"
            placeholder="California, United States"
            required
            mt="sm"
            {...form.getInputProps("location")}
          />
          <Flex gap="md" mt="sm">
            <TextInput
              label="Original Price"
              placeholder="old price"
              required
              sx={{ width: "50%" }}
              {...form.getInputProps("originalPrice")}
            />
            <TextInput
              label="Sell Price"
              placeholder="sell price"
              required
              sx={{ width: "50%" }}
              {...form.getInputProps("sellingPrice")}
            />
          </Flex>
          <TextInput
            label="Description"
            placeholder="description"
            required
            mt="sm"
            {...form.getInputProps("description")}
          />
          <Flex gap="md" mt="sm">
            <Select
              label="Category"
              placeholder="Pick one"
              required
              data={categories?.map((item) => ({
                value: item._id,
                label: item.name,
              }))}
              sx={{ width: "33%" }}
              {...form.getInputProps("category")}
            />
            <Select
              label="Use of Years"
              placeholder="Choose one"
              required
              data={[
                { value: "less than 1 year", label: "Less than 1 year" },
                { value: "1-2", label: "1 to 2 years" },
                { value: "2-3", label: "2 to 3 years" },
                { value: "3-4", label: "3 to 4 years" },
                { value: "4-5", label: "4 to 5 years" },
                { value: "5+", label: "More than 5 years" },
              ]}
              sx={{ width: "33%" }}
              {...form.getInputProps("useOfYears")}
            />
            <Select
              label="Condition"
              placeholder="Choose one"
              required
              data={[
                { value: "used", label: "Used" },
                { value: "new", label: "New" },
              ]}
              sx={{ width: "33%" }}
              {...form.getInputProps("condition")}
            />
          </Flex>
          <Button fullWidth mt="xl" type="submit">
            Add Book
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddBook;
