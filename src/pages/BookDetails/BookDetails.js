import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Text,
  createStyles,
} from "@mantine/core";
import { IconCircleCheck, IconGauge, IconLocation } from "@tabler/icons";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import formatDistance from "date-fns/formatDistance";
import CheckoutButton from "../../components/Button/CheckoutButton";
import ReactImageMagnify from "react-image-magnify";
import WishButton from "../../components/WishButton/WishButton";

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

  return (
    <Container size="xl" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <Grid gutter={60}>
        <Grid.Col xs={12} md={6}>
          {book?.photo && (
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: book?.photo,
                },
                largeImage: {
                  src: book?.photo,
                  width: 1200,
                  height: 1800,
                },
                enlargedImageContainerDimensions: {
                  width: "100%",
                  height: "100%",
                },
                enlargedImageContainerStyle: {
                  zIndex: 9999,
                },
              }}
            />
          )}
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
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
              {book?.createdAt &&
                formatDistance(new Date(book.createdAt), new Date())}{" "}
              ago
            </Text>
          </Flex>
          <Flex gap={5} align="center" sx={{ marginTop: "16px" }}>
            <Text size="xl" weight="bold">
              {book?.title}
            </Text>
            {book?._id && <WishButton bookId={book?._id} />}
          </Flex>
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
          <Flex gap={20} mt="md" align="center" sx={{ marginTop: "24px" }}>
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
          <Box sx={{ marginTop: "24px" }}>
            {book && <CheckoutButton book={book} />}
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default BookDetails;
