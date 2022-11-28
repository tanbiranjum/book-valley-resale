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

import { useForm } from "@mantine/form";

import { IconBrandGoogle, IconBrandGithub, IconUpload } from "@tabler/icons";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail, registerUser } from "../../auth/auth";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import {
  setTokenInLocalStorage,
  setUserIdInLocalStorage,
} from "../../utils/utils";

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

const Register = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useState(false);
  const [uploadImage, setUploadImage] = useState();

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(false);

  const { user, register, updateUserProfile, googleLogin, githubLogin } =
    useContext(AuthContext);

  // If user is logged in, sign a token and navigate to home page
  const onSubmit = (data) => {
    setVisible(true);
    const formValue = data;
    const formData = new FormData();
    formData.append("image", uploadImage);

    fetch(
      "https://api.imgbb.com/1/upload?key=084083c36347f187e5b7f184e97644bd",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const photoURL = data.data.display_url;
        //register user in firebase auth
        register(formValue.email, formValue.password)
          .then((userCredential) => {
            setError("");
            let { displayName, email } = userCredential;

            // update user profile for registered account
            updateUserProfile({ displayName: formValue.displayName, photoURL });

            // save user in server and get token from server
            registerUser({
              displayName: formValue.displayName,
              photoURL: photoURL,
              email: formValue.email,
              role: formValue.seller ? "seller" : "buyer",
            }).then((data) => {
              const userId = data.data.user._id;
              getTokenAndNavigate(
                {
                  email: formValue.email,
                  role: data.data.user.role,
                },
                userId
              );
            });
          })
          .catch((error) => {
            setVisible(false);
            setError(handleError(error.code));
          });
      })
      .catch((err) => {
        setVisible(false);
        console.log(err);
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
    setVisible(true);
    googleLogin()
      .then((userCredential) => {
        setError("");
        const { email, displayName, photoURL } = userCredential.user;
        getUserByEmail(email).then((data) => {
          let userId;
          if (data.data.user) {
            userId = data.data.user._id;
            getTokenAndNavigate({ email, role: data.data.user.role }, userId);
            return;
          }
          registerUser({
            displayName,
            photoURL,
            email,
          }).then((data) => {
            userId = data.data.user._id;
            getTokenAndNavigate({ email, role: data.data.user.role }, userId);
          });
        });
      })
      .catch((error) => {
        setVisible(false);
        setError(handleError(error.code));
      });
  };

  // Get token from server and navigate to home page
  const getTokenAndNavigate = (data, userId) => {
    console.log(data);
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
        return window.location.reload();
      });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const form = useForm({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      seller: false,
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
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Name"
            placeholder="John Doe"
            size="md"
            mb="md"
            {...form.getInputProps("displayName")}
          />
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
          <FileInput
            label="Display Image"
            placeholder="Your display image"
            icon={<IconUpload size={14} />}
            mt="md"
            size="md"
            onChange={(image) => {
              setUploadImage(image);
            }}
          />
          <Switch
            label="Register as Seller"
            size="md"
            radius="lg"
            labelPosition="left"
            sx={{ marginLeft: "-6px" }}
            {...form.getInputProps("seller", { type: "checkbox" })}
          />
          <Button
            fullWidth
            mt="xl"
            size="md"
            type="submit"
            // onClick={() => setVisible((v) => !v)}
          >
            Register
          </Button>
        </form>

        <Text align="center" mt="md">
          Don&apos;t have an account?{" "}
          <Link
            style={{
              textDecoration: "none",
            }}
            to="/login"
            weight={700}
          >
            Login
          </Link>
        </Text>
      </Paper>
    </div>
  );
};

export default Register;
