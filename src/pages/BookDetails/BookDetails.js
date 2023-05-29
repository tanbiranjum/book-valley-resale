import {
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Text,
  createStyles,
} from "@mantine/core";
import {
  IconCircleCheck,
  IconGauge,
  IconUsers,
  IconLocation,
} from "@tabler/icons";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import formatDistance from "date-fns/formatDistance";

const useStyles = createStyles((theme) => ({
  textIcon: {
    color: theme.colors.green[6],
    display: "flex",
    alignItems: "center",
    gap: 5,
  },

  icon: {
    marginRight: 5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = React.useState({});
  const { classes } = useStyles();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/books/${bookId}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data.data.book);
        console.log(data.data.book);
      });
  }, []);

  //   const mockdata = [
  //     { label: book?.author, icon: IconUsers },
  //     { label: book?.useOfYears, icon: IconGauge },
  //     { label: book?.location, icon: IconLocation },
  //   ];

  //   const features = mockdata.map((feature) => (
  //     <Center key={feature.label}>
  //       <feature.icon size={18} className={classes.icon} stroke={1.5} />
  //       <Text size="xs">{feature.label}</Text>
  //     </Center>
  //   ));

  return (
    <Container size="xl" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <Grid gutter="xl">
        <Grid.Col xs={12} md={6}>
          <img src={book?.photo} alt={book?.title} style={{ width: "100%" }} />
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          {/* i will put a text and icon of verified seller */}
          <Flex>
            {book.seller?.isVerified && (
              <Text
                size="xs"
                weight="bold"
                color="green"
                className={classes.textIcon}
              >
                Verified Seller
                <IconCircleCheck size="18" />
              </Text>
            )}
            <Text size="xs" weight="bold" color="gray" ml="sm">
              Posted by {book?.seller?.displayName}{" "}
              {formatDistance(new Date(book.createdAt), new Date())} ago
            </Text>
          </Flex>
          <Text size="xl" weight="bold">
            {book?.title}
          </Text>
          <Flex gap={5}>
            <Text size="sm" weight="bold" color="gray">
              Author: {book?.author}
            </Text>
            <Text size="sm" weight="bold" color="gray" ml="sm">
              Category: {book?.category?.name}
            </Text>
          </Flex>
          <Text sx={{ marginTop: "16px" }}>
            Description: {book?.description}
          </Text>
          <div style={{ marginTop: "16px" }}>
            <Text
              size="sm"
              weight="bold"
              color="gray"
              className={classes.textIcon}
            >
              <IconGauge size="18" className={classes.icon} stroke={1.5} />
              Year of Usage: {book?.useOfYears}
            </Text>
            <Text
              size="sm"
              weight="bold"
              color="gray"
              className={classes.textIcon}
            >
              <IconLocation size="18" className={classes.icon} stroke={1.5} />
              Location: {book?.location}
            </Text>
          </div>
          <Flex gap={20} mt="md" align="center">
            <div>
              <Text
                strikethrough="true"
                size="xl"
                weight={700}
                sx={{ lineHeight: 1 }}
              >
                $ {book?.originalPrice}
              </Text>
              <Text
                size="sm"
                color="dimmed"
                weight={500}
                sx={{ lineHeight: 1 }}
                mt={3}
              >
                Original Price
              </Text>
            </div>
            <div>
              <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                $ {book?.sellingPrice}
              </Text>
              <Text
                size="sm"
                color="dimmed"
                weight={500}
                sx={{ lineHeight: 1 }}
                mt={3}
              >
                Resell Price
              </Text>
            </div>
          </Flex>
          <Flex gap={20} mt="md" align="center">
            <Text size="sm" weight="bold" color="black">
              Condition
            </Text>
            <div>
              <Button.Group>
                <Button
                  variant={book?.condition === "used" ? "filled" : "outline"}
                  color={book?.condition === "used" ? "teal" : "gray"}
                >
                  Used
                </Button>
                <Button
                  variant={book?.condition === "new" ? "filled" : "outline"}
                  color={book?.condition === "new" ? "teal" : "gray"}
                >
                  New
                </Button>
              </Button.Group>
            </div>
          </Flex>
        </Grid.Col>
      </Grid>
      <h1>Book Details</h1>
      {JSON.stringify(book)}
    </Container>
  );
};

export default BookDetails;

// {"_id":"6384bec5a4d2c7696ec278b6","title":"It Starts With You","author":"Kamal Hasan","photo":"https://i.ibb.co/h70kNNc/Small-Pv-Free-BOOK-COVER-MOCKUP.jpg","category":{"_id":"637f7fd8a51c5f0238b1f019","name":"Fiction","__v":0},"location":"Florida, United States","description":"Fresh new copy","originalPrice":700,"sellingPrice":500,"useOfYears":"2-3","seller":{"_id":"63836344cd62635d8ee974da","displayName":"John Doe","photoURL":"https://i.ibb.co/6vGvpHH/profile.jpg","email":"tanbiranjum@hotmail.com","role":"seller","isVerified":true,"__v":0},"condition":"new","status":"available","isAdvertise":true,"createdAt":"2022-11-28T13:59:33.318Z","__v":0,"discount":"29","id":"6384bec5a4d2c7696ec278b6"}
