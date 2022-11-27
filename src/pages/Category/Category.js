import React from "react";
import { Grid, Box, NavLink, Container } from "@mantine/core";
import {
  IconGauge,
  IconFingerprint,
  IconActivity,
  IconChevronRight,
} from "@tabler/icons";
import BookCard from "../../components/BookCard/BookCard";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const data = [
  { icon: IconGauge, label: "Dashboard", description: "Item with description" },
  {
    icon: IconFingerprint,
    label: "Security",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
  },
  { icon: IconActivity, label: "Activity" },
];

const Category = () => {
  const { categoryId } = useParams();
  const { data, isLoading, error } = useQuery(["books"], () => {
    return fetch(
      `${process.env.REACT_APP_API_URL}/books/category/${categoryId}`
    )
      .then((res) => res.json())
      .then((data) => data.data.books);
  });

  return (
    <Container size="lg">
      <Grid mt="lg">
        <Grid.Col xs={2}>
          <NavLink
            //   key={item.label}
            //   active={index === active}
            label="Hello"
            //   description={item.description}
            //   rightSection={item.rightSection}
            icon={<IconActivity size={16} stroke={1.5} />}
            //   onClick={() => setActive(index)}
            color="cyan"
          />
        </Grid.Col>
        <Grid.Col xs={10}>
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
