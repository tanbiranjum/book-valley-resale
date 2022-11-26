import { Container, Grid } from "@mantine/core";
import React from "react";
import BookCard from "../../components/BookCard/BookCard";
import Button from "../../components/Button/Button";
import CategorySection from "../../components/CategorySection/CategorySection";
import HeroHeader from "../../components/HeroHeader/HeroHeader";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data, isLoading, error } = useQuery(["books"], () =>
    fetch(`${process.env.REACT_APP_API_URL}/books`)
      .then((res) => res.json())
      .then((data) => data.data.books)
  );
  return (
    <div>
      {console.log(data)}
      <HeroHeader />
      <CategorySection />
      <Container size="xl" sx={{ marginTop: "40px" }}>
        <Grid gutter="md">
          {data?.map((item) => (
            <Grid.Col xs={3} key={item._id}>
              <BookCard item={item} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
