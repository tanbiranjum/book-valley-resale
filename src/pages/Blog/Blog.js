import React from "react";
import { Container, Title, Accordion, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    minHeight: 650,
  },

  title: {
    marginBottom: theme.spacing.xl * 1.5,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,

    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const Blog = () => {
  const { classes } = useStyles();

  return (
    <Container size="sm" className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        Blogs
      </Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="question-one">
          <Accordion.Control>
            What are the different ways to manage a state in a React
            application?
          </Accordion.Control>
          <Accordion.Panel>
            Managing state in a react application has many different ways. There
            are many ways such as redux, redux toolkit, react query, use custom
            hooks, and other state management libraries.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="question-two">
          <Accordion.Control>
            How does prototypical inherience work?
          </Accordion.Control>
          <Accordion.Panel>
            JavaScript only has one construct for inheritance: objects. Each
            object has a private attribute that serves as a link to its
            prototype, another object. Up until an object is reached with null
            as its prototype, each prototype object has a prototype of its own.
            That is how javascript prototypical inheritence work.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="question-three">
          <Accordion.Control>
            What is unit test? Why should we write unit test?
          </Accordion.Control>
          <Accordion.Panel>
            Unit testing is a software testing method. It is the first level of
            a software testing. Unit tests that are written well serve as
            documentation for your code. Any developer can easily understand the
            objective of your functions by looking at your tests. The process of
            debugging is made easier. Extreme programming is a key component
            that includes unit testing.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="question-four">
          <Accordion.Control>React vs Angular vs Vue?</Accordion.Control>
          <Accordion.Panel>
            React is a JavaScript library for building user interfaces. Angular
            is a full framework for building web applications. Vue is a
            progressive framework for building user interfaces.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Blog;
