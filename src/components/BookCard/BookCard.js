import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
} from "@mantine/core";
import {
  IconGauge,
  IconManualGearbox,
  IconUsers,
  IconLocation,
  IconCircleCheck,
} from "@tabler/icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import WishButton from "../WishButton/WishButton";
import formatDistance from "date-fns/formatDistance";
import { useNavigate } from "react-router-dom";
import useRole from "../../hooks/UseRole/useRole";

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
  },
}));

const BookCard = ({ item }) => {
  const { classes } = useStyles();
  const [showCheckout, setShowCheckout] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [role] = useRole();

  const mockdata = [
    { label: item.author, icon: IconUsers },
    { label: item.useOfYears, icon: IconGauge },
    { label: item.location, icon: IconLocation },
  ];

  const handleCheckout = () => {
    if (user) {
      if (role === "seller" || role === "admin") {
        alert("You are not allowed to buy your own book");
        return;
      }
      setShowCheckout(true);
    } else {
      navigate("/login");
    }
  };

  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size={18} className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

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
            <div>
              <Text weight={500}>{item.title}</Text>
              <Text size="xs" color="dimmed">
                {item.description}
              </Text>
            </div>
            {user && role === "buyer" && <WishButton bookId={item._id} />}
          </div>
        </Group>

        <Card.Section className={classes.section}>
          <Badge variant="outline">
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
            <Text
              color="cyan"
              weight="500"
              sx={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              {item.seller.displayName}{" "}
              {item.seller.isVerified && (
                <IconCircleCheck color="blue" size="18" />
              )}
            </Text>
            {` Posted ${formatDistance(
              new Date(item.createdAt),
              new Date()
            )} ago`}
          </Text>
        </Card.Section>

        <Card.Section className={classes.section} mt="md">
          <Text size="sm" color="dimmed" className={classes.label}>
            {item.category.name}
          </Text>

          <Group spacing={8} mb={-8}>
            {features}
          </Group>
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
            <Button radius="xl" style={{ flex: 1 }} onClick={handleCheckout}>
              Book now
            </Button>
          </Group>
        </Card.Section>
      </Card>
      {user?.email && (
        <CheckoutForm
          showCheckout={showCheckout}
          setShowCheckout={setShowCheckout}
          book={item}
        />
      )}
    </>
  );
};

export default BookCard;
