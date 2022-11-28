import { Skeleton, Grid } from "@mantine/core";

const SkeletonLoader = () => {
  return (
    <Grid gutter="md">
      <Grid.Col xs={12} sm={6} md={4} lg={3}>
        <Skeleton height={50} radius="sm" mb="xl" />
        <Skeleton height={25} width="70%" radius="sm" />
        <Skeleton height={25} mt={6} width="95%" radius="sm" />
        <Skeleton height={25} mt={6} radius="sm" />
        <Skeleton height={25} mt={6} width="90%" radius="sm" />
      </Grid.Col>
      <Grid.Col xs={12} sm={6} md={4} lg={3}>
        <Skeleton height={50} radius="sm" mb="xl" />
        <Skeleton height={25} width="70%" radius="sm" />
        <Skeleton height={25} mt={6} width="95%" radius="sm" />
        <Skeleton height={25} mt={6} radius="sm" />
        <Skeleton height={25} mt={6} width="90%" radius="sm" />
      </Grid.Col>
      <Grid.Col xs={12} sm={6} md={4} lg={3}>
        <Skeleton height={50} radius="sm" mb="xl" />
        <Skeleton height={25} width="70%" radius="sm" />
        <Skeleton height={25} mt={6} width="95%" radius="sm" />
        <Skeleton height={25} mt={6} radius="sm" />
        <Skeleton height={25} mt={6} width="90%" radius="sm" />
      </Grid.Col>
      <Grid.Col xs={12} sm={6} md={4} lg={3}>
        <Skeleton height={50} radius="sm" mb="xl" />
        <Skeleton height={25} width="70%" radius="sm" />
        <Skeleton height={25} mt={6} width="95%" radius="sm" />
        <Skeleton height={25} mt={6} radius="sm" />
        <Skeleton height={25} mt={6} width="90%" radius="sm" />
      </Grid.Col>
      <Grid.Col xs={12} sm={6} md={4} lg={3}>
        <Skeleton height={50} radius="sm" mb="xl" />
        <Skeleton height={25} width="70%" radius="sm" />
        <Skeleton height={25} mt={6} width="95%" radius="sm" />
        <Skeleton height={25} mt={6} radius="sm" />
        <Skeleton height={25} mt={6} width="90%" radius="sm" />
      </Grid.Col>
      <Grid.Col xs={12} sm={6} md={4} lg={3}>
        <Skeleton height={50} radius="sm" mb="xl" />
        <Skeleton height={25} width="70%" radius="sm" />
        <Skeleton height={25} mt={6} width="95%" radius="sm" />
        <Skeleton height={25} mt={6} radius="sm" />
        <Skeleton height={25} mt={6} width="90%" radius="sm" />
      </Grid.Col>
    </Grid>
  );
};

export default SkeletonLoader;
