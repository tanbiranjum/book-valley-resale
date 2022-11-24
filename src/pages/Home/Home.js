import { Container, Grid } from "@mantine/core";
import React from "react";
import BookCard from "../../components/BookCard/BookCard";
import Button from "../../components/Button/Button";
import CategorySection from "../../components/CategorySection/CategorySection";
import HeroHeader from "../../components/HeroHeader/HeroHeader";

const Home = () => {
  return (
    <div>
      <HeroHeader />
      <CategorySection />
      <Container size="xl" sx={{ marginTop: "40px" }}>
        <Grid gutter="md">
          <Grid.Col xs={3}>
            <BookCard />
          </Grid.Col>
          <Grid.Col xs={3}>
            <BookCard />
          </Grid.Col>
          <Grid.Col xs={3}>
            <BookCard />
          </Grid.Col>
          <Grid.Col xs={3}>
            <BookCard />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
