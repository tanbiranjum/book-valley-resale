import React, { useEffect } from "react";

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
  Menu,
  Button,
  Select,
  Space,
  SegmentedControl,
} from "@mantine/core";

import {
  IconCategory,
  IconSearch,
  IconAdjustmentsHorizontal,
} from "@tabler/icons";

import BookCard from "../../components/BookCard/BookCard";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
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
  const categories = useCategory();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { classes } = useStyles();
  const [query, setQuery] = React.useState({
    state: false,
    condition: "",
    sort: false,
  });

  const fetchBooks = async () => {
    const result = await API().get(
      `/books?category=${categoryId}&${queryBuilder()}`
    );
    return result.data.data.books;
  };

  const { data, isLoading, error, refetch } = useQuery(
    ["books", categoryId, query.condition, query.sort],
    fetchBooks,
    {
      cacheTime: 50000,
    }
  );

  const queryBuilder = () => {
    const searchParams = new URLSearchParams();
    if (query.condition) {
      searchParams.append("condition", query.condition);
    }
    if (query.sort) {
      searchParams.append("sort", query.sort);
    }
    return searchParams.toString();
  };

  const handleConditionChange = (value) => {
    setQuery({ ...query, condition: value });
  };

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
            {categories?.map((item, index) => (
              <NavLink
                key={index}
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
          <Menu position="bottom-start">
            <Menu.Target>
              <Button
                variant="outline"
                color="blue"
                leftIcon={<IconAdjustmentsHorizontal />}
              >
                Filter
              </Button>
            </Menu.Target>
            <Menu.Dropdown sx={{ padding: "8px" }}>
              <Select
                label="Book Condition"
                placeholder="Pick one"
                onChange={handleConditionChange}
                value={query.condition}
                data={[
                  { value: "used", label: "Used" },
                  { value: "new", label: "New" },
                ]}
              />
              <Space h="sm" />
              <Text weight={600} size="sm">
                Price
              </Text>
              <SegmentedControl
                data={[
                  { label: "Lowest to Highest", value: "react" },
                  { label: "Highest to Lowest", value: "ng" },
                ]}
              />
              <br />
              <Button
                variant="outline"
                color="blue"
                sx={{ marginTop: "8px" }}
                onClick={() => {
                  setQuery({
                    ...query,
                    condition: "",
                    sort: false,
                  });
                }}
              >
                Reset
              </Button>
            </Menu.Dropdown>
          </Menu>
          <Space h="md" />
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
