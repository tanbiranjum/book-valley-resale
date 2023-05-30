import React, { useEffect } from "react";

import {
  Grid,
  Box,
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

import { IconSearch, IconAdjustmentsHorizontal } from "@tabler/icons";

import BookCard from "../../components/BookCard/BookCard";
import SkeletonLoader from "../../components/Skeleton/Skeleton";
import { useParams } from "react-router-dom";
import useFetchBooks from "../../hooks/UseFetchBooks/useFetchBooks";
import CategorySidebar from "../../components/CategorySidebar/CategorySidebar";

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
  const { classes } = useStyles();

  const { data, isLoading, setCategory, setCondition, condition } =
    useFetchBooks({
      category: categoryId || undefined,
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
            {/* Category Sidebar */}
            <CategorySidebar
              categoryId={categoryId}
              setCategory={setCategory}
            />
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
                onChange={(value) => {
                  setCondition(value);
                }}
                value={condition}
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
                  setCondition("");
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
