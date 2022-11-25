import { useEffect, useState } from "react";
import { createStyles, Navbar, Group, Code } from "@mantine/core";
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
import { Link } from "react-router-dom";

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

const admin = [
  { link: "/dashboard/all-users", label: "All Users", icon: IconUsers },
  { link: "/dashboard/all-sellers", label: "All Sellers", icon: IconUser },
  { link: "/dashboard/all-buyers", label: "All Buyers", icon: IconUser },
];

const Sidebar = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");
  const [data, setData] = useState([]);

  useEffect(() => {
    let decoded = jwt_decode(getTokenFromLocalStorage());
    if (decoded.role === "buyer") {
      setData(buyer);
    } else if (decoded.role === "admin") {
      setData(admin);
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
    <Navbar sx={{ height: "100vh" }} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          Book Valley
          <Code className={classes.version}>v3.1.2</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
