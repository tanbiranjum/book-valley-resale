import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
  Container,
  ThemeIcon,
} from "@mantine/core";
import {
  IconCreditCard,
  IconBuildingBank,
  IconRepeat,
  IconReceiptRefund,
  IconReceipt,
  IconReceiptTax,
  IconCategory,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const mockdata = [
  { title: "Fiction", icon: IconCreditCard, color: "violet" },
  { title: "Non Fiction", icon: IconBuildingBank, color: "indigo" },
  { title: "Novel", icon: IconRepeat, color: "blue" },
  { title: "History", icon: IconReceiptRefund, color: "green" },
  { title: "Humor", icon: IconReceipt, color: "teal" },
  { title: "Comic", icon: IconReceiptTax, color: "cyan" },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  link: {
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: `${theme.shadows.md} !important`,
      transform: "scale(1.05)",
    },
  },
}));

const CategorySection = () => {
  const { classes, theme } = useStyles();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data.categories);
      });
  }, []);

  const items = categories.map((item) => (
    <UnstyledButton
      onClick={() => navigate(`/category/${item.name.toLowerCase()}`, { state: item })}
      key={item._id}
      className={classes.item}
    >
      <ThemeIcon
        size="lg"
        variant="gradient"
        gradient={{ from: "pink", to: "yellow", deg: 60 }}
      >
        <IconCategory color={theme.colors.gray[1]} size="20px" />
      </ThemeIcon>
      <Text size="sm" weight="500" mt={7}>
        {item.name}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Container size="xl" mt="md">
      <Card withBorder radius="md" className={classes.card}>
        <Group position="apart">
          <Text size="lg" className={classes.title}>
            Category
          </Text>
          <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
            Choose your category
          </Anchor>
        </Group>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>
      </Card>
    </Container>
  );
};

export default CategorySection;
