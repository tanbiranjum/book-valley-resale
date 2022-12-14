import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { IconBrandGoogle, IconBrandGithub } from "@tabler/icons";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail, registerUser } from "../../auth/auth";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import {
  setTokenInLocalStorage,
  setUserIdInLocalStorage,
} from "../../utils/utils";
import {} from "firebase/auth";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 700,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const Login = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { user, login, googleLogin, githubLogin } = useContext(AuthContext);

  // If user is logged in, sign a token and navigate to home page
  const onSubmit = (data) => {
    setVisible(true);
    login(data.email, data.password)
      .then((userCredential) => {
        setError("");
        getUserByEmail(data.email).then((data) => {
          const userId = data.data.user._id;
          getTokenAndNavigate(
            {
              email: data.data.user.email,
              role: data.data.user.role,
            },
            userId
          );
        });
      })
      .catch((error) => {
        setError(handleError(error.code));
        setVisible(false);
      });
  };

  const handleError = (error) => {
    switch (error) {
      case "auth/user-not-found":
        return "User not found";
      case "auth/wrong-password":
        return "Wrong password";
      default:
        return "Something went wrong";
    }
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((userCredential) => {
        setError("");
        const { email, photoURL, displayName } = userCredential.user;
        getUserByEmail(email).then((data) => {
          let userId;
          if (data.data.user) {
            userId = data.data.user._id;
            getTokenAndNavigate({ email, role: data.data.user.role }, userId);
            return;
          } else {
            setError("There is no user with this email");
          }
          registerUser({ displayName, photoURL, email }).then((data) => {
            userId = data.data.user._id;
            getTokenAndNavigate({ email, role: data.data.user.role }, userId);
          });
        });
      })
      .catch((error) => {
        setError(handleError(error.code));
      });
  };

  // Get token from server and navigate to home page
  const getTokenAndNavigate = (data, userId) => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setVisible(false);
        setUserIdInLocalStorage(userId);
        setTokenInLocalStorage(data.token);
        navigate("/");
      })
      .catch((error) => {
        setVisible(false);
      });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <LoadingOverlay visible={visible} overlayBlur={2} />
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={20}
        >
          Welcome back to Book Valley!
        </Title>

        <Group grow mb="md" mt="md">
          <Button
            radius="xs"
            variant="light"
            leftIcon={<IconBrandGoogle />}
            onClick={handleGoogleLogin}
          >
            Google
          </Button>
        </Group>
        <Text color="red" weight="bold">
          {error}
        </Text>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...form.getInputProps("password")}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button
            fullWidth
            mt="xl"
            size="md"
            type="submit"
            //   onClick={() => setVisible((v) => !v)}
          >
            Login
          </Button>
        </form>

        <Text align="center" mt="md">
          Don&apos;t have an account?{" "}
          <Link
            style={{
              textDecoration: "none",
            }}
            to="/register"
            weight={700}
          >
            Register
          </Link>
        </Text>
      </Paper>
    </div>
  );
};

export default Login;
