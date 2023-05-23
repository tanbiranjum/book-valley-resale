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

import { IconCategory, IconSearch } from "@tabler/icons";

import BookCard from "../../components/BookCard/BookCard";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useCategory from "../../hooks/UseCategory/useCategory";
import SkeletonLoader from "../../components/Skeleton/Skeleton";
import API from "../../api/api";

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
  const categoies = useCategory();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { classes } = useStyles();
  const { data, isLoading, error } = useQuery(["books", state._id], () => {
    return API()
      .get(`/books?category=${state._id}`)
      .then((res) => res.data.data.books);
  });

  return (
    <Container
      size="xl"
      sx={{
        paddingTop: "4rem",
      }}
    >
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
                key={index}
                active={item._id === state._id}
                label={item.name}
                icon={<IconCategory size={16} stroke={1.5} color="blue" />}
                onClick={() =>
                  navigate(`/category/${item.name.toLowerCase()}`, { state: item })
                }
                color="cyan"
                sx={(theme) => ({
                  borderBottom: `1px solid ${theme.colors.gray[2]}`,
                })}
              />
            ))}
          </Box>
        </Grid.Col>
        <Grid.Col xs={9}>
          {isLoading && <SkeletonLoader />}
          {data?.length === 0 && (
            <Text size="xl" weight="bold">
              No Books in this category
            </Text>
          )}
          <Grid gutter="md">
            {data?.map((item) => (
              <Grid.Col xs={12} sm={6} md={4} lg={4} key={item._id}>
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
