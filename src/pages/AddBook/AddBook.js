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
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const AddBook = () => {
  const [categories, setCategories] = useState([]);
  const [uploadImage, setUploadImage] = useState();
  const { user } = useContext(AuthContext);

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
        formValue.seller = user.email;
        handleSaveBook(formValue);
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
        alert("Book added successfully");
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
            {...form.getInputProps("author")}
          />
          <FileInput
            label="Upload Image"
            placeholder="Upload files"
            accept="image/png,image/jpeg"
            // TODO
            // required
            onChange={(image) => {
              setUploadImage(image);
            }}
          />
          <TextInput
            label="Location"
            placeholder="California, United States"
            required
            {...form.getInputProps("location")}
          />
          <TextInput
            label="Original Price"
            placeholder="old price"
            required
            {...form.getInputProps("originalPrice")}
          />
          <TextInput
            label="Sell Price"
            placeholder="sell price"
            required
            {...form.getInputProps("sellingPrice")}
          />
          <TextInput
            label="Description"
            placeholder="description"
            required
            {...form.getInputProps("description")}
          />
          <Select
            label="Category"
            placeholder="Pick one"
            required
            data={categories?.map((item) => ({
              value: item._id,
              label: item.name,
            }))}
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
            {...form.getInputProps("condition")}
          />
          <Button fullWidth mt="xl" type="submit">
            Add Book
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddBook;
