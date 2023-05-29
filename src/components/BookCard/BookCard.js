import { Card, Image, Text, Group, Badge, createStyles } from "@mantine/core";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import WishButton from "../WishButton/WishButton";
import formatDistance from "date-fns/formatDistance";
import { Link } from "react-router-dom";
import useRole from "../../hooks/UseRole/useRole";
import CheckoutButton from "../Button/CheckoutButton";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    height: "100%",
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: 5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },

  docContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: theme.spacing.sm,
  },
}));

const BookCard = ({ item }) => {
  const { classes } = useStyles();
  const { user } = useContext(AuthContext);
  const [role] = useRole();

  return (
    <>
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.imageSection}>
          <Image
            src={item.photo}
            alt="Tesla Model S"
            height={200}
            style={{
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
        </Card.Section>

        <Group position="apart" mt="md">
          <div className={classes.docContainer}>
            <Link to={`/book/${item._id}`}>
              <Text weight={500}>{item.title}</Text>
            </Link>
            {/* <Text size="xs" color="dimmed">
                {item.description}
              </Text> */}
            {user && role === "buyer" && <WishButton bookId={item._id} />}
          </div>
        </Group>

        <Card.Section className={classes.section}>
          <Badge variant="filled" color="green">
            {(
              ((item.originalPrice * 1 - item.sellingPrice * 1) /
                (item.originalPrice * 1)) *
              100
            ).toFixed(0)}
            % off
          </Badge>
          <Badge variant="outline" sx={{ marginLeft: "8px" }}>
            {item.condition === "new" ? "New" : "Used"}
          </Badge>
          <br />
          <Text mt="sm" size="sm" weight="400">
            {` Posted ${formatDistance(
              new Date(item.createdAt),
              new Date()
            )} ago`}
          </Text>
        </Card.Section>
        <Card.Section className={classes.section}>
          <Group spacing={30}>
            <div>
              <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                $ {item.sellingPrice}
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
            <CheckoutButton book={item} />
          </Group>
        </Card.Section>
      </Card>
    </>
  );
};

export default BookCard;
