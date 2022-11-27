import React from "react";
import {
  Grid,
  Box,
  NavLink,
  Container,
  Text,
  TextInput,
  Code,
  createStyles,
  Divider,
} from "@mantine/core";
import {
  IconGauge,
  IconFingerprint,
  IconActivity,
  IconChevronRight,
  IconCategory,
  IconSearch,
} from "@tabler/icons";
import BookCard from "../../components/BookCard/BookCard";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useCategory from "../../hooks/UseCategory/useCategory";

const data = [
  { icon: IconGauge, label: "Dashboard", description: "Item with description" },
  {
    icon: IconFingerprint,
    label: "Security",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
  },
  { icon: IconActivity, label: "Activity" },
];

const useStyles = createStyles((theme) => ({
  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },
}));

const Category = () => {
  const { categoryId } = useParams();
  const categoies = useCategory();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { data, isLoading, error } = useQuery(["books", categoryId], () => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/books/category/${categoryId}`
    )
      .then((res) => res.json())
      .then((data) => data.data.books);
  });

  return (
    <Container size="xl">
      <Grid mt="lg">
        <Grid.Col xs={3}>
          <Box
            sx={(theme) => ({
              border: `1px solid ${theme.colors.gray[3]}`,
              padding: "20px",
            })}
          >
            <TextInput
              placeholder="Search"
              size="xs"
              icon={<IconSearch size={12} stroke={1.5} />}
              description={
                <Text weight="500" size="sm">
                  Search for books by title
                </Text>
              }
              rightSectionWidth={70}
              rightSection={
                <Code className={classes.searchCode}>Ctrl + K</Code>
              }
              styles={{ rightSection: { pointerEvents: "none" } }}
              mb="lg"
            />
            <Divider />
            <Text weight={600} ml="md" mb="sm" mt="lg">
              Category
            </Text>
            {categoies?.map((item, index) => (
              <NavLink
                //   key={item.label}
                active={item._id === categoryId}
                label={item.name}
                icon={<IconCategory size={16} stroke={1.5} color="blue" />}
                onClick={() => navigate(`/category/${item._id}`)}
                color="cyan"
                sx={(theme) => ({
                  borderBottom: `1px solid ${theme.colors.gray[2]}`,
                })}
              />
            ))}
          </Box>
        </Grid.Col>
        <Grid.Col xs={9}>
          <Grid gutter="md">
            {data?.map((item) => (
              <Grid.Col xs={4}>
                <BookCard item={item} key={item._id} />
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Category;
