import { Container, Grid, Text } from "@mantine/core";
import React from "react";
import BookCard from "../../components/BookCard/BookCard";
import Button from "../../components/Button/Button";
import CategorySection from "../../components/CategorySection/CategorySection";
import HeroHeader from "../../components/HeroHeader/HeroHeader";
import { useQuery } from "@tanstack/react-query";
import SubscribeNewsletter from "./Shared/SubscribeNewsletter/SubscribeNewsletter";
import SkeletonLoader from "../../components/Skeleton/Skeleton";

const Home = () => {
  const { data, isLoading, error } = useQuery(["books"], () =>
    fetch(`${process.env.REACT_APP_API_URL}/books`)
      .then((res) => res.json())
      .then((data) => data.data.books)
  );
  return (
    <div>
      <HeroHeader />
      <CategorySection />
      <Container size="xl" sx={{ marginTop: "40px" }}>
        <Text size="lg" weight="bold" mb="md">
          Book On Sale
        </Text>
        {isLoading && <SkeletonLoader />}
        {data?.length === 0 && (
          <Text
            size="xl"
            weight="bold"
            sx={{
              textAlign: "center",
              fontSize: "2rem",
            }}
          >
            No Book On Sale!
          </Text>
        )}
        <Grid gutter="md" mt="lg">
          {data?.map((item) => (
            <Grid.Col xs={12} sm={6} md={4} lg={3} key={item._id}>
              <BookCard item={item} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
      <Container size="xl" mt="md">
        <SubscribeNewsletter />
      </Container>
    </div>
  );
};

export default Home;
