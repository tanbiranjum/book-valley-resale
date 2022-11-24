import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Group,
  LoadingOverlay,
  FileInput,
  Switch,
} from "@mantine/core";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { IconBrandGoogle, IconBrandGithub, IconUpload } from "@tabler/icons";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, registerUser } from "../../auth/auth";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { setTokenInLocalStorage } from "../../utils/utils";

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

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Register = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { user, login, googleLogin, githubLogin } = useContext(AuthContext);

  // If user is logged in, sign a token and navigate to home page
  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((userCredential) => {
        setError("");
        const uid = userCredential.user.uid;
        getTokenAndNavigate(uid);
      })
      .catch((error) => {
        setError(handleError(error.code));
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
        const { email, displayName } = userCredential.user;
        getUserByEmail(email).then((data) => {
          if (data.data.user) {
            getTokenAndNavigate({ email, role: data.data.user.role });
            return;
          }
          registerUser({ displayName, email }).then((data) => {
            getTokenAndNavigate({ email, role: data.data.user.role });
          });
        });
      })
      .catch((error) => {
        setError(handleError(error.code));
      });
  };

  const handleGithubLogin = () => {
    githubLogin()
      .then((userCredential) => {
        setError("");
        const email = userCredential.user.email;
        // getTokenAndNavigate(uid);
      })
      .catch((error) => {
        setError(handleError(error.code));
      });
  };

  // Get token from server and navigate to home page
  const getTokenAndNavigate = (data) => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        data,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTokenInLocalStorage(data.token);
        navigate("/");
      });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

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
          <Button radius="xs" variant="light" leftIcon={<IconBrandGithub />}>
            Github
          </Button>
        </Group>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput label="Name" placeholder="John Doe" size="md" mb="md" />
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
          />
          <FileInput
            label="Display Image"
            placeholder="Your display image"
            icon={<IconUpload size={14} />}
            mt="md"
            size="md"
          />
          <Switch
            label="Register as Seller"
            size="md"
            radius="lg"
            labelPosition="left"
            sx={{ marginLeft: "-6px" }}
          />
          <Button
            fullWidth
            mt="xl"
            size="md"
            //   onClick={() => setVisible((v) => !v)}
          >
            Login
          </Button>
        </form>

        <Text align="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor
            href="#"
            weight={700}
            onClick={(event) => event.preventDefault()}
          >
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};

export default Register;
