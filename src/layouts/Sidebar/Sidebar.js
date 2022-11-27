import { useContext, useEffect, useState } from "react";
import { createStyles, Navbar, Group, Code, Avatar, Flex, Text } from "@mantine/core";
import jwt_decode from "jwt-decode";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconHeart,
  IconUsers,
  IconUser,
} from "@tabler/icons";
import { getTokenFromLocalStorage } from "../../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import Logo from "../../assets/book-logo.png";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
    },

    version: {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1
      ),
      color: theme.white,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1
      )}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1
      )}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: "filled", color: theme.primaryColor })
            .background,
          0.1
        ),
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: "filled", color: theme.primaryColor })
            .background,
          0.15
        ),
        [`& .${icon}`]: {
          opacity: 0.9,
        },
      },
    },
  };
});

const data = [
  { link: "", label: "Notifications", icon: IconBellRinging },
  { link: "", label: "Billing", icon: IconReceipt2 },
  { link: "", label: "Security", icon: IconFingerprint },
  { link: "", label: "SSH Keys", icon: IconKey },
  { link: "", label: "Databases", icon: IconDatabaseImport },
  { link: "", label: "Authentication", icon: Icon2fa },
  { link: "", label: "Other Settings", icon: IconSettings },
];

const buyer = [
  { link: "/dashboard/my-orders", label: "My Orders", icon: IconBellRinging },
  { link: "/dashboard/wishlist", label: "Wishlist", icon: IconHeart },
];

const seller = [
  { link: "/dashboard/add-book", label: "Add Book", icon: IconHeart },
  {
    link: "/dashboard/my-books",
    label: "My Books",
    icon: IconBellRinging,
  },
  { link: "/dashboard/my-buyers", label: "My Buyers", icon: IconHeart },
];

const admin = [
  { link: "/dashboard/all-users", label: "All Users", icon: IconUsers },
  { link: "/dashboard/all-sellers", label: "All Sellers", icon: IconUser },
  { link: "/dashboard/all-buyers", label: "All Buyers", icon: IconUser },
];

const Sidebar = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");
  const [data, setData] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    let decoded = jwt_decode(getTokenFromLocalStorage());
    if (decoded.role === "buyer") {
      setData(buyer);
    } else if (decoded.role === "admin") {
      setData(admin);
    } else if (decoded.role === "seller") {
      setData(seller);
    }
  }, []);

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Navbar sx={{ height: "100%" }} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Link to="/" className={classes.link}>
            <Flex align="center" gap="xs">
              <Avatar src={Logo}></Avatar>
              <Text weight="bold">Book Valley</Text>
            </Flex>
          </Link>
          <Code className={classes.version}>v3.1.2</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <div
          className={classes.link}
          onClick={handleLogout}
          style={{
            cursor: "pointer",
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </div>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
