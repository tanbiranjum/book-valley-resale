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
} from "@tabler/icons";
import { useState } from "react";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import WisthButton from "../WishButton/WishButton";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
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
}));

const BookCard = ({ item }) => {
  const { classes } = useStyles();
  const [showCheckout, setShowCheckout] = useState(false);

  const mockdata = [
    { label: item.author, icon: IconUsers },
    { label: item.useOfYears, icon: IconGauge },
    { label: item.location, icon: IconLocation },
  ];

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
          <div>
            <Text weight={500}>{item.title}</Text>
            <Text size="xs" color="dimmed">
              {item.description}
            </Text>
            <WisthButton />
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
        </Card.Section>

        <Card.Section className={classes.section} mt="md">
          <Text size="sm" color="dimmed" className={classes.label}>
            Non-Fiction
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

            <Button
              radius="xl"
              style={{ flex: 1 }}
              onClick={() => setShowCheckout(true)}
            >
              Book now
            </Button>
          </Group>
        </Card.Section>
      </Card>
      <CheckoutForm
        showCheckout={showCheckout}
        setShowCheckout={setShowCheckout}
      />
    </>
  );
};

export default BookCard;
